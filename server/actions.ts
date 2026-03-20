"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { orgFormSchema, type OrgFormValues } from "@/lib/schemas";
import { OrganizationStatus } from ".prisma/client/enums";

type TxClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

// ============================================================================
// PUBLIC ACTIONS
// ============================================================================

export async function getPublishedOrgs(filters?: {
  categorySlug?: string;
  query?: string;
  page?: number;
  limit?: number;
}) {
  const { categorySlug, query, page = 1, limit = 10 } = filters || {};
  const skip = (page - 1) * limit;

  try {
    const whereClause: any = {
      status: OrganizationStatus.PUBLISHED,
    };

    if (categorySlug) {
      whereClause.categories = {
        some: { slug: categorySlug },
      };
    }

    if (query) {
      whereClause.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { shortDescription: { contains: query, mode: "insensitive" } },
      ];
    }

    const [orgs, total] = await Promise.all([
      prisma.organization.findMany({
        where: whereClause,
        include: {
          location: true,
          categories: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.organization.count({ where: whereClause }),
    ]);

    return {
      success: true,
      data: orgs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("[getPublishedOrgs] Error:", error);
    return { success: false, error: "Failed to fetch organizations" };
  }
}

export async function getOrgBySlug(slug: string) {
  try {
    const org = await prisma.organization.findUnique({
      where: { slug },
      include: {
        location: true,
        socialLinks: true,
        categories: true,
      },
    });

    if (!org) {
      return { success: false, error: "Organization not found" };
    }

    return { success: true, data: org };
  } catch (error) {
    console.error("[getOrgBySlug] Error:", error);
    return { success: false, error: "Failed to fetch organization" };
  }
}

// ============================================================================
// PRIVATE ACTIONS (ADMIN ONLY)
// ============================================================================

export async function upsertOrganization(data: OrgFormValues, id?: string) {
  try {
    // 1. Authenticate user
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // 2. Validate data
    const validatedData = orgFormSchema.parse(data);
    const { location, socialLinks, categoryIds, ...orgData } = validatedData;

    // 3. Upsert organization
    const result = await prisma.$transaction(async (tx: TxClient) => {
      let organization;

      if (id) {
        // UPDATE existing organization
        organization = await tx.organization.update({
          where: { id },
          data: {
            ...orgData,
            categories: {
              set: categoryIds.map((catId) => ({ id: catId })),
            },
          },
        });

        // Update Location (Upsert)
        if (location) {
          await tx.location.upsert({
            where: { organizationId: id },
            create: { ...location, organizationId: id },
            update: location,
          });
        }

        // Update Social Links (Delete all and recreate to avoid complex syncing)
        if (socialLinks && socialLinks.length > 0) {
          await tx.socialLink.deleteMany({ where: { organizationId: id } });
          await tx.socialLink.createMany({
            data: socialLinks.map((link) => ({
              ...link,
              organizationId: id,
            })),
          });
        }

        // Log action
        await tx.auditLog.create({
          data: {
            action: "UPDATE",
            entityId: id,
            adminId: userId,
            details: JSON.parse(JSON.stringify(validatedData)),
          },
        });
      } else {
        // CREATE new organization
        organization = await tx.organization.create({
          data: {
            ...orgData,
            location: location ? { create: location } : undefined,
            socialLinks:
              socialLinks && socialLinks.length > 0
                ? { create: socialLinks }
                : undefined,
            categories: {
              connect: categoryIds.map((catId) => ({ id: catId })),
            },
          },
        });

        // Log action
        await tx.auditLog.create({
          data: {
            action: "CREATE",
            entityId: organization.id,
            adminId: userId,
            details: JSON.parse(JSON.stringify(validatedData)),
          },
        });
      }

      return organization;
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("[upsertOrganization] Error:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function toggleOrgStatus(id: string, status: OrganizationStatus) {
  try {
    // 1. Authenticate user
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const result = await prisma.$transaction(async (tx: TxClient) => {
      const org = await tx.organization.update({
        where: { id },
        data: { status },
      });

      // Log action
      await tx.auditLog.create({
        data: {
          action: "UPDATE_STATUS",
          entityId: id,
          adminId: userId,
          details: { newStatus: status },
        },
      });

      return org;
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("[toggleOrgStatus] Error:", error);
    return { success: false, error: "Failed to toggle status" };
  }
}

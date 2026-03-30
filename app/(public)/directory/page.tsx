import { Suspense } from "react";
import { getPublishedOrgs, getAllCategoriesWithCount } from "@/server/actions";
import { SidebarFilters } from "@/components/public/directory/sidebar-filters";
import { ResultsGrid } from "@/components/public/directory/results-grid";
import type { OrganizationCardProps } from "@/components/public/directory/organization-card";

export default async function DirectoryPage(props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
    state?: string;
    city?: string;
    verified?: string;
    sort?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";
  const page = Number(searchParams?.page) || 1;
  const categorySlug = searchParams?.category;
  const state = searchParams?.state;
  const city = searchParams?.city;
  const verified = searchParams?.verified === "true" ? true : undefined;
  const sort = searchParams?.sort;

  const [result, categoriesResult] = await Promise.all([
    getPublishedOrgs({
      query: query || undefined,
      categorySlug,
      page,
      limit: 12,
      state,
      city,
      verified,
      sort,
    }),
    getAllCategoriesWithCount(),
  ]);

  const categories = categoriesResult.data || [];

  const organizations: OrganizationCardProps[] = (result.data || []).map(
    (org) => ({
      slug: org.slug,
      name: org.name,
      description: org.shortDescription,
      category: org.categories?.[0]?.name || "Organización",
      location: org.location
        ? `${org.location.city}, ${org.location.state}`
        : "México",
      coverImage: org.coverImageUrl || "/images/directorio/card-forest.jpg",
      logoImage: org.logoUrl || "/images/directorio/logo-forest.jpg",
      verified: org.verified,
    })
  );

  const meta = result.meta || { total: 0, page: 1, limit: 12, totalPages: 0 };

  return (
    <div className="pt-8 pb-12 max-w-[1440px] mx-auto px-8 flex gap-12">
      <Suspense>
        <SidebarFilters
          searchQuery={query}
          categories={categories}
          activeCategorySlug={categorySlug}
          activeState={state}
          activeCity={city}
          activeVerified={verified}
        />
      </Suspense>
      <ResultsGrid
        organizations={organizations}
        total={meta.total}
        currentPage={meta.page}
        totalPages={meta.totalPages}
        searchQuery={query}
        sort={sort}
      />
    </div>
  );
}

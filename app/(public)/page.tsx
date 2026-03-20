import {
  HeroSection,
  CategoriesSection,
  FeaturedSection,
  TrustSection,
} from "@/components/landing";

export default function Page() {
  return (
    <>
      {/* Wrapper for Hero + Categories with shared glow overlay */}
      <div className="relative overflow-hidden">
        {/* Glow Effect — positioned at the boundary between Hero and Categories */}
        <div
          className="absolute left-1/4 bottom-1/2 -translate-x-1/2 w-200 h-150 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--color-ds-primary-fixed) 0%, transparent 70%)",
            opacity: 0.25,
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute left-1/3 bottom-[40%] -translate-x-1/3 w-125 h-100 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--color-ds-tertiary-container) 0%, transparent 70%)",
            opacity: 0.15,
            filter: "blur(100px)",
          }}
        />

        <HeroSection />
        <CategoriesSection />
      </div>
      <FeaturedSection />
      <TrustSection />
    </>
  );
}
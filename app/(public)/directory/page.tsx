import { SidebarFilters, ResultsGrid } from "@/components/public";

export default function DirectoryPage() {
  return (
    <div className="pt-8 pb-12 max-w-7xl mx-auto px-8 flex gap-12">
      <SidebarFilters />
      <ResultsGrid />
    </div>
  );
}

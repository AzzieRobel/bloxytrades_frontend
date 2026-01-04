import { useState } from "react";
import { Sidebar } from "./sidebar";
import { MainContent } from "./mainContent";

const initialFilter: FilterOption = {
  priceMin: "",
  priceMax: "",
  paymentMethod: "",
  sortOption: "",
};

export default function Market() {
  const [filterOption, setFilterOption] = useState<FilterOption>(initialFilter);

  const handleClearFilters = () => {
    setFilterOption(initialFilter);
  };

  return (
    <div className="min-h-screen bg-[#0B0919]">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar Filter */}
          <Sidebar
            filterOption={filterOption}
            setFilterOption={setFilterOption}
            onClear={handleClearFilters}
          />

          {/* Main Content */}
          <MainContent filterOption={filterOption} />
        </div>
      </div>
    </div>
  );
}
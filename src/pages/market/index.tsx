import { useState } from "react";
import { Sidebar } from "./sidebar";
import { MainContent } from "./mainContent";

export default function Market() {
  const [filterOption, setFilterOption] = useState<FilterOption>({
    priceMin: "",
    priceMax: "",
    paymentMethod: {
      robux: false,
      paypal: false,
      card: false
    },
    sortOption: ""
  })

  return (
    <div className="min-h-screen bg-[#0B0919]">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">

          {/* Sidebar Filter */}
          <Sidebar filterOption={filterOption} setFilterOption={setFilterOption} />

          {/* Main Content */}
          <MainContent />
        </div>
      </div>
    </div>
  );
}
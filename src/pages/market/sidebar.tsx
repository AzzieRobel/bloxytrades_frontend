import { useRef } from 'react';

export const Sidebar = (props: SidebarProps) => {
    const { filterOption, setFilterOption, onClear } = props
    const minInputRef = useRef<HTMLInputElement>(null);
    const maxInputRef = useRef<HTMLInputElement>(null);

    const minPrice = 0;
    const maxPrice = 100000;

    // Get numeric values from filterOption
    const getMinValue = () => {
        if (!filterOption.priceMin || filterOption.priceMin === '') return minPrice;
        const val = parseFloat(filterOption.priceMin.replace('$', '').trim());
        return isNaN(val) ? minPrice : Math.max(minPrice, Math.min(val, maxPrice));
    };

    const getMaxValue = () => {
        if (!filterOption.priceMax || filterOption.priceMax === '') return maxPrice;
        const val = parseFloat(filterOption.priceMax.replace('$', '').trim());
        return isNaN(val) ? maxPrice : Math.max(minPrice, Math.min(val, maxPrice));
    };

    const minValue = getMinValue();
    const maxValue = getMaxValue();

    const handleMinRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newMin = parseInt(e.target.value);
        const currentMax = getMaxValue();

        // If min exceeds max, swap them
        if (newMin > currentMax) {
            handleFilterChange({
                ...filterOption,
                priceMin: `$${currentMax.toFixed(2)}`,
                priceMax: `$${newMin.toFixed(2)}`
            });
        } else {
            handleFilterChange({ ...filterOption, priceMin: `$${newMin.toFixed(2)}` });
        }
    };

    const handleMaxRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newMax = parseInt(e.target.value);
        const currentMin = getMinValue();

        // If max goes below min, swap them
        if (newMax < currentMin) {
            handleFilterChange({
                ...filterOption,
                priceMin: `$${newMax.toFixed(2)}`,
                priceMax: `$${currentMin.toFixed(2)}`
            });
        } else {
            handleFilterChange({ ...filterOption, priceMax: `$${newMax.toFixed(2)}` });
        }
    };

    // Calculate highlight position and width - ensure min is always <= max
    const actualMin = Math.min(minValue, maxValue);
    const actualMax = Math.max(minValue, maxValue);
    const highlightLeft = ((actualMin - minPrice) / (maxPrice - minPrice)) * 100;
    const highlightWidth = ((actualMax - actualMin) / (maxPrice - minPrice)) * 100;

    const handleClearAll = () => {
        onClear();
    };

    // Apply filters immediately when any filter changes
    const handleFilterChange = (newFilter: FilterOption) => {
        setFilterOption(newFilter);
    };

    return (
        <aside className="w-72 flex-shrink-0">
            <div className="sticky top-24 bg-[#0f0d16] border border-white/10 rounded-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Filter</h2>
                    <button
                        onClick={handleClearAll}
                        className="text-sm text-gray-400 hover:text-white text-primary"
                    >
                        Reset
                    </button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                    <label className="text-base font-semibold flex mb-3">Item Price</label>
                    <div className="flex gap-3 mb-3">
                        <div className="flex-1">
                            <label className="text-xs text-left text-gray-500 mb-1 block">Min</label>
                            <input
                                type="text"
                                value={filterOption.priceMin}
                                onChange={(e) => handleFilterChange({ ...filterOption, priceMin: e.target.value })}
                                className="w-full px-3 py-2.5 bg-[#1a1625] border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-primary/50"
                                placeholder="min $0.28"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-left text-gray-500 mb-1 block">Max</label>
                            <input
                                type="text"
                                value={filterOption.priceMax}
                                onChange={(e) => handleFilterChange({ ...filterOption, priceMax: e.target.value })}
                                className="w-full px-3 py-2.5 bg-[#1a1625] border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-primary/50"
                                placeholder="max $100000"
                            />
                        </div>
                    </div>

                    {/* Dual Thumb Slider - Based on double-slider project */}
                    <div className="relative w-full h-6 py-2">
                        {/* Track Background */}
                        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-gray-700 rounded-full pointer-events-none" />

                        {/* Active Range Highlight */}
                        <div
                            className="absolute top-1/2 h-1 -translate-y-1/2 bg-primary rounded-full pointer-events-none"
                            style={{
                                left: `${Math.max(0, Math.min(100, highlightLeft))}%`,
                                width: `${Math.max(0, Math.min(100, highlightWidth))}%`
                            }}
                        />

                        {/* Min Range Input */}
                        <input
                            ref={minInputRef}
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            step="1"
                            value={actualMin}
                            onChange={handleMinRangeChange}
                            onInput={handleMinRangeChange}
                            onMouseDown={() => {
                                if (minInputRef.current) minInputRef.current.style.zIndex = '10';
                                if (maxInputRef.current) maxInputRef.current.style.zIndex = '4';
                            }}
                            onMouseUp={() => {
                                if (minInputRef.current) minInputRef.current.style.zIndex = actualMin > actualMax - 50 ? '5' : '3';
                            }}
                            onTouchStart={() => {
                                if (minInputRef.current) minInputRef.current.style.zIndex = '10';
                                if (maxInputRef.current) maxInputRef.current.style.zIndex = '4';
                            }}
                            onTouchEnd={() => {
                                if (minInputRef.current) minInputRef.current.style.zIndex = actualMin > actualMax - 50 ? '5' : '3';
                            }}
                            className={`absolute top-1/2 left-0 right-0 w-full h-1 m-0 p-0 bg-transparent outline-none appearance-none cursor-pointer pointer-events-auto -translate-y-1/2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-[2] [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:border-0 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:box-border [&::-moz-range-track]:w-full [&::-moz-range-track]:h-1 [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-0 [&::-ms-thumb]:w-4 [&::-ms-thumb]:h-4 [&::-ms-thumb]:bg-white [&::-ms-thumb]:border-2 [&::-ms-thumb]:border-primary [&::-ms-thumb]:rounded-full [&::-ms-thumb]:cursor-pointer [&::-ms-track]:w-full [&::-ms-track]:h-1 [&::-ms-track]:bg-transparent [&::-ms-track]:border-0 [&::-ms-track]:text-transparent focus:outline-none focus:[&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(86,80,239,0.2)] focus:[&::-moz-range-thumb]:shadow-[0_0_0_3px_rgba(86,80,239,0.2)]`}
                            style={{
                                zIndex: actualMin > actualMax - 50 ? 5 : 3
                            }}
                        />

                        {/* Max Range Input */}
                        <input
                            ref={maxInputRef}
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            step="1"
                            value={actualMax}
                            onChange={handleMaxRangeChange}
                            onInput={handleMaxRangeChange}
                            onMouseDown={() => {
                                if (maxInputRef.current) maxInputRef.current.style.zIndex = '10';
                                if (minInputRef.current) minInputRef.current.style.zIndex = '3';
                            }}
                            onMouseUp={() => {
                                if (maxInputRef.current) maxInputRef.current.style.zIndex = actualMax < actualMin + 50 ? '5' : '4';
                            }}
                            onTouchStart={() => {
                                if (maxInputRef.current) maxInputRef.current.style.zIndex = '10';
                                if (minInputRef.current) minInputRef.current.style.zIndex = '3';
                            }}
                            onTouchEnd={() => {
                                if (maxInputRef.current) maxInputRef.current.style.zIndex = actualMax < actualMin + 50 ? '5' : '4';
                            }}
                            className={`absolute top-1/2 left-0 right-0 w-full h-1 m-0 p-0 bg-transparent outline-none appearance-none cursor-pointer pointer-events-auto -translate-y-1/2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-[2] [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:border-0 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:box-border [&::-moz-range-track]:w-full [&::-moz-range-track]:h-1 [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-0 [&::-ms-thumb]:w-4 [&::-ms-thumb]:h-4 [&::-ms-thumb]:bg-white [&::-ms-thumb]:border-2 [&::-ms-thumb]:border-primary [&::-ms-thumb]:rounded-full [&::-ms-thumb]:cursor-pointer [&::-ms-track]:w-full [&::-ms-track]:h-1 [&::-ms-track]:bg-transparent [&::-ms-track]:border-0 [&::-ms-track]:text-transparent focus:outline-none focus:[&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(86,80,239,0.2)] focus:[&::-moz-range-thumb]:shadow-[0_0_0_3px_rgba(86,80,239,0.2)]`}
                            style={{
                                zIndex: actualMax < actualMin + 50 ? 5 : 4
                            }}
                        />
                    </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                    <h3 className="text-base font-semibold text-left mb-3">Payment Method</h3>
                    <div className="space-y-2.5">
                        {[
                            { value: "crypto", label: "Crypto" },
                            { value: "paypal", label: "Paypal" },
                            { value: "card", label: "Card" }
                        ].map((method) => (
                            <label key={method.value} className="flex items-strech gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method.value}
                                        checked={filterOption.paymentMethod === method.value}
                                        onChange={(e) =>
                                            handleFilterChange({
                                                ...filterOption,
                                                paymentMethod: e.target.value
                                            })
                                        }
                                        className="w-5 h-5 appearance-none rounded-full border-2 border-white/20 bg-transparent checked:border-primary cursor-pointer transition-all"
                                    />
                                    {filterOption.paymentMethod === method.value && (
                                        <div className="w-2.5 h-2.5 bg-primary rounded-full absolute top-[0.3rem] left-[0.35rem] pointer-events-none" />
                                    )}
                                </div>
                                <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{method.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Sort */}
                <div className="mb-6">
                    <h3 className="text-base font-semibold text-left mb-3">Sort</h3>
                    <div className="space-y-2.5">
                        {[
                            { value: "rap-high", label: "Rap (High to Low)" },
                            { value: "rap-low", label: "Rap (Low to High)" },
                            { value: "price-high", label: "Price (High to Low)" },
                            { value: "price-low", label: "Price (Low to High)" }
                        ].map((option) => (
                            <label key={option.value} className="flex items-strech gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="radio"
                                        name="sort"
                                        value={option.value}
                                        checked={filterOption.sortOption === option.value}
                                        onChange={(e) => handleFilterChange({ ...filterOption, sortOption: e.target.value })}
                                        className="w-5 h-5 appearance-none rounded-full border-2 border-white/20 bg-transparent checked:border-primary cursor-pointer transition-all"
                                    />
                                    {filterOption.sortOption === option.value && (
                                        <div className="w-2.5 h-2.5 bg-primary rounded-full absolute top-[0.3rem] left-[0.35rem] pointer-events-none" />
                                    )}
                                </div>
                                <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleClearAll}
                        className="w-full py-3 hover:bg-white/5 text-gray-400 hover:text-white rounded-xl font-semibold transition-all"
                    >
                        Clear all
                    </button>
                </div>

                <p className="text-gray-500 text-[11px] pt-12">
                    RoPlaza is not affiliated, associated, or partnered with UpliftGames LLC and Roblox Corporation in any way. We are not authorized, endorsed, or sponsored by Uplift Games LLC and Roblox Corporation.
                </p>
                <p className="text-gray-500 text-medium text-[13px] pt-10 pb-8">
                    © 2020-2025 RoPlaza All Rights Reserved
                </p>
            </div>
        </aside>
    )
}
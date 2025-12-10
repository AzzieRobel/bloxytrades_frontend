import { useState } from "react";


export const SalesHistoryTab = () => {

    const [salesFilter, setSalesFilter] = useState<SalesFilterType>("completed");

    const sales: Sale[] = [];

    return (
        <div className="space-y-6">
            {/* Header with subtitle */}
            <div className="text-left">
                <h2 className="text-white text-2xl font-bold">Past Transactions</h2>
                <p className="text-gray-500 text-sm">Orders history since the beginning</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-10">
                    <div className="text-gray-400 text-base mb-3 font-medium">Total sold</div>
                    <div className="text-white text-6xl font-bold">$0.00 USD</div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-10">
                    <div className="text-gray-400 text-base mb-3 font-medium">Total transactions performed</div>
                    <div className="text-white text-6xl font-bold">0</div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setSalesFilter("completed")}
                    className={`px-6 py-2.5 rounded-md font-semibold text-sm transition-all ${salesFilter === "completed"
                        ? "bg-[#5650EF] text-white"
                        : "bg-black/40 text-gray-400 border border-white/10 hover:border-white/20"
                        }`}
                >
                    Completed
                </button>
                <button
                    onClick={() => setSalesFilter("pending")}
                    className={`px-6 py-2.5 rounded-md font-semibold text-sm transition-all ${salesFilter === "pending"
                        ? "bg-[#5650EF] text-white"
                        : "bg-black/40 text-gray-400 border border-white/10 hover:border-white/20"
                        }`}
                >
                    Pending
                </button>
                <button
                    onClick={() => setSalesFilter("flagged")}
                    className={`px-6 py-2.5 rounded-md font-semibold text-sm transition-all ${salesFilter === "flagged"
                        ? "bg-[#5650EF] text-white"
                        : "bg-black/40 text-gray-400 border border-white/10 hover:border-white/20"
                        }`}
                >
                    Flagged
                </button>
            </div>

            {/* Sales Table */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Tracking ID</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Buyer ID</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Item</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Price</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Fee</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">IP</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-8 py-20 text-center text-gray-600">
                                        No sales found.
                                    </td>
                                </tr>
                            ) : (
                                sales.map((sale, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-5 text-gray-400">{sale.trackingId}</td>
                                        <td className="px-8 py-5 text-gray-400">{sale.buyerId}</td>
                                        <td className="px-8 py-5 text-gray-400">{sale.item}</td>
                                        <td className="px-8 py-5 text-gray-400">{sale.price}</td>
                                        <td className="px-8 py-5 text-gray-400">{sale.fee}</td>
                                        <td className="px-8 py-5 text-gray-400">{sale.ip}</td>
                                        <td className="px-8 py-5 text-gray-400">{sale.date}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
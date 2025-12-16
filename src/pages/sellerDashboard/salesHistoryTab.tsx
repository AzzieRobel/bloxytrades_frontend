import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

interface SellerSale {
    id: string;
    buyerId: string;
    listingId: string;
    price: number;
    fee: number;
    status: string;
    createdAt: string;
}

export const SalesHistoryTab = () => {

    const [salesFilter, setSalesFilter] = useState<SalesFilterType>("completed");
    const { token } = useAuth();
    const [sales, setSales] = useState<SellerSale[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) return;
        const fetchSales = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`${API_BASE}/sellers/me/sales`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    setSales(data.orders || []);
                }
            } catch (err) {
                console.error("Failed to load seller sales history:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSales();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const filteredSales = sales.filter((sale) => {
        if (salesFilter === "completed") return sale.status === "completed";
        if (salesFilter === "pending") return sale.status === "pending";
        if (salesFilter === "flagged") return sale.status === "cancelled";
        return true;
    });

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
                    <div className="text-white text-6xl font-bold">
                        {isLoading
                            ? "$… USD"
                            : `$${filteredSales.reduce((sum, s) => sum + (s.price || 0), 0).toFixed(2)} USD`}
                    </div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-10">
                    <div className="text-gray-400 text-base mb-3 font-medium">Total transactions performed</div>
                    <div className="text-white text-6xl font-bold">
                        {isLoading ? "…" : filteredSales.length}
                    </div>
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
                            {filteredSales.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-8 py-20 text-center text-gray-600">
                                        {isLoading ? "Loading sales..." : "No sales found."}
                                    </td>
                                </tr>
                            ) : (
                                filteredSales.map((sale) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-5 text-gray-400">{sale.id}</td>
                                        <td className="px-8 py-5 text-gray-400">{sale.buyerId}</td>
                                        <td className="px-8 py-5 text-gray-400">{sale.listingId}</td>
                                        <td className="px-8 py-5 text-gray-400">${sale.price.toFixed(2)}</td>
                                        <td className="px-8 py-5 text-gray-400">${sale.fee.toFixed(2)}</td>
                                        <td className="px-8 py-5 text-gray-400">{sale.status}</td>
                                        <td className="px-8 py-5 text-gray-400">
                                            {new Date(sale.createdAt).toLocaleString()}
                                        </td>
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
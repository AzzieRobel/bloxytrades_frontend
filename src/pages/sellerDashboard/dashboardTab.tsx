import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { sellerService } from "../../services";

export const DashboardTab = () => {
    const { token } = useAuth();
    const [stats, setStats] = useState<SellerDashboardStats>({
        todayTransactions: 0,
        todayRevenue: 0,
        totalTransactions: 0,
        totalRevenue: 0,
    });
    const [orders, setOrders] = useState<SellerOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) return;
        const fetchDashboard = async () => {
            try {
                setIsLoading(true);
                const data = await sellerService.getDashboard(token);
                setStats(data.stats || stats);
                setOrders(data.recentOrders || []);
            } catch (err) {
                console.error("Failed to load seller dashboard:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboard();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-8">
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-10">
                    <div className="text-gray-400 text-base mb-3 font-medium">Transactions Today</div>
                    <div className="text-white text-6xl font-bold">
                        {isLoading ? "…" : stats.todayTransactions}
                    </div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-10">
                    <div className="text-gray-400 text-base mb-3 font-medium">Today's Revenue</div>
                    <div className="text-white text-6xl font-bold">
                        {isLoading ? "$…" : `$${stats.todayRevenue.toFixed(2)}`}
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="overflow-hidden">
                <div className="px-2 py-3 text-left">
                    <h2 className="text-white text-xl font-bold tracking-wide">RECENT ORDERS</h2>
                    <p className="text-gray-500 text-sm">Most recent orders, in UTC.</p>
                </div>

                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm overflow-x-auto border-t border-white/10">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Order ID</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Listing ID</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Price</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Fee</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Status</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center text-gray-600">
                                        {isLoading ? "Loading orders..." : "No orders yet"}
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-5 text-gray-400">{order.id}</td>
                                        <td className="px-8 py-5 text-gray-400">{order.listingId}</td>
                                        <td className="px-8 py-5 text-gray-400">${order.price.toFixed(2)}</td>
                                        <td className="px-8 py-5 text-gray-400">${order.fee.toFixed(2)}</td>
                                        <td className="px-8 py-5 text-gray-400 capitalize">{order.status}</td>
                                        <td className="px-8 py-5 text-gray-400">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
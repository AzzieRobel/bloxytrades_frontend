export const DashboardTab = () => {

    const orders: Order[] = [];

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-8">
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-10">
                    <div className="text-gray-400 text-base mb-3 font-medium">Transactions Today</div>
                    <div className="text-white text-6xl font-bold">0</div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-10">
                    <div className="text-gray-400 text-base mb-3 font-medium">Today's Revenue</div>
                    <div className="text-white text-6xl font-bold">$0.00</div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="overflow-hidden">
                <div className="px-2 py-3 text-left">
                    <h2 className="text-white text-xl font-bold tracking-wide">RECENT ORDERS</h2>
                    <p className="text-gray-500 text-sm">Most recent orders today, in GMT.</p>
                </div>

                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm overflow-x-auto border-t border-white/10">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Tracking ID</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Item</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Price</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Fee</th>
                                <th className="px-8 py-5 text-left text-white font-semibold text-sm">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-gray-600">
                                        No orders yet
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-5 text-gray-400">{order.trackingId}</td>
                                        <td className="px-8 py-5 text-gray-400">{order.item}</td>
                                        <td className="px-8 py-5 text-gray-400">{order.price}</td>
                                        <td className="px-8 py-5 text-gray-400">{order.fee}</td>
                                        <td className="px-8 py-5 text-gray-400">{order.date}</td>
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
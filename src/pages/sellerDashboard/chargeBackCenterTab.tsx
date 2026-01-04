
export const ChargeBackCenterTab = () => {

    const disputes: Dispute[] = [];

    return (
        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-black/60 border-b border-white/10">
                            <th className="px-6 py-5 text-left text-white font-semibold text-sm whitespace-nowrap">Tracking ID</th>
                            <th className="px-6 py-5 text-left text-white font-semibold text-sm whitespace-nowrap">Buyer Name</th>
                            <th className="px-6 py-5 text-left text-white font-semibold text-sm whitespace-nowrap">Buyer Email</th>
                            <th className="px-6 py-5 text-left text-white font-semibold text-sm whitespace-nowrap">Buyer IP</th>
                            <th className="px-6 py-5 text-left text-white font-semibold text-sm whitespace-nowrap">Buyer Account</th>
                            <th className="px-6 py-5 text-left text-white font-semibold text-sm whitespace-nowrap">Item info</th>
                            <th className="px-6 py-5 text-left text-white font-semibold text-sm whitespace-nowrap">Price</th>
                            <th className="px-6 py-5 text-left text-white font-semibold text-sm whitespace-nowrap">Payment Method</th>
                            <th className="px-6 py-5 text-left text-white font-semibold text-sm whitespace-nowrap">Disputed on</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disputes.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="px-8 py-20 text-center text-gray-600">
                                    No disputes yet
                                </td>
                            </tr>
                        ) : (
                            disputes.map((dispute, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-5 text-gray-400">{dispute.trackingId}</td>
                                    <td className="px-6 py-5 text-gray-400">{dispute.buyerName}</td>
                                    <td className="px-6 py-5 text-gray-400">{dispute.buyerEmail}</td>
                                    <td className="px-6 py-5 text-gray-400">{dispute.buyerIp}</td>
                                    <td className="px-6 py-5 text-gray-400">{dispute.buyerAccount}</td>
                                    <td className="px-6 py-5 text-gray-400">{dispute.itemInfo}</td>
                                    <td className="px-6 py-5 text-gray-400">{dispute.price}</td>
                                    <td className="px-6 py-5 text-gray-400">{dispute.paymentMethod}</td>
                                    <td className="px-6 py-5 text-gray-400">{dispute.disputedOn}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
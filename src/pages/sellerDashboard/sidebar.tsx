
export const Sidebar = (props: MarketSidebarProps) => {
    const { activeTab, setActiveTab } = props

    return (
        <aside className="w-72 flex-shrink-0">
            <h1 className="text-4xl font-bold text-white mb-6 tracking-wide">SELLER'S PANEL</h1>
            <div className="bg-black/40 backdrop-blur-sm">
                {[
                    { id: "dashboard" as TabType, label: "Dashboard" },
                    { id: "list-items" as TabType, label: "List Items" },
                    { id: "sales-history" as TabType, label: "Sales History" },
                    { id: "subscriptions" as TabType, label: "Subscriptions" },
                    { id: "chargeback" as TabType, label: "Chargeback Center" }
                ].filter(tab => tab.id !== "onboarding").map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full px-6 py-4 mb-2 rounded-sm transition-all relative border border-white/5 ${activeTab === tab.id
                            ? "text-white font-semibold bg-white/5"
                            : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5650EF]" />
                        )}
                    </button>
                ))}
            </div>
        </aside>
    )
}
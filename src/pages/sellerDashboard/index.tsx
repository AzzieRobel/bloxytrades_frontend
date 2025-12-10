import { useState } from "react";

import { Sidebar } from "./sidebar";
import { DashboardTab } from "./dashboardTab";
import { SalesHistoryTab } from "./salesHistoryTab";
import { SubscriptionTab } from "./subscriptionTab";
import { ChargeBackCenterTab } from "./chargeBackCenterTab";
import { ListItemTab } from "./listItemTab";

export default function SellerDashboard() {
    const [activeTab, setActiveTab] = useState<TabType>("dashboard");

    return (
        <div className="min-h-screen pt-20 bg-black relative overflow-hidden">
            {/* Background gradient effects */}
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#5650EF]/5 rounded-full blur-[200px]" />
            <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-[#5650EF]/5 rounded-full blur-[200px]" />

            <div className="max-w-[1600px] mx-auto px-12 relative z-10">

                <div className="flex gap-12">
                    {/* Sidebar Navigation */}
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* Main Content */}
                    <main className="flex-1 pt-16">
                        {/* Dashboard Tab */}
                        {activeTab === "dashboard" && (
                            <DashboardTab />
                        )}

                        {/* Sales History Tab */}
                        {activeTab === "sales-history" && (
                            <SalesHistoryTab />
                        )}

                        {/* Subscriptions Tab */}
                        {activeTab === "subscriptions" && (
                            <SubscriptionTab />
                        )}

                        {/* Chargeback Center Tab */}
                        {activeTab === "chargeback" && (
                            <ChargeBackCenterTab />
                        )}

                        {/* List Items Tab */}
                        {activeTab === "list-items" && (
                            <ListItemTab />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
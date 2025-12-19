import { useState, useEffect } from "react";

import { Sidebar } from "./sidebar";
import { DashboardTab } from "./dashboardTab";
import { SalesHistoryTab } from "./salesHistoryTab";
import { SubscriptionTab } from "./subscriptionTab";
import { ChargeBackCenterTab } from "./chargeBackCenterTab";
import { ListItemTab } from "./listItemTab";
import { OnboardingTab } from "./onboardingTab";
import { useSeller } from "@/hooks/useSeller";
import { useUser } from "@/hooks/useUser";

export default function SellerDashboard() {
    const [activeTab, setActiveTab] = useState<TabType>("dashboard");
    const { profile, isLoadingProfile } = useSeller();
    const { user } = useUser();

    // Check if onboarding is needed
    const isPaymentConnected = profile?.payoutMethod && (
        profile.payoutMethod.stripeConnected ||
        (profile.payoutMethod.paypalEmail && profile.payoutMethod.paypalEmail.trim() !== "") ||
        (profile.payoutMethod.cryptoWallets && (
            profile.payoutMethod.cryptoWallets.btc ||
            profile.payoutMethod.cryptoWallets.eth ||
            profile.payoutMethod.cryptoWallets.usdt
        ))
    );
    const isRobloxConnected = !!(user?.robloxUserId && user?.robloxUsername);
    const needsOnboarding = !profile?.isEnabled || !isPaymentConnected || !isRobloxConnected;

    // If seller is not enabled and onboarding is complete, show onboarding
    if (!profile.isEnabled && (profile.payoutMethod.paypalEmail === ""||profile.payoutMethod.paypalEmail)) {
        return (
            <div className="min-h-screen pt-20 bg-black relative overflow-hidden">
                {/* Background gradient effects */}
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#5650EF]/5 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-[#5650EF]/5 rounded-full blur-[200px]" />

                <div className="max-w-[1600px] mx-auto px-12 relative z-10">
                    <div className="flex gap-12">
                        {/* Sidebar - Hidden during onboarding */}
                        <aside className="w-72 flex-shrink-0">
                            <h1 className="text-4xl font-bold text-white mb-6 tracking-wide">SELLER'S PANEL</h1>
                            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-6">
                                <p className="text-gray-400 text-sm">
                                    Complete the onboarding process to access the seller dashboard.
                                </p>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1 pt-16">
                            <OnboardingTab />
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    // Show regular dashboard if enabled
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
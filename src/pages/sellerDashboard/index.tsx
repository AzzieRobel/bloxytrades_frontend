import { useState } from "react";

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
    const { user, isLoading: isLoadingUser } = useUser();

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

    // If profile doesn't exist yet, show onboarding
    // If profile exists but is not enabled, or payment/roblox not connected, show onboarding
    const needsOnboarding = !profile || !profile.isEnabled || !isPaymentConnected || !isRobloxConnected;

    // Show loading state while profile or user is being fetched
    if (isLoadingProfile || isLoadingUser) {
        return (
            <div className="min-h-screen pt-20 bg-black relative overflow-hidden flex items-center justify-center">
                <div className="text-white text-lg">Loading...</div>
            </div>
        );
    }

    // Show onboarding if user needs to complete setup (payment or roblox not connected, or seller not enabled)
    if (needsOnboarding) {
        return (
            <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
                {/* Background gradient effects */}
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#5650EF]/5 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-[#5650EF]/5 rounded-full blur-[200px]" />

                <div className="max-w-4xl mx-auto px-6 py-12 relative z-10 w-full">
                    <OnboardingTab />
                </div>
            </div>
        );
    }

    // Show regular dashboard if enabled
    return (
        <div className="min-h-screen pt-12 bg-black relative overflow-hidden">
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
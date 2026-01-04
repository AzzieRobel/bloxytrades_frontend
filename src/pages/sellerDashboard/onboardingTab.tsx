import { useState } from "react";
import { CheckCircle2, XCircle, Wallet, Gamepad2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSeller } from "@/hooks/useSeller";
import { useUser } from "@/hooks/useUser";

export const OnboardingTab = () => {
    const { profile, reloadProfile, updateProfile } = useSeller();
    const { user, connectRoblox, reloadUser } = useUser();
    const [isConnectingRoblox, setIsConnectingRoblox] = useState(false);
    const [isConnectingPayment, setIsConnectingPayment] = useState(false);
    const [robloxUsername, setRobloxUsername] = useState("");
    const [robloxUserId, setRobloxUserId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal" | "crypto">("stripe");
    const [paypalEmail, setPaypalEmail] = useState("");
    const [cryptoWallet, setCryptoWallet] = useState({ btc: "", eth: "", usdt: "" });

    // Check if payment is connected
    const isPaymentConnected = profile?.payoutMethod && (
        profile.payoutMethod.stripeConnected ||
        (profile.payoutMethod.paypalEmail && profile.payoutMethod.paypalEmail.trim() !== "") ||
        (profile.payoutMethod.cryptoWallets && (
            profile.payoutMethod.cryptoWallets.btc ||
            profile.payoutMethod.cryptoWallets.eth ||
            profile.payoutMethod.cryptoWallets.usdt
        ))
    );

    // Check if roblox is connected
    const isRobloxConnected = !!(user?.robloxUserId && user?.robloxUsername);

    // Check if onboarding is complete
    const isOnboardingComplete = isPaymentConnected && isRobloxConnected;

    const handleConnectRoblox = async () => {
        if (!robloxUsername.trim() || !robloxUserId.trim()) {
            toast.error("Please enter both Roblox username and User ID");
            return;
        }

        try {
            setIsConnectingRoblox(true);
            await connectRoblox({
                robloxUsername: robloxUsername.trim(),
                robloxUserId: robloxUserId.trim(),
            });
            // Reload user data to ensure it's up to date
            await reloadUser();
            toast.success("Roblox account connected successfully!");
            setRobloxUsername("");
            setRobloxUserId("");
        } catch (error: any) {
            console.error("Failed to connect Roblox:", error);
            toast.error(error?.response?.data?.message || "Failed to connect Roblox account");
        } finally {
            setIsConnectingRoblox(false);
        }
    };

    const handleConnectPayment = async () => {
        try {
            setIsConnectingPayment(true);

            let payoutMethodUpdate: any = {};

            if (paymentMethod === "stripe") {
                // For Stripe, we'd typically redirect to Stripe Connect
                // For now, we'll mark it as connected
                payoutMethodUpdate = {
                    payoutMethod: {
                        ...profile?.payoutMethod,
                        stripeConnected: true,
                    }
                };
            } else if (paymentMethod === "paypal") {
                if (!paypalEmail.trim()) {
                    toast.error("Please enter your PayPal email");
                    return;
                }
                payoutMethodUpdate = {
                    payoutMethod: {
                        ...profile?.payoutMethod,
                        paypalEmail: paypalEmail.trim(),
                    }
                };
            } else if (paymentMethod === "crypto") {
                const hasCrypto = cryptoWallet.btc || cryptoWallet.eth || cryptoWallet.usdt;
                if (!hasCrypto) {
                    toast.error("Please enter at least one crypto wallet address");
                    return;
                }
                payoutMethodUpdate = {
                    payoutMethod: {
                        ...profile?.payoutMethod,
                        cryptoWallets: {
                            btc: cryptoWallet.btc.trim() || "",
                            eth: cryptoWallet.eth.trim() || "",
                            usdt: cryptoWallet.usdt.trim() || "",
                        }
                    }
                };
            }

            await updateProfile(payoutMethodUpdate);
            toast.success("Payment method connected successfully!");
            
            // Clear form
            setPaypalEmail("");
            setCryptoWallet({ btc: "", eth: "", usdt: "" });
        } catch (error: any) {
            console.error("Failed to connect payment:", error);
            toast.error(error?.response?.data?.message || "Failed to connect payment method");
        } finally {
            setIsConnectingPayment(false);
        }
    };

    const handleCompleteOnboarding = async () => {
        if (!isOnboardingComplete) {
            toast.error("Please connect both payment method and Roblox account first");
            return;
        }

        try {
            await updateProfile({ isEnabled: true });
            toast.success("Seller account enabled! You can now start selling.");
            await reloadProfile();
            // Component will automatically re-render and show dashboard
        } catch (error: any) {
            console.error("Failed to enable seller account:", error);
            toast.error(error?.response?.data?.message || "Failed to enable seller account");
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-left">
                <h2 className="text-white text-3xl font-bold mb-2">Seller Onboarding</h2>
                <p className="text-gray-400 text-sm">
                    Connect your payment method and Roblox account to start selling
                </p>
            </div>

            {/* Connection Status */}
            <div className="grid grid-cols-2 gap-6">
                {/* Payment Status */}
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Wallet className="w-6 h-6 text-[#5650EF]" />
                            <h3 className="text-white text-lg font-semibold">Payment Method</h3>
                        </div>
                        {isPaymentConnected ? (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                            <XCircle className="w-6 h-6 text-red-500" />
                        )}
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                        {isPaymentConnected
                            ? "Payment method connected"
                            : "Connect a payment method to receive payouts"}
                    </p>
                    {isPaymentConnected && profile?.payoutMethod && (
                        <div className="text-gray-300 text-sm">
                            {profile.payoutMethod.stripeConnected && (
                                <div>✓ Stripe Connected</div>
                            )}
                            {profile.payoutMethod.paypalEmail && (
                                <div>✓ PayPal: {profile.payoutMethod.paypalEmail}</div>
                            )}
                            {profile.payoutMethod.cryptoWallets && (
                                <div>
                                    {profile.payoutMethod.cryptoWallets.btc && <div>✓ BTC Wallet</div>}
                                    {profile.payoutMethod.cryptoWallets.eth && <div>✓ ETH Wallet</div>}
                                    {profile.payoutMethod.cryptoWallets.usdt && <div>✓ USDT Wallet</div>}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Roblox Status */}
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Gamepad2 className="w-6 h-6 text-[#5650EF]" />
                            <h3 className="text-white text-lg font-semibold">Roblox Account</h3>
                        </div>
                        {isRobloxConnected ? (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                            <XCircle className="w-6 h-6 text-red-500" />
                        )}
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                        {isRobloxConnected
                            ? `Connected as ${user?.robloxUsername}`
                            : "Connect your Roblox account to deliver items"}
                    </p>
                    {isRobloxConnected && user?.robloxUserId && (
                        <div className="text-gray-300 text-sm">
                            <div>User ID: {user.robloxUserId}</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Payment Connection Form */}
            {!isPaymentConnected && (
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-6">
                    <h3 className="text-white text-xl font-semibold mb-4">Connect Payment Method</h3>
                    
                    <div className="mb-4">
                        <label className="text-gray-300 text-sm mb-2 block">Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value as "stripe" | "paypal" | "crypto")}
                            className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-2 text-white focus:outline-none focus:border-[#5650EF]"
                        >
                            <option value="stripe">Stripe</option>
                            <option value="paypal">PayPal</option>
                            <option value="crypto">Cryptocurrency</option>
                        </select>
                    </div>

                    {paymentMethod === "paypal" && (
                        <div className="mb-4">
                            <label className="text-gray-300 text-sm mb-2 block">PayPal Email</label>
                            <input
                                type="email"
                                value={paypalEmail}
                                onChange={(e) => setPaypalEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#5650EF]"
                            />
                        </div>
                    )}

                    {paymentMethod === "crypto" && (
                        <div className="space-y-3 mb-4">
                            <div>
                                <label className="text-gray-300 text-sm mb-2 block">Bitcoin (BTC) Wallet</label>
                                <input
                                    type="text"
                                    value={cryptoWallet.btc}
                                    onChange={(e) => setCryptoWallet({ ...cryptoWallet, btc: e.target.value })}
                                    placeholder="Enter BTC wallet address"
                                    className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#5650EF]"
                                />
                            </div>
                            <div>
                                <label className="text-gray-300 text-sm mb-2 block">Ethereum (ETH) Wallet</label>
                                <input
                                    type="text"
                                    value={cryptoWallet.eth}
                                    onChange={(e) => setCryptoWallet({ ...cryptoWallet, eth: e.target.value })}
                                    placeholder="Enter ETH wallet address"
                                    className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#5650EF]"
                                />
                            </div>
                            <div>
                                <label className="text-gray-300 text-sm mb-2 block">USDT Wallet</label>
                                <input
                                    type="text"
                                    value={cryptoWallet.usdt}
                                    onChange={(e) => setCryptoWallet({ ...cryptoWallet, usdt: e.target.value })}
                                    placeholder="Enter USDT wallet address"
                                    className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#5650EF]"
                                />
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleConnectPayment}
                        disabled={isConnectingPayment}
                        className="w-full bg-[#5650EF] hover:bg-[#5650EF]/80 text-white font-semibold py-3 px-6 rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isConnectingPayment ? "Connecting..." : "Connect Payment Method"}
                    </button>
                </div>
            )}

            {/* Roblox Connection Form */}
            {!isRobloxConnected && (
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-6">
                    <h3 className="text-white text-xl font-semibold mb-4">Connect Roblox Account</h3>
                    
                    <div className="mb-4">
                        <label className="text-gray-300 text-sm mb-2 block">Roblox Username</label>
                        <input
                            type="text"
                            value={robloxUsername}
                            onChange={(e) => setRobloxUsername(e.target.value)}
                            placeholder="Enter your Roblox username"
                            className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#5650EF]"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-300 text-sm mb-2 block">Roblox User ID</label>
                        <input
                            type="text"
                            value={robloxUserId}
                            onChange={(e) => setRobloxUserId(e.target.value)}
                            placeholder="Enter your Roblox User ID"
                            className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#5650EF]"
                        />
                        <p className="text-gray-500 text-xs mt-2">
                            You can find your User ID on your Roblox profile page
                        </p>
                    </div>

                    <button
                        onClick={handleConnectRoblox}
                        disabled={isConnectingRoblox}
                        className="w-full bg-[#5650EF] hover:bg-[#5650EF]/80 text-white font-semibold py-3 px-6 rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isConnectingRoblox ? "Connecting..." : "Connect Roblox Account"}
                    </button>
                </div>
            )}

            {/* Complete Onboarding Button */}
            {isOnboardingComplete && !profile?.isEnabled && (
                <div className="bg-[#5650EF]/10 border border-[#5650EF] rounded-sm p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">Ready to Start Selling!</h3>
                    <p className="text-gray-400 text-sm mb-4">
                        Both payment method and Roblox account are connected. Enable your seller account to start listing items.
                    </p>
                    <button
                        onClick={handleCompleteOnboarding}
                        className="w-full bg-[#5650EF] hover:bg-[#5650EF]/80 text-white font-semibold py-3 px-6 rounded-sm transition-all"
                    >
                        Enable Seller Account
                    </button>
                </div>
            )}
        </div>
    );
};


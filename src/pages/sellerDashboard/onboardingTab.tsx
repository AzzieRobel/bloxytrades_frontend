import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Gamepad2, Copy, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { useSeller } from "@/hooks/useSeller";
import { useUser } from "@/hooks/useUser";

export const OnboardingTab = () => {
    const { profile, reloadProfile, updateProfile } = useSeller();
    const { 
        user, 
        initiateRobloxVerification, 
        verifyRobloxCode, 
        getPendingRobloxVerification,
        cancelRobloxVerification,
        reloadUser 
    } = useUser();
    const [isConnectingRoblox, setIsConnectingRoblox] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [robloxUsername, setRobloxUsername] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [verificationId, setVerificationId] = useState<string | null>(null);
    const [showInstructions, setShowInstructions] = useState(false);

    // Check if roblox is connected and verified
    const isRobloxConnected = !!(
        user?.robloxUserId && 
        user?.robloxUsername && 
        user?.robloxVerifiedAt
    );

    // Check if onboarding is complete (only requires Roblox now)
    const isOnboardingComplete = isRobloxConnected;

    // Check for pending verification on mount
    useEffect(() => {
        const checkPending = async () => {
            try {
                const result = await getPendingRobloxVerification();
                if (result.pending) {
                    setVerificationCode(result.pending.verificationCode);
                    setVerificationId(result.pending.verificationId);
                    setRobloxUsername(result.pending.robloxUsername);
                    setShowInstructions(true);
                }
            } catch (error) {
                console.error("Failed to check pending verification:", error);
            }
        };
        if (!isRobloxConnected) {
            void checkPending();
        }
    }, [isRobloxConnected, getPendingRobloxVerification]);

    const handleInitiateVerification = async () => {
        if (!robloxUsername.trim()) {
            toast.error("Please enter your Roblox username");
            return;
        }

        try {
            setIsConnectingRoblox(true);
            const result = await initiateRobloxVerification(robloxUsername.trim());
            setVerificationCode(result.verificationCode);
            setVerificationId(result.verificationId);
            setShowInstructions(true);
            toast.success(`Verification code generated: ${result.verificationCode}`);
        } catch (error: any) {
            console.error("Failed to initiate verification:", error);
            toast.error(error?.response?.data?.message || "Failed to generate verification code");
        } finally {
            setIsConnectingRoblox(false);
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationId) {
            toast.error("Please generate a verification code first");
            return;
        }

        try {
            setIsVerifying(true);
            const result = await verifyRobloxCode(verificationId);
            if (result.success) {
                toast.success("Roblox account verified successfully!");
                await reloadUser();
                setShowInstructions(false);
                setVerificationCode("");
                setVerificationId(null);
                setRobloxUsername("");
            }
        } catch (error: any) {
            console.error("Failed to verify code:", error);
            toast.error(error?.response?.data?.message || "Verification failed. Make sure you pasted the code correctly.");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleCancelVerification = async () => {
        if (verificationId) {
            try {
                await cancelRobloxVerification(verificationId);
            } catch (error) {
                console.error("Failed to cancel verification:", error);
            }
        }
        setShowInstructions(false);
        setVerificationCode("");
        setVerificationId(null);
    };

    const handleCompleteOnboarding = async () => {
        if (!isOnboardingComplete) {
            toast.error("Please connect your Roblox account first");
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
                    Connect your Roblox account to start selling
                </p>
            </div>

            {/* Connection Status */}
            <div className="grid grid-cols-1 gap-6">
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

            {/* Roblox Connection Form */}
            {!isRobloxConnected && (
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-6">
                    <h3 className="text-white text-xl font-semibold mb-4">Connect Roblox Account</h3>
                    
                    {!showInstructions ? (
                        <>
                            <div className="mb-4">
                                <label className="text-gray-300 text-sm mb-2 block">Roblox Username</label>
                                <input
                                    type="text"
                                    value={robloxUsername}
                                    onChange={(e) => setRobloxUsername(e.target.value)}
                                    placeholder="Enter your Roblox username"
                                    className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#5650EF]"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            void handleInitiateVerification();
                                        }
                                    }}
                                />
                                <p className="text-gray-500 text-xs mt-2">
                                    Enter your exact Roblox username (case-insensitive)
                                </p>
                            </div>
                            <button
                                onClick={handleInitiateVerification}
                                disabled={isConnectingRoblox || !robloxUsername.trim()}
                                className="w-full bg-[#5650EF] hover:bg-[#5650EF]/80 text-white font-semibold py-3 px-6 rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isConnectingRoblox ? "Generating Code..." : "Generate Verification Code"}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="bg-[#5650EF]/10 border border-[#5650EF]/20 rounded-sm p-4 mb-4">
                                <h4 className="text-white font-semibold mb-3">Verification Code:</h4>
                                <div className="flex items-center gap-2 mb-4">
                                    <code className="text-2xl font-bold text-[#5650EF] bg-black/40 px-4 py-2 rounded flex-1 text-center">
                                        {verificationCode}
                                    </code>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(verificationCode);
                                            toast.success("Code copied to clipboard!");
                                        }}
                                        className="bg-[#5650EF] hover:bg-[#5650EF]/80 text-white p-2 rounded transition-all"
                                        title="Copy code"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="text-gray-300 text-sm space-y-2">
                                    <p className="font-semibold text-white">Instructions:</p>
                                    <ol className="list-decimal list-inside space-y-2 ml-2">
                                        <li>
                                            Go to your{" "}
                                            <a
                                                href={`https://www.roblox.com/users/${robloxUsername}/profile`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#5650EF] hover:underline inline-flex items-center gap-1"
                                            >
                                                Roblox profile
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </li>
                                        <li>Click "Edit" on your "About" section</li>
                                        <li>
                                            Paste the code <code className="bg-black/40 px-1 rounded">{verificationCode}</code> anywhere in the description
                                        </li>
                                        <li>Click "Save" to save your profile</li>
                                        <li>Come back here and click "Verify" below</li>
                                    </ol>
                                    <p className="text-gray-400 text-xs mt-3 pt-3 border-t border-white/10">
                                        💡 Tip: The code must be pasted exactly as shown. You can remove it after verification.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleVerifyCode}
                                    disabled={isVerifying}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isVerifying ? "Verifying..." : "Verify Code"}
                                </button>
                                <button
                                    onClick={handleCancelVerification}
                                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-sm transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Complete Onboarding Button */}
            {isOnboardingComplete && !profile?.isEnabled && (
                <div className="bg-[#5650EF]/10 border border-[#5650EF] rounded-sm p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">Ready to Start Selling!</h3>
                    <p className="text-gray-400 text-sm mb-4">
                        Your Roblox account is connected and verified. Enable your seller account to start listing items.
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


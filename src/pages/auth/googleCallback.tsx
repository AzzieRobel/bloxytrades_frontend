import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function AuthGoogleCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { googleLogin } = useAuth();
    const hasProcessed = useRef(false); // Prevent duplicate processing

    useEffect(() => {
        // Guard: Only process once, even with React StrictMode double-mounting
        if (hasProcessed.current) return;
        
        const handleCallback = async () => {
            const code = searchParams.get("code");
            console.log("callback_code", code);

            if (code && !hasProcessed.current) {
                hasProcessed.current = true; // Mark as processing immediately
                
                try {
                    const result = await googleLogin(code);
                    if (result && result.success) {
                        navigate("/", { replace: true }); // Use replace to prevent back button issues
                    } else {
                        navigate("/", { replace: true });
                    }
                } catch (error) {
                    console.error("Google login callback error:", error);
                    navigate("/", { replace: true });
                }
            } else if (!code) {
                console.error("No authorization code received from Google");
                navigate("/", { replace: true });
            }
        };

        handleCallback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array - only run once on mount

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-400">Completing Google sign-in...</p>
            </div>
        </div>
    );
}
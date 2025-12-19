import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useAuth } from "@/hooks/useAuth";

import { HeroSection } from "./hero";
import { WhyChooseSection } from "./whyChoose";
import { HowWorksSection } from "./howWorks";
import { TrustSection } from "./trust";
import { FAQSection } from "./faqs";

export default function Home() {
  const location = useLocation();
  const { openLoginModal } = useAuthModal();
  const { isAuthenticated } = useAuth();
  const hasOpenedModal = useRef(false);

  useEffect(() => {
    // If redirected from a protected route and not authenticated, open login modal
    const fromProtectedRoute = location.state?.from || sessionStorage.getItem('redirectedFromProtectedRoute');
    if (fromProtectedRoute && !isAuthenticated && !hasOpenedModal.current) {
      // Clear the sessionStorage flag
      sessionStorage.removeItem('redirectedFromProtectedRoute');
      // Use a small delay to ensure the page has rendered
      const timer = setTimeout(() => {
        openLoginModal();
        hasOpenedModal.current = true;
      }, 50);
      return () => clearTimeout(timer);
    }
    // Reset flag when authenticated
    if (isAuthenticated) {
      hasOpenedModal.current = false;
    }
  }, [location.state, isAuthenticated, openLoginModal]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection />

      <div className="w-full h-[6px] bg-gradient-to-r from-[#5650EF] to-[#5650EF]/0" />

      {/* Why Choose Section */}
      <WhyChooseSection />

      {/* How It Works Section */}
      <HowWorksSection />

      {/* Trust Section */}
      <TrustSection />

      {/* FAQ Section */}
      <FAQSection />
    </div >
  );
}

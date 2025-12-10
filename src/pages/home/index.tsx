
import { HeroSection } from "./hero";
import { WhyChooseSection } from "./whyChoose";
import { HowWorksSection } from "./howWorks";
import { TrustSection } from "./trust";
import { FAQSection } from "./faqs";

export default function Home() {

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

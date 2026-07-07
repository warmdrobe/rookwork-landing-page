import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import PricingSection from "./PricingSection";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen font-body overflow-y-auto scroll-smooth bg-[#F3F4F6] text-[#111827]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <Footer />
    </div>
  );
}

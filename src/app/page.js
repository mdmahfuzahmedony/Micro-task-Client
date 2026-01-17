import FAQSection from "@/components/ui/FAQ";
import FeaturesSection from "@/components/ui/features-service";
import HeroSection from "@/components/ui/HeroSection";
import HowItWorks from "@/components/ui/howtoworks";
import TopEarners from "@/components/ui/topEarners";


export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <FeaturesSection></FeaturesSection>
      <HowItWorks></HowItWorks>
      <TopEarners></TopEarners>
      <FAQSection></FAQSection>
     
    </div>
  );
}

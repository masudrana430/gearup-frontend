import { CategoryShowcase } from "@/components/home/category-showcase";
import { FeaturedGear } from "@/components/home/featured-gear";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { ProviderCta } from "@/components/home/provider-cta";
import { StatisticsSection } from "@/components/home/statistics-section";
import { Testimonials } from "@/components/home/testimonials";


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedGear />
      <HowItWorks />
      <StatisticsSection />
      <Testimonials />
      <ProviderCta />
    </>
  );
}
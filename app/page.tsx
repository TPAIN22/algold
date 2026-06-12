import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { WhatsAppCTA } from "@/components/home/WhatsAppCTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20">
        <Hero />
        <FeaturedProducts />
        <CategoriesSection />
        <AboutSection />
        <WhyChooseUs />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}

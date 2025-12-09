import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { TrendingCarousel } from "@/components/home/TrendingCarousel";
import { BrandShowcase } from "@/components/home/BrandShowcase";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TrendingCarousel />
        <BrandShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

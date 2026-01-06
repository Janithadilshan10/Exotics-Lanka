import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { TrendingCarousel } from "@/components/home/TrendingCarousel";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { PageTransition } from "@/components/PageTransition";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageTransition>
        <main id="main-content">
          <Hero />
          <TrendingCarousel />
          <BrandShowcase />
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Index;

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { TrendingCarousel } from "@/components/home/TrendingCarousel";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Exotics Lanka - Premium Luxury Cars in Sri Lanka"
        description="Discover the finest collection of exotic and luxury vehicles in Sri Lanka. Browse premium cars from top brands like Ferrari, Lamborghini, Porsche, and more."
        keywords="luxury cars sri lanka, exotic cars, premium vehicles, sports cars, supercars, car dealership sri lanka"
        ogImage="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=630&fit=crop"
      />
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

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { FeaturedSpotlight } from "@/components/home/FeaturedSpotlight";
import { TrustContent } from "@/components/home/TrustContent";
import { SellerCTA } from "@/components/home/SellerCTA";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { StatsBar } from "@/components/home/StatsBar";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Exotics Lanka - Premium Luxury Cars in Sri Lanka"
        description="Discover the finest collection of exotic and luxury vehicles in Sri Lanka. Browse premium cars from top brands like Ferrari, Lamborghini, Porsche, and more."
        keywords="luxury cars sri lanka, exotic cars, premium vehicles, sports cars, supercars, car dealership sri lanka"
        image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=630&fit=crop"
      />
      <Navbar />
      <PageTransition>
        <main id="main-content">
          <Hero />

          {/* Animated Statistics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <StatsBar />
          </motion.div>

          {/* Animated Brand Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <BrandShowcase />
          </motion.div>

          {/* Animated Featured Spotlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FeaturedSpotlight />
          </motion.div>

          {/* Animated Trust Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <TrustContent />
          </motion.div>

          {/* Animated Seller CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <SellerCTA />
          </motion.div>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Index;

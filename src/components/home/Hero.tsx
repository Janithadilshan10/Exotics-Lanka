import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dark mode image - Porsche at night
  const darkImage = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop";
  
  // Light mode image - Elegant white Porsche in pristine bright setting
  const lightImage = "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2070&auto=format&fit=crop";

  const currentTheme = mounted ? theme : "dark";
  const isDark = currentTheme === "dark";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Theme-aware Background Image */}
      <div className="absolute inset-0">
        <img 
          src={isDark ? darkImage : lightImage}
          alt="Luxury Vehicle"
          className="w-full h-full object-cover object-center transition-opacity duration-500"
        />
        {/* Theme-aware overlay for readability */}
        {isDark ? (
          <>
            {/* Dark mode overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
          </>
        ) : (
          <>
            {/* Light mode overlay - polished premium overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/70" />
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(40,25%,98%)]/50 via-transparent to-[hsl(40,25%,98%)]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/8 via-transparent to-transparent" />
          </>
        )}
      </div>

      {/* Floating Elements - Removed to show car image clearly */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Minimal Heading */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light tracking-wide mb-16 animate-fade-in leading-tight drop-shadow-2xl">
            <span className="text-gold-gradient">Exotics</span>
          </h1>

          {/* Search Bar - Minimal */}
          <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gold-gradient rounded-2xl opacity-0 blur-lg group-hover:opacity-20 transition-opacity" />
              <div className="relative flex items-center glass-card rounded-2xl border border-primary/20 shadow-2xl backdrop-blur-xl">
                <Search className="ml-6 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by make, model, or keyword..."
                  className="flex-1 px-5 py-6 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none font-sans-luxury tracking-wide"
                />
                <Button variant="gold" size="lg" className="m-2 magnetic-button">
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Single CTA - Minimal */}
          <div className="flex items-center justify-center gap-6 mt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/collection">
              <Button variant="luxury" size="xl" className="group magnetic-button">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/sell">
              <Button variant="luxury-outline" size="xl" className="magnetic-button">
                Sell Your Car
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

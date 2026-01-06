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
  
  // Light mode image - White/Silver Porsche in bright elegant setting
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
            {/* Light mode overlay - warm champagne/cream tint matching theme */}
            <div className="absolute inset-0 bg-[hsl(40,25%,96%)]/90" />
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(40,25%,96%)]/95 via-[hsl(40,25%,96%)]/85 to-[hsl(40,25%,96%)]/90" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-primary/6" />
          </>
        )}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Sri Lanka's Premier Luxury Marketplace
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Where Elegance
            <br />
            <span className="text-gold-gradient">Meets the Road</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover exceptional vehicles curated for those who demand perfection.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gold-gradient rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity" />
              <div className="relative flex items-center bg-card rounded-xl border border-border shadow-xl">
                <Search className="ml-5 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by make, model, or keyword..."
                  className="flex-1 px-4 py-5 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <Button variant="gold" size="lg" className="m-2">
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/collection">
              <Button variant="luxury" size="xl" className="group">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/sell">
              <Button variant="luxury-outline" size="xl">
                Sell Your Car
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-gold-gradient">500+</p>
              <p className="text-sm text-muted-foreground mt-1">Luxury Vehicles</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-gold-gradient">50+</p>
              <p className="text-sm text-muted-foreground mt-1">Verified Dealers</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-gold-gradient">10K+</p>
              <p className="text-sm text-muted-foreground mt-1">Happy Buyers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

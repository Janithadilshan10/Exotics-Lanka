import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />

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

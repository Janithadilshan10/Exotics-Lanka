import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = () => {
    navigate(`/collection?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Dark mode image - Porsche at night
  const darkImage = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop";

  // Light mode image - Elegant white luxury car (McLaren/Porsche) in minimalist setting
  const lightImage = "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?q=80&w=2544&auto=format&fit=crop";

  const currentTheme = mounted ? theme : "dark";
  const isDark = currentTheme === "dark";

  return (
    <section className="relative min-h-screen flex items-end justify-center pb-32 overflow-hidden">
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
            {/* Light mode overlay - polished premium overlay for high contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white/80" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
          </>
        )}
      </div>

      {/* Floating Elements - Removed to show car image clearly */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Minimal Heading */}
          {/* Premium Tagline */}
          <div className="relative mb-12 pt-20 text-center">
            <p className={cn(
              "font-luxury text-sm md:text-base tracking-[0.3em] uppercase mb-4 transition-colors duration-300",
              isDark ? "text-white/60" : "text-zinc-600"
            )}>
              Where Sri Lanka's Most Discerning Collectors
            </p>
            <h1 className={cn(
              "font-display text-3xl md:text-5xl font-light tracking-tight transition-colors duration-300",
              isDark ? "text-white" : "text-zinc-900"
            )}>
              Find Their Next <span className="text-primary font-medium">Masterpiece</span>
            </h1>
          </div>

          {/* Search Bar - Premium Glassmorphism */}
          <div className="max-w-3xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000" />
              <div className={`relative flex items-center ${isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-white/80 border-black/5 text-zinc-900'} backdrop-blur-xl border rounded-full p-2 shadow-2xl transition-all duration-300`}>
                <Search className={`ml-6 h-5 w-5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search by make, model, or keyword..."
                  className={`flex-1 px-6 py-4 bg-transparent outline-none border-none placeholder:text-zinc-500 font-sans text-lg tracking-wide ${isDark ? 'text-white' : 'text-zinc-900'}`}
                />
                <Button
                  onClick={handleSearch}
                  className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                >
                  FIND VEHICLE
                </Button>
              </div>
            </div>
          </div>

          {/* Luxury Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Link to="/collection">
              <Button variant="outline" size="xl" className={`min-w-[200px] transition-all duration-500 uppercase tracking-widest text-sm font-semibold rounded-none ${isDark ? 'border-white/20 text-white hover:bg-white hover:text-black' : 'border-zinc-900/20 text-zinc-900 hover:bg-zinc-900 hover:text-white'}`}>
                View Collection
              </Button>
            </Link>
            <Link to="/sell">
              <Button variant="ghost" size="xl" className={`min-w-[200px] transition-all duration-500 uppercase tracking-widest text-sm font-semibold rounded-none group ${isDark ? 'text-white hover:bg-white/5' : 'text-zinc-900 hover:bg-black/5'}`}>
                Sell Your Car
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Heart, MapPin, Gauge, Fuel, Calendar, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useComparison } from "@/contexts/ComparisonContext";

interface Car {
  id: string;
  title: string;
  brand: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  location: string;
  image: string;
  healthScore?: number;
  views?: number;
  favorites?: number;
  daysListed?: number;
  isNew?: boolean;
  trending?: boolean;
  priceAlert?: string;
}

interface CarCardProps {
  car: Car;
  showHealthScore?: boolean;
}

export function CarCard({ car, showHealthScore = false }: CarCardProps) {
  const formatPrice = (price: number) => {
    return `LKR ${(price / 1000000).toFixed(1)}M`;
  };

  const formatMileage = (mileage: number) => {
    return `${(mileage / 1000).toFixed(0)}K km`;
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-500 bg-emerald-500/10";
    if (score >= 70) return "text-amber-500 bg-amber-500/10";
    return "text-rose-500 bg-rose-500/10";
  };

  return (
    <Link to={`/cars/${car.id}`} className="block">
      <div className="group relative glass-card rounded-3xl overflow-hidden card-lift shadow-lg hover:shadow-2xl transition-all duration-500">
        {/* Image Container - Larger for Premium Feel */}
        <div className="relative aspect-[5/3] overflow-hidden image-overlay-luxury">
          <img
            src={car.image}
            alt={car.title}
            className="w-full h-full object-cover parallax-slow group-hover:scale-105 transition-transform duration-700"
          />

          {/* Premium Gradient Overlay - handled by image-overlay-luxury class */}

          {/* Badges */}
          <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
            {/* Verified Badge - Always Show */}
            <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground font-sans-luxury font-semibold tracking-wide text-xs px-3 py-1 shadow-lg animate-scale-in">
              <Shield className="w-3 h-3 mr-1.5 fill-current" />
              VERIFIED
            </Badge>

            {car.isNew && (
              <Badge className="bg-white/10 backdrop-blur-sm text-white border border-white/20 font-sans-luxury font-semibold tracking-wide text-xs px-3 py-1 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                NEW
              </Badge>
            )}
            {car.trending && (
              <Badge className="bg-emerald-500/90 backdrop-blur-sm text-white font-sans-luxury font-semibold tracking-wide text-xs px-3 py-1 glow-emerald animate-scale-in" style={{ animationDelay: '0.2s' }}>
                TRENDING
              </Badge>
            )}
          </div>

          {/* Favorite Button - Minimal */}
          <button
            className="absolute top-6 right-6 p-2.5 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-primary hover:text-primary-foreground transition-all duration-300 z-10 shadow-lg opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle favorite logic here
            }}
            aria-label="Add to favorites"
          >
            <Heart className="h-4 w-4" />
          </button>

          {/* Health Score (Dealer View) */}
          {showHealthScore && car.healthScore && (
            <div className={cn(
              "absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-sm font-semibold",
              getHealthScoreColor(car.healthScore)
            )}>
              Score: {car.healthScore}
            </div>
          )}

          {/* Price - Prominent Display */}
          <div className="absolute bottom-6 left-6 z-10">
            <p className="text-white font-display text-4xl md:text-5xl font-light tracking-wider text-gold-gradient drop-shadow-2xl">
              {formatPrice(car.price)}
            </p>
          </div>
        </div>

        {/* Content - Ultra Minimal, Everything Hidden Until Hover */}
        <div className="p-6 space-y-4">
          {/* Main Info */}
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-wide text-primary truncate">
              {car.title}
            </h3>
            <p className="font-sans-luxury text-sm text-muted-foreground mt-1">
              {car.year} • {car.transmission}
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid gap-2 text-sm text-muted-foreground font-sans-luxury border-t border-border/50 pt-4">
            <div className="flex items-center gap-3">
              <Gauge className="h-4 w-4 text-primary/80" />
              <span className="tracking-wide text-foreground/80">{formatMileage(car.mileage)} kilometers</span>
            </div>
            <div className="flex items-center gap-3">
              <Fuel className="h-4 w-4 text-primary/80" />
              <span className="tracking-wide text-foreground/80">{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary/80" />
              <span className="truncate tracking-wide text-foreground/80">{car.location}</span>
            </div>
          </div>

          {/* Price Alert */}
          {car.priceAlert && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <p className="text-xs text-rose-500 font-medium flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                {car.priceAlert}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

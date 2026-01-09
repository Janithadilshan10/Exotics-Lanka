import { Heart, MapPin, Gauge, Fuel, Calendar, GitCompare } from "lucide-react";
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
  const { addToComparison, removeFromComparison, isInComparison, maxComparisonReached } = useComparison();
  const inComparison = isInComparison(car.id);

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

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inComparison) {
      removeFromComparison(car.id);
    } else {
      addToComparison(car);
    }
  };

  return (
    <div className="group relative glass-card rounded-3xl overflow-hidden card-lift shadow-lg">
        {/* Image Container - Larger for Premium Feel */}
        <div className="relative aspect-[5/3] overflow-hidden image-overlay-luxury">
        <img
          src={car.image}
          alt={car.title}
          className="w-full h-full object-cover parallax-slow"
        />
        
        {/* Premium Gradient Overlay - handled by image-overlay-luxury class */}
        
        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
          {/* Verified Badge - Always Show */}
          <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground font-sans-luxury font-semibold tracking-wide text-xs px-3 py-1 shadow-lg animate-scale-in">
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
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

        {/* Favorite Button */}
        <button 
          className="absolute top-6 right-6 p-3 rounded-full glass backdrop-blur-xl text-white hover:bg-primary/20 hover:text-primary transition-all duration-300 z-10 magnetic-button shadow-lg"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Handle favorite logic here
          }}
          aria-label="Add to favorites"
        >
          <Heart className="h-5 w-5" />
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
      <div className="p-8">
        {/* Main Info - Brand Always Visible, Rest on Hover */}
        <div className="mb-4">
          <h3 className="font-sans-luxury text-2xl font-light tracking-wide line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {car.brand}
          </h3>
          {/* Year & Transmission - Hidden by Default */}
          <p className="font-luxury text-lg text-muted-foreground mt-1 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
            {car.year} • {car.transmission}
          </p>
        </div>

        {/* Specs Grid - Hidden by Default, Show on Hover */}
        <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden space-y-3 text-sm text-muted-foreground font-sans-luxury">
          <div className="flex items-center gap-2.5 pt-2">
            <Gauge className="h-4 w-4 text-primary" />
            <span className="tracking-wide">{formatMileage(car.mileage)} kilometers</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Fuel className="h-4 w-4 text-primary" />
            <span className="tracking-wide">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="truncate tracking-wide">{car.location}</span>
          </div>
        </div>

        {/* Price Alert - Show on Hover */}
        {car.priceAlert && (
          <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
            <p className="text-xs text-rose-500 font-medium">⚠️ {car.priceAlert}</p>
          </div>
        )}

        {/* Compare Button - Hidden by Default, Show on Hover */}
        <div className="mt-0 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-6 transition-all duration-500 overflow-hidden">
          <Button
            variant={inComparison ? "default" : "outline"}
            size="sm"
            className="w-full relative z-10 magnetic-button font-sans-luxury tracking-wide border-primary/30 hover:border-primary hover:shadow-hover-gold"
            onClick={handleCompareClick}
            disabled={!inComparison && maxComparisonReached}
          >
            <GitCompare className="h-4 w-4 mr-2" />
            {inComparison ? "Remove" : "Compare"}
          </Button>
        </div>
      </div>

      {/* Clickable overlay for navigation */}
      <Link to={`/car/${car.id}`} className="absolute inset-0 z-[1]" aria-label={`View details for ${car.title}`} />
    </div>
  );
}

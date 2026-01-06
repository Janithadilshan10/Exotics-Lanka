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
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border luxury-card">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={car.image}
          alt={car.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {car.isNew && (
            <Badge className="bg-primary text-primary-foreground">New</Badge>
          )}
          {car.trending && (
            <Badge className="bg-emerald-500 text-white">Trending</Badge>
          )}
        </div>

        {/* Favorite Button */}
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Handle favorite logic here
          }}
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

        {/* Price */}
        <div className="absolute bottom-4 left-4">
          <p className="text-white font-display text-2xl font-bold">
            {formatPrice(car.price)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold mb-3 line-clamp-1 group-hover:text-primary transition-colors">
          {car.title}
        </h3>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            <span>{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{car.location}</span>
          </div>
        </div>

        {/* Price Alert */}
        {car.priceAlert && (
          <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
            <p className="text-xs text-rose-500 font-medium">⚠️ {car.priceAlert}</p>
          </div>
        )}

        {/* Compare Button */}
        <Button
          variant={inComparison ? "default" : "outline"}
          size="sm"
          className="w-full mt-4 relative z-10"
          onClick={handleCompareClick}
          disabled={!inComparison && maxComparisonReached}
        >
          <GitCompare className="h-4 w-4 mr-2" />
          {inComparison ? "Remove from Compare" : "Add to Compare"}
        </Button>
      </div>

      {/* Clickable overlay for navigation */}
      <Link to={`/car/${car.id}`} className="absolute inset-0 z-[1]" aria-label={`View details for ${car.title}`} />
    </div>
  );
}

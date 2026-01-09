import { useComparison } from "@/contexts/ComparisonContext";
import { Button } from "@/components/ui/button";
import { X, GitCompare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function ComparisonBar() {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();

  if (comparisonList.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-2xl animate-slide-up">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          {/* Title */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <GitCompare className="h-5 w-5 text-primary" />
            <span className="font-semibold">Compare Vehicles</span>
            <span className="text-sm text-muted-foreground">
              ({comparisonList.length}/4)
            </span>
          </div>

          {/* Car items */}
          <div className="flex-1 flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {comparisonList.map((car) => (
              <div
                key={car.id}
                className={cn(
                  "flex-shrink-0 flex items-center gap-3 bg-muted rounded-lg p-2 pr-3",
                  "border border-border hover:border-primary transition-colors"
                )}
              >
                {/* Car Image */}
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-16 h-12 object-cover rounded"
                />

                {/* Car Info */}
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate max-w-[150px]">
                    {car.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    LKR {(car.price / 1000000).toFixed(1)}M
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromComparison(car.id)}
                  className="flex-shrink-0 p-1 hover:bg-destructive/10 rounded-full transition-colors group"
                  aria-label={`Remove ${car.title} from comparison`}
                >
                  <X className="h-4 w-4 text-muted-foreground group-hover:text-destructive" />
                </button>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {comparisonList.length >= 2 && (
              <Link to="/compare">
                <Button variant="gold" size="sm" className="gap-2">
                  Compare
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearComparison}
              className="text-muted-foreground hover:text-destructive"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Mobile minimum message */}
        {comparisonList.length === 1 && (
          <p className="text-xs text-muted-foreground mt-2 text-center sm:text-left">
            Add at least one more vehicle to compare
          </p>
        )}
      </div>
    </div>
  );
}




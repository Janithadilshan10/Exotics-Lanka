import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showCount?: boolean;
  count?: number;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  showCount = false,
  count,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleStarClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < Math.floor(rating);
          const isPartial = index < rating && index >= Math.floor(rating);
          const partialPercentage = isPartial ? ((rating % 1) * 100).toFixed(0) : "0";

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleStarClick(index)}
              disabled={!interactive}
              className={cn(
                "relative transition-all",
                interactive && "cursor-pointer hover:scale-110"
              )}
            >
              {/* Background star (empty) */}
              <Star
                className={cn(
                  sizeClasses[size],
                  "text-muted-foreground",
                  interactive && "group-hover:text-primary"
                )}
              />
              
              {/* Filled star (overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  width: isFilled ? "100%" : isPartial ? `${partialPercentage}%` : "0%",
                }}
              >
                <Star
                  className={cn(
                    sizeClasses[size],
                    "fill-primary text-primary"
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>

      {showCount && count !== undefined && (
        <span className="text-sm text-muted-foreground ml-1">
          ({count})
        </span>
      )}
    </div>
  );
}

// Alternative simple version for display only
export function StarRatingDisplay({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  showCount = false,
  count,
}: {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
}) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              index < rating
                ? "fill-primary text-primary"
                : "text-muted-foreground"
            )}
          />
        ))}
      </div>
      
      {showValue && (
        <span className="text-sm font-medium">
          {rating.toFixed(1)}
        </span>
      )}
      
      {showCount && count !== undefined && (
        <span className="text-sm text-muted-foreground">
          ({count} {count === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}


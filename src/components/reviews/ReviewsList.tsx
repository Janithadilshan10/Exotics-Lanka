import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StarRatingDisplay } from "./StarRating";
import { ReviewCard } from "./ReviewCard";
import { WriteReviewDialog } from "./WriteReviewDialog";
import { useReviews } from "@/contexts/ReviewContext";
import { useAuth } from "@/contexts/AuthContext";
import { Star, MessageSquare, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ReviewsListProps {
  listingId?: string;
  sellerId: string;
  sellerName: string;
  allowNewReview?: boolean;
}

export function ReviewsList({
  listingId,
  sellerId,
  sellerName,
  allowNewReview = false,
}: ReviewsListProps) {
  const { user, isAuthenticated } = useAuth();
  const {
    getReviewsForSeller,
    getReviewsForListing,
    getAverageRating,
    getRatingDistribution,
    canUserReview,
  } = useReviews();

  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating-high" | "rating-low">("recent");
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // Get reviews (either for specific listing or all seller reviews)
  const allReviews = listingId
    ? getReviewsForListing(listingId)
    : getReviewsForSeller(sellerId);

  const averageRating = getAverageRating(sellerId);
  const ratingDistribution = getRatingDistribution(sellerId);
  const totalReviews = getReviewsForSeller(sellerId).length;

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = [...allReviews];

    // Filter by rating
    if (filterRating !== null) {
      filtered = filtered.filter(review => review.rating === filterRating);
    }

    // Sort
    switch (sortBy) {
      case "helpful":
        filtered.sort((a, b) => b.helpfulCount - a.helpfulCount);
        break;
      case "rating-high":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "rating-low":
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case "recent":
      default:
        filtered.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return filtered;
  }, [allReviews, sortBy, filterRating]);

  const canWrite = listingId && isAuthenticated && user && canUserReview(listingId, user.id);

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center md:border-r border-border">
            <div className="mb-4">
              <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
              <StarRatingDisplay rating={Math.round(averageRating)} size="lg" />
              <p className="text-sm text-muted-foreground mt-2">
                Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
              </p>
            </div>

            {allowNewReview && canWrite && (
              <Button
                variant="gold"
                onClick={() => setIsWriteReviewOpen(true)}
                className="gap-2"
              >
                <Star className="h-4 w-4" />
                Write a Review
              </Button>
            )}
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating];
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <button
                  key={rating}
                  onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors ${
                    filterRating === rating ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="h-3 w-3 fill-primary text-primary" />
                  </div>
                  <Progress value={percentage} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      {allReviews.length > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">
              {filteredAndSortedReviews.length} {filteredAndSortedReviews.length === 1 ? "Review" : "Reviews"}
            </span>
            {filterRating && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilterRating(null)}
              >
                Clear Filter
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
                <SelectItem value="rating-high">Highest Rated</SelectItem>
                <SelectItem value="rating-low">Lowest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredAndSortedReviews.length > 0 ? (
          filteredAndSortedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              allowSellerResponse={user?.id === sellerId}
            />
          ))
        ) : allReviews.length > 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-xl">
            <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No reviews match your filter</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterRating(null)}
            >
              Clear Filter
            </Button>
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-xl">
            <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No reviews yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Be the first to review this seller
            </p>
            {allowNewReview && canWrite && (
              <Button
                variant="outline"
                onClick={() => setIsWriteReviewOpen(true)}
              >
                Write a Review
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Write Review Dialog */}
      {listingId && (
        <WriteReviewDialog
          isOpen={isWriteReviewOpen}
          onClose={() => setIsWriteReviewOpen(false)}
          listingId={listingId}
          sellerId={sellerId}
          sellerName={sellerName}
        />
      )}
    </div>
  );
}




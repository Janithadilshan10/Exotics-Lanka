import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { StarRatingDisplay } from "./StarRating";
import { Review, useReviews } from "@/contexts/ReviewContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  ThumbsUp,
  Flag,
  MessageSquare,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface ReviewCardProps {
  review: Review;
  showListingInfo?: boolean;
  allowSellerResponse?: boolean;
}

export function ReviewCard({
  review,
  showListingInfo = false,
  allowSellerResponse = false,
}: ReviewCardProps) {
  const { user } = useAuth();
  const { toggleHelpful, addSellerResponse, deleteReview } = useReviews();
  const [isResponding, setIsResponding] = useState(false);
  const [responseText, setResponseText] = useState("");

  const isOwnReview = user?.id === review.buyerId;
  const isSeller = user?.id === review.sellerId;
  const hasVoted = user ? review.helpfulVotes.includes(user.id) : false;

  const handleSubmitResponse = () => {
    if (!responseText.trim()) {
      toast.error("Please enter a response");
      return;
    }

    addSellerResponse(review.id, responseText.trim());
    setResponseText("");
    setIsResponding(false);
  };

  const formatDate = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={review.buyerAvatar} />
            <AvatarFallback>{review.buyerName.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold">{review.buyerName}</p>
              {review.verifiedPurchase && (
                <Badge variant="secondary" className="text-xs gap-1">
                  <Check className="h-3 w-3" />
                  Verified Purchase
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <StarRatingDisplay rating={review.rating} size="sm" />
              <span className="text-xs text-muted-foreground">
                {formatDate(review.createdAt)}
              </span>
              {review.updatedAt !== review.createdAt && (
                <span className="text-xs text-muted-foreground">
                  (edited)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isOwnReview && (
            <>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => deleteReview(review.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
          {!isOwnReview && (
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Flag className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Review Title */}
      {review.title && (
        <h4 className="font-semibold text-lg">{review.title}</h4>
      )}

      {/* Review Content */}
      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
        {review.comment}
      </p>

      {/* Review Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {review.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Review photo ${index + 1}`}
              className="h-24 w-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            />
          ))}
        </div>
      )}

      {/* Helpful Votes */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <Button
          variant={hasVoted ? "default" : "outline"}
          size="sm"
          onClick={() => toggleHelpful(review.id)}
          className="gap-2"
        >
          <ThumbsUp className={`h-4 w-4 ${hasVoted ? "fill-current" : ""}`} />
          Helpful ({review.helpfulCount})
        </Button>

        {allowSellerResponse && isSeller && !review.sellerResponse && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsResponding(true)}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Respond
          </Button>
        )}
      </div>

      {/* Seller Response Input */}
      {isResponding && (
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold">Response from seller</p>
          </div>
          <Textarea
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Write your response to this review..."
            rows={3}
            className="resize-none"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsResponding(false);
                setResponseText("");
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSubmitResponse}
              disabled={!responseText.trim()}
            >
              <Check className="h-4 w-4 mr-2" />
              Submit Response
            </Button>
          </div>
        </div>
      )}

      {/* Seller Response Display */}
      {review.sellerResponse && (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold">Response from seller</p>
            <span className="text-xs text-muted-foreground ml-auto">
              {formatDate(review.sellerResponse.timestamp)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {review.sellerResponse.comment}
          </p>
        </div>
      )}
    </div>
  );
}


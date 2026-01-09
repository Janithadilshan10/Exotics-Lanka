import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Upload, X } from "lucide-react";
import { useReviews } from "@/contexts/ReviewContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface WriteReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  sellerId: string;
  sellerName: string;
}

export function WriteReviewDialog({
  isOpen,
  onClose,
  listingId,
  sellerId,
  sellerName,
}: WriteReviewDialogProps) {
  const { user, isAuthenticated } = useAuth();
  const { addReview, canUserReview } = useReviews();
  
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [verifiedPurchase, setVerifiedPurchase] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!isAuthenticated || !user) {
      toast.error("Please log in to submit a review");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a review title");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write your review");
      return;
    }

    if (!canUserReview(listingId, user.id)) {
      toast.error("You have already reviewed this listing");
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    addReview({
      listingId,
      sellerId,
      sellerName,
      buyerId: user.id,
      buyerName: user.name,
      buyerAvatar: user.avatar,
      rating,
      title: title.trim(),
      comment: comment.trim(),
      photos: photos.length > 0 ? photos : undefined,
      verifiedPurchase,
    });

    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    setRating(0);
    setHoveredRating(0);
    setTitle("");
    setComment("");
    setPhotos([]);
    setVerifiedPurchase(false);
    onClose();
  };

  const handlePhotoAdd = () => {
    // Mock photo upload - in real app, this would handle file input
    const mockPhotoUrl = `https://images.unsplash.com/photo-${1500000000000 + Math.random() * 100000000000}?w=400&h=400&fit=crop`;
    if (photos.length < 5) {
      setPhotos([...photos, mockPhotoUrl]);
      toast.success("Photo added");
    } else {
      toast.error("Maximum 5 photos allowed");
    }
  };

  const handlePhotoRemove = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  const displayRating = hoveredRating || rating;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience with {sellerName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Rating */}
          <div className="space-y-3">
            <Label>Overall Rating *</Label>
            <div className="flex flex-col items-center gap-3 p-6 bg-muted/30 rounded-lg">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "h-10 w-10 transition-colors",
                        value <= displayRating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                  </button>
                ))}
              </div>
              {displayRating > 0 && (
                <p className="text-lg font-semibold text-primary">
                  {ratingLabels[displayRating as keyof typeof ratingLabels]}
                </p>
              )}
            </div>
          </div>

          {/* Review Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Review Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground text-right">
              {title.length}/100
            </p>
          </div>

          {/* Review Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review *</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe your experience with this seller and vehicle..."
              rows={6}
              className="resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground text-right">
              {comment.length}/1000
            </p>
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Add Photos (Optional)</Label>
            <div className="space-y-3">
              {photos.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Review photo ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handlePhotoRemove(index)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={handlePhotoAdd}
                disabled={photos.length >= 5}
                className="w-full gap-2"
              >
                <Upload className="h-4 w-4" />
                Add Photo ({photos.length}/5)
              </Button>
              <p className="text-xs text-muted-foreground">
                Add up to 5 photos to your review
              </p>
            </div>
          </div>

          {/* Verified Purchase */}
          <div className="flex items-center space-x-2 p-4 bg-muted/30 rounded-lg">
            <Checkbox
              id="verified"
              checked={verifiedPurchase}
              onCheckedChange={(checked) => setVerifiedPurchase(checked as boolean)}
            />
            <label
              htmlFor="verified"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              I purchased this vehicle from this seller
            </label>
          </div>

          {/* Guidelines */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm font-semibold mb-2">Review Guidelines:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Be honest and fair in your assessment</li>
              <li>• Focus on your experience with the seller and vehicle</li>
              <li>• Avoid offensive language or personal attacks</li>
              <li>• Don't include personal contact information</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="gold"
            onClick={handleSubmit}
            disabled={rating === 0 || !title.trim() || !comment.trim() || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}




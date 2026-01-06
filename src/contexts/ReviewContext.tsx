import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

export interface Review {
  id: string;
  listingId: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  photos?: string[];
  verifiedPurchase: boolean;
  helpfulCount: number;
  helpfulVotes: string[]; // User IDs who voted helpful
  sellerResponse?: {
    comment: string;
    timestamp: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ReviewContextType {
  reviews: Review[];
  getReviewsForListing: (listingId: string) => Review[];
  getReviewsForSeller: (sellerId: string) => Review[];
  getAverageRating: (sellerId: string) => number;
  getRatingDistribution: (sellerId: string) => { [key: number]: number };
  addReview: (review: Omit<Review, 'id' | 'helpfulCount' | 'helpfulVotes' | 'createdAt' | 'updatedAt'>) => void;
  updateReview: (reviewId: string, updates: Partial<Review>) => void;
  deleteReview: (reviewId: string) => void;
  toggleHelpful: (reviewId: string) => void;
  addSellerResponse: (reviewId: string, response: string) => void;
  canUserReview: (listingId: string, userId: string) => boolean;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load reviews from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch {
        setReviews([]);
      }
    }
  }, []);

  // Save reviews to localStorage
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const getReviewsForListing = (listingId: string) => {
    return reviews
      .filter(review => review.listingId === listingId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const getReviewsForSeller = (sellerId: string) => {
    return reviews
      .filter(review => review.sellerId === sellerId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const getAverageRating = (sellerId: string) => {
    const sellerReviews = getReviewsForSeller(sellerId);
    if (sellerReviews.length === 0) return 0;
    
    const sum = sellerReviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / sellerReviews.length).toFixed(1));
  };

  const getRatingDistribution = (sellerId: string) => {
    const sellerReviews = getReviewsForSeller(sellerId);
    const distribution: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    sellerReviews.forEach(review => {
      distribution[review.rating]++;
    });
    
    return distribution;
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'helpfulCount' | 'helpfulVotes' | 'createdAt' | 'updatedAt'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `review_${Date.now()}`,
      helpfulCount: 0,
      helpfulVotes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setReviews(prev => [newReview, ...prev]);
    toast.success('Review submitted successfully!');
  };

  const updateReview = (reviewId: string, updates: Partial<Review>) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? { ...review, ...updates, updatedAt: new Date().toISOString() }
          : review
      )
    );
    toast.success('Review updated');
  };

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
    toast.success('Review deleted');
  };

  const toggleHelpful = (reviewId: string) => {
    if (!user) {
      toast.error('Please log in to vote');
      return;
    }

    setReviews(prev =>
      prev.map(review => {
        if (review.id === reviewId) {
          const hasVoted = review.helpfulVotes.includes(user.id);
          
          if (hasVoted) {
            return {
              ...review,
              helpfulCount: review.helpfulCount - 1,
              helpfulVotes: review.helpfulVotes.filter(id => id !== user.id),
            };
          } else {
            return {
              ...review,
              helpfulCount: review.helpfulCount + 1,
              helpfulVotes: [...review.helpfulVotes, user.id],
            };
          }
        }
        return review;
      })
    );
  };

  const addSellerResponse = (reviewId: string, response: string) => {
    if (!user) return;

    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? {
              ...review,
              sellerResponse: {
                comment: response,
                timestamp: new Date().toISOString(),
              },
              updatedAt: new Date().toISOString(),
            }
          : review
      )
    );
    toast.success('Response added');
  };

  const canUserReview = (listingId: string, userId: string) => {
    // Check if user has already reviewed this listing
    const existingReview = reviews.find(
      review => review.listingId === listingId && review.buyerId === userId
    );
    return !existingReview;
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        getReviewsForListing,
        getReviewsForSeller,
        getAverageRating,
        getRatingDistribution,
        addReview,
        updateReview,
        deleteReview,
        toggleHelpful,
        addSellerResponse,
        canUserReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};


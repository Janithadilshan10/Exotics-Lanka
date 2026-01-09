import { ReactNode } from 'react';
import { Button } from './button';
import { 
  Search, 
  Heart, 
  Car, 
  MessageSquare, 
  Star, 
  Bell,
  FileText,
  ShoppingCart,
  Users,
  Package,
  Inbox,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'search' | 'error';
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  variant = 'default',
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
        className={`
          w-20 h-20 rounded-full flex items-center justify-center mb-6
          ${variant === 'error' 
            ? 'bg-destructive/10' 
            : variant === 'search'
            ? 'bg-primary/10'
            : 'bg-muted/50'
          }
        `}
      >
        <div className={`
          ${variant === 'error' 
            ? 'text-destructive' 
            : variant === 'search'
            ? 'text-primary'
            : 'text-muted-foreground'
          }
        `}>
          {icon}
        </div>
      </motion.div>

      {/* Title */}
      <h3 className="font-display text-2xl font-bold mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground max-w-md mb-6">
        {description}
      </p>

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {action && (
            <Button onClick={action.onClick} size="lg">
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button 
              onClick={secondaryAction.onClick} 
              variant="outline" 
              size="lg"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}

// Pre-configured empty states for common scenarios

export function NoSearchResults({ onClear }: { onClear?: () => void }) {
  return (
    <EmptyState
      icon={<Search className="h-10 w-10" />}
      title="No results found"
      description="We couldn't find any vehicles matching your search. Try adjusting your filters or search terms."
      variant="search"
      action={onClear ? {
        label: "Clear Filters",
        onClick: onClear,
      } : undefined}
      secondaryAction={{
        label: "Browse All",
        onClick: () => window.location.href = '/collection',
      }}
    />
  );
}

export function NoFavorites({ onBrowse }: { onBrowse?: () => void }) {
  return (
    <EmptyState
      icon={<Heart className="h-10 w-10" />}
      title="No favorites yet"
      description="Start building your dream garage by adding vehicles to your favorites. You'll find them all here."
      action={{
        label: "Browse Collection",
        onClick: onBrowse || (() => window.location.href = '/collection'),
      }}
    />
  );
}

export function NoListings({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={<Car className="h-10 w-10" />}
      title="No listings yet"
      description="You haven't created any listings. Start selling your vehicle by creating your first listing."
      action={onCreate ? {
        label: "Create Listing",
        onClick: onCreate,
      } : undefined}
    />
  );
}

export function NoMessages() {
  return (
    <EmptyState
      icon={<MessageSquare className="h-10 w-10" />}
      title="No messages"
      description="Your inbox is empty. Start a conversation with sellers about vehicles you're interested in."
      action={{
        label: "Browse Vehicles",
        onClick: () => window.location.href = '/collection',
      }}
    />
  );
}

export function NoReviews() {
  return (
    <EmptyState
      icon={<Star className="h-10 w-10" />}
      title="No reviews yet"
      description="This listing doesn't have any reviews yet. Be the first to share your experience!"
    />
  );
}

export function NoSavedSearches({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={<Bell className="h-10 w-10" />}
      title="No saved searches"
      description="Save your search filters to get notified when new vehicles match your criteria."
      action={onCreate ? {
        label: "Create Search",
        onClick: onCreate,
      } : {
        label: "Browse Collection",
        onClick: () => window.location.href = '/collection',
      }}
    />
  );
}

export function NoComparisonItems() {
  return (
    <EmptyState
      icon={<ShoppingCart className="h-10 w-10" />}
      title="Nothing to compare"
      description="Add vehicles to your comparison list to see them side by side and make an informed decision."
      action={{
        label: "Browse Vehicles",
        onClick: () => window.location.href = '/collection',
      }}
    />
  );
}

export function ErrorState({ 
  title = "Something went wrong",
  description = "We encountered an error loading this content. Please try again.",
  onRetry 
}: { 
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      icon={<AlertCircle className="h-10 w-10" />}
      title={title}
      description={description}
      variant="error"
      action={onRetry ? {
        label: "Try Again",
        onClick: onRetry,
      } : undefined}
      secondaryAction={{
        label: "Go Home",
        onClick: () => window.location.href = '/',
      }}
    />
  );
}

// Animated illustration components for empty states
export function EmptyIllustration({ type }: { type: 'car' | 'search' | 'message' | 'favorite' }) {
  const illustrations = {
    car: (
      <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto mb-6 opacity-20">
        <motion.path
          d="M40 100 L60 80 L100 80 L140 80 L160 100 L160 130 L40 130 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="70"
          cy="130"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        />
        <motion.circle
          cx="130"
          cy="130"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
        />
      </svg>
    ),
    search: (
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Search className="w-48 h-48 mx-auto mb-6 opacity-20" />
      </motion.div>
    ),
    message: (
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <MessageSquare className="w-48 h-48 mx-auto mb-6 opacity-20" />
      </motion.div>
    ),
    favorite: (
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Heart className="w-48 h-48 mx-auto mb-6 opacity-20" />
      </motion.div>
    ),
  };

  return illustrations[type];
}




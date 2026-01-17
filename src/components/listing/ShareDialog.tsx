import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  description?: string;
  price?: string;
}

export function ShareDialog({
  isOpen,
  onClose,
  title,
  url,
  description = "Check out this amazing vehicle on Exotics.lk",
  price,
}: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}${url}`;
  const shareText = `${title}${price ? ` - ${price}` : ''} | Exotics Lanka`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      emoji: "💬",
      color: "hover:bg-green-500/10 hover:text-green-600 dark:hover:text-green-400 hover:border-green-500/30",
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${description}\n\n${shareUrl}`)}`,
          "_blank"
        );
      },
    },
    {
      name: "Facebook",
      emoji: "📘",
      color: "hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30",
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          "_blank",
          "width=600,height=400"
        );
      },
    },
    {
      name: "Twitter",
      emoji: "𝕏",
      color: "hover:bg-zinc-500/10 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-500/30",
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          "_blank",
          "width=600,height=400"
        );
      },
    },
    {
      name: "Email",
      emoji: "✉️",
      color: "hover:bg-primary/10 hover:text-primary hover:border-primary/30",
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${description}\n\nView listing: ${shareUrl}`)}`;
      },
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Share this listing</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Share {title} with friends and family
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Social Share Options - Premium Grid */}
          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                variant="outline"
                className={cn(
                  "h-auto flex-col gap-3 py-5 transition-all duration-300 border-border/50",
                  option.color
                )}
                onClick={() => {
                  option.action();
                  toast.success(`Sharing via ${option.name}`);
                }}
              >
                <span className="text-4xl" role="img" aria-label={option.name}>
                  {option.emoji}
                </span>
                <span className="text-sm font-medium">{option.name}</span>
              </Button>
            ))}
          </div>

          {/* Copy Link Section - Refined */}
          <div className="space-y-3 pt-2 border-t border-border/50">
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              Or copy link
            </label>
            <div className="flex gap-2">
              <div className="flex-1 px-4 py-2.5 bg-muted/50 rounded-lg text-sm truncate font-mono text-muted-foreground border border-border/50">
                {shareUrl}
              </div>
              <Button
                size="sm"
                onClick={handleCopyLink}
                className="shrink-0 min-w-[80px]"
                variant={copied ? "default" : "outline"}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1.5" />
                    Copied!
                  </>
                ) : (
                  "Copy"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}




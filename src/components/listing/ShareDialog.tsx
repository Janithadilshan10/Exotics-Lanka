import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link as LinkIcon,
  MessageCircle,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  description?: string;
}

export function ShareDialog({
  isOpen,
  onClose,
  title,
  url,
  description = "Check out this amazing vehicle on Exotics.lk",
}: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-[#1877F2] hover:bg-[#1877F2]/90",
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
          "width=600,height=400"
        );
      },
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90",
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank",
          "width=600,height=400"
        );
      },
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-[#0A66C2] hover:bg-[#0A66C2]/90",
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
          "width=600,height=400"
        );
      },
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-[#25D366] hover:bg-[#25D366]/90",
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
          "_blank"
        );
      },
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`;
      },
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this listing</DialogTitle>
          <DialogDescription>
            Share this vehicle with your friends and family
          </DialogDescription>
        </DialogHeader>

        {/* Copy Link Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              value={url}
              readOnly
              className="flex-1"
              onClick={(e) => e.currentTarget.select()}
            />
            <Button
              variant={copied ? "default" : "outline"}
              size="icon"
              onClick={handleCopyLink}
              className="flex-shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <LinkIcon className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Social Share Buttons */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Share via</p>
            <div className="grid grid-cols-5 gap-2">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={option.action}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg ${option.color} text-white transition-all hover:scale-105`}
                  title={option.name}
                >
                  <option.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}




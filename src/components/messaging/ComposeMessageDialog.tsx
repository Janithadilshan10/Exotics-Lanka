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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { useMessaging } from "@/contexts/MessagingContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface ComposeMessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  listingPrice: number;
  sellerId: string;
  sellerName: string;
}

export function ComposeMessageDialog({
  isOpen,
  onClose,
  listingId,
  listingTitle,
  listingImage,
  listingPrice,
  sellerId,
  sellerName,
}: ComposeMessageDialogProps) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createConversation } = useMessaging();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const quickMessages = [
    "Hi, is this vehicle still available?",
    "I'm interested in scheduling a test drive. When would be a good time?",
    "Could you provide more details about the vehicle's condition and history?",
    "What's your best price for this vehicle?",
  ];

  const handleSubmit = async () => {
    if (!message.trim()) return;

    if (!isAuthenticated) {
      onClose();
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    
    // Create conversation and send message
    const conversationId = createConversation(
      listingId,
      listingTitle,
      listingImage,
      listingPrice,
      sellerId,
      sellerName,
      message.trim()
    );

    setIsSubmitting(false);
    setMessage("");
    onClose();

    // Navigate to inbox with the conversation open
    navigate(`/inbox?id=${conversationId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Contact Seller</DialogTitle>
          <DialogDescription>
            Send a message about {listingTitle}
          </DialogDescription>
        </DialogHeader>

        {/* Listing Preview */}
        <div className="flex gap-3 p-3 rounded-lg bg-muted/30 border border-border">
          <img
            src={listingImage}
            alt={listingTitle}
            className="w-20 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm mb-1">{listingTitle}</p>
            <p className="text-primary font-bold">
              LKR {(listingPrice / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Seller: {sellerName}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Quick Messages */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Quick messages:
            </Label>
            <div className="flex flex-wrap gap-2">
              {quickMessages.map((quickMsg, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setMessage(quickMsg)}
                  className="text-xs h-auto py-1.5"
                >
                  {quickMsg}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <Label htmlFor="message">Your message *</Label>
            <Textarea
              id="message"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {message.length} characters
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="gold"
            onClick={handleSubmit}
            disabled={!message.trim() || isSubmitting}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


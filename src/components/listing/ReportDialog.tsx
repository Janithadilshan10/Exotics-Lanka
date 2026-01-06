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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  listingTitle: string;
}

export function ReportDialog({
  isOpen,
  onClose,
  listingId,
  listingTitle,
}: ReportDialogProps) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportReasons = [
    {
      value: "misleading",
      label: "Misleading or false information",
      description: "Price, mileage, or other details are incorrect",
    },
    {
      value: "duplicate",
      label: "Duplicate listing",
      description: "This vehicle is already listed",
    },
    {
      value: "sold",
      label: "Vehicle already sold",
      description: "This vehicle is no longer available",
    },
    {
      value: "spam",
      label: "Spam or scam",
      description: "Suspicious or fraudulent listing",
    },
    {
      value: "inappropriate",
      label: "Inappropriate content",
      description: "Contains offensive or inappropriate material",
    },
    {
      value: "other",
      label: "Other",
      description: "Something else is wrong with this listing",
    },
  ];

  const handleSubmit = async () => {
    if (!reason) {
      toast.error("Please select a reason for reporting");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Save report to localStorage (mock backend)
    const reports = JSON.parse(localStorage.getItem("listingReports") || "[]");
    reports.push({
      id: Date.now(),
      listingId,
      listingTitle,
      reason,
      details,
      reportedAt: new Date().toISOString(),
      status: "pending",
    });
    localStorage.setItem("listingReports", JSON.stringify(reports));

    setIsSubmitting(false);
    toast.success("Report submitted. We'll review this listing within 24 hours.");
    
    // Reset form and close
    setReason("");
    setDetails("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Report Listing</DialogTitle>
              <DialogDescription className="text-xs mt-1">
                {listingTitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Reason Selection */}
          <div className="space-y-3">
            <Label>What's wrong with this listing?</Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              {reportReasons.map((option) => (
                <div
                  key={option.value}
                  className="flex items-start space-x-3 space-y-0 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => setReason(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <div className="flex-1 cursor-pointer">
                    <Label
                      htmlFor={option.value}
                      className="font-medium cursor-pointer"
                    >
                      {option.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <Label htmlFor="details">
              Additional details (optional)
            </Label>
            <Textarea
              id="details"
              placeholder="Please provide any additional information that might help us review this listing..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Your report will be reviewed by our moderation team
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={!reason || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


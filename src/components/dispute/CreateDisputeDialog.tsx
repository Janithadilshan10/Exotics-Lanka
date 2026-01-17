import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, FileText, Upload, ShieldAlert } from "lucide-react"; // Using ShieldAlert as a fallback for ShieldClose if not available
import { toast } from "sonner";
import type { DisputeReason } from "@/types/dispute";

interface CreateDisputeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    listingId?: string;
    reservationId?: string;
    respondentId?: string; // Seller ID
}

export const CreateDisputeDialog = ({
    isOpen,
    onClose,
    listingId,
    reservationId,
    respondentId,
}: CreateDisputeDialogProps) => {
    const [reason, setReason] = useState<DisputeReason | "">("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!reason) {
            toast.error("Please select a reason for the dispute");
            return;
        }
        if (!description || description.length < 20) {
            toast.error("Please provide a detailed description (min 20 chars)");
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success("Case opened. Our team will review it shortly.");
            onClose();
            // Reset form
            setReason("");
            setDescription("");
        } catch (error) {
            toast.error("Failed to submit dispute.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <ShieldAlert className="h-5 w-5" />
                        Report Issue / Open Dispute
                    </DialogTitle>
                    <DialogDescription>
                        File a formal complaint or dispute regarding a vehicle or transaction.
                        {reservationId && <span className="block mt-2 font-mono text-xs">Ref: {reservationId}</span>}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Reason for Dispute</Label>
                        <Select onValueChange={(val) => setReason(val as DisputeReason)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="misrepresentation">Vehicle Misrepresentation</SelectItem>
                                <SelectItem value="seller_refused_sale">Seller Refused Sale</SelectItem>
                                <SelectItem value="fraudulent_listing">Fraudulent Listing</SelectItem>
                                <SelectItem value="buyer_no_show">Buyer/Seller No Show</SelectItem>
                                <SelectItem value="harassment">Harassment/Unprofessional</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            placeholder="Please describe the issue in detail. Include dates and specific incidents."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="h-32"
                        />
                    </div>

                    <div className="space-y-2 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mb-2" />
                        <p className="text-sm font-medium">Upload Evidence</p>
                        <p className="text-xs">Photos, screenshots, documents</p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Case"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

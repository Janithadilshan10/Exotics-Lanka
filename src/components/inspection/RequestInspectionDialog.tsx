import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Shield,
    Calendar as CalendarIcon,
    Clock,
    CheckCircle2,
    Info
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { InspectionType } from "@/types/inspection";

interface RequestInspectionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    listingId: string;
    listingTitle: string;
    sellerId: string;
}

export const RequestInspectionDialog = ({
    isOpen,
    onClose,
    listingId,
    listingTitle,
    sellerId,
}: RequestInspectionDialogProps) => {
    const [inspectionType, setInspectionType] = useState<InspectionType>("standard");
    const [preferredDate, setPreferredDate] = useState<Date>();
    const [preferredTime, setPreferredTime] = useState("");
    const [buyerNotes, setBuyerNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const inspectionOptions = [
        {
            type: 'basic' as InspectionType,
            name: 'Basic Inspection',
            price: 5000,
            points: 50,
            duration: '30 minutes',
            features: [
                'Visual exterior & interior check',
                'Basic mechanical inspection',
                'Odometer verification',
                'Photo documentation',
            ],
        },
        {
            type: 'standard' as InspectionType,
            name: 'Standard Inspection',
            price: 15000,
            points: 200,
            duration: '2 hours',
            features: [
                'Everything in Basic',
                'Comprehensive 200-point check',
                'Engine & transmission inspection',
                'Suspension & brake system check',
                'Electrical system diagnostics',
                'Detailed written report',
            ],
            recommended: true,
        },
        {
            type: 'premium' as InspectionType,
            name: 'Premium Inspection',
            price: 25000,
            points: 200,
            duration: '3 hours',
            features: [
                'Everything in Standard',
                'Professional test drive',
                'Computer diagnostics scan',
                'Video documentation',
                'Priority scheduling',
                'Lifetime report access',
            ],
        },
    ];

    const selectedOption = inspectionOptions.find(opt => opt.type === inspectionType);

    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM',
        '2:00 PM', '3:00 PM', '4:00 PM'
    ];

    const handleSubmit = async () => {
        if (!preferredDate) {
            toast.error("Please select a preferred date");
            return;
        }

        if (!preferredTime) {
            toast.error("Please select a preferred time");
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast.success("Inspection request submitted! We'll contact you within 24 hours to confirm the schedule.");
            onClose();

            // Reset form
            setPreferredDate(undefined);
            setPreferredTime("");
            setBuyerNotes("");
        } catch (error) {
            toast.error("Failed to submit inspection request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Request Professional Inspection
                    </DialogTitle>
                    <DialogDescription>
                        Get a certified inspection report for: <span className="font-semibold">{listingTitle}</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Inspection Type Selection */}
                    <div className="space-y-3">
                        <Label>Select Inspection Package</Label>
                        <RadioGroup value={inspectionType} onValueChange={(value) => setInspectionType(value as InspectionType)}>
                            <div className="grid md:grid-cols-3 gap-4">
                                {inspectionOptions.map((option) => (
                                    <div key={option.type} className="relative">
                                        <label
                                            className={cn(
                                                "flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50",
                                                inspectionType === option.type ? "border-primary bg-primary/5" : "border-border"
                                            )}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <RadioGroupItem value={option.type} id={option.type} className="mt-1" />
                                                {option.recommended && (
                                                    <Badge className="bg-primary text-xs">Recommended</Badge>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-semibold">{option.name}</h4>
                                                <div className="text-2xl font-bold text-primary">
                                                    LKR {option.price.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-muted-foreground space-y-1">
                                                    <div className="flex items-center gap-1">
                                                        <CheckCircle2 className="h-3 w-3" />
                                                        {option.points}-point check
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {option.duration}
                                                    </div>
                                                </div>
                                                <ul className="text-xs space-y-1 mt-3">
                                                    {option.features.map((feature, index) => (
                                                        <li key={index} className="flex items-start gap-1">
                                                            <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Date Selection */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Preferred Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !preferredDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {preferredDate ? format(preferredDate, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={preferredDate}
                                        onSelect={setPreferredDate}
                                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label>Preferred Time</Label>
                            <RadioGroup value={preferredTime} onValueChange={setPreferredTime}>
                                <div className="grid grid-cols-3 gap-2">
                                    {timeSlots.map((time) => (
                                        <label
                                            key={time}
                                            className={cn(
                                                "flex items-center justify-center p-2 rounded-lg border-2 cursor-pointer transition-all text-sm",
                                                preferredTime === time ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                            )}
                                        >
                                            <RadioGroupItem value={time} id={time} className="sr-only" />
                                            {time}
                                        </label>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="buyerNotes">Additional Notes (Optional)</Label>
                        <Textarea
                            id="buyerNotes"
                            value={buyerNotes}
                            onChange={(e) => setBuyerNotes(e.target.value)}
                            placeholder="Any specific areas you'd like the inspector to focus on?"
                            rows={3}
                        />
                    </div>

                    {/* Info Alert */}
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                            <ul className="space-y-1 mt-1">
                                <li>• Our certified inspector will contact you within 24 hours to confirm the schedule</li>
                                <li>• Payment is required before the inspection</li>
                                <li>• You'll receive the detailed report within 24 hours after inspection</li>
                                <li>• The seller will be notified and must approve the inspection date</li>
                            </ul>
                        </AlertDescription>
                    </Alert>

                    {/* Price Summary */}
                    {selectedOption && (
                        <div className="p-4 rounded-lg bg-muted/50 border border-border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">{selectedOption.name}</p>
                                    <p className="text-sm text-muted-foreground">{selectedOption.points}-point inspection</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-primary">
                                        LKR {selectedOption.price.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-muted-foreground">One-time fee</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button variant="gold" onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Request Inspection"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

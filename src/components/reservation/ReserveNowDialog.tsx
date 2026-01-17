import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    ShieldCheck,
    Clock,
    CreditCard,
    RefreshCcw,
    Lock,
    CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ReserveNowDialogProps {
    isOpen: boolean;
    onClose: () => void;
    listingId: string;
    listingTitle: string;
    listingPrice: number;
}

export const ReserveNowDialog = ({
    isOpen,
    onClose,
    listingId,
    listingTitle,
    listingPrice,
}: ReserveNowDialogProps) => {
    const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    // Reservation fee is usually 1% or fixed amount, let's say LKR 50,000 for this demo
    const RESERVATION_AMOUNT = 50000;

    const handleProceedToPayment = () => {
        setStep('payment');
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            setStep('success');
            toast.success("Vehicle reserved successfully!");
        } catch (error) {
            toast.error("Payment failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleClose = () => {
        if (step === 'success') {
            // Refresh page or update state
            window.location.reload();
        }
        onClose();
        // Reset state after closing animation
        setTimeout(() => {
            setStep('info');
            setAcceptedTerms(false);
        }, 300);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && handleClose()}>
            <DialogContent className="max-w-md">
                {step === 'info' && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                Reserve Verification
                            </DialogTitle>
                            <DialogDescription>
                                Secure this vehicle instantly with a fully refundable deposit.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-sm">48-Hour Hold</h4>
                                        <p className="text-xs text-muted-foreground">
                                            The vehicle will be taken off the market for 48 hours exclusively for you.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <RefreshCcw className="h-5 w-5 text-emerald-500 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-sm">100% Refundable</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Change your mind? Get a full refund instantly if you decide not to buy.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Lock className="h-5 w-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-sm">Secure Escrow</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Your deposit is held safely in our escrow account, not sent to the seller.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-muted-foreground">Reservation Deposit</span>
                                    <span className="font-bold text-lg">LKR {RESERVATION_AMOUNT.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-muted-foreground text-right">
                                    Deductible from final price of LKR {listingPrice.toLocaleString()}
                                </p>
                            </div>

                            <div className="flex items-start space-x-2 pt-2">
                                <Checkbox
                                    id="terms"
                                    checked={acceptedTerms}
                                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                                />
                                <Label htmlFor="terms" className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    I agree to the <span className="text-primary underline cursor-pointer">Reservation Terms</span>.
                                    I understand this deposit allows me 48 hours to inspect and finalize the purchase.
                                </Label>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={onClose}>Cancel</Button>
                            <Button
                                variant="gold"
                                onClick={handleProceedToPayment}
                                disabled={!acceptedTerms}
                            >
                                Proceed to Payment
                            </Button>
                        </DialogFooter>
                    </>
                )}

                {step === 'payment' && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Complete Reservation</DialogTitle>
                            <DialogDescription>
                                Process your refundable deposit for {listingTitle}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg bg-muted/30">
                                <CreditCard className="h-10 w-10 text-muted-foreground mb-3" />
                                <p className="text-sm text-balance text-center text-muted-foreground">
                                    This is a secure payment simulation. No actual cards will be charged.
                                </p>
                                <div className="mt-4 font-bold text-2xl">
                                    LKR {RESERVATION_AMOUNT.toLocaleString()}
                                </div>
                            </div>

                            <Alert className="bg-primary/5 border-primary/20">
                                <Lock className="h-4 w-4 text-primary" />
                                <AlertDescription className="text-xs text-primary">
                                    Payments are processed securely via PayHere. Your data is encrypted.
                                </AlertDescription>
                            </Alert>
                        </div>

                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setStep('info')} disabled={isProcessing}>
                                Back
                            </Button>
                            <Button
                                variant="gold"
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="min-w-[120px]"
                            >
                                {isProcessing ? "Processing..." : "Pay Deposit"}
                            </Button>
                        </DialogFooter>
                    </>
                )}

                {step === 'success' && (
                    <>
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                            </div>
                            <h3 className="font-display text-2xl font-bold mb-2">Reservation Confirmed!</h3>
                            <p className="text-muted-foreground max-w-[300px] mb-6">
                                You have successfully reserved this vehicle for 48 hours. The seller has been notified.
                            </p>

                            <div className="w-full bg-muted/50 p-4 rounded-lg text-sm text-left mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-muted-foreground">Expires In</span>
                                    <span className="font-semibold text-destructive">47h 59m</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Reference</span>
                                    <span className="font-mono">RES-{Math.floor(Math.random() * 100000)}</span>
                                </div>
                            </div>

                            <Button onClick={handleClose} className="w-full">
                                View My Reservations
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

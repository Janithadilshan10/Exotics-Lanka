import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import {
    Shield,
    Upload,
    CheckCircle2,
    Clock,
    XCircle,
    AlertCircle,
    FileText,
    Building2,
    CreditCard
} from "lucide-react";
import { toast } from "sonner";
import type { VerificationType, VerificationStatusResponse } from "@/types/verification";

const Verification = () => {
    const [verificationType, setVerificationType] = useState<VerificationType>("national_id");
    const [formData, setFormData] = useState({
        fullName: "",
        idNumber: "",
        businessName: "",
        businessRegNumber: "",
    });
    const [frontImage, setFrontImage] = useState<File | null>(null);
    const [backImage, setBackImage] = useState<File | null>(null);
    const [frontPreview, setFrontPreview] = useState<string>("");
    const [backPreview, setBackPreview] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock verification status - replace with actual API call
    const [verificationStatus] = useState<VerificationStatusResponse>({
        isVerified: false,
        hasActiveRequest: false,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error("Please upload an image file");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB");
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            if (side === 'front') {
                setFrontImage(file);
                setFrontPreview(reader.result as string);
            } else {
                setBackImage(file);
                setBackPreview(reader.result as string);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!frontImage) {
            toast.error("Please upload the front of your document");
            return;
        }

        if (verificationType === 'national_id' && !backImage) {
            toast.error("Please upload the back of your National ID");
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call - replace with actual implementation
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast.success("Verification request submitted successfully! We'll review it within 24-48 hours.");

            // Reset form
            setFormData({
                fullName: "",
                idNumber: "",
                businessName: "",
                businessRegNumber: "",
            });
            setFrontImage(null);
            setBackImage(null);
            setFrontPreview("");
            setBackPreview("");
        } catch (error) {
            toast.error("Failed to submit verification request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return <Badge className="bg-emerald-500"><CheckCircle2 className="h-3 w-3 mr-1" />Verified</Badge>;
            case 'pending':
            case 'under_review':
                return <Badge variant="outline" className="border-amber-500 text-amber-500"><Clock className="h-3 w-3 mr-1" />Pending Review</Badge>;
            case 'rejected':
                return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen">
            <SEO
                title="Identity Verification"
                description="Verify your identity to build trust with buyers on Exotics Lanka"
                keywords="verification, identity, trust, KYC"
            />
            <Navbar />
            <PageTransition>
                <main id="main-content" className="pt-24 pb-12">
                    <div className="container mx-auto px-4 max-w-4xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                                <Shield className="h-8 w-8 text-primary" />
                            </div>
                            <h1 className="font-display text-4xl font-bold mb-3">Identity Verification</h1>
                            <p className="text-muted-foreground text-lg">
                                Get verified to build trust with potential buyers
                            </p>
                        </div>

                        {/* Current Status */}
                        {verificationStatus.hasActiveRequest && verificationStatus.request && (
                            <Alert className="mb-6">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold mb-1">Verification Status</p>
                                        <p className="text-sm">
                                            Your verification request is currently {verificationStatus.request.status}.
                                            {verificationStatus.request.rejectionReason && (
                                                <span className="block mt-1 text-destructive">
                                                    Reason: {verificationStatus.request.rejectionReason}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    {getStatusBadge(verificationStatus.request.status)}
                                </AlertDescription>
                            </Alert>
                        )}

                        {verificationStatus.isVerified && (
                            <Alert className="mb-6 border-emerald-500 bg-emerald-500/10">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <AlertDescription>
                                    <p className="font-semibold text-emerald-500">You are verified!</p>
                                    <p className="text-sm mt-1">Your identity has been verified. Buyers will see a verified badge on your listings.</p>
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Verification Form */}
                        {!verificationStatus.isVerified && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Submit Verification Documents</CardTitle>
                                    <CardDescription>
                                        Upload your identification documents to get verified. All information is kept confidential.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Document Type Selection */}
                                        <div className="space-y-3">
                                            <Label>Document Type</Label>
                                            <RadioGroup value={verificationType} onValueChange={(value) => setVerificationType(value as VerificationType)}>
                                                <div className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary/50 transition-colors">
                                                    <RadioGroupItem value="national_id" id="national_id" />
                                                    <Label htmlFor="national_id" className="flex items-center gap-2 cursor-pointer flex-1">
                                                        <CreditCard className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">National Identity Card</p>
                                                            <p className="text-sm text-muted-foreground">Sri Lankan NIC (Front & Back)</p>
                                                        </div>
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary/50 transition-colors">
                                                    <RadioGroupItem value="passport" id="passport" />
                                                    <Label htmlFor="passport" className="flex items-center gap-2 cursor-pointer flex-1">
                                                        <FileText className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">Passport</p>
                                                            <p className="text-sm text-muted-foreground">International Passport (Main Page)</p>
                                                        </div>
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary/50 transition-colors">
                                                    <RadioGroupItem value="business_registration" id="business_registration" />
                                                    <Label htmlFor="business_registration" className="flex items-center gap-2 cursor-pointer flex-1">
                                                        <Building2 className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">Business Registration</p>
                                                            <p className="text-sm text-muted-foreground">For Dealers & Companies</p>
                                                        </div>
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        {/* Personal Information */}
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="fullName">Full Name (as on document)</Label>
                                                <Input
                                                    id="fullName"
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>

                                            {verificationType === 'national_id' && (
                                                <div className="space-y-2">
                                                    <Label htmlFor="idNumber">NIC Number</Label>
                                                    <Input
                                                        id="idNumber"
                                                        value={formData.idNumber}
                                                        onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                                                        placeholder="123456789V or 123456789012"
                                                        required
                                                    />
                                                </div>
                                            )}

                                            {verificationType === 'business_registration' && (
                                                <>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="businessName">Business Name</Label>
                                                        <Input
                                                            id="businessName"
                                                            value={formData.businessName}
                                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                                            placeholder="ABC Motors (Pvt) Ltd"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="businessRegNumber">Business Registration Number</Label>
                                                        <Input
                                                            id="businessRegNumber"
                                                            value={formData.businessRegNumber}
                                                            onChange={(e) => setFormData({ ...formData, businessRegNumber: e.target.value })}
                                                            placeholder="PV 12345"
                                                            required
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Document Upload */}
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>
                                                    {verificationType === 'national_id' ? 'Front of National ID' :
                                                        verificationType === 'passport' ? 'Passport Main Page' :
                                                            'Business Registration Certificate'}
                                                </Label>
                                                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                                                    {frontPreview ? (
                                                        <div className="space-y-3">
                                                            <img src={frontPreview} alt="Document preview" className="max-h-48 mx-auto rounded" />
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setFrontImage(null);
                                                                    setFrontPreview("");
                                                                }}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <label className="cursor-pointer">
                                                            <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                                                            <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                                                            <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleFileChange(e, 'front')}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                    )}
                                                </div>
                                            </div>

                                            {verificationType === 'national_id' && (
                                                <div className="space-y-2">
                                                    <Label>Back of National ID</Label>
                                                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                                                        {backPreview ? (
                                                            <div className="space-y-3">
                                                                <img src={backPreview} alt="Document back preview" className="max-h-48 mx-auto rounded" />
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        setBackImage(null);
                                                                        setBackPreview("");
                                                                    }}
                                                                >
                                                                    Remove
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <label className="cursor-pointer">
                                                                <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                                                                <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                                                                <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => handleFileChange(e, 'back')}
                                                                    className="hidden"
                                                                />
                                                            </label>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Privacy Notice */}
                                        <Alert>
                                            <Shield className="h-4 w-4" />
                                            <AlertDescription className="text-sm">
                                                Your documents are encrypted and stored securely. We only use them to verify your identity and will never share them with third parties.
                                            </AlertDescription>
                                        </Alert>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            variant="gold"
                                            size="lg"
                                            className="w-full"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit for Verification"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        )}

                        {/* Benefits Section */}
                        <div className="mt-12 grid md:grid-cols-3 gap-6">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold mb-2">Build Trust</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Verified sellers get 3x more inquiries from serious buyers
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <CheckCircle2 className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold mb-2">Stand Out</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Get a verified badge on all your listings and profile
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Clock className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold mb-2">Quick Process</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Most verifications are completed within 24-48 hours
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </PageTransition>
            <Footer />
        </div>
    );
};

export default Verification;

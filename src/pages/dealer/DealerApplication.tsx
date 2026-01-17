import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, ShieldCheck, Car, Upload, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";

const formSchema = z.object({
    businessName: z.string().min(2, "Business name is required"),
    businessRegNo: z.string().min(2, "Registration number is required"),
    contactPerson: z.string().min(2, "Contact person is required"),
    contactEmail: z.string().email("Invalid email address"),
    contactPhone: z.string().min(9, "Valid phone number is required"),
    showroomAddress: z.string().min(10, "Full address is required"),
    websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    inventorySize: z.coerce.number().min(0, "Inventory size must be a number"),
    termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms"),
});

const DealerApplication = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            businessName: "",
            businessRegNo: "",
            contactPerson: "",
            contactEmail: "",
            contactPhone: "",
            showroomAddress: "",
            websiteUrl: "",
            inventorySize: 5,
            termsAccepted: false,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log(values);
            toast.success("Application submitted successfully! We will contact you soon.");
            navigate("/login"); // Redirect to login or a success page
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <PageTransition>
                <main className="flex-grow pt-24 pb-12">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-10">
                            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
                                Become a <span className="text-gold-gradient">Dealer Partner</span>
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Join Sri Lanka's most exclusive network of premium vehicle sellers.
                                Apply now to unlock professional tools and reach high-value buyers.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Benefits Sidebar */}
                            <div className="lg:col-span-1 space-y-6">
                                <Card className="bg-primary/5 border-primary/20">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Why Join?</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex gap-3">
                                            <div className="bg-background p-2 rounded-lg h-fit">
                                                <ShieldCheck className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm">Verified Badge</h4>
                                                <p className="text-xs text-muted-foreground">Stand out with the trusted dealer badge.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="bg-background p-2 rounded-lg h-fit">
                                                <Car className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm">Unlimited Listings</h4>
                                                <p className="text-xs text-muted-foreground">No caps on your premium inventory.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="bg-background p-2 rounded-lg h-fit">
                                                <Building2 className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm">Dedicated Showroom</h4>
                                                <p className="text-xs text-muted-foreground">Your own branded page on our platform.</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="bg-card border rounded-xl p-6">
                                    <h3 className="font-semibold mb-2">Application Process</h3>
                                    <div className="space-y-4 relative pl-4 border-l border-border">
                                        <div className="relative">
                                            <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
                                            <p className="text-sm font-medium">Submit Application</p>
                                            <p className="text-xs text-muted-foreground">Fill out business details</p>
                                        </div>
                                        <div className="relative">
                                            <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                                            <p className="text-sm font-medium">Review (24-48h)</p>
                                            <p className="text-xs text-muted-foreground">Our team verifies details</p>
                                        </div>
                                        <div className="relative">
                                            <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                                            <p className="text-sm font-medium">Approval & Onboarding</p>
                                            <p className="text-xs text-muted-foreground">Get access to dealer dashboard</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Application Form */}
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Dealer Application</CardTitle>
                                        <CardDescription>
                                            Please provide accurate business details for verification.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                                <div className="space-y-4">
                                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Business Info</h3>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="businessName"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Business Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g. Royal Cars" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="businessRegNo"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Registration No (BR)</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="PV12345" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <FormField
                                                        control={form.control}
                                                        name="showroomAddress"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Showroom Address</FormLabel>
                                                                <FormControl>
                                                                    <Textarea placeholder="123 Galle Rd, Colombo 03" className="resize-none" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="inventorySize"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Est. Inventory Size</FormLabel>
                                                                    <FormControl>
                                                                        <Input type="number" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="websiteUrl"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Website (Optional)</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="https://..." {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider pt-4 border-t">Contact Person</h3>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="contactPerson"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Full Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="John Doe" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="contactPhone"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Mobile Number</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="077 123 4567" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                    <FormField
                                                        control={form.control}
                                                        name="contactEmail"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Email Address</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="john@business.lk" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="termsAccepted"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel>
                                                                    I agree to the <span className="text-primary hover:underline cursor-pointer">Dealer Terms of Service</span>
                                                                </FormLabel>
                                                                <FormDescription>
                                                                    By submitting this application, you confirm that you are an authorized representative of the business.
                                                                </FormDescription>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button type="submit" className="w-full" variant="gold" size="lg" disabled={isSubmitting}>
                                                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                                                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                                                </Button>
                                            </form>
                                        </Form>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </PageTransition>
            <Footer />
        </div>
    );
};

export default DealerApplication;

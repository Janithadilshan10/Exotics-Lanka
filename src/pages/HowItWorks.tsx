import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  UserPlus,
  MessageCircle,
  Car,
  CheckCircle,
  Camera,
  FileText,
  TrendingUp,
  Shield,
  ArrowRight,
  Heart,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const buyerSteps = [
    {
      icon: UserPlus,
      title: "Create Your Account",
      description: "Sign up for free in under a minute. No credit card required.",
      details: [
        "Choose your account type (Buyer, Seller, or Dealer)",
        "Verify your email address",
        "Complete your profile with your preferences",
        "Set up saved searches and alerts",
      ],
    },
    {
      icon: Search,
      title: "Browse & Search",
      description: "Explore our curated collection of luxury and exotic vehicles.",
      details: [
        "Use advanced filters (make, model, price, year, location)",
        "View detailed specifications and photos",
        "Check vehicle history and seller ratings",
        "Save your favorite vehicles to your wishlist",
      ],
    },
    {
      icon: Heart,
      title: "Shortlist Favorites",
      description: "Save vehicles you love and compare them side-by-side.",
      details: [
        "Add vehicles to your favorites with one click",
        "Create multiple wishlists for different needs",
        "Receive alerts when prices drop",
        "Share your wishlist with friends or family",
      ],
    },
    {
      icon: MessageCircle,
      title: "Contact Sellers",
      description: "Reach out directly to sellers through our secure platform.",
      details: [
        "Send messages through our built-in chat",
        "Call sellers directly with verified phone numbers",
        "Ask questions about condition, history, and features",
        "Negotiate pricing and terms",
      ],
    },
    {
      icon: Calendar,
      title: "Schedule Inspection",
      description: "Arrange a test drive or professional inspection.",
      details: [
        "Book a convenient time slot",
        "Meet at a safe, public location",
        "Bring a trusted mechanic if desired",
        "Review all documentation before purchase",
      ],
    },
    {
      icon: CheckCircle,
      title: "Complete Purchase",
      description: "Finalize the deal with secure payment and proper documentation.",
      details: [
        "Verify all legal documents and ownership papers",
        "Use secure payment methods (bank transfer, escrow)",
        "Complete the ownership transfer process",
        "Leave feedback to help the community",
      ],
    },
  ];

  const sellerSteps = [
    {
      icon: UserPlus,
      title: "Register as Seller",
      description: "Create your seller account and get verified.",
      details: [
        "Sign up and choose 'Seller' account type",
        "Verify your identity and contact information",
        "Complete your seller profile",
        "Build trust with potential buyers",
      ],
    },
    {
      icon: Camera,
      title: "Prepare Your Vehicle",
      description: "Get your vehicle ready for the perfect listing.",
      details: [
        "Clean and detail your vehicle inside and out",
        "Gather all documentation (title, service records, etc.)",
        "Take high-quality photos from all angles",
        "Note any condition issues honestly",
      ],
    },
    {
      icon: FileText,
      title: "Create Your Listing",
      description: "Build a compelling listing in minutes with our easy wizard.",
      details: [
        "Follow our 5-step listing wizard",
        "Add specifications and features",
        "Upload up to 15 high-resolution photos",
        "Set your asking price (with market insights)",
      ],
    },
    {
      icon: TrendingUp,
      title: "Promote Your Listing",
      description: "Boost visibility with optional premium features.",
      details: [
        "Homepage featured placement",
        "Highlighted badges and priority sorting",
        "Social media promotion",
        "Email alerts to interested buyers",
      ],
    },
    {
      icon: MessageCircle,
      title: "Manage Inquiries",
      description: "Respond to interested buyers from your dashboard.",
      details: [
        "Receive inquiries in your dashboard inbox",
        "Chat with buyers through our platform",
        "Schedule test drives and inspections",
        "Answer questions about your vehicle",
      ],
    },
    {
      icon: CheckCircle,
      title: "Close the Deal",
      description: "Complete the sale safely and mark your listing as sold.",
      details: [
        "Negotiate final price and terms",
        "Meet in a safe location for handover",
        "Complete all paperwork and transfer ownership",
        "Mark listing as sold and collect payment",
      ],
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Verified Listings",
      description: "Every listing is verified for accuracy and authenticity.",
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Find exactly what you're looking for with powerful filters.",
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Access pricing data and market trends to make informed decisions.",
    },
    {
      icon: MessageCircle,
      title: "Secure Messaging",
      description: "Communicate safely through our encrypted platform.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Guide
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              How It <span className="text-gold-gradient">Works</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Buying or selling a luxury vehicle has never been easier. Follow our simple process.
            </p>
          </div>
        </section>

        {/* Process Tabs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="buyer" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                <TabsTrigger value="buyer" className="text-lg">
                  For Buyers
                </TabsTrigger>
                <TabsTrigger value="seller" className="text-lg">
                  For Sellers
                </TabsTrigger>
              </TabsList>

              {/* Buyer Process */}
              <TabsContent value="buyer" className="space-y-8">
                {buyerSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-6 items-start bg-card rounded-2xl border border-border p-8 hover:border-primary/50 transition-colors"
                  >
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <step.icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                {/* CTA */}
                <div className="text-center pt-8">
                  <Link to="/register">
                    <Button variant="gold" size="lg" className="gap-2">
                      Start Browsing
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              {/* Seller Process */}
              <TabsContent value="seller" className="space-y-8">
                {sellerSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-6 items-start bg-card rounded-2xl border border-border p-8 hover:border-primary/50 transition-colors"
                  >
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <step.icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                {/* CTA */}
                <div className="text-center pt-8">
                  <Link to="/register">
                    <Button variant="gold" size="lg" className="gap-2">
                      Start Selling
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-bold mb-4">
                Why Choose Exotics.lk?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The most trusted platform for luxury and exotic vehicle transactions in Sri Lanka.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border border-border p-6 text-center hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-2xl border border-primary/20 p-12 text-center">
              <Car className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="font-display text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of buyers and sellers on Sri Lanka's premier luxury vehicle marketplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button variant="gold" size="lg">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/collection">
                  <Button variant="outline" size="lg">
                    Browse Collection
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;


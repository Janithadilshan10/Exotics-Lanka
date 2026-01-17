import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageGallery } from "@/components/listing/ImageGallery";
import { ShareDialog } from "@/components/listing/ShareDialog";
import { ReportDialog } from "@/components/listing/ReportDialog";
import { ComposeMessageDialog } from "@/components/messaging/ComposeMessageDialog";
import { ReviewsList } from "@/components/reviews/ReviewsList";
import { StarRatingDisplay } from "@/components/reviews/StarRating";
import { InspectionReportCard } from "@/components/inspection/InspectionReportCard";
import { RequestInspectionDialog } from "@/components/inspection/RequestInspectionDialog";
import { ServiceHistoryCard } from "@/components/serviceHistory/ServiceHistoryCard";
import { ReserveNowDialog } from "@/components/reservation/ReserveNowDialog";
import { useReviews } from "@/contexts/ReviewContext";
import { PageTransition } from "@/components/PageTransition";
import { ListingSkeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/SEO";
import { featuredCars } from "@/data/mockData";
import {
  Heart,
  Share2,
  MapPin,
  Gauge,
  Fuel,
  Calendar,
  Settings,
  Palette,
  Shield,
  FileText,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle2,
  Printer,
  AlertTriangle,
  GitCompare,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { useComparison } from "@/contexts/ComparisonContext";

const CarDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false); // Set to true when fetching
  const navigate = useNavigate();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isInspectionDialogOpen, setIsInspectionDialogOpen] = useState(false);
  const [isReserveNowDialogOpen, setIsReserveNowDialogOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
  const { getAverageRating, getReviewsForSeller } = useReviews();

  const car = featuredCars.find((c) => c.id === id);

  // Show loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <PageTransition>
          <div className="container mx-auto px-4 pt-24 pb-12">
            <ListingSkeleton />
          </div>
        </PageTransition>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <PageTransition>
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="font-display text-4xl font-bold mb-4">Car Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The vehicle you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/collection")} className="btn-hover-lift">
              Back to Collection
            </Button>
          </div>
        </PageTransition>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return `LKR ${(price / 1000000).toFixed(2)}M`;
  };

  const formatMileage = (mileage: number) => {
    return `${(mileage / 1000).toFixed(0)}K km`;
  };

  // Mock multiple images for gallery
  const carImages = [
    car.image,
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop",
  ];

  // Mock video URL (for demonstration)
  const videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  // Mock seller info
  const mockSellerId = "seller_123";
  const mockSellerName = "Premium Auto Gallery";

  // Get seller rating
  const sellerRating = getAverageRating(mockSellerId);
  const sellerReviews = getReviewsForSeller(mockSellerId);

  // Mock inspection data - replace with actual API call
  const mockInspectionData = {
    hasInspection: true,
    report: {
      id: "inspection_1",
      overallRating: 8,
      overallCondition: "good" as const,
      recommendedPurchase: true,
      scores: {
        exterior: 85,
        interior: 90,
        engine: 80,
        transmission: 85,
        suspension: 75,
        brakes: 90,
        electrical: 85,
      },
      majorIssues: [],
      minorIssues: [
        {
          category: "Exterior",
          item: "Minor scratches on rear bumper",
          severity: "low" as const,
          estimatedCost: 5000,
        },
        {
          category: "Interior",
          item: "Driver seat shows slight wear",
          severity: "low" as const,
        },
      ],
      inspectionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      inspectorSummary: "This vehicle is in excellent overall condition with only minor cosmetic issues. All major mechanical systems are functioning properly. The engine runs smoothly with no unusual noises or leaks. Highly recommended for purchase.",
    },
  };

  // Mock service history data - replace with actual API call
  const mockServiceHistory = {
    totalRecords: 8,
    totalCost: 285000,
    lastServiceDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastServiceOdometer: 45000,
    records: [
      {
        id: "service_1",
        listingId: car.id,
        userId: mockSellerId,
        serviceType: "regular_service" as const,
        serviceDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        odometerReading: 45000,
        serviceProvider: "Mercedes-Benz Colombo",
        providerType: "authorized_dealer" as const,
        invoiceNumber: "MB-2024-001",
        description: "Regular 45,000 km service - oil change, filters, brake inspection",
        partsReplaced: ["Engine oil", "Oil filter", "Air filter"],
        cost: 35000,
        invoiceUrl: "https://example.com/invoice1.pdf",
        receiptUrls: [],
        verified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "service_2",
        listingId: car.id,
        userId: mockSellerId,
        serviceType: "brake_service" as const,
        serviceDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
        odometerReading: 40000,
        serviceProvider: "Mercedes-Benz Colombo",
        providerType: "authorized_dealer" as const,
        description: "Front brake pads replacement",
        partsReplaced: ["Front brake pads"],
        cost: 45000,
        verified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "service_3",
        listingId: car.id,
        userId: mockSellerId,
        serviceType: "tire_replacement" as const,
        serviceDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
        odometerReading: 35000,
        serviceProvider: "Tire World",
        providerType: "independent_garage" as const,
        description: "All four tires replaced with Michelin Pilot Sport",
        partsReplaced: ["4x Michelin Pilot Sport 4"],
        cost: 120000,
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  };

  const mockOwnershipHistory = {
    totalOwners: 2,
    currentOwner: 2,
    history: [
      {
        id: "owner_1",
        listingId: car.id,
        ownerNumber: 1,
        ownershipStart: "2020-01-15",
        ownershipEnd: "2023-06-30",
        durationMonths: 41,
        ownerType: "individual" as const,
        usageType: "personal" as const,
        startMileage: 0,
        endMileage: 35000,
        verified: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "owner_2",
        listingId: car.id,
        ownerNumber: 2,
        ownershipStart: "2023-07-01",
        durationMonths: 6,
        ownerType: "individual" as const,
        usageType: "personal" as const,
        startMileage: 35000,
        endMileage: 45000,
        verified: false,
        createdAt: new Date().toISOString(),
      },
    ],
  };

  const additionalSpecs = [
    { label: "Body Type", value: "Sedan", icon: Settings },
    { label: "Color", value: "Midnight Black", icon: Palette },
    { label: "Condition", value: car.isNew ? "Brand New" : "Excellent", icon: Shield },
    { label: "Registration", value: "Current", icon: FileText },
  ];

  const features = [
    "Leather Interior",
    "Sunroof",
    "Navigation System",
    "Parking Sensors",
    "Cruise Control",
    "Heated Seats",
    "Bluetooth Connectivity",
    "Backup Camera",
    "Alloy Wheels",
    "Premium Sound System",
    "Keyless Entry",
    "Auto-dimming Mirrors",
  ];

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handlePrint = () => {
    window.print();
    toast.success("Opening print dialog...");
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleCompareToggle = () => {
    const inComparison = isInComparison(car.id);
    if (inComparison) {
      removeFromComparison(car.id);
    } else {
      addToComparison(car);
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={car.title}
        description={`${car.title} - LKR ${(Number(car.price) / 1000000).toFixed(1)}M. ${car.mileage} km. Located in ${car.location}. Premium luxury vehicle for sale in Sri Lanka.`}
        keywords={`${car.brand}, ${car.title}, luxury car sri lanka`}
        image={car.image}
        type="product"
      />
      <Navbar />
      <PageTransition>
        <main id="main-content" className="pt-20">
          {/* Back Button & Actions */}
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrint}
                  title="Print listing"
                >
                  <Printer className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsReportDialogOpen(true)}
                  title="Report listing"
                >
                  <AlertTriangle className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <section className="container mx-auto px-4 pb-12">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div>
                <ImageGallery
                  images={carImages}
                  videoUrl={videoUrl}
                  has360View={true}
                />
              </div>

              {/* Info */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
                      {car.title}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span>{car.location}</span>
                    </div>
                  </div>
                  {car.isNew && (
                    <Badge className="bg-primary text-primary-foreground flex-shrink-0">
                      New Arrival
                    </Badge>
                  )}
                </div>

                <div className="bg-gradient-to-br from-black/60 via-black/40 to-transparent backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/10 shadow-xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <p className="text-sm text-white/60 mb-1 font-sans-luxury tracking-wider uppercase">Price</p>
                  <p className="font-display text-5xl md:text-6xl font-light text-white tracking-tight drop-shadow-2xl">
                    <span className="text-primary font-normal">LKR</span> {(car.price / 1000000).toFixed(1)}<span className="text-primary font-normal">M</span>
                  </p>
                </div>

                {/* Key Specs Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Year</p>
                      <p className="font-semibold">{car.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                    <Gauge className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Mileage</p>
                      <p className="font-semibold">{formatMileage(car.mileage)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                    <Fuel className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Fuel Type</p>
                      <p className="font-semibold">{car.fuelType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                    <Settings className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Transmission</p>
                      <p className="font-semibold">{car.transmission}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Button
                      variant="gold"
                      size="lg"
                      className="flex-1 gap-2"
                      onClick={() => setIsMessageDialogOpen(true)}
                    >
                      <Phone className="h-5 w-5" />
                      Contact Seller
                    </Button>
                    <Button
                      variant={isFavorite ? "default" : "outline"}
                      size="lg"
                      onClick={handleFavoriteToggle}
                      className="gap-2"
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 gap-2"
                      onClick={() => setIsShareDialogOpen(true)}
                    >
                      <Share2 className="h-5 w-5" />
                      Share
                    </Button>
                    <Button
                      variant={isInComparison(car.id) ? "default" : "outline"}
                      size="lg"
                      className="flex-1 gap-2"
                      onClick={handleCompareToggle}
                    >
                      <GitCompare className="h-5 w-5" />
                      {isInComparison(car.id) ? "In Compare" : "Compare"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Details Section */}
          <section className="bg-muted/30 py-12">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Specifications & Features */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Specifications */}
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <h2 className="font-display text-2xl font-bold mb-6">
                      Specifications
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {additionalSpecs.map((spec, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <spec.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {spec.label}
                            </p>
                            <p className="font-semibold">{spec.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features & Equipment */}
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <h2 className="font-display text-2xl font-bold mb-6">
                      Features & Equipment
                    </h2>
                    <div className="grid md:grid-cols-2 gap-3">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 transition-colors">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <h2 className="font-display text-2xl font-bold mb-4">
                      Description
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      This exceptional {car.title} represents the pinnacle of
                      automotive excellence. Meticulously maintained and verified
                      by our expert team, this vehicle offers an unparalleled
                      driving experience. With its powerful performance, luxurious
                      interior, and cutting-edge technology, it's perfect for
                      discerning buyers who demand nothing but the best.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      Every detail has been carefully inspected and documented. The vehicle
                      comes with complete service history and all original documentation.
                      Experience luxury redefined with this remarkable automobile.
                    </p>
                  </div>

                  {/* Inspection Report */}
                  {mockInspectionData.hasInspection ? (
                    <InspectionReportCard data={mockInspectionData} />
                  ) : (
                    <div className="bg-card rounded-2xl p-6 border border-border">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-xl font-bold mb-2">
                            Get a Professional Inspection
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            Request a certified 200-point inspection before you buy. Our expert inspectors will thoroughly check the vehicle and provide you with a detailed report.
                          </p>
                          <Button
                            variant="outline"
                            onClick={() => setIsInspectionDialogOpen(true)}
                            className="gap-2"
                          >
                            <Shield className="h-4 w-4" />
                            Request Inspection
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service History */}
                  <ServiceHistoryCard
                    serviceHistory={mockServiceHistory}
                    ownershipHistory={mockOwnershipHistory}
                  />
                </div>

                {/* Contact Card */}
                <div>
                  <div className="sticky top-24 bg-card rounded-2xl p-6 border border-border">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display text-xl font-bold">
                          Contact Seller
                        </h3>
                        {/* Premium Verified Badge */}
                        <Badge className="bg-primary/90 text-primary-foreground flex items-center gap-1.5 px-3 py-1 font-sans-luxury tracking-wide shadow-lg shadow-primary/20">
                          <Shield className="h-3.5 w-3.5 fill-current" />
                          VERIFIED SELLER
                        </Badge>
                      </div>
                      {sellerRating > 0 && (
                        <div className="flex items-center gap-2">
                          <StarRatingDisplay
                            rating={Math.round(sellerRating)}
                            size="sm"
                            showValue
                          />
                          <span className="text-xs text-muted-foreground">
                            ({sellerReviews.length})
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <Phone className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Phone</p>
                          <a href="tel:+94771234567" className="font-semibold hover:text-primary transition-colors">
                            +94 77 123 4567
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <Mail className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Email</p>
                          <a href="mailto:dealer@exotics.lk" className="font-semibold text-sm hover:text-primary transition-colors">
                            dealer@exotics.lk
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="font-semibold">{car.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        className="w-full gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white border-0"
                        onClick={() => setIsReserveNowDialogOpen(true)}
                      >
                        <Lock className="h-4 w-4" />
                        Reserve Now (Refundable)
                      </Button>
                      <Button
                        variant="gold"
                        className="w-full gap-2"
                        onClick={() => setIsMessageDialogOpen(true)}
                      >
                        <Mail className="h-4 w-4" />
                        Send Message
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <Calendar className="h-4 w-4" />
                        Schedule Test Drive
                      </Button>
                    </div>

                    <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="flex items-start gap-3 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Shield className="h-4 w-4 text-primary fill-primary/20" />
                        </div>
                        <div>
                          <p className="font-sans-luxury font-semibold text-primary text-sm mb-1 tracking-wide">
                            EXOTICS VERIFIED
                          </p>
                          <p className="text-xs text-muted-foreground/80 leading-relaxed">
                            This vehicle has passed our rigorous multi-point inspection and background check. Buy with absolute confidence.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="font-display text-3xl font-bold mb-8">
                Seller Reviews
              </h2>
              <ReviewsList
                listingId={car.id}
                sellerId={mockSellerId}
                sellerName={mockSellerName}
                allowNewReview={true}
              />
            </div>
          </section>
        </main>
      </PageTransition>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-white/10 z-50 flex gap-3 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <Button
          variant="outline"
          className="flex-1 border-primary/20 hover:bg-primary/5 text-foreground h-12 font-sans-luxury tracking-wide"
          onClick={() => setIsInspectionDialogOpen(true)}
        >
          <Shield className="h-4 w-4 mr-2 text-primary" />
          Inspect
        </Button>
        <Button
          variant="gold"
          className="flex-[2] h-12 text-base font-semibold tracking-wide shadow-glow-gold"
          onClick={() => setIsMessageDialogOpen(true)}
        >
          <Phone className="h-4 w-4 mr-2" />
          Contact Seller
        </Button>
      </div>

      <Footer />

      {/* Dialogs */}
      <ShareDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        title={car.title}
        url={currentUrl}
        description={`Check out this ${car.year} ${car.title} for ${formatPrice(car.price)} on Exotics.lk`}
      />

      <ReportDialog
        isOpen={isReportDialogOpen}
        onClose={() => setIsReportDialogOpen(false)}
        listingId={car.id}
        listingTitle={car.title}
      />

      <ComposeMessageDialog
        isOpen={isMessageDialogOpen}
        onClose={() => setIsMessageDialogOpen(false)}
        listingId={car.id}
        listingTitle={car.title}
        listingImage={car.image}
        listingPrice={car.price}
        sellerId={mockSellerId}
        sellerName={mockSellerName}
      />

      <RequestInspectionDialog
        isOpen={isInspectionDialogOpen}
        onClose={() => setIsInspectionDialogOpen(false)}
        listingId={car.id}
        listingTitle={car.title}
        sellerId={mockSellerId}
      />

      <ReserveNowDialog
        isOpen={isReserveNowDialogOpen}
        onClose={() => setIsReserveNowDialogOpen(false)}
        listingId={car.id}
        listingTitle={car.title}
        listingPrice={car.price}
      />
    </div>
  );
};

export default CarDetail;

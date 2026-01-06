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
import { useReviews } from "@/contexts/ReviewContext";
import { PageTransition } from "@/components/PageTransition";
import { ListingSkeleton } from "@/components/ui/skeleton";
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
} from "lucide-react";
import { toast } from "sonner";
import { useComparison } from "@/contexts/ComparisonContext";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
  const { getAverageRating, getReviewsForSeller } = useReviews();
  
  const car = featuredCars.find((c) => c.id === id);

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

              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-2xl p-6 mb-6 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">Price</p>
                <p className="font-display text-4xl md:text-5xl font-bold text-primary">
                  {formatPrice(car.price)}
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
              </div>

              {/* Contact Card */}
              <div>
                <div className="sticky top-24 bg-card rounded-2xl p-6 border border-border">
                  <div className="mb-4">
                    <h3 className="font-display text-xl font-bold mb-2">
                      Contact Seller
                    </h3>
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

                  <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-emerald-500 text-sm mb-1">
                          Verified Listing
                        </p>
                        <p className="text-xs text-muted-foreground">
                          This vehicle has been inspected and verified by
                          Exotics.lk
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
    </div>
  );
};

export default CarDetail;

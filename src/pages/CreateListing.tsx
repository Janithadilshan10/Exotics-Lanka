import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { ButtonLoading } from "@/components/ui/loading";
import { ProgressBar } from "@/components/ui/loading";
import { fireworksConfetti } from "@/lib/confetti";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, ArrowRight, Upload, X, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CreateListing = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    condition: "",
    
    // Step 2: Specifications
    transmission: "",
    fuelType: "",
    color: "",
    bodyType: "",
    doors: "",
    seats: "",
    engineSize: "",
    drivetrain: "",
    
    // Step 3: Features
    features: [] as string[],
    
    // Step 4: Description & Contact
    description: "",
    location: "",
    contactPhone: "",
    contactEmail: "",
  });

  const totalSteps = 5;

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  // Only sellers and dealers can create listings
  if (user?.role === "buyer") {
    navigate("/");
    toast.error("Only sellers can create listings");
    return null;
  }

  const carMakes = ["Mercedes-Benz", "BMW", "Porsche", "Audi", "Lexus", "Range Rover", "Jaguar", "Tesla", "Ferrari", "Lamborghini"];
  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());
  const transmissions = ["Automatic", "Manual", "Semi-Automatic", "CVT"];
  const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
  const bodyTypes = ["Sedan", "SUV", "Coupe", "Convertible", "Hatchback", "Wagon", "Van"];
  const conditions = ["Brand New", "Used - Like New", "Used - Excellent", "Used - Good", "Used - Fair"];
  
  const availableFeatures = [
    "Leather Seats",
    "Sunroof",
    "Navigation System",
    "Parking Sensors",
    "Backup Camera",
    "Cruise Control",
    "Heated Seats",
    "Ventilated Seats",
    "Bluetooth",
    "Apple CarPlay",
    "Android Auto",
    "Premium Sound System",
    "Alloy Wheels",
    "Keyless Entry",
    "Push Start",
    "Lane Departure Warning",
    "Blind Spot Monitor",
    "Adaptive Cruise Control",
    "360° Camera",
    "Head-Up Display",
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.includes(feature)
        ? formData.features.filter(f => f !== feature)
        : [...formData.features, feature]
    });
  };

  const handleSubmit = () => {
    // Save to localStorage
    const listings = JSON.parse(localStorage.getItem("myListings") || "[]");
    const newListing = {
      id: Date.now().toString(),
      ...formData,
      images,
      userId: user?.id,
      status: "active",
      createdAt: new Date().toISOString(),
      views: 0,
      favorites: 0,
    };
    
    listings.push(newListing);
    localStorage.setItem("myListings", JSON.stringify(listings));
    
    toast.success("Listing created successfully!");
    navigate("/dashboard");
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">Basic Information</h2>
              <p className="text-muted-foreground">Tell us about your vehicle</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Select value={formData.make} onValueChange={(value) => setFormData({ ...formData, make: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {carMakes.map(make => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="e.g., 911 Carrera"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition *</Label>
                <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map(condition => (
                      <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (LKR) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g., 45000000"
                  required
                />
                {formData.price && (
                  <p className="text-sm text-muted-foreground">
                    LKR {(Number(formData.price) / 1000000).toFixed(2)}M
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage (km) *</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  placeholder="e.g., 15000"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">Specifications</h2>
              <p className="text-muted-foreground">Technical details of your vehicle</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Transmission *</Label>
                <Select value={formData.transmission} onValueChange={(value) => setFormData({ ...formData, transmission: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissions.map(trans => (
                      <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fuel Type *</Label>
                <Select value={formData.fuelType} onValueChange={(value) => setFormData({ ...formData, fuelType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map(fuel => (
                      <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Body Type *</Label>
                <Select value={formData.bodyType} onValueChange={(value) => setFormData({ ...formData, bodyType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bodyTypes.map(body => (
                      <SelectItem key={body} value={body}>{body}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Exterior Color *</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="e.g., Midnight Black"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doors">Doors</Label>
                <Input
                  id="doors"
                  type="number"
                  value={formData.doors}
                  onChange={(e) => setFormData({ ...formData, doors: e.target.value })}
                  placeholder="e.g., 4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seats">Seats</Label>
                <Input
                  id="seats"
                  type="number"
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                  placeholder="e.g., 5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="engineSize">Engine Size (L)</Label>
                <Input
                  id="engineSize"
                  value={formData.engineSize}
                  onChange={(e) => setFormData({ ...formData, engineSize: e.target.value })}
                  placeholder="e.g., 3.0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="drivetrain">Drivetrain</Label>
                <Select value={formData.drivetrain} onValueChange={(value) => setFormData({ ...formData, drivetrain: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select drivetrain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FWD">Front-Wheel Drive (FWD)</SelectItem>
                    <SelectItem value="RWD">Rear-Wheel Drive (RWD)</SelectItem>
                    <SelectItem value="AWD">All-Wheel Drive (AWD)</SelectItem>
                    <SelectItem value="4WD">Four-Wheel Drive (4WD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">Features & Equipment</h2>
              <p className="text-muted-foreground">Select all that apply</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {availableFeatures.map(feature => (
                <label
                  key={feature}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                    formData.features.includes(feature)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Checkbox
                    checked={formData.features.includes(feature)}
                    onCheckedChange={() => toggleFeature(feature)}
                  />
                  <span className="text-sm">{feature}</span>
                </label>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              Selected: {formData.features.length} features
            </p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">Photos</h2>
              <p className="text-muted-foreground">Add high-quality images of your vehicle (max 15)</p>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="images" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-semibold mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-muted-foreground">
                  PNG, JPG, WEBP up to 10MB each
                </p>
              </label>
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border border-border">
                    <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="p-2 bg-destructive rounded-full hover:bg-destructive/80"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                    {index === 0 && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
                        Cover
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <p className="text-sm text-muted-foreground">
              {images.length} / 15 images uploaded
            </p>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">Description & Contact</h2>
              <p className="text-muted-foreground">Final details</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your vehicle in detail. Include maintenance history, modifications, reason for selling, etc."
                  rows={8}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  {formData.description.length} characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Colombo, Sri Lanka"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="+94 77 123 4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail || user?.email}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="mt-8 p-6 rounded-xl bg-muted/30 border border-border">
              <h3 className="font-display text-xl font-semibold mb-4">Listing Preview</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Vehicle:</strong> {formData.year} {formData.make} {formData.model}</p>
                <p><strong>Price:</strong> LKR {(Number(formData.price) / 1000000).toFixed(2)}M</p>
                <p><strong>Mileage:</strong> {Number(formData.mileage).toLocaleString()} km</p>
                <p><strong>Location:</strong> {formData.location}</p>
                <p><strong>Photos:</strong> {images.length} uploaded</p>
                <p><strong>Features:</strong> {formData.features.length} selected</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Create Listing - Sell Your Car"
        description="List your luxury or exotic vehicle for sale on Exotics Lanka. Reach thousands of potential buyers across Sri Lanka."
        keywords="sell car, create listing, list vehicle, sell luxury car"
      />
      <Navbar />
      <PageTransition>
        <main id="main-content" className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <h1 className="font-display text-4xl font-bold mb-2">Create Listing</h1>
            <p className="text-muted-foreground">
              Fill in the details to list your vehicle
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors mb-2",
                        step <= currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {step}
                    </div>
                    <p className="text-xs text-center hidden md:block">
                      {step === 1 && "Basic Info"}
                      {step === 2 && "Specs"}
                      {step === 3 && "Features"}
                      {step === 4 && "Photos"}
                      {step === 5 && "Description"}
                    </p>
                  </div>
                  {step < 5 && (
                    <div
                      className={cn(
                        "h-1 flex-1 transition-colors",
                        step < currentStep ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-card rounded-2xl border border-border p-8 mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button variant="gold" onClick={nextStep}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button variant="gold" onClick={handleSubmit}>
                Publish Listing
              </Button>
            )}
          </div>
        </div>
      </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default CreateListing;



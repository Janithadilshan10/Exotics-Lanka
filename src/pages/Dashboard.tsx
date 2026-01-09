import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageTransition } from "@/components/PageTransition";
import { DashboardStatSkeleton, CarCardSkeleton } from "@/components/ui/skeleton";
import { NoListings } from "@/components/ui/empty-state";
import { SEO } from "@/components/SEO";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import {
  Plus,
  Search,
  MoreVertical,
  Eye,
  Heart,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  TrendingUp,
  Car,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Listing {
  id: string;
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  images: string[];
  status: "active" | "sold" | "draft";
  views: number;
  favorites: number;
  createdAt: string;
  location: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false); // Set to true when fetching

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (user?.role === "buyer") {
      navigate("/");
      toast.error("Only sellers can access the dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  // Load listings from localStorage
  useEffect(() => {
    const savedListings = localStorage.getItem("myListings");
    if (savedListings) {
      setListings(JSON.parse(savedListings));
    }
  }, []);

  const formatPrice = (price: string) => {
    return `LKR ${(Number(price) / 1000000).toFixed(1)}M`;
  };

  const formatMileage = (mileage: string) => {
    return `${(Number(mileage) / 1000).toFixed(0)}K km`;
  };

  const deleteListing = (id: string) => {
    const updated = listings.filter((listing) => listing.id !== id);
    setListings(updated);
    localStorage.setItem("myListings", JSON.stringify(updated));
    toast.success("Listing deleted");
  };

  const toggleStatus = (id: string, newStatus: "active" | "sold") => {
    const updated = listings.map((listing) =>
      listing.id === id ? { ...listing, status: newStatus } : listing
    );
    setListings(updated);
    localStorage.setItem("myListings", JSON.stringify(updated));
    toast.success(`Listing marked as ${newStatus}`);
  };

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      `${listing.make} ${listing.model} ${listing.year}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && listing.status === "active") ||
      (activeTab === "sold" && listing.status === "sold") ||
      (activeTab === "draft" && listing.status === "draft");
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: listings.length,
    active: listings.filter((l) => l.status === "active").length,
    sold: listings.filter((l) => l.status === "sold").length,
    draft: listings.filter((l) => l.status === "draft").length,
    totalViews: listings.reduce((sum, l) => sum + (l.views || 0), 0),
    totalFavorites: listings.reduce((sum, l) => sum + (l.favorites || 0), 0),
  };

  if (!isAuthenticated || user?.role === "buyer") {
    return null;
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="Dashboard - Manage Your Listings"
        description="Manage your luxury car listings, track views, and monitor performance on Exotics Lanka."
        keywords="seller dashboard, manage listings, car dealer dashboard"
      />
      <Navbar />
      <PageTransition>
        <main id="main-content" className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold mb-2">
              My Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your listings and track performance
            </p>
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map(i => (
                <DashboardStatSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Listings</p>
                  <Car className="h-5 w-5 text-primary" />
                </div>
                <p className="font-display text-3xl font-bold">{stats.total}</p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Active</p>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <p className="font-display text-3xl font-bold text-emerald-500">
                  {stats.active}
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <p className="font-display text-3xl font-bold">
                  {stats.totalViews}
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Favorites</p>
                  <Heart className="h-5 w-5 text-rose-500" />
                </div>
                <p className="font-display text-3xl font-bold text-rose-500">
                  {stats.totalFavorites}
                </p>
              </div>
            </div>
          )}

          {/* Actions Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search your listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Create Button */}
            <Link to="/listing/create">
              <Button variant="gold" className="gap-2 w-full md:w-auto">
                <Plus className="h-5 w-5" />
                Create Listing
              </Button>
            </Link>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">
                All ({stats.total})
              </TabsTrigger>
              <TabsTrigger value="active">
                Active ({stats.active})
              </TabsTrigger>
              <TabsTrigger value="sold">
                Sold ({stats.sold})
              </TabsTrigger>
              <TabsTrigger value="draft">
                Drafts ({stats.draft})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Listings Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <CarCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredListings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing, index) => (
                <div
                  key={listing.id}
                  className="bg-card rounded-xl overflow-hidden border border-border group animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Image */}
                  <div className="relative aspect-video">
                    <img
                      src={
                        listing.images[0] ||
                        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
                      }
                      alt={`${listing.year} ${listing.make} ${listing.model}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge
                        className={cn(
                          listing.status === "active" &&
                            "bg-emerald-500 text-white",
                          listing.status === "sold" && "bg-rose-500 text-white",
                          listing.status === "draft" && "bg-amber-500 text-white"
                        )}
                      >
                        {listing.status === "active" && "Active"}
                        {listing.status === "sold" && "Sold"}
                        {listing.status === "draft" && "Draft"}
                      </Badge>
                    </div>

                    {/* Actions Menu */}
                    <div className="absolute top-3 right-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                          >
                            <MoreVertical className="h-5 w-5 text-white" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/car/${listing.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/listing/edit/${listing.id}`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          {listing.status === "active" && (
                            <DropdownMenuItem
                              onClick={() => toggleStatus(listing.id, "sold")}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Mark as Sold
                            </DropdownMenuItem>
                          )}
                          {listing.status === "sold" && (
                            <DropdownMenuItem
                              onClick={() => toggleStatus(listing.id, "active")}
                            >
                              <TrendingUp className="h-4 w-4 mr-2" />
                              Mark as Active
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => deleteListing(listing.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold mb-2 line-clamp-1">
                      {listing.year} {listing.make} {listing.model}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <p className="font-display text-xl font-bold text-primary">
                        {formatPrice(listing.price)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatMileage(listing.mileage)}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{listing.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{listing.favorites || 0}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(listing.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <NoListings 
              searchActive={!!searchQuery}
              onCreateListing={() => navigate("/listing/create")}
            />
          )}
        </div>
      </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Dashboard;



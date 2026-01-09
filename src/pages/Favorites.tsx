import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/cars/CarCard";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Share2, Trash2 } from "lucide-react";
import { featuredCars } from "@/data/mockData";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { NoFavorites } from "@/components/ui/empty-state";
import { CarCardSkeleton } from "@/components/ui/skeleton";
import { heartConfetti } from "@/lib/confetti";
import { SEO } from "@/components/SEO";

const Favorites = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // Set to true when fetching

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [isAuthenticated, navigate]);

  const favoriteCars = featuredCars.filter((car) =>
    favorites.includes(car.id)
  );

  const removeFromFavorites = (id: string) => {
    const updated = favorites.filter((fav) => fav !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    toast.success("Removed from favorites");
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.setItem("favorites", JSON.stringify([]));
    toast.success("All favorites cleared");
  };

  const shareWishlist = () => {
    // Generate shareable link (mock)
    const link = `${window.location.origin}/favorites/shared/${Date.now()}`;
    navigator.clipboard.writeText(link);
    toast.success("Wishlist link copied to clipboard");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="My Favorites - Saved Vehicles"
        description="View and manage your favorite luxury cars. Keep track of vehicles you love and compare them easily."
        keywords="favorite cars, saved vehicles, wishlist"
      />
      <Navbar />
      <PageTransition>
        <main id="main-content" className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-display text-4xl font-bold mb-2">
                  My Favorites
                </h1>
                <p className="text-muted-foreground">
                  {favoriteCars.length}{" "}
                  {favoriteCars.length === 1 ? "vehicle" : "vehicles"} saved
                </p>
              </div>

              {favoriteCars.length > 0 && (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={shareWishlist}
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 text-destructive"
                    onClick={clearAllFavorites}
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear All
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Favorites Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <CarCardSkeleton key={i} />
              ))}
            </div>
          ) : favoriteCars.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteCars.map((car) => (
                <div key={car.id} className="relative">
                  <CarCard car={car} />
                  <button
                    onClick={() => removeFromFavorites(car.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors z-10"
                    title="Remove from favorites"
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <NoFavorites onBrowse={() => navigate("/collection")} />
          )}
        </div>
      </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Favorites;


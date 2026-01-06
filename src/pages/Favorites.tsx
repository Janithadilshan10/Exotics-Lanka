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

const Favorites = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

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
      <Navbar />
      <main className="pt-20 pb-12">
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
          {favoriteCars.length > 0 ? (
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
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">
                No favorites yet
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start browsing our collection and save your favorite vehicles to
                compare and revisit later
              </p>
              <Link to="/collection">
                <Button variant="gold">Browse Collection</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;


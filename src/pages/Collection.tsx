import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CarCard } from "@/components/cars/CarCard";
import { featuredCars, carBrands } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, SlidersHorizontal, X } from "lucide-react";

const Collection = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const filteredCars = featuredCars.filter(car => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(car.brand)) {
      return false;
    }
    const priceInM = car.price / 1000000;
    if (priceInM < priceRange[0] || priceInM > priceRange[1]) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              The Collection
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Explore our curated selection of exceptional vehicles, each one inspected and verified.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              {/* Desktop Filters */}
              <aside className="hidden lg:block w-80 shrink-0">
                <div className="sticky top-24 space-y-8">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search vehicles..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Brands */}
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-4">Brands</h3>
                    <div className="space-y-3">
                      {carBrands.map(brand => (
                        <label
                          key={brand.name}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <Checkbox
                            checked={selectedBrands.includes(brand.name)}
                            onCheckedChange={() => toggleBrand(brand.name)}
                          />
                          <span className="flex-1 text-sm group-hover:text-primary transition-colors">
                            {brand.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {brand.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-4">
                      Price Range
                    </h3>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={150}
                      step={5}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>LKR {priceRange[0]}M</span>
                      <span>LKR {priceRange[1]}M</span>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {(selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 150) && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSelectedBrands([]);
                        setPriceRange([0, 150]);
                      }}
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </aside>

              {/* Mobile Filter Button */}
              <button
                className="lg:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-xl"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="h-6 w-6" />
              </button>

              {/* Mobile Filter Panel */}
              {showFilters && (
                <div className="lg:hidden fixed inset-0 z-50 bg-background">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h2 className="font-display text-xl font-semibold">Filters</h2>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-130px)]">
                    {/* Same filter content as desktop */}
                    <div>
                      <h3 className="font-display text-lg font-semibold mb-4">Brands</h3>
                      <div className="space-y-3">
                        {carBrands.map(brand => (
                          <label
                            key={brand.name}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <Checkbox
                              checked={selectedBrands.includes(brand.name)}
                              onCheckedChange={() => toggleBrand(brand.name)}
                            />
                            <span className="flex-1">{brand.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {brand.count}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold mb-4">
                        Price Range
                      </h3>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={150}
                        step={5}
                        className="mb-4"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>LKR {priceRange[0]}M</span>
                        <span>LKR {priceRange[1]}M</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
                    <Button
                      variant="gold"
                      className="w-full"
                      onClick={() => setShowFilters(false)}
                    >
                      Show {filteredCars.length} Results
                    </Button>
                  </div>
                </div>
              )}

              {/* Car Grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    Showing <span className="text-foreground font-medium">{filteredCars.length}</span> vehicles
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCars.map((car, index) => (
                    <div
                      key={car.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <CarCard car={car} />
                    </div>
                  ))}
                </div>

                {filteredCars.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">
                      No vehicles match your criteria.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSelectedBrands([]);
                        setPriceRange([0, 150]);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Collection;

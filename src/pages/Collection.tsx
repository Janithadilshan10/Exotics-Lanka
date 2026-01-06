import { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SaveSearchDialog } from "@/components/search/SaveSearchDialog";
import { CarCard } from "@/components/cars/CarCard";
import { featuredCars, carBrands } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/PageTransition";
import { CarCardSkeleton } from "@/components/ui/skeleton";
import { NoSearchResults } from "@/components/ui/empty-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X, ArrowUpDown, BookmarkPlus } from "lucide-react";

interface Filters {
  searchQuery: string;
  brands: string[];
  priceRange: [number, number];
  yearRange: [number, number];
  mileageRange: [number, number];
  fuelTypes: string[];
  transmissions: string[];
  locations: string[];
  condition: string[];
}

const Collection = () => {
  // Initialize filters from localStorage or defaults
  const [filters, setFilters] = useState<Filters>(() => {
    const saved = localStorage.getItem("collectionFilters");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // If parsing fails, return defaults
      }
    }
    return {
      searchQuery: "",
      brands: [],
      priceRange: [0, 150],
      yearRange: [2010, 2024],
      mileageRange: [0, 200000],
      fuelTypes: [],
      transmissions: [],
      locations: [],
      condition: [],
    };
  });

  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSaveSearchOpen, setIsSaveSearchOpen] = useState(false);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("collectionFilters", JSON.stringify(filters));
  }, [filters]);

  // Extract unique values for filter options
  const filterOptions = useMemo(() => {
    const fuelTypes = Array.from(new Set(featuredCars.map(car => car.fuelType)));
    const transmissions = Array.from(new Set(featuredCars.map(car => car.transmission)));
    const locations = Array.from(new Set(featuredCars.map(car => car.location)));
    const conditions = ["New", "Used", "Certified Pre-Owned"];
    
    return { fuelTypes, transmissions, locations, conditions };
  }, []);

  // Generate search suggestions
  useEffect(() => {
    if (filters.searchQuery.length > 0) {
      const query = filters.searchQuery.toLowerCase();
      const suggestions = new Set<string>();

      featuredCars.forEach(car => {
        if (car.title.toLowerCase().includes(query)) {
          suggestions.add(car.title);
        }
        if (car.brand.toLowerCase().includes(query)) {
          suggestions.add(car.brand);
        }
      });

      setSearchSuggestions(Array.from(suggestions).slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [filters.searchQuery]);

  // Filter and sort cars
  const filteredAndSortedCars = useMemo(() => {
    let result = featuredCars.filter(car => {
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          car.title.toLowerCase().includes(query) ||
          car.brand.toLowerCase().includes(query) ||
          car.location.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Brands
      if (filters.brands.length > 0 && !filters.brands.includes(car.brand)) {
        return false;
      }

      // Price range
      const priceInM = car.price / 1000000;
      if (priceInM < filters.priceRange[0] || priceInM > filters.priceRange[1]) {
        return false;
      }

      // Year range
      if (car.year < filters.yearRange[0] || car.year > filters.yearRange[1]) {
        return false;
      }

      // Mileage range
      if (car.mileage < filters.mileageRange[0] || car.mileage > filters.mileageRange[1]) {
        return false;
      }

      // Fuel types
      if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(car.fuelType)) {
        return false;
      }

      // Transmissions
      if (filters.transmissions.length > 0 && !filters.transmissions.includes(car.transmission)) {
        return false;
      }

      // Locations
      if (filters.locations.length > 0 && !filters.locations.includes(car.location)) {
        return false;
      }

      // Condition
      if (filters.condition.length > 0) {
        const carCondition = car.isNew ? "New" : "Used";
        if (!filters.condition.includes(carCondition)) {
          return false;
        }
      }

      return true;
    });

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "year-new":
        result.sort((a, b) => b.year - a.year);
        break;
      case "year-old":
        result.sort((a, b) => a.year - b.year);
        break;
      case "mileage-low":
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case "mileage-high":
        result.sort((a, b) => b.mileage - a.mileage);
        break;
      case "newest":
      default:
        result.sort((a, b) => a.daysListed - b.daysListed);
        break;
    }

    return result;
  }, [filters, sortBy]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.brands.length > 0) count += filters.brands.length;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 150) count++;
    if (filters.yearRange[0] > 2010 || filters.yearRange[1] < 2024) count++;
    if (filters.mileageRange[0] > 0 || filters.mileageRange[1] < 200000) count++;
    if (filters.fuelTypes.length > 0) count += filters.fuelTypes.length;
    if (filters.transmissions.length > 0) count += filters.transmissions.length;
    if (filters.locations.length > 0) count += filters.locations.length;
    if (filters.condition.length > 0) count += filters.condition.length;
    return count;
  }, [filters]);

  // Update individual filters
  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = <K extends keyof Filters>(
    key: K,
    value: string
  ) => {
    setFilters(prev => {
      const currentArray = prev[key] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [key]: newArray };
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    const defaultFilters: Filters = {
      searchQuery: "",
      brands: [],
      priceRange: [0, 150],
      yearRange: [2010, 2024],
      mileageRange: [0, 200000],
      fuelTypes: [],
      transmissions: [],
      locations: [],
      condition: [],
    };
    setFilters(defaultFilters);
    setSortBy("newest");
  };

  // Remove individual filter
  const removeFilter = (type: string, value?: string) => {
    switch (type) {
      case "search":
        updateFilter("searchQuery", "");
        break;
      case "brand":
        if (value) toggleArrayFilter("brands", value);
        break;
      case "price":
        updateFilter("priceRange", [0, 150]);
        break;
      case "year":
        updateFilter("yearRange", [2010, 2024]);
        break;
      case "mileage":
        updateFilter("mileageRange", [0, 200000]);
        break;
      case "fuelType":
        if (value) toggleArrayFilter("fuelTypes", value);
        break;
      case "transmission":
        if (value) toggleArrayFilter("transmissions", value);
        break;
      case "location":
        if (value) toggleArrayFilter("locations", value);
        break;
      case "condition":
        if (value) toggleArrayFilter("condition", value);
        break;
    }
  };

  // Filter sidebar component
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by brand, model..."
            value={filters.searchQuery}
            onChange={(e) => updateFilter("searchQuery", e.target.value)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onFocus={() => filters.searchQuery && setShowSuggestions(true)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-10 overflow-hidden">
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm"
                  onClick={() => {
                    updateFilter("searchQuery", suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Brand</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {carBrands.map(brand => (
            <label
              key={brand.name}
              className="flex items-center gap-3 cursor-pointer group py-1"
            >
              <Checkbox
                checked={filters.brands.includes(brand.name)}
                onCheckedChange={() => toggleArrayFilter("brands", brand.name)}
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
        <h3 className="font-display text-lg font-semibold mb-3">
          Price Range (Million LKR)
        </h3>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
          max={150}
          step={5}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{filters.priceRange[0]}M</span>
          <span>{filters.priceRange[1]}M</span>
        </div>
      </div>

      {/* Year Range */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Year</h3>
        <Slider
          value={filters.yearRange}
          onValueChange={(value) => updateFilter("yearRange", value as [number, number])}
          min={2010}
          max={2024}
          step={1}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{filters.yearRange[0]}</span>
          <span>{filters.yearRange[1]}</span>
        </div>
      </div>

      {/* Mileage Range */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">
          Mileage (KM)
        </h3>
        <Slider
          value={filters.mileageRange}
          onValueChange={(value) => updateFilter("mileageRange", value as [number, number])}
          max={200000}
          step={5000}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{filters.mileageRange[0].toLocaleString()}</span>
          <span>{filters.mileageRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Fuel Type</h3>
        <div className="space-y-2">
          {filterOptions.fuelTypes.map(fuelType => (
            <label
              key={fuelType}
              className="flex items-center gap-3 cursor-pointer group py-1"
            >
              <Checkbox
                checked={filters.fuelTypes.includes(fuelType)}
                onCheckedChange={() => toggleArrayFilter("fuelTypes", fuelType)}
              />
              <span className="text-sm group-hover:text-primary transition-colors">
                {fuelType}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Transmission</h3>
        <div className="space-y-2">
          {filterOptions.transmissions.map(transmission => (
            <label
              key={transmission}
              className="flex items-center gap-3 cursor-pointer group py-1"
            >
              <Checkbox
                checked={filters.transmissions.includes(transmission)}
                onCheckedChange={() => toggleArrayFilter("transmissions", transmission)}
              />
              <span className="text-sm group-hover:text-primary transition-colors">
                {transmission}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Location</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {filterOptions.locations.map(location => (
            <label
              key={location}
              className="flex items-center gap-3 cursor-pointer group py-1"
            >
              <Checkbox
                checked={filters.locations.includes(location)}
                onCheckedChange={() => toggleArrayFilter("locations", location)}
              />
              <span className="text-sm group-hover:text-primary transition-colors">
                {location}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Condition</h3>
        <div className="space-y-2">
          {filterOptions.conditions.map(condition => (
            <label
              key={condition}
              className="flex items-center gap-3 cursor-pointer group py-1"
            >
              <Checkbox
                checked={filters.condition.includes(condition)}
                onCheckedChange={() => toggleArrayFilter("condition", condition)}
              />
              <span className="text-sm group-hover:text-primary transition-colors">
                {condition}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearAllFilters}
        >
          Clear All Filters ({activeFilterCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageTransition>
        <main id="main-content" className="pt-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-br from-background via-muted/30 to-background border-b border-border">
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
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              {/* Desktop Filters Sidebar */}
              <aside className="hidden lg:block w-80 shrink-0">
                <div className="sticky top-24">
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-display text-xl font-semibold">Filters</h2>
                      {activeFilterCount > 0 && (
                        <Badge variant="secondary">{activeFilterCount}</Badge>
                      )}
                    </div>
                    <FilterContent />
                  </div>
                </div>
              </aside>

              {/* Mobile Filter Button */}
              <button
                className="lg:hidden fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-110 transition-transform"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="h-6 w-6" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Mobile Filter Drawer */}
              {showFilters && (
                <>
                  <div
                    className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    onClick={() => setShowFilters(false)}
                  />
                  <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-full sm:w-96 bg-background border-r border-border overflow-y-auto">
                    <div className="sticky top-0 bg-background p-4 border-b border-border flex items-center justify-between z-10">
                      <div className="flex items-center gap-3">
                        <h2 className="font-display text-xl font-semibold">Filters</h2>
                        {activeFilterCount > 0 && (
                          <Badge variant="secondary">{activeFilterCount}</Badge>
                        )}
                      </div>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="p-6">
                      <FilterContent />
                    </div>
                    <div className="sticky bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
                      <Button
                        variant="gold"
                        className="w-full"
                        onClick={() => setShowFilters(false)}
                      >
                        Show {filteredAndSortedCars.length} Results
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {/* Car Grid */}
              <div className="flex-1 min-w-0">
                {/* Active Filters & Sort */}
                <div className="mb-6 space-y-4">
                  {/* Results count & Sort */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-muted-foreground">
                      Showing{" "}
                      <span className="text-foreground font-semibold">
                        {filteredAndSortedCars.length}
                      </span>{" "}
                      of {featuredCars.length} vehicles
                    </p>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsSaveSearchOpen(true)}
                        className="gap-2"
                      >
                        <BookmarkPlus className="h-4 w-4" />
                        Save Search
                      </Button>
                      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="year-new">Year: Newest</SelectItem>
                          <SelectItem value="year-old">Year: Oldest</SelectItem>
                          <SelectItem value="mileage-low">Mileage: Low to High</SelectItem>
                          <SelectItem value="mileage-high">Mileage: High to Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Active Filter Tags */}
                  {activeFilterCount > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {filters.searchQuery && (
                        <Badge
                          variant="secondary"
                          className="pl-3 pr-2 py-1.5 cursor-pointer hover:bg-destructive/10"
                          onClick={() => removeFilter("search")}
                        >
                          Search: "{filters.searchQuery}"
                          <X className="h-3 w-3 ml-1.5" />
                        </Badge>
                      )}
                      {filters.brands.map(brand => (
                        <Badge
                          key={brand}
                          variant="secondary"
                          className="pl-3 pr-2 py-1.5 cursor-pointer hover:bg-destructive/10"
                          onClick={() => removeFilter("brand", brand)}
                        >
                          {brand}
                          <X className="h-3 w-3 ml-1.5" />
                        </Badge>
                      ))}
                      {(filters.priceRange[0] > 0 || filters.priceRange[1] < 150) && (
                        <Badge
                          variant="secondary"
                          className="pl-3 pr-2 py-1.5 cursor-pointer hover:bg-destructive/10"
                          onClick={() => removeFilter("price")}
                        >
                          Price: {filters.priceRange[0]}-{filters.priceRange[1]}M
                          <X className="h-3 w-3 ml-1.5" />
                        </Badge>
                      )}
                      {(filters.yearRange[0] > 2010 || filters.yearRange[1] < 2024) && (
                        <Badge
                          variant="secondary"
                          className="pl-3 pr-2 py-1.5 cursor-pointer hover:bg-destructive/10"
                          onClick={() => removeFilter("year")}
                        >
                          Year: {filters.yearRange[0]}-{filters.yearRange[1]}
                          <X className="h-3 w-3 ml-1.5" />
                        </Badge>
                      )}
                      {(filters.mileageRange[0] > 0 || filters.mileageRange[1] < 200000) && (
                        <Badge
                          variant="secondary"
                          className="pl-3 pr-2 py-1.5 cursor-pointer hover:bg-destructive/10"
                          onClick={() => removeFilter("mileage")}
                        >
                          Mileage: {filters.mileageRange[0].toLocaleString()}-
                          {filters.mileageRange[1].toLocaleString()} km
                          <X className="h-3 w-3 ml-1.5" />
                        </Badge>
                      )}
                      {filters.fuelTypes.map(fuelType => (
                        <Badge
                          key={fuelType}
                          variant="secondary"
                          className="pl-3 pr-2 py-1.5 cursor-pointer hover:bg-destructive/10"
                          onClick={() => removeFilter("fuelType", fuelType)}
                        >
                          {fuelType}
                          <X className="h-3 w-3 ml-1.5" />
                        </Badge>
                      ))}
                      {filters.transmissions.map(transmission => (
                        <Badge
                          key={transmission}
                          variant="secondary"
                          className="pl-3 pr-2 py-1.5 cursor-pointer hover:bg-destructive/10"
                          onClick={() => removeFilter("transmission", transmission)}
                        >
                          {transmission}
                          <X className="h-3 w-3 ml-1.5" />
                        </Badge>
                      ))}
                      {filters.locations.map(location => (
                        <Badge
                          key={location}
                          variant="secondary"
                          className="pl-3 pr-2 py-1.5 cursor-pointer hover:bg-destructive/10"
                          onClick={() => removeFilter("location", location)}
                        >
                          {location}
                          <X className="h-3 w-3 ml-1.5" />
                        </Badge>
                      ))}
                      {filters.condition.map(condition => (
                        <Badge
                          key={condition}
                          variant="secondary"
                          className="pl-3 pr-2 py-1.5 cursor-pointer hover:bg-destructive/10"
                          onClick={() => removeFilter("condition", condition)}
                        >
                          {condition}
                          <X className="h-3 w-3 ml-1.5" />
                        </Badge>
                      ))}
                      {activeFilterCount > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearAllFilters}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          Clear All
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {/* Car Grid */}
                {filteredAndSortedCars.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAndSortedCars.map((car, index) => (
                      <div
                        key={car.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <CarCard car={car} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-muted/30 rounded-2xl">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-2">
                      No vehicles found
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Try adjusting your filters or search criteria to find what you're looking for.
                    </p>
                    <Button variant="outline" onClick={clearAllFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      </PageTransition>
      <Footer />

      {/* Save Search Dialog */}
      <SaveSearchDialog
        isOpen={isSaveSearchOpen}
        onClose={() => setIsSaveSearchOpen(false)}
        filters={filters}
        resultsCount={filteredAndSortedCars.length}
      />
    </div>
  );
};

export default Collection;

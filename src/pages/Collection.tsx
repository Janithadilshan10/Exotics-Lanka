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
import { SEO } from "@/components/SEO";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Search, SlidersHorizontal, X, ArrowUpDown, BookmarkPlus, Filter } from "lucide-react";

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
  const [loading, setLoading] = useState(false); // Set to true when fetching data

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
      <SEO
        title="Collection - Browse Luxury Cars"
        description="Browse our curated collection of exotic and luxury vehicles. Filter by brand, price, year, and more to find your perfect car."
        keywords="luxury car collection, exotic cars sri lanka, premium vehicles, buy luxury cars"
      />
      <Navbar />
      <PageTransition>
        <main id="main-content">
          {/* Premium Header with Search */}
          <section className="relative pt-24 pb-16 overflow-hidden border-b border-border/30">
            {/*Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015]" />

            <div className="container mx-auto px-6 md:px-12 max-w-[1400px] relative z-10">
              {/* Header */}
              <div className="text-center mb-12">
                <p className="text-primary font-medium uppercase tracking-widest text-sm mb-4">Premium Collection</p>
                <h1 className="font-display text-4xl md:text-6xl font-light mb-4">
                  Discover Your Dream <span className="font-medium text-primary">Vehicle</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Browse through {featuredCars.length}+ curated luxury and exotic vehicles
                </p>
              </div>

              {/* Premium Search Bar */}
              <div className="max-w-3xl mx-auto mb-8">
                <div className="relative">
                  <div className="absolute -inset-px bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-sm opacity-50" />
                  <div className="relative p-2 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search by brand, model, or keyword..."
                          value={filters.searchQuery}
                          onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                          className="w-full h-14 pl-12 pr-4 bg-transparent border-0 focus:outline-none text-foreground placeholder:text-muted-foreground font-medium"
                        />
                        {filters.searchQuery && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setFilters({ ...filters, searchQuery: "" })}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <Button
                        size="lg"
                        className="h-14 px-8 bg-primary hover:bg-primary/90 shadow-lg"
                      >
                        Search
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Search Suggestions */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="mt-2 p-4 rounded-xl bg-card border border-border/50 shadow-lg">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Suggestions</p>
                    <div className="space-y-1">
                      {searchSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/10 text-foreground transition-colors"
                          onClick={() => {
                            setFilters({ ...filters, searchQuery: suggestion });
                            setShowSuggestions(false);
                          }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12">
            <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
              <div className="flex flex-col gap-8">
                {/* Header: Filters & Sort */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/50 backdrop-blur-sm p-4 rounded-2xl border border-border/50 sticky top-24 z-30 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="gap-2 bg-background border-primary/20 hover:border-primary/50 text-foreground">
                          <Filter className="h-4 w-4" />
                          Filters
                          {activeFilterCount > 0 && (
                            <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1 bg-primary/10 text-primary hover:bg-primary/20">
                              {activeFilterCount}
                            </Badge>
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                        <SheetHeader className="mb-6">
                          <SheetTitle className="font-display text-2xl">Filters</SheetTitle>
                        </SheetHeader>
                        <FilterContent />
                        <div className="mt-8 pt-4 border-t border-border sticky bottom-0 bg-background pb-4">
                          <SheetClose asChild>
                            <Button className="w-full">
                              Show {filteredAndSortedCars.length} Results
                            </Button>
                          </SheetClose>
                        </div>
                      </SheetContent>
                    </Sheet>

                    <Button
                      variant="outline"
                      className="gap-2 hidden md:flex bg-background border-primary/20 hover:border-primary/50 text-foreground"
                      onClick={() => setIsSaveSearchOpen(true)}
                    >
                      <BookmarkPlus className="h-4 w-4" />
                      Save Search
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Results Counter - Now visible on mobile */}
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        <span className="text-foreground font-semibold">{filteredAndSortedCars.length}</span> vehicles
                        {activeFilterCount > 0 && <span className="text-primary ml-1">({activeFilterCount} filters)</span>}
                      </p>

                      {/* Clear All Filters Button */}
                      {activeFilterCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearAllFilters}
                          className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Clear All
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px] bg-background">
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
                </div>

                {/* Active Filter Tags */}
                {activeFilterCount > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Active Filters</p>
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
                  </div>
                )}

                {/* Car Grid - More columns for "smaller" efficiency */}
                <div className="flex-1">
                  {loading ? (
                    // Loading skeletons
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <CarCardSkeleton key={i} />
                      ))}
                    </div>
                  ) : filteredAndSortedCars.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredAndSortedCars.map((car, index) => (
                        <div
                          key={car.id}
                          className="animate-scale-in"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <CarCard car={car} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Empty state with beautiful animation
                    <NoSearchResults onClear={clearAllFilters} />
                  )}
                </div>
              </div>
            </div>
          </section>
        </main >
      </PageTransition >
      <Footer />

      {/* Save Search Dialog */}
      <SaveSearchDialog
        isOpen={isSaveSearchOpen}
        onClose={() => setIsSaveSearchOpen(false)}
        filters={filters}
        resultsCount={filteredAndSortedCars.length}
      />
    </div >
  );
};

export default Collection;

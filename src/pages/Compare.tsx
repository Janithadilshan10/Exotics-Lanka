import React from "react";
import { useComparison } from "@/contexts/ComparisonContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  MapPin,
  Eye,
  Heart,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Compare = () => {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();
  const navigate = useNavigate();

  // If less than 2 cars, show message
  if (comparisonList.length < 2) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-muted-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-4">
                No Vehicles to Compare
              </h1>
              <p className="text-muted-foreground mb-8">
                {comparisonList.length === 0
                  ? "You haven't added any vehicles to compare yet. Browse our collection and add vehicles to get started."
                  : "Add at least one more vehicle to start comparing."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/collection">
                  <Button variant="gold" size="lg">
                    Browse Collection
                  </Button>
                </Link>
                {comparisonList.length > 0 && (
                  <Button variant="outline" size="lg" onClick={clearComparison}>
                    Clear Comparison
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Helper to highlight differences
  const getValueClass = (key: string, value: any, index: number) => {
    const values = comparisonList.map((car: any) => car[key]);
    const allSame = values.every((v) => v === values[0]);

    if (allSame) return "";

    // For numerical comparisons
    if (typeof value === "number") {
      const max = Math.max(...values.filter((v) => typeof v === "number"));
      const min = Math.min(...values.filter((v) => typeof v === "number"));

      // Highlight best value based on context
      if (key === "price" || key === "mileage" || key === "daysListed") {
        // Lower is better
        if (value === min) return "text-emerald-500 font-semibold";
        if (value === max) return "text-rose-500";
      } else if (key === "year" || key === "healthScore") {
        // Higher is better
        if (value === max) return "text-emerald-500 font-semibold";
        if (value === min) return "text-rose-500";
      }
    }

    return "";
  };

  const comparisonRows = [
    {
      category: "Basic Information",
      rows: [
        {
          label: "Model",
          icon: CheckCircle,
          getValue: (car: any) => car.title,
          key: "title",
        },
        {
          label: "Brand",
          icon: CheckCircle,
          getValue: (car: any) => car.brand,
          key: "brand",
        },
        {
          label: "Year",
          icon: Calendar,
          getValue: (car: any) => car.year,
          key: "year",
        },
        {
          label: "Condition",
          icon: CheckCircle,
          getValue: (car: any) => (car.isNew ? "New" : "Used"),
          key: "isNew",
        },
      ],
    },
    {
      category: "Pricing",
      rows: [
        {
          label: "Price",
          icon: TrendingUp,
          getValue: (car: any) => `LKR ${(car.price / 1000000).toFixed(1)}M`,
          key: "price",
        },
      ],
    },
    {
      category: "Performance & Specs",
      rows: [
        {
          label: "Mileage",
          icon: Gauge,
          getValue: (car: any) => `${car.mileage.toLocaleString()} km`,
          key: "mileage",
        },
        {
          label: "Fuel Type",
          icon: Fuel,
          getValue: (car: any) => car.fuelType,
          key: "fuelType",
        },
        {
          label: "Transmission",
          icon: Settings,
          getValue: (car: any) => car.transmission,
          key: "transmission",
        },
      ],
    },
    {
      category: "Location & Popularity",
      rows: [
        {
          label: "Location",
          icon: MapPin,
          getValue: (car: any) => car.location,
          key: "location",
        },
        {
          label: "Views",
          icon: Eye,
          getValue: (car: any) => car.views?.toLocaleString() || "N/A",
          key: "views",
        },
        {
          label: "Favorites",
          icon: Heart,
          getValue: (car: any) => car.favorites?.toLocaleString() || "N/A",
          key: "favorites",
        },
        {
          label: "Days Listed",
          icon: Calendar,
          getValue: (car: any) => `${car.daysListed || 0} days`,
          key: "daysListed",
        },
      ],
    },
  ];

  if (comparisonList.some((car) => car.healthScore)) {
    comparisonRows[2].rows.push({
      label: "Health Score",
      icon: CheckCircle,
      getValue: (car: any) => car.healthScore ? `${car.healthScore}/100` : "N/A",
      key: "healthScore",
    });
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-br from-background via-muted/30 to-background border-b border-border">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
                  Compare Vehicles
                </h1>
                <p className="text-muted-foreground">
                  Side-by-side comparison of {comparisonList.length} vehicles
                </p>
              </div>
              <Button variant="outline" onClick={clearComparison}>
                Clear All
              </Button>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Desktop View - Side by Side */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="w-48 p-4 text-left bg-muted/30 border border-border">
                      <span className="font-display text-lg font-semibold">
                        Specification
                      </span>
                    </th>
                    {comparisonList.map((car) => (
                      <th
                        key={car.id}
                        className="p-4 bg-card border border-border relative"
                      >
                        <button
                          onClick={() => removeFromComparison(car.id)}
                          className="absolute top-2 right-2 p-1 hover:bg-destructive/10 rounded-full transition-colors group"
                          aria-label={`Remove ${car.title}`}
                        >
                          <X className="h-4 w-4 text-muted-foreground group-hover:text-destructive" />
                        </button>

                        {/* Car Image */}
                        <Link to={`/car/${car.id}`}>
                          <img
                            src={car.image}
                            alt={car.title}
                            className="w-full aspect-[4/3] object-cover rounded-lg mb-4 hover:opacity-90 transition-opacity"
                          />
                        </Link>

                        {/* Car Title */}
                        <Link to={`/car/${car.id}`}>
                          <h3 className="font-display text-lg font-semibold hover:text-primary transition-colors">
                            {car.title}
                          </h3>
                        </Link>

                        {/* Badges */}
                        <div className="flex gap-2 mt-3 justify-center">
                          {car.isNew && (
                            <Badge className="bg-primary text-primary-foreground">
                              New
                            </Badge>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      {/* Category Header */}
                      <tr>
                        <td
                          colSpan={comparisonList.length + 1}
                          className="p-4 bg-muted/50 border border-border"
                        >
                          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            {category.category}
                          </h4>
                        </td>
                      </tr>

                      {/* Category Rows */}
                      {category.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td className="p-4 bg-muted/30 border border-border">
                            <div className="flex items-center gap-2">
                              <row.icon className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{row.label}</span>
                            </div>
                          </td>
                          {comparisonList.map((car, carIndex) => (
                            <td
                              key={car.id}
                              className="p-4 bg-card border border-border text-center"
                            >
                              <span
                                className={cn(
                                  "text-sm",
                                  getValueClass(row.key, (car as any)[row.key], carIndex)
                                )}
                              >
                                {row.getValue(car)}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View - Stacked Cards */}
            <div className="lg:hidden space-y-6">
              {comparisonList.map((car) => (
                <div
                  key={car.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden"
                >
                  {/* Car Header */}
                  <div className="relative">
                    <Link to={`/car/${car.id}`}>
                      <img
                        src={car.image}
                        alt={car.title}
                        className="w-full aspect-[4/3] object-cover"
                      />
                    </Link>
                    <button
                      onClick={() => removeFromComparison(car.id)}
                      className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-destructive/10 transition-colors"
                      aria-label={`Remove ${car.title}`}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="p-6">
                    <Link to={`/car/${car.id}`}>
                      <h3 className="font-display text-xl font-bold mb-3 hover:text-primary transition-colors">
                        {car.title}
                      </h3>
                    </Link>

                    {/* Specs */}
                    <div className="space-y-4">
                      {comparisonRows.map((category) => (
                        <div key={category.category}>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                            {category.category}
                          </h4>
                          <div className="space-y-2">
                            {category.rows.map((row) => (
                              <div
                                key={row.label}
                                className="flex items-center justify-between text-sm"
                              >
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <row.icon className="h-4 w-4" />
                                  <span>{row.label}</span>
                                </div>
                                <span className="font-medium">
                                  {row.getValue(car)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* View Details Button */}
                    <Link to={`/car/${car.id}`} className="block mt-6">
                      <Button variant="outline" className="w-full">
                        View Full Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border">
              <h3 className="font-display text-lg font-semibold mb-4">
                How to read this comparison
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-emerald-500">Green highlights</span>
                    <p className="text-muted-foreground">
                      Best value for that specification (lower price/mileage, higher year/score)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-rose-500">Red text</span>
                    <p className="text-muted-foreground">
                      Least favorable value in comparison
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Compare;


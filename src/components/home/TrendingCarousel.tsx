import { featuredCars } from "@/data/mockData";
import { CarCard } from "@/components/cars/CarCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function TrendingCarousel() {
  const trendingCars = featuredCars.filter(car => car.trending || car.isNew).slice(0, 4);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary mb-3">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Trending Now</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Most Sought After
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg">
              The vehicles capturing attention right now. High demand, exceptional quality.
            </p>
          </div>
          <Link to="/collection">
            <Button variant="gold-outline" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingCars.map((car, index) => (
            <div
              key={car.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

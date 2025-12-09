import { carBrands } from "@/data/mockData";
import { Link } from "react-router-dom";

export function BrandShowcase() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Prestigious Marques
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Explore our collection by the world's most coveted automotive brands.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {carBrands.map((brand, index) => (
            <Link
              key={brand.name}
              to={`/collection?brand=${brand.name}`}
              className="group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-500 luxury-card animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-5xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                  {brand.logo}
                </span>
                <h3 className="font-display text-lg font-semibold mb-1">
                  {brand.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {brand.count} Vehicles
                </p>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

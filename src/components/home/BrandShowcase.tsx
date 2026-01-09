import { carBrands } from "@/data/mockData";
import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/brands/BrandLogo";

export function BrandShowcase() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-6xl font-light mb-6 tracking-tight">
            Prestigious <span className="font-semibold text-gold-gradient">Marques</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light tracking-wide">
            Explore our curated collection by the world's most coveted automotive brands
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {carBrands.map((brand, index) => (
            <Link
              key={brand.name}
              to={`/collection?brand=${brand.name}`}
              className="group relative p-10 md:p-12 rounded-3xl border border-border/60 bg-card hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 luxury-card animate-fade-in hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Premium Logo Container with Glow Effect */}
                <div className="relative mb-6 opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110">
                  {/* Glow effect behind logo */}
                  <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full scale-150" />
                  <div className="relative">
                    <BrandLogo brand={brand.name} className="w-24 h-24 md:w-28 md:h-28 object-contain filter brightness-110" />
                  </div>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-2 tracking-wide group-hover:text-primary transition-colors duration-300">
                  {brand.name}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground font-light">
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

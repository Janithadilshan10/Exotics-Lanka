import { carBrands } from "@/data/mockData";
import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/brands/BrandLogo";

export function BrandShowcase() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-6xl font-light mb-6 tracking-tight">
            Prestigious <span className="font-semibold text-primary">Marques</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light tracking-wide">
            Explore our curated collection by the world's most coveted automotive brands
          </p>
        </div>

        {/* Premium Marquee / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {carBrands.map((brand, index) => (
            <Link
              key={brand.name}
              to={`/collection?brand=${brand.name}`}
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-border/40 bg-background/40 backdrop-blur-sm hover:border-primary/40 hover:bg-background/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.15)]"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Logo Container */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 transition-transform duration-500 group-hover:scale-110">
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                <div className="relative z-10 w-full h-full flex items-center justify-center opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
                  <BrandLogo brand={brand.name} className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Brand Name */}
              <h3 className="font-display text-sm md:text-base font-medium tracking-wide text-foreground/80 group-hover:text-primary transition-colors duration-300">
                {brand.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

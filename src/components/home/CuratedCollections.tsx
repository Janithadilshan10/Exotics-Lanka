import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
    {
        id: "supercars",
        name: "Supercars",
        image: "https://images.unsplash.com/photo-1544614471-5cea99183e29?q=80&w=2788&auto=format&fit=crop",
        count: 12
    },
    {
        id: "suvs",
        name: "Luxury SUVs",
        image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2670&auto=format&fit=crop",
        count: 24
    },
    {
        id: "classics",
        name: "Modern Classics",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop",
        count: 8
    }
];

export function CuratedCollections() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-16 px-2">
                    <div>
                        <h2 className="font-display text-4xl md:text-5xl font-light mb-4 tracking-tight">
                            Curated <span className="text-muted-foreground">Collections</span>
                        </h2>
                        <p className="text-muted-foreground text-lg font-light tracking-wide">
                            Browse vehicles by lifestyle and performance class
                        </p>
                    </div>
                    <Link
                        to="/collection"
                        className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors uppercase tracking-widest text-sm font-semibold"
                    >
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/collection?category=${category.id}`}
                            className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                        >
                            {/* Image */}
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="font-display text-3xl font-light mb-2 text-white group-hover:text-primary transition-colors">
                                    {category.name}
                                </h3>
                                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    <span className="text-white/80 font-sans-luxury tracking-wide text-sm">
                                        {category.count} Listings
                                    </span>
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link
                        to="/collection"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors uppercase tracking-widest text-sm font-semibold"
                    >
                        View All Collections <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SellerCTA() {
    return (
        <section className="py-24 px-4">
            <div className="container mx-auto">
                <div className="relative rounded-3xl overflow-hidden border border-border/5 shadow-2xl">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1596707323565-5c1a17960fc0?q=80&w=2938&auto=format&fit=crop"
                            alt="Luxury Garage"
                            className="w-full h-full object-cover"
                        />
                        {/* Theme-aware Overlays */}
                        <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-[2px]" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent" />
                    </div>

                    <div className="relative z-10 p-10 md:p-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                        <div className="max-w-xl">
                            <h2 className="font-display text-4xl md:text-5xl font-light mb-6 leading-tight text-zinc-900 dark:text-white">
                                Selling exceptional vehicles requires <span className="text-primary font-medium">exceptional service</span>.
                            </h2>
                            <p className="text-zinc-600 dark:text-white/80 text-lg font-light leading-relaxed mb-8">
                                List your vehicle with Exotics Lanka and access a vetted network of serious buyers.
                                We handle the verification so you can focus on the deal.
                            </p>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-sm text-zinc-700 dark:text-white/80 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Free Professional Valuation
                                </li>
                                <li className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                                    Verified Buyer Network
                                </li>
                                <li className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                                    Privacy-First Process
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <Button
                                asChild
                                variant="gold"
                                size="lg"
                                className="h-14 px-8 text-lg font-semibold tracking-wide"
                            >
                                <Link to="/sell" className="flex items-center gap-2">
                                    List Your Vehicle <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Button>
                            <p className="text-center text-xs text-muted-foreground uppercase tracking-widest">
                                Dealers & Private Sellers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function FeaturedSpotlight() {
    return (
        <section className="py-32 overflow-hidden bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Text Content - Magazine Style */}
                    <div className="lg:w-1/2 relative z-10 order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-widest mb-8 animate-fade-in">
                            <Sparkles className="w-3 h-3" />
                            Editor's Choice
                        </div>

                        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] tracking-tighter mb-8 text-foreground">
                            The Tribute <br />
                            <span className="text-muted-foreground italic font-light">to Speed.</span>
                        </h2>

                        <div className="space-y-6 max-w-lg mb-12">
                            <p className="text-xl text-muted-foreground font-light leading-relaxed">
                                The <strong className="text-foreground font-medium">Ferrari F8 Tributo</strong> represents the highest expression of the Prancing Horse's classic two-seater berlinetta.
                            </p>
                            <div className="grid grid-cols-2 gap-8 py-6 border-t border-border/50">
                                <div>
                                    <p className="text-3xl font-display font-medium text-foreground">710<span className="text-lg text-muted-foreground">hp</span></p>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Power</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-display font-medium text-foreground">2.9<span className="text-lg text-muted-foreground">s</span></p>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">0-100 km/h</p>
                                </div>
                            </div>
                        </div>

                        <Button asChild size="lg" className="rounded-full h-14 px-10 text-lg bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105 duration-500">
                            <Link to="/collection?search=Ferrari">
                                View Listing <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>

                    {/* Image Content - Parallax/Asymmetrical */}
                    <div className="lg:w-1/2 w-full order-1 lg:order-2">
                        <div className="relative group perspective-1000">
                            {/* Decorative back elements */}
                            <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-700 hover:rotate-y-2 hover:translate-x-2">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=80"
                                    alt="Ferrari F8 Tributo"
                                    className="w-full h-[600px] object-cover transform transition-transform duration-1000 group-hover:scale-110"
                                />

                                {/* Floating Badge */}
                                <div className="absolute bottom-8 left-8 z-20 backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-xl">
                                    <p className="text-white text-xs uppercase tracking-widest mb-1">Price</p>
                                    <p className="text-white font-display text-2xl">LKR 185M</p>
                                </div>
                            </div>

                            {/* Offset border accent */}
                            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/30 rounded-[2rem] -z-10 hidden lg:block" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

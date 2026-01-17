import { Shield, CheckCircle2, Lock } from "lucide-react";

export function TrustContent() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute -left-40 top-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-5xl font-light mb-6 tracking-tight">
                        The <span className="text-primary">Exotics</span> Standard
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
                        We are not just a marketplace. We are a gated community for the finest automobiles in Sri Lanka, built on three pillars of trust.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1: Vetting */}
                    <div className="group relative p-8 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/40 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_4px_20px_-4px_rgba(212,175,55,0.15)]">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-primary/20">
                                <Shield className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="font-display text-2xl mb-3">Strict Vetting</h3>
                            <p className="text-muted-foreground font-light leading-relaxed">
                                Every vehicle and dealer is hand-picked. We reject more listings than we accept to ensure you see only the best.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Inspections */}
                    <div className="group relative p-8 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/40 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_4px_20px_-4px_rgba(212,175,55,0.15)]">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-primary/20">
                                <CheckCircle2 className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="font-display text-2xl mb-3">Verified Inspections</h3>
                            <p className="text-muted-foreground font-light leading-relaxed">
                                Transparency above all. Access detailed 200-point inspection reports and verified service history before you inquire.
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Secure */}
                    <div className="group relative p-8 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/40 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_4px_20px_-4px_rgba(212,175,55,0.15)]">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-primary/20">
                                <Lock className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="font-display text-2xl mb-3">Secure Transactions</h3>
                            <p className="text-muted-foreground font-light leading-relaxed">
                                From escrow services to verified payment channels, we provide the infrastructure for safe high-value exchanges.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

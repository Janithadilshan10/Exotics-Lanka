import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Car, Building2, Shield, TrendingUp, Clock, Users, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";

const Sell = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Sell Your Car - List Your Vehicle"
        description="Sell your luxury or exotic car on Exotics Lanka. Reach thousands of potential buyers across Sri Lanka."
        keywords="sell car, sell vehicle, list car for sale, sell luxury car"
      />
      <Navbar />
      <PageTransition>
        <main id="main-content">
          {/* Premium Hero Section */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&q=80"
                alt="Luxury Car Showroom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5" />
            </div>

            {/* Hero Content */}
            <div className="container mx-auto px-4 relative z-10 text-center pt-20 pb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium uppercase tracking-widest mb-8 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                Premium Marketplace
              </div>

              <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6 text-white">
                Sell With <span className="font-medium text-primary">Confidence</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
                Whether you're a private seller or established dealer, Exotics Lanka provides the platform to reach Sri Lanka's most discerning buyers.
              </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-white/50 rounded-full" />
              </div>
            </div>
          </section>

          {/* Selling Options - Premium Cards */}
          <section className="py-24 relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015]" />

            <div className="container mx-auto px-4 relative">
              <div className="text-center mb-16">
                <p className="text-primary font-medium uppercase tracking-widest text-sm mb-4">Choose Your Path</p>
                <h2 className="font-display text-4xl md:text-5xl font-light">
                  How Would You Like to <span className="font-medium text-primary">Sell?</span>
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Private Seller Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-10 rounded-3xl border border-border/50 bg-background/80 backdrop-blur-xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-2xl">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <Car className="h-8 w-8 text-primary" />
                      </div>
                    </div>

                    <h3 className="font-display text-3xl font-semibold mb-4">
                      Private Seller
                    </h3>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                      List your personal vehicle and connect directly with verified buyers. Simple, secure, and effective.
                    </p>

                    <ul className="space-y-4 mb-10">
                      {[
                        { icon: Shield, text: "Verified buyer inquiries" },
                        { icon: TrendingUp, text: "Market price guidance" },
                        { icon: Clock, text: "List in under 5 minutes" }
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-foreground font-medium">{item.text}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/listing/create">
                      <Button
                        variant="default"
                        size="lg"
                        className="w-full h-14 text-lg font-medium bg-primary hover:bg-primary/90 group-hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.3)] transition-all duration-300"
                      >
                        List Your Vehicle
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* Dealer Partner Card - Featured */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="group relative"
                >
                  {/* Premium Glow Effect */}
                  <div className="absolute -inset-px bg-gradient-to-br from-primary via-primary/50 to-primary rounded-3xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500" />

                  <div className="relative p-10 rounded-3xl bg-gradient-to-br from-card to-card/95 backdrop-blur-xl border border-primary/50 hover:border-primary transition-all duration-500 hover:-translate-y-1 shadow-2xl hover:shadow-[0_0_40px_-5px_rgba(212,175,55,0.4)]">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                        <Building2 className="h-8 w-8 text-primary" />
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider shadow-lg">
                        Pro
                      </span>
                    </div>

                    <h3 className="font-display text-3xl font-semibold mb-4">
                      Dealer Partner
                    </h3>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                      Access our full suite of dealer tools, analytics, and premium placement to maximize your sales.
                    </p>

                    <ul className="space-y-4 mb-10">
                      {[
                        { icon: Users, text: "Unlimited inventory listings" },
                        { icon: TrendingUp, text: "Advanced analytics dashboard" },
                        { icon: Shield, text: "Priority support & verification" }
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-foreground font-medium">{item.text}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/dealer">
                      <Button
                        variant="default"
                        size="lg"
                        className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg group-hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.5)] transition-all duration-300"
                      >
                        Access Dealer Portal
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats Section - Refined */}
          <section className="py-24 border-y border-border/30 bg-gradient-to-b from-muted/20 to-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
                  Trusted by Sri Lanka's <span className="font-medium text-primary">Best</span>
                </h2>
                <p className="text-muted-foreground text-lg">Proven results that speak for themselves</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-5xl mx-auto">
                {[
                  { value: "50+", label: "Active Dealers" },
                  { value: "1,247", label: "Vehicles Listed" },
                  { value: "18", label: "Avg. Days to Sell" },
                  { value: "4.9★", label: "User Rating" }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors duration-300"
                  >
                    <p className="font-display text-5xl font-bold text-primary mb-3">{stat.value}</p>
                    <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Sell;

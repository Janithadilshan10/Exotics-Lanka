import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Car, Building2, Shield, TrendingUp, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";

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
        <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Sell With <span className="text-gold-gradient">Confidence</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Whether you're a private seller or established dealer, Exotics.lk provides 
              the platform to reach discerning buyers across Sri Lanka.
            </p>
          </div>
        </section>

        {/* Options */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Private Seller */}
              <div className="group relative p-8 rounded-3xl border border-border bg-card luxury-card">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Car className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold mb-4">
                    Private Seller
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    List your personal vehicle and connect directly with verified buyers. 
                    Simple, secure, and effective.
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <span>Verified buyer inquiries</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span>Market price guidance</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>List in under 5 minutes</span>
                    </li>
                  </ul>

                  <Button variant="gold" size="lg" className="w-full">
                    List Your Vehicle
                  </Button>
                </div>
              </div>

              {/* Dealer */}
              <div className="group relative p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 luxury-card">
                <div className="absolute -inset-px rounded-3xl gradient-border" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-primary" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                      Pro
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-bold mb-4">
                    Dealer Partner
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Access our full suite of dealer tools, analytics, and premium 
                    placement to maximize your sales.
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Unlimited inventory listings</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span>Advanced analytics dashboard</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <span>Priority support & verification</span>
                    </li>
                  </ul>

                  <Link to="/dealer">
                    <Button variant="luxury" size="lg" className="w-full">
                      Access Dealer Portal
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-foreground text-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Trusted by Sri Lanka's Best
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-primary mb-2">50+</p>
                <p className="text-background/70">Active Dealers</p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-primary mb-2">500+</p>
                <p className="text-background/70">Vehicles Listed</p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-primary mb-2">18</p>
                <p className="text-background/70">Avg. Days to Sell</p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-primary mb-2">4.9</p>
                <p className="text-background/70">User Rating</p>
              </div>
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

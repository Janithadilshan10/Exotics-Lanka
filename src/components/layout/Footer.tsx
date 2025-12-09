import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-3xl font-bold">
                Exotics<span className="text-primary">.lk</span>
              </span>
            </Link>
            <p className="text-background/70 max-w-md">
              Sri Lanka's premier luxury car marketplace. Where exceptional vehicles 
              meet discerning buyers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/collection" className="text-background/70 hover:text-primary transition-colors">
                  The Collection
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-background/70 hover:text-primary transition-colors">
                  Sell With Us
                </Link>
              </li>
              <li>
                <Link to="/dealer" className="text-background/70 hover:text-primary transition-colors">
                  Dealer Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-background/70">
              <li>Colombo 07, Sri Lanka</li>
              <li>+94 11 234 5678</li>
              <li>hello@exotics.lk</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-background/50 text-sm">
          <p>© {new Date().getFullYear()} Exotics.lk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

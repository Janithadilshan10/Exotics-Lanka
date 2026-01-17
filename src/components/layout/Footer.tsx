import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-muted/30 text-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-3xl font-bold">
                Exotics<span className="text-primary">.lk</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Sri Lanka's premier luxury car marketplace. Where exceptional vehicles
              meet discerning buyers.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/50 hover:bg-primary hover:text-primary-foreground border border-border/50 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <span className="text-sm font-bold">f</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/50 hover:bg-primary hover:text-primary-foreground border border-border/50 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <span className="text-sm font-bold">i</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/50 hover:bg-primary hover:text-primary-foreground border border-border/50 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <span className="text-sm font-bold">x</span>
              </a>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/collection" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Collection
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-muted-foreground hover:text-primary transition-colors">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/dealer" className="text-muted-foreground hover:text-primary transition-colors">
                  Dealer Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-display text-lg font-semibold mb-2">Contact</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>+94 77 123 4567</li>
                <li>hello@exotics.lk</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Exotics.lk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

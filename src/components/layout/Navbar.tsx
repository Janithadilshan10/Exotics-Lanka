import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Menu, X, User, Heart, Settings, LogOut, LayoutDashboard, MessageCircle, Bookmark, Gavel } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useMessaging } from "@/contexts/MessagingContext";
import { useSavedSearches } from "@/contexts/SavedSearchContext";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount } = useMessaging();
  const { getTotalNewMatches } = useSavedSearches();
  const newMatchesCount = getTotalNewMatches();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/collection", label: "Collection" },
    { href: "/sell", label: "Sell" },
  ];

  const isHome = location.pathname === "/";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled || !isHome
          ? "border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className={cn(
              "font-display text-2xl font-bold tracking-tight transition-colors duration-300",
              isScrolled || !isHome ? "text-foreground" : "dark:text-white text-zinc-900"
            )}>
              Exotics<span className="text-primary group-hover:text-primary/80 transition-colors duration-300">.lk</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.href
                    ? "text-primary"
                    : isScrolled || !isHome
                      ? "text-muted-foreground"
                      : "dark:text-white/80 dark:hover:text-white text-zinc-900 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon" className={isScrolled || !isHome ? "text-foreground hover:bg-muted" : "text-white/80 hover:text-white hover:bg-white/10"}>
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/favorites" className="cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" />
                        Favorites
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/inbox" className="cursor-pointer">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Messages
                          </div>
                          {unreadCount > 0 && (
                            <Badge variant="destructive" className="ml-2 h-5 min-w-[20px] flex items-center justify-center px-1.5">
                              {unreadCount}
                            </Badge>
                          )}
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/saved-searches" className="cursor-pointer">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <Bookmark className="mr-2 h-4 w-4" />
                            Saved Searches
                          </div>
                          {newMatchesCount > 0 && (
                            <Badge variant="destructive" className="ml-2 h-5 min-w-[20px] flex items-center justify-center px-1.5">
                              {newMatchesCount}
                            </Badge>
                          )}
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/resolution-center" className="cursor-pointer">
                        <Gavel className="mr-2 h-4 w-4" />
                        Resolution Center
                      </Link>
                    </DropdownMenuItem>
                    {user?.role !== "buyer" && (
                      <DropdownMenuItem asChild>
                        <Link to="/dealer" className="cursor-pointer">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="gold">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={isScrolled || !isHome ? "text-foreground" : "text-white hover:bg-white/10"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-lg font-medium py-2 transition-colors",
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3 border-t border-border">
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <span className="text-sm text-muted-foreground">Theme</span>
                </div>

                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      </div>
                    </div>
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <User className="h-4 w-4" />
                        Profile
                      </Button>
                    </Link>
                    <Link to="/favorites" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Heart className="h-4 w-4" />
                        Favorites
                      </Button>
                    </Link>
                    <Link to="/inbox" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Messages
                        {unreadCount > 0 && (
                          <Badge variant="destructive" className="ml-auto h-5 min-w-[20px] flex items-center justify-center px-1.5">
                            {unreadCount}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                    <Link to="/saved-searches" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Bookmark className="h-4 w-4" />
                        Saved Searches
                        {newMatchesCount > 0 && (
                          <Badge variant="destructive" className="ml-auto h-5 min-w-[20px] flex items-center justify-center px-1.5">
                            {newMatchesCount}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                    <Link to="/resolution-center" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Gavel className="h-4 w-4" />
                        Resolution Center
                      </Button>
                    </Link>
                    {user?.role !== "buyer" && (
                      <Link to="/dealer" onClick={() => setIsOpen(false)}>
                        <Button variant="gold" className="w-full justify-start gap-2">
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 text-destructive"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button variant="gold" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SavedSearchCard } from "@/components/search/SavedSearchCard";
import { useSavedSearches } from "@/contexts/SavedSearchContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Search, Bell, TrendingUp, Calendar } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { NoSavedSearches } from "@/components/ui/empty-state";

const SavedSearches = () => {
  const { isAuthenticated } = useAuth();
  const { savedSearches, getTotalNewMatches } = useSavedSearches();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "with-alerts" | "has-new">("all");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const totalNewMatches = getTotalNewMatches();

  const filteredSearches = savedSearches.filter(search => {
    if (filter === "with-alerts") return search.alertEnabled;
    if (filter === "has-new") return search.newMatchesCount > 0;
    return true;
  });

  const stats = {
    total: savedSearches.length,
    withAlerts: savedSearches.filter(s => s.alertEnabled).length,
    withNewMatches: savedSearches.filter(s => s.newMatchesCount > 0).length,
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Saved Searches - Search Alerts"
        description="Manage your saved searches and get notified when new luxury cars match your criteria."
        keywords="saved searches, search alerts, notifications, car alerts"
      />
      <Navbar />
      <PageTransition>
        <main id="main-content" className="flex-1 pt-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-br from-background via-muted/30 to-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-display text-4xl font-bold">Saved Searches</h1>
                  {totalNewMatches > 0 && (
                    <Badge variant="destructive" className="text-base px-3 py-1 animate-pulse">
                      {totalNewMatches} new
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-lg">
                  Manage your saved searches and get notified about new matches
                </p>
              </div>

              <Button
                variant="gold"
                size="lg"
                onClick={() => navigate("/collection")}
                className="gap-2"
              >
                <Search className="h-5 w-5" />
                Create New Search
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">
                      Saved {stats.total === 1 ? "Search" : "Searches"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.withAlerts}</p>
                    <p className="text-sm text-muted-foreground">
                      With Alerts Enabled
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalNewMatches}</p>
                    <p className="text-sm text-muted-foreground">
                      New {totalNewMatches === 1 ? "Match" : "Matches"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        {savedSearches.length > 0 && (
          <section className="py-6 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={filter === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  All ({savedSearches.length})
                </Button>
                <Button
                  variant={filter === "has-new" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("has-new")}
                >
                  Has New Matches ({stats.withNewMatches})
                </Button>
                <Button
                  variant={filter === "with-alerts" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("with-alerts")}
                >
                  With Alerts ({stats.withAlerts})
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Saved Searches List */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            {filteredSearches.length > 0 ? (
              <div className="grid gap-6">
                {filteredSearches.map((search) => (
                  <SavedSearchCard key={search.id} search={search} />
                ))}
              </div>
            ) : savedSearches.length > 0 ? (
              <div className="text-center py-20 bg-muted/30 rounded-xl">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">No searches match this filter</h3>
                <Button variant="outline" onClick={() => setFilter("all")}>
                  View All Searches
                </Button>
              </div>
            ) : (
              <div className="text-center py-20 bg-muted/30 rounded-xl">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Search className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="font-display text-3xl font-bold mb-4">
                    No Saved Searches Yet
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Save your favorite search criteria and get notified when new vehicles match your preferences.
                  </p>
                  
                  {/* How it works */}
                  <div className="text-left space-y-4 mb-8">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">1</span>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Apply your filters</p>
                        <p className="text-sm text-muted-foreground">
                          Use the Collection page to filter by brand, price, year, and more
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">2</span>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Save your search</p>
                        <p className="text-sm text-muted-foreground">
                          Click the "Save Search" button and give it a name
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">3</span>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Get notified</p>
                        <p className="text-sm text-muted-foreground">
                          We'll alert you when new vehicles match your criteria
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="gold"
                    size="lg"
                    onClick={() => navigate("/collection")}
                    className="gap-2"
                  >
                    <Search className="h-5 w-5" />
                    Browse Collection
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Alert Info */}
        {savedSearches.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Bell className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold mb-2">
                      About Alerts
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>
                        • Alerts are sent to your registered email address
                      </p>
                      <p>
                        • You can choose between instant, daily, or weekly notifications
                      </p>
                      <p>
                        • Toggle alerts on/off for individual searches anytime
                      </p>
                      <p>
                        • We'll show you a badge when new matches are found
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default SavedSearches;


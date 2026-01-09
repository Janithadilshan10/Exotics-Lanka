import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { SavedSearch, useSavedSearches } from "@/contexts/SavedSearchContext";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  BellOff,
  MoreVertical,
  Trash2,
  ExternalLink,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SavedSearchCardProps {
  search: SavedSearch;
}

export function SavedSearchCard({ search }: SavedSearchCardProps) {
  const { updateSearch, deleteSearch, checkForNewMatches, markAsChecked } = useSavedSearches();
  const navigate = useNavigate();
  const [isCheckingMatches, setIsCheckingMatches] = useState(false);

  const handleToggleAlerts = (enabled: boolean) => {
    updateSearch(search.id, { alertEnabled: enabled });
  };

  const handleCheckMatches = async () => {
    setIsCheckingMatches(true);
    
    // Simulate checking
    await new Promise(resolve => setTimeout(resolve, 500));
    
    checkForNewMatches(search.id);
    setIsCheckingMatches(false);
  };

  const handleViewResults = () => {
    // Build URL with filters
    const params = new URLSearchParams();
    
    // Add filters to URL params
    if (search.filters.searchQuery) params.set('q', search.filters.searchQuery);
    if (search.filters.brands.length > 0) params.set('brands', search.filters.brands.join(','));
    // ... add other filters as needed
    
    markAsChecked(search.id);
    navigate(`/collection?${params.toString()}`);
  };

  const formatTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

  const getFilterSummary = () => {
    const filters = search.filters;
    const parts: string[] = [];
    
    if (filters.brands.length > 0) parts.push(filters.brands.join(", "));
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 150) {
      parts.push(`LKR ${filters.priceRange[0]}-${filters.priceRange[1]}M`);
    }
    if (filters.yearRange[0] > 2010 || filters.yearRange[1] < 2024) {
      parts.push(`${filters.yearRange[0]}-${filters.yearRange[1]}`);
    }
    if (filters.fuelTypes.length > 0) parts.push(filters.fuelTypes.join(", "));
    if (filters.locations.length > 0) parts.push(filters.locations.join(", "));
    
    return parts.length > 0 ? parts.join(" • ") : "All vehicles";
  };

  return (
    <Card className="p-6 hover:border-primary/50 transition-colors">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Search className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">{search.name}</h3>
              {search.newMatchesCount > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {search.newMatchesCount} new
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {getFilterSummary()}
            </p>
          </div>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleViewResults}>
                <ExternalLink className="h-4 w-4 mr-2" />
                View Results
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCheckMatches} disabled={isCheckingMatches}>
                <Search className="h-4 w-4 mr-2" />
                {isCheckingMatches ? "Checking..." : "Check for New"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteSearch(search.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-semibold">{search.totalMatches}</span>
            <span className="text-muted-foreground">
              {search.totalMatches === 1 ? "match" : "matches"}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last checked {formatTime(search.lastChecked)}</span>
          </div>
        </div>

        {/* Alert Toggle */}
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            {search.alertEnabled ? (
              <Bell className="h-4 w-4 text-primary" />
            ) : (
              <BellOff className="h-4 w-4 text-muted-foreground" />
            )}
            <div>
              <p className="text-sm font-medium">
                {search.alertEnabled ? "Alerts enabled" : "Alerts disabled"}
              </p>
              {search.alertEnabled && (
                <p className="text-xs text-muted-foreground capitalize">
                  {search.alertFrequency} notifications
                </p>
              )}
            </div>
          </div>
          
          <Switch
            checked={search.alertEnabled}
            onCheckedChange={handleToggleAlerts}
          />
        </div>

        {/* View Button */}
        <Button
          variant={search.newMatchesCount > 0 ? "default" : "outline"}
          className="w-full gap-2"
          onClick={handleViewResults}
        >
          <ExternalLink className="h-4 w-4" />
          {search.newMatchesCount > 0
            ? `View ${search.newMatchesCount} New Match${search.newMatchesCount === 1 ? "" : "es"}`
            : "View Results"}
        </Button>
      </div>
    </Card>
  );
}




import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Bell } from "lucide-react";
import { useSavedSearches, SearchFilters } from "@/contexts/SavedSearchContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface SaveSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilters;
  resultsCount: number;
}

export function SaveSearchDialog({
  isOpen,
  onClose,
  filters,
  resultsCount,
}: SaveSearchDialogProps) {
  const { isAuthenticated } = useAuth();
  const { saveSearch } = useSavedSearches();
  const navigate = useNavigate();
  
  const [searchName, setSearchName] = useState("");
  const [alertEnabled, setAlertEnabled] = useState(true);
  const [alertFrequency, setAlertFrequency] = useState<'instant' | 'daily' | 'weekly'>('daily');

  const handleSave = () => {
    if (!isAuthenticated) {
      onClose();
      navigate('/login');
      return;
    }

    if (!searchName.trim()) {
      return;
    }

    saveSearch(searchName.trim(), filters);
    
    // Reset and close
    setSearchName("");
    setAlertEnabled(true);
    setAlertFrequency('daily');
    onClose();
  };

  // Generate active filters summary
  const getFilterSummary = () => {
    const active: string[] = [];
    
    if (filters.searchQuery) active.push(`Search: "${filters.searchQuery}"`);
    if (filters.brands.length > 0) active.push(`${filters.brands.length} brand(s)`);
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 150) {
      active.push(`Price: ${filters.priceRange[0]}-${filters.priceRange[1]}M`);
    }
    if (filters.yearRange[0] > 2010 || filters.yearRange[1] < 2024) {
      active.push(`Year: ${filters.yearRange[0]}-${filters.yearRange[1]}`);
    }
    if (filters.fuelTypes.length > 0) active.push(`${filters.fuelTypes.length} fuel type(s)`);
    if (filters.transmissions.length > 0) active.push(`${filters.transmissions.length} transmission(s)`);
    if (filters.locations.length > 0) active.push(`${filters.locations.length} location(s)`);
    if (filters.condition.length > 0) active.push(`${filters.condition.length} condition(s)`);
    
    return active;
  };

  const filterSummary = getFilterSummary();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Search</DialogTitle>
          <DialogDescription>
            Get notified when new vehicles match your criteria
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Name */}
          <div className="space-y-2">
            <Label htmlFor="search-name">Search Name *</Label>
            <Input
              id="search-name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="e.g., Luxury SUVs in Colombo"
              maxLength={50}
            />
            <p className="text-xs text-muted-foreground">
              {searchName.length}/50 characters
            </p>
          </div>

          {/* Current Results */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Current Results</p>
              <Badge variant="secondary">
                {resultsCount} {resultsCount === 1 ? "vehicle" : "vehicles"}
              </Badge>
            </div>
            
            {filterSummary.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {filterSummary.map((filter, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {filter}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                All vehicles (no filters applied)
              </p>
            )}
          </div>

          {/* Alert Settings */}
          <div className="space-y-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="alerts"
                checked={alertEnabled}
                onCheckedChange={(checked) => setAlertEnabled(checked as boolean)}
              />
              <label
                htmlFor="alerts"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                Enable alerts for new matches
              </label>
            </div>

            {alertEnabled && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="frequency" className="text-xs">
                  Alert Frequency
                </Label>
                <Select
                  value={alertFrequency}
                  onValueChange={(value: any) => setAlertFrequency(value)}
                >
                  <SelectTrigger id="frequency" className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instant">Instant (as they appear)</SelectItem>
                    <SelectItem value="daily">Daily digest</SelectItem>
                    <SelectItem value="weekly">Weekly summary</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {alertFrequency === 'instant' && "You'll be notified immediately when new vehicles match"}
                  {alertFrequency === 'daily' && "You'll receive a daily email with new matches"}
                  {alertFrequency === 'weekly' && "You'll receive a weekly summary of new matches"}
                </p>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• You can edit or delete this search anytime</p>
            <p>• Alerts are sent to your registered email</p>
            <p>• You'll see a badge when new matches are found</p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="gold"
            onClick={handleSave}
            disabled={!searchName.trim()}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Save Search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


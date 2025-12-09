import { locationHeatmap } from "@/data/mockData";
import { MapPin } from "lucide-react";

export function LocationHeatmap() {
  const maxPercentage = Math.max(...locationHeatmap.map((l) => l.percentage));

  return (
    <div className="glass-dark rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/10">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm text-muted-foreground">Top Buyer Locations</h3>
          <p className="text-xs text-muted-foreground">Where your buyers come from</p>
        </div>
      </div>

      <div className="space-y-4">
        {locationHeatmap.map((location, index) => {
          const intensity = location.percentage / maxPercentage;
          
          return (
            <div key={location.location} className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium truncate">
                {location.location}
              </span>
              <div className="flex-1 h-8 bg-muted/20 rounded-lg overflow-hidden relative">
                <div
                  className="h-full rounded-lg transition-all duration-1000 ease-out"
                  style={{
                    width: `${location.percentage}%`,
                    background: `linear-gradient(90deg, hsl(43 74% 52% / ${0.3 + intensity * 0.7}), hsl(43 74% 52%))`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-end pr-3">
                  <span className="text-xs font-semibold">
                    {location.percentage}%
                  </span>
                </div>
              </div>
              <span className="w-16 text-xs text-muted-foreground text-right">
                {location.buyers} buyers
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

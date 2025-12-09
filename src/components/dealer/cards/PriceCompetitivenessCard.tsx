import { cn } from "@/lib/utils";

export function PriceCompetitivenessCard() {
  // 0 = Underpriced, 50 = Fair, 100 = Overpriced
  const position = 62; // Slightly overpriced

  const getPositionLabel = (p: number) => {
    if (p < 40) return { label: "Underpriced", color: "text-blue-500" };
    if (p < 60) return { label: "Fair", color: "text-emerald-500" };
    return { label: "Overpriced", color: "text-rose-500" };
  };

  const { label, color } = getPositionLabel(position);

  return (
    <div className="glass-dark rounded-2xl p-6">
      <h3 className="text-sm text-muted-foreground mb-6">
        Price Competitiveness Index
      </h3>

      <div className="mb-6">
        <div className={cn("text-3xl font-bold mb-2", color)}>{label}</div>
        <p className="text-xs text-muted-foreground">
          Based on market analysis of similar vehicles
        </p>
      </div>

      {/* Gauge */}
      <div className="relative h-4 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 to-rose-500 mb-4">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-6 bg-white rounded shadow-lg transition-all duration-500"
          style={{ left: `calc(${position}% - 8px)` }}
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Underpriced</span>
        <span>Fair</span>
        <span>Overpriced</span>
      </div>

      <div className="mt-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
        <p className="text-xs text-rose-400">
          <strong>2 listings</strong> are priced above market average. Consider
          adjusting for faster sales.
        </p>
      </div>
    </div>
  );
}

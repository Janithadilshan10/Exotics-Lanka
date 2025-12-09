import { trendingModels } from "@/data/mockData";
import { TrendingUp, Search } from "lucide-react";

export function TrendingModels() {
  return (
    <div className="glass-dark rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-emerald-500/10">
          <TrendingUp className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <h3 className="text-sm text-muted-foreground">Rising Demand</h3>
          <p className="text-xs text-muted-foreground">Top trending models this week</p>
        </div>
      </div>

      <div className="space-y-3">
        {trendingModels.map((model, index) => (
          <div
            key={model.model}
            className="flex items-center gap-4 p-3 rounded-xl bg-muted/10 hover:bg-muted/20 transition-colors"
          >
            <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{model.model}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Search className="h-3 w-3" />
                <span>{model.searches.toLocaleString()} searches</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-bold">+{model.growth}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

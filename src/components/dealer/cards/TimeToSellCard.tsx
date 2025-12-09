import { TrendingDown } from "lucide-react";

export function TimeToSellCard() {
  const estimatedDays = 14;
  const marketAvg = 22;

  return (
    <div className="glass-dark rounded-2xl p-6">
      <h3 className="text-sm text-muted-foreground mb-6">
        Time on Market Prediction
      </h3>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold text-emerald-500">
            {estimatedDays}
          </span>
          <span className="text-lg text-muted-foreground">Days</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Estimated time to sale
        </p>
      </div>

      <div className="flex items-center gap-2 text-emerald-500 mb-6">
        <TrendingDown className="h-4 w-4" />
        <span className="text-sm font-medium">
          {marketAvg - estimatedDays} days faster than market avg
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Your Average</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${(estimatedDays / marketAvg) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium">{estimatedDays}d</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Market Average</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-muted-foreground/50 rounded-full w-full" />
            </div>
            <span className="text-sm font-medium">{marketAvg}d</span>
          </div>
        </div>
      </div>
    </div>
  );
}

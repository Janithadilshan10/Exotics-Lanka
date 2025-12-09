import { funnelData } from "@/data/mockData";

export function FunnelChart() {
  const maxValue = funnelData[0].value;

  return (
    <div className="glass-dark rounded-2xl p-6 h-full">
      <h3 className="text-sm text-muted-foreground mb-6">Conversion Funnel</h3>

      <div className="space-y-4">
        {funnelData.map((item, index) => {
          const widthPercent = (item.value / maxValue) * 100;
          const dropOff =
            index > 0
              ? (
                  ((funnelData[index - 1].value - item.value) /
                    funnelData[index - 1].value) *
                  100
                ).toFixed(0)
              : null;

          return (
            <div key={item.stage} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{item.stage}</span>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold">
                    {item.value.toLocaleString()}
                  </span>
                  {dropOff && (
                    <span className="text-xs text-rose-400">-{dropOff}%</span>
                  )}
                </div>
              </div>
              <div className="h-10 bg-muted/20 rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg transition-all duration-1000 ease-out"
                  style={{
                    width: `${widthPercent}%`,
                    background: item.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Overall Conversion Rate
          </span>
          <span className="text-lg font-bold text-emerald-500">
            {((funnelData[funnelData.length - 1].value / funnelData[0].value) * 100).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}

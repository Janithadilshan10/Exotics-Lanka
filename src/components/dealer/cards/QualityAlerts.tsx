import { qualityAlerts } from "@/data/mockData";
import { AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function QualityAlerts() {
  const getAlertStyle = (type: string) => {
    switch (type) {
      case "urgent":
        return {
          bg: "bg-rose-500/10",
          border: "border-rose-500/20",
          icon: AlertTriangle,
          iconColor: "text-rose-500",
        };
      case "warning":
        return {
          bg: "bg-amber-500/10",
          border: "border-amber-500/20",
          icon: AlertCircle,
          iconColor: "text-amber-500",
        };
      default:
        return {
          bg: "bg-blue-500/10",
          border: "border-blue-500/20",
          icon: Info,
          iconColor: "text-blue-500",
        };
    }
  };

  return (
    <div className="glass-dark rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm text-muted-foreground">Quality Alerts</h3>
        <span className="px-2 py-1 rounded-full bg-rose-500/20 text-rose-500 text-xs font-medium">
          {qualityAlerts.length} Active
        </span>
      </div>

      <div className="space-y-3">
        {qualityAlerts.map((alert, index) => {
          const style = getAlertStyle(alert.type);
          const Icon = style.icon;

          return (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl border",
                style.bg,
                style.border
              )}
            >
              <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", style.iconColor)} />
              <p className="text-sm flex-1">{alert.message}</p>
              <button className="p-1 hover:bg-white/10 rounded transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Resolve alerts to improve your listing health score
      </p>
    </div>
  );
}

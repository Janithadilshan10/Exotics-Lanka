import { cn } from "@/lib/utils";

export function HealthScoreCard() {
  const score = 78;
  const circumference = 2 * Math.PI * 45;
  const progress = ((100 - score) / 100) * circumference;

  const getScoreColor = (s: number) => {
    if (s >= 85) return "text-emerald-500";
    if (s >= 70) return "text-amber-500";
    return "text-rose-500";
  };

  const getScoreStroke = (s: number) => {
    if (s >= 85) return "#10b981";
    if (s >= 70) return "#f59e0b";
    return "#f43f5e";
  };

  const factors = [
    { label: "Image Quality", value: "High", status: "good" },
    { label: "Price Position", value: "Fair", status: "warning" },
    { label: "Description Depth", value: "Low", status: "bad" },
  ];

  return (
    <div className="glass-dark rounded-2xl p-6">
      <h3 className="text-sm text-muted-foreground mb-6">Listing Health Score</h3>

      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg width="120" height="120" className="-rotate-90">
            <circle
              cx="60"
              cy="60"
              r="45"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              className="text-muted/20"
            />
            <circle
              cx="60"
              cy="60"
              r="45"
              stroke={getScoreStroke(score)}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn("text-3xl font-bold", getScoreColor(score))}>
              {score}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {factors.map((factor) => (
          <div
            key={factor.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted-foreground">{factor.label}</span>
            <span
              className={cn(
                "font-medium",
                factor.status === "good" && "text-emerald-500",
                factor.status === "warning" && "text-amber-500",
                factor.status === "bad" && "text-rose-500"
              )}
            >
              {factor.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

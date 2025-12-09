import { reviewSentiment } from "@/data/mockData";
import { MessageSquare } from "lucide-react";

export function SentimentChart() {
  const total = reviewSentiment.positive + reviewSentiment.neutral + reviewSentiment.negative;

  const segments = [
    { label: "Positive", value: reviewSentiment.positive, color: "bg-emerald-500" },
    { label: "Neutral", value: reviewSentiment.neutral, color: "bg-amber-500" },
    { label: "Negative", value: reviewSentiment.negative, color: "bg-rose-500" },
  ];

  return (
    <div className="glass-dark rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/10">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm text-muted-foreground">Review Sentiment Analysis</h3>
          <p className="text-xs text-muted-foreground">Based on {total} reviews</p>
        </div>
      </div>

      {/* Horizontal Stacked Bar */}
      <div className="h-8 rounded-full overflow-hidden flex mb-6">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className={`${segment.color} transition-all duration-500`}
            style={{ width: `${segment.value}%` }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4">
        {segments.map((segment) => (
          <div key={segment.label} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className={`w-3 h-3 rounded-full ${segment.color}`} />
              <span className="text-2xl font-bold">{segment.value}%</span>
            </div>
            <p className="text-xs text-muted-foreground">{segment.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

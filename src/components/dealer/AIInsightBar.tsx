import { useState, useEffect } from "react";
import { aiInsights } from "@/data/mockData";
import { Sparkles, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function AIInsightBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % aiInsights.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const currentInsight = aiInsights[currentIndex];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "from-primary/20 to-primary/5 border-primary/30";
      case "warning":
        return "from-amber-500/20 to-amber-500/5 border-amber-500/30";
      default:
        return "from-blue-500/20 to-blue-500/5 border-blue-500/30";
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl border p-4 bg-gradient-to-r backdrop-blur-xl transition-all duration-500",
        getPriorityColor(currentInsight.priority)
      )}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="flex items-center gap-2 shrink-0">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            AI Insight
          </span>
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">
            <span className="mr-2">{currentInsight.icon}</span>
            {currentInsight.message}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() =>
              setCurrentIndex(
                (prev) => (prev - 1 + aiInsights.length) % aiInsights.length
              )
            }
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-1">
            {aiInsights.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i === currentIndex ? "bg-primary w-4" : "bg-white/30"
                )}
              />
            ))}
          </div>
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % aiInsights.length)
            }
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors ml-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

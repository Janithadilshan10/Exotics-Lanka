import { AIInsightBar } from "@/components/dealer/AIInsightBar";
import { FunnelChart } from "@/components/dealer/charts/FunnelChart";
import { LocationHeatmap } from "@/components/dealer/charts/LocationHeatmap";
import { TrendingModels } from "@/components/dealer/charts/TrendingModels";
import { DepreciationChart } from "@/components/dealer/charts/DepreciationChart";
import { SentimentChart } from "@/components/dealer/charts/SentimentChart";
import { HealthScoreCard } from "@/components/dealer/cards/HealthScoreCard";
import { PriceCompetitivenessCard } from "@/components/dealer/cards/PriceCompetitivenessCard";
import { TimeToSellCard } from "@/components/dealer/cards/TimeToSellCard";
import { StatCard } from "@/components/dealer/cards/StatCard";
import { dealerStats, funnelData, featuredCars } from "@/data/mockData";
import { TrendingUp, Users, Eye, Heart } from "lucide-react";

const Analytics = () => {
  // Calculate aggregated stats
  const totalViews = featuredCars.reduce((sum, car) => sum + car.views, 0);
  const totalFavorites = featuredCars.reduce((sum, car) => sum + car.favorites, 0);
  const avgHealthScore = Math.round(
    featuredCars.reduce((sum, car) => sum + car.healthScore, 0) / featuredCars.length
  );

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* AI Insight Bar */}
      <AIInsightBar />

      {/* Analytics Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Views"
          value={totalViews.toLocaleString()}
          subtitle="Last 30 days"
          icon={Eye}
          trend={+12.5}
        />
        <StatCard
          title="Favorites"
          value={totalFavorites.toLocaleString()}
          subtitle="Active saves"
          icon={Heart}
          trend={+8.2}
        />
        <StatCard
          title="Conversion Rate"
          value={`${((funnelData[4].value / funnelData[0].value) * 100).toFixed(2)}%`}
          subtitle="Views to Sales"
          icon={TrendingUp}
          trend={+2.1}
        />
        <StatCard
          title="Avg Health Score"
          value={avgHealthScore}
          subtitle="Portfolio quality"
          icon={Users}
          trend={+5}
        />
      </div>

      {/* Performance Metrics */}
      <section>
        <h2 className="font-display text-lg font-semibold mb-4 text-muted-foreground">
          Performance Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <HealthScoreCard />
          <PriceCompetitivenessCard />
          <TimeToSellCard />
        </div>
      </section>

      {/* Conversion Funnel */}
      <section>
        <h2 className="font-display text-lg font-semibold mb-4 text-muted-foreground">
          Conversion Funnel Analysis
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <FunnelChart />
          </div>
          <div className="glass-dark rounded-2xl p-6 flex flex-col justify-center">
            <h3 className="text-sm text-muted-foreground mb-2">Funnel Efficiency</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">View → Click</span>
                  <span className="font-medium text-foreground">36%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "36%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Click → Favorite</span>
                  <span className="font-medium text-foreground">18.7%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "18.7%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Favorite → Lead</span>
                  <span className="font-medium text-foreground">14.8%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "14.8%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Lead → Sale</span>
                  <span className="font-medium text-foreground">6.5%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "6.5%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Intelligence */}
      <section>
        <h2 className="font-display text-lg font-semibold mb-4 text-muted-foreground">
          Market Intelligence
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <LocationHeatmap />
          <TrendingModels />
        </div>
      </section>

      {/* Financial Trends */}
      <section>
        <h2 className="font-display text-lg font-semibold mb-4 text-muted-foreground">
          Financial Trends
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DepreciationChart />
          <SentimentChart />
        </div>
      </section>
    </div>
  );
};

export default Analytics;

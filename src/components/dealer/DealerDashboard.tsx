import { AIInsightBar } from "./AIInsightBar";
import { HealthScoreCard } from "./cards/HealthScoreCard";
import { PriceCompetitivenessCard } from "./cards/PriceCompetitivenessCard";
import { TimeToSellCard } from "./cards/TimeToSellCard";
import { FunnelChart } from "./charts/FunnelChart";
import { LocationHeatmap } from "./charts/LocationHeatmap";
import { TrendingModels } from "./charts/TrendingModels";
import { DepreciationChart } from "./charts/DepreciationChart";
import { ProfitCalculator } from "./cards/ProfitCalculator";
import { SentimentChart } from "./charts/SentimentChart";
import { QualityAlerts } from "./cards/QualityAlerts";
import { StatCard } from "./cards/StatCard";
import { dealerStats } from "@/data/mockData";
import { Car, DollarSign, Clock, Star } from "lucide-react";

export function DealerDashboard() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* AI Insight Bar */}
      <AIInsightBar />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Inventory"
          value={dealerStats.totalInventory}
          subtitle="Active listings"
          icon={Car}
          trend={+3}
        />
        <StatCard
          title="Portfolio Value"
          value={`LKR ${(dealerStats.totalValue / 1000000000).toFixed(2)}B`}
          subtitle="Total inventory value"
          icon={DollarSign}
          trend={-2.4}
          trendLabel="30d depreciation"
        />
        <StatCard
          title="Avg. Response"
          value={`${dealerStats.responseTimeAvg}m`}
          subtitle="Lead response time"
          icon={Clock}
          trend={-12}
          trendPositive
        />
        <StatCard
          title="Rating"
          value={dealerStats.reviewScore}
          subtitle="Customer reviews"
          icon={Star}
        />
      </div>

      {/* Performance & Sales Intelligence */}
      <section>
        <h2 className="font-display text-lg font-semibold mb-4 text-muted-foreground">
          Performance & Sales Intelligence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <HealthScoreCard />
          <PriceCompetitivenessCard />
          <TimeToSellCard />
        </div>
      </section>

      {/* Customer Behavior & Funnel */}
      <section>
        <h2 className="font-display text-lg font-semibold mb-4 text-muted-foreground">
          Customer Behavior & Funnel
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <FunnelChart />
          </div>
          <div className="glass-dark rounded-2xl p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Saved Vehicles</h3>
            <p className="font-display text-5xl font-bold text-primary mb-2">840</p>
            <p className="text-sm text-muted-foreground">
              Users have your cars in their favorites
            </p>
          </div>
        </div>
      </section>

      {/* Market Demand */}
      <section>
        <h2 className="font-display text-lg font-semibold mb-4 text-muted-foreground">
          Market Demand Intelligence
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <LocationHeatmap />
          <TrendingModels />
        </div>
      </section>

      {/* Financial & Operational */}
      <section>
        <h2 className="font-display text-lg font-semibold mb-4 text-muted-foreground">
          Financial & Operational
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DepreciationChart />
          <ProfitCalculator />
        </div>
      </section>

      {/* Reputation & Quality */}
      <section>
        <h2 className="font-display text-lg font-semibold mb-4 text-muted-foreground">
          Reputation & Quality
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SentimentChart />
          <QualityAlerts />
        </div>
      </section>
    </div>
  );
}

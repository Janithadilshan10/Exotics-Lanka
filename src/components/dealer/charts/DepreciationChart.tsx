import { depreciationData } from "@/data/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingDown } from "lucide-react";

export function DepreciationChart() {
  const startValue = depreciationData[0].value;
  const endValue = depreciationData[depreciationData.length - 1].value;
  const depreciation = ((startValue - endValue) / startValue * 100).toFixed(1);

  return (
    <div className="glass-dark rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-500/10">
            <TrendingDown className="h-5 w-5 text-rose-500" />
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">Inventory Depreciation</h3>
            <p className="text-xs text-muted-foreground">30-day trend</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-rose-500 text-lg font-bold">-{depreciation}%</p>
          <p className="text-xs text-muted-foreground">This month</p>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={depreciationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 16%)" />
            <XAxis
              dataKey="day"
              stroke="hsl(240 5% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(240 5% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}M`}
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(240 6% 10%)",
                border: "1px solid hsl(240 4% 16%)",
                borderRadius: "12px",
                padding: "12px",
              }}
              labelStyle={{ color: "hsl(240 5% 65%)" }}
              formatter={(value: number) => [`LKR ${value}M`, "Value"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f43f5e"
              strokeWidth={3}
              dot={{ fill: "#f43f5e", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: "#f43f5e" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

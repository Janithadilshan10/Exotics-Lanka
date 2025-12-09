import { useState } from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfitCalculator() {
  const [buyPrice, setBuyPrice] = useState(12000000);
  const [fixCost, setFixCost] = useState(500000);
  const [sellPrice, setSellPrice] = useState(16500000);

  const profit = sellPrice - buyPrice - fixCost;
  const margin = ((profit / sellPrice) * 100).toFixed(1);

  const formatCurrency = (value: number) => {
    return `LKR ${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="glass-dark rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/10">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-sm text-muted-foreground">Profit Margin Estimator</h3>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            Purchase Price
          </label>
          <input
            type="range"
            min={1000000}
            max={50000000}
            step={500000}
            value={buyPrice}
            onChange={(e) => setBuyPrice(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <p className="text-sm font-medium mt-1">{formatCurrency(buyPrice)}</p>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            Repair & Fix Cost
          </label>
          <input
            type="range"
            min={0}
            max={5000000}
            step={100000}
            value={fixCost}
            onChange={(e) => setFixCost(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
          <p className="text-sm font-medium mt-1">{formatCurrency(fixCost)}</p>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            Expected Sale Price
          </label>
          <input
            type="range"
            min={1000000}
            max={60000000}
            step={500000}
            value={sellPrice}
            onChange={(e) => setSellPrice(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
          <p className="text-sm font-medium mt-1">{formatCurrency(sellPrice)}</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Projected Profit</span>
          <span className="text-2xl font-bold text-emerald-500">
            {formatCurrency(profit)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Margin</span>
          <span className="text-lg font-semibold text-emerald-500">{margin}%</span>
        </div>
      </div>
    </div>
  );
}

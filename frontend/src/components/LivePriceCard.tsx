import { TrendingUp, TrendingDown } from 'lucide-react';
import { useLivePricing } from '@/hooks/useLivePricing';
import { Card } from '@/components/ui/card';

export const LivePriceCard = () => {
  const price = useLivePricing();
  const isPositive = price.changePercent >= 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Carbon Credit Price</h3>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span className="text-sm font-medium">{isPositive ? '+' : ''}{price.changePercent.toFixed(2)}%</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold">${price.current.toFixed(2)}</div>
        <div className="text-sm text-muted-foreground">
          24h High: ${price.high24h.toFixed(2)} | Low: ${price.low24h.toFixed(2)}
        </div>
        <div className="text-xs text-muted-foreground">
          Volume: {price.volume.toLocaleString()} credits
        </div>
        <div className="text-xs text-muted-foreground">
          Last updated: {price.lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </Card>
  );
};

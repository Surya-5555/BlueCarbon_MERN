import { useState, useEffect } from 'react';

export interface CarbonPrice {
  current: number;
  change24h: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume: number;
  lastUpdated: Date;
}

export const useLivePricing = () => {
  const [price, setPrice] = useState<CarbonPrice>({
    current: 25.50,
    change24h: 1.25,
    changePercent: 5.15,
    high24h: 26.80,
    low24h: 24.20,
    volume: 145001,
    lastUpdated: new Date(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate price updates
      setPrice(prev => {
        const change = (Math.random() - 0.5) * 0.5;
        const newPrice = Math.max(20, prev.current + change);
        return {
          current: Number(newPrice.toFixed(2)),
          change24h: Number((prev.change24h + change).toFixed(2)),
          changePercent: Number(((change / prev.current) * 100).toFixed(2)),
          high24h: Math.max(prev.high24h, newPrice),
          low24h: Math.min(prev.low24h, newPrice),
          volume: prev.volume + Math.floor(Math.random() * 1000),
          lastUpdated: new Date(),
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return price;
};

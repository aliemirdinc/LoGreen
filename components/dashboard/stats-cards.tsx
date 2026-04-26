"use client";

import { motion } from "framer-motion";
import { TrendingUp, Truck, Fuel, Leaf } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    label: "Trip Fill Rate",
    value: "85%",
    change: "+12%",
    icon: TrendingUp,
    sparkData: [
      { v: 65 }, { v: 68 }, { v: 72 }, { v: 70 }, { v: 78 }, { v: 82 }, { v: 85 },
    ],
  },
  {
    label: "Empty Trips Reduced",
    value: "12,500",
    change: "+2,340",
    icon: Truck,
    sparkData: [
      { v: 8500 }, { v: 9200 }, { v: 9800 }, { v: 10400 }, { v: 11200 }, { v: 11800 }, { v: 12500 },
    ],
  },
  {
    label: "Fuel Saved",
    value: "1.8M L",
    change: "+340K",
    icon: Fuel,
    sparkData: [
      { v: 1.1 }, { v: 1.25 }, { v: 1.38 }, { v: 1.5 }, { v: 1.62 }, { v: 1.72 }, { v: 1.8 },
    ],
  },
  {
    label: "CO₂ Reduced",
    value: "5,000 T",
    change: "+890",
    icon: Leaf,
    sparkData: [
      { v: 3200 }, { v: 3600 }, { v: 3950 }, { v: 4280 }, { v: 4550 }, { v: 4780 }, { v: 5000 },
    ],
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="glass-card rounded-xl p-5 border border-border/50 hover:glow-border transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-primary">
              <TrendingUp className="w-3 h-3" />
              {stat.change}
            </div>
          </div>

          <div className="mb-3">
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-3xl font-bold gradient-text">{stat.value}</p>
          </div>

          <div className="h-12 -mx-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stat.sparkData}>
                <defs>
                  <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.19 145)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.72 0.19 145)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="oklch(0.72 0.19 145)"
                  strokeWidth={2}
                  fill={`url(#gradient-${index})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

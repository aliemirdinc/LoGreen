"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Nov", revenue: 145000, emissions: 4800 },
  { month: "Dec", revenue: 168000, emissions: 4500 },
  { month: "Jan", revenue: 192000, emissions: 4150 },
  { month: "Feb", revenue: 228000, emissions: 3800 },
  { month: "Mar", revenue: 276000, emissions: 3400 },
  { month: "Apr", revenue: 324000, emissions: 2950 },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-4 border border-border/50 shadow-xl">
        <p className="text-sm font-medium text-foreground mb-2">{label} 2026</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Revenue:</span>
            <span className="text-sm font-semibold text-primary">
              ${payload[0].value.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-zinc-500" />
            <span className="text-xs text-muted-foreground">Emissions:</span>
            <span className="text-sm font-semibold text-zinc-400">
              {payload[1].value.toLocaleString()} tons
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function ImpactChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="glass-card rounded-xl border border-border/50 p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Holistic Impact Analysis</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Revenue from empty miles optimization vs. carbon emissions reduction
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Revenue from Empty Miles</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-zinc-500" />
            <span className="text-sm text-muted-foreground">Carbon Emissions</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.19 145)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="oklch(0.72 0.19 145)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="emissionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#71717a" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#71717a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.01 285)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.65 0 0)", fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.65 0 0)", fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.65 0 0)", fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="oklch(0.72 0.19 145)"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="emissions"
              stroke="#71717a"
              strokeWidth={2}
              fill="url(#emissionsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-border/50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Revenue Growth</p>
          <p className="text-2xl font-bold gradient-text">+123%</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Emissions Reduction</p>
          <p className="text-2xl font-bold text-zinc-300">-38.5%</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">CBAM Credits Generated</p>
          <p className="text-2xl font-bold gradient-text">€428K</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

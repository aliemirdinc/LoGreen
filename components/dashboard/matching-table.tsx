"use client";

import { motion } from "framer-motion";
import { Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const matchingData = [
  {
    truckId: "TRK-7842",
    capacity: "18.5 tons",
    cargo: "Recyclable Plastics",
    route: "Rotterdam → Munich",
    matchScore: 98,
    co2Savings: "2.4 tons",
  },
  {
    truckId: "TRK-3291",
    capacity: "22.0 tons",
    cargo: "Electronics Components",
    route: "Hamburg → Milan",
    matchScore: 95,
    co2Savings: "3.1 tons",
  },
  {
    truckId: "TRK-5128",
    capacity: "15.2 tons",
    cargo: "Organic Produce",
    route: "Amsterdam → Paris",
    matchScore: 92,
    co2Savings: "1.8 tons",
  },
  {
    truckId: "TRK-9467",
    capacity: "24.8 tons",
    cargo: "Steel Coils",
    route: "Antwerp → Frankfurt",
    matchScore: 89,
    co2Savings: "2.9 tons",
  },
  {
    truckId: "TRK-2085",
    capacity: "19.3 tons",
    cargo: "Pharmaceutical Goods",
    route: "Brussels → Zurich",
    matchScore: 86,
    co2Savings: "2.2 tons",
  },
];

function MatchScorePill({ score }: { score: number }) {
  const getScoreStyle = (s: number) => {
    if (s >= 95) return "bg-primary/20 text-primary border-primary/50";
    if (s >= 90) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getScoreStyle(score)}`}>
      <Zap className="w-3 h-3" />
      {score}%
    </span>
  );
}

export function MatchingTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="glass-card rounded-xl border border-border/50"
    >
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Live Algorithmic Matching</h2>
              <p className="text-sm text-muted-foreground">Real-time AI-powered cargo-truck pairing</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
            <div className="w-2 h-2 rounded-full bg-primary status-dot" />
            <span className="text-xs font-medium text-primary">Processing 847 routes</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Truck ID</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Available Capacity</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Matched Cargo</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Route</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">AI Match Score</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">CO₂ Savings</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {matchingData.map((row, index) => (
              <motion.tr
                key={row.truckId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 + 0.8 }}
                whileHover={{ backgroundColor: "oklch(0.15 0.005 285)" }}
                className="border-b border-border/30 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4">
                  <span className="font-mono text-sm font-medium text-foreground">{row.truckId}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{row.capacity}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-foreground">{row.cargo}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{row.route}</span>
                </td>
                <td className="px-6 py-4">
                  <MatchScorePill score={row.matchScore} />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium gradient-text">{row.co2Savings}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    size="sm"
                    className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 hover:glow-border transition-all"
                  >
                    Dispatch
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border/50 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="text-foreground font-medium">5</span> of <span className="text-foreground font-medium">847</span> active matches
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground hover:text-foreground">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground hover:text-foreground">
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

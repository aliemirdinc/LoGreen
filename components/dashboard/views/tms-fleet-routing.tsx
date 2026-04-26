"use client";

import { motion } from "framer-motion";
import { Route, Fuel, Clock, TrendingUp } from "lucide-react";

const activeRoutes = [
  { 
    route: "Berlin → Amsterdam", 
    status: "In Transit", 
    fillRate: 92, 
    fuelBurn: "12.4 L/100km",
    eta: "14:30 CET",
    driver: "M. Schmidt"
  },
  { 
    route: "Munich → Rotterdam", 
    status: "In Transit", 
    fillRate: 87, 
    fuelBurn: "11.8 L/100km",
    eta: "16:45 CET",
    driver: "K. Weber"
  },
  { 
    route: "Hamburg → Brussels", 
    status: "Loading", 
    fillRate: 45, 
    fuelBurn: "—",
    eta: "18:00 CET",
    driver: "J. Müller"
  },
  { 
    route: "Frankfurt → Paris", 
    status: "In Transit", 
    fillRate: 95, 
    fuelBurn: "10.9 L/100km",
    eta: "12:15 CET",
    driver: "S. Fischer"
  },
  { 
    route: "Cologne → Vienna", 
    status: "Scheduled", 
    fillRate: 0, 
    fuelBurn: "—",
    eta: "Tomorrow",
    driver: "L. Braun"
  },
];

// Network nodes for the abstract visualization
const nodes = [
  { id: 1, x: 100, y: 80, label: "BER", size: 12 },
  { id: 2, x: 280, y: 50, label: "HAM", size: 10 },
  { id: 3, x: 180, y: 150, label: "FRA", size: 14 },
  { id: 4, x: 350, y: 100, label: "AMS", size: 11 },
  { id: 5, x: 420, y: 180, label: "RTD", size: 9 },
  { id: 6, x: 250, y: 220, label: "BRU", size: 10 },
  { id: 7, x: 150, y: 280, label: "PAR", size: 13 },
  { id: 8, x: 380, y: 280, label: "VIE", size: 11 },
  { id: 9, x: 80, y: 180, label: "MUC", size: 12 },
  { id: 10, x: 300, y: 320, label: "MIL", size: 10 },
];

const connections = [
  { from: 1, to: 4, active: true },
  { from: 2, to: 4, active: false },
  { from: 3, to: 7, active: true },
  { from: 9, to: 5, active: true },
  { from: 2, to: 6, active: false },
  { from: 3, to: 6, active: false },
  { from: 6, to: 7, active: false },
  { from: 3, to: 8, active: false },
  { from: 8, to: 10, active: false },
  { from: 1, to: 3, active: false },
  { from: 9, to: 3, active: false },
  { from: 4, to: 5, active: false },
];

export function TMSFleetRoutingView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Algorithmic Route Optimization</h1>
          <p className="text-muted-foreground mt-1">Real-time fleet tracking and dynamic routing</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Efficiency: <span className="text-primary font-semibold">94.2%</span></span>
          </div>
        </div>
      </motion.div>

      {/* Network Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-6"
      >
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Route className="w-5 h-5 text-primary" />
          Logistics Network Overview
        </h2>
        <div className="relative h-80 bg-secondary/20 rounded-lg overflow-hidden">
          {/* Grid background */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Network SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 350">
            {/* Connections */}
            {connections.map((conn, i) => {
              const fromNode = nodes.find(n => n.id === conn.from)!;
              const toNode = nodes.find(n => n.id === conn.to)!;
              return (
                <motion.line
                  key={i}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={conn.active ? "rgb(16, 185, 129)" : "rgb(63, 63, 70)"}
                  strokeWidth={conn.active ? 2.5 : 1.5}
                  strokeLinecap="round"
                  style={{
                    filter: conn.active ? "drop-shadow(0 0 6px rgba(16, 185, 129, 0.6))" : "none"
                  }}
                />
              );
            })}
            
            {/* Animated pulses on active routes */}
            {connections.filter(c => c.active).map((conn, i) => {
              const fromNode = nodes.find(n => n.id === conn.from)!;
              const toNode = nodes.find(n => n.id === conn.to)!;
              return (
                <motion.circle
                  key={`pulse-${i}`}
                  r={4}
                  fill="rgb(16, 185, 129)"
                  initial={{ opacity: 0 }}
                  animate={{
                    cx: [fromNode.x, toNode.x],
                    cy: [fromNode.y, toNode.y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "linear",
                  }}
                  style={{ filter: "drop-shadow(0 0 4px rgba(16, 185, 129, 0.8))" }}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node, i) => (
              <motion.g key={node.id}>
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.03, type: "spring" }}
                  cx={node.x}
                  cy={node.y}
                  r={node.size}
                  fill="rgb(24, 24, 27)"
                  stroke="rgb(16, 185, 129)"
                  strokeWidth={2}
                  style={{ filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))" }}
                />
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.03 }}
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill="rgb(16, 185, 129)"
                  fontSize="8"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {node.label}
                </motion.text>
              </motion.g>
            ))}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 flex items-center gap-4 text-xs text-muted-foreground bg-background/80 px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-primary rounded" style={{ boxShadow: "0 0 6px rgba(16, 185, 129, 0.6)" }} />
              <span>Active Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-zinc-600 rounded" />
              <span>Network Link</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Active Routes Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl overflow-hidden"
      >
        <div className="p-5 border-b border-border/50">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Active Routes
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-secondary/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Route</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Driver</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Dynamic Fill Rate</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Fuel Burn Rate</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">ETA</th>
              </tr>
            </thead>
            <tbody>
              {activeRoutes.map((route, index) => (
                <motion.tr
                  key={route.route}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                >
                  <td className="px-5 py-4">
                    <span className="font-medium text-foreground">{route.route}</span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{route.driver}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      route.status === "In Transit"
                        ? "bg-primary/20 text-primary"
                        : route.status === "Loading"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {route.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${route.fillRate}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                          className={`h-full rounded-full ${
                            route.fillRate >= 90 ? "bg-primary" :
                            route.fillRate >= 70 ? "bg-yellow-500" :
                            route.fillRate >= 40 ? "bg-orange-500" : "bg-zinc-600"
                          }`}
                          style={{
                            boxShadow: route.fillRate >= 70 ? "0 0 8px rgba(16, 185, 129, 0.4)" : "none"
                          }}
                        />
                      </div>
                      <span className="text-sm text-foreground font-medium">{route.fillRate}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Fuel className="w-4 h-4" />
                      {route.fuelBurn}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-foreground">{route.eta}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

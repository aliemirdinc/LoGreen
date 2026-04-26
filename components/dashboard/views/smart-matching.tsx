"use client";

import { motion } from "framer-motion";
import { Truck, Package, Zap, ArrowRight, Leaf } from "lucide-react";
import { useState } from "react";

const emptyTrucks = [
  { id: "TRK-092", capacity: "15.5 Tons", location: "Berlin", available: true },
  { id: "TRK-187", capacity: "12.0 Tons", location: "Munich", available: true },
  { id: "TRK-245", capacity: "18.0 Tons", location: "Hamburg", available: true },
  { id: "TRK-301", capacity: "14.5 Tons", location: "Frankfurt", available: false },
  { id: "TRK-419", capacity: "16.0 Tons", location: "Cologne", available: true },
];

const pendingCargo = [
  { id: "CRG-501", type: "Recycled PET Plastics", weight: "14.2 Tons", destination: "Amsterdam", priority: "high" },
  { id: "CRG-502", type: "FMCG Packaging", weight: "11.8 Tons", destination: "Rotterdam", priority: "medium" },
  { id: "CRG-503", type: "Recycled HDPE", weight: "15.0 Tons", destination: "Brussels", priority: "high" },
  { id: "CRG-504", type: "Sustainable Packaging", weight: "13.5 Tons", destination: "Paris", priority: "low" },
  { id: "CRG-505", type: "Bio-Plastics", weight: "12.0 Tons", destination: "Vienna", priority: "medium" },
];

export function SmartMatchingView() {
  const [selectedTruck, setSelectedTruck] = useState<string | null>("TRK-092");
  const [selectedCargo, setSelectedCargo] = useState<string | null>("CRG-501");

  const matchScore = 94;
  const co2Savings = 2.4;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Live Capacity Matching Engine</h1>
          <p className="text-muted-foreground mt-1">AI-powered truck-to-cargo optimization</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">Matching Active</span>
        </div>
      </motion.div>

      {/* Main Content - Split Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Panel - Available Trucks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Truck className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Available Empty Trucks</h2>
          </div>
          <div className="space-y-3">
            {emptyTrucks.map((truck) => (
              <motion.button
                key={truck.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => truck.available && setSelectedTruck(truck.id)}
                disabled={!truck.available}
                className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                  selectedTruck === truck.id
                    ? "bg-primary/15 border-primary/50 glow-border"
                    : truck.available
                    ? "bg-secondary/30 border-border/50 hover:border-primary/30"
                    : "bg-secondary/10 border-border/30 opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-semibold text-foreground">{truck.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    truck.available ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-400"
                  }`}>
                    {truck.available ? "Ready" : "In Transit"}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{truck.capacity}</span>
                  <span>{truck.location}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Center Panel - AI Match Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6 flex flex-col items-center justify-center"
        >
          {/* Glowing Circle */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="w-48 h-48 rounded-full bg-primary/10 border-4 border-primary/30 flex items-center justify-center relative"
              style={{
                boxShadow: "0 0 60px rgba(16, 185, 129, 0.3), inset 0 0 30px rgba(16, 185, 129, 0.1)",
              }}
            >
              {/* Inner glow ring */}
              <div className="absolute inset-2 rounded-full border-2 border-primary/20" />
              <div className="text-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-5xl font-bold gradient-text"
                >
                  {matchScore}%
                </motion.span>
                <p className="text-sm text-muted-foreground mt-1">AI Match Score</p>
              </div>
            </motion.div>
            
            {/* Animated rings */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-primary/20"
            />
          </div>

          {/* CO2 Savings */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <div className="flex items-center gap-2 justify-center">
              <Leaf className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold text-foreground">Projected CO2 Savings</span>
            </div>
            <p className="text-3xl font-bold gradient-text mt-2">{co2Savings} Tons</p>
            <p className="text-sm text-muted-foreground mt-1">Per matched trip</p>
          </motion.div>

          {/* Execute Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center gap-2 transition-all duration-200"
            style={{
              boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)",
            }}
          >
            <Zap className="w-5 h-5" />
            Execute Match & Dispatch
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Right Panel - Pending Cargo */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Pending Cargo</h2>
          </div>
          <div className="space-y-3">
            {pendingCargo.map((cargo) => (
              <motion.button
                key={cargo.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCargo(cargo.id)}
                className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                  selectedCargo === cargo.id
                    ? "bg-primary/15 border-primary/50 glow-border"
                    : "bg-secondary/30 border-border/50 hover:border-primary/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-semibold text-foreground">{cargo.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    cargo.priority === "high" 
                      ? "bg-red-500/20 text-red-400"
                      : cargo.priority === "medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}>
                    {cargo.priority}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">{cargo.type}</p>
                <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{cargo.weight}</span>
                  <span>→ {cargo.destination}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

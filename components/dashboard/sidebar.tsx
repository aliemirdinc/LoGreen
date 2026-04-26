"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Shuffle,
  Truck,
  FileBarChart,
  Settings,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewType = "overview" | "smart-matching" | "tms-fleet" | "cbam-reports" | "settings";

const navItems: { icon: typeof LayoutDashboard; label: string; view: ViewType }[] = [
  { icon: LayoutDashboard, label: "Overview", view: "overview" },
  { icon: Shuffle, label: "Smart Matching", view: "smart-matching" },
  { icon: Truck, label: "TMS/Fleet Routing", view: "tms-fleet" },
  { icon: FileBarChart, label: "CBAM Carbon Reports", view: "cbam-reports" },
  { icon: Settings, label: "Settings", view: "settings" },
];

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-sidebar fixed left-0 top-0 h-screen w-64 flex flex-col z-50"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-border">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-bold gradient-text">Logreen</span>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index + 0.3 }}
            whileHover={{ x: 4 }}
            onClick={() => onViewChange(item.view)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
              activeView === item.view
                ? "bg-primary/15 text-primary glow-border"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </motion.button>
        ))}
      </nav>

      {/* Bottom Stats */}
      <div className="p-4 border-t border-border/50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="glass-card rounded-lg p-4"
        >
          <p className="text-xs text-muted-foreground mb-2">Carbon Offset This Month</p>
          <p className="text-2xl font-bold gradient-text">847 Tons</p>
          <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "78%" }}
              transition={{ delay: 1, duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">78% of monthly target</p>
        </motion.div>
      </div>
    </motion.aside>
  );
}

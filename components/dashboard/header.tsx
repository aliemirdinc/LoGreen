"use client";

import { motion } from "framer-motion";
import { Bell, Search, User } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-16 glass-card border-b border-border/50 flex items-center justify-between px-6"
    >
      {/* Left - Page Title */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Operations Dashboard</h1>
        <p className="text-xs text-muted-foreground">Real-time logistics intelligence</p>
      </div>

      {/* Center - System Status */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
      >
        <div className="relative">
          <div className="w-2.5 h-2.5 rounded-full bg-primary status-dot" />
          <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary animate-ping opacity-50" />
        </div>
        <span className="text-sm font-medium text-primary">AI Matching Engine: ACTIVE</span>
      </motion.div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <Search className="w-5 h-5 text-muted-foreground" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </motion.button>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 pl-4 border-l border-border/50"
        >
          <div className="text-right">
            <p className="text-sm font-medium">Ligep Aşığı</p>
            <p className="text-xs text-muted-foreground">Operations Lead</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-emerald-600 flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}

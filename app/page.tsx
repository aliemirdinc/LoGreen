"use client";

import { useState } from "react";
import { Sidebar, ViewType } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ImpactChart } from "@/components/dashboard/impact-chart";
import { MatchingTable } from "@/components/dashboard/matching-table";
import { SmartMatchingView } from "@/components/dashboard/views/smart-matching";
import { TMSFleetRoutingView } from "@/components/dashboard/views/tms-fleet-routing";
import { CBAMReportsView } from "@/components/dashboard/views/cbam-reports";
import { SettingsView } from "@/components/dashboard/views/settings";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [activeView, setActiveView] = useState<ViewType>("overview");

  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <StatsCards />
            <ImpactChart />
            <MatchingTable />
          </motion.div>
        );
      case "smart-matching":
        return (
          <motion.div
            key="smart-matching"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SmartMatchingView />
          </motion.div>
        );
      case "tms-fleet":
        return (
          <motion.div
            key="tms-fleet"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TMSFleetRoutingView />
          </motion.div>
        );
      case "cbam-reports":
        return (
          <motion.div
            key="cbam-reports"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CBAMReportsView />
          </motion.div>
        );
      case "settings":
        return (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SettingsView />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/2 rounded-full blur-3xl" />
      </div>

      {/* Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content */}
      <div className="ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 p-4 flex items-center justify-between text-sm text-muted-foreground">
          <p>© 2026 Logreen Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>v2.4.1</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              All Systems Operational
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

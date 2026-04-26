"use client";

import { motion } from "framer-motion";
import { FileText, Download, Send, Leaf, Euro, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const taxSavingsData = [
  { month: "Jan", savings: 12500 },
  { month: "Feb", savings: 14200 },
  { month: "Mar", savings: 13800 },
  { month: "Apr", savings: 16500 },
  { month: "May", savings: 18200 },
  { month: "Jun", savings: 21000 },
];

const reports = [
  { id: 1, title: "Q1-2026 Emissions Report", date: "Mar 31, 2026", status: "Certified", size: "2.4 MB" },
  { id: 2, title: "Q4-2025 Carbon Audit", date: "Dec 31, 2025", status: "Certified", size: "3.1 MB" },
  { id: 3, title: "Annual CBAM Declaration", date: "Jan 15, 2026", status: "Pending Review", size: "4.8 MB" },
  { id: 4, title: "Q3-2025 Emissions Report", date: "Sep 30, 2025", status: "Certified", size: "2.2 MB" },
  { id: 5, title: "Fleet Carbon Footprint Analysis", date: "Feb 28, 2026", status: "Certified", size: "1.9 MB" },
  { id: 6, title: "Supplier Emissions Verification", date: "Mar 15, 2026", status: "Draft", size: "1.1 MB" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-primary/30 rounded-lg px-4 py-3 shadow-xl">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-lg font-bold text-primary">€{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export function CBAMReportsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">CBAM Certification & Tax Advantage</h1>
          <p className="text-muted-foreground mt-1">Carbon Border Adjustment Mechanism compliance reporting</p>
        </div>
      </motion.div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total CO2 Offset</p>
              <p className="text-3xl font-bold gradient-text">1,250 Tons</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">+18.5%</span>
            <span className="text-muted-foreground">vs last quarter</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Euro className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Tax Savings</p>
              <p className="text-3xl font-bold gradient-text">€85,000</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">+24.2%</span>
            <span className="text-muted-foreground">YTD growth</span>
          </div>
        </motion.div>
      </div>

      {/* Reports Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-6"
      >
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Compliance Reports
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-secondary/30 border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  report.status === "Certified"
                    ? "bg-primary/20 text-primary"
                    : report.status === "Pending Review"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-zinc-500/20 text-zinc-400"
                }`}>
                  {report.status}
                </span>
              </div>
              <h3 className="font-medium text-foreground text-sm mb-1">{report.title}</h3>
              <p className="text-xs text-muted-foreground mb-4">{report.date} • {report.size}</p>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-secondary/50 border border-border/50 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary/20 border border-primary/30 text-xs font-medium text-primary hover:bg-primary/30 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send to EU
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tax Savings Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Monthly Carbon Tax Savings
          </h2>
          <div className="text-sm text-muted-foreground">
            Total YTD: <span className="text-primary font-semibold">€96,200</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={taxSavingsData} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgb(161, 161, 170)", fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgb(161, 161, 170)", fontSize: 12 }}
                tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(16, 185, 129, 0.1)" }} />
              <Bar 
                dataKey="savings" 
                fill="rgb(16, 185, 129)"
                radius={[6, 6, 0, 0]}
                style={{ filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}

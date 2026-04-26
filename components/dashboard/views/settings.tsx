"use client";

import { motion } from "framer-motion";
import { Building2, Key, Bell, Shield, Copy, Eye, EyeOff, Check } from "lucide-react";
import { useState } from "react";

export function SettingsView() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notifications, setNotifications] = useState({
    newMatch: true,
    cbamThreshold: true,
    fleetAlerts: false,
    weeklyReport: true,
    systemUpdates: false,
  });

  const apiKey = "sk_live_logreen_4f8a2b1c9d3e7f0a6b5c4d3e2f1a0b9c";
  const maskedKey = "sk_live_logreen_••••••••••••••••••••••••";

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Platform Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account, integrations, and preferences</p>
      </motion.div>

      {/* Profile & Company Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-semibold text-foreground">Profile & Company Info</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Company Name</label>
            <input
              type="text"
              defaultValue="Logreen Technologies"
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Company ID</label>
            <input
              type="text"
              defaultValue="LGT-2024-EU-00847"
              disabled
              className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-border/30 text-muted-foreground cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Primary Contact</label>
            <input
              type="text"
              defaultValue="Dr. Sarah Mueller"
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <input
              type="email"
              defaultValue="s.mueller@logreen.tech"
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          <div className="space-y-2 col-span-2">
            <label className="text-sm font-medium text-muted-foreground">Registered Address</label>
            <input
              type="text"
              defaultValue="Friedrichstraße 123, 10117 Berlin, Germany"
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* API Keys */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Key className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">API Keys</h2>
            <p className="text-sm text-muted-foreground">Manage your integration credentials</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Live API Key</label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={showApiKey ? apiKey : maskedKey}
                  readOnly
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-secondary/30 border border-border/50 font-mono text-sm text-foreground"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopy}
                className="px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground hover:bg-secondary transition-colors flex items-center gap-2"
              >
                {copied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5" />}
                {copied ? "Copied!" : "Copy"}
              </motion.button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Keep your API key secure. Do not share it publicly or in client-side code.</span>
          </div>
        </div>
      </motion.div>

      {/* Notification Toggles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Notification Preferences</h2>
            <p className="text-sm text-muted-foreground">Configure your alert settings</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { key: "newMatch", label: "New Match Alerts", description: "Get notified when AI finds a new capacity match" },
            { key: "cbamThreshold", label: "CBAM Threshold Reached", description: "Alert when carbon offset reaches reporting threshold" },
            { key: "fleetAlerts", label: "Fleet Status Alerts", description: "Receive updates on truck availability and routing changes" },
            { key: "weeklyReport", label: "Weekly Summary Report", description: "Automated weekly performance and savings digest" },
            { key: "systemUpdates", label: "System Updates", description: "Platform maintenance and feature announcements" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
              <div>
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
                className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
                  notifications[item.key as keyof typeof notifications]
                    ? "bg-primary"
                    : "bg-secondary"
                }`}
                style={{
                  boxShadow: notifications[item.key as keyof typeof notifications] 
                    ? "0 0 12px rgba(16, 185, 129, 0.4)" 
                    : "none"
                }}
              >
                <motion.div
                  animate={{
                    x: notifications[item.key as keyof typeof notifications] ? 26 : 2,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-all"
          style={{ boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)" }}
        >
          Save Changes
        </motion.button>
      </motion.div>
    </div>
  );
}

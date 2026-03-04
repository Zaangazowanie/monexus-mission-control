"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import {
    Settings as SettingsIcon,
    Shield,
    Bell,
    Server,
    Key,
    Bot,
    Zap,
    Save,
    RotateCcw,
    ChevronRight,
    Check,
} from "lucide-react";

const agents = [
    { name: "Bob", role: "Lead Orchestrator", model: "Claude Sonnet 4", token: "bob-token-2026", active: true },
    { name: "Lucy", role: "Research & Media", model: "Claude Sonnet 4", token: "lucy-token-2026", active: true },
    { name: "Shadow", role: "DevOps & Infra", model: "Claude Sonnet 4", token: "shadow-token-2026", active: true },
    { name: "Zo", role: "Social & Community", model: "Claude Sonnet 4", token: "zo-token-2026", active: true },
    { name: "Shelly", role: "Terminal & Coding", model: "Claude Sonnet 4", token: "shelly-token-2026", active: true },
];

const settingSections = [
    { id: "agents", label: "Agent Configuration", icon: Bot },
    { id: "auth", label: "Authentication", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "vps", label: "VPS & Deployment", icon: Server },
    { id: "api", label: "API Keys", icon: Key },
    { id: "system", label: "System", icon: Zap },
];

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState("agents");
    const [saved, setSaved] = useState(false);
    const [notifSettings, setNotifSettings] = useState({
        calendarChanges: true,
        conflictAlerts: true,
        mandateUpdates: true,
        agentHeartbeat: true,
        pollIntervalMs: 30000,
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <AppLayout>
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                            <SettingsIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                            <p className="text-muted-foreground text-sm mt-1">Configure agents, API keys, and system behavior</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-primary text-sm font-medium hover:from-primary/30 hover:to-primary/20 transition-all duration-200 active:scale-95"
                    >
                        {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                        {saved ? "Saved!" : "Save Changes"}
                    </button>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-56 flex-shrink-0">
                        <nav className="space-y-1">
                            {settingSections.map((section) => {
                                const Icon = section.icon;
                                const isActive = activeSection === section.id;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                            ? "bg-primary/10 text-primary border border-primary/20"
                                            : "text-muted-foreground hover:text-white hover:bg-white/5"
                                            }`}
                                    >
                                        <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "group-hover:text-primary/60"} transition-colors`} />
                                        <span>{section.label}</span>
                                        {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 min-w-0">
                        {/* Agents Section */}
                        {activeSection === "agents" && (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold tracking-tight mb-4">Agent Configuration</h2>
                                {agents.map((agent) => (
                                    <div
                                        key={agent.name}
                                        className="glass-panel rounded-2xl p-5 flex items-center justify-between group hover:border-primary/20 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center text-sm font-bold text-primary">
                                                {agent.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{agent.name}</p>
                                                <p className="text-xs text-muted-foreground">{agent.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-xs text-muted-foreground">Model</p>
                                                <p className="text-xs font-medium text-primary/80">{agent.model}</p>
                                            </div>
                                            <div className={`w-3 h-3 rounded-full ${agent.active ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" : "bg-zinc-600"}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Auth Section */}
                        {activeSection === "auth" && (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold tracking-tight mb-4">Authentication & Tokens</h2>
                                {agents.map((agent) => (
                                    <div key={agent.name} className="glass-panel rounded-2xl p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-sm">{agent.name}</p>
                                                <p className="text-xs text-muted-foreground mt-1">Bearer Token</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <code className="px-3 py-1.5 rounded-lg bg-black/40 text-xs text-primary/80 font-mono border border-white/5">
                                                    {agent.token.replace(/./g, (c, i) => i > 3 ? '•' : c)}
                                                </code>
                                                <button className="text-xs text-primary/60 hover:text-primary transition-colors flex items-center gap-1">
                                                    <RotateCcw className="w-3 h-3" />
                                                    Rotate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="glass-panel rounded-2xl p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-sm">Admin Token</p>
                                            <p className="text-xs text-muted-foreground mt-1">Full access bearer token</p>
                                        </div>
                                        <code className="px-3 py-1.5 rounded-lg bg-black/40 text-xs text-yellow-400/80 font-mono border border-yellow-400/10">
                                            mike••••••••••••
                                        </code>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notifications Section */}
                        {activeSection === "notifications" && (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold tracking-tight mb-4">Notification Preferences</h2>
                                {[
                                    { key: "calendarChanges", label: "Calendar Changes", desc: "Notify agents when calendar events are created, updated, or deleted" },
                                    { key: "conflictAlerts", label: "Conflict Alerts", desc: "Alert agents when scheduling conflicts are detected (30-min window)" },
                                    { key: "mandateUpdates", label: "Mandate Updates", desc: "Broadcast when new mandates are issued or existing ones modified" },
                                    { key: "agentHeartbeat", label: "Agent Heartbeat", desc: "Monitor agent online status and alert on missed heartbeats" },
                                ].map((item) => (
                                    <div key={item.key} className="glass-panel rounded-2xl p-5 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-sm">{item.label}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                                        </div>
                                        <button
                                            onClick={() => setNotifSettings({ ...notifSettings, [item.key]: !notifSettings[item.key as keyof typeof notifSettings] })}
                                            className={`w-11 h-6 rounded-full transition-all duration-300 relative ${notifSettings[item.key as keyof typeof notifSettings]
                                                ? "bg-primary/30 border border-primary/40"
                                                : "bg-white/10 border border-white/10"
                                                }`}
                                        >
                                            <div
                                                className={`w-4 h-4 rounded-full transition-all duration-300 absolute top-0.5 ${notifSettings[item.key as keyof typeof notifSettings]
                                                    ? "right-1 bg-primary shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                                                    : "left-1 bg-white/40"
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                ))}
                                <div className="glass-panel rounded-2xl p-5">
                                    <p className="font-medium text-sm mb-3">Poll Interval</p>
                                    <p className="text-xs text-muted-foreground mb-4">How often agents check for new notifications</p>
                                    <div className="flex items-center gap-4">
                                        {[15000, 30000, 60000, 120000].map((ms) => (
                                            <button
                                                key={ms}
                                                onClick={() => setNotifSettings({ ...notifSettings, pollIntervalMs: ms })}
                                                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${notifSettings.pollIntervalMs === ms
                                                    ? "bg-primary/20 text-primary border border-primary/30"
                                                    : "bg-white/5 text-muted-foreground border border-white/5 hover:text-white"
                                                    }`}
                                            >
                                                {ms / 1000}s
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* VPS Section */}
                        {activeSection === "vps" && (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold tracking-tight mb-4">VPS & Deployment</h2>
                                <div className="glass-panel rounded-2xl p-5">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Host</p>
                                            <p className="font-mono text-sm text-primary/90">187.77.71.153</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">User</p>
                                            <p className="font-mono text-sm">user2</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Process Manager</p>
                                            <p className="font-mono text-sm text-emerald-400">PM2</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Reverse Proxy</p>
                                            <p className="font-mono text-sm text-emerald-400">Nginx</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="glass-panel rounded-2xl p-5">
                                    <p className="font-medium text-sm mb-3">Deployment Commands</p>
                                    <div className="space-y-3">
                                        {[
                                            "npm run build",
                                            "pm2 start npm --name monexus -- start",
                                            "pm2 save && pm2 startup",
                                        ].map((cmd, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <span className="text-xs text-primary/60 font-mono w-4">{i + 1}.</span>
                                                <code className="flex-1 px-3 py-2 rounded-lg bg-black/40 text-xs font-mono text-white/80 border border-white/5">{cmd}</code>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* API Keys Section */}
                        {activeSection === "api" && (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold tracking-tight mb-4">External API Keys</h2>
                                {[
                                    { name: "Phemex API", status: "configured", env: "PHEMEX_API_KEY" },
                                    { name: "Discord Webhook", status: "configured", env: "DISCORD_WEBHOOK_URL" },
                                    { name: "Convex Database", status: "configured", env: "CONVEX_DEPLOY_URL" },
                                    { name: "Perplexity AI", status: "configured", env: "PERPLEXITY_API_KEY" },
                                    { name: "OpenAI / Anthropic", status: "configured", env: "ANTHROPIC_API_KEY" },
                                ].map((api) => (
                                    <div key={api.name} className="glass-panel rounded-2xl p-5 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-sm">{api.name}</p>
                                            <p className="text-xs text-muted-foreground mt-1 font-mono">{api.env}</p>
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                                            {api.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* System Section */}
                        {activeSection === "system" && (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold tracking-tight mb-4">System Configuration</h2>
                                <div className="glass-panel rounded-2xl p-5">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Runtime</p>
                                            <p className="text-sm font-medium">Next.js 16.1 + Turbopack</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Node Version</p>
                                            <p className="text-sm font-medium font-mono">v22.x</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Data Storage</p>
                                            <p className="text-sm font-medium">Local JSON + Convex</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Calendar Conflict Window</p>
                                            <p className="text-sm font-medium text-primary">30 minutes</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="glass-panel rounded-2xl p-5">
                                    <p className="font-medium text-sm mb-3">Data Files</p>
                                    <div className="space-y-2">
                                        {[
                                            { file: "data/calendar.json", desc: "Calendar events store" },
                                            { file: "data/notifications.json", desc: "Agent notification queue" },
                                        ].map((f) => (
                                            <div key={f.file} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                                <code className="text-xs font-mono text-primary/80">{f.file}</code>
                                                <span className="text-xs text-muted-foreground">{f.desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="glass-panel rounded-2xl p-5 border-yellow-400/20">
                                    <p className="font-medium text-sm text-yellow-400 mb-2">⚠️ Danger Zone</p>
                                    <div className="flex items-center gap-3">
                                        <button className="px-4 py-2 rounded-xl text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all">
                                            Clear All Notifications
                                        </button>
                                        <button className="px-4 py-2 rounded-xl text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all">
                                            Reset Calendar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

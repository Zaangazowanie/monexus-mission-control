"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import {
    Bell,
    CalendarPlus,
    Pencil,
    Trash2,
    AlertTriangle,
    Megaphone,
    CheckCircle2,
    Clock,
    Filter,
    BellOff,
} from "lucide-react";

type NotificationType = 'CALENDAR_CREATED' | 'CALENDAR_UPDATED' | 'CALENDAR_DELETED' | 'MANDATE_ISSUED' | 'CONFLICT_DETECTED';

const mockNotifications = [
    {
        id: "n1",
        type: "CALENDAR_CREATED" as NotificationType,
        title: "📅 New Event: Weekly Architecture Review",
        message: 'New SCHEDULED task assigned to Bob: "Weekly Architecture Review"',
        targetAgent: "ALL",
        timestamp: Date.now() - 300000,
        acknowledged: false,
    },
    {
        id: "n2",
        type: "CONFLICT_DETECTED" as NotificationType,
        title: "⚠️ Schedule Conflict",
        message: '"Market Analysis Sprint" conflicts with "Trading Signal Review" for agent Lucy at 2026-03-05T14:00:00',
        targetAgent: "Lucy",
        timestamp: Date.now() - 600000,
        acknowledged: false,
    },
    {
        id: "n3",
        type: "CALENDAR_UPDATED" as NotificationType,
        title: "✏️ Updated: Deploy Mission Control v2",
        message: 'Event "Deploy Mission Control v2" was modified. Agent: Shadow. Check your schedule.',
        targetAgent: "ALL",
        timestamp: Date.now() - 900000,
        acknowledged: false,
    },
    {
        id: "n4",
        type: "MANDATE_ISSUED" as NotificationType,
        title: "📢 New Mandate: Content Pipeline Overhaul",
        message: "All agents must prioritize content pipeline improvements. Review calendar for assigned tasks.",
        targetAgent: "ALL",
        timestamp: Date.now() - 1800000,
        acknowledged: true,
        acknowledgedBy: "Bob",
    },
    {
        id: "n5",
        type: "CALENDAR_DELETED" as NotificationType,
        title: "🗑️ Removed: Legacy API Cleanup",
        message: 'Event "Legacy API Cleanup" assigned to Shelly has been cancelled/removed.',
        targetAgent: "ALL",
        timestamp: Date.now() - 3600000,
        acknowledged: true,
        acknowledgedBy: "Shelly",
    },
    {
        id: "n6",
        type: "CALENDAR_CREATED" as NotificationType,
        title: "📅 New Event: Weekly Trading Report",
        message: 'New CRON task assigned to Zo: "Weekly Trading Report"',
        targetAgent: "Zo",
        timestamp: Date.now() - 7200000,
        acknowledged: true,
        acknowledgedBy: "Zo",
    },
];

const iconForType: Record<NotificationType, typeof Bell> = {
    CALENDAR_CREATED: CalendarPlus,
    CALENDAR_UPDATED: Pencil,
    CALENDAR_DELETED: Trash2,
    MANDATE_ISSUED: Megaphone,
    CONFLICT_DETECTED: AlertTriangle,
};

const colorForType: Record<NotificationType, string> = {
    CALENDAR_CREATED: "text-emerald-400",
    CALENDAR_UPDATED: "text-primary",
    CALENDAR_DELETED: "text-red-400",
    MANDATE_ISSUED: "text-yellow-400",
    CONFLICT_DETECTED: "text-orange-400",
};

const bgForType: Record<NotificationType, string> = {
    CALENDAR_CREATED: "bg-emerald-400/10 border-emerald-400/20",
    CALENDAR_UPDATED: "bg-primary/10 border-primary/20",
    CALENDAR_DELETED: "bg-red-400/10 border-red-400/20",
    MANDATE_ISSUED: "bg-yellow-400/10 border-yellow-400/20",
    CONFLICT_DETECTED: "bg-orange-400/10 border-orange-400/20",
};

function timeAgo(ts: number) {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationsPage() {
    const [filter, setFilter] = useState<"all" | "unread" | NotificationType>("all");

    const filtered = mockNotifications.filter((n) => {
        if (filter === "all") return true;
        if (filter === "unread") return !n.acknowledged;
        return n.type === filter;
    });

    const unreadCount = mockNotifications.filter((n) => !n.acknowledged).length;

    return (
        <AppLayout>
            <div className="p-8 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30 relative">
                            <Bell className="w-6 h-6 text-primary" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-[10px] font-bold flex items-center justify-center text-white shadow-[0_0_10px_rgba(239,68,68,0.6)]">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                            <p className="text-muted-foreground text-sm mt-1">
                                Real-time alerts for calendar changes, mandates & conflicts
                            </p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-muted-foreground text-xs font-medium hover:text-white hover:bg-white/10 transition-all">
                        <BellOff className="w-3.5 h-3.5" />
                        Mark All Read
                    </button>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                    <Filter className="w-4 h-4 text-muted-foreground mr-1 flex-shrink-0" />
                    {[
                        { key: "all", label: "All" },
                        { key: "unread", label: `Unread (${unreadCount})` },
                        { key: "CALENDAR_CREATED", label: "Created" },
                        { key: "CALENDAR_UPDATED", label: "Updated" },
                        { key: "CALENDAR_DELETED", label: "Deleted" },
                        { key: "MANDATE_ISSUED", label: "Mandates" },
                        { key: "CONFLICT_DETECTED", label: "Conflicts" },
                    ].map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key as typeof filter)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${filter === f.key
                                ? "bg-primary/20 text-primary border border-primary/30"
                                : "text-muted-foreground hover:text-white bg-white/5 border border-white/5"
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Notification List */}
                <div className="space-y-3">
                    {filtered.map((notification) => {
                        const Icon = iconForType[notification.type];
                        const color = colorForType[notification.type];
                        const bg = bgForType[notification.type];

                        return (
                            <div
                                key={notification.id}
                                className={`glass-panel rounded-2xl p-5 transition-all duration-300 hover:border-primary/20 ${!notification.acknowledged ? "border-l-2 border-l-primary" : "opacity-70"
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${bg}`}>
                                        <Icon className={`w-5 h-5 ${color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-4">
                                            <h3 className="font-medium text-sm">{notification.title}</h3>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1 flex-shrink-0">
                                                <Clock className="w-3 h-3" />
                                                {timeAgo(notification.timestamp)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{notification.message}</p>
                                        <div className="flex items-center gap-3 mt-3">
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border border-white/10 text-muted-foreground">
                                                {notification.targetAgent === "ALL" ? "📡 All Agents" : `👤 ${notification.targetAgent}`}
                                            </span>
                                            {notification.acknowledged ? (
                                                <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Ack by {(notification as { acknowledgedBy?: string }).acknowledgedBy}
                                                </span>
                                            ) : (
                                                <button className="text-[10px] text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Acknowledge
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground text-sm">No notifications match this filter</p>
                    </div>
                )}

                {/* API Info */}
                <div className="mt-10 glass-panel rounded-2xl p-6">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Agent Integration
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">Agents poll for pending notifications on every heartbeat cycle:</p>
                    <code className="block px-4 py-3 rounded-xl bg-black/40 text-xs font-mono text-primary/80 border border-white/5">
                        GET /api/notifications?agent=Bob&pending=true
                    </code>
                    <p className="text-xs text-muted-foreground mt-3">Acknowledge after processing:</p>
                    <code className="block px-4 py-3 rounded-xl bg-black/40 text-xs font-mono text-primary/80 border border-white/5 mt-2">
                        {`PATCH /api/notifications/{id} { "agentName": "Bob" }`}
                    </code>
                </div>
            </div>
        </AppLayout>
    );
}

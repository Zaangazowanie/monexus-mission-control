"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Plus, Zap } from "lucide-react";

export default function CalendarPage() {
    const [currentWeek] = useState("Mar 3 - Mar 9, 2026");

    // Simulated calendar entries for the loop agents
    const events = [
        { id: 1, day: "Mon", time: "08:00", title: "Market Data Scrape", agent: "Zo", type: "CRON" },
        { id: 2, day: "Mon", time: "11:00", title: "Tim Bullard Opinion Gen", agent: "Bob", type: "SCHEDULED" },
        { id: 3, day: "Tue", time: "09:00", title: "Pricemate Price Audit", agent: "Shadow", type: "CRON" },
        { id: 4, day: "Tue", time: "14:00", title: "Code Review Backlog", agent: "Lucy", type: "AUTONOMOUS" },
        { id: 5, day: "Wed", time: "10:00", title: "WorldMonitor Integration", agent: "Shelly", type: "AUTONOMOUS" },
    ];

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const hours = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

    return (
        <AppLayout>
            <div className="flex flex-col gap-8 pb-10">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Autonomous Calendar</h1>
                        <p className="text-muted-foreground text-lg">
                            Agents <span className="text-primary font-medium">read</span> this to know what to do. You <span className="text-secondary font-medium">write</span> to assign mandates.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-primary text-black font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                        <Plus className="w-5 h-5" /> New Mandate
                    </button>
                </header>

                <Card className="glass-panel overflow-hidden border-t-primary/20">
                    <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/20">
                        <div className="flex items-center gap-4">
                            <CalendarIcon className="w-6 h-6 text-primary" />
                            <h2 className="text-xl font-semibold tracking-wide">{currentWeek}</h2>
                        </div>
                        <div className="flex gap-4 text-sm">
                            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-accent"></span> CRON Jobs</span>
                            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-primary"></span> Scheduled</span>
                            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-secondary"></span> Autonomous</span>
                        </div>
                    </div>

                    <CardContent className="p-0">
                        <div className="grid grid-cols-8 divide-x divide-white/5 border-b border-white/5">
                            <div className="p-4 text-center bg-white/5">
                                <Clock className="w-5 h-5 mx-auto text-muted-foreground" />
                            </div>
                            {days.map(day => (
                                <div key={day} className="p-4 text-center font-medium bg-white/5">
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="divide-y divide-white/5">
                            {hours.map(hour => (
                                <div key={hour} className="grid grid-cols-8 divide-x divide-white/5 min-h-[120px]">
                                    <div className="p-4 text-center text-sm text-muted-foreground bg-black/20">
                                        {hour}
                                    </div>
                                    {days.map(day => {
                                        const event = events.find(e => e.day === day && e.time === hour);
                                        return (
                                            <div key={`${day}-${hour}`} className="relative p-2 hover:bg-white/5 transition-colors cursor-pointer group">
                                                {event && (
                                                    <div className={`absolute inset-2 p-3 rounded-lg border flex flex-col justify-between overflow-hidden shadow-lg transition-all group-hover:scale-[1.02] ${event.type === 'CRON' ? 'bg-accent/20 border-accent/30 hover:border-accent' :
                                                            event.type === 'SCHEDULED' ? 'bg-primary/20 border-primary/30 hover:border-primary' :
                                                                'bg-secondary/20 border-secondary/30 hover:border-secondary'
                                                        }`}>
                                                        <div className="absolute top-0 right-0 p-2 opacity-20">
                                                            <Zap className="w-8 h-8" />
                                                        </div>
                                                        <h4 className="font-semibold text-sm leading-tight relative z-10">{event.title}</h4>
                                                        <div className="flex justify-between items-end relative z-10 mt-2">
                                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded text-white/80">
                                                                @{event.agent}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

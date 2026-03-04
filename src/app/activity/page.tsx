import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Terminal, Eye, Clock, AlertTriangle } from "lucide-react";

export default function ActivityPage() {
    const logs = [
        { id: 1, agent: "Shadow", level: "INFO", message: "Successfully deployed news-feeder to 187.77.71.153 via PM2.", time: "10:42 AM", icon: Terminal, color: "text-secondary" },
        { id: 2, agent: "Lucy", level: "WARN", message: "Convex schema validation failed on line 42 of missions.ts.", time: "10:15 AM", icon: AlertTriangle, color: "text-yellow-400" },
        { id: 3, agent: "Bob", level: "INFO", message: "Generated OpinionModule.vue mockups using Kimi K2.5.", time: "09:30 AM", icon: Eye, color: "text-primary" },
        { id: 4, agent: "Zo", level: "INFO", message: "Phemex execution confirmed. Long BTC @ $94,200.", time: "08:12 AM", icon: Activity, color: "text-green-400" },
        { id: 5, agent: "System", level: "CRON", message: "Daily heartbeat sync completed. 4 Agents online.", time: "08:00 AM", icon: Clock, color: "text-muted-foreground" },
    ];

    return (
        <AppLayout>
            <div className="flex flex-col gap-6 pb-10 h-[calc(100vh-4rem)]">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Live Activity Stream</h1>
                        <p className="text-muted-foreground text-lg">Real-time coordination logs and system heartbeats.</p>
                    </div>
                    <div className="flex gap-3">
                        <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-semibold">Live Mode Active</span>
                    </div>
                </header>

                <Card className="flex-1 overflow-hidden glass-panel border-white/5 flex flex-col">
                    <CardContent className="flex-1 p-0 flex flex-col">
                        <div className="p-4 border-b border-white/5 bg-black/40 flex justify-between items-center">
                            <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Terminal Feed</span>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto space-y-4 font-mono text-sm">
                            {logs.map((log) => {
                                const Icon = log.icon;
                                return (
                                    <div key={log.id} className="flex gap-4 items-start p-3 hover:bg-white/5 rounded transition-all border border-transparent hover:border-white/5">
                                        <span className="text-muted-foreground mt-0.5 w-20 flex-shrink-0">{log.time}</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase w-16 text-center ${log.level === 'INFO' ? 'bg-blue-500/10 text-blue-400' :
                                                log.level === 'WARN' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    'bg-white/10 text-white/70'
                                            }`}>
                                            {log.level}
                                        </span>
                                        <span className={`w-20 font-bold ${log.color}`}>
                                            [{log.agent}]
                                        </span>
                                        <div className="flex-1 flex gap-2 text-white/80">
                                            <Icon className={`w-4 h-4 mt-0.5 ${log.color} opacity-70`} />
                                            <span>{log.message}</span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="flex gap-4 items-center p-3 opacity-50">
                                <span className="text-muted-foreground mt-0.5 w-20 flex-shrink-0">Now</span>
                                <span className="w-16"></span>
                                <span className="w-20 font-bold text-primary animate-pulse">
                                    [Waiting]
                                </span>
                                <span className="flex-1 text-white/50 animate-pulse">...</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

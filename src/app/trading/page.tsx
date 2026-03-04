import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, DollarSign, TrendingUp, AlertOctagon, Activity } from "lucide-react";

export default function TradingPage() {
    const activePositions = [
        { pair: "BTC/USDT", type: "LONG", entry: 94200, current: 95100, pnl: "+$45.20", roi: "+4.5%", source: "100x Club", status: "Active" },
        { pair: "ETH/USDT", type: "SHORT", entry: 3400, current: 3350, pnl: "+$25.10", roi: "+2.8%", source: "Kyle TA", status: "Active" },
    ];

    const signals = [
        { time: "10m ago", source: "100x Club", asset: "SOL/USDT", action: "LONG", confidence: "85%", status: "Analyzing" },
        { time: "1h ago", source: "WorldMonitor", asset: "Oil Futures", action: "WATCH", confidence: "60%", status: "Geopolitics Alert" },
    ];

    return (
        <AppLayout>
            <div className="flex flex-col gap-6 pb-10">
                <header className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
                            <LineChart className="w-8 h-8 text-primary" /> Autonomous Monetization
                        </h1>
                        <p className="text-muted-foreground text-lg">Phemex Execution Pipeline & Signal Aggregation.</p>
                    </div>
                    <div className="flex gap-4">
                        <Card className="bg-gradient-to-r from-card to-green-900/10 border-green-500/20 py-2 px-4">
                            <span className="text-xs uppercase font-bold text-green-400 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                Lucy: Primary Trader
                            </span>
                        </Card>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-black/40 border-white/5">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-primary" /> Phemex Balance
                            </CardTitle>
                            <div className="text-4xl font-bold tracking-tight">$1,420.50</div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-green-400 font-medium">+14.2% This Month</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-white/5">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-secondary" /> Win Rate (Last 30d)
                            </CardTitle>
                            <div className="text-4xl font-bold tracking-tight">64.5%</div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Based on 42 executed trades</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-white/5">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2">
                                <AlertOctagon className="w-4 h-4 text-accent" /> Active Risk
                            </CardTitle>
                            <div className="text-4xl font-bold tracking-tight">0.8%</div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                Max concurrent: 2 positions
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="col-span-2 space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Activity className="w-5 h-5 text-primary" /> Active Positions
                        </h3>
                        <Card className="glass-panel overflow-hidden border-white/5">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-black/40 text-muted-foreground uppercase text-xs">
                                        <tr>
                                            <th className="px-6 py-3">Pair/Asset</th>
                                            <th className="px-6 py-3">Type</th>
                                            <th className="px-6 py-3">Entry/Current</th>
                                            <th className="px-6 py-3">PnL</th>
                                            <th className="px-6 py-3">Source</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activePositions.map((pos, i) => (
                                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 font-bold">{pos.pair}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-sm text-[10px] uppercase font-bold tracking-wider ${pos.type === 'LONG' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-500'}`}>
                                                        {pos.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-muted-foreground">
                                                    ${pos.entry} <span className="mx-1">→</span> <span className="text-white">${pos.current}</span>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-green-400">{pos.pnl} <span className="text-xs opacity-70">({pos.roi})</span></td>
                                                <td className="px-6 py-4 text-xs text-muted-foreground uppercase">{pos.source}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Activity className="w-5 h-5 text-secondary" /> Signal Interception
                        </h3>
                        <Card className="glass-panel overflow-hidden border-white/5 flex flex-col h-[300px]">
                            <div className="p-4 border-b border-white/5 bg-black/40">
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Incoming Matrix</h4>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {signals.map((sig, i) => (
                                    <div key={i} className="border border-white/5 p-3 rounded-xl bg-card/40 hover:bg-card transition-colors group">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold text-secondary uppercase bg-secondary/10 px-2 py-0.5 rounded">{sig.source}</span>
                                            <span className="text-xs text-muted-foreground">{sig.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold">{sig.asset}</span>
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${sig.action === 'LONG' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-500'}`}>{sig.action}</span>
                                        </div>
                                        <div className="flex justify-between items-end mt-3">
                                            <span className="text-xs text-muted-foreground">Conf: {sig.confidence}</span>
                                            <span className="text-xs text-primary font-medium group-hover:underline cursor-pointer">{sig.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

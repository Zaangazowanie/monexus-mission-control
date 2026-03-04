import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BrainCircuit, Cpu, Database, Link2 } from "lucide-react";

export default function Home() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8 pb-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Monexus Overview</h1>
            <p className="text-muted-foreground text-lg">System vitals and agent coordination hub.</p>
          </div>
          <div className="flex items-center gap-4 bg-card/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-sm font-medium tracking-wide">All Systems Nominal</span>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-card to-card/50 overflow-hidden relative">
            <div className="absolute right-0 top-0 p-6 opacity-20">
              <BrainCircuit className="w-16 h-16 text-primary" />
            </div>
            <CardHeader className="pb-2">
              <CardDescription>Active Agents</CardDescription>
              <CardTitle className="text-4xl">4 / 5</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-primary/80 mt-2">Bob, Lucy, Shadow, Zo running.</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 overflow-hidden relative">
            <div className="absolute right-0 top-0 p-6 opacity-20">
              <Activity className="w-16 h-16 text-secondary" />
            </div>
            <CardHeader className="pb-2">
              <CardDescription>Tasks Today</CardDescription>
              <CardTitle className="text-4xl">24</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-secondary/80 mt-2">+12% faster than yesterday.</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 overflow-hidden relative">
            <div className="absolute right-0 top-0 p-6 opacity-20">
              <Cpu className="w-16 h-16 text-accent" />
            </div>
            <CardHeader className="pb-2">
              <CardDescription>VPS CPU (187.77...)</CardDescription>
              <CardTitle className="text-4xl">14%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-accent/80 mt-2">Nominal load.</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 overflow-hidden relative">
            <div className="absolute right-0 top-0 p-6 opacity-20">
              <Database className="w-16 h-16 text-primary" />
            </div>
            <CardHeader className="pb-2">
              <CardDescription>Convex Sync</CardDescription>
              <CardTitle className="text-4xl text-green-400">Stable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-green-400/80 mt-2 flex items-center gap-1">
                <Link2 className="w-3 h-3" /> Connected via Loop.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Feed */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Live Intelligence Feed
            </h2>
            <Card className="h-[400px] flex flex-col">
              <CardContent className="flex-1 p-6 overflow-y-auto space-y-4">
                {[
                  { agent: "Bob", action: "Updated News UI Components", time: "Just now", color: "text-primary" },
                  { agent: "Shadow", action: "Deployed TVPWorld to VPS Server", time: "5m ago", color: "text-secondary" },
                  { agent: "Lucy", action: "Completed QA review. 0 Critical bugs.", time: "14m ago", color: "text-accent" },
                  { agent: "Zo", action: "Processed 12 new trading signals from 100x Club", time: "32m ago", color: "text-green-400" },
                  { agent: "Shadow", action: "System heartbeat check. CPU: 14%, Mem: 2GB", time: "1h ago", color: "text-muted-foreground" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 items-start p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                    <div className={`mt-1 h-2 w-2 rounded-full ${i === 0 ? 'bg-primary animate-pulse-glow shadow-[0_0_10px_rgba(0,240,255,0.8)]' : 'bg-muted-foreground'}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        <span className={log.color}>{log.agent}</span> • {log.action}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Active Projects Widget */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Database className="w-5 h-5 text-secondary" /> Active Systems
            </h2>
            <Card className="h-[400px] flex flex-col">
              <CardContent className="flex-1 p-6 space-y-6">

                <div className="space-y-2 group">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Real-time News Feeder</span>
                    <span className="text-green-400 font-mono text-xs">100% OPERATIONAL</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 w-full group-hover:shadow-[0_0_8px_rgba(74,222,128,0.8)] transition-all" />
                  </div>
                  <p className="text-xs text-muted-foreground">URL: http://187.77.71.153:3001</p>
                </div>

                <div className="space-y-2 group">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">TVPWorld-Style News</span>
                    <span className="text-primary font-mono text-xs">30% IN PROGRESS</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[30%] group-hover:shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all" />
                  </div>
                  <p className="text-xs text-muted-foreground">Waiting on Backend (Shadow)</p>
                </div>

                <div className="space-y-2 group">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Trading Bot Pipeline</span>
                    <span className="text-secondary font-mono text-xs">PLANNING STAGE</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[10%] group-hover:shadow-[0_0_8px_rgba(255,0,128,0.8)] transition-all animate-pulse" />
                  </div>
                  <p className="text-xs text-muted-foreground">Gathering Phemex API Keys</p>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Cpu, Palette, Code, CheckCircle2, Workflow, Globe, Sparkles } from "lucide-react";

export default function TeamPage() {
    const agents = [
        {
            name: "Bob",
            role: "Lead UI / UX & Creative",
            status: "Online",
            icon: Palette,
            color: "text-primary",
            bg: "from-primary/20",
            skills: ["Design Systems", "Copywriting", "Creative Ideation", "React/Framer"],
            channel: "#project-beta"
        },
        {
            name: "Lucy",
            role: "QA / Architecture & Code Review",
            status: "Online",
            icon: CheckCircle2,
            color: "text-accent",
            bg: "from-accent/20",
            skills: ["Systematic Debugging", "Architecture Design", "Security Audits", "TDD Validator"],
            channel: "#code-review"
        },
        {
            name: "Shadow",
            role: "Lead Backend & Infrastructure",
            status: "Online",
            icon: Cpu,
            color: "text-secondary",
            bg: "from-secondary/20",
            skills: ["VPS Automation", "Convex Models", "Pipeline Construction", "Server Operations"],
            channel: "#trading-ops"
        },
        {
            name: "Zo",
            role: "Trading & Data Intelligence",
            status: "Standby",
            icon: Workflow,
            color: "text-green-400",
            bg: "from-green-400/20",
            skills: ["100x Club Sync", "Signal Ingestion", "Kyle Doops TA", "Data Aggregation"],
            channel: "#trading-ops"
        },
        {
            name: "Shelly",
            role: "Media & WorldMonitor Integrator",
            status: "Sleep",
            icon: Globe,
            color: "text-muted-foreground",
            bg: "from-muted-foreground/20",
            skills: ["WorldMonitor Feeds", "Article Parsing", "Content Summarization"],
            channel: "#news-feed"
        }
    ];

    return (
        <AppLayout>
            <div className="flex flex-col gap-8 pb-10">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Agent Team</h1>
                        <p className="text-muted-foreground text-lg">Zero Human Company structural mapping.</p>
                    </div>
                    <Card className="max-w-md bg-gradient-to-r from-card to-primary/5 p-4 py-3">
                        <h4 className="text-sm font-semibold text-primary mb-1 uppercase tracking-widest flex items-center gap-2">
                            <Sparkles className="w-4 h-4" /> Mission Statement
                        </h4>
                        <p className="text-sm italic text-muted-foreground">
                            "Build an autonomous organization of AI agents that do work for Monexus Media and produce value 24/7 without manual intervention."
                        </p>
                    </Card>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent) => {
                        const Icon = agent.icon;
                        return (
                            <Card key={agent.name} className={`relative overflow-hidden group border-white/5 hover:border-${agent.color.split('-')[1]}/50`}>
                                <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${agent.bg} to-transparent rounded-full blur-[50px] mix-blend-screen transition-opacity group-hover:opacity-100 opacity-30`} />
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-3 rounded-xl bg-black/40 border border-white/5`}>
                                                <Icon className={`w-6 h-6 ${agent.color}`} />
                                            </div>
                                            <div>
                                                <CardTitle className="text-2xl">{agent.name}</CardTitle>
                                                <CardDescription className="text-xs uppercase tracking-wider mt-1 font-medium text-white/70">
                                                    {agent.role}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`h-2.5 w-2.5 rounded-full ${agent.status === 'Online' ? 'bg-primary animate-pulse-glow' : agent.status === 'Standby' ? 'bg-green-400' : 'bg-muted-foreground'}`} />
                                            <span className="text-xs font-semibold text-muted-foreground uppercase">{agent.status}</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="pt-2">
                                        <h5 className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                                            <Code className="w-3 h-3" /> Assigned Skills
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                            {agent.skills.map((skill) => (
                                                <span key={skill} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-white/80 transition-colors hover:bg-white/10 hover:text-white cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}

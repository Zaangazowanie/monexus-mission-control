import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CircleDashed, Clock, AlertCircle } from "lucide-react";

export default function TasksPage() {
    const columns = [
        {
            title: "Backlog",
            icon: CircleDashed,
            color: "text-muted-foreground",
            tasks: [
                { id: "T1", title: "Integrate Reddit Ingestion API", agent: "Shadow", priority: "High" },
                { id: "T2", title: "Build Premium UI shell for Crypto tracker", agent: "Bob", priority: "Medium" },
            ]
        },
        {
            title: "In Progress",
            icon: Clock,
            color: "text-primary",
            tasks: [
                { id: "T3", title: "Parse WorldMonitor Geopolitics feed", agent: "Shelly", priority: "High" },
                { id: "T4", title: "Analyze 100x Club signals (BTC/ETH)", agent: "Zo", priority: "Critical" },
            ]
        },
        {
            title: "Code Review",
            icon: AlertCircle,
            color: "text-accent",
            tasks: [
                { id: "T5", title: "Audit Convex DB policies for loop architecture", agent: "Lucy", priority: "High" },
            ]
        },
        {
            title: "Done",
            icon: CheckCircle2,
            color: "text-green-400",
            tasks: [
                { id: "T6", title: "Deploy News Feeder to VPS 187.77.71.153", agent: "Shadow", priority: "High" },
                { id: "T7", title: "Implement glassmorphism tokens", agent: "Bob", priority: "Low" },
            ]
        }
    ];

    return (
        <AppLayout>
            <div className="flex flex-col gap-8 pb-10 h-[calc(100vh-4rem)]">
                <header>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Zero Human Task Board</h1>
                    <p className="text-muted-foreground text-lg">Autonomous Kanban managed via Convex Loop Architecture.</p>
                </header>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
                    {columns.map((col) => {
                        const Icon = col.icon;
                        return (
                            <div key={col.title} className="flex flex-col h-full">
                                <div className="flex items-center gap-2 mb-4 px-2">
                                    <Icon className={`w-5 h-5 ${col.color}`} />
                                    <h3 className="font-semibold text-lg">{col.title}</h3>
                                    <span className="ml-auto bg-white/10 text-xs px-2 py-0.5 rounded-full">
                                        {col.tasks.length}
                                    </span>
                                </div>

                                <div className="flex-1 bg-black/20 rounded-xl border border-white/5 p-3 space-y-3 overflow-y-auto hidden-scrollbar">
                                    {col.tasks.map(task => (
                                        <Card key={task.id} className="cursor-pointer hover:border-primary/50 group bg-card/60">
                                            <CardContent className="p-4 space-y-3">
                                                <div className="flex justify-between items-start gap-2">
                                                    <p className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">
                                                        {task.title}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/5 text-white/70">
                                                        {task.agent}
                                                    </span>
                                                    <span className={`text-[10px] uppercase font-bold tracking-wider ${task.priority === 'Critical' ? 'text-destructive' :
                                                            task.priority === 'High' ? 'text-secondary' :
                                                                task.priority === 'Medium' ? 'text-primary' : 'text-muted-foreground'
                                                        }`}>
                                                        {task.priority}
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}

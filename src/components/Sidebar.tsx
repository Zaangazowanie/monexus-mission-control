import Link from "next/link";
import {
    LayoutDashboard,
    CalendarDays,
    Settings,
    FolderSearch,
    BrainCircuit,
    Kanban,
    Activity,
    LineChart
} from "lucide-react";

export function Sidebar() {
    const links = [
        { name: "Overview", href: "/", icon: LayoutDashboard },
        { name: "Calendar", href: "/calendar", icon: CalendarDays },
        { name: "Task Board", href: "/tasks", icon: Kanban },
        { name: "Agent Team", href: "/team", icon: BrainCircuit },
        { name: "Memory", href: "/memory", icon: FolderSearch },
        { name: "Live Logs", href: "/activity", icon: Activity },
        { name: "Trading", href: "/trading", icon: LineChart },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <div className="w-64 h-screen border-r py-6 flex flex-col glass z-10 sticky top-0 border-r-white/10">
            <div className="px-6 mb-8 group cursor-pointer">
                <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">
                    MONEXUS
                </h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Mission Control</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-muted-foreground hover:bg-white/5 hover:text-white transition-all duration-200 group"
                        >
                            <Icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                            <span className="font-medium tracking-wide">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="px-6 mt-auto">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 blur-3xl rounded-full" />
                    <p className="text-xs text-primary font-semibold relative z-10 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                        System Online
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 relative z-10">Last sync: Just now</p>
                </div>
            </div>
        </div>
    );
}

import { Sidebar } from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <main className="flex-1 relative">
                {/* Glow effect underneath main content area */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/5 blur-[100px] pointer-events-none -z-10" />
                <div className="p-8 max-w-7xl mx-auto z-10 relative">
                    {children}
                </div>
            </main>
        </div>
    );
}

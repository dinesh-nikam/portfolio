"use client";

import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { usePathname } from "next/navigation";

export function AdminLayoutWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen w-full bg-[#0a0a0a] text-white overflow-hidden font-sans selection:bg-blue-500/30">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
            </div>

            <div className="relative z-10 hidden md:block">
                <AdminSidebar />
            </div>

            <main className="flex-1 relative z-10 overflow-y-auto overflow-x-hidden p-6 md:p-10">
                <div className="md:hidden p-4 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-xl sticky top-0 z-50 -mx-6 -mt-6 mb-6">
                    <h2 className="text-xl font-bold font-mono text-white">SYSTEM.IO</h2>
                    <div className="text-xs px-2 py-1 bg-white/10 rounded-full">Mobile Limited</div>
                </div>
                {children}
            </main>
        </div>
    );
}

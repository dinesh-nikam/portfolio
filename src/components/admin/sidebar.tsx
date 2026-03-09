"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, UserCheck, Inbox, LogOut, BarChart3, Presentation } from "lucide-react";

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const links = [
        { name: "Overview", path: "/admin", icon: LayoutDashboard },
        { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
        { name: "Visitors", path: "/admin/visitors", icon: Users },
        { name: "Hot Leads", path: "/admin/leads", icon: UserCheck },
        { name: "Projects", path: "/admin/projects", icon: Presentation },
        { name: "Inbox", path: "/admin/messages", icon: Inbox },
    ];

    const handleLogout = async () => {
        await fetch("/api/admin/auth", { method: "DELETE" });
        router.push("/admin/login");
        router.refresh(); // Clear middleware state client-side
    };

    return (
        <div className="w-64 h-screen shrink-0 border-r border-white/10 bg-black/50 backdrop-blur-xl flex flex-col pt-8">
            <div className="px-6 mb-10">
                <h2 className="text-xl font-bold text-white font-mono tracking-wider flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                    SYSTEM.IO
                </h2>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.path;
                    const Icon = link.icon;

                    return (
                        <Link key={link.path} href={link.path} className="block relative">
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute inset-0 bg-white/10 rounded-xl"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <div className={`relative px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${isActive ? "text-white" : "text-gray-400 hover:text-gray-200"}`}>
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{link.name}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all font-medium"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}

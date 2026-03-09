"use client";

import { useEffect, useState } from "react";
import { Mail, Check, Star, Archive, Clock, Monitor, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MessagesInbox() {
    const [messages, setMessages] = useState<any[]>([]);
    const [activeMessage, setActiveMessage] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/messages")
            .then(res => res.json())
            .then(d => {
                setMessages(d.messages || []);
                if (d.messages && d.messages.length > 0) {
                    setActiveMessage(d.messages[0]);
                }
                setLoading(false);
            });
    }, []);

    const updateMessage = async (id: string, updates: any) => {
        // Optimistic update
        setMessages(msgs => msgs.map(m => m.id === id ? { ...m, ...updates } : m));
        if (activeMessage?.id === id) setActiveMessage({ ...activeMessage, ...updates });

        await fetch("/api/admin/messages", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, ...updates }),
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 rounded-full border-t-2 border-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-5rem)] flex flex-col pt-8 md:pt-0">
            <header className="mb-6 shrink-0">
                <h1 className="text-3xl font-bold font-mono tracking-tight text-white mb-2">Message Intelligence</h1>
                <p className="text-gray-400">Client communications and visitor inquiry details.</p>
            </header>

            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col md:flex-row">
                {/* Left pane: Message List */}
                <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
                    <div className="p-4 border-b border-white/10 bg-black/30 backdrop-blur-md sticky top-0 z-10">
                        <h3 className="font-medium text-white flex items-center justify-between">
                            <span>Inbox</span>
                            <span className="bg-blue-500/20 text-blue-500 text-xs px-2 py-1 rounded-full">
                                {messages.filter(m => !m.isRead).length} Unread
                            </span>
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto divide-y divide-white/5">
                        {messages.map((msg, index) => (
                            <button
                                key={msg.id}
                                onClick={() => setActiveMessage(msg)}
                                className={`w-full text-left p-4 hover:bg-white/5 transition-colors relative group ${activeMessage?.id === msg.id ? "bg-white/5" : ""}`}
                            >
                                {!msg.isRead && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
                                )}
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`truncate pr-4 ${!msg.isRead ? "font-semibold text-white" : "font-medium text-gray-300"}`}>
                                        {msg.name}
                                    </h4>
                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                        {new Date(msg.receivedAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className={`text-sm truncate ${!msg.isRead ? "text-gray-300" : "text-gray-500"}`}>
                                    {msg.message}
                                </p>
                            </button>
                        ))}
                        {messages.length === 0 && (
                            <div className="p-8 text-center text-gray-500 font-mono text-sm">
                                Inbox is empty.
                            </div>
                        )}
                    </div>
                </div>

                {/* Right pane: Message Content */}
                <div className="w-full md:w-2/3 flex flex-col bg-black/20 relative">
                    <AnimatePresence mode="popLayout">
                        {activeMessage ? (
                            <motion.div
                                key={activeMessage.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className="flex-1 flex flex-col absolute inset-0 overflow-y-auto"
                            >
                                <div className="p-6 border-b border-white/10 flex justify-between items-start bg-black/30 backdrop-blur-xl sticky top-0 z-10">
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-2">{activeMessage.name}</h2>
                                        <a href={`mailto:${activeMessage.email}`} className="text-blue-500 hover:text-blue-400 text-sm font-mono transition-colors">
                                            {activeMessage.email}
                                        </a>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => updateMessage(activeMessage.id, { isRead: !activeMessage.isRead })}
                                            className={`p-2 rounded-xl transition-all ${activeMessage.isRead ? "bg-white/10 text-white" : "bg-blue-500/20 text-blue-500"}`}
                                            title={activeMessage.isRead ? "Mark as unread" : "Mark as read"}
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => updateMessage(activeMessage.id, { isStarred: !activeMessage.isStarred })}
                                            className={`p-2 rounded-xl transition-all ${activeMessage.isStarred ? "bg-yellow-500/20 text-yellow-400" : "bg-white/10 text-white hover:bg-white/20"}`}
                                        >
                                            <Star className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {activeMessage.message}
                                </div>

                                {/* Visitor Intelligence Context */}
                                {activeMessage.visitor && (
                                    <div className="p-6 bg-black/40 border-t border-white/10 mt-auto">
                                        <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Sender Intelligence</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> Location</span>
                                                <span className="text-gray-300">{activeMessage.visitor.city}, {activeMessage.visitor.country}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-gray-500 flex items-center gap-1"><Monitor className="w-3 h-3" /> System</span>
                                                <span className="text-gray-300 capitalize">{activeMessage.visitor.os} · {activeMessage.visitor.browser}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Device</span>
                                                <span className="text-gray-300 capitalize">{activeMessage.visitor.deviceType}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 relative">
                                <Mail className="w-12 h-12 mb-4 opacity-20" />
                                <p>Select a message to view details</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

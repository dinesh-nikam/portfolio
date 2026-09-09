'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, FileText } from 'lucide-react';

export default function AdminWritingDashboard() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await fetch('/api/admin/articles');
            const data = await res.json();
            if (data.success) {
                setArticles(data.articles);
            }
        } catch (error) {
            console.error('Failed to fetch articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteArticle = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article?')) return;
        try {
            const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setArticles(articles.filter((a) => a.id !== id));
            }
        } catch (error) {
            console.error('Error deleting article', error);
        }
    };

    return (
        <div className="flex flex-col gap-8 p-6 lg:p-10 w-full max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-light text-white tracking-wide">
                        Writing <span className="text-white/40">Dashboard</span>
                    </h1>
                    <p className="text-sm text-white/50 font-mono mt-1">
                        Manage your developer knowledge hub
                    </p>
                </div>
                <Link
                    href="/admin/writing/new"
                    className="group relative flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black font-medium text-sm overflow-hidden rounded-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Article</span>
                </Link>
            </div>

            {/* Stats/Overview (Optional later) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-lg border border-white/10 bg-black/40 backdrop-blur-md">
                    <p className="text-white/50 text-xs font-mono mb-1">TOTAL ARTICLES</p>
                    <p className="text-3xl font-light text-white">{articles.length}</p>
                </div>
                <div className="p-5 rounded-lg border border-white/10 bg-black/40 backdrop-blur-md">
                    <p className="text-white/50 text-xs font-mono mb-1">PUBLISHED</p>
                    <p className="text-3xl font-light text-white">
                        {articles.filter((a) => a.status === 'PUBLISHED').length}
                    </p>
                </div>
                <div className="p-5 rounded-lg border border-white/10 bg-black/40 backdrop-blur-md">
                    <p className="text-white/50 text-xs font-mono mb-1">TOTAL VIEWS</p>
                    <p className="text-3xl font-light text-white">
                        {articles.reduce((acc, curr) => acc + curr.views, 0)}
                    </p>
                </div>
            </div>

            {/* Articles List */}
            <div className="rounded-lg border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
                <div className="p-5 border-b border-white/10">
                    <h2 className="text-sm font-medium text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-white/50" />
                        All Articles
                    </h2>
                </div>

                {loading ? (
                    <div className="p-10 text-center animate-pulse text-white/50 font-mono text-sm">
                        LOADING_ARTICLES...
                    </div>
                ) : articles.length === 0 ? (
                    <div className="p-10 text-center text-white/50 font-mono text-sm">
                        NO_ARTICLES_FOUND
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-white/70">
                            <thead className="bg-white/5 text-xs uppercase font-mono text-white/50">
                                <tr>
                                    <th className="px-5 py-4 font-normal tracking-wider">Title</th>
                                    <th className="px-5 py-4 font-normal tracking-wider">Category</th>
                                    <th className="px-5 py-4 font-normal tracking-wider">Status</th>
                                    <th className="px-5 py-4 font-normal tracking-wider">Date</th>
                                    <th className="px-5 py-4 font-normal tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {articles.map((article) => (
                                    <tr key={article.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-white/90 truncate max-w-[300px]">
                                                {article.title}
                                            </p>
                                            <p className="text-xs text-white/40 truncate max-w-[300px] mt-0.5">
                                                /{article.slug}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded bg-white/10 text-xs font-medium text-white/80">
                                                {article.category}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${article.status === 'PUBLISHED' ? 'bg-emerald-500' : 'bg-amber-500'
                                                        }`}
                                                />
                                                <span className="text-xs font-mono">
                                                    {article.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-white/50 text-xs font-mono">
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/writing/${article.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                                                    title="View Live"
                                                >
                                                    <Eye className="w-4 h-4 text-white/70" />
                                                </Link>
                                                <Link
                                                    href={`/admin/writing/${article.id}/edit`}
                                                    className="p-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4 text-white/70" />
                                                </Link>
                                                <button
                                                    onClick={() => deleteArticle(article.id)}
                                                    className="p-1.5 rounded bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors text-white/70"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react';

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        excerpt: '',
        content: '',
        status: 'DRAFT',
        featured: false,
        readingTime: 0,
    });

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetch(`/api/admin/articles/${id}`);
                const data = await res.json();
                if (data.success && data.article) {
                    setFormData({
                        title: data.article.title,
                        slug: data.article.slug,
                        category: data.article.category,
                        excerpt: data.article.excerpt,
                        content: data.article.content,
                        status: data.article.status,
                        featured: data.article.featured,
                        readingTime: data.article.readingTime,
                    });
                } else {
                    setError('Failed to load article details.');
                }
            } catch (err) {
                setError('Error fetching article.');
            } finally {
                setFetching(false);
            }
        };
        fetchArticle();
    }, [id]);

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setFormData((prev) => ({
            ...prev,
            [name]: finalValue,
        }));
    };

    const calculateReadingTime = (text: string) => {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const readingTime = calculateReadingTime(formData.content);
        const dataToSubmit = {
            ...formData,
            readingTime,
            publishedAt: formData.status === 'PUBLISHED' ? new Date().toISOString() : null,
        };

        try {
            const res = await fetch(`/api/admin/articles/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSubmit),
            });

            const data = await res.json();
            if (data.success) {
                router.push('/admin/writing');
                router.refresh();
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('An error occurred while saving.');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex justify-center items-center mix-blend-screen h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-white/50" />
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-10 w-full max-w-5xl mx-auto flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/writing"
                        className="p-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-light text-white tracking-wide">
                            Edit <span className="text-white/40">Article</span>
                        </h1>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2 bg-white text-black font-medium text-sm rounded-md transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    <span>Update Article</span>
                </button>
            </div>

            {error && (
                <div className="p-4 rounded-md border border-red-500/20 bg-red-500/10 text-red-400 text-sm font-mono">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Editor */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase font-mono text-white/50 tracking-wider">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-medium text-lg placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase font-mono text-white/50 tracking-wider">
                            Excerpt
                        </label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/80 text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2 flex-grow">
                        <div className="flex items-center justify-between">
                            <label className="text-xs uppercase font-mono text-white/50 tracking-wider">
                                Content (MDX)
                            </label>
                            <div className="text-xs text-white/30 font-mono flex gap-3">
                                <span>Use markdown.</span>
                                <span><ImageIcon className="w-3 h-3 inline mr-1" />Use /uploads/img.png</span>
                            </div>
                        </div>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows={25}
                            className="px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white/90 font-mono text-sm leading-relaxed placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-y min-h-[500px]"
                        />
                    </div>
                </div>

                {/* Sidebar Options */}
                <div className="flex flex-col gap-6">
                    <div className="p-5 rounded-xl border border-white/10 bg-black/40 flex flex-col gap-4">
                        <h3 className="text-xs uppercase font-mono text-white/70 tracking-wider mb-2">
                            Publishing Info
                        </h3>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-white/50">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white focus:outline-none focus:border-white/30"
                            >
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">Published</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-white/50">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white focus:outline-none focus:border-white/30"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-white/50">URL Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="px-3 py-2 bg-white/5 border border-white/10 rounded text-sm font-mono text-white/80 focus:outline-none focus:border-white/30"
                            />
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                            <input
                                type="checkbox"
                                id="featured"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-white/20 bg-white/5 text-white focus:ring-1 focus:ring-white/30"
                            />
                            <label htmlFor="featured" className="text-sm text-white/80 cursor-pointer">
                                Feature this article
                            </label>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
}

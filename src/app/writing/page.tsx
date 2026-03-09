'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Loader2 } from 'lucide-react';

// Inline simple components for now
function ArticleCard({ article, featured = false }: { article: any; featured?: boolean }) {
    return (
        <Link href={`/writing/${article.slug}`}>
            <motion.article
                whileHover={{ y: -5 }}
                className={`group relative flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden transition-all hover:bg-white/5 hover:border-white/20 ${featured ? 'md:flex-row gap-8 lg:p-12 mb-12' : 'h-full gap-6'}`}
            >
                <div className="flex flex-col gap-4 flex-1">
                    <div className="flex items-center gap-3 text-xs font-mono text-white/50">
                        <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/80">{article.category}</span>
                        <span>•</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>•</span>
                        <span>{article.readingTime} min read</span>
                    </div>

                    <div>
                        <h3 className={`font-light text-white group-hover:text-white/90 transition-colors ${featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                            {article.title}
                        </h3>
                        <p className={`text-white/60 mt-3 leading-relaxed ${featured ? 'text-lg max-w-2xl' : 'text-sm'}`}>
                            {article.excerpt}
                        </p>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}

export default function WritingDashboard() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchArticles();
    }, [activeCategory]);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            let url = '/api/articles';
            if (activeCategory !== 'All') {
                url += `?category=${encodeURIComponent(activeCategory)}`;
            }
            const res = await fetch(url);
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

    // derived state
    const displayedArticles = articles.filter(a =>
        searchQuery === '' ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const featuredArticle = activeCategory === 'All' && searchQuery === ''
        ? displayedArticles.find(a => a.featured) || displayedArticles[0]
        : null;

    const gridArticles = featuredArticle
        ? displayedArticles.filter(a => a.id !== featuredArticle.id)
        : displayedArticles;

    const categories = ['All', 'Engineering', 'Architecture', 'Web Development', 'Design Systems', 'Performance'];

    // Group by year for timeline
    const articlesByYear = gridArticles.reduce((acc, article) => {
        const year = new Date(article.publishedAt).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(article);
        return acc;
    }, {} as Record<string, any[]>);

    const years = Object.keys(articlesByYear).sort((a, b) => Number(b) - Number(a));

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto mb-20"
            >
                <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
                    Writing
                </h1>
                <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-light">
                    Thoughts on engineering, architecture, software design, and building modern web experiences.
                </p>
            </motion.section>

            <div className="max-w-7xl mx-auto">
                {/* Controls: Search & Filters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12"
                >
                    <div className="flex flex-wrap items-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                    ? 'bg-white text-black'
                                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-white"
                        />
                    </div>
                </motion.div>

                {loading ? (
                    <div className="w-full h-64 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-white/30" />
                    </div>
                ) : (
                    <>
                        {/* Featured Article */}
                        {featuredArticle && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-6">Featured Read</h2>
                                <ArticleCard article={featuredArticle} featured />
                            </motion.div>
                        )}

                        {/* Article Grid */}
                        {gridArticles.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mb-24"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {gridArticles.map((article) => (
                                        <ArticleCard key={article.id} article={article} />
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* Timeline Archive (Only show if multiple years or 'All' category) */}
                        {years.length > 0 && activeCategory === 'All' && searchQuery === '' && (
                            <motion.section
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="mb-24 max-w-4xl mx-auto"
                            >
                                <h2 className="text-3xl font-light mb-12">Archive</h2>
                                <div className="space-y-16">
                                    {years.map((year) => (
                                        <div key={year} className="flex flex-col md:flex-row gap-8 md:gap-16">
                                            <h3 className="text-4xl font-light text-white/20 md:w-32 shrink-0">{year}</h3>
                                            <div className="flex flex-col gap-6 w-full">
                                                {articlesByYear[year].map((article: any) => (
                                                    <Link key={article.id} href={`/writing/${article.slug}`} className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 py-4 border-b border-white/5 hover:border-white/20 transition-colors">
                                                        <h4 className="text-lg font-medium text-white/80 group-hover:text-white transition-colors">
                                                            {article.title}
                                                        </h4>
                                                        <span className="text-sm font-mono text-white/40 shrink-0">
                                                            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {displayedArticles.length === 0 && (
                            <div className="py-24 text-center">
                                <p className="text-white/40 text-lg">No articles found matching your criteria.</p>
                            </div>
                        )}

                        {/* Newsletter Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-2xl mx-auto mt-24 p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent text-center"
                        >
                            <h2 className="text-2xl font-medium mb-4">Join the Newsletter</h2>
                            <p className="text-white/50 mb-8 max-w-md mx-auto">
                                Get notified about new engineering articles, architectural deep dives, and tutorials. Unsubscribe anytime.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Newsletter subscribed!'); }}>
                                <input
                                    type="email"
                                    required
                                    placeholder="Your email address"
                                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                                />
                                <button type="submit" className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-transform">
                                    Subscribe
                                </button>
                            </form>
                        </motion.section>
                    </>
                )}
            </div>
        </div>
    );
}

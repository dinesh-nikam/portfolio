"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search } from 'lucide-react';

interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    readingTime: number;
    publishedAt: Date | null;
    featured: boolean;
}

function formatArticleDate(publishedAt: Date | null, options: Intl.DateTimeFormatOptions): string {
    return publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', options) : '—';
}

function formatArticleYear(publishedAt: Date | null): number | null {
    return publishedAt ? new Date(publishedAt).getFullYear() : null;
}

function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
    return (
        <Link href={`/writing/${article.slug}`}>
            <motion.article
                whileHover={{ y: -5 }}
                className={`group relative flex flex-col justify-between p-6 md:p-8 rounded-md border border-border bg-card overflow-hidden transition-colors hover:bg-muted/30 hover:border-primary/40 ${featured ? 'md:flex-row gap-8 lg:p-12 mb-12' : 'h-full gap-6'}`}
            >
                <div className="flex flex-col gap-4 flex-1">
                    <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                        <span className="px-2.5 py-1 rounded-full bg-muted/30 border border-border/70 text-foreground/80">{article.category}</span>
                        <span>•</span>
                        <span>{formatArticleDate(article.publishedAt, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>•</span>
                        <span>{article.readingTime} min read</span>
                    </div>

                    <div>
                        <h3 className={`font-light text-foreground group-hover:text-foreground/90 transition-colors ${featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                            {article.title}
                        </h3>
                        <p className={`text-muted-foreground mt-3 leading-relaxed ${featured ? 'text-lg max-w-2xl' : 'text-sm'}`}>
                            {article.excerpt}
                        </p>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}

export function WritingDashboardClient({ articles }: { articles: Article[] }) {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredByCategory = articles.filter(a => activeCategory === 'All' || a.category === activeCategory);

    const displayedArticles = filteredByCategory.filter(a =>
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
        const year = formatArticleYear(article.publishedAt);
        if (year === null) return acc;
        if (!acc[year]) acc[year] = [];
        acc[year].push(article);
        return acc;
    }, {} as Record<string, Article[]>);

    const years = Object.keys(articlesByYear).sort((a, b) => Number(b) - Number(a));

    return (
        <>
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto mb-20"
            >
                <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
                    Writing
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light">
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
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat
                                    ? 'bg-foreground text-background'
                                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-muted/30 border border-border rounded-full text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-background transition-colors text-foreground"
                        />
                    </div>
                </motion.div>

                {/* Featured Article */}
                {featuredArticle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6">Featured Read</h2>
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

                {/* Timeline Archive */}
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
                                    <h3 className="text-4xl font-light text-foreground/20 md:w-32 shrink-0">{year}</h3>
                                    <div className="flex flex-col gap-6 w-full">
                                        {articlesByYear[year].map((article: Article) => (
                                            <Link key={article.id} href={`/writing/${article.slug}`} className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 py-4 border-b border-foreground/5 hover:border-foreground/20 transition-colors">
                                                <h4 className="text-lg font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                                                    {article.title}
                                                </h4>
                                                <span className="text-sm font-mono text-muted-foreground shrink-0">
                                                    {formatArticleDate(article.publishedAt, { month: 'short', day: 'numeric' })}
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
                        <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
                    </div>
                )}

                {/* Newsletter Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto mt-24 p-8 md:p-12 rounded-md border border-border bg-card text-center"
                >
                    <h2 className="text-2xl font-medium mb-4">Join the Newsletter</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Get notified about new engineering articles, architectural deep dives, and tutorials. Unsubscribe anytime.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Newsletter subscribed!'); }}>
                        <input
                            type="email"
                            required
                            placeholder="Your email address"
                            className="flex-1 px-4 py-3 bg-muted/30 border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        />
                        <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-md transition-colors">
                            Subscribe
                        </button>
                    </form>
                </motion.section>
            </div>
        </>
    );
}

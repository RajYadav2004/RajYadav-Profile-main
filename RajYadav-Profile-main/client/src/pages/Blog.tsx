import { Card } from '../components/Card';

const Blog = () => {
    return (
        <div className="container py-12 px-4 md:px-6">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Latest Articles</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="flex flex-col overflow-hidden">
                        <div className="aspect-[16/9] bg-slate-200 dark:bg-slate-800" />
                        <div className="flex flex-1 flex-col p-6">
                            <div className="mb-2 text-sm text-primary-600">Development</div>
                            <h3 className="mb-2 text-xl font-bold">Understanding React Server Components</h3>
                            <p className="text-slate-500 dark:text-slate-400 flex-1">
                                A deep dive into the new architecture and how it changes the way we build apps...
                            </p>
                            <div className="mt-4 text-sm text-slate-400">Dec 27, 2025 • 5 min read</div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Blog;

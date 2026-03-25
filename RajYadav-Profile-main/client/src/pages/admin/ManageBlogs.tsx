import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Plus, Trash2, Edit } from 'lucide-react';

interface BlogPost {
    _id: string;
    title: string;
    excerpt: string;
    published: boolean;
}

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data } = await api.get('/blog');
            setBlogs(data);
        } catch (error) {
            console.error('Failed to fetch blogs', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                await api.delete(`/blog/${id}`);
                setBlogs(blogs.filter(b => b._id !== id));
            } catch (error) {
                console.error('Failed to delete blog', error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                </Button>
            </div>

            <Card className="overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-800">
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Title</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Excerpt</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Status</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-slate-500 dark:text-slate-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center">Loading...</td>
                                </tr>
                            ) : blogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center">No blog posts found.</td>
                                </tr>
                            ) : (
                                blogs.map((blog) => (
                                    <tr key={blog._id} className="border-b transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-800">
                                        <td className="p-4 align-middle font-medium">{blog.title}</td>
                                        <td className="p-4 align-middle truncate max-w-[200px]">{blog.excerpt}</td>
                                        <td className="p-4 align-middle">
                                            <span className={`px-2 py-1 rounded-full text-xs ${blog.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {blog.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                                                <Button size="sm" variant="danger" onClick={() => handleDelete(blog._id)}><Trash2 className="h-4 w-4" /></Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ManageBlogs;

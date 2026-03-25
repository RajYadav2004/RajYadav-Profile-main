import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Plus, Trash2, Edit } from 'lucide-react';

interface Project {
    _id: string;
    title: string;
    category: string;
    status: string;
}

const ManageProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/projects');
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/projects/${id}`);
                setProjects(projects.filter(p => p._id !== id));
            } catch (error) {
                console.error('Failed to delete project', error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                </Button>
            </div>

            <Card className="overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800 border-slate-200 dark:border-slate-800">
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Title</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Category</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Status</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-slate-500 dark:text-slate-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center">Loading...</td>
                                </tr>
                            ) : projects.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center">No projects found.</td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project._id} className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800 border-slate-200 dark:border-slate-800">
                                        <td className="p-4 align-middle font-medium">{project.title}</td>
                                        <td className="p-4 align-middle">{project.category}</td>
                                        <td className="p-4 align-middle">{project.status}</td>
                                        <td className="p-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                                                <Button size="sm" variant="danger" onClick={() => handleDelete(project._id)}><Trash2 className="h-4 w-4" /></Button>
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

export default ManageProjects;

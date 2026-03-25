import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import api from '../../services/api';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState({
        projects: 0,
        blogs: 0,
        messages: 0,
        views: 1234, // Views might still be mock if not implemented in backend
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [projectsRes, blogsRes, messagesRes] = await Promise.all([
                    api.get('/projects'),
                    api.get('/blog'),
                    api.get('/contact'),
                ]);
                setStats({
                    projects: projectsRes.data.length,
                    blogs: blogsRes.data.length,
                    messages: messagesRes.data.length,
                    views: 1234,
                });
            } catch (error) {
                console.error('Failed to fetch dashboard stats', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <Button variant="outline" onClick={logout}>Logout</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-6">
                    <h3 className="text-sm font-medium text-slate-500">Total Projects</h3>
                    <div className="mt-2 text-2xl font-bold">{stats.projects}</div>
                </Card>
                <Card className="p-6">
                    <h3 className="text-sm font-medium text-slate-500">Blog Posts</h3>
                    <div className="mt-2 text-2xl font-bold">{stats.blogs}</div>
                </Card>
                <Card className="p-6">
                    <h3 className="text-sm font-medium text-slate-500">Messages</h3>
                    <div className="mt-2 text-2xl font-bold">{stats.messages}</div>
                </Card>
                <Card className="p-6">
                    <h3 className="text-sm font-medium text-slate-500">Total Views</h3>
                    <div className="mt-2 text-2xl font-bold">{stats.views.toLocaleString()}</div>
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Welcome back, {user?.name}</h3>
                <p className="text-slate-500">Select a module from the sidebar to manage your content.</p>
            </Card>
        </div>
    );
};

export default Dashboard;

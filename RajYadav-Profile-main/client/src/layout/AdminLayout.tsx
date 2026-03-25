import { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, FolderKanban, FileText, Mail, Settings, User } from 'lucide-react';
import { cn } from '../utils/cn';

const AdminLayout = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/admin/login');
        }
    }, [user, isLoading, navigate]);

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    if (!user) return null;

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
        { name: 'Blog', path: '/admin/blog', icon: FileText },
        { name: 'Messages', path: '/admin/messages', icon: Mail },
        { name: 'Profile', path: '/admin/profile', icon: User },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hidden md:block">
                <div className="flex h-16 items-center px-6 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-lg font-bold">Admin Panel</span>
                </div>
                <nav className="space-y-1 p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                'flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                location.pathname === item.path
                                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/10 dark:text-primary-400'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;

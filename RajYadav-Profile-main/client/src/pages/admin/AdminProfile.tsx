import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { User as UserIcon, Mail, Shield } from 'lucide-react';

const AdminProfile = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Admin Profile</h1>

            <Card className="p-8 max-w-2xl">
                <div className="flex items-center space-x-6">
                    <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center dark:bg-primary-900/20">
                        <UserIcon className="h-12 w-12 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{user?.name}</h2>
                        <p className="text-slate-500">Administrator</p>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                        <Mail className="h-5 w-5" />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                        <Shield className="h-5 w-5" />
                        <span>Admin Access Level</span>
                    </div>
                </div>

                <div className="mt-8 flex space-x-4">
                    <Button>Edit Profile</Button>
                    <Button variant="outline">Change Password</Button>
                </div>
            </Card>
        </div>
    );
};

export default AdminProfile;

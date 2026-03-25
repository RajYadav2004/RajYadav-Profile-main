import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Bell, Moon, Lock } from 'lucide-react';

const AdminSettings = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

            <div className="grid gap-6">
                <Card className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <Lock className="h-5 w-5 text-slate-500" />
                        <h2 className="text-xl font-bold">Security</h2>
                    </div>
                    <p className="text-slate-500 mb-4">Manage your account security and authentication settings.</p>
                    <Button variant="outline">Update Password</Button>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <Bell className="h-5 w-5 text-slate-500" />
                        <h2 className="text-xl font-bold">Notifications</h2>
                    </div>
                    <p className="text-slate-500 mb-4">Configure how you receive alerts about new messages or system updates.</p>
                    <div className="space-y-2">
                        <label className="flex items-center space-x-3">
                            <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" defaultChecked />
                            <span>Email alerts for new messages</span>
                        </label>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <Moon className="h-5 w-5 text-slate-500" />
                        <h2 className="text-xl font-bold">Preferences</h2>
                    </div>
                    <p className="text-slate-500 mb-4">Personalize your admin dashboard experience.</p>
                    <Button variant="outline">Configure Theme</Button>
                </Card>
            </div>
        </div>
    );
};

export default AdminSettings;

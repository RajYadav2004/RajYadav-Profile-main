import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Trash2, MailOpen } from 'lucide-react';

interface Message {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

const ManageMessages = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const { data } = await api.get('/contact');
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await api.delete(`/contact/${id}`);
                setMessages(messages.filter(m => m._id !== id));
            } catch (error) {
                console.error('Failed to delete message', error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
            </div>

            <Card className="overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-800">
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Sender</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Subject</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400">Date</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-slate-500 dark:text-slate-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center">Loading...</td>
                                </tr>
                            ) : messages.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center">No messages found.</td>
                                </tr>
                            ) : (
                                messages.map((msg) => (
                                    <tr key={msg._id} className="border-b transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-800">
                                        <td className="p-4 align-middle">
                                            <div className="font-medium">{msg.name}</div>
                                            <div className="text-xs text-slate-500">{msg.email}</div>
                                        </td>
                                        <td className="p-4 align-middle">{msg.subject}</td>
                                        <td className="p-4 align-middle text-slate-500">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="outline" title="View Message"><MailOpen className="h-4 w-4" /></Button>
                                                <Button size="sm" variant="danger" onClick={() => handleDelete(msg._id)} title="Delete"><Trash2 className="h-4 w-4" /></Button>
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

export default ManageMessages;

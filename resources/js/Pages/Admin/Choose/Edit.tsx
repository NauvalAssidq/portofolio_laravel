import React, { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface Choose {
    id: number;
    title: string;
    description: string;
    icon: string;
    position: number;
}

export default function Edit({ auth, choose }: { auth: any, choose: Choose }) {
    const { data, setData, put, processing, errors } = useForm({
        title: choose.title || '',
        description: choose.description || '',
        icon: choose.icon || '',
        position: choose.position || 0,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('admin.chooses.update', choose.id));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Edit Reason" />

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href={route('admin.chooses.index')}>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-serif text-gray-900">Edit Reason</h2>
                        <p className="text-gray-500">Update reason details.</p>
                    </div>
                </div>

                <Card className="bg-white border-gray-200 shadow-sm rounded-xl overflow-hidden">
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Pixel Perfect"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="bg-gray-50 border-gray-200"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Explain this point..."
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="bg-gray-50 border-gray-200 min-h-[100px]"
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="icon">Icon Name (Lucide React)</Label>
                                <Input
                                    id="icon"
                                    placeholder="e.g. Zap, Shield, Eye"
                                    value={data.icon}
                                    onChange={e => setData('icon', e.target.value)}
                                    className="bg-gray-50 border-gray-200"
                                />
                                <p className="text-xs text-gray-500">
                                    Use names from <a href="https://lucide.dev/icons" target="_blank" className="text-indigo-600 underline">Lucide Icons</a>.
                                </p>
                                {errors.icon && <p className="text-red-500 text-sm">{errors.icon}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="position">Position (Order)</Label>
                                <Input
                                    id="position"
                                    type="number"
                                    value={data.position}
                                    onChange={e => setData('position', parseInt(e.target.value))}
                                    className="bg-gray-50 border-gray-200"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </AdminLayout>
    );
}

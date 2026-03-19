import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Award } from 'lucide-react';
import { toast } from 'sonner';
import { DestructiveAlert } from "@/components/admin/DestructiveAlert";

interface Choose {
    id: number;
    title: string;
    description: string;
    icon: string;
    position: number;
}

interface Props {
    auth: any;
    chooses: Choose[];
}

export default function Index({ auth, chooses }: Props) {
    // handleDelete removed as it is now handled by DestructiveAlert inline

    return (
        <AdminLayout user={auth.user}>
            <Head title="Why Choose Me" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-serif text-gray-900">Why Choose Me</h2>
                        <p className="text-gray-500 mt-1">Manage your selling points.</p>
                    </div>
                    <Link href={route('admin.chooses.create')}>
                        <Button className="rounded-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Reason
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {chooses.map((choose) => (
                        <div key={choose.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 font-mono text-xs">
                                    {choose.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{choose.title}</h3>
                            </div>

                            <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-1">
                                {choose.description}
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                                <Link href={route('admin.chooses.edit', choose.id)} className="flex-1">
                                    <Button variant="outline" className="w-full justify-center">
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                                <DestructiveAlert
                                    title="Delete reason?"
                                    description="This action cannot be undone. This reason will be permanently removed."
                                    actionLabel="Delete Reason"
                                    onConfirm={() => router.delete(route('admin.chooses.destroy', choose.id), {
                                        onError: () => toast.error('Failed to delete reason'),
                                    })}
                                    trigger={
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                    ))}

                    {chooses.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Award className="w-8 h-8 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No reasons added yet</h3>
                            <p className="text-gray-500 max-w-sm mb-6">
                                Start adding reasons why clients should choose you to build trust and credibility.
                            </p>
                            <Link href={route('admin.chooses.create')}>
                                <Button className="rounded-full shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add First Reason
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout >
    );
}

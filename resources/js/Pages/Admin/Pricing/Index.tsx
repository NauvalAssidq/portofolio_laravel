import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react'; // Added router
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, CheckCircle, XCircle, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { DestructiveAlert } from "@/components/admin/DestructiveAlert";

interface Pricing {
    id: number;
    name: string;
    description: string;
    price_monthly: string;
    price_annually: string;
    is_popular: boolean;
    currency: string;
}

interface Props {
    auth: any;
    pricings: Pricing[];
}

export default function Index({ auth, pricings }: Props) {
    const { delete: destroy } = useForm();

    // handleDelete removed as it is now handled by DestructiveAlert inline

    return (
        <AdminLayout user={auth.user}>
            <Head title="Pricing Plans" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-serif text-gray-900">Pricing Plans</h2>
                        <p className="text-gray-500 mt-1">Manage your service pricing tiers.</p>
                    </div>
                    <Link href={route('admin.pricing.create')}>
                        <Button className="rounded-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Plan
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {pricings.map((plan) => (
                        <div key={plan.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                            {plan.is_popular && (
                                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                    POPULAR
                                </div>
                            )}

                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mt-1">{plan.description}</p>
                            </div>

                            <div className="mb-6 space-y-1">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-gray-900">
                                        {plan.price_monthly ? `${plan.currency} ${Number(plan.price_monthly).toLocaleString()}` : "Custom"}
                                    </span>
                                    <span className="text-xs text-gray-500">/mo</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-medium text-gray-700">
                                        {plan.price_annually ? `${plan.currency} ${Number(plan.price_annually).toLocaleString()}` : "Custom"}
                                    </span>
                                    <span className="text-xs text-gray-500">/yr</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                <Link href={route('admin.pricing.edit', plan.id)} className="flex-1">
                                    <Button variant="outline" className="w-full justify-center">
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                                <DestructiveAlert
                                    title="Delete plan?"
                                    description="This action cannot be undone. This pricing plan will be permanently removed."
                                    actionLabel="Delete Plan"
                                    onConfirm={() => router.delete(route('admin.pricing.destroy', plan.id), {
                                        onError: () => toast.error('Failed to delete pricing plan'),
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

                    {pricings.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <CreditCard className="w-8 h-8 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No pricing plans yet</h3>
                            <p className="text-gray-500 max-w-sm mb-6">
                                Create pricing tiers to display your service costs. Clear pricing builds trust with potential clients.
                            </p>
                            <Link href={route('admin.pricing.create')}>
                                <Button className="rounded-full shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create First Plan
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout >
    );
}

import React, { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Trash2, Plus } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export default function Create({ auth }: { auth: any }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price_monthly: '',
        price_annually: '',
        currency: 'USD',
        period: '/ project',
        features: [''], // Start with one empty feature
        cta_text: 'Get Started',
        cta_link: '',
        is_popular: false,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.pricing.store'));
    };

    const addFeature = () => {
        setData('features', [...data.features, '']);
    };

    const removeFeature = (index: number) => {
        const newFeatures = data.features.filter((_, i) => i !== index);
        setData('features', newFeatures);
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...data.features];
        newFeatures[index] = value;
        setData('features', newFeatures);
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Create Pricing Plan" />

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href={route('admin.pricing.index')}>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-serif text-gray-900">Create Plan</h2>
                        <p className="text-gray-500">Add a new pricing tier to your offerings.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="bg-white border-gray-200 shadow-sm rounded-xl overflow-hidden">
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Plan Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. Starter, Professional"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="bg-gray-50 border-gray-200"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Briefly describe who this plan is for..."
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="bg-gray-50 border-gray-200 min-h-[100px]"
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                                </div>

                                {/* Dynamic Features */}
                                <div className="space-y-3 pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <Label>Features List</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addFeature}
                                            className="text-indigo-600 hover:text-indigo-700"
                                        >
                                            <Plus className="w-4 h-4 mr-1" /> Add Feature
                                        </Button>
                                    </div>

                                    {data.features.map((feature, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={feature}
                                                onChange={e => updateFeature(index, e.target.value)}
                                                placeholder={`Feature ${index + 1}`}
                                                className="bg-gray-50"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeFeature(index)}
                                                className="text-gray-400 hover:text-red-500"
                                                disabled={data.features.length === 1}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    {errors.features && <p className="text-red-500 text-sm">{errors.features}</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Settings */}
                    <div className="space-y-6">
                        <Card className="bg-white border-gray-200 shadow-sm rounded-xl">
                            <CardContent className="p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Popular Plan</Label>
                                        <p className="text-xs text-gray-500">Mark as recommended</p>
                                    </div>
                                    <Switch
                                        checked={data.is_popular}
                                        onCheckedChange={(checked) => setData('is_popular', checked)}
                                    />
                                </div>

                                <div className="space-y-4 pt-4 border-t border-gray-100">
                                    <h3 className="font-medium text-gray-900">Pricing Details</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="currency">Currency</Label>
                                            <Input
                                                id="currency"
                                                value={data.currency}
                                                onChange={e => setData('currency', e.target.value)}
                                                className="bg-gray-50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="period">Period</Label>
                                            <Input
                                                id="period"
                                                value={data.period}
                                                onChange={e => setData('period', e.target.value)}
                                                className="bg-gray-50"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="price_monthly">Monthly Price</Label>
                                        <Input
                                            id="price_monthly"
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={data.price_monthly}
                                            onChange={e => setData('price_monthly', e.target.value)}
                                            className="bg-gray-50"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="price_annually">Annually Price</Label>
                                        <Input
                                            id="price_annually"
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={data.price_annually}
                                            onChange={e => setData('price_annually', e.target.value)}
                                            className="bg-gray-50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-gray-100">
                                    <h3 className="font-medium text-gray-900">Call to Action</h3>

                                    <div className="space-y-2">
                                        <Label htmlFor="cta_text">Button Text</Label>
                                        <Input
                                            id="cta_text"
                                            value={data.cta_text}
                                            onChange={e => setData('cta_text', e.target.value)}
                                            className="bg-gray-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cta_link">Button Link (Optional)</Label>
                                        <Input
                                            id="cta_link"
                                            placeholder="#contact"
                                            value={data.cta_link}
                                            onChange={e => setData('cta_link', e.target.value)}
                                            className="bg-gray-50"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                                    disabled={processing}
                                >
                                    {processing ? 'Creating...' : 'Create Plan'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

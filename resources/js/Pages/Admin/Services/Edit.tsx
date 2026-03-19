import React, { FormEvent, useState, useEffect } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { ArrowLeft, Loader2, Save, ImageIcon, Sparkles, Tag as TagIcon, X, ArrowUpRight, Trash2 } from "lucide-react";
import { DestructiveAlert } from "@/components/admin/DestructiveAlert";

interface Props {
    auth: any;
    service: {
        id: number;
        title: string;
        description: string;
        image: string;
        specialities: string[];
    };
}

export default function Edit({ auth, service }: Props) {
    const { data, setData, put, processing, errors, transform } = useForm({
        title: service.title,
        description: service.description,
        image: service.image as string | File | null,
        specialitiesInput: Array.isArray(service.specialities) ? service.specialities.join(', ') : ''
    });

    const [specialities, setSpecialities] = useState<string[]>([]);

    useEffect(() => {
        if (data.specialitiesInput) {
            const tags = data.specialitiesInput.split(',').map(s => s.trim()).filter(Boolean);
            setSpecialities(tags);
        } else {
            setSpecialities([]);
        }
    }, [data.specialitiesInput]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            specialities: specialities,
            _method: 'PUT'
        }));

        router.post(route('admin.services.update', service.id), {
            _method: 'put',
            ...data,
            specialities: specialities,
            image: data.image
        }, {
            forceFormData: true
        });
    };

    // handleDelete removed as it is now handled by DestructiveAlert inline

    return (
        <AdminLayout user={auth.user} title="Edit Service">
            <Head title={`Edit ${service.title}`} />

            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto pb-20">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row  items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <Link href={route('admin.services.index')}>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-white hover:shadow-sm">
                                <ArrowLeft className="h-5 w-5 text-gray-600" />
                            </Button>
                        </Link>
                        <div>
                            <h2 className="text-2xl font-serif text-gray-900 leading-tight">Edit Service</h2>
                            <p className="text-sm text-gray-500 hidden sm:block">Update your service offering details.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                            <DestructiveAlert
                                title="Delete service?"
                                description="This action cannot be undone. This service will be permanently deleted."
                                actionLabel="Delete Service"
                                onConfirm={() => router.delete(route('admin.services.destroy', service.id))}
                                trigger={
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </Button>
                                }
                            />
                            <Button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 rounded-full px-6 transition-all hover:scale-105"
                                disabled={processing}
                            >
                                {processing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Form Fields */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Details Card */}
                        <Card className="shadow-sm border-0 ring-1 ring-gray-100 bg-white rounded-2xl overflow-hidden group hover:ring-indigo-50 transition-all duration-300">
                            <CardContent className="p-8 space-y-6">
                                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-2">
                                    <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <Sparkles className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">Service Details</h3>
                                </div>

                                <div className="space-y-4">
                                    <Label htmlFor="title" className="text-gray-700 font-medium">Service Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="e.g. Web Development"
                                        className="h-12 text-lg shadow-none bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all rounded-xl"
                                    />
                                    {errors.title && <p className="text-sm text-red-500 font-medium">{errors.title}</p>}
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        placeholder="Describe what this service entails..."
                                        className="min-h-[120px] shadow-none bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all rounded-xl resize-none"
                                    />
                                    {errors.description && <p className="text-sm text-red-500 font-medium">{errors.description}</p>}
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="specialities" className="text-gray-700 font-medium">
                                        Specialities / Tech Stack
                                        <span className="ml-2 text-xs font-normal text-gray-400">Comma separated</span>
                                    </Label>
                                    <Input
                                        id="specialities"
                                        value={data.specialitiesInput}
                                        onChange={e => setData('specialitiesInput', e.target.value)}
                                        placeholder="e.g. React, Vue, Laravel, Figma"
                                        className="h-11 shadow-none bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all rounded-xl"
                                    />
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {specialities.map((tech, i) => (
                                            <span key={i} className="px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-100">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-400">These will appear as pill tags in the service card.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Visuals Card */}
                        <Card className="shadow-sm border-0 ring-1 ring-gray-100 bg-white rounded-2xl overflow-hidden group hover:ring-indigo-50 transition-all duration-300">
                            <CardContent className="p-8 space-y-6">
                                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-2">
                                    <div className="h-8 w-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
                                        <ImageIcon className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">Cover Image</h3>
                                </div>

                                <div className="space-y-4">
                                    <Label htmlFor="image" className="text-gray-700 font-medium">Image URL</Label>
                                    <FileUpload
                                        value={data.image}
                                        onChange={(file) => setData('image', file)}
                                    />
                                    <p className="text-sm text-gray-500">Upload a high-quality background image.</p>
                                    {errors.image && <p className="text-sm text-red-500 font-medium">{errors.image}</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Preview */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Preview</h3>
                                <div className="h-px flex-1 bg-gray-200 ml-3"></div>
                            </div>

                            <div className="bg-gray-900 rounded-3xl shadow-xl shadow-gray-900/20 overflow-hidden relative min-h-[400px] flex flex-col">
                                {/* Background Image */}
                                <div className="absolute inset-0 opacity-20">
                                    {data.image ? (
                                        <img
                                            src={typeof data.image === 'string' ? data.image : (data.image instanceof File ? URL.createObjectURL(data.image) : "")}
                                            alt="Preview"
                                            className="w-full h-full object-cover grayscale"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "";
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-800" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                                </div>

                                <div className="relative z-10 p-8 flex flex-col justify-between flex-1 h-full">
                                    {/* Header */}
                                    <div className="flex justify-between items-start">
                                        <span className="font-mono text-xl text-indigo-400">01</span>
                                        <ArrowUpRight className="w-6 h-6 text-white rotate-45" />
                                    </div>

                                    {/* Content */}
                                    <div className="mt-auto">
                                        <h3 className="font-serif text-3xl text-white mb-4">
                                            {data.title || "Service Title"}
                                        </h3>

                                        <div className="space-y-6">
                                            <p className="text-gray-300 leading-relaxed text-sm">
                                                {data.description || "Service description will appear here..."}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {specialities.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-sm border border-white/20"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {specialities.length === 0 && (
                                                    <span className="text-xs text-gray-500 italic">Tags will appear here</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100/50 rounded-2xl p-5">
                                <h4 className="text-indigo-900 font-semibold mb-1 text-sm">Preview Note</h4>
                                <p className="text-indigo-700/80 text-xs leading-relaxed">
                                    This preview shows the "Active/Expanded" state of the service card as it appears on the public site.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

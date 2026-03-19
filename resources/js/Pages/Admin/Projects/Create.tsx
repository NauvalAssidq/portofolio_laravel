import React, { FormEvent } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { ArrowLeft, Loader2, Save, ImageIcon, Globe, Calendar, Tag as TagIcon, X } from "lucide-react";

export default function Create({ auth }: { auth: any }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        category: "",
        year: new Date().getFullYear().toString(),
        image: null as File | null,
        link: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.projects.store'));
    };

    return (
        <AdminLayout user={auth.user} title="New Project">
            <Head title="New Project" />

            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto pb-20">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <Link href={route('admin.projects.index')}>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-white hover:shadow-sm">
                                <ArrowLeft className="h-5 w-5 text-gray-600" />
                            </Button>
                        </Link>
                        <div>
                            <h2 className="text-2xl font-serif text-gray-900 leading-tight">Add New Project</h2>
                            <p className="text-sm text-gray-500 hidden sm:block">Create a new entry for your portfolio showcase.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <Link href={route('admin.projects.index')}>
                            <Button variant="ghost" type="button" className="text-gray-500 hover:text-gray-900 rounded-full">Cancel</Button>
                        </Link>
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
                                    Publish
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Form Fields */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Essentials Card */}
                        <Card className="shadow-sm border-0 ring-1 ring-gray-100 bg-white rounded-2xl overflow-hidden group hover:ring-indigo-50 transition-all duration-300">
                            <CardContent className="p-8 space-y-6">
                                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-2">
                                    <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <TagIcon className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">Essentials</h3>
                                </div>

                                <div className="space-y-4">
                                    <Label htmlFor="title" className="text-gray-700 font-medium">Project Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="e.g. Fintech Dashboard Redesign"
                                        className="h-12 text-lg shadow-none bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all rounded-xl"
                                    />
                                    {errors.title && <p className="text-sm text-red-500 font-medium">{errors.title}</p>}
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="category" className="text-gray-700 font-medium">Category</Label>
                                        <Input
                                            id="category"
                                            value={data.category}
                                            onChange={e => setData('category', e.target.value)}
                                            placeholder="e.g. Web App"
                                            className="h-11 shadow-none bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all rounded-xl"
                                        />
                                        {errors.category && <p className="text-sm text-red-500 font-medium">{errors.category}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="year" className="text-gray-700 font-medium">Year</Label>
                                        <Input
                                            id="year"
                                            value={data.year}
                                            onChange={e => setData('year', e.target.value)}
                                            placeholder="YYYY"
                                            className="h-11 shadow-none bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all rounded-xl"
                                        />
                                        {errors.year && <p className="text-sm text-red-500 font-medium">{errors.year}</p>}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="link" className="text-gray-700 font-medium flex items-center justify-between">
                                        Project Link
                                        <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Optional</span>
                                    </Label>
                                    <Input
                                        id="link"
                                        value={data.link}
                                        onChange={e => setData('link', e.target.value)}
                                        placeholder="https://..."
                                        className="h-11 shadow-none bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all rounded-xl"
                                    />
                                    {errors.link && <p className="text-sm text-red-500 font-medium">{errors.link}</p>}
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
                                    <h3 className="text-lg font-medium text-gray-900">Visuals</h3>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-gray-700 font-medium">Project Thumbnail</Label>
                                    <FileUpload
                                        value={data.image}
                                        //@ts-ignore
                                        onChange={(file) => setData('image', file)}
                                    />
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

                            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 ring-1 ring-black/5 transform transition-all duration-500">
                                <div className="aspect-[4/3] rounded-2xl bg-gray-100 overflow-hidden relative shadow-inner group">
                                    {data.image ? (
                                        <>
                                            <img
                                                src={data.image instanceof File ? URL.createObjectURL(data.image) : (data.image || "")}
                                                alt="Preview"
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = ""; // Clear broken link
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <p className="text-white text-xs font-medium">Preview Mode</p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm ring-1 ring-gray-100">
                                                <ImageIcon className="w-8 h-8 text-gray-300" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-500">No image</p>
                                            <p className="text-xs text-gray-400 mt-1">Paste a URL to preview</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <h4 className="font-serif text-2xl text-gray-900 leading-tight">
                                                {data.title || "Project Title"}
                                            </h4>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                                <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide">
                                                    {data.category || "Design"}
                                                </span>
                                                <span className="text-gray-300">•</span>
                                                <span>{data.year || "2024"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {data.link && (
                                        <div className="pt-4 border-t border-gray-100 mt-4">
                                            <p className="text-xs text-gray-400 flex items-center gap-1.5">
                                                <Globe className="w-3 h-3" />
                                                External Link Active
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100/50 rounded-2xl p-5">
                                <h4 className="text-indigo-900 font-semibold mb-1 text-sm">Pro Tip</h4>
                                <p className="text-indigo-700/80 text-xs leading-relaxed">
                                    Great thumbnails drive engagement. Use high-contrast images with minimal text for the best results on the showcase page.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

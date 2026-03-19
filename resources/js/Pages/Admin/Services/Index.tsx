import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Briefcase,
    Plus,
    Pencil,
    Trash2,
    Search,
    Layers,
    Sparkles
} from "lucide-react";
import { DestructiveAlert } from "@/components/admin/DestructiveAlert";

interface Service {
    id: number;
    title: string;
    description: string;
    image: string;
    specialities: string[];
    created_at: string;
}

interface Props {
    auth: {
        user: any;
    };
    services: Service[];
}

export default function ServiceIndex({ auth, services }: Props) {
    const [search, setSearch] = useState("");

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <AdminLayout user={auth.user} title="Services">
            <Head title="Manage Services" />

            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-serif text-gray-900 tracking-tight">Service Offerings</h2>
                        <p className="text-gray-500">Manage the services you offer to clients.</p>
                    </div>
                    <Link href={route('admin.services.create')}>
                        <Button className="bg-gray-900 hover:bg-gray-800 text-white shadow-none rounded-full px-6">
                            <Plus className="w-4 h-4 mr-2" />
                            New Service
                        </Button>
                    </Link>
                </div>

                {/* Search & Filter */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search services by title or description..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 bg-white border-gray-200 shadow-none rounded-xl focus:ring-gray-900 focus:border-gray-900 transition-all"
                    />
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
                    {filteredServices.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Layers className="w-8 h-8 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
                            <p className="text-gray-500 max-w-sm mb-6">
                                {search ? "Try adjusting your search terms to find what you're looking for." : "Start distinguishing your expertise by adding your first service offering."}
                            </p>
                            {!search && (
                                <Link href={route('admin.services.create')}>
                                    <Button className="rounded-full shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Service
                                    </Button>
                                </Link>
                            )}
                        </div>
                    ) : (
                        filteredServices.map((service) => (
                            <Card key={service.id} className="group flex flex-col h-full overflow-hidden border-0 bg-white shadow-none ring-1 ring-gray-100 hover:ring-indigo-100 transition-all duration-300 rounded-2xl">
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-gray-900 shrink-0">
                                    {service.image ? (
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            <Briefcase className="w-12 h-12" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90" />

                                    {/* Overlay Actions */}
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                                        <Link href={route('admin.services.edit', service.id)}>
                                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 backdrop-blur hover:bg-white shadow-sm ring-1 ring-black/5">
                                                <Pencil className="w-3.5 h-3.5 text-gray-700" />
                                            </Button>
                                        </Link>

                                        <DestructiveAlert
                                            title="Delete service?"
                                            description="This action cannot be undone. This service will be permanently removed."
                                            actionLabel="Delete"
                                            onConfirm={() => router.delete(route('admin.services.destroy', service.id), { preserveScroll: true })}
                                            trigger={
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    className="h-8 w-8 rounded-full shadow-sm ring-1 ring-red-600/10"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            }
                                        />
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4 z-10">
                                        <h3 className="font-serif text-xl text-white leading-tight">
                                            {service.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Content */}
                                <CardContent className="p-5 flex flex-col flex-1 gap-4">
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                                            {service.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-50">
                                        {service.specialities && service.specialities.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md text-small font-medium text-gray-600">
                                                <Sparkles className="w-3 h-3 text-indigo-400" />
                                                {tag}
                                            </span>
                                        ))}
                                        {service.specialities && service.specialities.length > 3 && (
                                            <span className="bg-gray-50 px-2 py-1 rounded-md text-small font-medium text-gray-400">
                                                +{service.specialities.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

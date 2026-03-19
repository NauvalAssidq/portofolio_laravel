import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Briefcase,
    Plus,
    Pencil,
    Trash2,
    Search,
    ExternalLink,
    Calendar,
    Tag
} from "lucide-react";
import { DestructiveAlert } from "@/components/admin/DestructiveAlert";

interface Project {
    id: number;
    title: string;
    category: string;
    year: string;
    image: string;
    link: string;
    created_at: string;
}

interface Props {
    auth: {
        user: any;
    };
    projects: Project[];
}

export default function ProjectIndex({ auth, projects }: Props) {
    const [search, setSearch] = useState("");

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.category.toLowerCase().includes(search.toLowerCase())
    );

    // handleDelete removed as it is now handled by DestructiveAlert inline

    return (
        <AdminLayout user={auth.user} title="Projects">
            <Head title="Manage Projects" />

            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-serif text-gray-900 tracking-tight">Showcase</h2>
                        <p className="text-gray-500">Manage your portfolio projects and case studies.</p>
                    </div>
                    <Link href={route('admin.projects.create')}>
                        <Button className="bg-gray-900 hover:bg-gray-800 text-white shadow-none rounded-full px-6">
                            <Plus className="w-4 h-4 mr-2" />
                            New Project
                        </Button>
                    </Link>
                </div>

                {/* Search & Filter */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search projects by title or category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 bg-white border-gray-200 shadow-none rounded-xl focus:ring-gray-900 focus:border-gray-900 transition-all"
                    />
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProjects.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Briefcase className="w-8 h-8 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
                            <p className="text-gray-500 max-w-sm mb-6">
                                {search ? "Try adjusting your search terms to find what you're looking for." : "Showcase your best work by adding your first portfolio project."}
                            </p>
                            {!search && (
                                <Link href={route('admin.projects.create')}>
                                    <Button className="rounded-full shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Project
                                    </Button>
                                </Link>
                            )}
                        </div>
                    ) : (
                        filteredProjects.map((project) => (
                            <Card key={project.id} className="group overflow-hidden border-0 bg-white shadow-none ring-1 ring-gray-100 hover:ring-indigo-100 transition-all duration-300 rounded-2xl">
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <Briefcase className="w-12 h-12" />
                                        </div>
                                    )}

                                    {/* Overlay Actions */}
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <Link href={route('admin.projects.edit', project.id)}>
                                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 backdrop-blur hover:bg-white shadow-sm ring-1 ring-black/5">
                                                <Pencil className="w-3.5 h-3.5 text-gray-700" />
                                            </Button>
                                        </Link>

                                        <DestructiveAlert
                                            title="Delete project?"
                                            description="This action cannot be undone. This project will be permanently removed."
                                            actionLabel="Delete"
                                            onConfirm={() => router.delete(route('admin.projects.destroy', project.id), { preserveScroll: true })}
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
                                </div>

                                {/* Content */}
                                <CardContent className="p-5 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-serif text-xl text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                                                {project.title}
                                            </h3>
                                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 font-medium uppercase tracking-wide">
                                                <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                                    <Tag className="w-3 h-3 text-indigo-500" />
                                                    {project.category}
                                                </span>
                                                <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                                    <Calendar className="w-3 h-3 text-indigo-500" />
                                                    {project.year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="p-5 pt-0">
                                    {project.link ? (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs font-semibold text-gray-400 hover:text-indigo-600 flex items-center gap-1.5 transition-colors group/link"
                                        >
                                            <ExternalLink className="w-3 h-3 group-hover/link:underline" />
                                            View Live Project
                                        </a>
                                    ) : (
                                        <span className="text-xs font-medium text-gray-300 cursor-not-allowed">
                                            No link available
                                        </span>
                                    )}
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

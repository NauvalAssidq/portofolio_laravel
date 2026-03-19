import React, { useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Briefcase,
    Settings,
    LogOut,
    Layers,
    DollarSign,
    Home,
    Award
} from "lucide-react";
import { router } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";




import { SettingsDialog } from "@/components/admin/SettingsDialog";
import { DestructiveAlert } from "@/components/admin/DestructiveAlert";
import { useState } from "react";

// ... AppSidebar and imports ...

export default function AdminLayout({ children, user, title = "Dashboard" }: { children: React.ReactNode, user: any, title?: string }) {
    const { props } = usePage<any>();
    const { flash } = props;
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                className: "bg-white border-green-100 text-green-900",
                descriptionClassName: "text-green-700"
            });
        }
        if (flash?.error) {
            toast.error(flash.error, {
                className: "bg-white border-red-100 text-red-900",
                descriptionClassName: "text-red-700"
            });
        }
    }, [flash]);

    return (
        <SidebarProvider>
            <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} user={user} />

            <div className="flex min-h-screen w-full bg-white">
                <Sidebar>
                    <SidebarHeader className="border-b border-gray-100 p-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-600/20 transition-transform group-hover:scale-105">
                                <span className="text-white font-serif font-bold text-xl">B</span>
                            </div>
                            <div>
                                <h2 className="font-serif text-xl tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">Beethoval.dev</h2>
                                <p className="text-[11px] font-medium text-indigo-500 tracking-wider uppercase">Admin Panel</p>
                            </div>
                        </Link>
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Overview</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={usePage().url === '/admin'}>
                                            <Link href="/admin">
                                                <LayoutDashboard className="w-4 h-4" />
                                                <span>Dashboard</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="/">
                                                <Home className="w-4 h-4" />
                                                <span>View Public Site</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarGroup>
                            <SidebarGroupLabel>Content Management</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={usePage().url.startsWith('/admin/projects')}>
                                            <Link href="/admin/projects">
                                                <Briefcase className="w-4 h-4" />
                                                <span>Projects</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={usePage().url.startsWith('/admin/services')}>
                                            <Link href="/admin/services">
                                                <Layers className="w-4 h-4" />
                                                <span>Services</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={usePage().url.startsWith('/admin/pricing')}>
                                            <Link href="/admin/pricing">
                                                <DollarSign className="w-4 h-4" />
                                                <span>Pricing</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={usePage().url.startsWith('/admin/chooses')}>
                                            <Link href="/admin/chooses">
                                                <Award className="w-4 h-4" />
                                                <span>Why Choose Me</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarGroup>
                            <SidebarGroupLabel>Settings</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton onClick={() => setIsSettingsOpen(true)} className="cursor-pointer">
                                            <Settings className="w-4 h-4" />
                                            <span>Preferences</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter className="border-t border-gray-100 p-4">
                        <div className="flex items-center justify-between px-2">
                            <span className="font-serif text-sm text-gray-900">@Beethoval.dev</span>
                            <span className="text-[10px] font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">v1.0.0</span>
                        </div>
                    </SidebarFooter>
                </Sidebar>

                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="sticky top-0 z-10 border-b bg-white">
                        <div className="flex items-center gap-4 px-6 py-2">
                            <SidebarTrigger />
                            <div className="flex-1">
                                <h1 className="font-serif text-2xl tracking-tight">{title}</h1>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors outline-none">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-sm font-medium">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                                            {user.name.charAt(0)}
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem asChild>
                                        <Link href="/admin/settings" className="cursor-pointer">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Preferences</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DestructiveAlert
                                        title="Log out?"
                                        description="Are you sure you want to log out of your account?"
                                        actionLabel="Log out"
                                        onConfirm={() => router.post('/logout')}
                                        trigger={
                                            <div className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700 text-red-600 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Logout</span>
                                            </div>
                                        }
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="flex-1 overflow-auto p-6">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
            <Toaster position="top-right" richColors />
        </SidebarProvider>
    );
}

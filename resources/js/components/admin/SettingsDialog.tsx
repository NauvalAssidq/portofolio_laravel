import React from "react";
import { useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
}

export function SettingsDialog({ open, onOpenChange, user }: SettingsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl p-0 overflow-hidden gap-0 rounded-2xl border-0 shadow-2xl">
                <div className="flex h-[500px]">
                    {/* Sidebar */}
                    <Tabs defaultValue="profile" orientation="vertical" className="flex-row w-full h-full">
                        <div className="w-56 border-r border-gray-100 bg-gray-50/30 p-6 h-full">
                            <h2 className="mb-6 font-serif text-xl font-medium tracking-tight px-2 text-gray-900"><Preferences></Preferences></h2>
                            <TabsList className="flex flex-col w-full items-stretch h-auto bg-transparent gap-2 p-0">
                                <TabsTrigger
                                    value="profile"
                                    className="w-full justify-start gap-3 px-4 py-2.5 rounded-xl text-gray-600 font-medium transition-all data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm hover:bg-gray-100/50 hover:text-indigo-600"
                                >
                                    <User className="w-4 h-4" />
                                    Profile
                                </TabsTrigger>
                                <TabsTrigger
                                    value="password"
                                    className="w-full justify-start gap-3 px-4 py-2.5 rounded-xl text-gray-600 font-medium transition-all data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm hover:bg-gray-100/50 hover:text-indigo-600"
                                >
                                    <Lock className="w-4 h-4" />
                                    Password
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-8 overflow-y-auto bg-white">
                            <TabsContent value="profile" className="mt-0 space-y-8 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                                <div className="border-b border-gray-100 pb-5">
                                    <h3 className="text-2xl font-serif text-gray-900 leading-tight">Profile Details</h3>
                                    <p className="text-sm text-gray-500 mt-1">Manage your public profile information.</p>
                                </div>
                                <ProfileForm user={user} />
                            </TabsContent>

                            <TabsContent value="password" className="mt-0 space-y-8 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                                <div className="border-b border-gray-100 pb-5">
                                    <h3 className="text-2xl font-serif text-gray-900 leading-tight">Security</h3>
                                    <p className="text-sm text-gray-500 mt-1">Secure your account with a strong password.</p>
                                </div>
                                <PasswordForm />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function ProfileForm({ user }: { user: any }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.profile.update'), {
            onError: () => toast.error("Failed to update profile"),
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="space-y-3">
                <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Your name"
                    className="h-11 shadow-none bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all rounded-xl text-base"
                />
                {errors.name && <p className="text-xs font-medium text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-3">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="email@example.com"
                    className="h-11 shadow-none bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all rounded-xl text-base"
                />
                {errors.email && <p className="text-xs font-medium text-red-500">{errors.email}</p>}
            </div>
            <div className="flex justify-end pt-6 mt-4 border-t border-gray-100">
                <Button 
                    type="submit" 
                    disabled={processing}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 rounded-full px-6 transition-all hover:scale-105 h-10"
                >
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </div>
        </form>
    );
}

function PasswordForm() {
    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.password.update'), {
            onSuccess: () => {
                reset();
                // Toast handled globally
            },
            onError: () => toast.error("Failed to update password"),
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="space-y-3">
                <Label htmlFor="current_password" className="text-gray-700 font-medium">Current Password</Label>
                <Input
                    id="current_password"
                    type="password"
                    value={data.current_password}
                    onChange={(e) => setData('current_password', e.target.value)}
                    className="h-11 shadow-none bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all rounded-xl text-base"
                />
                {errors.current_password && <p className="text-xs font-medium text-red-500">{errors.current_password}</p>}
            </div>
            <div className="space-y-3">
                <Label htmlFor="password" className="text-gray-700 font-medium">New Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="h-11 shadow-none bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all rounded-xl text-base"
                />
                {errors.password && <p className="text-xs font-medium text-red-500">{errors.password}</p>}
            </div>
            <div className="space-y-3">
                <Label htmlFor="password_confirmation" className="text-gray-700 font-medium">Confirm Password</Label>
                <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    className="h-11 shadow-none bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all rounded-xl text-base"
                />
                {errors.password_confirmation && <p className="text-xs font-medium text-red-500">{errors.password_confirmation}</p>}
            </div>
            <div className="flex justify-end pt-6 mt-4 border-t border-gray-100">
                <Button 
                    type="submit" 
                    disabled={processing}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 rounded-full px-6 transition-all hover:scale-105 h-10"
                >
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Password
                </Button>
            </div>
        </form>
    );
}

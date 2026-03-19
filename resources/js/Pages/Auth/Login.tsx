import React, { FormEvent, useState, useEffect } from "react";
import { router, Head } from "@inertiajs/react";
import { ArrowRight, Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        router.post('/login', { email, password, remember }, {
            onError: (err) => {
                setErrors(err as any);
                setLoading(false);
                toast.error("Login Failed", {
                    description: "Please check your credentials and try again."
                });
            },
            onSuccess: () => { }
        });
    };

    const TRANSITION = "transition-all duration-700 ease-out";
    const HIDDEN = "opacity-0 translate-y-4";
    const VISIBLE = "opacity-100 translate-y-0";
    const INPUT_STYLE = "w-full bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none h-[52px] rounded-full px-6 text-base transition-colors duration-200";
    const BUTTON_STYLE = "group w-full inline-flex items-center justify-center gap-3 h-[52px] rounded-full text-base font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200";

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-[#fafafa] px-4 overflow-hidden">
            <Head title="Sign In" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

            <div className="w-full max-w-md z-10">
                <div className="text-center">
                    <h1
                        className={cn(
                            "font-serif text-4xl sm:text-5xl text-gray-900 mb-2 leading-[1.1]",
                            TRANSITION,
                            mounted ? VISIBLE : HIDDEN
                        )}
                        style={{ transitionDelay: '100ms' }}
                    >
                        Welcome <span className="text-indigo-600">Back.</span>
                    </h1>

                    <p
                        className={cn(
                            "text-lg text-gray-500 mb-10 max-w-xs mx-auto",
                            TRANSITION,
                            mounted ? VISIBLE : HIDDEN
                        )}
                        style={{ transitionDelay: '200ms' }}
                    >
                        Sign in to manage your stunning apps & websites.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className={cn(
                            "flex flex-col gap-4 max-w-sm mx-auto",
                            TRANSITION,
                            mounted ? VISIBLE : HIDDEN
                        )}
                        style={{ transitionDelay: '300ms' }}
                    >
                        {/* Email Input */}
                        <div className="group relative">
                            <Mail className={cn(
                                "absolute left-6 top-[16px] h-5 w-5 pointer-events-none transition-colors",
                                errors.email ? "text-red-500" : "text-gray-400"
                            )} />
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={cn(
                                    INPUT_STYLE,
                                    "pl-14",
                                    errors.email && "border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-200 placeholder:text-red-300"
                                )}
                                required
                                autoFocus
                            />
                            {errors.email && (
                                <p className="mt-2 ml-4 text-xs font-medium text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1 fade-in">
                                    <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="group relative">
                            <Lock className={cn(
                                "absolute left-6 top-[16px] h-5 w-5 pointer-events-none transition-colors",
                                errors.password ? "text-red-500" : "text-gray-400"
                            )} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={cn(
                                    INPUT_STYLE,
                                    "pl-14 pr-14",
                                    errors.password && "border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-200 placeholder:text-red-300"
                                )}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-6 top-[10px] text-gray-400 hover:text-gray-600 transition-colors"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {errors.password && (
                                <p className="mt-2 ml-4 text-xs font-medium text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1 fade-in">
                                    <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me and Forgot Password */}
                        <div className="flex items-center justify-between px-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-5 h-5 rounded border border-gray-200 bg-white transition-all peer-checked:bg-indigo-600 peer-checked:border-indigo-600 group-hover:border-indigo-400" />
                                    <svg
                                        className="absolute w-3.5 h-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100 left-[3px] top-[3px]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    >
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Remember me</span>
                            </label>
                            <a
                                href="#"
                                className="text-sm font-small text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={cn(BUTTON_STYLE, loading && "opacity-80 cursor-not-allowed")}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div
                        className={cn(
                            "mt-12",
                            TRANSITION,
                            mounted ? VISIBLE : HIDDEN
                        )}
                        style={{ transitionDelay: '400ms' }}
                    >
                        <a href="/" className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors">
                            <ArrowRight size={14} className="rotate-180 transition-transform group-hover:-translate-x-1" />
                            <span>Return to Home</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fafafa] to-transparent z-0" />
            <Toaster position="top-center" richColors />
        </section>
    );
}
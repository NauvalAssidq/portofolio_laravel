import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Layers, DollarSign, Award } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DashboardProps {
    user: {
        name: string;
        email: string;
    };
    projectsCount?: number;
    servicesCount?: number;
    pricingCount?: number;
    choosesCount?: number;
    visitorStats?: { date: string; count: number }[];
}

export default function Dashboard({ user, projectsCount = 0, servicesCount = 0, pricingCount = 0, choosesCount = 0, visitorStats = [] }: DashboardProps) {
    return (
        <AdminLayout user={user} title="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                {/* Welcome Section */}
                <Card className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white border border-indigo-400 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-2xl">Welcome back, {user.name}! 👋</CardTitle>
                        <CardDescription className="text-indigo-100">
                            Here's what's happening with your portfolio today.
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* Stats Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-2 hover:border-indigo-300 transition-colors shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Total Projects
                            </CardTitle>
                            <Briefcase className="w-4 h-4 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{projectsCount}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                Showcase projects
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-indigo-300 transition-colors shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Active Services
                            </CardTitle>
                            <Layers className="w-4 h-4 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{servicesCount}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                Services listed
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-indigo-300 transition-colors shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Pricing Plans
                            </CardTitle>
                            <DollarSign className="w-4 h-4 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{pricingCount}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                Available packages
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-indigo-300 transition-colors shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Selling Points
                            </CardTitle>
                            <Award className="w-4 h-4 text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{choosesCount}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                "Why Me" reasons
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Visitor Analytics Chart */}
                <VisitorChart data={visitorStats} />

                {/* Quick Actions */}
                <Card className="shadow-none">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Manage your portfolio content</CardDescription>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href={route('admin.projects.index')}>
                            <Button className="h-24 w-full flex flex-col gap-2" variant="outline">
                                <Briefcase className="w-6 h-6" />
                                <span>Manage Projects</span>
                            </Button>
                        </Link>
                        <Link href={route('admin.services.index')}>
                            <Button className="h-24 w-full flex flex-col gap-2" variant="outline">
                                <Layers className="w-6 h-6" />
                                <span>Manage Services</span>
                            </Button>
                        </Link>
                        <Link href={route('admin.pricing.index')}>
                            <Button className="h-24 w-full flex flex-col gap-2" variant="outline">
                                <DollarSign className="w-6 h-6" />
                                <span>Manage Pricing</span>
                            </Button>
                        </Link>
                        <Link href={route('admin.chooses.index')}>
                            <Button className="h-24 w-full flex flex-col gap-2" variant="outline">
                                <Award className="w-6 h-6" />
                                <span>Why Choose Me</span>
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}

const chartConfig = {
    visitors: {
        label: "Visitors",
        color: "#6366f1", // Indigo 500
    },
} satisfies ChartConfig;

function VisitorChart({ data }: { data: { date: string; count: number }[] }) {
    const [timeRange, setTimeRange] = React.useState("90d");

    const filteredData = data.filter((item) => {
        const date = new Date(item.date);
        const now = new Date();
        let daysToSubtract = 90;
        if (timeRange === "30d") {
            daysToSubtract = 30;
        } else if (timeRange === "7d") {
            daysToSubtract = 7;
        }
        const startDate = new Date(now);
        startDate.setDate(now.getDate() - daysToSubtract);
        return date >= startDate;
    });

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Visitor Trends</CardTitle>
                    <CardDescription>
                        Showing unique daily visitors
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-visitors)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-visitors)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="count"
                            type="natural"
                            fill="url(#fillVisitors)"
                            fillOpacity={0.4}
                            stroke="var(--color-visitors)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

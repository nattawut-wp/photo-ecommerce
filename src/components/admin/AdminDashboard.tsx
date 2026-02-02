"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import { Loader2, TrendingUp, ShoppingBag, Box, Landmark } from "lucide-react";

interface DashboardStats {
    totalSales: number;
    availableBalance: number;
    pendingOrders: number;
    totalOrders: number;
}
//TODO: Admin dashboard
export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/order/stripe-stats");
                if (res.data.success) {
                    setStats(res.data.stats);
                } else {
                    toast.error(res.data.message || "Failed to fetch dashboard stats");
                }
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
                toast.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-gray-500 text-sm animate-pulse">Fetching Stripe data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Sales */}
                <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
                    <p className="text-3xl font-bold mt-1 text-gray-900">
                        {formatPrice(stats?.totalSales || 0)}
                    </p>
                    <p className="text-xs text-green-600 mt-2 font-medium">
                        Synced with orders
                    </p>
                </div>

                {/* Available Balance (Stripe) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <Landmark className="w-6 h-6 text-indigo-600" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-full uppercase tracking-wider">Stripe</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Available Balance</h3>
                    <p className="text-3xl font-bold mt-1 text-gray-900">
                        {formatPrice(stats?.availableBalance || 0)}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Ready for payout</p>
                </div>

                {/* Pending Orders */}
                <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-amber-50 rounded-lg">
                            <ShoppingBag className="w-6 h-6 text-amber-600" />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Pending Orders</h3>
                    <p className="text-3xl font-bold mt-1 text-gray-900">
                        {stats?.pendingOrders || 0}
                    </p>
                    <p className="text-xs text-amber-600 mt-2 font-medium">Processing required</p>
                </div>

                {/* Total Orders */}
                <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                            <Box className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
                    <p className="text-3xl font-bold mt-1 text-gray-900">
                        {stats?.totalOrders || 0}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">All time successful</p>
                </div>
            </div>

            {/* Dashboard Footer / Status */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
                <div className="max-w-md mx-auto">
                    <p className="text-slate-600 font-semibold text-lg">Dashboard Connected</p>
                    <p className="text-sm text-slate-400 mt-2">
                        Stripe API is successfully fetching real-time balance and transaction data. 
                        Your sales figures are calculated from verified payments.
                    </p>
                </div>
            </div>
        </div>
    );
}
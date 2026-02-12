"use client";

import { useState, useEffect, use } from "react";
import { Order, OrderStatus } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, Truck, Package, ChevronLeft, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function OrderTracking({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise);
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/orders/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setOrder(data);
                }
            } catch (error) {
                console.error("Fetch order error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
        const interval = setInterval(fetchOrder, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, [params.id]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center">
            <div className="animate-pulse text-2xl font-bold text-orange-500">Loading Order...</div>
        </div>
    );

    if (!order) return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-black">Order Not Found</h1>
            <Link href="/" className="btn-primary">Back to Menu</Link>
        </div>
    );

    const steps: { status: OrderStatus; icon: any; label: string }[] = [
        { status: "Order Received", icon: Clock, label: "Order Received" },
        { status: "Preparing", icon: Package, label: "Preparing Meal" },
        { status: "Out for Delivery", icon: Truck, label: "Out for Delivery" },
        { status: "Delivered", icon: CheckCircle2, label: "Delivered" },
    ];

    const currentStep = steps.findIndex(s => s.status === order.status);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            <div className="max-w-4xl mx-auto pt-24 px-6">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 transition-colors mb-8 font-bold">
                    <ChevronLeft size={20} /> Back to Menu
                </Link>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-8 md:p-12 mb-8 bg-white dark:bg-slate-900 border-orange-500/20"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <p className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-2">Order Tracking</p>
                            <h1 className="text-4xl font-black">Order #{order.id}</h1>
                        </div>
                        <div className="bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-6 py-3 rounded-2xl font-black text-xl">
                            {order.status}
                        </div>
                    </div>

                    <div className="relative">
                        {/* Progress Line */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 hidden md:block" />
                        <motion.div
                            className="absolute top-1/2 left-0 h-1 bg-orange-500 -translate-y-1/2 hidden md:block"
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                            transition={{ duration: 1 }}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                            {steps.map((step, idx) => {
                                const Icon = step.icon;
                                const isCompleted = idx <= currentStep;
                                const isCurrent = idx === currentStep;

                                return (
                                    <div key={step.status} className="flex flex-col items-center">
                                        <motion.div
                                            animate={{
                                                scale: isCurrent ? [1, 1.1, 1] : 1,
                                                backgroundColor: isCompleted ? "#f97316" : "#e2e8f0",
                                            }}
                                            transition={{
                                                repeat: isCurrent ? Infinity : 0,
                                                duration: 2,
                                            }}
                                            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl transition-colors ${isCompleted ? "bg-orange-500 shadow-orange-500/20" : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                                                }`}
                                        >
                                            <Icon size={28} />
                                        </motion.div>
                                        <p className={`mt-4 font-bold text-center ${isCompleted ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                                            {step.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-8 bg-white dark:bg-slate-900"
                    >
                        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                            <User size={20} className="text-orange-500" /> Customer Details
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs uppercase font-bold text-slate-400">Name</p>
                                <p className="font-bold text-lg">{order.customer.name}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase font-bold text-slate-400">Phone</p>
                                <p className="font-bold text-lg">{order.customer.phone}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase font-bold text-slate-400">Address</p>
                                <p className="font-bold text-lg leading-snug">{order.customer.address}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-8 bg-white dark:bg-slate-900"
                    >
                        <h3 className="text-xl font-black mb-6">Order Summary</h3>
                        <div className="space-y-4 mb-6">
                            {order.items.map(item => (
                                <div key={item.id} className="flex justify-between items-center font-medium">
                                    <span className="text-slate-500">
                                        <span className="font-bold text-slate-900 dark:text-white">{item.quantity}x</span> {item.name}
                                    </span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 border-t dark:border-slate-800 flex justify-between items-center">
                            <span className="text-xl font-black">Total Paid</span>
                            <span className="text-2xl font-black text-orange-600">${order.total.toFixed(2)}</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}

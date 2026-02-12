"use client";

import { useState } from "react";
import { X, MapPin, Phone, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    total: number;
    onSubmit: (details: any) => void;
    isOrdering: boolean;
}

export default function CheckoutModal({
    isOpen,
    onClose,
    total,
    onSubmit,
    isOrdering,
}: CheckoutModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg glass-card p-8 bg-white/90 dark:bg-slate-900/90 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black">Checkout Details</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <User size={16} /> Full Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <MapPin size={16} /> Delivery Address
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="123 Gourmet St, Foodie City"
                                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 transition-all outline-none resize-none"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <Phone size={16} /> Phone Number
                                </label>
                                <input
                                    required
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div className="pt-4 border-t dark:border-slate-800">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-slate-500 font-bold">Total Amount</span>
                                    <span className="text-2xl font-black text-orange-600">${total.toFixed(2)}</span>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isOrdering}
                                    className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-70"
                                >
                                    {isOrdering ? (
                                        <>
                                            <Loader2 className="animate-spin" /> Placing Order...
                                        </>
                                    ) : (
                                        "Confirm Order"
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}


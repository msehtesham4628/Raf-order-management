"use client";

import { CartItem } from "@/types";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (id: string, q: number) => void;
    onRemove: (id: string) => void;
    total: number;
    onCheckout: () => void;
}

export default function CartDrawer({
    isOpen,
    onClose,
    items,
    onUpdateQuantity,
    onRemove,
    total,
    onCheckout,
}: CartDrawerProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-[70] flex flex-col"
                    >
                        <div className="p-6 border-b dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="text-orange-500" />
                                <h2 className="text-2xl font-bold">Your Cart</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                                    <ShoppingBag size={64} strokeWidth={1} />
                                    <p className="text-lg">Your cart is empty</p>
                                    <button
                                        onClick={onClose}
                                        className="text-orange-500 font-semibold hover:underline"
                                    >
                                        Browse amazing food
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-lg">{item.name}</h4>
                                                <button
                                                    onClick={() => onRemove(item.id)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center mt-3">
                                                <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-shadow"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-shadow"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-orange-600">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-slate-500 font-medium text-lg">Subtotal</span>
                                    <span className="text-3xl font-black">${total.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={onCheckout}
                                    className="btn-primary w-full py-4 text-lg shadow-orange-500/20"
                                >
                                    Proceed to Checkout
                                </button>
                                <p className="text-center text-xs text-slate-400 mt-4 uppercase tracking-widest font-bold">
                                    Delivery & Taxes calculated at checkout
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

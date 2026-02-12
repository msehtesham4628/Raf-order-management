"use client";

import { ShoppingCart, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
    cartCount: number;
    onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto glass-card flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-2">
                    <div className="bg-orange-500 p-2 rounded-xl text-white">
                        <UtensilsCrossed size={24} />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600">
                        GourmetDash
                    </span>
                </div>

                <button
                    onClick={onCartClick}
                    className="relative p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors group"
                >
                    <ShoppingCart size={24} className="group-hover:text-orange-500 transition-colors" />
                    {cartCount > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg"
                        >
                            {cartCount}
                        </motion.span>
                    )}
                </button>
            </div>
        </nav>
    );
}

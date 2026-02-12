"use client";

import { FoodItem } from "@/types";
import { Plus, Info } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface MenuCardProps {
    item: FoodItem;
    onAdd: (item: FoodItem) => void;
}

export default function MenuCard({ item, onAdd }: MenuCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-card overflow-hidden flex flex-col h-full group"
        >
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/90 px-3 py-1 rounded-full text-sm font-bold text-orange-600 shadow-sm backdrop-blur-md">
                    ${item.price.toFixed(2)}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                    {item.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow">
                    {item.description}
                </p>

                <button
                    onClick={() => onAdd(item)}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                >
                    <Plus size={18} />
                    Add to Cart
                </button>
            </div>
        </motion.div>
    );
}


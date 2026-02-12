"use client";

import { useState, useEffect } from "react";
import { FoodItem } from "@/types";
import { useCart } from "@/hooks/use-cart";
import Navbar from "@/components/Navbar";
import MenuCard from "@/components/MenuCard";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const [menu, setMenu] = useState<FoodItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const { cart, addToCart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then(setMenu);
  }, []);

  const handlePlaceOrder = async (customerDetails: any) => {
    setIsOrdering(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          customer: customerDetails,
          total: total,
        }),
      });

      if (response.ok) {
        const order = await response.json();
        clearCart();
        router.push(`/order/${order.id}`);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <main className="min-h-screen pb-20">
      <Navbar cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />

      <section className="pt-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            Craving something <span className="text-orange-500">extraordinary?</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Gourmet meals delivered to your doorstep. Fast, fresh, and exceptionally delicious.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menu.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <MenuCard item={item} onAdd={addToCart} />
            </motion.div>
          ))}
        </div>
      </section>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        total={total}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={total}
        onSubmit={handlePlaceOrder}
        isOrdering={isOrdering}
      />
    </main>
  );
}


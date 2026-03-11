"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeItem = (index: number) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  if (!mounted) return null;

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <section className="pt-32 pb-20 px-6 md:px-16 max-w-4xl mx-auto">
        <h1 className="font-black text-4xl md:text-5xl mb-12">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50 text-xl mb-8">Your cart is empty.</p>
            <Link href="/" className="border border-white px-8 py-4 font-bold hover:bg-white hover:text-black transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div>
            {cartItems.map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b border-white/10 py-6">
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-white/50 text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="flex items-center gap-6">
                  <p className="font-bold text-lg">${item.price}</p>
                  <button
                    onClick={() => removeItem(i)}
                    className="text-white/40 hover:text-white text-sm underline transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-8 mt-4">
              <p className="font-black text-2xl">Total: ${total}</p>
              <Link href="/checkout" className="bg-white text-black font-bold px-8 py-4 hover:bg-white/80 transition-colors">
                Checkout
              </Link>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", email: "", address: "", city: "", zip: "",
    card: "", expiry: "", cvv: "",
  });
  const [ordered, setOrdered] = useState(false);

  const handleSubmit = () => {
    localStorage.removeItem("cart");
    setOrdered(true);
    setTimeout(() => router.push("/"), 3000);
  };

  if (ordered) return (
    <main className="bg-black min-h-screen text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-black text-5xl mb-4">Order Placed! 🎉</h1>
        <p className="text-white/60 text-xl">Thanks for your order. Redirecting...</p>
      </div>
    </main>
  );

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <section className="pt-32 pb-20 px-6 md:px-16 max-w-2xl mx-auto">
        <h1 className="font-black text-4xl md:text-5xl mb-12">Checkout</h1>

        <div className="space-y-6">
          <h2 className="font-bold text-xl border-b border-white/10 pb-4">Shipping Info</h2>
          {["name", "email", "address", "city", "zip"].map((field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={(form as any)[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white"
            />
          ))}

          <h2 className="font-bold text-xl border-b border-white/10 pb-4 pt-4">Payment (Test)</h2>
          <input
            placeholder="Card Number (test: 4242 4242 4242 4242)"
            value={form.card}
            onChange={(e) => setForm({ ...form, card: e.target.value })}
            className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Expiry (MM/YY)"
              value={form.expiry}
              onChange={(e) => setForm({ ...form, expiry: e.target.value })}
              className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white"
            />
            <input
              placeholder="CVV"
              value={form.cvv}
              onChange={(e) => setForm({ ...form, cvv: e.target.value })}
              className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-white text-black font-black text-xl py-4 hover:bg-white/80 transition-colors mt-4"
          >
            Place Order
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
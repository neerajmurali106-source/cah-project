"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [done, setDone] = useState(false);

  const handleSubmit = () => {
    localStorage.setItem("user", JSON.stringify({ email: form.email, name: form.name }));
    setDone(true);
    setTimeout(() => router.push("/"), 2000);
  };

  if (done) return (
    <main className="bg-black min-h-screen text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-black text-5xl mb-4">{isLogin ? "Welcome back!" : "Account Created!"} 🎉</h1>
        <p className="text-white/60 text-xl">Redirecting...</p>
      </div>
    </main>
  );

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <section className="pt-32 pb-20 px-6 md:px-16 max-w-md mx-auto">
        <h1 className="font-black text-4xl md:text-5xl mb-12">
          {isLogin ? "Login" : "Register"}
        </h1>

        <div className="space-y-4">
          {!isLogin && (
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white"
            />
          )}
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-white text-black font-black text-xl py-4 hover:bg-white/80 transition-colors mt-4"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

          <p className="text-center text-white/50 text-sm pt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white underline ml-2"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
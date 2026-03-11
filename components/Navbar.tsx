"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

useEffect(() => {
  const updateCart = () => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      const cart = JSON.parse(stored);
      const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(count);
    }
  };
  updateCart();
  window.addEventListener("storage", updateCart);
  return () => window.removeEventListener("storage", updateCart);
}, []);
  const [shopOpen, setShopOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <Link href="/" className="text-white font-black text-xl tracking-tight leading-none">
        Cards Against<br />Humanity
      </Link>

      {/* Right nav */}
      <div className="flex items-center gap-8">
        {/* Shop dropdown */}
        <div className="relative">
          <button
            className="text-white font-semibold text-lg flex items-center gap-1 hover:opacity-70 transition-opacity"
            onClick={() => { setShopOpen(!shopOpen); setAboutOpen(false); }}
          >
            Shop
            <svg className={`w-4 h-4 transition-transform ${shopOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {shopOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-black border border-white/20 py-2">
              <Link href="/products/more-cah" className="block px-4 py-2 text-white hover:bg-white hover:text-black transition-colors text-sm font-medium">
                More Cards Against Humanity
              </Link>
              <Link href="/products/more-cah" className="block px-4 py-2 text-white hover:bg-white hover:text-black transition-colors text-sm font-medium">
                Expansion Packs
              </Link>
              <Link href="/products/more-cah" className="block px-4 py-2 text-white hover:bg-white hover:text-black transition-colors text-sm font-medium">
                All Products
              </Link>
            </div>
          )}
        </div>

        {/* About dropdown */}
        <div className="relative">
          <button
            className="text-white font-semibold text-lg flex items-center gap-1 hover:opacity-70 transition-opacity"
            onClick={() => { setAboutOpen(!aboutOpen); setShopOpen(false); }}
          >
            About
            <svg className={`w-4 h-4 transition-transform ${aboutOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {aboutOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black border border-white/20 py-2">
              <Link href="#about" className="block px-4 py-2 text-white hover:bg-white hover:text-black transition-colors text-sm font-medium">
                About the Game
              </Link>
              <Link href="#about" className="block px-4 py-2 text-white hover:bg-white hover:text-black transition-colors text-sm font-medium">
                Contact
              </Link>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link href="/cart" className="text-white font-semibold text-lg hover:opacity-70 transition-opacity flex items-center gap-1">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
  <span className="text-sm font-bold">{cartCount}</span>
</Link>
      </div>
    </nav>
  );    
}
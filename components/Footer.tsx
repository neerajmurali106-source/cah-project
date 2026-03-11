export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10 py-16 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
        <div className="md:col-span-2">
          <h3 className="font-black text-2xl mb-4">Cards Against Humanity</h3>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm">
            A party game for horrible people. Made in the USA.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-4 text-white/40">Shop</h4>
          <ul className="space-y-2">
            {["All Products", "Expansion Packs", "New Releases"].map((item) => (
              <li key={item}>
                <a href="/products/more-cah" className="text-white/60 hover:text-white text-sm transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-4 text-white/40">Info</h4>
          <ul className="space-y-2">
            {["About", "Contact", "FAQ", "Privacy Policy"].map((item) => (
              <li key={item}>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-sm">
          © {new Date().getFullYear()} Cards Against Humanity, LLC. All rights reserved.
        </p>
        <p className="text-white/30 text-sm">Made with ♥ for horrible people.</p>
      </div>
    </footer>
  );
}
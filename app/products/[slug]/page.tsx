"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const productData: Record<string, {
  title: string;
  price: number;
  description: string;
  details: string;
  bulletPoints: string[];
  cardCount: string;
  bgColor: string;
}> = {
  "cards-against-humanity": {
    title: "Cards Against Humanity",
    price: 29,
    description: "Cards Against Humanity is a party game for horrible people. Unlike most of the party games you've played before, Cards Against Humanity is as despicable and awkward as you and your friends.",
    details: "The game is simple. Each round, one player asks a question from a black card, and everyone else answers with their funniest white card.",
    bulletPoints: [
      "Contains 500 white cards and 100 black cards for maximum replayability.",
      "Includes a booklet of sensible game rules and some not-so-sensible ones.",
      "For 4-20+ players. Ages 17 and up. Probably.",
    ],
    cardCount: "600 cards",
    bgColor: "from-gray-800 to-gray-900",
  },
  "more-cah": {
    title: "More Cards Against Humanity",
    price: 10,
    description: "More Cards Against Humanity comes with 600 expansion cards that instantly double the replayability and girth of your deck.",
    details: "It's got all the best jokes from our old expansion packs, plus 50 cards we've never printed before.",
    bulletPoints: [
      "If you've never bought an expansion and you want more Cards Against Humanity, buy this.",
      "It's got all the best jokes from our old Red Box, Blue Box, and Green Box expansions, plus 50 cards we've never printed before.",
      "Shiny!",
    ],
    cardCount: "600 cards",
    bgColor: "from-gray-100 to-gray-300",
  },
  "green-box": {
    title: "The Green Box",
    price: 20,
    description: "The Green Box contains 300 all-new cards you can add to your game of Cards Against Humanity.",
    details: "For a greener, more isolated tomorrow.",
    bulletPoints: [
      "300 all-new cards to mix into your game.",
      "Requires the main Cards Against Humanity game to play.",
      "For horrible people who want to be greener.",
    ],
    cardCount: "300 cards",
    bgColor: "from-green-800 to-green-950",
  },
  "blue-box": {
    title: "The Blue Box",
    price: 20,
    description: "The Blue Box contains 300 sad, blue cards you can add to your game of Cards Against Humanity.",
    details: "300 sad, blue cards for your sad, blue game.",
    bulletPoints: [
      "300 all-new cards to mix into your game.",
      "Requires the main Cards Against Humanity game to play.",
      "Sadder and bluer than ever before.",
    ],
    cardCount: "300 cards",
    bgColor: "from-blue-800 to-blue-950",
  },
};

const relatedProducts = [
  { title: "Cards Against Humanity", price: "$29.00", slug: "cards-against-humanity", description: "The original party game for horrible people." },
  { title: "More Cards Against Humanity", price: "$10.00", slug: "more-cah", description: "90 cards you can mix into your game." },
  { title: "The Green Box", price: "$20.00", slug: "green-box", description: "300 cards for a greener, more isolated tomorrow." },
  { title: "The Blue Box", price: "$20.00", slug: "blue-box", description: "300 sad, blue cards for your sad, blue game." },
];

const plusPositions = [
  { top: "8%", left: "10%" },
  { top: "15%", right: "8%" },
  { top: "35%", right: "5%" },
  { top: "55%", left: "3%" },
  { top: "70%", right: "10%" },
  { bottom: "15%", left: "45%" },
  { top: "45%", right: "2%" },
];

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = productData[slug] ?? productData["more-cah"];

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    const cartItem = { title: product.title, price: product.price, quantity: 1 };
    const existing = localStorage.getItem("cart");
    const cart = existing ? JSON.parse(existing) : [];
    const found = cart.findIndex((item: any) => item.title === cartItem.title);
    if (found >= 0) {
      cart[found].quantity += 1;
    } else {
      cart.push(cartItem);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isLight = slug === "more-cah";

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />

      {plusPositions.map((pos, i) => (
        <span
          key={i}
          className="fixed text-white/40 text-2xl font-bold pointer-events-none select-none"
          style={{ ...pos, zIndex: 0 }}
        >
          +
        </span>
      ))}

      {/* Product Section */}
      <section className="relative z-10 min-h-screen flex items-center pt-20 pb-16 px-6 md:px-16">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left: Image */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              <button className="w-20 h-20 border-2 border-white rounded-lg overflow-hidden flex items-center justify-center">
                <div className="bg-white/10 w-full h-full flex items-center justify-center">
                  <div className={`w-10 h-14 rounded flex items-end p-1 bg-gradient-to-br ${product.bgColor}`}>
                    <span className="text-white text-[5px] font-bold leading-tight">{product.title}</span>
                  </div>
                </div>
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-64 md:w-80">
                <div
                  className={`relative bg-gradient-to-br ${product.bgColor} rounded-lg shadow-2xl overflow-hidden`}
                  style={{ aspectRatio: "3/4" }}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center ${isLight ? "bg-gray-300" : "bg-black/30"}`}>
                    <p
                      className={`text-xs font-bold rotate-180 whitespace-nowrap ${isLight ? "text-black" : "text-white"}`}
                      style={{ writingMode: "vertical-rl" }}
                    >
                      {product.cardCount} for horrible people.
                    </p>
                  </div>
                  <div className="ml-8 h-full flex flex-col justify-between p-6">
                    <p className={`font-black text-3xl md:text-4xl leading-tight ${isLight ? "text-black" : "text-white"}`}>
                      {product.title.split(" ").map((word, i) => (
                        <span key={i}>{word}<br /></span>
                      ))}
                    </p>
                    <div className={`border-t pt-4 ${isLight ? "border-black/20" : "border-white/20"}`}>
                      <p className={`text-sm font-semibold ${isLight ? "text-black/70" : "text-white/70"}`}>
                        {product.cardCount}<br />for horrible people.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-black leading-tight">{product.title}</h1>
            <p className="text-white text-base md:text-lg leading-relaxed">{product.description}</p>
            <p className="text-white/70 text-base leading-relaxed">{product.details}</p>
            <ul className="space-y-3">
              {product.bulletPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80 text-base leading-relaxed">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-white flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            <button
              onClick={handleAddToCart}
              className={`mt-4 w-full md:w-auto flex items-center justify-between gap-8 px-8 py-4 rounded-full border-2 border-white text-white font-bold text-lg transition-all duration-300 hover:bg-white hover:text-black ${
                added ? "bg-white text-black" : "bg-transparent"
              }`}
            >
              <span>{added ? "Added!" : "Add to Cart"}</span>
              <span className="font-black">${product.price}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="relative z-10 bg-black border-t border-white/10 py-20 px-6 md:px-16">
        <h2 className="text-white font-black text-3xl md:text-4xl mb-12">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.filter(p => p.slug !== slug).map((p, i) => (
            <a
              key={i}
              href={`/products/${p.slug}`}
              className="group border border-white/10 rounded-2xl p-6 hover:border-white/40 transition-all duration-300 cursor-pointer"
            >
              <div className="w-full aspect-square rounded-xl bg-white/5 border border-white/10 mb-5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <div className="w-16 h-20 bg-white rounded-lg flex items-end p-2 shadow-lg">
                  <span className="text-black text-[8px] font-bold leading-tight">{p.title}</span>
                </div>
              </div>
              <h3 className="text-white font-black text-lg mb-2">{p.title}</h3>
              <p className="text-white/50 text-sm mb-4 leading-relaxed">{p.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-lg">{p.price}</span>
                <span className="text-white/60 hover:text-white text-sm font-semibold underline transition-colors">View →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
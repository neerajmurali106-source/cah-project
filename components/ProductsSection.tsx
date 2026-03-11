"use client";
import Link from "next/link";

const products = [
  {
    id: 1,
    title: "Cards Against Humanity",
    description: "The original party game for horrible people.",
    price: "$29.00",
    slug: "cards-against-humanity",
    bgColor: "bg-black",
    textColor: "text-white",
    borderColor: "border-white/20",
  },
  {
    id: 2,
    title: "More Cards Against Humanity",
    description: "90 cards you can mix into your game.",
    price: "$10.00",
    slug: "more-cah",
    bgColor: "bg-white",
    textColor: "text-black",
    borderColor: "border-black/10",
  },
  {
    id: 3,
    title: "The Green Box",
    description: "300 cards for a greener, more isolated tomorrow.",
    price: "$20.00",
    slug: "green-box",
    bgColor: "bg-black",
    textColor: "text-white",
    borderColor: "border-white/20",
  },
  {
    id: 4,
    title: "The Blue Box",
    description: "300 sad, blue cards for your sad, blue game.",
    price: "$20.00",
    slug: "blue-box",
    bgColor: "bg-white",
    textColor: "text-black",
    borderColor: "border-black/10",
  },
];

export default function ProductsSection() {
  return (
    <section className="bg-black py-24 px-6 md:px-16" id="products">
      <h2 className="text-white font-black text-4xl md:text-5xl mb-16 tracking-tight">Shop</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className={`group block rounded-2xl border ${product.bgColor} ${product.textColor} ${product.borderColor} p-6 hover:scale-105 transition-transform duration-300`}
          >
            {/* Card visual */}
            <div
              className={`w-full aspect-[3/4] rounded-xl mb-6 flex items-end p-4 border ${product.borderColor}`}
            >
              <p className="font-bold text-lg leading-tight">{product.title}</p>
            </div>

            <h3 className="font-black text-xl mb-2">{product.title}</h3>
            <p className={`text-sm mb-4 ${product.textColor === "text-white" ? "text-white/60" : "text-black/60"}`}>
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">{product.price}</span>
              <span
                className={`text-sm font-semibold underline group-hover:no-underline transition-all ${
                  product.textColor === "text-white" ? "text-white/80" : "text-black/80"
                }`}
              >
                View →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
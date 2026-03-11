"use client";

export default function AboutSection() {
  return (
    <section className="bg-white text-black py-24 px-6 md:px-16" id="about">
      <div className="max-w-3xl">
        <h2 className="font-black text-4xl md:text-6xl mb-8 leading-tight tracking-tight">
          A party game for horrible people.
        </h2>
        <p className="text-black/70 text-lg md:text-xl leading-relaxed mb-8">
          Cards Against Humanity is a party game for horrible people. Unlike most of the party games you've played before, Cards Against Humanity is as despicable and awkward as you and your friends.
        </p>
        <p className="text-black/70 text-lg md:text-xl leading-relaxed mb-12">
          The game is simple. Each round, one player asks a question from a black card, and everyone else answers with their funniest white card.
        </p>
        <a
          href="/products/more-cah"
          className="inline-block bg-black text-white font-bold px-8 py-4 text-lg hover:bg-black/80 transition-colors"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
}
// src/pages/ShopPage.jsx
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

const shopContent = {
    title: "EastCulture Practice Shop",
    subtitle:
        "Carefully selected clothing and tools to support your Tai Chi and traditional arts practice.",
    intro:
        "Every item here is chosen to match the calm, grounded feeling of real practice. You don't need many things, but the right clothing, shoes and tools can help you enter a focused state more easily.",
    note:
        "These products are for personal practice, wellness and cultural enjoyment only. They do not replace professional medical, therapeutic or safety equipment.",
    products: [
        {
            id: "uniform-silk-white",
            name: "Silk-Blend Tai Chi Uniform (White)",
            tag: "Recommended for routines",
            price: "From $89",
            short:
                "Soft, flowing uniform designed for Tai Chi forms and slow standing practice.",
            bullets: [
                "Lightweight silk-blend fabric, moves with your body",
                "Loose cut around shoulders and hips for full range of motion",
                "Hidden buttons and simple lines for a clean, calm look",
            ],
            image: "/images/Silk-Blend Tai Chi Uniform (White).jpg",
        },
        {
            id: "uniform-cotton-black",
            name: "Cotton Tai Chi Uniform (Ink Black)",
            tag: "Beginner friendly",
            price: "From $69",
            short:
                "Comfortable cotton uniform, ideal for daily practice and standing meditation.",
            bullets: [
                "Breathable cotton, easy to wash and maintain",
                "Slightly thicker fabric for outdoor practice",
                "Minimalist design that matches the EastCulture style",
            ],
            image: "/images/Cotton Tai Chi Uniform (Ink Black).jpg",
        },
        {
            id: "sword-wood",
            name: "Beginner Wooden Tai Chi Sword",
            tag: "Safe for beginners",
            price: "From $49",
            short:
                "A lightweight wooden sword for learning basic Tai Chi sword forms safely.",
            bullets: [
                "Balanced weight for learning correct structure",
                "Rounded tip for safer solo practice",
                "Suitable for indoor training and small spaces",
            ],
            image: "/images/Beginner Wooden Tai Chi Sword.jpg",
        },
        {
            id: "sword-steel",
            name: "Polished Steel Tai Chi Sword",
            tag: "For advanced practice",
            price: "From $129",
            short:
                "Traditional flexible steel sword for practitioners who already know basic forms.",
            bullets: [
                "Flexible blade with clear sound when issuing power",
                "Classic wooden handle with simple guard",
                "Recommended after you are comfortable with wooden sword practice",
            ],
            image: "/images/Polished Steel Tai Chi Sword.jpg",
        },
        {
            id: "incense-set",
            name: "Meditation Incense & Burner Set",
            tag: "For quiet practice",
            price: "From $39",
            short:
                "A small incense burner with gentle, natural incense for meditation and standing practice.",
            bullets: [
                "Classic style incense burner inspired by temple design",
                "Natural scented incense sticks, not overly strong",
                "Use to mark the start and end of your practice ritual",
            ],
            image: "/images/Meditation Incense & Burner Set.jpg",
        },
        {
            id: "bracelet-sandalwood",
            name: "Handcrafted Sandalwood Bracelet",
            tag: "Cultural accessory",
            price: "From $29",
            short:
                "Warm, natural sandalwood beads to accompany your study of Tai Chi and traditional culture.",
            bullets: [
                "Hand-strung beads with a simple, grounded feeling",
                "Pairs well with both practice clothes and daily wear",
                "Can be used as a gentle reminder to breathe and relax during the day",
            ],
            image: "/images/Handcrafted Sandalwood Bracelet.jpg",
        },
    ],
};

export default function ShopPage({ onBackHome }) {
    return (
        <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-12">
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="mb-10 space-y-3"
            >
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Practice shop
                </div>

                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                    {shopContent.title}
                </h1>

                <p className="text-sm text-slate-700 md:text-base">
                    {shopContent.subtitle}
                </p>

                <p className="max-w-3xl text-xs text-slate-600 md:text-sm leading-6">
                    {shopContent.intro}
                </p>

                <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[11px] text-amber-900/90 md:text-xs">
                    {shopContent.note}
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="grid gap-6 md:grid-cols-2"
            >
                {shopContent.products.map((item, index) => (
                    <motion.article
                        key={item.id}
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.6, delay: index * 0.04 }}
                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition flex flex-col"
                    >
                        <div className="relative h-52 w-full overflow-hidden md:h-56">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/10 to-transparent" />

                            <div className="absolute left-4 bottom-3 flex items-center gap-2 text-[11px]">
                <span className="rounded-full border border-slate-200 bg-white/95 px-3 py-1 text-slate-700">
                  {item.tag}
                </span>
                                <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-slate-900 font-semibold">
                  {item.price}
                </span>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col p-5 md:p-6">
                            <h2 className="mb-1 text-base font-semibold text-slate-900 md:text-lg">
                                {item.name}
                            </h2>

                            <p className="mb-3 text-xs text-slate-700 md:text-sm leading-6">
                                {item.short}
                            </p>

                            <ul className="mb-4 flex-1 space-y-1.5 text-[11px] text-slate-600 md:text-xs leading-6">
                                {item.bullets.map((line, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="mt-[2px] text-slate-400">•</span>
                                        <span>{line}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex justify-end text-[11px] md:text-xs">
                                <button className="rounded-full border border-slate-300 bg-white px-3 py-1 font-semibold text-slate-800 hover:border-slate-400 hover:bg-slate-50 transition">
                                    Save to wishlist
                                </button>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </motion.section>
        </main>
    );
}

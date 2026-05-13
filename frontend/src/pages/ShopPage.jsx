// src/pages/ShopPage.jsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

export default function ShopPage({ onBackHome }) {
    const { t } = useTranslation();

    const products = [
        {
            id: "uniform-silk-white",
            nameKey: "shop.products.silkWhite.name",
            tagKey: "shop.products.silkWhite.tag",
            priceKey: "shop.products.silkWhite.price",
            shortKey: "shop.products.silkWhite.short",
            bulletKeys: [
                "shop.products.silkWhite.bullet1",
                "shop.products.silkWhite.bullet2",
                "shop.products.silkWhite.bullet3",
            ],
            image: "/images/Silk-Blend Tai Chi Uniform (White).jpg",
        },
        {
            id: "uniform-cotton-black",
            nameKey: "shop.products.cottonBlack.name",
            tagKey: "shop.products.cottonBlack.tag",
            priceKey: "shop.products.cottonBlack.price",
            shortKey: "shop.products.cottonBlack.short",
            bulletKeys: [
                "shop.products.cottonBlack.bullet1",
                "shop.products.cottonBlack.bullet2",
                "shop.products.cottonBlack.bullet3",
            ],
            image: "/images/Cotton Tai Chi Uniform (Ink Black).jpg",
        },
        {
            id: "sword-wood",
            nameKey: "shop.products.swordWood.name",
            tagKey: "shop.products.swordWood.tag",
            priceKey: "shop.products.swordWood.price",
            shortKey: "shop.products.swordWood.short",
            bulletKeys: [
                "shop.products.swordWood.bullet1",
                "shop.products.swordWood.bullet2",
                "shop.products.swordWood.bullet3",
            ],
            image: "/images/Beginner Wooden Tai Chi Sword.jpg",
        },
        {
            id: "sword-steel",
            nameKey: "shop.products.swordSteel.name",
            tagKey: "shop.products.swordSteel.tag",
            priceKey: "shop.products.swordSteel.price",
            shortKey: "shop.products.swordSteel.short",
            bulletKeys: [
                "shop.products.swordSteel.bullet1",
                "shop.products.swordSteel.bullet2",
                "shop.products.swordSteel.bullet3",
            ],
            image: "/images/Polished Steel Tai Chi Sword.jpg",
        },
        {
            id: "incense-set",
            nameKey: "shop.products.incenseSet.name",
            tagKey: "shop.products.incenseSet.tag",
            priceKey: "shop.products.incenseSet.price",
            shortKey: "shop.products.incenseSet.short",
            bulletKeys: [
                "shop.products.incenseSet.bullet1",
                "shop.products.incenseSet.bullet2",
                "shop.products.incenseSet.bullet3",
            ],
            image: "/images/Meditation Incense & Burner Set.jpg",
        },
        {
            id: "bracelet-sandalwood",
            nameKey: "shop.products.bracelet.name",
            tagKey: "shop.products.bracelet.tag",
            priceKey: "shop.products.bracelet.price",
            shortKey: "shop.products.bracelet.short",
            bulletKeys: [
                "shop.products.bracelet.bullet1",
                "shop.products.bracelet.bullet2",
                "shop.products.bracelet.bullet3",
            ],
            image: "/images/Handcrafted Sandalwood Bracelet.jpg",
        },
    ];
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
                    {t('shop.practiceShop')}
                </div>

                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                    {t('shop.title')}
                </h1>

                <p className="text-sm text-slate-700 md:text-base">
                    {t('shop.subtitle')}
                </p>

                <p className="max-w-3xl text-xs text-slate-600 md:text-sm leading-6">
                    {t('shop.intro')}
                </p>

                <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[11px] text-amber-900/90 md:text-xs">
                    {t('shop.note')}
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="grid gap-6 md:grid-cols-2"
            >
                {products.map((item, index) => (
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
                                alt={t(item.nameKey)}
                                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/10 to-transparent" />

                            <div className="absolute left-4 bottom-3 flex items-center gap-2 text-[11px]">
                <span className="rounded-full border border-slate-200 bg-white/95 px-3 py-1 text-slate-700">
                  {t(item.tagKey)}
                </span>
                                <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-slate-900 font-semibold">
                  {t(item.priceKey)}
                </span>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col p-5 md:p-6">
                            <h2 className="mb-1 text-base font-semibold text-slate-900 md:text-lg">
                                {t(item.nameKey)}
                            </h2>

                            <p className="mb-3 text-xs text-slate-700 md:text-sm leading-6">
                                {t(item.shortKey)}
                            </p>

                            <ul className="mb-4 flex-1 space-y-1.5 text-[11px] text-slate-600 md:text-xs leading-6">
                                {item.bulletKeys.map((key, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="mt-[2px] text-slate-400">•</span>
                                        <span>{t(key)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex justify-end text-[11px] md:text-xs">
                                <button className="rounded-full border border-slate-300 bg-white px-3 py-1 font-semibold text-slate-800 hover:border-slate-400 hover:bg-slate-50 transition">
                                    {t('shop.saveToWishlist')}
                                </button>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </motion.section>
        </main>
    );
}

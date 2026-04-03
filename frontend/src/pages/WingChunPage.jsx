// src/pages/WingChunPage.jsx
// Wing Chun (咏春) 课程门户页 — fully bilingual EN/ZH

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
};

const API_BASE =
    import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

// ─────────────────────────────────────────────
// LESSON DATA
// ─────────────────────────────────────────────
const LESSONS = [
    {
        id: 1,
        titleEn: "Wing Chun Health Qigong – 10 Forms",
        titleZh: "咏春拳养生十式",
        subtitleEn: "Only 7 Minutes a Day | Safe, Gentle, for All Ages",
        subtitleZh: "每天只需 7 分钟 · 安全轻柔 · 老少皆宜",
        duration: "~7 min",
        s3Key: "wingchun/lesson-01-yangsheng-ten-styles.mp4",
        coverImage: "/images/wing-chun-yangsheng-cover.jpg",
        fallbackImage: "/images/martial-staff-demo.jpg",
        tagEn: "Wellness · Full-body care",
        tagZh: "养生·全身调理",

        introEn: "You don't need long workouts or difficult moves. This Wing Chun Health Qigong – 10 Forms comes from authentic Wing Chun stances, breathing and meridian principles. No fighting, no jumping, no intense effort, zero injury. The full routine is only about 7 minutes, perfect for busy modern life. It relaxes your body, improves blood circulation, calms your mind, and helps you sleep better.",
        introZh: "不需要长时间锻炼或高难度动作。咏春拳养生十式源自咏春正宗站桩、呼吸与经络原理。无对打、无跳跃、不用力，零受伤风险。整套约 7 分钟，非常适合现代忙碌生活。帮助你放松身体、改善血液循环、平静内心、改善睡眠。",

        painPoints: [
            "Long hours working and phone use make your neck and shoulders stiff, with dizziness, numb hands, and a visible neck hump",
            "Lower back pain and tightness from sitting too long; you can't sit or stand long, bending down is hard",
            "Joints feel stiff and creaky — knees weak, wrists sore, fingers numb, movement not flexible",
            "Body feels tight and heavy, hard to relax, low flexibility, easy to feel sore all over",
            "Cold hands and feet all year, weak energy, easily tired, lack of strength",
            "Poor sleep: hard to fall asleep, light sleep, easy to wake up, still tired after sleeping",
            "Stress, anxiety, chest tightness, irritable, cannot relax even when resting",
            "Low immunity, easily tired and sick, body getting weaker",
            "Tried yoga, running, gym, massage — too tiring, hard to keep, or causes joint pressure",
            "Want to keep healthy but no time, no space, no foundation, don't know where to start",
        ],
        painPointsZh: [
            "长期久坐办公、低头看手机，肩颈僵硬酸痛，头晕手麻，富贵包明显",
            "久坐导致腰背疼痛发紧，久坐久站都难受，弯腰困难",
            "关节僵硬弹响，膝盖无力，手腕酸痛，手指麻木，身体灵活性差",
            "全身紧绷沉重，难以放松，柔韧性低，容易浑身酸痛",
            "常年手脚冰凉，气血不足，容易疲惫，浑身无力",
            "睡眠差：难以入睡、睡得浅、容易惊醒，睡醒依然疲惫",
            "压力大、焦虑、胸闷烦躁，休息时也无法真正放松",
            "免疫力低下，容易疲倦生病，体质越来越差",
            "尝试过瑜伽、跑步、健身、按摩——太累、难坚持或对关节有压力",
            "想要保持健康但没时间、没空间、没基础，不知从何开始",
        ],

        forms: [
            { num: 1, name: "Stance Foundation Form", relieves: "Weak energy, cold limbs, unsteady lower body, fatigue", core: "Steady stance, gather energy, improve vitality" },
            { num: 2, name: "Neck & Shoulder Relaxation Form", relieves: "Stiff neck, sore shoulders, dizziness, numb hands, neck hump", core: "Loosen neck and shoulders, relieve tension quickly" },
            { num: 3, name: "Chest Opening & Qi Balancing Form", relieves: "Chest tightness, shortness of breath, stress, low mood", core: "Open the chest, smooth breathing, calm the mind" },
            { num: 4, name: "Waist & Hip Relaxation Form", relieves: "Sore waist, stiff lower back, limited movement from sitting", core: "Relax waist, protect the spine, restore flexibility" },
            { num: 5, name: "Body & Muscle Stretching Form", relieves: "Full-body tightness, stiff muscles, poor flexibility", core: "Stretch gently, release tension, make the body supple" },
            { num: 6, name: "Knee & Ankle Care Form", relieves: "Knee discomfort, weak ankles, stiff joints", core: "Protect joints gently, improve stability, no knee pressure" },
            { num: 7, name: "Wrist & Finger Activation Form", relieves: "Sore wrists, numb fingers, mouse hand, poor circulation", core: "Activate fingers and wrists, ease overuse strain" },
            { num: 8, name: "Breathing & Calming Form", relieves: "Insomnia, anxiety, restlessness, poor sleep", core: "Regulate breath, calm nerves, help you sleep well" },
            { num: 9, name: "Body Twisting & Meridian Opening Form", relieves: "Heavy body, slow blood flow, body aches, tiredness", core: "Improve circulation, reduce stagnation, lighten the body" },
            { num: 10, name: "Closing Form & Qi Returning", relieves: "Scattered energy, restlessness after practice", core: "Gather Qi, consolidate effects, fully relax body and mind" },
        ],
        formsZh: [
            { num: 1, name: "扎马基础式", relieves: "气血不足、四肢冰凉、下盘不稳、容易疲惫", core: "稳固下盘，聚气养神，提升精力" },
            { num: 2, name: "肩颈松弛式", relieves: "颈项僵硬、肩膀酸痛、头晕手麻、富贵包明显", core: "疏松肩颈，快速释放紧张感" },
            { num: 3, name: "开胸理气式", relieves: "胸闷气短、压力大、情绪低落", core: "打开胸腔，顺畅呼吸，平静内心" },
            { num: 4, name: "腰胯松弛式", relieves: "腰部酸痛、下背僵硬、久坐活动受限", core: "放松腰部，保护脊柱，恢复灵活性" },
            { num: 5, name: "全身筋骨舒展式", relieves: "全身紧绷、肌肉僵硬、柔韧性差", core: "温和拉伸，释放紧绷，让身体柔软" },
            { num: 6, name: "膝踝关节养护式", relieves: "膝盖不适、踝关节无力、关节僵硬", core: "温和保护关节，提升稳定性，不压膝" },
            { num: 7, name: "腕指激活式", relieves: "手腕酸痛、手指麻木、鼠标手、循环不畅", core: "激活手指与手腕，缓解过度使用的劳损" },
            { num: 8, name: "调息宁心式", relieves: "失眠、焦虑、烦躁、睡眠差", core: "调节呼吸，安抚神经，帮助睡眠" },
            { num: 9, name: "扭身通脉式", relieves: "身体沉重、气血运行缓慢、浑身酸痛疲倦", core: "促进气血循环，减少气滞，让身体轻盈" },
            { num: 10, name: "收式归气", relieves: "练功后精气涣散、心神不宁", core: "聚气收神，巩固功效，令身心彻底放松" },
        ],

        advantages: [
            { icon: "⏱", title: "Only 7 Minutes", desc: "Short, efficient, fits any schedule" },
            { icon: "🛡", title: "100% Safe", desc: "No jumping, no kneeling, no hard force, no injury" },
            { icon: "🌿", title: "Full-Body Care", desc: "Neck, shoulders, waist, joints, sleep, mood all covered" },
            { icon: "✨", title: "Super Easy", desc: "Zero experience needed, just follow and practice" },
            { icon: "👥", title: "For Everyone", desc: "Office workers, seniors, busy people, all ages" },
            { icon: "♾", title: "Lifetime Benefit", desc: "Learn once, benefit for life" },
        ],
        advantagesZh: [
            { icon: "⏱", title: "仅需7分钟", desc: "简短高效，适合任何日程安排" },
            { icon: "🛡", title: "100%安全", desc: "无跳跃、无跪地、不用蛮力、零受伤" },
            { icon: "🌿", title: "全身调理", desc: "肩颈、腰部、关节、睡眠、情绪全面覆盖" },
            { icon: "✨", title: "极易上手", desc: "零基础入门，跟着练就行" },
            { icon: "👥", title: "人人适用", desc: "上班族、老年人、忙碌人群，各年龄皆宜" },
            { icon: "♾", title: "终身受益", desc: "学一次，受益终生" },
        ],

        audience: [
            "Office workers with neck, shoulder and waist pain",
            "People with poor sleep, anxiety and low energy",
            "People with cold limbs, weak body and low immunity",
            "Seniors and those who cannot do intense exercise",
            "Stressed people who need to relax",
            "Wing Chun lovers who want gentle, healthy practice",
            "Anyone who wants simple, safe daily health practice",
        ],
        audienceZh: [
            "有肩颈腰痛的上班族",
            "睡眠差、焦虑、精力不足的人",
            "四肢冰凉、体质虚弱、免疫力低的人",
            "老年人及无法进行剧烈运动的人",
            "压力大、需要放松的人",
            "希望进行温和健康练习的咏春爱好者",
            "希望有一套简单、安全日常养生方法的所有人",
        ],

        gains: [
            "Relief from neck, shoulder and waist discomfort",
            "More flexible joints and looser muscles",
            "Better blood circulation and warmer hands and feet",
            "Calmer mind and improved sleep",
            "A simple 7-minute daily health routine you can do anywhere",
        ],
        gainsZh: [
            "缓解肩颈腰部不适",
            "关节更灵活，肌肉更松弛",
            "气血循环改善，手脚更温暖",
            "内心更平静，睡眠改善",
            "拥有一套随时随地可做的7分钟日常养生功法",
        ],

        closingEn: "Start today. Just 7 minutes a day to relax, refresh and recharge. Wing Chun Health Qigong 10 Forms – simple, safe, effective.",
        closingZh: "从今天开始。每天只需7分钟，放松、焕新、补充活力。咏春拳养生十式——简单、安全、有效。",
        formsLabel: "10 Forms",
        formsLabelZh: "十式功法",
        scenariosLabel: null,
    },
    {
        id: 2,
        titleEn: "Wing Chun Self-Defense – 9 Forms",
        titleZh: "咏春拳防卫九式",
        subtitleEn: "Real-Street & Elevator Survival | No Strength Needed · For Everyone",
        subtitleZh: "真实街头 & 电梯自保 · 不靠蛮力 · 人人可学",
        duration: "~7 min",
        s3Key: "wingchun/lesson-02-fangwei-nine-styles.mp4",
        coverImage: "/images/wing-chun-fangwei-cover.png",
        fallbackImage: "/images/martial-staff-demo.jpg",
        tagEn: "Self-defense · Real situations",
        tagZh: "防身·实用自卫",

        introEn: "You don't need strength, height, or long-term training. This Wing Chun Self-Defense 9 Forms comes from real combat principles. It uses skill over strength, controls angles, neutralizes attacks instantly, and works in real dangerous situations: street attacks, elevator traps, wrist grabs, bear hugs, front punches, and more. Simple, safe, highly effective — beginners can learn in minutes.",
        introZh: "不需要力量、身高或长期训练。咏春拳防卫九式源自真实搏击原理，以技巧胜力量，控制角度，即时化解攻击，适用于真实危险场景：街头突袭、电梯困境、手腕被抓、后抱等。简单、安全、高效——初学者几分钟即可上手。",

        painPoints: [
            "Walking alone at night, taking elevators, feeling unsafe and anxious",
            "Meeting taller / stronger attackers, too weak to block and easy to get hurt",
            "Attacked with punches, grabs, or chokes — panicked with no idea what to do",
            "Trapped in small spaces (elevator, corridor, bus), nowhere to run",
            "Grabbed from behind, struggling makes it more dangerous",
            "Tried other martial arts: too hard, too tiring, too violent, not practical",
            "No martial arts experience, small body, worried you can't defend yourself",
            "Forced to fight back blindly, making the attacker more aggressive",
        ],
        painPointsZh: [
            "夜间独自行走、乘坐电梯，感到不安全、充满焦虑",
            "遭遇比自己高大强壮的攻击者，根本挡不住，容易受伤",
            "遭到拳击、抓握或掐喉攻击——慌乱不知所措",
            "被困在狭小空间（电梯、走廊、公交），无处可逃",
            "从后方被抓，挣扎反而更危险",
            "尝试过其他武术：太难、太累、太暴力、不实用",
            "没有武术基础，体型偏小，担心自己无法自卫",
            "被迫盲目反击，反而激怒攻击者",
        ],

        forms: [
            { num: 1, name: "Tan Sau + Step + Chain Punches", relieves: "Right straight punch from a taller attacker", core: "Deflect, not block; expose gaps; counter fast", benefit: "Neutralize heavy punches without strength" },
            { num: 2, name: "Fu Sau + Punch", relieves: "Strong direct punch / full-force attack", core: "Change angle, seal power, push attacker off balance", benefit: "Stop even big attackers instantly" },
            { num: 3, name: "Lap Sau vs. Swing Punch", relieves: "Big swings, left-right hooks", core: "Stick to the arm, change attack path, open gaps", benefit: "Avoid being knocked out; counter quickly" },
            { num: 4, name: "Bong Sau + Roll + Hook Punch", relieves: "Elevator attack, front assault, no room to retreat", core: "Turn waist, seal the arm, close-quarters strike", benefit: "Works in tight spaces; defend and counter at once" },
            { num: 5, name: "Double Slap Control", relieves: "Face grabbing, chest grabbing, provocation", core: "Dual slap to disable attack ability", benefit: "Shut down all incoming moves in 1 second" },
            { num: 6, name: "Tan Sau + Step + Block & Slap", relieves: "Sudden rush, close control", core: "Step forward, block face, control distance", benefit: "Keep attacker away and take control" },
            { num: 7, name: "Cross Finger Strike vs. Straight Punch", relieves: "Direct punch to body", core: "Deflect first, strike lower body", benefit: "One move to weaken the attacker" },
            { num: 8, name: "Elbow Control & Escape", relieves: "Wrist grab, clothes grab, held arm", core: "Lift, guide, redirect force", benefit: "Break free in 1 second even if grabbed tight" },
            { num: 9, name: "Horse Stance + Rear Strike", relieves: "Bear hug from behind, sudden restraint", core: "Stable stance, rear counter, break free", benefit: "Life-saving move for women in real danger" },
        ],
        formsZh: [
            { num: 1, name: "摊手+上步+连环冲拳", relieves: "较高攻击者的右直拳进攻", core: "化解而非硬挡，暴露空隙，快速反击", benefit: "不用蛮力即可化解重拳" },
            { num: 2, name: "伏手+冲拳", relieves: "强力直拳/全力攻击", core: "改变角度，封闭力量，破坏攻击者平衡", benefit: "即刻制止体型较大的攻击者" },
            { num: 3, name: "拉手对摆拳", relieves: "大摆拳，左右钩拳", core: "黏住手臂，改变攻击路线，打开空隙", benefit: "避免被击倒，快速反击" },
            { num: 4, name: "膀手+滚动+钩拳", relieves: "电梯内攻击，正面突袭，退无可退", core: "转腰，封臂，近身击打", benefit: "适用于狭小空间，防御与反击同步完成" },
            { num: 5, name: "双拍手控制", relieves: "抓脸、抓胸、被挑衅", core: "双手拍击，瓦解攻击能力", benefit: "1秒内封锁所有来招" },
            { num: 6, name: "摊手+上步+封脸拍", relieves: "突然冲过来，近距离控制", core: "上步，封脸，控制距离", benefit: "将攻击者推开并掌控主动权" },
            { num: 7, name: "叉手指打对直拳", relieves: "对方直拳打向身体", core: "先化解，再攻击下盘", benefit: "一招削弱攻击者战斗力" },
            { num: 8, name: "肘部控制与挣脱", relieves: "手腕被抓、衣服被拽、手臂被控", core: "上提，引导，重定向力量", benefit: "即使被紧握，1秒内挣脱" },
            { num: 9, name: "马步+后击", relieves: "从后方被熊抱，突然被制住", core: "稳固马步，向后反击，挣脱束缚", benefit: "女性身处真实危险时的救命技法" },
        ],

        advantages: [
            { icon: "💪", title: "Skill beats strength", desc: "Women, seniors, and small builds can all use it" },
            { icon: "⚡", title: "Learn in 7 minutes", desc: "Simple moves, no complex routines" },
            { icon: "📍", title: "Works anywhere", desc: "Elevator, street, corridor, no space needed" },
            { icon: "🤝", title: "Safe & non-violent", desc: "Deflect and control, not brutal fighting" },
            { icon: "🚀", title: "Zero experience needed", desc: "No flexibility or fitness required" },
            { icon: "🛡", title: "Covers 90% dangers", desc: "Punches, grabs, hugs, traps — all solved" },
        ],
        advantagesZh: [
            { icon: "💪", title: "以技胜力", desc: "女性、老年人、体型偏小的人都能使用" },
            { icon: "⚡", title: "7分钟学会", desc: "动作简单，无需复杂套路" },
            { icon: "📍", title: "随处可用", desc: "电梯、街头、走廊，无需空间" },
            { icon: "🤝", title: "安全不暴力", desc: "化解与控制，而非蛮力搏斗" },
            { icon: "🚀", title: "零基础入门", desc: "无需柔韧性或体能要求" },
            { icon: "🛡", title: "覆盖90%危险", desc: "拳击、抓握、熊抱、被困——全部解决" },
        ],

        audience: [
            "Women who walk alone or work late",
            "Office workers who fear conflict",
            "Students and people who use elevators often",
            "Parents who want to protect their family",
            "Anyone who wants practical, easy self-defense",
            "Beginners with no time or energy for hard training",
        ],
        audienceZh: [
            "独自行走或需要加班的女性",
            "害怕冲突的上班族",
            "学生及经常乘坐电梯的人",
            "希望保护家人的父母",
            "想学实用、简单防身术的所有人",
            "没有时间和精力进行高强度训练的初学者",
        ],

        gains: [
            "Stay calm when attacked — no panic, no blind fight",
            "Escape grabs, hugs, and punches in seconds",
            "Defend yourself even in small spaces",
            "Protect yourself with skill, not strength",
            "A lifetime self-defense skill for you and your family",
        ],
        gainsZh: [
            "遭遇攻击时保持冷静——不慌乱，不盲目反抗",
            "数秒内挣脱抓握、熊抱和拳击",
            "即使在狭小空间也能自卫",
            "用技巧而非力量保护自己",
            "一生受用的防身技能，保护自己和家人",
        ],

        closingEn: "Danger comes without warning. Wing Chun Self-Defense 9 Forms – simple, real, effective. Stay safe, stay confident.",
        closingZh: "危险从不打招呼。咏春拳防卫九式——简单、真实、有效。保持安全，充满自信。",
        formsLabel: null,
        formsLabelZh: null,
        scenariosLabel: "9 Real Scenarios",
        scenariosLabelZh: "9个真实场景",
    },
];

// ─────────────────────────────────────────────
// COURSE META
// ─────────────────────────────────────────────
const COURSE = {
    priceNow: "NZD 29",
    priceOld: "NZD 49",
    sale: true,
};

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

function SectionTitle({ children }) {
    return (
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-3">
            {children}
        </h3>
    );
}

function PainPointsList({ items }) {
    return (
        <ul className="space-y-2.5">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 shrink-0 text-amber-500 font-bold text-base leading-none">✕</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function FormsList({ forms, isZh }) {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {forms.map((f) => (
                <div
                    key={f.num}
                    className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2"
                >
                    <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700 mt-0.5">
                            {f.num}
                        </span>
                        <p className="text-sm font-semibold text-slate-900 leading-snug">
                            {f.name}
                        </p>
                    </div>
                    <div className="pl-10 space-y-1.5">
                        <p className="text-xs text-slate-600 leading-relaxed">
                            <span className="font-semibold text-amber-700">
                                {isZh ? "适用：" : "For: "}
                            </span>
                            {f.relieves}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            <span className="font-semibold text-slate-700">
                                {isZh ? "方法：" : "How: "}
                            </span>
                            {f.core}
                        </p>
                        {f.benefit && (
                            <p className="text-xs text-emerald-700 leading-relaxed">
                                <span className="font-semibold">
                                    {isZh ? "效果：" : "Benefit: "}
                                </span>
                                {f.benefit}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

function AdvantagesGrid({ items }) {
    return (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            {items.map((a, i) => (
                <div
                    key={i}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-1.5"
                >
                    <div className="text-2xl">{a.icon}</div>
                    <p className="text-sm font-semibold text-slate-900 leading-snug">{a.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{a.desc}</p>
                </div>
            ))}
        </div>
    );
}

function CheckList({ items, color = "emerald" }) {
    const dotColor = color === "emerald" ? "text-emerald-600" : "text-amber-600";
    return (
        <ul className="space-y-2.5">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 leading-snug">
                    <span className={`mt-0.5 shrink-0 font-bold text-base leading-none ${dotColor}`}>✓</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function LessonDetail({ lesson, isZh }) {
    const label = isZh
        ? (lesson.formsLabelZh || lesson.scenariosLabelZh || "课程内容")
        : (lesson.formsLabel || lesson.scenariosLabel || "Course Content");

    return (
        <div className="space-y-5">
            {/* ── Intro card ── */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug">
                        {isZh ? lesson.titleZh : lesson.titleEn}
                    </h2>
                    <p className="text-sm text-amber-700 mt-1 font-medium">
                        {isZh ? lesson.subtitleZh : lesson.subtitleEn}
                    </p>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                    {isZh ? lesson.introZh : lesson.introEn}
                </p>
            </div>

            {/* ── Pain Points ── */}
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                <SectionTitle>
                    {isZh ? "你是否有这些困扰？" : "Do Any of These Sound Familiar?"}
                </SectionTitle>
                <PainPointsList items={isZh ? lesson.painPointsZh : lesson.painPoints} />
            </div>

            {/* ── Forms / Scenarios ── */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3 mb-4">
                    <SectionTitle>{label}</SectionTitle>
                    <span className="mb-3 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                        {label}
                    </span>
                </div>
                <FormsList forms={isZh ? lesson.formsZh : lesson.forms} isZh={isZh} />
            </div>

            {/* ── Advantages ── */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <SectionTitle>{isZh ? "课程优势" : "Course Advantages"}</SectionTitle>
                <AdvantagesGrid items={isZh ? lesson.advantagesZh : lesson.advantages} />
            </div>

            {/* ── Audience + Gains side by side on desktop, stacked on mobile ── */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
                    <SectionTitle>{isZh ? "适合哪些人？" : "Who Is This For?"}</SectionTitle>
                    <CheckList items={isZh ? lesson.audienceZh : lesson.audience} color="amber" />
                </div>
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                    <SectionTitle>{isZh ? "你将收获什么" : "What You Will Gain"}</SectionTitle>
                    <CheckList items={isZh ? lesson.gainsZh : lesson.gains} color="emerald" />
                </div>
            </div>

            {/* ── Closing ── */}
            <div className="rounded-3xl bg-slate-900 px-5 py-5 text-center">
                <p className="text-sm font-medium text-white/90 leading-relaxed">
                    {isZh ? lesson.closingZh : lesson.closingEn}
                </p>
            </div>

            {/* ── Disclaimer ── */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 leading-relaxed">
                {isZh
                    ? "注意：请在安全、宽敞的环境中练习。所有示范仅供教学目的，不鼓励任何暴力行为。"
                    : "Note: Please train in a safe environment with enough space. All demonstrations are for educational purposes only and do not encourage violence."}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function WingChunPage({
    lang,
    currentUser,
    authLoading = false,
    isOwned: isOwnedProp,
    purchases = [],
    onPurchase,
    onGoLogin,
}) {
    const isZh = lang === "zh";
    const isLoggedIn = !!currentUser;
    const isOwned = !!isOwnedProp;

    const [activeLessonId, setActiveLessonId] = useState(1);
    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [imgError, setImgError] = useState(false);

    const activeLesson = useMemo(
        () => LESSONS.find((x) => x.id === activeLessonId) || LESSONS[0],
        [activeLessonId]
    );

    // reset imgError when lesson changes
    useEffect(() => { setImgError(false); }, [activeLessonId]);

    const canPlayActive = useMemo(() => {
        if (isOwned) return true;
        return purchases.some((p) => {
            if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
            return p.purchase_type === "video" && p.video_key === activeLesson.s3Key;
        });
    }, [isOwned, activeLesson, purchases]);

    const fetchSignedUrl = async (s3Key) => {
        setLoading(true);
        setError("");
        setVideoUrl("");
        try {
            const token = localStorage.getItem("ec_token");
            const res = await fetch(
                `${API_BASE}/api/video-url?key=${encodeURIComponent(s3Key)}`,
                {
                    cache: "no-store",
                    credentials: "include",
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
            );
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setError(data?.error || "Failed to load video URL");
                return;
            }
            if (!data?.url || typeof data.url !== "string" || !data.url.startsWith("https://")) {
                setError("Unable to get a valid video link");
                return;
            }
            setVideoUrl(data.url);
        } catch {
            setError("Network error: cannot reach backend");
        } finally {
            setLoading(false);
        }
    };

    function handleSelectLesson(lesson) {
        const hasAccess =
            isOwned ||
            purchases.some((p) => {
                if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
                return p.purchase_type === "video" && p.video_key === lesson.s3Key;
            });

        if (!hasAccess) {
            if (authLoading) return;
            if (!isLoggedIn) { onGoLogin?.(); return; }
            onPurchase?.("video", {
                courseId: "wingchun",
                videoKey: lesson.s3Key,
                videoTitle: lesson.titleEn,
            });
            return;
        }
        setActiveLessonId(lesson.id);
        setTimeout(() => {
            const el = document.getElementById("wc-video-player");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    }

    function handleUnlockCourse() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("course", { courseId: "wingchun" });
    }

    function handleBuyActiveVideo() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("video", {
            courseId: "wingchun",
            videoKey: activeLesson.s3Key,
            videoTitle: activeLesson.titleEn,
        });
    }

    useEffect(() => {
        if (!canPlayActive) {
            setVideoUrl("");
            setError("");
            setLoading(false);
            return;
        }
        fetchSignedUrl(activeLesson.s3Key);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeLessonId, activeLesson.s3Key, canPlayActive]);

    const heroSrc = imgError ? activeLesson.fallbackImage : activeLesson.coverImage;

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <main className="mx-auto max-w-4xl px-4 pb-20 pt-6 md:pt-10">

                {/* ══ HERO IMAGE ══ */}
                <motion.div
                    key={`hero-${activeLessonId}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6 w-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm"
                >
                    <img
                        src={heroSrc}
                        alt={isZh ? activeLesson.titleZh : activeLesson.titleEn}
                        onError={() => setImgError(true)}
                        className="w-full object-cover object-center"
                        style={{ display: "block", aspectRatio: "16/9", maxHeight: "420px" }}
                    />
                </motion.div>

                {/* ══ COURSE HEADER ══ */}
                <motion.div
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[11px] uppercase tracking-widest text-slate-500">
                            {isZh ? "视频课程" : "Video Course"}
                        </span>
                        {COURSE.sale && (
                            <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                                {isZh ? "优惠中" : "Sale"}
                            </span>
                        )}
                    </div>
                    <h1 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
                        {isZh ? "咏春基础课" : "Wing Chun Foundations"}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        {isZh ? "Wing Chun Foundations" : "咏春基础课"}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="text-2xl font-bold text-slate-900">{COURSE.priceNow}</span>
                        <span className="text-sm text-slate-400 line-through">{COURSE.priceOld}</span>
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700">
                            {isZh ? "共2节课 · 永久观看" : "2 lessons · lifetime access"}
                        </span>
                    </div>
                </motion.div>

                {/* ══ PURCHASE BUTTONS ══ */}
                <motion.div
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="mb-6 space-y-3"
                >
                    {isOwned ? (
                        <div className="w-full rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-800">
                            {isZh ? "✓ 全套课程已解锁" : "✓ Full Course Unlocked"}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleUnlockCourse}
                                className="w-full rounded-2xl bg-amber-600 px-4 py-4 text-sm font-bold text-white hover:bg-amber-500 transition active:scale-[0.98]"
                            >
                                {isZh
                                    ? `解锁全套课程（共2节）· ${COURSE.priceNow}`
                                    : `Unlock Full Course (Both Lessons) · ${COURSE.priceNow}`}
                            </button>
                            <button
                                onClick={handleBuyActiveVideo}
                                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition active:scale-[0.98]"
                            >
                                {isZh
                                    ? `单独购买第 ${activeLesson.id} 节 · NZD 10`
                                    : `Buy Lesson ${activeLesson.id} Only · NZD 10`}
                            </button>
                            {!isLoggedIn && (
                                <p className="text-center text-xs text-amber-700 pt-1">
                                    {isZh ? "请先登录以购买并观看课程。" : "Please sign in to purchase and watch."}
                                </p>
                            )}
                        </>
                    )}
                </motion.div>

                {/* ══ LESSON SELECTOR ══ */}
                <motion.div
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-5"
                >
                    <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-2">
                        {isZh ? "课程列表" : "Lessons"}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {LESSONS.map((lesson) => {
                            const hasAccess =
                                isOwned ||
                                purchases.some((p) => {
                                    if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
                                    return p.purchase_type === "video" && p.video_key === lesson.s3Key;
                                });
                            const active = lesson.id === activeLessonId;
                            return (
                                <button
                                    key={lesson.id}
                                    onClick={() => handleSelectLesson(lesson)}
                                    className={[
                                        "relative flex flex-col items-start gap-1.5 rounded-2xl border px-4 py-3.5 text-left transition-all",
                                        active
                                            ? "border-amber-400 bg-amber-50 shadow-sm"
                                            : "border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/40",
                                    ].join(" ")}
                                >
                                    {active && (
                                        <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-amber-500" />
                                    )}
                                    {!hasAccess && !active && (
                                        <span className="absolute right-3 top-3 text-[13px] text-slate-400">🔒</span>
                                    )}
                                    <span className="text-[11px] uppercase tracking-wide text-slate-400">
                                        {isZh ? `第 ${lesson.id} 节` : `Lesson ${lesson.id}`}
                                    </span>
                                    <span className="text-sm font-bold text-slate-900 leading-snug pr-4">
                                        {isZh ? lesson.titleZh : lesson.titleEn}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {isZh ? lesson.tagZh : lesson.tagEn} · {lesson.duration}
                                    </span>
                                    {hasAccess ? (
                                        <span className="mt-0.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                                            {isZh ? "已解锁" : "Unlocked"}
                                        </span>
                                    ) : (
                                        <span className="mt-0.5 rounded-full border border-amber-200 bg-white px-2 py-0.5 text-[10px] text-amber-700">
                                            {isZh ? "每节 NZD 10" : "NZD 10 per lesson"}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* ══ VIDEO PLAYER ══ */}
                <motion.div
                    id="wc-video-player"
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mb-6"
                >
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-black">
                        {canPlayActive ? (
                            <div className="relative w-full">
                                {loading && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
                                        <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white">
                                            {isZh ? "加载中…" : "Loading…"}
                                        </div>
                                    </div>
                                )}
                                {error && !loading && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <div>
                                            <p className="text-base font-semibold">{isZh ? "播放出错" : "Playback error"}</p>
                                            <p className="mt-2 text-sm text-white/70">{error}</p>
                                            <button
                                                onClick={() => fetchSignedUrl(activeLesson.s3Key)}
                                                className="mt-4 rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900"
                                            >
                                                {isZh ? "重试" : "Retry"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {!error && !loading && videoUrl && (
                                    <video
                                        key={activeLesson.id}
                                        controls playsInline preload="metadata"
                                        crossOrigin="anonymous"
                                        className="w-full"
                                        style={{ display: "block", aspectRatio: "16/9" }}
                                    >
                                        <source src={videoUrl} type="video/mp4" />
                                        {isZh ? "您的浏览器不支持视频播放。" : "Your browser does not support video."}
                                    </video>
                                )}
                                {!error && !loading && !videoUrl && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <p className="text-sm text-white/70">
                                            {isZh ? "请在上方选择课程以播放。" : "Select a lesson above to play."}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                <div className="max-w-sm space-y-3">
                                    <p className="text-3xl">🔒</p>
                                    <p className="text-base font-bold">{isZh ? "已锁定" : "Locked"}</p>
                                    <p className="text-sm text-white/70">
                                        {isZh ? "购买后即可解锁观看。" : "Purchase to unlock and watch."}
                                    </p>
                                    {isLoggedIn ? (
                                        <button
                                            onClick={handleUnlockCourse}
                                            className="mt-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition"
                                        >
                                            {isZh ? `解锁全套课程 ${COURSE.priceNow}` : `Unlock Full Course ${COURSE.priceNow}`}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onGoLogin?.()}
                                            className="mt-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
                                        >
                                            {isZh ? "登录后购买" : "Sign in to purchase"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Now Playing bar */}
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400">
                            {isZh ? "正在播放" : "Now Playing"}
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900">
                            {isZh
                                ? `第 ${activeLesson.id} 节 · ${activeLesson.titleZh}`
                                : `Lesson ${activeLesson.id} · ${activeLesson.titleEn}`}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {isZh ? activeLesson.subtitleZh : activeLesson.subtitleEn}
                        </p>
                    </div>
                </motion.div>

                {/* ══ LESSON DETAIL ══ */}
                <motion.div
                    key={activeLessonId}
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.4 }}
                >
                    <div className="mb-4">
                        <h2 className="text-base font-bold text-slate-900">
                            {isZh
                                ? `第 ${activeLesson.id} 节 — 详细介绍`
                                : `Lesson ${activeLesson.id} — Full Description`}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {isZh ? "切换上方课程以查看各课详情" : "Switch lessons above to see details for each"}
                        </p>
                    </div>
                    <LessonDetail lesson={activeLesson} isZh={isZh} />
                </motion.div>

            </main>
        </div>
    );
}

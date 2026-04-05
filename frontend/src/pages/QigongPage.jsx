// src/pages/QigongPage.jsx
// Acupressure Masterclass — 6 Lessons
// Same structure as QimenPage (Tai Chi): hero image + lesson selector + video + full detail
// App.jsx: activePage === "qigong" → <QigongPage courseId="qigong" />

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
};

const API_BASE =
    import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

// ─────────────────────────────────────────────
// COURSE META
// ─────────────────────────────────────────────
const COURSE = {
    titleEn: "Acupressure Masterclass",
    titleZh: "穴位按摩完全课",
    priceNow: "NZD 99",
    priceOld: "NZD 149",
    sale: true,
    lessonCount: 6,
    courseId: "qigong",   // keep existing courseId so purchases still match
};

// ─────────────────────────────────────────────
// LESSON DATA
// ─────────────────────────────────────────────
const LESSONS = [
    {
        id: 1,
        titleEn: "Head & Face Discomfort Relief",
        titleZh: "头部穴位按摩",
        subtitleEn: "23 Conditions • 3 Pressure Points Each • Drug-Free Relief at Home",
        subtitleZh: "23种症状 · 每症3个穴位 · 居家无药缓解",
        duration: "~60 min",
        s3Key: "acupressure/lesson-01-head.mp4",
        coverImage: "/images/acupressure-lesson-01.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "23 Head & Face Issues • No Drugs • No Doctors • Relieve at Home in 3 Steps. Stop reaching for pills every time your head or face plays up. This lesson teaches 3 simple pressure points for each of 23 common head and face conditions — headaches, tinnitus, dry eyes, toothache, nasal congestion, stiff neck, and more. Every technique is 100% natural, requires no tools, and can be done at home in minutes. One course solves 23 head & face problems. Learn once, benefit for life.",
        introZh: "不要每次头脸不舒服就伸手拿药。这节课针对26种常见头面部症状，每种症状教你3个简单穴位——头痛、耳鸣、眼干、牙痛、鼻塞、颈僵等等。由经验丰富的中医师讲授，所有手法100%纯天然，无需任何工具，在家几分钟即可完成。",

        conditions: [
            "Back of Head Headache (Occipital Pain)",
            "Top of Head Pain & Tightness",
            "Frontal Headache & Forehead Tightness",
            "Migraine & Temple Pain",
            "Scalp Pain & Tight Fascia",
            "Stiff Neck (Cannot Turn / Lower / Raise Head)",
            "Tinnitus (Ear Ringing / Buzzing)",
            "Otitis Media, Ear Discharge & Pus",
            "Upper Toothache",
            "Lower Toothache",
            "Gum Swelling & Facial Puffiness",
            "Excessive Tearing (Wind-Induced)",
            "Dry Eyes & Eye Fatigue",
            "Eyeball Swelling & Bulging Feeling",
            "Blurred Vision & Poor Clarity",
            "Styes (Eyelid Bumps)",
            "Saggy Eyelids (Droopy Upper Lids)",
            "Eye Bags & Under-Eye Puffiness",
            "Nasal Congestion & Stuffy Nose",
            "Sore Throat & Painful Swallowing",
            "Persistent Hiccups (Diaphragm Spasm)",
            "Scalp Folliculitis & Bumps",
            "Dizziness & Poor Blood Circulation to Head",
        ],
        conditionsZh: [
            "后脑勺头痛（枕骨痛）",
            "头顶疼痛与发紧",
            "前额头痛与额头发紧",
            "偏头痛与太阳穴痛",
            "头皮痛与筋膜紧张",
            "颈项僵硬（无法转头/低头/抬头）",
            "耳鸣（嗡嗡声/蝉鸣声）",
            "中耳炎、耳道分泌物与流脓",
            "上牙痛",
            "下牙痛",
            "牙龈肿胀与面部浮肿",
            "迎风流泪",
            "眼干与眼睛疲劳",
            "眼球胀痛与眼球突出感",
            "视力模糊、视物不清",
            "麦粒肿（眼皮上长包）",
            "眼皮下垂（上眼睑松弛）",
            "眼袋与下眼睑浮肿",
            "鼻塞",
            "咽喉疼痛与吞咽痛",
            "顽固性呃逆（膈肌痉挛）",
            "头皮毛囊炎与头皮小疙瘩",
            "头晕与头部血液循环不良",
            "面部神经紧张与敏感",
            "炎症相关头面部问题",
            "头面部僵硬与不适",
        ],

        highlights: [
            { title: "100% Natural", desc: "No pills, no injections, no side effects" },
            { title: "3 Fixed Points Per Condition", desc: "Easy to find, remember and use every time" },
            { title: "Self-Treatment at Home", desc: "Do it yourself anytime, anywhere" },
            { title: "Fast Relief", desc: "Headaches, toothaches, hiccups and congestion reduce quickly" },
            { title: "Root-Cause Repair", desc: "Long-term improvement for tinnitus, dry eyes, scalp issues" },
            { title: "Zero Experience Needed", desc: "No anatomy or meridian knowledge required" },
        ],
        highlightsZh: [
            { title: "100%纯天然", desc: "不吃药、不打针、零副作用" },
            { title: "每症固定3个穴位", desc: "易于找到、记忆和反复使用" },
            { title: "居家自我调理", desc: "随时随地自己操作" },
            { title: "快速缓解", desc: "头痛、牙痛、呃逆、鼻塞迅速减轻" },
            { title: "根源修复", desc: "耳鸣、眼干、头皮问题长期改善" },
            { title: "零基础入门", desc: "无需解剖学或经络知识" },
        ],

        audience: [
            "People with frequent headaches, migraines, dizziness",
            "Those with eye strain, dry eyes, blurred vision from screen use",
            "People suffering from toothache, gum swelling, oral discomfort",
            "Those with tinnitus, ear infections, ear discharge",
            "People with stiff neck or limited neck movement",
            "Those with nasal congestion, sore throat, recurring hiccups",
            "People with scalp pain, folliculitis, eye bags, saggy eyelids",
            "Anyone who wants safe, natural, drug-free relief at home",
        ],
        audienceZh: [
            "经常头痛、偏头痛、头晕的人",
            "长期用屏幕导致眼睛疲劳、眼干、视力模糊的人",
            "受牙痛、牙龈肿胀、口腔不适困扰的人",
            "有耳鸣、中耳炎、耳道分泌物问题的人",
            "颈项僵硬或颈部活动受限的人",
            "有鼻塞、咽喉痛、反复呃逆的人",
            "头皮痛、毛囊炎、眼袋、眼皮下垂的人",
            "希望在家安全、自然、无药缓解不适的所有人",
        ],

        closingEn: "One course solves 26 head & face problems. Learn once, benefit for life.",
        closingZh: "一套课程解决26种头面部问题。学一次，受益终生。",
    },

    {
        id: 2,
        titleEn: "Women's Private Wellness",
        titleZh: "女性私密健康课",
        subtitleEn: "7 Common Women's Issues • 3–5 Pressure Points • Natural Relief at Home",
        subtitleZh: "7种常见女性问题 · 每症3-5个穴位 · 居家自然调理",
        duration: "~40 min",
        s3Key: "acupressure/lesson-02-women.mp4",
        coverImage: "/images/acupressure-lesson-02.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "7 Most Common Women's Private Issues • No Drugs • No Embarrassment • Relieve at Home in 3 Steps. Seven of the most common private women's health issues — addressed naturally, privately, and effectively at home. No embarrassing hospital visits, no side effects from medication. Using 3–5 targeted pressure points per condition, this lesson covers breast hyperplasia, menstrual cramps, irregular periods, heavy bleeding, popliteal cysts, private area itching, and urine leakage. Safe for all ages including postpartum women. One course solves 7 common women's problems. Learn once, benefit for life — gentle, natural, and completely private.",
        introZh: "七种最常见的女性私密健康问题——在家自然、私密、有效地解决。无需尴尬的就医，无需药物副作用。每种症状运用3-5个精准穴位，本课涵盖：乳腺增生、痛经、月经不调、月经过多、腘窝囊肿、私处瘙痒及漏尿。适合各年龄段女性，包括产后女性。",

        conditions: [
            "Breast Hyperplasia – breast lumps, menstrual pain, tenderness on the sides",
            "Popliteal Cyst – bulge behind knee, pain with squatting, walking discomfort",
            "Private Area Itching – recurring itch, quick relief for acute symptoms, long-term root repair",
            "Menstrual Cramps – acute abdominal pain, fast pain relief during attacks",
            "Urine Leakage – leakage with cough/laugh, postnatal weakness, pelvic floor relaxation",
            "Delayed / Missed Periods – irregular cycles, amenorrhea (not menopause)",
            "Heavy Menstrual Bleeding – uncontrollable flow, physical weakness",
        ],
        conditionsZh: [
            "乳腺增生——乳房结块、经期胀痛、两侧压痛",
            "腘窝囊肿——膝盖后方鼓包、蹲起疼痛、行走不适",
            "私处瘙痒——反复瘙痒、急性发作快速缓解、长期根源修复",
            "痛经——急性腹痛、发作期快速止痛",
            "漏尿——咳嗽/大笑漏尿、产后盆底松弛",
            "月经推迟/停经——月经不调、闭经（非更年期）",
            "月经过多——经量不止、身体虚弱",
        ],

        highlights: [
            { title: "100% Natural", desc: "No drugs, no needles, no rinsing, no side effects" },
            { title: "Fixed Pressure Points", desc: "3–5 key points per issue, easy to find, remember and use" },
            { title: "Private & Safe", desc: "Do it yourself at home, no help needed, no embarrassment" },
            { title: "Save Time & Money", desc: "No hospital visits, no expensive treatments, 5–10 minutes a day" },
            { title: "Acute + Chronic Care", desc: "Fast relief for sudden symptoms, long-term prevention" },
            { title: "Gentle & Effective", desc: "Safe for all ages including postpartum women" },
        ],
        highlightsZh: [
            { title: "100%纯天然", desc: "不吃药、不打针、不冲洗、零副作用" },
            { title: "固定穴位", desc: "每症3-5个关键穴位，易找、易记、易用" },
            { title: "私密安全", desc: "在家自己操作，无需他人帮助，无需尴尬" },
            { title: "省时省钱", desc: "无需就医，无需昂贵疗程，每天5-10分钟" },
            { title: "急性+慢性兼顾", desc: "突发症状快速缓解，长期预防改善" },
            { title: "温和有效", desc: "适合各年龄段女性，包括产后女性" },
        ],

        audience: [
            "Women with breast lumps, tenderness, or menstrual breast pain",
            "People with popliteal cysts and knee movement discomfort",
            "Women suffering from recurring private itching",
            "Women with severe menstrual cramps relying on painkillers",
            "Postpartum women or those with urine leakage when coughing/laughing",
            "Women with irregular, delayed, or missed periods",
            "Women with heavy, prolonged menstrual bleeding",
            "Anyone who wants to stop wasting time and money on private health issues",
        ],
        audienceZh: [
            "有乳房结块、压痛或经期乳房胀痛的女性",
            "有腘窝囊肿和膝关节活动不适的人",
            "受反复私处瘙痒困扰的女性",
            "痛经严重、依赖止痛药的女性",
            "产后或咳嗽/大笑时漏尿的女性",
            "月经不调、推迟或闭经的女性",
            "月经量多、持续时间长的女性",
            "希望停止在私密健康问题上浪费时间和金钱的所有人",
        ],

        closingEn: "One course solves 7 common women's problems. Learn once, benefit for life — gentle, natural, and completely private.",
        closingZh: "一套课程解决7种常见女性问题。学一次，受益终生——温和、自然、完全私密。",
    },

    {
        id: 3,
        titleEn: "Hand & Foot Pain Relief",
        titleZh: "手脚穴位按摩",
        subtitleEn: "28 Conditions • 3 Pressure Points Each • Drug-Free Relief at Home",
        subtitleZh: "28种症状 · 每症3个穴位 · 居家无药缓解",
        duration: "~90 min",
        s3Key: "acupressure/lesson-03-hands-feet.mp4",
        coverImage: "/images/acupressure-lesson-03.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "25 Common Hand & Foot Pains • No Drugs • No Doctors • Relieve at Home in 3 Steps. From trigger finger and tennis elbow to plantar fasciitis and restless legs — this lesson covers 28 of the most common hand and foot problems using just 3 pressure points each. Whether you're dealing with work-related strain, sports injuries, or age-related stiffness, every technique is safe, natural and can be done without any tools or medical knowledge. One course solves 28 hand & foot problems. Learn once, benefit for life.",
        introZh: "从扳机指、网球肘到足底筋膜炎、不宁腿综合征——这节课用每症仅3个穴位涵盖28种最常见的手脚问题。无论你面对的是职业劳损、运动损伤还是年龄相关的僵硬，所有手法安全自然，无需任何工具或医学知识即可操作。",

        conditions: [
            "Middle Trigger Finger",
            "Golfer's Elbow (Medial Epicondylitis)",
            "Heel Pain (Worse When Walking)",
            "Athlete's Foot (Beriberi)",
            "Morning Hand Stiffness & Weak Grip",
            "Pinky & Ring Finger Numbness",
            "Ankle Sprain (Inversion & Eversion)",
            "Tinea Manuum (Palmer Blisters & Itch)",
            "Tennis Elbow (Lateral Epicondylitis)",
            "Senior Walking Weakness & Fatigue",
            "Thumb Tenosynovitis",
            "Fingertip Numbness",
            "Wrist Pain When Flipping",
            "Restless Legs Syndrome",
            "Arm Cannot Reach Back (Anterior Shoulder Pain)",
            "Plantar Fasciitis (Morning First Step Pain)",
            "Night Arm Radiating Pain",
            "Forearm Outer Stabbing Pain",
            "Armpit Cyst & Lymphatic Congestion",
            "Palm Pain When Gripping",
            "Front Shin Pain (Tibialis Anterior Pain)",
            "Foot Arch Pain",
            "Mom's Wrist (De Quervain's Tenosynovitis)",
            "Bunion (Hallux Valgus)",
            "Arm Cannot Reach Back (Posterior Shoulder Pain)",
            "Finger Joint Stiffness & Locking",
            "Wrist Sprain & Overuse Pain",
            "Hand & Foot Numbness, Soreness, Weakness",
        ],
        conditionsZh: [
            "中指扳机指",
            "高尔夫球肘（肱骨内上髁炎）",
            "足跟痛（行走时加重）",
            "脚气（足癣）",
            "晨起手部僵硬及握力减弱",
            "小指与无名指麻木",
            "踝关节扭伤（内翻与外翻）",
            "手癣（掌心水泡与瘙痒）",
            "网球肘（肱骨外上髁炎）",
            "老年人行走无力与易疲劳",
            "拇指腱鞘炎",
            "指尖麻木",
            "翻腕时腕部疼痛",
            "不宁腿综合征",
            "手臂无法向后摸背（肩前部疼痛）",
            "足底筋膜炎（晨起第一步疼痛）",
            "夜间手臂放射性疼痛",
            "前臂外侧刺痛",
            "腋窝囊肿与淋巴瘀堵",
            "握物时手掌疼痛",
            "小腿前侧疼痛（胫骨前肌疼痛）",
            "足弓疼痛",
            "妈妈手（桡骨茎突腱鞘炎）",
            "拇外翻（大脚骨）",
            "手臂无法向后摸背（肩后部疼痛）",
            "手指关节僵硬与卡锁",
            "腕部扭伤与过度使用性疼痛",
            "手脚麻木、酸痛、无力",
        ],

        highlights: [
            { title: "100% Natural", desc: "No pills, no injections, no side effects" },
            { title: "3 Points Per Problem", desc: "Fixed, easy to find, remember and use" },
            { title: "Self-Treatment at Home", desc: "Do it yourself anytime, anywhere" },
            { title: "Fast Pain Relief", desc: "Acute pain reduces immediately" },
            { title: "Root-Cause Repair", desc: "Improve tenosynovitis, numbness, strain long-term" },
            { title: "For the Whole Family", desc: "Workers, housewives, seniors, kids" },
        ],
        highlightsZh: [
            { title: "100%纯天然", desc: "不吃药、不打针、零副作用" },
            { title: "每症3个固定穴位", desc: "易于找到、记忆和使用" },
            { title: "居家自我调理", desc: "随时随地自己操作" },
            { title: "快速止痛", desc: "急性疼痛立即减轻" },
            { title: "根源修复", desc: "长期改善腱鞘炎、麻木、劳损" },
            { title: "全家适用", desc: "上班族、家庭主妇、老年人、孩子" },
        ],

        audience: [
            "People with hand/wrist pain from phone & computer use",
            "Housewives & parents with hand strain from housework & childcare",
            "Seniors with heel pain, numbness, weak walking",
            "People with elbow pain, ankle sprain, sports or work injuries",
            "People with embarrassing issues like athlete's foot & restless legs",
            "Anyone who wants to avoid medicine, doctors, and expensive bills",
            "Anyone who wants a self-healing system for hand & foot pain",
        ],
        audienceZh: [
            "因长期使用手机和电脑而手腕疼痛的人",
            "因家务和带孩子导致手部劳损的家庭主妇和父母",
            "有足跟痛、麻木、行走无力的老年人",
            "有肘痛、踝扭伤、运动或职业损伤的人",
            "受脚气、不宁腿等难以启齿问题困扰的人",
            "希望避免吃药、就医、高额医疗费的人",
            "希望建立手脚疼痛自我康复体系的所有人",
        ],

        closingEn: "One course solves 28 hand & foot problems. Learn once, benefit for life.",
        closingZh: "一套课程解决28种手脚问题。学一次，受益终生。",
    },

    {
        id: 4,
        titleEn: "Common Daily Discomforts Relief",
        titleZh: "日常常见问题穴位按摩",
        subtitleEn: "16 Daily Aches & Pains • 3 Pressure Points Each • Drug-Free Relief at Home",
        subtitleZh: "16种日常不适 · 每症3个穴位 · 居家无药缓解",
        duration: "~60 min",
        s3Key: "acupressure/lesson-04-daily-issues.mp4",
        coverImage: "/images/acupressure-lesson-04.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "16 Common Daily Aches & Pains • No Drugs • No Doctors • Relieve at Home in 3 Steps. Insomnia, anxiety, carsickness, bloating, palpitations, mouth ulcers, night sweats — these everyday problems quietly wear you down. This lesson addresses 16 common daily health issues using 3 natural pressure points each. Quick relief for acute symptoms, long-term improvement for chronic patterns. No clinic visits, no side effects, suitable for the whole family. One course solves 16 common daily health problems. Learn once, benefit for life.",
        introZh: "失眠、焦虑、晕车、腹胀、心悸、口腔溃疡、盗汗——这些日常问题悄悄地消耗着你的身体。这节课针对16种常见日常健康问题，每症运用3个天然穴位。急性症状快速缓解，慢性问题长期改善。无需就医，零副作用，全家适用。",

        conditions: [
            "Tongue Tip Pain – burning, stabbing pain, recurring discomfort",
            "Motion Sickness – nausea, vomiting, dizziness, travel anxiety",
            "Visceral Ptosis – protruding lower belly, postpartum relaxation",
            "Stomach Bloating – slow digestion, fullness, discomfort after meals",
            "Chest Tightness – pressure, fake heart symptoms, unexplained discomfort",
            "Facial / Mouth Twitching – involuntary spasms, nerve-related tics",
            "Emotional Restlessness – anxiety, irritability, inner panic",
            "Night Sweats – nighttime sweating, yin deficiency, weak sleep",
            "Rapid Heartbeat – sudden palpitations, fast heart rate",
            "Insomnia – difficulty falling asleep, restlessness, poor sleep",
            "Loss of Appetite – no desire to eat, low energy",
            "Burning Urination – discomfort, urgency, frequent urination",
            "Side Stitch – sharp rib pain when breathing or moving",
            "Night Teeth Grinding – sleep grinding, jaw pain, worn teeth",
            "Mouth Ulcers – recurring sores, pain, slow healing",
            "Thyroid Nodules / Cysts – neck tightness, lumps, discomfort",
            "Frequent Night Urination – nighttime bathroom trips, disturbed sleep",
            "Acute Diarrhea – stomach cramps, loose bowels, sudden attacks",
        ],
        conditionsZh: [
            "舌尖痛——灼痛、刺痛、反复不适",
            "晕动症——恶心、呕吐、头晕、出行焦虑",
            "内脏下垂——小腹突出、产后松弛",
            "胃胀——消化缓慢、饭后饱胀不适",
            "胸闷——压迫感、假心脏症状、原因不明的不适",
            "面部/口角抽搐——不自主痉挛、神经性抽动",
            "情绪烦躁——焦虑、易怒、内心恐慌",
            "盗汗——夜间出汗、阴虚、睡眠差",
            "心跳过速——突发心悸、心率加快",
            "失眠——入睡困难、烦躁不安、睡眠差",
            "食欲不振——不想吃东西、精力低下",
            "尿道灼热——排尿不适、尿急、尿频",
            "岔气——呼吸或运动时肋部剧痛",
            "夜间磨牙——睡眠磨牙、下颌疼痛、牙齿磨损",
            "口腔溃疡——反复发作、疼痛、愈合慢",
            "甲状腺结节/囊肿——颈部紧绷、肿块、不适",
            "夜尿频繁——夜间多次如厕、睡眠中断",
            "急性腹泻——肠痉挛、稀便、突然发作",
        ],

        highlights: [
            { title: "100% Natural", desc: "No pills, no needles, no side effects" },
            { title: "3 Points Per Issue", desc: "Easy to find, remember and use" },
            { title: "Self-Treatment at Home", desc: "Do it yourself anytime, anywhere" },
            { title: "Fast Results", desc: "Quick relief for acute symptoms, long-term improvement" },
            { title: "Save Time & Money", desc: "No clinic visits, no expensive bills" },
            { title: "For the Whole Family", desc: "Adults, seniors, daily common problems all covered" },
        ],
        highlightsZh: [
            { title: "100%纯天然", desc: "不吃药、不打针、零副作用" },
            { title: "每症3个穴位", desc: "易于找到、记忆和使用" },
            { title: "居家自我调理", desc: "随时随地自己操作" },
            { title: "效果迅速", desc: "急性症状快速缓解，长期改善" },
            { title: "省时省钱", desc: "无需就医，无需高额账单" },
            { title: "全家适用", desc: "成人、老年人，日常常见问题全覆盖" },
        ],

        audience: [
            "People troubled by repeated small daily discomforts",
            "Office workers with insomnia, anxiety, carsickness, stomach issues",
            "Postpartum women with visceral ptosis and protruding belly",
            "Middle-aged and elderly people with thyroid issues and frequent night urination",
            "Anyone who prefers natural healing and avoids medicine side effects",
            "People who want to save time, money and solve problems at home",
            "Families who want a simple, safe self-healing system for daily health",
        ],
        audienceZh: [
            "饱受反复小毛病困扰的人",
            "有失眠、焦虑、晕车、肠胃问题的上班族",
            "有内脏下垂和小腹突出的产后女性",
            "有甲状腺问题和夜尿频繁的中老年人",
            "偏爱自然调理、不愿承受药物副作用的人",
            "希望在家省时省钱解决问题的人",
            "希望建立简单、安全的家庭日常健康自愈体系的家庭",
        ],

        closingEn: "One course solves 16 common daily health problems. Learn once, benefit for life.",
        closingZh: "一套课程解决16种日常常见健康问题。学一次，受益终生。",
    },

    {
        id: 5,
        titleEn: "Neck & Shoulder Pain Relief",
        titleZh: "肩颈穴位按摩",
        subtitleEn: "8 Neck & Shoulder Conditions • 3 Key Pressure Points • No Doctor Needed",
        subtitleZh: "8种肩颈症状 · 每症3个关键穴位 · 无需就医",
        duration: "~45 min",
        s3Key: "acupressure/lesson-05-neck-shoulders.mp4",
        coverImage: "/images/acupressure-lesson-05.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "8 Common Neck & Shoulder Pains • No Doctor • No Medication • Relieve at Home in 3 Steps. Chronic shoulder blade pain, morning back stiffness, frozen shoulder, Dowager's hump, intercostal neuralgia — this lesson targets 8 of the most persistent neck and shoulder problems using just 3 key pressure points each. No needles, no drugs, no helper needed. Designed for office workers, drivers, and anyone whose pain keeps coming back. One course, solve 8 neck & shoulder problems. Learn once, benefit for life.",
        introZh: "慢性肩胛骨痛、晨起背部僵硬、肩周炎、驼背富贵包、肋间神经痛——这节课针对8种最顽固的肩颈问题，每症仅用3个关键穴位。无需针灸、无需药物、无需他人帮助。专为上班族、司机及疼痛反复发作的人群设计。",

        conditions: [
            "Shoulder blade pain (dull pain at inner edge, worse with sitting)",
            "Back pain (morning stiffness, night pain, better after moving)",
            "Shoulder pain & coldness (constant pain, fear of cold, easy to become frozen shoulder)",
            "Frozen shoulder – cannot lift arm (muscle adhesion, limited upward movement)",
            "Frozen shoulder – cannot reach back (sharp pain at back of shoulder)",
            "Dowager's hump discomfort (stiffness, pain when tilting head back)",
            "Intercostal neuralgia (stabbing, radiating pain between ribs)",
            "Neck & shoulder stiffness from long-term sitting & phone use",
        ],
        conditionsZh: [
            "肩胛骨痛（内侧缘钝痛，久坐加重）",
            "背部疼痛（晨起僵硬，夜间痛，活动后好转）",
            "肩部疼痛与怕冷（持续疼痛、畏寒，易发展为肩周炎）",
            "肩周炎——手臂无法上举（肌肉粘连、上举受限）",
            "肩周炎——无法向后摸背（肩后部剧痛）",
            "驼背富贵包不适（僵硬、仰头时疼痛）",
            "肋间神经痛（肋间刺痛、放射性疼痛）",
            "长期久坐和看手机导致的肩颈僵硬",
        ],

        highlights: [
            { title: "All-Natural Physical Method", desc: "No needles, no drugs, no side effects" },
            { title: "3 Key Pressure Points", desc: "Easy to find, easy to remember, fast relief" },
            { title: "Self-Treatment at Home", desc: "Do it yourself, no helper needed" },
            { title: "Save Time & Money", desc: "No clinic visits, no expensive bills" },
            { title: "Root-Cause Relief", desc: "Treat front for back pain, target deep fascia" },
            { title: "Zero Basics Needed", desc: "No anatomy knowledge required" },
        ],
        highlightsZh: [
            { title: "全天然物理疗法", desc: "不扎针、不吃药、零副作用" },
            { title: "3个关键穴位", desc: "易于找到、易于记忆、快速缓解" },
            { title: "居家自我调理", desc: "自己操作，无需他人帮助" },
            { title: "省时省钱", desc: "无需就医，无需高额账单" },
            { title: "根源缓解", desc: "背痛从前侧治，直达深层筋膜" },
            { title: "零基础入门", desc: "无需解剖学知识" },
        ],

        audience: [
            "Office workers, drivers and people who use phones for long hours",
            "People with chronic, recurring neck & shoulder pain",
            "People with frozen shoulder, limited movement and muscle adhesion",
            "People who prefer safe, natural pain relief",
            "Anyone who wants to stop wasting time and money on pain",
        ],
        audienceZh: [
            "长时间办公、开车和使用手机的人",
            "有慢性、反复发作肩颈痛的人",
            "有肩周炎、活动受限和肌肉粘连的人",
            "偏爱安全、自然止痛方法的人",
            "希望停止为疼痛浪费时间和金钱的所有人",
        ],

        closingEn: "One course, solve 8 neck & shoulder problems. Learn once, benefit for life.",
        closingZh: "一套课程解决8种肩颈问题。学一次，受益终生。",
    },

    {
        id: 6,
        titleEn: "Waist & Leg Pain Relief",
        titleZh: "腰腿穴位按摩",
        subtitleEn: "22 Waist & Leg Conditions • 3 Pressure Points Each • No Surgery Needed",
        subtitleZh: "22种腰腿症状 · 每症3个穴位 · 无需手术",
        duration: "~75 min",
        s3Key: "acupressure/lesson-06-waist-legs-description.mp4",
        coverImage: "/images/acupressure-lesson-06.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "18 Waist & Leg Pains • No Drugs • No Surgery • Relieve at Home in 3 Steps. Sciatica, knee pain, cold legs, calf cramps, tailbone pain, acute lumbar sprains, hemorrhoids — this lesson covers 22 waist and leg problems that affect daily movement and sleep. Every condition is addressed with 3 simple, fixed pressure points. No surgery, no drugs, no side effects. Suitable for seniors, office workers, and anyone who suffers from lower body pain. One course solves 22 waist & leg problems. Learn once, benefit for life.",
        introZh: "坐骨神经痛、膝盖痛、腿部发凉、小腿抽筋、尾骨痛、急性腰扭伤、痔疮——这节课涵盖22种影响日常活动和睡眠的腰腿问题。每种症状运用3个简单固定的穴位。无需手术、无需药物、零副作用。适合老年人、上班族及任何有下肢疼痛的人群。",

        conditions: [
            "Crawling Sensation & Numbness on Outer Lower Leg",
            "Chronically Cold Lower Legs (Poor Circulation)",
            "Calf Cramps (Nocturnal & Cold-Induced)",
            "Outer Thigh Numbness & Sensory Loss",
            "Cold Kneecaps & Knee Cold Intolerance",
            "Inability to Squat or Bend Knees",
            "Knee Pain When Climbing Upstairs",
            "Knee Pain When Going Downstairs",
            "Knee Effusion (Fluid / Water on the Knee)",
            "Back of Knee Pain (Medial / Lateral / Central)",
            "Sciatica (Radiating Pain from Buttock to Leg)",
            "Tailbone (Coccyx) Pain & Discomfort When Sitting",
            "Lower Back Pain When Bending While Seated",
            "Acute Lumbar Sprain & Locked Waist",
            "Sacroiliac Joint Pain & Instability",
            "Back Thigh Aches & Tightness from Sitting",
            "Lower Back Pain from Sneezing / Coughing",
            "Weak Legs & General Fatigue",
            "Acute Hemorrhoids (Pain, Burning, Swelling)",
            "Lumbar Muscle Strain & Stiffness",
            "Poor Lower Body Blood Circulation",
            "Chronic Waist & Leg Overuse Injuries",
        ],
        conditionsZh: [
            "小腿外侧蚁爬感与麻木",
            "慢性腿部发凉（血液循环差）",
            "小腿抽筋（夜间及受凉引发）",
            "大腿外侧麻木与感觉减退",
            "膝盖发凉与膝关节怕冷",
            "无法下蹲或弯曲膝盖",
            "上楼梯膝盖痛",
            "下楼梯膝盖痛",
            "膝关节积液（膝盖肿胀/积水）",
            "膝盖后侧疼痛（内侧/外侧/正中）",
            "坐骨神经痛（从臀部放射至腿部）",
            "尾骨痛及坐下时不适",
            "坐姿弯腰时下腰痛",
            "急性腰扭伤与腰背卡住",
            "骶髂关节痛与不稳定",
            "久坐后大腿后侧酸痛与发紧",
            "打喷嚏/咳嗽引发腰痛",
            "腿部无力与全身疲劳",
            "急性痔疮（疼痛、灼热、肿胀）",
            "腰背肌肉劳损与僵硬",
            "下肢血液循环不畅",
            "慢性腰腿过度使用性损伤",
        ],

        highlights: [
            { title: "100% Natural", desc: "No pills, injections, or side effects" },
            { title: "3 Fixed Points Per Condition", desc: "Easy to find, remember & apply" },
            { title: "Self-Treatment at Home", desc: "Do it yourself anytime, anywhere" },
            { title: "Fast Pain Relief", desc: "Acute sprains, cramps & sharp pain reduce quickly" },
            { title: "Root-Cause Repair", desc: "Long-term improvement for numbness, cold & stiffness" },
            { title: "For All Ages", desc: "Seniors, office workers, manual workers, athletes" },
        ],
        highlightsZh: [
            { title: "100%纯天然", desc: "不吃药、不打针、零副作用" },
            { title: "每症3个固定穴位", desc: "易于找到、记忆和操作" },
            { title: "居家自我调理", desc: "随时随地自己操作" },
            { title: "快速止痛", desc: "急性扭伤、抽筋和剧痛迅速减轻" },
            { title: "根源修复", desc: "麻木、发凉、僵硬长期改善" },
            { title: "全年龄适用", desc: "老年人、上班族、体力劳动者、运动员" },
        ],

        audience: [
            "People with chronic waist, hip, knee or leg pain",
            "Seniors with cold legs, cramps, numbness & weakness",
            "Those who sit or stand for long hours daily",
            "People with sciatica, knee pain, limited mobility",
            "Those who suffer from hemorrhoids, tailbone pain, back stiffness",
            "Anyone who wants safe, drug-free, low-cost pain relief",
            "Anyone who wants a self-healing system for waist & leg health",
        ],
        audienceZh: [
            "有慢性腰部、髋部、膝部或腿部疼痛的人",
            "有腿部发凉、抽筋、麻木、无力的老年人",
            "每天长时间久坐或久站的人",
            "有坐骨神经痛、膝盖痛、活动受限的人",
            "受痔疮、尾骨痛、背部僵硬困扰的人",
            "希望安全、无药、低成本缓解疼痛的所有人",
            "希望建立腰腿健康自愈体系的所有人",
        ],

        closingEn: "One course solves 22 waist & leg problems. Learn once, benefit for life.",
        closingZh: "一套课程解决22种腰腿问题。学一次，受益终生。",
    },
];

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

function ConditionsList({ items }) {
    return (
        <div className="grid gap-2 sm:grid-cols-2">
            {items.map((item, i) => (
                <div key={i} className="flex gap-2.5 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 shrink-0 text-emerald-500 font-bold text-xs leading-none pt-1">✓</span>
                    <span>{item}</span>
                </div>
            ))}
        </div>
    );
}

function HighlightGrid({ items }) {
    return (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            {items.map((h, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-1.5">
                    <p className="text-sm font-bold text-slate-900 leading-snug">{h.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{h.desc}</p>
                </div>
            ))}
        </div>
    );
}

function AudienceList({ items }) {
    return (
        <ul className="space-y-2.5">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 shrink-0 text-amber-500 font-bold text-base leading-none">→</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function LessonDetail({ lesson, isZh }) {
    return (
        <div className="space-y-5">
            {/* Intro */}
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
                    {isZh ? lesson.introZh : lesson.intro}
                </p>
            </div>

            {/* Conditions Covered */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <SectionTitle>
                    {isZh
                        ? `涵盖 ${lesson.conditionsZh.length} 种症状`
                        : `${lesson.conditions.length} Conditions Covered`}
                </SectionTitle>
                <ConditionsList items={isZh ? lesson.conditionsZh : lesson.conditions} />
            </div>

            {/* Course Highlights */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <SectionTitle>{isZh ? "课程亮点" : "Course Highlights"}</SectionTitle>
                <HighlightGrid items={isZh ? lesson.highlightsZh : lesson.highlights} />
            </div>

            {/* Who Is This For */}
            <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
                <SectionTitle>{isZh ? "适合哪些人？" : "Who Is This For?"}</SectionTitle>
                <AudienceList items={isZh ? lesson.audienceZh : lesson.audience} />
            </div>

            {/* Closing */}
            <div className="rounded-3xl bg-slate-900 px-5 py-5 text-center">
                <p className="text-sm font-medium text-white/90 leading-relaxed">
                    {isZh ? lesson.closingZh : lesson.closingEn}
                </p>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 leading-relaxed">
                {isZh
                    ? "免责声明：本课程仅供健康养生与教育参考，不构成医疗建议。如有任何健康问题，请咨询专业医疗人员。"
                    : "Disclaimer: This program is for wellness and educational purposes only and is not medical advice. Please consult a qualified healthcare professional if you have any health concerns."}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function QigongPage({
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

    useEffect(() => { setImgError(false); }, [activeLessonId]);

    function hasAccess(lesson) {
        if (isOwned) return true;
        return purchases.some((p) => {
            if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
            return p.purchase_type === "video" && p.video_key === lesson.s3Key;
        });
    }

    const canPlayActive = useMemo(() => hasAccess(activeLesson), [isOwned, activeLesson, purchases]);

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
        if (!hasAccess(lesson)) {
            if (authLoading) return;
            if (!isLoggedIn) { onGoLogin?.(); return; }
            onPurchase?.("video", {
                courseId: COURSE.courseId,
                videoKey: lesson.s3Key,
                videoTitle: lesson.titleEn,
            });
            return;
        }
        setActiveLessonId(lesson.id);
        setTimeout(() => {
            const el = document.getElementById("ap-video-player");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    }

    function handleUnlockCourse() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("course", { courseId: COURSE.courseId });
    }

    function handleBuyActiveVideo() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("video", {
            courseId: COURSE.courseId,
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
                        {isZh ? COURSE.titleZh : COURSE.titleEn}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">{isZh ? COURSE.titleEn : COURSE.titleZh}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="text-2xl font-bold text-slate-900">{COURSE.priceNow}</span>
                        <span className="text-sm text-slate-400 line-through">{COURSE.priceOld}</span>
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700">
                            {isZh
                                ? `${COURSE.lessonCount} 节课 · 永久观看`
                                : `${COURSE.lessonCount} lessons · lifetime access`}
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
                                    ? `解锁全套课程（共 ${COURSE.lessonCount} 节）· ${COURSE.priceNow}`
                                    : `Unlock Full Course (All ${COURSE.lessonCount} Lessons) · ${COURSE.priceNow}`}
                            </button>
                            <button
                                onClick={handleBuyActiveVideo}
                                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition active:scale-[0.98]"
                            >
                                {isZh
                                    ? `单独购买第 ${activeLesson.id} 节 · NZD 19`
                                    : `Buy Lesson ${activeLesson.id} Only · NZD 19`}
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
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {LESSONS.map((lesson) => {
                            const unlocked = hasAccess(lesson);
                            const active = lesson.id === activeLessonId;
                            return (
                                <button
                                    key={lesson.id}
                                    onClick={() => handleSelectLesson(lesson)}
                                    className={[
                                        "relative flex flex-col items-start gap-1 rounded-2xl border px-3 py-3 text-left transition-all",
                                        active
                                            ? "border-amber-400 bg-amber-50 shadow-sm"
                                            : "border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/40",
                                    ].join(" ")}
                                >
                                    {active && (
                                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500" />
                                    )}
                                    <span className="text-[10px] uppercase tracking-wide text-slate-400">
                                        {isZh ? `第 ${lesson.id} 节` : `Lesson ${lesson.id}`}
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 leading-snug pr-3 line-clamp-2">
                                        {isZh ? lesson.titleZh : lesson.titleEn}
                                    </span>
                                    <span className="text-[10px] text-slate-500">{lesson.duration}</span>
                                    {unlocked ? (
                                        <span className="mt-0.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
                                            {isZh ? "已解锁" : "Unlocked"}
                                        </span>
                                    ) : (
                                        <span className="mt-0.5 rounded-full border border-amber-200 bg-white px-2 py-0.5 text-[9px] text-amber-700">
                                            🔒 NZD 19
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* ══ VIDEO PLAYER ══ */}
                <motion.div
                    id="ap-video-player"
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

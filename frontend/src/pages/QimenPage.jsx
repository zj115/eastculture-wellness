// src/pages/QimenPage.jsx
// Tai Chi System Course — 7 Lessons (Wudang Sanfeng series)
// Same structure as WingChunPage: lesson selector + hero image + video + full detail
// App.jsx props: lang, currentUser, authLoading, isOwned, purchases, onPurchase, onGoLogin

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
    titleEn: "Wudang Sanfeng Tai Chi",
    titleZh: "武当三丰太极系列课",
    priceNow: "NZD 49",
    priceOld: "NZD 79",
    sale: true,
    lessonCount: 7,
};

// ─────────────────────────────────────────────
// LESSON DATA
// ─────────────────────────────────────────────
const LESSONS = [
    {
        id: 1,
        titleEn: "Bone-Invigorating Health Qigong",
        titleZh: "活骨养生功",
        subtitleEn: "11 Minutes | Unblock Joints, Relieve Stiffness, Ease Bone Pain, Strengthen Tendons and Bones",
        subtitleZh: "11分钟 | 通利关节·缓解僵硬·缓解骨痛·强壮筋骨",
        duration: "~11 min",
        s3Key: "taichi/lesson-07-huogu-yangsheng-gong.mp4",
        coverImage: "/images/tai-chi/lesson-07-huogu-yangsheng.png",
        fallbackImage: "/images/taiji-mountain.jpg",

        intro: "Stop enduring joint pain! Don't rely on painkillers and massages that only treat the symptoms, not the root cause! Bone-Invigorating Health Qigong is taught personally by Master Liu Shigao, the 15th-generation authentic inheritor of the Wudang Sanfeng Sect. This 11-minute course is specially designed for stiff joints, cold and aching bone cavities, and sedentary strain. It unblocks stagnation deep in the joints, relieves pain in the shoulders, neck, lower back and knees, and restores flexibility to your joints.",
        introZh: "不要再忍受关节疼痛！不要依赖只治标不治本的止痛药和按摩！活骨养生功由武当三丰派第十五代嫡传传人刘世高道长亲授。这套11分钟的功法专为关节僵硬、骨窍寒凉酸痛、久坐劳损人群而设计，深度疏通关节深层瘀堵，缓解肩颈腰膝疼痛，恢复关节灵活性。",

        painPoints: [
            "Office workers: Stiff and sore shoulders, neck and lower back, difficulty standing after sitting, limited range of motion when turning or bending",
            "Middle-aged and elderly people with joint discomfort: Knee pain, joint cracking, difficulty climbing stairs, worsened symptoms on rainy days",
            "People with minor sports injuries: Mild waist and knee strain, unable to do intense exercise, in need of gentle recovery",
            "People with cold-damp constitution: Cold and tight joints, cold hands and feet, persistent cold pain deep in the bones year-round",
        ],
        painPointsZh: [
            "久坐办公族：肩颈腰背僵硬酸痛，久坐后起立困难，转身弯腰活动受限",
            "中老年关节不适人群：膝盖疼痛、关节弹响、上下楼梯困难，阴雨天症状加重",
            "轻度运动损伤人群：腰膝轻度劳损，无法进行剧烈运动，需要温和恢复",
            "寒湿体质人群：关节寒凉紧绷，手脚冰冷，常年深层骨寒疼痛",
        ],

        instructor: {
            name: "Master Liu Shigao",
            title: "15th-Generation Authentic Inheritor of the Wudang Sanfeng Sect",
            points: [
                "Authentic Lineage: Disciple of Grandmaster Zhong Yunlong, the 14th-generation leader of the Wudang Sanfeng Sect",
                "Professional Achievements: Double champion in international Tai Chi and Tai Chi Sword competitions",
                "Precise Teaching: Trained systematically at the Wudang Zixiao Palace since childhood",
            ],
        },
        instructorZh: {
            name: "刘世高道长",
            title: "武当三丰派第十五代嫡传传人",
            points: [
                "传承正宗：武当三丰派第十四代掌门钟云龙道长亲传弟子",
                "专业成就：国际太极拳及太极剑双料冠军",
                "精准教学：自幼在武当紫霄宫系统修炼，教学严谨细致",
            ],
        },

        benefits: [
            { title: "以气导引，通利关节", desc: "气透骨窍，化解寒湿瘀堵，快速缓解肩腰膝的刺痛、寒痛" },
            { title: '激活关节，消除僵硬', desc: '拉伸韧带与关节囊，改善活动幅度，终结"转身弹响""弯腰费力"' },
            { title: "驱寒除湿", desc: "引阳气入内，排除关节深层寒湿，减少阴雨天不适" },
            { title: "强壮筋骨", desc: "增强肌肉与韧带支撑力，减少关节磨损，防止反复劳损" },
            { title: "省时易坚持", desc: "11分钟短时练习，无需器械，家中或办公室均可进行" },
        ],
        benefitsZh: [
            { title: "以气导引，通利关节", desc: "气透骨窍，化解寒湿瘀堵，快速缓解肩腰膝的刺痛、寒痛" },
            { title: '激活关节，消除僵硬', desc: '拉伸韧带与关节囊，改善活动幅度，终结"转身弹响""弯腰费力"' },
            { title: "驱寒除湿", desc: "引阳气入内，排除关节深层寒湿，减少阴雨天不适" },
            { title: "强壮筋骨", desc: "增强肌肉与韧带支撑力，减少关节磨损，防止反复劳损" },
            { title: "省时易坚持", desc: "11分钟短时练习，无需器械，家中或办公室均可进行" },
        ],

        closingEn: "Stop enduring joint pain at a young age. Bone-Invigorating Health Qigong — 11 minutes to unblock, warm and strengthen your joints every day.",
        closingZh: "不要年纪轻轻就忍受关节疼痛。活骨养生功——每天11分钟，通、暖、壮关节。",
    },

    {
        id: 2,
        titleEn: "Hunyuan Wuji Stance",
        titleZh: "无极混元桩",
        subtitleEn: "10 Minutes | Strengthen Kidney Qi, Secure Primordial Qi, Warm Waist and Knees, Boost Energy",
        subtitleZh: "10分钟 | 补益肾气·固摄元气·温暖腰膝·提升精力",
        duration: "~10 min",
        s3Key: "taichi/lesson-06-wuji-hunyuan-zhuang.mp4",
        coverImage: "/images/tai-chi/lesson-06-hunyuan-zhuang.png",
        fallbackImage: "/images/taiji-mountain.jpg",

        intro: "Stop suffering from physical weakness, fatigue and sore waist and knees! Stop relying blindly on supplements that only make you weaker! Hunyuan Wuji Stance is taught personally by Master Liu Shigao, the 15th-generation authentic inheritor of the Wudang Sanfeng Sect. This 10-minute ancient standing practice is specially designed for those with insufficient kidney Qi, depleted primordial energy, cold hands and feet, and poor concentration. It gathers Qi and consolidates your foundation, replenishing your exhausted body from the root.",
        introZh: "不要再受体虚乏力、腰膝酸软的折磨！不要盲目依赖只会越补越虚的保健品！无极混元桩由武当三丰派第十五代嫡传传人刘世高道长亲授。这套10分钟的古传站桩功专为肾气不足、元气耗损、手足冰凉、注意力不集中的人群而设计，以聚气固本之法，从根源补充耗尽的身体能量。",

        painPoints: [
            "People with insufficient kidney Qi: Sore, weak waist and knees, low energy",
            "People with cold constitution: Cold hands and feet, cold lower abdomen, aversion to wind and cold",
            "People with high stress and late nights: Fatigue, poor concentration, easy palpitations",
            "People with insomnia and restless sleep: Difficulty falling asleep, light sleep, easy waking",
            "People with weak immunity: Prone to colds and frequent minor illnesses",
        ],
        painPointsZh: [
            "肾气不足人群：腰膝酸软无力，精神萎靡",
            "寒性体质人群：手脚冰冷、小腹发凉，怕风怕寒",
            "高压熬夜族：疲惫乏力，注意力不集中，易心悸",
            "失眠多梦人群：入睡困难，睡眠浅，易惊醒",
            "免疫力低下者：容易感冒，频繁小病不断",
        ],

        instructor: {
            name: "Master Liu Shigao",
            title: "15th-Generation Authentic Inheritor of the Wudang Sanfeng Sect",
            points: [
                "Authentic Lineage: Bestowed the Taoist name \"Shigao\" — core 15th-generation inheritor, decades of Wudang internal stance practice",
                "Professional Achievements: Double champion in international Tai Chi and Tai Chi Sword competitions",
                "Precise Teaching: Proficient in the essence of \"gathering Qi through standing and returning to origin\"",
            ],
        },
        instructorZh: {
            name: "刘世高道长",
            title: "武当三丰派第十五代嫡传传人",
            points: [
                "传承正宗：赐道名"世高"，核心第十五代传人，数十年武当内家站桩修炼",
                "专业成就：国际太极拳及太极剑双料冠军",
                "精准教学：精通"以桩聚气、归元复本"之要义",
            ],
        },

        benefits: [
            { title: "Strengthens kidneys and consolidates primordial Qi", desc: "Quickly gathers scattered vital energy, relieves soreness and fatigue" },
            { title: "Warms Yang and dispels cold", desc: "Improves circulation in the lower body, warms hands, feet and abdomen from within" },
            { title: "Calms the mind and stabilizes emotions", desc: "Relieves irritation, calms the heart, deepens sleep" },
            { title: "Boosts energy and eliminates drowsiness", desc: "Keeps you alert and focused during the day" },
            { title: "Zero-threshold and easy to stick to", desc: "10-minute standing practice, no space or equipment required, suitable for all ages" },
        ],
        benefitsZh: [
            { title: "补肾固元气", desc: "快速收聚涣散的精气，缓解酸软疲劳" },
            { title: "温阳散寒", desc: "改善下肢气血循环，由内而外温暖手足与腹部" },
            { title: "宁神稳情绪", desc: "缓解烦躁，安心定神，加深睡眠" },
            { title: "提升精力，消除困倦", desc: "白天保持清醒专注" },
            { title: "零门槛，易坚持", desc: "10分钟站桩，无需场地器械，老少皆宜" },
        ],

        closingEn: "Just 10 minutes a day to gradually recover your scattered vital energy. Hunyuan Wuji Stance — simple, deep, effective.",
        closingZh: "每天仅需10分钟，逐步恢复涣散的精气神。无极混元桩——简单、深厚、有效。",
    },

    {
        id: 3,
        titleEn: "Wudang Taoist Baduanjin",
        titleZh: "武当道门八段锦",
        subtitleEn: "17 Minutes | Strengthen Spleen and Stomach, Improve Digestion, Regulate Metabolism, Reduce Bloating",
        subtitleZh: "17分钟 | 健脾和胃·促进消化·调节代谢·消除胀气",
        duration: "~17 min",
        s3Key: "taichi/lesson-05-wudang-daomen-baduanjin.mp4",
        coverImage: "/images/tai-chi/lesson-05-baduanjin.png",
        fallbackImage: "/images/taiji-mountain.jpg",

        intro: "Stop suffering from weak spleen and stomach, indigestion, bloating and edema! Wudang Taoist Baduanjin is taught personally by Master Liu Shigao, the 15th-generation authentic inheritor of the Wudang Sanfeng Sect. This 17-minute ancient Daoyin practice specially regulates the spleen and stomach, enhances digestion, improves absorption and speeds up metabolism, solving the root problems of poor appetite, malabsorption, weight gain and weakness.",
        introZh: "不要再受脾胃虚弱、消化不良、腹胀水肿的困扰！武当道门八段锦由武当三丰派第十五代嫡传传人刘世高道长亲授。这套17分钟的古传导引功法专门调理脾胃，促进消化，改善吸收，加速代谢，从根源解决食欲不振、营养不吸收、身体虚胖无力等问题。",

        painPoints: [
            "People with weak spleen and stomach: Indigestion, bloating, poor appetite",
            "People with intestinal disorders: Recurring constipation or loose stools, abdominal discomfort",
            "People with bloating and edema: Slow metabolism, fat accumulation, heavy body",
            "People with sallow complexion: Malnutrition, poor absorption, fatigue and laziness",
            "Middle-aged and elderly health seekers: Weak physique, unable to do intense exercise, in need of gentle conditioning",
        ],
        painPointsZh: [
            "脾胃虚弱人群：消化不良、腹胀、食欲不振",
            "肠道功能紊乱者：反复便秘或腹泻，腹部不适",
            "腹胀水肿人群：代谢缓慢，脂肪堆积，身体沉重",
            "面色萎黄人群：营养不良，吸收差，疲倦懒动",
            "中老年养生人群：体质偏弱，无法进行剧烈运动，需要温和调理",
        ],

        instructor: {
            name: "Master Liu Shigao",
            title: "15th-Generation Authentic Inheritor of the Wudang Sanfeng Sect",
            points: [
                "Authentic Lineage: Holding the complete ancient Baduanjin Daoyin tradition passed down from Grandmaster Zhong Yunlong",
                "Professional Achievements: International martial arts champion, proficient in internal organ regulation",
                "Precise Teaching: Breaks down ancient Baduanjin into simple moves, no empty theories — only tangible effects",
            ],
        },
        instructorZh: {
            name: "刘世高道长",
            title: "武当三丰派第十五代嫡传传人",
            points: [
                "传承正宗：持有钟云龙道长所传完整古传八段锦导引体系",
                "专业成就：国际武术冠军，精通脏腑调理",
                "精准教学：将古传八段锦拆解为简单动作，不讲空理，只求实效",
            ],
        },

        benefits: [
            { title: "Strengthens spleen and stomach", desc: "Improves digestion and absorption, relieves bloating, helps nutrients absorb effectively" },
            { title: "Regulates intestines", desc: "Eases constipation and diarrhea, balances intestinal rhythm, stops recurring discomfort" },
            { title: "Boosts metabolism", desc: "Reduces bloating and fat, improves circulation, reduces excess fat and edema" },
            { title: "Replenishes Qi", desc: "Improves sallow complexion, restores rosy color and stronger energy" },
            { title: "Gentle and safe for the whole family", desc: "Soft movements, suitable for beginners, the elderly and weak people" },
        ],
        benefitsZh: [
            { title: "健脾和胃", desc: "改善消化吸收，缓解腹胀，帮助营养有效吸收" },
            { title: "调理肠道", desc: "缓解便秘与腹泻，平衡肠道节律，止住反复不适" },
            { title: "促进代谢", desc: "消除胀气与赘肉，改善气血循环，减少多余脂肪与水肿" },
            { title: "补益正气", desc: "改善面色萎黄，恢复红润气色与充沛精力" },
            { title: "温和安全，全家适用", desc: "动作舒缓，适合初学者、老年人及体质虚弱者" },
        ],

        closingEn: "17 minutes of authentic Wudang Baduanjin — feel your spleen and stomach improve with every practice.",
        closingZh: "17分钟正宗武当八段锦——每次练习都能感受到脾胃的改善。",
    },

    {
        id: 4,
        titleEn: "Tai Chi for Heart Calming",
        titleZh: "太极心神安定功",
        subtitleEn: "11 Minutes | Calm the Mind, Improve Sleep, Stabilize Emotions, Relieve Anxiety",
        subtitleZh: "11分钟 | 宁心安神·改善睡眠·稳定情绪·缓解焦虑",
        duration: "~11 min",
        s3Key: "taichi/lesson-03-wudang-sanfeng-taichi-18-forms.mp4",
        coverImage: "/images/tai-chi/lesson-03-wudang-18forms.png",
        fallbackImage: "/images/taiji-mountain.jpg",

        intro: "Stop being destroyed by insomnia, palpitations, irritation and internal friction! Tai Chi for Heart Calming is taught personally by Master Liu Shigao, the 15th-generation authentic inheritor of the Wudang Sanfeng Sect. This 11-minute gentle Tai Chi set specially calms the mind, relieves stress, improves sleep and soothes emotions, helping you relax mentally and physically.",
        introZh: "不要再被失眠、心悸、烦躁和内耗所摧残！太极心神安定功由武当三丰派第十五代嫡传传人刘世高道长亲授。这套11分钟的柔和太极功法专门宁心安神、舒压解郁、改善睡眠、安抚情绪，帮助你身心彻底放松。",

        painPoints: [
            "People with insomnia: Difficulty falling asleep, light sleep, easy waking, tired after rest",
            "Anxious and stressed people: Irritability, overthinking, mental tension",
            "People with palpitations: Chest tightness, shortness of breath, easy nervousness",
            "People with mental fatigue: Nerve weakness, poor concentration, brain fog",
            "People with internal friction: Low mood, physical and mental exhaustion",
        ],
        painPointsZh: [
            "失眠人群：入睡困难、睡眠浅、易惊醒，休息后仍感疲惫",
            "焦虑压力大的人：烦躁易怒，思虑过度，精神紧绷",
            "心悸人群：胸闷气短，容易紧张",
            "精神疲劳者：神经衰弱，注意力不集中，脑子昏沉",
            "内耗严重的人：情绪低落，身心俱疲",
        ],

        instructor: {
            name: "Master Liu Shigao",
            title: "15th-Generation Authentic Inheritor of the Wudang Sanfeng Sect",
            points: [
                "Authentic Lineage: Proficient in Tai Chi static practice and heart-nourishing methods",
                "Professional Achievements: International Tai Chi champion, steady and gentle movements",
                "Practical Teaching: Specially designed for stressed, insomniac and anxious people",
            ],
        },
        instructorZh: {
            name: "刘世高道长",
            title: "武当三丰派第十五代嫡传传人",
            points: [
                "传承正宗：精通太极静功与养心之法",
                "专业成就：国际太极拳冠军，动作稳健柔和",
                "实用教学：专为压力大、失眠、焦虑人群量身设计",
            ],
        },

        benefits: [
            { title: "Calms the heart and relieves anxiety", desc: "Releases mental pressure, stabilizes emotions" },
            { title: "Improves insomnia and sleep quality", desc: "Faster onset, deeper sleep, more energy upon waking" },
            { title: "Relieves palpitations and chest tightness", desc: "Balances breathing, eases discomfort" },
            { title: "Relaxes the brain and reduces fatigue", desc: "Sharpens the mind, improves focus" },
            { title: "Time-efficient and sustainable", desc: "11-minute practice, suitable for morning or night" },
        ],
        benefitsZh: [
            { title: "宁心解焦虑", desc: "释放精神压力，稳定情绪" },
            { title: "改善失眠，提升睡眠质量", desc: "入睡更快，睡眠更深，醒来精力充沛" },
            { title: "缓解心悸胸闷", desc: "平衡呼吸，缓解不适感" },
            { title: "放松大脑，消除疲劳", desc: "思维清晰，专注力提升" },
            { title: "高效省时，易于坚持", desc: "11分钟练习，早晨或夜间均适合" },
        ],

        closingEn: "The heart governs the spirit. An unsettled heart leads to poor sleep and weak health. Practice daily — more peace with every session.",
        closingZh: "心藏神，心神不安则睡眠差、身体虚。每日练习——每次都能收获更多宁静。",
    },

    {
        id: 5,
        titleEn: "Tai Chi for Soothing the Liver",
        titleZh: "太极疏肝理气功",
        subtitleEn: "11 Minutes | Release Liver Stagnation, Clear Liver Fire, Relieve Chest Tightness, Smooth Qi Flow",
        subtitleZh: "11分钟 | 疏解肝郁·清泄肝火·缓解胸闷·畅通气机",
        duration: "~11 min",
        s3Key: "taichi/lesson-02-wudang-sanfeng-taichi-13-forms.mp4",
        coverImage: "/images/tai-chi/lesson-02-wudang-13forms.png",
        fallbackImage: "/images/taiji-mountain.jpg",

        intro: "Stop letting liver Qi stagnation, chest tightness, irritation and acne harm your body! Tai Chi for Soothing the Liver is taught personally by Master Liu Shigao, the 15th-generation authentic inheritor of the Wudang Sanfeng Sect. This 11-minute stretching Tai Chi set specially soothes the liver, regulates Qi, releases stagnation and clears liver fire, making your body free of blockage, tightness and irritation.",
        introZh: "不要再让肝气郁结、胸闷、烦躁和痤疮伤害你的身体！太极疏肝理气功由武当三丰派第十五代嫡传传人刘世高道长亲授。这套11分钟的舒展太极功法专门疏肝理气、解郁清火，让你的身体彻底摆脱瘀堵、紧绷与烦躁。",

        painPoints: [
            "People with liver Qi stagnation: Chest tightness, frequent sighing, rib pain",
            "Irritable people: Bad temper, depression, strong mood swings",
            "People with liver damage from late nights: Bitter mouth, acne, dry eyes",
            "People with Qi stagnation: Dizziness, body tightness, blocked meridians",
            "Women in need of regulation: Breast tenderness and mood swings before menstruation",
        ],
        painPointsZh: [
            "肝气郁结人群：胸胁胀闷、频繁叹气、两胁疼痛",
            "易怒暴躁人群：脾气差，情绪低落，情绪波动剧烈",
            "熬夜伤肝人群：口苦、长痘、眼睛干涩",
            "气滞体质者：头晕、全身紧绷、经络不畅",
            "需要调理的女性：经前乳房胀痛及情绪波动",
        ],

        instructor: {
            name: "Master Liu Shigao",
            title: "15th-Generation Authentic Inheritor of the Wudang Sanfeng Sect",
            points: [
                "Authentic Lineage: Proficient in meridian stretching and Qi regulation",
                "Professional Achievements: International Tai Chi champion, open and smooth movements with clear Qi paths",
                "Precise Teaching: Simple and easy to learn, specially designed for liver meridian blockage",
            ],
        },
        instructorZh: {
            name: "刘世高道长",
            title: "武当三丰派第十五代嫡传传人",
            points: [
                "传承正宗：精通经络拉伸与气机调理",
                "专业成就：国际太极拳冠军，动作舒展流畅，气路清晰",
                "精准教学：简单易学，专为肝经瘀堵人群量身设计",
            ],
        },

        benefits: [
            { title: "Soothes the liver and regulates Qi", desc: "Eliminates chest tightness and sighing, relaxes the body" },
            { title: "Clears liver fire", desc: "Relieves bitter mouth, dry eyes and irritation" },
            { title: "Smooths Qi flow and unblocks meridians", desc: "Reduces body tightness and soreness" },
            { title: "Calms emotions", desc: "Less anger, less internal friction, more ease" },
            { title: "Simple and efficient", desc: "11-minute stretching, usable at work or home" },
        ],
        benefitsZh: [
            { title: "疏肝理气", desc: "消除胸胁胀闷与叹气，放松全身" },
            { title: "清泄肝火", desc: "缓解口苦、眼干与烦躁" },
            { title: "畅通气机，疏通经络", desc: "减少全身紧绷与酸痛" },
            { title: "安抚情绪", desc: "少怒少内耗，心境更舒畅" },
            { title: "简单高效", desc: "11分钟舒展练习，工作或居家均可进行" },
        ],

        closingEn: "The liver governs free flow of Qi. Once unblocked, the whole body flows. Soothe the liver — feel the difference every day.",
        closingZh: "肝主疏泄，一旦畅通，全身气血皆流。疏肝理气——每天都能感受到不同。",
    },

    {
        id: 6,
        titleEn: "Tai Chi for Nourishing the Lungs",
        titleZh: "太极养肺功",
        subtitleEn: "28 Minutes | Moisten Lung Qi, Boost Immunity, Relieve Coughing, Soothe Throat and Nose",
        subtitleZh: "28分钟 | 润养肺气·增强免疫·缓解咳嗽·舒缓咽喉鼻腔",
        duration: "~28 min",
        s3Key: "taichi/lesson-01-wudang-sanfeng-taichi-28-forms.mp4",
        coverImage: "/images/tai-chi/lesson-01-wudang-28forms.png",
        fallbackImage: "/images/taiji-mountain.jpg",

        intro: "Stop catching colds every season and feeling uncomfortable in the wind! Tai Chi for Nourishing the Lungs is taught personally by Master Liu Shigao, the 15th-generation authentic inheritor of the Wudang Sanfeng Sect. This 28-minute breath-coordinated Tai Chi set specially moistens the lungs, strengthens lung Qi, improves immunity and relieves dry throat, making you full of energy with stronger defense.",
        introZh: "不要再每季换季就感冒，吹风就不舒服！太极养肺功由武当三丰派第十五代嫡传传人刘世高道长亲授。这套28分钟调息配合的太极功法专门润养肺脏、强健肺气、提升免疫力、缓解咽干，让你精力充沛、防御力更强。",

        painPoints: [
            "People with weak lung Qi: Prone to colds, low immunity, weak health",
            "People with throat discomfort: Dry throat, easy coughing, phlegm discomfort",
            "People with shallow breathing: Shortness of breath, weak voice, chest tightness",
            "Public speakers and voice users: Teachers, streamers with chronic throat fatigue",
            "People in dry environments: Nasal dryness, skin dryness, sensitive lungs",
        ],
        painPointsZh: [
            "肺气虚弱人群：容易感冒，免疫力低，体质偏弱",
            "咽喉不适者：咽干易咳，痰多不适",
            "呼吸浅短人群：气短无力，声音弱，胸闷",
            "需要用嗓的人群：教师、主播等慢性咽喉疲劳者",
            "干燥环境人群：鼻腔干燥，皮肤干燥，肺部敏感",
        ],

        instructor: {
            name: "Master Liu Shigao",
            title: "15th-Generation Authentic Inheritor of the Wudang Sanfeng Sect",
            points: [
                "Authentic Lineage: Direct inheritor, proficient in breath Daoyin and lung regulation",
                "Professional Achievements: International Tai Chi champion, expert in guiding Qi with form",
                "Practical Teaching: Movements matched with breathing, easy to learn, obvious long-term effects",
            ],
        },
        instructorZh: {
            name: "刘世高道长",
            title: "武当三丰派第十五代嫡传传人",
            points: [
                "传承正宗：嫡传传人，精通调息导引与肺脏调养",
                "专业成就：国际太极拳冠军，擅长以形导气",
                "实用教学：动作与呼吸相配合，易学易练，长期效果明显",
            ],
        },

        benefits: [
            { title: "Moistens lungs and boosts lung function", desc: "Deepens breathing, relieves shortness of breath" },
            { title: "Enhances immunity", desc: "Reduces seasonal colds, strengthens external defense" },
            { title: "Relieves dry throat and coughing", desc: "Moistens nose and throat, reduces irritation" },
            { title: "Replenishes Qi and improves complexion", desc: "Boosts energy, strengthens voice" },
            { title: "Gentle health care", desc: "Suitable for the weak, elderly and beginners" },
        ],
        benefitsZh: [
            { title: "润肺养肺，增强肺功能", desc: "加深呼吸，缓解气短无力" },
            { title: "增强免疫力", desc: "减少季节性感冒，强化体表防御" },
            { title: "缓解咽干咳嗽", desc: "滋润鼻腔与咽喉，减少刺激不适" },
            { title: "补益正气，改善气色", desc: "精力更充沛，声音更有力" },
            { title: "温和养生", desc: "适合体虚者、老年人及初学者" },
        ],

        closingEn: "The lungs govern Qi of the whole body. Strong lung Qi means a strong body. Practice daily — breathe deeper, live better.",
        closingZh: "肺主一身之气，肺气强则身体强。每日练习——呼吸更深，生活更好。",
    },

    {
        id: 7,
        titleEn: "Tai Chi for Qi and Blood Regulation",
        titleZh: "太极调气活血功",
        subtitleEn: "30 Minutes | Balance Qi and Blood, Nourish Five Organs, Unblock the Whole Body, Strengthen the Foundation",
        subtitleZh: "30分钟 | 平衡气血·滋养五脏·疏通全身·强健根基",
        duration: "~30 min",
        s3Key: "taichi/lesson-04-wudang-sanfeng-taichi-108-forms.mp4",
        coverImage: "/images/tai-chi/lesson-04-wudang-108forms.png",
        fallbackImage: "/images/taiji-mountain.jpg",

        intro: "Stop suffering from Qi and blood deficiency, organ imbalance and overall sub-health! Tai Chi for Qi and Blood Regulation is taught personally by Master Liu Shigao, the 15th-generation authentic inheritor of the Wudang Sanfeng Sect. This 30-minute complete Tai Chi set balances Qi and blood, nourishes the heart, liver, spleen, lungs and kidneys, unblocks meridians, providing full-body conditioning in one practice.",
        introZh: "不要再受气血不足、脏腑失调、全面亚健康的折磨！太极调气活血功由武当三丰派第十五代嫡传传人刘世高道长亲授。这套30分钟完整太极功法平衡气血、滋养心肝脾肺肾、疏通经络，一套功法完成全身综合调养。",

        painPoints: [
            "People with Qi and blood deficiency: Sallow complexion, dizziness, fatigue, numb hands and feet",
            "People with organ disorders: Combined heart, liver, spleen, lung and kidney weakness",
            "People with full-body sub-health: Aches, fatigue, poor sleep, bad complexion",
            "Middle-aged and elderly health seekers: Declining health, in need of comprehensive anti-aging care",
            "Systematic health lovers: Want one complete routine instead of mixed fragments",
        ],
        painPointsZh: [
            "气血两虚人群：面色萎黄、头晕乏力、手脚麻木",
            "脏腑失调者：心肝脾肺肾综合虚弱",
            "全面亚健康人群：酸痛疲惫、睡眠差、气色差",
            "中老年养生人群：体质下滑，需要全面抗衰调养",
            "系统养生爱好者：希望用一套完整功法代替零散片段",
        ],

        instructor: {
            name: "Master Liu Shigao",
            title: "15th-Generation Authentic Inheritor of the Wudang Sanfeng Sect",
            points: [
                "Authentic Lineage: Holding the complete Wudang Tai Chi system, proficient in Qi, blood and organ regulation",
                "Professional Achievements: International Tai Chi champion, integrating heart, liver, spleen, lung and kidney nourishment",
                "Systematic Teaching: Step-by-step, full-body coverage in one complete set",
            ],
        },
        instructorZh: {
            name: "刘世高道长",
            title: "武当三丰派第十五代嫡传传人",
            points: [
                "传承正宗：持有完整武当太极体系，精通气血与脏腑调理",
                "专业成就：国际太极拳冠军，融合心肝脾肺肾全面滋养",
                "系统教学：循序渐进，一套功法覆盖全身",
            ],
        },

        benefits: [
            { title: "Balances full-body Qi and blood", desc: "Improves pale complexion, dizziness and fatigue" },
            { title: "Nourishes five internal organs", desc: "Synchronously balances heart, liver, spleen, lungs and kidneys" },
            { title: "Unblocks full-body meridians", desc: "Relieves soreness, stiffness and stagnation" },
            { title: "Strengthens foundation and immunity", desc: "Slows aging, boosts energy" },
            { title: "All-in-one full-body practice", desc: "One set completes full-body conditioning without switching routines" },
        ],
        benefitsZh: [
            { title: "平衡全身气血", desc: "改善面色萎黄、头晕乏力" },
            { title: "滋养五脏", desc: "同步调和心肝脾肺肾" },
            { title: "疏通全身经络", desc: "缓解酸痛、僵硬与气滞" },
            { title: "强健根基，提升免疫", desc: "延缓衰老，精力更充沛" },
            { title: "一套功法，全身调养", desc: "无需切换功法，一套完成全身综合调养" },
        ],

        closingEn: "Imbalanced Qi and blood lead to disordered organs. This comprehensive practice regulates both — nourishing all at once, leaving you fully open after every session.",
        closingZh: "气血失衡则脏腑失调。这套综合功法双管齐下——一次滋养全身，每次练习后身心畅通无阻。",
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

function BenefitsList({ items }) {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {items.map((b, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-1.5">
                    <p className="text-sm font-semibold text-slate-900 leading-snug">
                        <span className="text-emerald-600 mr-1.5">✓</span>{b.title}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed pl-5">{b.desc}</p>
                </div>
            ))}
        </div>
    );
}

function InstructorCard({ instructor }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <div>
                <p className="text-sm font-bold text-slate-900">{instructor.name}</p>
                <p className="text-xs text-amber-700 mt-0.5">{instructor.title}</p>
            </div>
            <ul className="space-y-1.5">
                {instructor.points.map((pt, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                        <span className="shrink-0 text-slate-400 mt-0.5">•</span>
                        <span>{pt}</span>
                    </li>
                ))}
            </ul>
        </div>
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

            {/* Pain Points */}
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                <SectionTitle>{isZh ? "适合哪些人？" : "Who Is This For?"}</SectionTitle>
                <PainPointsList items={isZh ? lesson.painPointsZh : lesson.painPoints} />
            </div>

            {/* Benefits */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <SectionTitle>{isZh ? "核心功效" : "Core Benefits"}</SectionTitle>
                <BenefitsList items={isZh ? lesson.benefitsZh : lesson.benefits} />
            </div>

            {/* Instructor */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <SectionTitle>{isZh ? "主讲老师" : "Instructor"}</SectionTitle>
                <InstructorCard instructor={isZh ? lesson.instructorZh : lesson.instructor} />
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
                    ? "免责声明：本课程仅供健康养生参考，不构成医疗建议。如有任何健康问题，请咨询专业医疗人员。"
                    : "Disclaimer: This program is for wellness purposes only and is not medical advice. Please consult a qualified healthcare professional if you have any health concerns."}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function QimenPage({
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
                courseId: "taichi",
                videoKey: lesson.s3Key,
                videoTitle: lesson.titleEn,
            });
            return;
        }
        setActiveLessonId(lesson.id);
        setTimeout(() => {
            const el = document.getElementById("tc-video-player");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    }

    function handleUnlockCourse() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("course", { courseId: "taichi" });
    }

    function handleBuyActiveVideo() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("video", {
            courseId: "taichi",
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
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
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
                                            🔒 NZD 10
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* ══ VIDEO PLAYER ══ */}
                <motion.div
                    id="tc-video-player"
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

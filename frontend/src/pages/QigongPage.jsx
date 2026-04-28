// src/pages/QigongPage.jsx
// Acupressure Masterclass — 6 Lessons
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
    titleEn: "Quick Relief Acupressure Self-Care Master Course",
    subtitleEn: "Full Step-by-Step Acupressure Course. No Medication, No Professional Help Needed. Easy Guided Home Routines, Fast Gentle Body Comfort & Build Long-Lasting Natural Daily Wellness.",
    priceNow: "$174",
    priceOld: "$299.99",
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
        titleEn: "Head Tension & Heavy Discomfort Release",
        subtitleEn: "Ease 23 Types Of Head & Neck Tightness | 3 Simple Moves For Instant Calm At Home",
        duration: "~60 min",
        s3Key: "acupressure/lesson-01-head.mp4",
        coverImage: "/images/acupoint-head.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "23 Head & Face Issues • No Drugs • No Doctors • Relieve at Home in 3 Steps\n\nPain points you're suffering from:\nOccipital headache (back of head pain), worse with bad pillow or stress\nTop of head pain & tightness from liver fire, stomach fire or heart issues\nMiddle ear discharge & pus, ear infection, pain, hearing loss\nTinnitus (ringing, buzzing, chirping in ears), worse at night\nUpper & lower toothache, radiating pain, multiple teeth hurting\nGum swelling, facial puffiness, severe oral discomfort\nExcessive tearing when wind blows, watery eyes\nDry eyes, itchy eyes, eye strain, blurred vision\nSore throat, dry throat, pain when swallowing\nPersistent hiccups, diaphragm spasms, embarrassing attacks\nStyes (blepharitis), swollen eyelids, painful bumps\nNasal congestion, stuffy nose, blocked sinuses\nStiff neck / crick neck (cannot turn, lower or raise head)\nEye bags, puffiness, saggy eyelids, tired-looking eyes\nScalp pain, tight fascia, cold & dampness discomfort\nFolliculitis on scalp, bumps, inflammation, itching\nEye bulging, pressure behind eyeballs, nerve discomfort\nFrontal headache, tightness like wearing a tight hat\nMigraine (temple pain), anger or cold-induced headaches\nFacial tension, nerve sensitivity, recurring discomforts",

        conditions: [
            "Back of Head Headache (Occipital Pain)",
            "Top of Head Pain & Tightness（4：27）",
            "Frontal Headache & Forehead Tightness（1：17：02）",
            "Migraine & Temple Pain（1：27：52）",
            "Scalp Pain & Tight Fascia（1：20：37）",
            "Stiff Neck (Cannot Turn / Lower / Raise Head) （48：39）",
            "Tinnitus (Ear Ringing/Buzzing) （12：15）",
            "Otitis Media, Ear Discharge & Pus（8：41）",
            "Upper Toothache（16：41）",
            "Lower Toothache（20：01）",
            "Gum Swelling & Facial Puffiness（1：05：58）",
            "Excessive Tearing (Wind-Induced) （24：09）",
            "Dry Eyes & Eye Fatigue（44：33）",
            "Eyeball Swelling & Bulging Feeling（1：09：32）",
            "Blurred Vision & Poor Clarity（1：31：21）",
            "Styes (Eyelid Bumps) （36：45）",
            "Saggy Eyelids (Droopy Upper Lids) （1：24：05）",
            "Eye Bags & Under-Eye Puffiness（52：54）",
            "Nasal Congestion & Stuffy Nose（40：30）",
            "Sore Throat & Painful Swallowing（29：06）",
            "Persistent Hiccups (Diaphragm Spasm) （32：52）",
            "Scalp Folliculitis & Bumps（57：21）",
            "Dizziness & Poor Blood Circulation to Head（1：02：05）",
        ],

        highlights: [
            { title: "100% natural physical method", desc: "No pills, no injections, no side effects" },
            { title: "3 fixed pressure points per condition", desc: "Easy to find, remember and use" },
            { title: "Self-treatment at home", desc: "Do it yourself anytime, anywhere" },
            { title: "Fast relief", desc: "Headaches, toothaches, hiccups, congestion reduce quickly" },
            { title: "Root-cause repair", desc: "Long-term improvement for tinnitus, dry eyes, scalp issues" },
            { title: "Zero experience needed", desc: "No anatomy or meridian knowledge required" },
            { title: "For all ages", desc: "Adults, seniors, students, office workers" },
        ],

        audience: [
            "People with frequent headaches, migraines, dizziness",
            "Those with eye strain, dry eyes, blurred vision from screen use",
            "People suffering from toothache, gum swelling, oral discomfort",
            "Those with tinnitus, ear infections, ear discharge",
            "People with stiff neck, limited neck movement",
            "Those with nasal congestion, sore throat, recurring hiccups",
            "People with scalp pain, folliculitis, eye bags, saggy eyelids",
            "Anyone who wants safe, natural, drug-free relief at home",
        ],

        closingEn: "One course solves 23 head & face problems. Learn once, benefit for life.",
    },

    {
        id: 6,
        titleEn: "Women's Private Body Comfort Care",
        subtitleEn: "Soothe 7 Common Female Daily Discomforts | Gentle, Private At-Home Wellness",
        duration: "~40 min",
        s3Key: "acupressure/lesson-02-women.mp4",
        coverImage: "/images/acupoint-womens.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "7 Most Common Women's Private Issues • No Drugs • No Embarrassment • Relieve at Home in 3 Steps\n\nPain points you're suffering from:\nBreast hyperplasia with lumps and severe pain during menstruation, worse when angry or tired\nPopliteal cyst (lump behind knee), pain when squatting or walking, difficulty bending legs\nPrivate area itching that comes and goes, unbearable and embarrassing, affecting work and life\nSevere menstrual cramps: stabbing abdominal pain, cold sweats, unable to get out of bed\nUrine leakage when coughing, laughing, or lifting; common after childbirth, causing social anxiety\nIrregular periods, delayed or missed for months, worrying about early ovarian aging\nHeavy menstrual bleeding (flooding), weakness and dizziness, uncontrollable flow\nExpensive hospital visits, long waiting times, and embarrassing private exams\nMedications with side effects, temporary relief from creams, no real solution\nLong-term physical and mental stress, affecting sleep, mood, and confidence",

        conditions: [
            "Breast Hyperplasia – breast lumps, menstrual pain, tenderness on the sides",
            "Popliteal Cyst – bulge behind knee, pain with squatting, walking discomfort（4：26）",
            "Private Area Itching – recurring itch, quick relief for acute symptoms, long-term root repair（8：34）",
            "Menstrual Cramps – acute abdominal pain, fast pain relief during attacks（14：13）",
            "Urine Leakage – leakage with cough/laugh, postnatal weakness, pelvic floor relaxation（16：14）",
            "Delayed/Missed Periods – irregular cycles, amenorrhea (not menopause)（21：03）",
            "Heavy Menstrual Bleeding – uncontrollable flow, physical weakness（25：35）",
        ],

        highlights: [
            { title: "100% natural physical method", desc: "No drugs, no needles, no rinsing, no side effects" },
            { title: "Fixed pressure points", desc: "3–5 key points per issue, easy to find, remember, and use" },
            { title: "Private & safe", desc: "Do it yourself at home, no help needed, no embarrassment" },
            { title: "Save time & money", desc: "No hospital visits, no expensive treatments, 5–10 minutes a day" },
            { title: "Acute + chronic care", desc: "Fast relief for sudden symptoms, long-term prevention" },
            { title: "Zero basics required", desc: "No anatomy or meridian knowledge needed" },
            { title: "Gentle & effective", desc: "Safe for all ages, including postpartum women" },
        ],

        audience: [
            "Women with breast lumps, tenderness, or menstrual breast pain",
            "People with popliteal cysts and knee movement discomfort",
            "Women suffering from recurring private itching",
            "Women with severe menstrual cramps relying on painkillers",
            "Postpartum women or those with urine leakage when coughing/laughing",
            "Women with irregular, delayed, or missed periods",
            "Women with heavy, prolonged menstrual bleeding",
            "Women who value privacy and prefer safe, natural healing",
            "Anyone who wants to stop wasting time and money on private health issues",
        ],

        closingEn: "One course solves 7 common women's problems. Learn once, benefit for life - gentle, natural, and completely private.",
    },

    {
        id: 2,
        titleEn: "Hand & Foot Stiff & Tired Recovery",
        subtitleEn: "Relax 28 Kinds Of Limb Stiffness & Discomfort | Easy Daily Self Care",
        duration: "~90 min",
        s3Key: "acupressure/lesson-03-hands-feet.mp4",
        coverImage: "/images/acupoint-hands-feet.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "25 Common Hand & Foot Pains • No Drugs • No Doctors • Relieve at Home in 3 Steps\n\nPain points you're suffering from:\nTrigger finger (middle finger locks, can't straighten or bend)\nGolfer's elbow (inner elbow pain when sweeping, cooking)\nHeel pain (worse with walking, can't stand long)\nChronic athlete's foot (itching, blisters, peeling, recurring)\nMorning hand stiffness, can't make a fist, weak grip\nPinky & ring finger numbness (wake up numb at night)\nSprained ankle (inversion & eversion, swelling, pain)\nTinea manuum (itchy blisters on palms, seasonal)\nTennis elbow (pain when twisting towels, sweeping)\nWeak walking (fatigue, low energy, weak legs)\nThumb tenosynovitis & mom's wrist (pain from holding baby, phone use)\nFingertip numbness (cervical-related, tingling)\nWrist pain when turning\nRestless legs (uncomfortable, can't sleep, no place to put legs)\nArm can't reach back (shoulder pain, limited movement)\nPlantar fasciitis (sharp pain first step in morning)\nNight arm pain (worse at night, radiating pain)\nForearm outer stabbing pain (severe, untouchable)\nArmpit cyst (lump, lymphatic congestion)\nPalm pain when gripping (throttle, grip pain)\nFront shin pain (pain when lifting foot, stepping on gas)\nArch pain (sore when standing or walking)\nBunion (big toe deformity, rubbing pain, walking discomfort)\nVarious hand & foot stiffness, numbness, soreness, weakness\nWasting time and money at clinics, medicines with side effects",

        conditions: [
            "Middle Trigger Finger",
            "Golfer's Elbow (Medial Epicondylitis)（3：31）",
            "Heel Pain (Worse When Walking)（8：26）",
            "Athlete's Foot (Beriberi) （12：30）",
            "Morning Hand Stiffness & Weak Grip（15：41）",
            "Pinky & Ring Finger Numbness（19：17）",
            "Ankle Sprain (Inversion & Eversion) （23：57）",
            "Tinea Manuum (Palmer Blisters & Itch) （27：47）",
            "Tennis Elbow (Lateral Epicondylitis) （31：00）",
            "Senior Walking Weakness & Fatigue（34：40）",
            "Thumb Tenosynovitis（38：59）",
            "Fingertip Numbness（42：55）",
            "Wrist Pain When Flipping（47：47）",
            "Restless Legs Syndrome（51：20）",
            "Arm Cannot Reach Back (Anterior Shoulder Pain) （54：20）",
            "Plantar Fasciitis (Morning First Step Pain) （57：49）",
            "Night Arm Radiating Pain（1：01：34）",
            "Forearm Outer Stabbing Pain（1：07：10）",
            "Armpit Cyst & Lymphatic Congestion（1：11：14）",
            "Palm Pain When Gripping（1：16：04）",
            "Front Shin Pain (Tibialis Anterior Pain) （1：20：08）",
            "Foot Arch Pain（1：24：43）",
            "Mom's Wrist (De Quervain's Tenosynovitis) （1：28：38）",
            "Bunion (Hallux Valgus) （1：32：51）",
            "Arm Cannot Reach Back (Posterior Shoulder Pain) （1：37：46）",
        ],

        highlights: [
            { title: "100% natural physical method", desc: "No pills, no injections, no side effects" },
            { title: "3 fixed pressure points for each problem", desc: "Easy to find, remember and use" },
            { title: "Self-treatment at home", desc: "Do it yourself anytime, anywhere" },
            { title: "Fast pain relief", desc: "Acute pain reduces immediately" },
            { title: "Root-cause repair", desc: "Improve tenosynovitis, numbness, strain long-term" },
            { title: "Zero basics needed", desc: "No meridian or anatomy knowledge required" },
            { title: "For the whole family", desc: "Workers, housewives, seniors, kids" },
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

        closingEn: "One course solves 28 hand & foot problems. Learn once, benefit for life.",
    },

    {
        id: 3,
        titleEn: "Full Body Daily Fatigue & Tension Care",
        subtitleEn: "Ease 16 Common Everyday Body Stiffness | No Extra Tools Needed",
        duration: "~60 min",
        s3Key: "acupressure/lesson-04-daily-issues.mp4",
        coverImage: "/images/acupoint-daily.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "16 Common Daily Aches & Pains • No Drugs • No Doctors • Relieve at Home in 3 Steps\n\nPain points you're suffering from:\nSharp tongue tip pain that makes eating and talking uncomfortable\nSevere carsickness: nausea, vomiting, dizziness every time you travel\nVisceral ptosis, protruding lower belly, loose postpartum abdomen\nBloating, fullness, slow digestion, food sits in your stomach for hours\nChest tightness, pressure, anxiety, but no problems found in hospital checks\nUncontrolled mouth twitching, embarrassing facial spasms\nExtreme restlessness, anxiety, irritability, especially early in the morning\nNight sweats, waking up wet, poor sleep, body weakness\nSudden rapid heartbeat, heart palpitations, panic for no reason\nInsomnia: lying awake for hours, overactive nerves, poor sleep quality\nNo appetite, don't feel like eating, low energy, weight loss\nBurning pain when urinating, urgent and frequent trips to the bathroom\nSudden side stitch (rib pain), sharp pain when breathing or moving\nTeeth grinding at night, worn teeth, sore jaw, disturbing family\nRecurrent mouth ulcers, severe pain, slow healing\nThyroid nodules or cysts, neck tightness, discomfort\nFrequent nighttime urination, waking up 4-6 times a night, no good sleep\nSudden diarrhea, stomach cramps, loose bowels after eating bad food\nWasting time and money on clinics, medicines with side effects, repeated problems",

        conditions: [
            "Tongue Tip Pain – burning, stabbing pain, recurring discomfort",
            "Motion Sickness – nausea, vomiting, dizziness, travel anxiety（3：53）",
            "Visceral Ptosis – protruding lower belly, postpartum relaxation（8：05）",
            "Stomach Bloating – slow digestion, fullness, discomfort after meals（15：03）",
            "Chest Tightness – pressure, fake heart symptoms, unexplained discomfort（18：16）",
            "Facial/Mouth Twitching – involuntary spasms, nerve-related tics（21:57）",
            "Emotional Restlessness – anxiety, irritability, inner panic(26:04)",
            "Night Sweats – nighttime sweating, yin deficiency, weak sleep（29：42）",
            "Rapid Heartbeat – sudden palpitations, fast heart rate（33：39）",
            "Insomnia – difficulty falling asleep, restlessness, poor sleep（36：58）",
            "Loss of Appetite – no desire to eat, low energy（41：06）",
            "Burning Urination – discomfort, urgency, frequent urination（44：50）",
            "Side Stitch – sharp rib pain when breathing or moving（48：27）",
            "Night Teeth Grinding – sleep grinding, jaw pain, worn teeth（52：45）",
            "Mouth Ulcers – recurring sores, pain, slow healing（57：18）",
            "Thyroid Nodules/Cysts – neck tightness, lumps, discomfort（1：00：29）",
            "Frequent Night Urination – nighttime bathroom trips, disturbed sleep（1：04：35）",
            "Acute Diarrhea – stomach cramps, loose bowels, sudden attacks（1：07：53）",
        ],

        highlights: [
            { title: "100% natural physical method", desc: "No pills, no needles, no side effects" },
            { title: "3 fixed pressure points for each issue", desc: "Easy to find, remember and use" },
            { title: "Self-treatment at home", desc: "Do it yourself anytime, anywhere" },
            { title: "Fast results", desc: "Quick relief for acute symptoms, long-term improvement" },
            { title: "Save time & money", desc: "No clinic visits, no expensive bills" },
            { title: "Zero experience needed", desc: "No anatomy or meridian knowledge required" },
            { title: "For the whole family", desc: "Adults, seniors, daily common problems all covered" },
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

        closingEn: "One course solves 16 common daily health problems. Learn once, benefit for life.",
    },

    {
        id: 4,
        titleEn: "Neck & Shoulder Tightness Relief",
        subtitleEn: "Release 8 Types Of Upper Body Soreness | Quick 5-Minute Daily Routine",
        duration: "~45 min",
        s3Key: "acupressure/lesson-05-neck-shoulders.mp4",
        coverImage: "/images/acupoint-neck-shoulder.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "8 Common Neck & Shoulder Pains • No Doctor • No Medication • Relieve at Home in 3 Steps\n\nPain points you're suffering from:\nChronic shoulder blade pain that hurts even when you're not moving\nMorning back stiffness that makes it hard to get out of bed\nShoulder pain and coldness that gets worse in air conditioning\nFrozen shoulder: can't lift your arm, can't reach back, sharp pulling pain\nNeck pain, stiff neck and Dowager's hump (fat pad on neck)\nIntercostal neuralgia: stabbing pain between ribs when breathing\nPain that lasts for months or years and keeps coming back\nExpensive clinic visits, massages and treatments that waste time and money\nMedication with side effects, patches that only mask pain temporarily\nPain that ruins sleep, work and daily life",

        conditions: [
            "Shoulder blade pain (dull pain at inner edge, worse with sitting)",
            "Back pain (morning stiffness, night pain, better after moving)（3：44）",
            "Shoulder pain & coldness (constant pain, fear of cold, easy to become frozen shoulder)（7：38）",
            "Frozen shoulder – cannot lift arm (muscle adhesion, limited upward movement)（10：50）",
            "Frozen shoulder – cannot reach back (sharp pain at back of shoulder)（16：35）",
            "Dowager's hump discomfort (stiffness, pain when tilting head back)（21：13）",
            "Intercostal neuralgia (stabbing, radiating pain between ribs)（25：03）",
            "Neck & shoulder stiffness from long-term sitting & phone use（30：54）",
        ],

        highlights: [
            { title: "All-natural physical method", desc: "No needles, no drugs, no side effects" },
            { title: "3 key pressure points", desc: "Easy to find, easy to remember, fast relief" },
            { title: "Self-treatment at home", desc: "Do it yourself, no helper needed" },
            { title: "Save time & money", desc: "No clinic visits, no expensive bills" },
            { title: "Root-cause relief", desc: "Treat front for back pain, target deep fascia" },
            { title: "Zero basics needed", desc: "No anatomy knowledge required" },
        ],

        audience: [
            "Office workers, drivers and people who use phones for long hours",
            "People with chronic, recurring neck & shoulder pain",
            "People with frozen shoulder, limited movement and muscle adhesion",
            "People who prefer safe, natural pain relief",
            "Anyone who wants to stop wasting time and money on pain",
        ],

        closingEn: "One course, solve 8 neck & shoulder problems. Learn once, benefit for life.",
    },

    {
        id: 5,
        titleEn: "Back & Leg Stiffness & Weariness Care",
        subtitleEn: "Ease 18 Kinds Of Lower Body Discomfort | Natural Gentle Daily Practices",
        duration: "~75 min",
        s3Key: "acupressure/lesson-06-waist-legs-description.mp4",
        coverImage: "/images/acupoint-waist-legs.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "18 Waist & Leg Pains • No Drugs • No Surgery • Relieve at Home in 3 Steps\n\nPain points you're suffering from:\nCrawling sensation, numbness & tingling on outer lower leg\nChronically cold lower legs, poor circulation, cold to the touch\nSevere calf cramps at night, sudden muscle spasms, pain from cold\nNumbness & loss of feeling on outer thigh\nCold kneecaps, icy joint pain, stiffness\nCannot squat or bend knees, joint stiffness\nKnee pain going upstairs & downstairs\nSwollen knees with fluid buildup (effusion)\nPain in the back of knee (hamstring/popliteal area)\nSciatica: radiating pain from buttock down to leg\nTailbone (coccyx) pain, cannot sit long, sore when seated\nLower back pain when bending forward while sitting\nAcute lumbar sprain: locked back, cannot stand straight\nSacroiliac joint pain, pain walking & sleeping\nAching & tightness on back of thighs from prolonged sitting\nLower back pain triggered by sneezing or coughing\nWeak legs, fatigue, difficulty walking long distances\nAcute hemorrhoids: pain, burning, discomfort sitting & walking\nChronic waist & leg strain, stiffness, limited movement",

        conditions: [
            "Crawling Sensation & Numbness on Outer Lower Leg",
            "Chronically Cold Lower Legs (Poor Circulation) （02：19）",
            "Calf Cramps (Nocturnal & Cold-Induced) （09：39）",
            "Outer Thigh Numbness & Sensory Loss（13：31）",
            "Cold Kneecaps & Knee Cold Intolerance（17：32）",
            "Inability to Squat or Bend Knees（29：30）",
            "Knee Pain When Climbing Upstairs（33：52）",
            "Knee Pain When Going Downstairs（56：05）",
            "Knee Effusion (Fluid/Water on the Knee) （37：54）",
            "Back of Knee Pain (Medial/Lateral/Central) （52：04）",
            "Sciatica (Radiating Pain from Buttock to Leg) （24：52）",
            "Tailbone (Coccyx) Pain & Discomfort When Sitting（21：08）",
            "Lower Back Pain When Bending While Seated（43：15）",
            "Acute Lumbar Sprain & Locked Waist（1：08：29）",
            "Sacroiliac Joint Pain & Instability（1：26）",
            "Back Thigh Aches & Tightness from Sitting（1：12：17）",
            "Lower Back Pain from Sneezing/Coughing（1：15：58）",
            "Acute Hemorrhoids (Pain, Burning, Swelling) （05：54）",
        ],

        highlights: [
            { title: "100% natural physical method", desc: "No pills, injections, or side effects" },
            { title: "3 fixed pressure points per condition", desc: "Easy to find, remember & apply" },
            { title: "Self-treatment at home", desc: "Do it yourself anytime, anywhere" },
            { title: "Fast pain relief", desc: "Acute sprains, cramps & sharp pain reduce quickly" },
            { title: "Root-cause repair", desc: "Long-term improvement for numbness, cold & stiffness" },
            { title: "Zero experience needed", desc: "No anatomy or meridian knowledge required" },
            { title: "For all ages", desc: "Seniors, office workers, manual workers, athletes" },
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

        closingEn: "One course solves 22 waist & leg problems. Learn once, benefit for life.",
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

function LessonDetail({ lesson }) {
    return (
        <div className="space-y-5">
            {/* Intro */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug">
                        {lesson.titleEn}
                    </h2>
                    <p className="text-sm text-amber-700 mt-1 font-medium">
                        {lesson.subtitleEn}
                    </p>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {lesson.intro}
                </p>
            </div>

            {/* Conditions Covered */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <SectionTitle>
                    {lesson.conditions.length} Conditions Covered
                </SectionTitle>
                <ConditionsList items={lesson.conditions} />
            </div>

            {/* Course Highlights */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <SectionTitle>Course Highlights</SectionTitle>
                <HighlightGrid items={lesson.highlights} />
            </div>

            {/* Who Is This For */}
            <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
                <SectionTitle>Who Is This For?</SectionTitle>
                <AudienceList items={lesson.audience} />
            </div>

            {/* Closing */}
            <div className="rounded-3xl bg-slate-900 px-5 py-5 text-center">
                <p className="text-sm font-medium text-white/90 leading-relaxed">
                    {lesson.closingEn}
                </p>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 leading-relaxed">
                Disclaimer: This program is for wellness and educational purposes only and is not medical advice. Please consult a qualified healthcare professional if you have any health concerns.
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function QigongPage({
    currentUser,
    authLoading = false,
    isOwned: isOwnedProp,
    purchases = [],
    onPurchase,
    onGoLogin,
}) {
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
                        alt={activeLesson.titleEn}
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
                            Video Course
                        </span>
                        {COURSE.sale && (
                            <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                                Sale
                            </span>
                        )}
                    </div>
                    <h1 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
                        {COURSE.titleEn}
                    </h1>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="text-3xl font-extrabold text-slate-900">{COURSE.priceNow}</span>
                        <span className="text-base text-slate-400 line-through">{COURSE.priceOld}</span>
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700">
                            {COURSE.lessonCount} lessons · lifetime access
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
                            ✓ Full Course Unlocked
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleUnlockCourse}
                                className="w-full rounded-2xl bg-amber-600 px-4 py-4 text-sm font-bold text-white hover:bg-amber-500 transition active:scale-[0.98]"
                            >
                                Unlock Full Course (All {COURSE.lessonCount} Lessons) · {COURSE.priceNow}
                            </button>
                            <button
                                onClick={handleBuyActiveVideo}
                                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition active:scale-[0.98]"
                            >
                                Buy Lesson {activeLesson.id} Only · $19 USD
                            </button>
                            {!isLoggedIn && (
                                <p className="text-center text-xs text-amber-700 pt-1">
                                    Please sign in to purchase and watch.
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
                        Lessons
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
                                        Lesson {lesson.id}
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 leading-snug pr-3 line-clamp-2">
                                        {lesson.titleEn}
                                    </span>
                                    <span className="text-[10px] text-slate-500">{lesson.duration}</span>
                                    {unlocked ? (
                                        <span className="mt-0.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
                                            Unlocked
                                        </span>
                                    ) : (
                                        <span className="mt-0.5 rounded-full border border-amber-200 bg-white px-2 py-0.5 text-[9px] text-amber-700">
                                            🔒 $19 USD
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
                                            Loading…
                                        </div>
                                    </div>
                                )}
                                {error && !loading && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <div>
                                            <p className="text-base font-semibold">Playback error</p>
                                            <p className="mt-2 text-sm text-white/70">{error}</p>
                                            <button
                                                onClick={() => fetchSignedUrl(activeLesson.s3Key)}
                                                className="mt-4 rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900"
                                            >
                                                Retry
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
                                        Your browser does not support video.
                                    </video>
                                )}
                                {!error && !loading && !videoUrl && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <p className="text-sm text-white/70">
                                            Select a lesson above to play.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                <div className="max-w-sm space-y-3">
                                    <p className="text-3xl">🔒</p>
                                    <p className="text-base font-bold">Locked</p>
                                    <p className="text-sm text-white/70">
                                        Purchase to unlock and watch.
                                    </p>
                                    {isLoggedIn ? (
                                        <button
                                            onClick={handleUnlockCourse}
                                            className="mt-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition"
                                        >
                                            Unlock Full Course {COURSE.priceNow}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onGoLogin?.()}
                                            className="mt-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
                                        >
                                            Sign in to purchase
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Now Playing bar */}
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400">
                            Now Playing
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900">
                            Lesson {activeLesson.id} · {activeLesson.titleEn}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {activeLesson.subtitleEn}
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
                            Lesson {activeLesson.id} — Full Description
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Switch lessons above to see details for each
                        </p>
                    </div>
                    <LessonDetail lesson={activeLesson} />
                </motion.div>

            </main>
        </div>
    );
}

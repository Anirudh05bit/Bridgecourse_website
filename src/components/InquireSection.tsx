import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Phone, ShieldCheck, ArrowUpRight } from "lucide-react";
import nishanthPhoto from "../assets/nishanth.png";

/* ─── Instagram Icon ─── */
function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
        </svg>
    );
}

/* ─── Light Title Reveal ─── */
function SplitTitle({ text }: { text: string }) {
    return (
        <h2 className="font-podium text-4xl sm:text-5xl font-bold text-white uppercase tracking-wider leading-none">
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.025 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </h2>
    );
}

/* ─── Magnetic Contact Link ─── */
interface ContactLinkProps {
    href: string;
    target?: string;
    rel?: string;
    icon: React.ReactNode;
    label: string;
    value: string;
}

function ContactLink({ href, target, rel, icon, label, value }: ContactLinkProps) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 180, damping: 22 });
    const sy = useSpring(y, { stiffness: 180, damping: 22 });

    const onMove = (e: React.MouseEvent) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left - r.width / 2) * 0.18);
        y.set((e.clientY - r.top - r.height / 2) * 0.18);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            target={target}
            rel={rel}
            onMouseMove={onMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ x: sx, y: sy }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-red-950/70 to-black/70 border border-red-800/60 hover:border-red-600/70 transition-all duration-300"
        >
            <div className="w-11 h-11 rounded-xl bg-red-900/40 flex items-center justify-center border border-red-700/60 flex-shrink-0 relative">
                {icon}
                <span className="absolute inset-0 rounded-xl border border-red-400/30 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-xs font-mono uppercase tracking-[0.08em] text-red-400/70">{label}</div>
                <div className="text-white font-medium tracking-wide truncate">{value}</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>
    );
}

/* ─── Background Floating Orbs ─── */
function BackgroundOrbs() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Large slow orb 1 */}
            <motion.div
                className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(185,28,28,0.25) 0%, transparent 65%)",
                }}
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.6, 0.85, 0.6],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            
            {/* Large slow orb 2 */}
            <motion.div
                className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(127,29,29,0.22) 0%, transparent 70%)",
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.75, 0.5],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4,
                }}
            />

            {/* Small accent orbs */}
            <motion.div
                className="absolute top-1/4 left-1/3 w-48 h-48 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(248,113,113,0.15) 0%, transparent 60%)",
                }}
                animate={{
                    x: [0, 60, 0],
                    y: [0, -40, 0],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(185,28,28,0.18) 0%, transparent 65%)",
                }}
                animate={{
                    x: [0, -50, 0],
                    y: [0, 35, 0],
                }}
                transition={{
                    duration: 17,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 6,
                }}
            />
        </div>
    );
}

/* ─── Subtle Background Grid ─── */
function BackgroundGrid() {
    return (
        <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(239,68,68,0.6) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(239,68,68,0.6) 1px, transparent 1px)
                `,
                backgroundSize: "70px 70px",
            }}
        />
    );
}

/* ─── Main Inquire Section ─── */
export default function InquireSection() {
    const phone = "+91 9133139468";
    const instagramHandle = "@i_lv_blackniggas";
    const instagramUrl = "https://instagram.com/nishanth.devabathini";

    // 3D Tilt
    const cardRef = useRef<HTMLDivElement>(null);
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 90, damping: 18 });
    const sry = useSpring(ry, { stiffness: 90, damping: 18 });

    const onMove = (e: React.MouseEvent) => {
        const r = cardRef.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 10);
        rx.set(-py * 10);
    };

    return (
        <section
            id="inquire"
            className="relative py-16 sm:py-20 px-4 sm:px-6 bg-[#0a0000] overflow-hidden"
        >
            {/* Enhanced Animated Background */}
            <BackgroundOrbs />
            <BackgroundGrid />

            {/* Mouse-reactive subtle spotlight */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(239,68,68,0.12), transparent 60%)",
                }}
                animate={{
                    "--mouse-x": ["20%", "80%", "40%"],
                    "--mouse-y": ["30%", "70%", "50%"],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 text-red-400 text-xs font-mono tracking-[0.5em] mb-4"
                    >
                        HAVE DOUBTS?
                    </motion.div>

                    <SplitTitle text="Inquire Now" />

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-white/65 mt-5 max-w-md mx-auto text-[15px]"
                    >
                        Questions about <span className="text-red-300">Bridgecourse 3.0</span>? Reach out directly.
                    </motion.p>
                </div>

                {/* Main Card */}
                <motion.div
                    ref={cardRef}
                    onMouseMove={onMove}
                    onMouseLeave={() => { rx.set(0); ry.set(0); }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden border border-red-900/60 bg-[#140202] shadow-2xl"
                    style={{
                        boxShadow: "0 30px 70px -25px rgba(239, 68, 68, 0.35)",
                    }}
                >
                    <div className="grid md:grid-cols-12">
                        {/* Photo Side */}
                        <div className="md:col-span-5 relative p-8 flex items-center justify-center bg-gradient-to-br from-red-950/50 to-black">
                            <motion.div
                                style={{
                                    rotateX: srx,
                                    rotateY: sry,
                                    transformStyle: "preserve-3d",
                                }}
                                className="relative w-full max-w-[270px] aspect-[4/4.1] rounded-2xl overflow-hidden shadow-xl"
                            >
                                <motion.img
                                    src={nishanthPhoto}
                                    alt="Nishanth Devabathini"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    initial={{ scale: 1.08 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2 }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                {/* Nameplate */}
                               
                            </motion.div>
                        </div>

                        {/* Content Side */}
                        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-px w-10 bg-red-500" />
                                <span className="uppercase text-red-400 text-xs font-mono tracking-widest">Point of Contact</span>
                            </div>

                            <h3 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-wider leading-none">
                                Nishanth Devabathini
                            </h3>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 mt-5 px-5 py-2 bg-red-950/60 border border-red-700 rounded-full text-sm uppercase tracking-widest text-red-200 w-fit"
                            >
                                <ShieldCheck className="w-4 h-4" />
                                Vice Chair, ACM
                            </motion.div>

                            <p className="mt-7 text-white/70 text-[15.2px] leading-relaxed">
                                Got questions about Bridgecourse 3.0? Drop a call, shoot a text, or DM on Instagram — replies usually come fast.
                            </p>

                            <div className="mt-9 space-y-4">
                                <ContactLink
                                    href={`tel:${phone.replace(/\s/g, "")}`}
                                    icon={<Phone className="w-5 h-5 text-red-400" />}
                                    label="CALL / TEXT"
                                    value={phone}
                                />
                                <ContactLink
                                    href={instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    icon={<InstagramIcon className="w-5 h-5 text-red-400" />}
                                    label="INSTAGRAM"
                                    value={instagramHandle}
                                />
                            </div>

                            <div className="mt-10 flex items-center gap-3 text-xs font-mono text-white/40">
                                <div className="flex items-center gap-2">
                                    <div className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                                    </div>
                                    ONLINE
                                </div>
                                <span className="text-red-400/60">— Usually replies within minutes</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
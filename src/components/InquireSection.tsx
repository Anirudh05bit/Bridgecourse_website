import React, { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Phone, ShieldCheck, ArrowUpRight } from "lucide-react"
import nishanthPhoto from "../assets/nishanth.png"

function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
        </svg>
    )
}

interface ContactLinkProps {
    href: string
    target?: string
    rel?: string
    icon: React.ReactNode
    label: string
    value: string
}

function ContactLink({ href, target, rel, icon, label, value }: ContactLinkProps) {
    return (
        <motion.a
            href={href}
            target={target}
            rel={rel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-950/70 to-black/70 border border-red-800/60 hover:border-red-600/70 transition-all duration-300"
        >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-red-900/40 flex items-center justify-center border border-red-700/60 flex-shrink-0">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-widest text-red-400/70">{label}</div>
                <div className="text-sm sm:text-base text-white font-medium tracking-wide truncate">{value}</div>
            </div>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0 group-hover:text-red-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>
    )
}

export default function InquireSection() {
    const phone = "+91 9133139468"
    const instagramHandle = "@nishanth.devabathini"
    const instagramUrl = "https://instagram.com/nishanth.devabathini"

    const cardRef = useRef<HTMLDivElement>(null)
    const rx = useMotionValue(0)
    const ry = useMotionValue(0)
    const srx = useSpring(rx, { stiffness: 90, damping: 18 })
    const sry = useSpring(ry, { stiffness: 90, damping: 18 })

    const onMove = (e: React.MouseEvent) => {
        const r = cardRef.current?.getBoundingClientRect()
        if (!r) return
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 10)
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10)
    }

    return (
        <section id="inquire" className="relative py-14 sm:py-20 bg-[#0a0000] overflow-hidden border-t border-red-900/20">
            {/* Subtle background */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: "linear-gradient(rgba(239,68,68,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.6) 1px, transparent 1px)",
                    backgroundSize: "70px 70px",
                }}
            />
            <div className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(185,28,28,0.2) 0%, transparent 65%)", filter: "blur(40px)" }} />
            <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(127,29,29,0.18) 0%, transparent 70%)", filter: "blur(40px)" }} />

            <div className="max-w-5xl mx-auto relative z-10 px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-red-400 text-[10px] font-mono tracking-[0.5em] uppercase mb-3"
                    >
                        HAVE DOUBTS?
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-podium text-3xl sm:text-5xl font-bold text-white uppercase tracking-wider leading-none"
                    >
                        Inquire Now
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-white/60 mt-4 max-w-sm mx-auto text-sm sm:text-[15px]"
                    >
                        Questions about <span className="text-red-300">Bridgecourse 3.0</span>? Reach out directly.
                    </motion.p>
                </div>

                {/* Main Card */}
                <motion.div
                    ref={cardRef}
                    onMouseMove={onMove}
                    onMouseLeave={() => { rx.set(0); ry.set(0) }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-red-900/60 bg-[#140202]"
                    style={{ boxShadow: "0 30px 70px -25px rgba(239,68,68,0.3)" }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-12">

                        {/* Photo — compact on mobile, taller on md+ */}
                        <div className="md:col-span-5 relative p-5 sm:p-8 flex items-center justify-center bg-gradient-to-br from-red-950/50 to-black">
                            <motion.div
                                style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
                                className="relative w-full max-w-[200px] sm:max-w-[260px] aspect-square sm:aspect-[4/4.1] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl"
                            >
                                <img
                                    src={nishanthPhoto}
                                    alt="Nishanth Devabathini"
                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                {/* Corner brackets */}
                                <span className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-red-400" />
                                <span className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-red-400" />
                                <span className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-red-400" />
                                <span className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-red-400" />
                            </motion.div>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-7 p-5 sm:p-8 md:p-10 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-px w-8 bg-red-500" />
                                <span className="uppercase text-red-400 text-[10px] font-mono tracking-widest">Point of Contact</span>
                            </div>

                            <h3 className="text-2xl sm:text-4xl font-bold text-white uppercase tracking-wider leading-tight">
                                Nishanth<br className="sm:hidden" /> Devabathini
                            </h3>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 bg-red-950/60 border border-red-700 rounded-full text-xs uppercase tracking-widest text-red-200 w-fit"
                            >
                                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                Vice Chair, ACM
                            </motion.div>

                            <p className="mt-4 sm:mt-5 text-white/65 text-sm sm:text-[15px] leading-relaxed">
                                Got questions about Bridgecourse 3.0? Drop a call, shoot a text, or DM on Instagram — replies usually come fast.
                            </p>

                            <div className="mt-5 sm:mt-7 space-y-3">
                                <ContactLink
                                    href={`tel:${phone.replace(/\s/g, "")}`}
                                    icon={<Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />}
                                    label="CALL / TEXT"
                                    value={phone}
                                />
                                <ContactLink
                                    href={instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    icon={<InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />}
                                    label="INSTAGRAM"
                                    value={instagramHandle}
                                />
                            </div>

                            <div className="mt-6 sm:mt-8 flex items-center gap-2 text-xs font-mono text-white/40">
                                <div className="flex items-center gap-2">
                                    <div className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
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
    )
}
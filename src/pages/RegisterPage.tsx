import React, { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    ArrowLeft, User, Phone, Hash,
    GraduationCap, Check, Loader2,
} from "lucide-react"
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient"

const departments = ["CSE", "CSE-AI", "Cyber Security", "EEE", "ECE", "AIDS"]

type FormState = { name: string; phone: string; rollNo: string; department: string }
const FIELD_ORDER: (keyof FormState)[] = ["name", "phone", "rollNo", "department"]

const ROLL_NUMBER_REGEX = /^am\.sc\.u4[a-zA-Z]{3}26\d{3}$/

const isFieldValid = (key: keyof FormState, value: string) => {
    if (!value) return false
    if (key === "phone") return /^[0-9]{10}$/.test(value)
    if (key === "rollNo") return ROLL_NUMBER_REGEX.test(value.trim())
    return value.trim().length > 1
}

function hashCode(s: string) {
    let h = 0
    for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i)
    return h
}

/* ── Field — defined OUTSIDE parent so it never remounts ── */
interface FieldProps {
    name: keyof FormState
    type?: string
    placeholder: string
    icon: React.ReactNode
    label: string
    pattern?: string
    inputMode?: "text" | "numeric" | "tel"
    index: number
    value: string
    focused: string | null
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    onFocus: (name: string) => void
    onBlur: () => void
}

function Field({
    name, type = "text", placeholder, icon, label, pattern, inputMode,
    index, value, focused, onChange, onFocus, onBlur,
}: FieldProps) {
    const valid = isFieldValid(name, value)
    const isFocused = focused === name

    return (
        <div>
            <label className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/55">
                    <span
                        className="flex items-center justify-center w-5 h-5 rounded-md"
                        style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)" }}
                    >
                        {icon}
                    </span>
                    {label}
                </span>
                <span className="flex items-center gap-1.5 text-[9px] font-mono tracking-[0.2em] text-white/30">
                    <span>{String(index + 1).padStart(2, "0")}/0{FIELD_ORDER.length}</span>
                    <span
                        className="w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                            background: valid ? "#dc2626" : "rgba(239,68,68,0.08)",
                            border: `1px solid ${valid ? "#ef4444" : "rgba(239,68,68,0.3)"}`,
                            boxShadow: valid ? "0 0 10px rgba(239,68,68,0.6)" : "none",
                        }}
                    >
                        {valid && <Check className="w-2 h-2 text-white" strokeWidth={4} />}
                    </span>
                </span>
            </label>
            <div className="relative">
                <input
                    required
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => onFocus(name)}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    pattern={pattern}
                    inputMode={inputMode}
                    className="w-full bg-red-950/10 border border-red-900/40 rounded-xl px-3 py-2.5 sm:py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors duration-200 focus:border-red-500/80 focus:bg-red-950/20"
                />
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
                    style={{
                        boxShadow: "0 0 0 1px rgba(239,68,68,0.5), 0 0 22px rgba(239,68,68,0.18)",
                        opacity: isFocused ? 1 : 0,
                    }}
                />
                <span className="pointer-events-none absolute top-1 left-1 w-2 h-2 border-l border-t border-red-500/40" />
                <span className="pointer-events-none absolute bottom-1 right-1 w-2 h-2 border-r border-b border-red-500/40" />
            </div>
        </div>
    )
}

/* ── Success Card ── */
function SuccessCard({ name, phone, onClose }: { name: string; phone: string; onClose: () => void }) {
    const sparks = useMemo(
        () =>
            Array.from({ length: 14 }).map((_, i) => {
                const angle = (i / 14) * Math.PI * 2
                const dist = 70 + ((i * 13) % 25)
                return {
                    tx: `${Math.cos(angle) * dist}px`,
                    ty: `${Math.sin(angle) * dist}px`,
                    size: 4 + (i % 3),
                    delay: (i % 5) * 0.04,
                }
            }),
        []
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl p-8 sm:p-10 text-center flex flex-col items-center gap-5 overflow-hidden"
            style={{
                background: "linear-gradient(160deg, rgba(40,5,5,0.92) 0%, rgba(10,0,0,0.96) 100%)",
                border: "1px solid rgba(239,68,68,0.35)",
                boxShadow: "0 30px 70px -20px rgba(239,68,68,0.4)",
            }}
        >
            {[
                { p: "top-2 left-2", b: "border-l border-t" },
                { p: "top-2 right-2", b: "border-r border-t" },
                { p: "bottom-2 left-2", b: "border-l border-b" },
                { p: "bottom-2 right-2", b: "border-r border-b" },
            ].map((c, i) => (
                <span key={i} className={`pointer-events-none absolute ${c.p} w-3 h-3 ${c.b} border-red-400/70`} />
            ))}

            <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 pointer-events-none">
                    {sparks.map((s, i) => (
                        <span
                            key={i}
                            className="absolute top-1/2 left-1/2 rounded-full rp-spark"
                            style={{
                                width: s.size,
                                height: s.size,
                                background: "radial-gradient(circle, #fca5a5 0%, #ef4444 60%, transparent 100%)",
                                boxShadow: "0 0 8px rgba(239,68,68,0.8)",
                                animationDelay: `${s.delay}s`,
                                "--tx": s.tx,
                                "--ty": s.ty,
                            } as React.CSSProperties}
                        />
                    ))}
                </div>
                <svg viewBox="0 0 64 64" className="relative w-24 h-24">
                    <defs>
                        <linearGradient id="rp-check-grad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#7f1d1d" />
                        </linearGradient>
                    </defs>
                    <circle cx="32" cy="32" r="27" fill="rgba(239,68,68,0.08)" stroke="url(#rp-check-grad)" strokeWidth="3"
                        className="rp-check-circle" style={{ filter: "drop-shadow(0 0 10px rgba(239,68,68,0.5))" }} />
                    <path d="M20 33 L29 42 L45 24" fill="none" stroke="#fff" strokeWidth="4"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="rp-check-tick" style={{ filter: "drop-shadow(0 0 6px rgba(239,68,68,0.7))" }} />
                </svg>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-400">[ Status • Confirmed ]</p>

            <h2 className="font-podium text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider leading-tight">
                Registration<br />
                <span style={{ background: "linear-gradient(90deg, #ef4444, #fca5a5, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Received
                </span>
            </h2>

            <p className="text-white/65 text-sm font-light leading-relaxed max-w-sm">
                Welcome aboard, <span className="text-red-400 font-semibold">{name.split(" ")[0] || "there"}</span>.
                Your intake details are locked in. A Bridgecourse advisor will reach out shortly on{" "}
                <span className="text-red-400 font-semibold">{phone}</span>.
            </p>

            

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="mt-2 w-full text-white py-3.5 text-xs font-mono font-bold uppercase tracking-[0.3em] rounded-xl cursor-pointer transition-colors duration-200 border-none outline-none"
                style={{
                    background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #7f1d1d 100%)",
                    boxShadow: "0 0 25px rgba(239,68,68,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
            >
                Return to Home →
            </motion.button>
        </motion.div>
    )
}

/* ── Main RegisterPage ── */
interface RegisterPageProps {
    onClose: () => void
}

export default function RegisterPage({ onClose }: RegisterPageProps) {
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [focused, setFocused] = useState<string | null>(null)
    const [form, setForm] = useState<FormState>({ name: "", phone: "", rollNo: "", department: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const rollNoTouched = focused === null && form.rollNo.length > 0
    const rollNoInvalid = rollNoTouched && !ROLL_NUMBER_REGEX.test(form.rollNo.trim())

    const handleFocus = (name: string) => setFocused(name)
    const handleBlur = () => setFocused(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        const regId = Math.abs(hashCode(form.name + form.phone + Date.now())).toString(36)
        const newReg = {
            id: regId,
            name: form.name,
            phone: form.phone,
            roll_no: form.rollNo,
            department: form.department,
            timestamp: new Date().toISOString()
        }

        if (isSupabaseConfigured) {
            try {
                const { error } = await supabase.from("registrations").insert([newReg])
                if (error) throw error
            } catch (err) {
                console.error("Supabase insert failed. Falling back to localStorage:", err)
            }
        }

        // Always save to localStorage as cache / fallback
        try {
            const raw = localStorage.getItem("bc_registrations")
            const list = raw ? JSON.parse(raw) : []
            list.push({
                ...form,
                id: regId,
                timestamp: newReg.timestamp
            })
            localStorage.setItem("bc_registrations", JSON.stringify(list))
        } catch (err) {
            console.error("Failed to save to localStorage:", err)
        }

        setTimeout(() => {
            setSubmitting(false)
            setSubmitted(true)
        }, 900)
    }

    return (
        <section
            className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-12 overflow-hidden"
            style={{ background: "radial-gradient(ellipse at top, #1a0303 0%, #0a0000 55%, #050000 100%)" }}
        >
            {/* Static background */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] rounded-full opacity-25"
                    style={{ background: "radial-gradient(circle, rgba(220,38,38,0.55) 0%, transparent 65%)", filter: "blur(60px)" }} />
                <div className="absolute -bottom-40 -right-40 w-[26rem] h-[26rem] rounded-full opacity-25"
                    style={{ background: "radial-gradient(circle, rgba(127,29,29,0.7) 0%, transparent 65%)", filter: "blur(60px)" }} />
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(239,68,68,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.6) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                    }} />
            </div>

            <div className="w-full max-w-lg relative z-10">
                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={onClose}
                    className="group flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-white/55 hover:text-white transition-colors mb-3 sm:mb-5 cursor-pointer bg-transparent border-none outline-none"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    Back to Home
                </motion.button>

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <SuccessCard key="success" name={form.name} phone={form.phone} onClose={onClose} />
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="relative rounded-2xl overflow-hidden w-full"
                            style={{
                                background: "linear-gradient(160deg, rgba(28,3,3,0.92) 0%, rgba(10,0,0,0.96) 100%)",
                                border: "1px solid rgba(239,68,68,0.28)",
                                boxShadow: "0 30px 70px -25px rgba(239,68,68,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
                            }}
                        >
                            {/* Top scan accent */}
                            <div className="relative h-1 w-full overflow-hidden bg-red-950/40">
                                <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-red-500 to-transparent rp-scan" />
                            </div>

                            {/* Corner brackets */}
                            {[
                                { p: "top-2 left-2", b: "border-l border-t" },
                                { p: "top-2 right-2", b: "border-r border-t" },
                                { p: "bottom-2 left-2", b: "border-l border-b" },
                                { p: "bottom-2 right-2", b: "border-r border-b" },
                            ].map((c, i) => (
                                <span key={i} className={`pointer-events-none absolute ${c.p} w-3 h-3 ${c.b} border-red-400/60 z-20`} />
                            ))}

                            {/* Side label */}
                            <div
                                className="hidden sm:block absolute top-6 right-3 font-mono text-[9px] uppercase tracking-[0.4em] text-red-400/50 select-none"
                                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                            >
                                BRIDGECOURSE • 3.0 • INTAKE
                            </div>

                            <div className="p-4 sm:p-8">
                                {/* Eyebrow */}
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-[10px] sm:text-xs text-red-400 font-mono tracking-[0.3em] uppercase flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 rp-pulse" />
                                        [ Student Cohort Intake ]
                                    </p>
                                    <span className="font-mono text-[10px] text-white/35 tracking-[0.2em] uppercase">Form 01</span>
                                </div>

                                <h1 className="font-podium text-2xl sm:text-4xl font-bold text-white uppercase tracking-wider leading-[1] mb-0.5">Register</h1>
                                <h1
                                    className="font-podium text-2xl sm:text-4xl font-bold uppercase tracking-wider leading-[1]"
                                    style={{
                                        background: "linear-gradient(90deg, #ef4444 0%, #fca5a5 50%, #ef4444 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    Now
                                </h1>

                                <p className="text-white/55 text-xs sm:text-sm font-light mt-2 sm:mt-3 leading-relaxed">
                                    Provide your academic information below to apply for the{" "}
                                    <span className="text-red-300">Bridgecourse 3.0</span> cohort.
                                </p>

                                <form onSubmit={handleSubmit} className="mt-4 sm:mt-6 flex flex-col gap-3.5 sm:gap-5">
                                    <Field index={0} name="name" label="Full Name" placeholder="Enter your full name"
                                        icon={<User className="w-3 h-3 text-red-400" />}
                                        value={form.name} focused={focused} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />

                                    <Field index={1} name="phone" type="tel" inputMode="tel" pattern="[0-9]{10}"
                                        label="Phone Number" placeholder="10-digit mobile number"
                                        icon={<Phone className="w-3 h-3 text-red-400" />}
                                        value={form.phone} focused={focused} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />

                                    <Field index={2} name="rollNo" label="Roll Number" placeholder="Enter your college roll number"
                                        icon={<Hash className="w-3 h-3 text-red-400" />}
                                        value={form.rollNo} focused={focused} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                                    {rollNoInvalid && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-1.5 text-[11px] font-mono text-red-400 tracking-wide"
                                        >
                                            Invalid roll number. Please enter in format:
                                            <span className="text-red-300 font-semibold ml-1">am.sc.u4xxx26kkk</span>
                                        </motion.p>
                                    )}

                                    {/* Department select */}
                                    <div>
                                        <label className="flex items-center justify-between mb-2">
                                            <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/55">
                                                <span className="flex items-center justify-center w-5 h-5 rounded-md"
                                                    style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)" }}>
                                                    <GraduationCap className="w-3 h-3 text-red-400" />
                                                </span>
                                                Department
                                            </span>
                                            <span className="flex items-center gap-1.5 text-[9px] font-mono tracking-[0.2em] text-white/30">
                                                <span>04/04</span>
                                                <span
                                                    className="w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300"
                                                    style={{
                                                        background: form.department ? "#dc2626" : "rgba(239,68,68,0.08)",
                                                        border: `1px solid ${form.department ? "#ef4444" : "rgba(239,68,68,0.3)"}`,
                                                        boxShadow: form.department ? "0 0 10px rgba(239,68,68,0.6)" : "none",
                                                    }}
                                                >
                                                    {form.department && <Check className="w-2 h-2 text-white" strokeWidth={4} />}
                                                </span>
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                name="department"
                                                value={form.department}
                                                onChange={handleChange}
                                                onFocus={() => setFocused("department")}
                                                onBlur={() => setFocused(null)}
                                                className="w-full bg-red-950/10 border border-red-900/40 rounded-xl px-4 py-3.5 pr-10 text-sm text-white outline-none transition-colors duration-200 focus:border-red-500/80 focus:bg-red-950/20 appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled className="bg-[#0a0000] text-white/30">Select your department</option>
                                                {departments.map((dept) => (
                                                    <option key={dept} value={dept} className="bg-[#0a0000] text-white">{dept}</option>
                                                ))}
                                            </select>
                                            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
                                                style={{
                                                    boxShadow: "0 0 0 1px rgba(239,68,68,0.5), 0 0 22px rgba(239,68,68,0.18)",
                                                    opacity: focused === "department" ? 1 : 0,
                                                }} />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-red-400/70 font-mono text-[9px]">▼</span>
                                            <span className="pointer-events-none absolute top-1 left-1 w-2 h-2 border-l border-t border-red-500/40" />
                                            <span className="pointer-events-none absolute bottom-1 right-1 w-2 h-2 border-r border-b border-red-500/40" />
                                        </div>
                                    </div>

                                    {/* Terms strip */}
                                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/35 mt-1">
                                        <span className="w-8 h-px bg-red-500/40" />
                                        Secure intake • No spam • Limited seats
                                    </div>

                                    {/* Submit */}
                                    <motion.button
                                        whileHover={{ scale: 1.015 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={submitting}
                                        className="relative mt-2 text-white py-4 text-xs font-mono font-bold uppercase tracking-[0.3em] rounded-xl cursor-pointer transition-colors duration-200 border-none outline-none overflow-hidden disabled:opacity-80 disabled:cursor-wait"
                                        style={{
                                            background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #7f1d1d 100%)",
                                            boxShadow: "0 0 25px rgba(239,68,68,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                                        }}
                                    >
                                        <span aria-hidden className="absolute inset-0 rp-btn-shine pointer-events-none"
                                            style={{ background: "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)", backgroundSize: "200% 100%" }} />
                                        <span className="relative flex items-center justify-center gap-2">
                                            {submitting ? (
                                                <><Loader2 className="w-4 h-4 animate-spin" />Submitting…</>
                                            ) : (
                                                <>Confirm Registration <span className="font-sans">→</span></>
                                            )}
                                        </span>
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
        @keyframes rp-scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }
        .rp-scan { animation: rp-scan 3.2s linear infinite; }
        @keyframes rp-pulse { 0%,100% { opacity:.6; transform:scale(1); } 50% { opacity:1; transform:scale(1.25); } }
        .rp-pulse { animation: rp-pulse 1.8s ease-in-out infinite; }
        @keyframes rp-btn-shine { 0% { background-position:-150% 0; } 60%,100% { background-position:250% 0; } }
        .rp-btn-shine { animation: rp-btn-shine 3s ease-in-out infinite; }
        @keyframes rp-spark { 0% { transform:translate(-50%,-50%) scale(0) rotate(0deg); opacity:1; } 100% { transform:translate(var(--tx),var(--ty)) scale(1) rotate(180deg); opacity:0; } }
        .rp-spark { animation: rp-spark 0.9s cubic-bezier(0.22,1,0.36,1) forwards; }
        @keyframes rp-draw-check { to { stroke-dashoffset:0; } }
        .rp-check-circle { stroke-dasharray:170; stroke-dashoffset:170; animation: rp-draw-check 0.7s ease-out 0.05s forwards; }
        .rp-check-tick { stroke-dasharray:50; stroke-dashoffset:50; animation: rp-draw-check 0.4s ease-out 0.55s forwards; }
      `}</style>
        </section>
    )
}
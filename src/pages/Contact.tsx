import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, CheckCircle2, User, Phone, Hash, GraduationCap } from "lucide-react"

const departments = [
    "CSE",
    "CSE-AI",
    "Cyber Security",
    "EEE",
    "ECE",
    "AIDS"
]

export default function Contact() {
    const navigate = useNavigate()
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState({
        name: "",
        phone: "",
        rollNo: "",
        department: ""
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Hook up to your backend / form service here.
        console.log("Student details submitted:", form)
        setSubmitted(true)
    }

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center px-6 sm:px-10 lg:px-16 pt-28 pb-16">
            <div className="w-full max-w-lg">
                <button
                    onClick={() => navigate(-1)}
                    className="pointer-events-auto flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors mb-8 cursor-pointer bg-transparent border-none"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                </button>

                {submitted ? (
                    <div className="border border-primary/30 bg-primary/5 rounded-lg p-8 sm:p-10 text-center flex flex-col items-center gap-4 animate-fade-up">
                        <CheckCircle2 className="w-10 h-10 text-primary" />
                        <h2 className="font-podium text-2xl sm:text-3xl text-white uppercase tracking-wide">
                            Details Received
                        </h2>
                        <p className="text-white/70 text-sm font-light leading-relaxed max-w-sm">
                            Thanks, {form.name.split(" ")[0] || "there"}. Our team will reach
                            out to you shortly on {form.phone || "your number"}.
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="mt-2 pointer-events-auto bg-primary text-primary-foreground px-6 py-3 text-xs font-mono font-semibold uppercase tracking-widest rounded cursor-pointer hover:brightness-110 active:scale-[0.97] transition-all"
                        >
                            Back to Home
                        </button>
                    </div>
                ) : (
                    <div className="border border-white/10 bg-secondary/30 rounded-lg p-6 sm:p-10 animate-fade-up">
                        <p className="text-xs text-primary font-mono tracking-widest uppercase mb-2">
                            [ student intake form ]
                        </p>
                        <h1 className="font-podium text-2xl sm:text-4xl font-bold text-white uppercase tracking-wide leading-tight">
                            Get in Touch
                        </h1>
                        <p className="text-white/60 text-sm font-light mt-3 mb-8 leading-relaxed">
                            Share your details and a Bridgecourse advisor will reach out
                            to walk you through the right cohort for you.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div>
                                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                                    <User className="w-3.5 h-3.5 text-primary" />
                                    Full Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full bg-black/40 border border-white/10 focus:border-primary/60 rounded px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                                    <Phone className="w-3.5 h-3.5 text-primary" />
                                    Phone Number
                                </label>
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="10-digit mobile number"
                                    pattern="[0-9]{10}"
                                    className="w-full bg-black/40 border border-white/10 focus:border-primary/60 rounded px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                                    <Hash className="w-3.5 h-3.5 text-primary" />
                                    Roll Number
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="rollNo"
                                    value={form.rollNo}
                                    onChange={handleChange}
                                    placeholder="Enter your roll number"
                                    className="w-full bg-black/40 border border-white/10 focus:border-primary/60 rounded px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/70 mb-2">
                                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                                    Department
                                </label>
                                <select
                                    required
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 focus:border-primary/60 rounded px-4 py-3 text-sm text-white outline-none transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="" disabled className="text-white/30">
                                        Select your department
                                    </option>
                                    {departments.map((dept) => (
                                        <option key={dept} value={dept} className="bg-black text-white">
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="pointer-events-auto mt-2 bg-primary text-primary-foreground py-3.5 text-center text-xs font-mono font-semibold uppercase tracking-widest rounded cursor-pointer hover:brightness-110 active:scale-[0.97] transition-all"
                            >
                                Submit Details
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </section>
    )
}
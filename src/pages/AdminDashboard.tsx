import React, { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Lock, ArrowLeft, Trash2, Download, Search,
    Database, Users, ShieldAlert, GraduationCap, X, Check, Loader2
} from "lucide-react"
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient"

interface Registration {
    id: string
    name: string
    phone: string
    rollNo: string
    department: string
    timestamp: string
}

interface AdminDashboardProps {
    onClose: () => void
}



export default function AdminDashboard({ onClose }: AdminDashboardProps) {
    const [passcode, setPasscode] = useState("")
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [passError, setPassError] = useState(false)

    const [registrations, setRegistrations] = useState<Registration[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [deptFilter, setDeptFilter] = useState("ALL")
    const [successToast, setSuccessToast] = useState("")
    const [loading, setLoading] = useState(false)

    // Load registrations
    const loadRegistrations = async () => {
        setLoading(true)
        if (isSupabaseConfigured) {
            try {
                const { data, error } = await supabase
                    .from("registrations")
                    .select("*")
                    .order("timestamp", { ascending: false })
                if (error) throw error

                const mapped: Registration[] = (data || []).map((row: any) => ({
                    id: row.id,
                    name: row.name,
                    phone: row.phone,
                    rollNo: row.roll_no,
                    department: row.department,
                    timestamp: row.timestamp
                }))
                setRegistrations(mapped)
            } catch (e) {
                console.error("Failed to load registrations from Supabase, loading localStorage fallback:", e)
                loadLocalFallback()
            } finally {
                setLoading(false)
            }
        } else {
            loadLocalFallback()
            setLoading(false)
        }
    }

    const loadLocalFallback = () => {
        try {
            const raw = localStorage.getItem("bc_registrations")
            if (raw) {
                setRegistrations(JSON.parse(raw))
            } else {
                setRegistrations([])
            }
        } catch (e) {
            console.error("Failed to load registrations:", e)
        }
    }

    useEffect(() => {
        loadRegistrations()
    }, [])

    // Auth handler
    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault()
        if (passcode === "admin123") {
            setIsAuthorized(true)
            setPassError(false)
            showToast("Access Granted")
        } else {
            setPassError(true)
            setPasscode("")
            setTimeout(() => setPassError(false), 2000)
        }
    }

    const showToast = (msg: string) => {
        setSuccessToast(msg)
        setTimeout(() => setSuccessToast(""), 3000)
    }

    // Secret Mock Data Generator


    // Clear DB
    const clearDatabase = async () => {
        if (window.confirm("Are you sure you want to clear ALL registration details? This cannot be undone.")) {
            if (isSupabaseConfigured) {
                try {
                    const { error } = await supabase
                        .from("registrations")
                        .delete()
                        .neq("id", "_placeholder_not_matching_anything_")
                    if (error) throw error
                } catch (e) {
                    console.error("Failed to clear database in Supabase:", e)
                    showToast("DB Clear Failed")
                    return
                }
            }

            try {
                localStorage.removeItem("bc_registrations")
                setRegistrations([])
                showToast("Database Cleared")
            } catch (e) {
                console.error("Failed to clear database locally:", e)
            }
        }
    }

    // Delete Single
    const deleteRegistration = async (id: string) => {
        if (isSupabaseConfigured) {
            try {
                const { error } = await supabase
                    .from("registrations")
                    .delete()
                    .eq("id", id)
                if (error) throw error
            } catch (e) {
                console.error("Failed to delete registration in Supabase:", e)
                showToast("DB Delete Failed")
                return
            }
        }

        try {
            const list = registrations.filter((r) => r.id !== id)
            localStorage.setItem("bc_registrations", JSON.stringify(list))
            setRegistrations(list)
            showToast("Entry Deleted")
        } catch (e) {
            console.error("Failed to delete entry locally:", e)
        }
    }

    // CSV Downloader
    const downloadCSV = () => {
        if (registrations.length === 0) {
            alert("No registrations available to export.")
            return
        }

        try {
            const headers = ["ID", "Name", "Phone", "Roll Number", "Department", "Timestamp"]
            const rows = registrations.map((r) => [
                r.id,
                `"${r.name.replace(/"/g, '""')}"`,
                r.phone,
                r.rollNo,
                r.department,
                r.timestamp
            ])

            const csvContent = "data:text/csv;charset=utf-8,"
                + [headers.join(","), ...rows.map(e => e.join(","))].join("\n")

            const encodedUri = encodeURI(csvContent)
            const link = document.createElement("a")
            link.setAttribute("href", encodedUri)
            link.setAttribute("download", `bridgecourse_registrations_${new Date().toISOString().split('T')[0]}.csv`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            showToast("CSV Downloaded")
        } catch (e) {
            console.error("Failed to download CSV:", e)
        }
    }

    // Filter registrations
    const filteredRegistrations = useMemo(() => {
        return registrations.filter((r) => {
            const matchesSearch =
                r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.phone.includes(searchQuery)

            const matchesDept = deptFilter === "ALL" || r.department === deptFilter

            return matchesSearch && matchesDept
        })
    }, [registrations, searchQuery, deptFilter])

    // Department Stats
    const stats = useMemo(() => {
        const counts: Record<string, number> = {}
        registrations.forEach((r) => {
            counts[r.department] = (counts[r.department] || 0) + 1
        })
        return counts
    }, [registrations])

    // Render Auth Gate
    if (!isAuthorized) {
        return (
            <section className="relative min-h-screen w-full flex items-center justify-center px-4 bg-[#0a0000] overflow-hidden">
                {/* Visual Glows */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-15 filter blur-3xl"
                        style={{ background: "radial-gradient(circle, #dc2626 0%, transparent 70%)" }} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md relative z-10 border border-red-950/60 bg-black/60 backdrop-blur-md rounded-2xl p-8 text-center"
                    style={{ boxShadow: "0 25px 60px -25px rgba(239, 68, 68, 0.4)" }}
                >
                    <div className="flex justify-center mb-6">
                        <div className={`p-4 rounded-full border ${passError ? "border-red-500 bg-red-950/30 animate-bounce" : "border-red-900/40 bg-red-950/20"}`}>
                            <Lock className="w-8 h-8 text-red-500" />
                        </div>
                    </div>

                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400 mb-2">
                        [ Admin System Gate ]
                    </p>
                    <h2 className="font-podium text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide mb-3">
                        Passcode Required
                    </h2>
                    <p className="text-white/50 text-xs font-light mb-8">
                        Enter administrative credentials to access the registration database.
                    </p>

                    <form onSubmit={handleAuth} className="flex flex-col gap-4">
                        <div className="relative">
                            <input
                                required
                                type="password"
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value)}
                                placeholder="Enter admin passcode"
                                className="w-full bg-red-950/10 border border-red-900/40 focus:border-red-500/80 rounded-xl px-4 py-3.5 text-center text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 font-mono tracking-widest"
                            />
                        </div>

                        {passError && (
                            <p className="text-xs text-red-500 font-mono tracking-wider animate-pulse">
                                ⚠ AUTHORIZATION FAILED
                            </p>
                        )}

                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-500 text-white py-3.5 text-xs font-mono font-bold uppercase tracking-widest rounded-xl cursor-pointer transition-all border-none outline-none mt-2"
                            style={{ boxShadow: "0 0 20px rgba(239, 68, 68, 0.25)" }}
                        >
                            Decrypt Database
                        </button>
                    </form>

                    <button
                        onClick={onClose}
                        className="mt-6 text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none"
                    >
                        ← Back to Landing
                    </button>
                </motion.div>
            </section>
        )
    }

    return (
        <section className="relative min-h-screen w-full bg-[#070000] text-white py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            {/* Header Area */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 pb-6 border-b border-red-950/40">
                <div>
                    <button
                        onClick={onClose}
                        className="group flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors mb-3 cursor-pointer bg-transparent border-none outline-none"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                        <span>Return to Website</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="p-2 rounded-md bg-red-950/30 border border-red-900/60">
                            <Database className="w-5 h-5 text-red-500" />
                        </span>
                        <h1 className="font-podium text-2xl sm:text-4xl font-bold uppercase tracking-wider text-white">
                            Admin <span className="text-red-500">Database</span>
                        </h1>
                    </div>
                </div>

                {/* Dashboard Controls */}
                <div className="flex flex-wrap items-center gap-3">

                    <button
                        onClick={downloadCSV}
                        className="flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-widest rounded-lg border border-red-700/60 bg-red-900/20 hover:bg-red-800/30 text-white transition-all cursor-pointer outline-none"
                    >
                        <Download className="w-3.5 h-3.5" /> Export CSV
                    </button>
                    <button
                        onClick={clearDatabase}
                        className="flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-widest rounded-lg border border-red-900/50 bg-transparent hover:bg-red-950/40 text-red-500 hover:text-red-400 transition-all cursor-pointer outline-none"
                    >
                        <Trash2 className="w-3.5 h-3.5" /> Clear DB
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Stats Sidebar */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    {/* General metrics */}
                    <div className="border border-red-950/60 bg-black/40 rounded-xl p-5" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">Total Cohort Apply</span>
                            <Users className="w-4 h-4 text-red-500" />
                        </div>
                        <h2 className="text-4xl font-bold font-podium tracking-wide text-white leading-none mb-1">
                            {registrations.length}
                        </h2>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-red-400/60">students registered</span>
                    </div>

                    {/* Department stats */}
                    <div className="border border-red-950/60 bg-black/40 rounded-xl p-5" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
                        <div className="flex items-center gap-2 mb-4">
                            <GraduationCap className="w-4 h-4 text-red-500" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">By Department</span>
                        </div>
                        <div className="space-y-3.5">
                            {["CSE", "CSE-AI", "Cyber Security", "ECE", "EEE", "AIDS"].map((dept) => {
                                const count = stats[dept] || 0
                                const total = registrations.length || 1
                                const pct = (count / total) * 100
                                return (
                                    <div key={dept} className="flex flex-col gap-1">
                                        <div className="flex justify-between text-xs font-mono">
                                            <span className="text-white/60">{dept}</span>
                                            <span className="text-white/80 font-bold">{count}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-red-600 rounded-full transition-all duration-500"
                                                style={{ width: `${pct}%`, boxShadow: count > 0 ? "0 0 6px rgba(239,68,68,0.5)" : "none" }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Table Data */}
                <div className="lg:col-span-9 flex flex-col gap-6">
                    {!isSupabaseConfigured && (
                        <div className="border border-yellow-500/20 bg-yellow-500/5 rounded-xl p-4 flex items-center gap-3">
                            <ShieldAlert className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                            <div className="text-left">
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Local Storage Fallback Mode</h4>
                                <p className="text-[10px] text-white/50 mt-1">Supabase variables are unconfigured. To enable database persistence across all devices, configure <b>VITE_SUPABASE_URL</b> and <b>VITE_SUPABASE_ANON_KEY</b> in your <b>.env</b> file.</p>
                            </div>
                        </div>
                    )}
                    {/* Search & Filters */}
                    <div className="border border-red-950/60 bg-black/40 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full sm:max-w-xs">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                                <Search className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, roll, phone..."
                                className="w-full bg-red-950/10 border border-red-900/30 focus:border-red-500/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-white/20 outline-none transition-colors"
                            />
                        </div>

                        {/* Dept Pill Filter */}
                        <div className="flex flex-wrap gap-1.5 self-start sm:self-center">
                            {["ALL", "CSE", "CSE-AI", "Cyber Security", "ECE", "EEE", "AIDS"].map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setDeptFilter(dept)}
                                    className={`px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-widest cursor-pointer transition-all border outline-none ${deptFilter === dept
                                            ? "bg-red-600 border-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.35)]"
                                            : "bg-red-950/10 border-red-900/30 text-white/50 hover:text-white"
                                        }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table View */}
                    <div className="border border-red-950/60 bg-black/30 rounded-xl overflow-hidden" style={{ boxShadow: "0 15px 40px rgba(0,0,0,0.5)" }}>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-red-950/60 bg-red-950/10 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                                        <th className="py-4 px-5">Name</th>
                                        <th className="py-4 px-5">Roll No</th>
                                        <th className="py-4 px-5">Department</th>
                                        <th className="py-4 px-5">Phone</th>
                                        <th className="py-4 px-5">Date Registered</th>
                                        <th className="py-4 px-5 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-red-950/20 text-xs">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="py-12 px-5 text-center text-white/30 font-mono">
                                                <Loader2 className="w-8 h-8 text-red-500 mx-auto mb-3 animate-spin" />
                                                Loading registrations from Supabase...
                                            </td>
                                        </tr>
                                    ) : filteredRegistrations.length > 0 ? (
                                        filteredRegistrations.map((reg) => (
                                            <tr key={reg.id} className="hover:bg-red-950/5 transition-colors">
                                                <td className="py-4 px-5 font-medium text-white">{reg.name}</td>
                                                <td className="py-4 px-5 font-mono text-white/70">{reg.rollNo}</td>
                                                <td className="py-4 px-5">
                                                    <span className="px-2.5 py-1 rounded bg-red-950/40 border border-red-800/40 text-[9px] font-mono uppercase text-red-400">
                                                        {reg.department}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-5 font-mono text-white/60">{reg.phone}</td>
                                                <td className="py-4 px-5 text-white/40 font-mono text-[10px]">
                                                    {new Date(reg.timestamp).toLocaleDateString(undefined, {
                                                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                    })}
                                                </td>
                                                <td className="py-4 px-5 text-right">
                                                    <button
                                                        onClick={() => deleteRegistration(reg.id)}
                                                        className="p-1.5 rounded bg-transparent border border-transparent hover:border-red-900/40 hover:bg-red-950/20 text-white/30 hover:text-red-500 transition-all cursor-pointer outline-none"
                                                        title="Delete entry"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="py-12 px-5 text-center text-white/30 font-mono">
                                                <ShieldAlert className="w-8 h-8 text-red-900/40 mx-auto mb-3" />
                                                No registrations found in database
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            <AnimatePresence>
                {successToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 border border-red-500/30 bg-[#160202] px-5 py-3 rounded-xl shadow-2xl"
                    >
                        <Check className="w-4 h-4 text-red-500" strokeWidth={3} />
                        <span className="font-mono text-xs uppercase tracking-wider text-white/90">{successToast}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

import { useEffect, useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import {
  Brain,
  Smartphone,
  Shield,
  Code,
  ArrowUpRight,
  Radio,
  Crosshair,
  Activity,
} from "lucide-react"

/* ── Types ── */
interface Skill {
  name: string
  tag: string
  description: string
  level: number
}

interface Module {
  id: string
  title: string
  tag: string
  icon: React.ComponentType<{ className?: string }>
  role: string
  demand: number
  salary: string
  keywords: string[]
  skills: Skill[]
  jobTitles: string[]
}

const modules: Module[] = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    tag: "AI",
    icon: Brain,
    role: "Junior AI / ML Developer",
    demand: 94,
    salary: "$48k – $72k",
    keywords: [
      "LangChain", "Pinecone", "RAG", "Embeddings", "Agents", "Llama-3",
      "OpenAI", "Ollama", "Vector Search", "Tool-Use", "Fine-Tune",
    ],
    skills: [
      { name: "LLM Orchestration", tag: "LangChain / LlamaIndex", description: "Build and chain large language model pipelines for production-grade AI applications.", level: 86 },
      { name: "Vector Databases", tag: "ChromaDB / Pinecone", description: "Store, index, and retrieve high-dimensional embeddings for semantic search at scale.", level: 78 },
      { name: "Agentic Pipelines", tag: "Tool Calling", description: "Design autonomous multi-agent workflows that reason, plan, and act independently.", level: 82 },
      { name: "Prompt Engineering", tag: "Ollama / Local Models", description: "Craft structured prompts and deploy local models for privacy-first AI systems.", level: 90 },
    ],
    jobTitles: ["Junior AI Developer", "AI Intern", "ML Intern", "Junior Prompt Engineer"],
  },
  {
    id: "web",
    title: "Web & Mobile Dev",
    tag: "WEB",
    icon: Smartphone,
    role: "Junior Web Developer",
    demand: 88,
    salary: "$42k – $66k",
    keywords: [
      "HTML5", "CSS3", "Flexbox", "Grid", "React", "DOM", "Validation",
      "Tailwind", "Forms", "PWA", "Responsive", "Accessibility",
    ],
    skills: [
      { name: "HTML & CSS", tag: "Markup & Styling", description: "Structure and style modern web interfaces from scratch with semantic, accessible code.", level: 92 },
      { name: "JavaScript & DOM", tag: "Logic & Interactivity", description: "Manipulate the DOM, handle events, and build dynamic, reactive user experiences.", level: 85 },
      { name: "Form Engineering", tag: "Validation & UX", description: "Build validated, accessible forms with client-side and server-side logic.", level: 80 },
      { name: "App Architecture", tag: "Full Product Builds", description: "Architect and ship complete web and mobile applications from design to deployment.", level: 76 },
    ],
    jobTitles: ["Junior Frontend Developer", "Web Dev Intern", "Junior UI Developer", "Trainee App Developer"],
  },
  {
    id: "sec",
    title: "Cybersecurity",
    tag: "SEC",
    icon: Shield,
    role: "Junior Security Analyst",
    demand: 91,
    salary: "$50k – $78k",
    keywords: [
      "OSI", "TLS", "AES", "RSA", "SHA-256", "Burp", "Wireshark",
      "Nmap", "Pentest", "Forensics", "OWASP", "ZeroDay",
    ],
    skills: [
      { name: "Network Security", tag: "OSI / Web Security", description: "Understand the full network stack and identify attack surfaces across web protocols.", level: 84 },
      { name: "Cryptography", tag: "Encryption & Hashing", description: "Implement symmetric and asymmetric encryption, hashing, and key management systems.", level: 80 },
      { name: "Reverse Engineering", tag: "Binary Exploitation", description: "Disassemble binaries, discover vulnerabilities, and exploit memory-level weaknesses.", level: 72 },
      { name: "Forensics & IR", tag: "Incident Response", description: "Perform digital forensics, analyze artifacts, and lead incident response operations.", level: 78 },
    ],
    jobTitles: ["Cybersecurity Intern", "Junior SOC Analyst", "IT Security Trainee", "Junior Ethical Hacker"],
  },
  {
    id: "py",
    title: "Python & Systems",
    tag: "PY",
    icon: Code,
    role: "Junior Backend Developer",
    demand: 89,
    salary: "$46k – $74k",
    keywords: [
      "asyncio", "FastAPI", "gRPC", "Pydantic", "DSA", "Docker",
      "CI/CD", "PostgreSQL", "Redis", "Pytest", "Numpy", "Async I/O",
    ],
    skills: [
      { name: "Asyncio & Concurrency", tag: "Multiprocessing", description: "Write high-throughput async Python systems processing thousands of tasks concurrently.", level: 82 },
      { name: "FastAPI / gRPC", tag: "High-Perf APIs", description: "Build blazing-fast REST and RPC APIs with automatic validation and schema generation.", level: 88 },
      { name: "Data Structures", tag: "Algorithms & Memory", description: "Master advanced algorithms, memory layouts, and complexity analysis for optimized code.", level: 74 },
      { name: "DevOps Scripting", tag: "Pipelines & Automation", description: "Automate deployments, CI/CD pipelines, and system operations with Python scripts.", level: 80 },
    ],
    jobTitles: ["Junior Python Developer", "Backend Intern", "Junior Automation Engineer", "Python Trainee"],
  },
]

/* ── AnimatedCounter ── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 80, damping: 18 })
  const rounded = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)
  const [out, setOut] = useState(`0${suffix}`)

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setOut(v))
    mv.set(value)
    return () => unsub()
  }, [value, suffix, mv, rounded])

  return <span>{out}</span>
}

/* ── ProficiencyRing ── */
function ProficiencyRing({ value, delay = 0 }: { value: number; delay?: number }) {
  const R = 22
  const C = 2 * Math.PI * R
  return (
    <div className="relative w-[60px] h-[60px] flex-shrink-0">
      <svg width={60} height={60} viewBox="0 0 60 60" className="-rotate-90">
        <circle cx={30} cy={30} r={R} stroke="rgba(239,68,68,0.12)" strokeWidth={4} fill="none" />
        <motion.circle
          cx={30} cy={30} r={R}
          stroke="url(#ringGrad)"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C - (C * value) / 100 }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: "drop-shadow(0 0 6px rgba(239,68,68,0.5))" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
      </svg>

    </div>
  )
}

/* ── TiltCard ── */
function TiltCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useSpring(0, { stiffness: 200, damping: 18 })
  const ry = useSpring(0, { stiffness: 200, damping: 18 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 10)
    rx.set(-py * 10)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Marquee ── */
function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items]
  return (
    <div
      className="relative overflow-hidden py-2 border-y"
      style={{
        borderColor: "rgba(239,68,68,0.18)",
        background: "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(239,68,68,0.06) 50%, rgba(0,0,0,0.4) 100%)",
      }}
    >
      <motion.div
        className="flex gap-3 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((kw, i) => (
          <span
            key={i}
            className="text-[10px] font-mono uppercase tracking-[0.3em] px-3 py-1 rounded-full flex-shrink-0"
            style={{
              color: i % 5 === 0 ? "#f87171" : "rgba(255,255,255,0.45)",
              border: "1px solid rgba(239,68,68,0.18)",
              background: "rgba(239,68,68,0.04)",
            }}
          >
            ⟢ {kw}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ── StatBlock ── */
function StatBlock({
  label,
  value,
  valueStr,
  suffix,
  bar,
}: {
  label: string
  value?: number
  valueStr?: string
  suffix?: string
  bar?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/35">{label}</div>
      <div className="text-lg font-bold text-white leading-none">
        {valueStr ? valueStr : <AnimatedCounter value={value ?? 0} suffix={suffix ?? ""} />}
      </div>
      {bar && value !== undefined && (
        <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "linear-gradient(90deg, #7f1d1d 0%, #ef4444 50%, #fca5a5 100%)",
              boxShadow: "0 0 8px rgba(239,68,68,0.55)",
              height: "100%",
            }}
          />
        </div>
      )}
    </div>
  )
}

/* ── Main ── */
export default function SkillMatrixSection({ onRegister }: { onRegister?: () => void }) {
  const [activeId, setActiveId] = useState<string>("ai")
  const active = modules.find((m) => m.id === activeId)!
  const Icon = active.icon
  const activeIdx = modules.findIndex((m) => m.id === activeId)

  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-15% 0px" })

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative scroll-mt-28 py-12 sm:py-20 px-4 sm:px-8 lg:px-16 z-10 border-t overflow-hidden"
      style={{
        borderColor: "rgba(239,68,68,0.15)",
        background: "radial-gradient(ellipse at 50% 0%, #2a0000 0%, #140000 45%, #080000 100%)",
      }}
    >
      {/* Grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239,68,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "10%", right: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(20px)" }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: "-80px", left: "2%", width: "420px", height: "420px", background: "radial-gradient(circle, rgba(185,28,28,0.14) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(20px)" }}
        />
      </div>

      {/* Grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 flex-wrap">
          <div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-[0.06em] leading-[0.95]">
              Skill <span style={{ color: "#ef4444" }}>Outcomes</span>

            </h2>
            <p className="text-white/45 mt-4 max-w-xl text-sm font-light leading-relaxed">
              Each module is built for freshers. Complete a track and you walk away genuinely eligible for internships and junior roles in the industry.
            </p>
          </div>



        </div>


        <div
          className="relative flex flex-wrap gap-1 p-1 rounded-xl mb-3 border w-full sm:w-auto"
          style={{
            borderColor: "rgba(239,68,68,0.2)",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
          }}
        >
          {modules.map((mod) => {
            const PillIcon = mod.icon
            const isActive = activeId === mod.id
            return (
              <button
                key={mod.id}
                onClick={() => setActiveId(mod.id)}
                className="relative px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] cursor-pointer"
                style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)", transition: "color 200ms" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    style={{
                      background: "linear-gradient(135deg, rgba(239,68,68,0.35) 0%, rgba(127,29,29,0.5) 100%)",
                      border: "1px solid rgba(239,68,68,0.6)",
                      boxShadow: "0 0 20px rgba(239,68,68,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <PillIcon className="w-3.5 h-3.5" />
                  {mod.tag}
                </span>
              </button>
            )
          })}
        </div>

        {/* Marquee */}
        <div className="mb-8">
          <Marquee items={active.keywords} />
        </div>

        {/* Main grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* LEFT: Skill cards */}
            <div
              className="lg:col-span-7 rounded-2xl border p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden"
              style={{
                borderColor: "rgba(239,68,68,0.22)",
                background: "linear-gradient(145deg, rgba(28,0,0,0.85) 0%, rgba(12,0,0,0.95) 100%)",
                boxShadow: "0 20px 60px -20px rgba(239,68,68,0.25)",
              }}
            >
              {/* Dossier stamp */}
              <div
                aria-hidden
                className="absolute -top-2 -right-6 rotate-12 px-4 py-1 text-[9px] font-mono uppercase tracking-[0.4em] select-none"
                style={{
                  color: "rgba(239,68,68,0.55)",
                  border: "1.5px dashed rgba(239,68,68,0.4)",
                  background: "rgba(239,68,68,0.04)",
                }}
              >
                ◉ classified · track {String(activeIdx + 1).padStart(2, "0")}
              </div>

              {/* Module label */}
              <div className="flex items-center gap-3 pb-5 border-b" style={{ borderColor: "rgba(239,68,68,0.15)" }}>
                <motion.div
                  className="p-2.5 rounded-lg"
                  style={{ background: "rgba(239,68,68,0.15)", color: "#f87171" }}
                  animate={{ boxShadow: ["0 0 0 rgba(239,68,68,0)", "0 0 18px rgba(239,68,68,0.4)", "0 0 0 rgba(239,68,68,0)"] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: "#f87171" }}>
                    {active.tag} track
                  </div>
                  <div className="text-white text-lg uppercase tracking-[0.1em] font-bold">{active.title}</div>
                </div>
                <div className="ml-auto text-right hidden sm:block">
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">target role</div>
                  <div className="text-xs font-semibold text-white/75">{active.role}</div>
                </div>
              </div>

              {/* Skill cards */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3">
                {active.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -4 }}
                    className="group relative rounded-xl p-4 flex flex-col gap-3 overflow-hidden cursor-default"
                    style={{
                      background: "linear-gradient(160deg, rgba(239,68,68,0.08) 0%, rgba(0,0,0,0.3) 100%)",
                      border: "1px solid rgba(239,68,68,0.18)",
                    }}
                  >
                    {/* Hover beam */}
                    <motion.span
                      aria-hidden
                      className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none opacity-0 group-hover:opacity-100"
                      style={{
                        background: "conic-gradient(from 90deg at 50% 50%, transparent 0deg, rgba(239,68,68,0.18) 30deg, transparent 60deg)",
                        transition: "opacity 400ms",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="relative">
                      <div className="text-lg font-bold text-white">
                        {skill.name}
                      </div>

                      <div
                        className="text-xs font-mono uppercase tracking-[0.25em] mt-1"
                        style={{ color: "rgba(248,113,113,0.6)" }}
                      >
                        ◇ {skill.tag}
                      </div>
                    </div>
                    <p className="relative text-base text-white/75 leading-relaxed">{skill.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Stats strip */}

            </div>

            {/* RIGHT: Job feed + CTA */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <TiltCard
                className="rounded-2xl border p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 flex-1 relative overflow-hidden"
                style={{
                  borderColor: "rgba(239,68,68,0.22)",
                  background: "linear-gradient(145deg, rgba(28,0,0,0.85) 0%, rgba(12,0,0,0.95) 100%)",
                  boxShadow: "0 20px 60px -20px rgba(239,68,68,0.25)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 animate-pulse" style={{ color: "#f87171" }} />
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.35em]" style={{ color: "#f87171" }}>
                      Deployment Targets
                    </p>
                    <p className="text-white/40 text-[11px] mt-0.5">Entry-level roles & internships unlocked</p>
                  </div>
                </div>

                {/* Job ticker */}
                <div className="flex flex-col gap-2">
                  {active.jobTitles.map((title, i) => (
                    <motion.a
                      key={title}
                      href="#register"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
                      whileHover={{ x: 4 }}
                      className="group flex items-center justify-between px-4 py-3 rounded-lg relative overflow-hidden"
                      style={{
                        background: "linear-gradient(90deg, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0.03) 100%)",
                        border: "1px solid rgba(239,68,68,0.18)",
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-[10px] font-mono" style={{ color: "rgba(248,113,113,0.55)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-white/85 font-medium truncate">{title}</span>
                      </div>
                      <span
                        className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em]"
                        style={{ color: "#f87171" }}
                      >


                      </span>
                    </motion.a>
                  ))}
                </div>

                {/* Radar bars */}
                <div className="mt-auto flex items-center gap-1.5 pt-3 border-t" style={{ borderColor: "rgba(239,68,68,0.12)" }}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="block w-1 rounded-full"
                      style={{
                        height: 6 + ((i * 7) % 16),
                        background: i % 3 === 0 ? "#ef4444" : "rgba(239,68,68,0.25)",
                      }}
                      animate={{ scaleY: [1, 1.6, 1] }}
                      transition={{
                        duration: 1.2 + (i % 5) * 0.2,
                        repeat: Infinity,
                        delay: i * 0.08,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                  <span className="ml-auto text-[10px] font-mono uppercase tracking-[0.3em] text-white/35">
                    signal · strong
                  </span>
                </div>
              </TiltCard>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRegister}
                className="group relative w-full py-4 text-xs font-mono font-bold uppercase tracking-[0.4em] rounded-xl cursor-pointer overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #7f1d1d 100%)",
                  color: "#ffffff",
                  boxShadow: "0 10px 30px -10px rgba(220,38,38,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
                  border: "1px solid rgba(239,68,68,0.55)",
                }}
              >
                {/* Shine sweep */}
                <motion.span
                  aria-hidden
                  className="absolute inset-y-0 -left-1/2 w-1/3 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                    transform: "skewX(-20deg)",
                  }}
                  animate={{ x: ["-100%", "400%"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="relative flex items-center justify-center gap-3">
                  Register Now
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
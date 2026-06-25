import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Smartphone, Shield, Code, ArrowUpRight, CheckCircle2 } from "lucide-react"

interface Skill {
  name: string
  tag: string
  description: string
}

interface Module {
  id: string
  title: string
  tag: string
  icon: React.ComponentType<{ className?: string }>
  role: string
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
    skills: [
      { name: "LLM Orchestration", tag: "LangChain / LlamaIndex", description: "Build and chain large language model pipelines for production-grade AI applications." },
      { name: "Vector Databases", tag: "ChromaDB / Pinecone", description: "Store, index, and retrieve high-dimensional embeddings for semantic search at scale." },
      { name: "Agentic Pipelines", tag: "Tool Calling / Workflows", description: "Design autonomous multi-agent workflows that reason, plan, and act independently." },
      { name: "Prompt Engineering", tag: "Ollama / Local Models", description: "Craft structured prompts and deploy local models for privacy-first AI systems." }
    ],
    jobTitles: ["Junior AI Developer", "AI Intern", "ML Intern", "Junior Prompt Engineer"]
  },
  {
    id: "web",
    title: "Web & Mobile Dev",
    tag: "WEB",
    icon: Smartphone,
    role: "Junior Web Developer",
    skills: [
      { name: "HTML & CSS", tag: "Markup & Styling", description: "Structure and style modern web interfaces from scratch with semantic, accessible code." },
      { name: "JavaScript & DOM", tag: "Logic & Interactivity", description: "Manipulate the DOM, handle events, and build dynamic, reactive user experiences." },
      { name: "Form Engineering", tag: "Validation & UX", description: "Build validated, accessible forms with client-side and server-side logic." },
      { name: "App Architecture", tag: "Full Product Builds", description: "Architect and ship complete web and mobile applications from design to deployment." }
    ],
    jobTitles: ["Junior Frontend Developer", "Web Dev Intern", "Junior UI Developer", "Trainee App Developer"]
  },
  {
    id: "sec",
    title: "Cybersecurity",
    tag: "SEC",
    icon: Shield,
    role: "Junior Security Analyst",
    skills: [
      { name: "Network Security", tag: "OSI / Web Security", description: "Understand the full network stack and identify attack surfaces across web protocols." },
      { name: "Cryptography", tag: "Encryption & Hashing", description: "Implement symmetric and asymmetric encryption, hashing, and key management systems." },
      { name: "Reverse Engineering", tag: "Binary Exploitation", description: "Disassemble binaries, discover vulnerabilities, and exploit memory-level weaknesses." },
      { name: "Forensics & IR", tag: "Incident Response", description: "Perform digital forensics, analyze artifacts, and lead incident response operations." }
    ],
    jobTitles: ["Cybersecurity Intern", "Junior SOC Analyst", "IT Security Trainee", "Junior Ethical Hacker"]
  },
  {
    id: "py",
    title: "Python & Systems",
    tag: "PY",
    icon: Code,
    role: "Junior Backend Developer",
    skills: [
      { name: "Asyncio & Concurrency", tag: "Multiprocessing", description: "Write high-throughput async Python systems processing thousands of tasks concurrently." },
      { name: "FastAPI / gRPC", tag: "High-Perf APIs", description: "Build blazing-fast REST and RPC APIs with automatic validation and schema generation." },
      { name: "Data Structures", tag: "Algorithms & Memory", description: "Master advanced algorithms, memory layouts, and complexity analysis for optimized code." },
      { name: "DevOps Scripting", tag: "Pipelines & Automation", description: "Automate deployments, CI/CD pipelines, and system operations with Python scripts." }
    ],
    jobTitles: ["Junior Python Developer", "Backend Intern", "Junior Automation Engineer", "Python Trainee"]
  }
]

export default function SkillMatrixSection() {
  const [activeId, setActiveId] = useState<string>("ai")
  const active = modules.find((m) => m.id === activeId)!
  const Icon = active.icon

  return (
    <section
      id="skills"
      className="relative scroll-mt-28 py-20 px-6 sm:px-10 lg:px-16 z-10 border-t border-white/10 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0f0000 0%, #200000 50%, #0f0000 100%)" }}
    >
      {/* Glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", top: "20%", right: "-100px", width: "450px", height: "450px", background: "radial-gradient(circle, rgba(220,38,38,0.14) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "5%", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(185,28,28,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: "#f87171" }}>
            [ graduate capability matrix ]
          </p>
          <h2 className="text-3xl sm:text-5xl font-podium font-bold text-white uppercase tracking-wider">
            Skill <span style={{ color: "#ef4444" }}>Outcomes</span>
          </h2>
          <p className="text-white/50 mt-3 max-w-xl text-sm font-light leading-relaxed">
            Each module is built for freshers. Complete a track and you walk away genuinely eligible for internships and junior roles in the industry.
          </p>
        </div>

        {/* Module selector pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {modules.map((mod) => {
            const PillIcon = mod.icon
            const isActive = activeId === mod.id
            return (
              <button
                key={mod.id}
                onClick={() => setActiveId(mod.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer border"
                style={{
                  background: isActive ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.04)",
                  borderColor: isActive ? "rgba(239,68,68,0.7)" : "rgba(255,255,255,0.1)",
                  color: isActive ? "#f87171" : "rgba(255,255,255,0.45)",
                  boxShadow: isActive ? "0 0 16px rgba(239,68,68,0.2)" : "none"
                }}
              >
                <PillIcon className="w-3.5 h-3.5" />
                {mod.tag}
              </button>
            )
          })}
        </div>

        {/* Main grid */}
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Left: Skill cards */}
          <div
            className="lg:col-span-7 rounded-xl border p-6 sm:p-8 flex flex-col gap-6"
            style={{
              borderColor: "rgba(239,68,68,0.2)",
              background: "linear-gradient(145deg, rgba(25,0,0,0.9) 0%, rgba(15,0,0,0.95) 100%)"
            }}
          >
            {/* Module label */}
            <div className="flex items-center gap-3 pb-5 border-b" style={{ borderColor: "rgba(239,68,68,0.15)" }}>
              <div className="p-2.5 rounded-lg" style={{ background: "rgba(239,68,68,0.15)", color: "#f87171" }}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest" style={{ color: "#f87171" }}>{active.tag} track</div>
                <div className="font-podium text-white text-lg uppercase tracking-wider">{active.title}</div>
              </div>
              <div className="ml-auto text-right hidden sm:block">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/30">target role</div>
                <div className="text-xs font-semibold text-white/70">{active.role}</div>
              </div>
            </div>

            {/* Skill cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {active.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-lg p-4 flex flex-col gap-2"
                  style={{
                    background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.15)"
                  }}
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#f87171" }} />
                    <div>
                      <div className="text-sm font-semibold text-white">{skill.name}</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest mt-0.5" style={{ color: "rgba(248,113,113,0.55)" }}>
                        {skill.tag}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed pl-6">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Job outcomes + CTA */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Job titles card */}
            <div
              className="rounded-xl border p-6 flex flex-col gap-4 flex-1"
              style={{
                borderColor: "rgba(239,68,68,0.2)",
                background: "linear-gradient(145deg, rgba(25,0,0,0.9) 0%, rgba(15,0,0,0.95) 100%)"
              }}
            >
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#f87171" }}>
                  Job Titles Unlocked
                </p>
                <p className="text-white/40 text-xs">Entry-level roles and internships you become eligible for</p>
              </div>

              <div className="flex flex-col gap-2">
                {active.jobTitles.map((title, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center justify-between px-4 py-2.5 rounded-lg"
                    style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)" }}
                  >
                    <span className="text-sm text-white/80 font-medium">{title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "#f87171" }} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              className="w-full py-3.5 text-xs font-mono font-bold uppercase tracking-widest rounded-lg cursor-pointer transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #dc2626, #991b1b)",
                color: "#ffffff",
                boxShadow: "0 0 24px rgba(220,38,38,0.3)"
              }}
              onClick={() => alert("Redirecting to registration...")}
            >
              Register Now →
            </button>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
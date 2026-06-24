import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Smartphone, Shield, Code, X, Terminal } from "lucide-react"

interface Course {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<any>
  topics: string[]
  benefits: string
  codeSnippet: string
  color: string
  accentClass: string
  textClass: string
}

export default function CurriculumSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const courses: Course[] = [
    {
      id: "ai",
      title: "Artificial Intelligence",
      subtitle: "Agentic Frameworks & Model Orchestration",
      icon: Brain,
      topics: [
        "LLM Orchestration (LangChain / LlamaIndex)",
        "Semantic Search & Vector Databases (ChromaDB / Pinecone)",
        "Autonomous Agentic Workflows & Tool Calling",
        "Prompt Engineering & Local Model Deployments (Ollama)"
      ],
      benefits: "AI engineering is transitioning from simple APIs to autonomous agents. By mastering vector stores, semantic search, and autonomous pipelines, you stop being just a consumer of AI models and start building custom intelligence engines. This makes you eligible for high-demand AI developer roles.",
      codeSnippet: `import { OpenAI, VectorDB } from "bridgecourse-ai";

const agent = new AutonomousAgent({
  model: "llama-3.1-70b",
  tools: [webSearch, databaseQuery],
});

await agent.execute("Analyze server logs & patch vulnerability");`,
      color: "emerald",
      accentClass: "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/60 shadow-emerald-500/5",
      textClass: "text-emerald-400"
    },
    {
      id: "web-app",
      title: "Web & Mobile App Dev",
      subtitle: "Production Architectures & Cross-Platform",
      icon: Smartphone,
      topics: [
        "Advanced React / Next.js (Server Components & Hydration)",
        "Cross-Platform Native Apps with React Native & Expo",
        "State Management & Cache Syncing (Zustand / React Query)",
        "Low-Latency API Design (WebSockets / gRPC / GraphQL)"
      ],
      benefits: "Building basic interfaces is simple; scaling them to load in milliseconds and synchronize in real-time is the real challenge. You will master modern rendering pipelines and state sync across web and mobile. This allows you to ship complete digital products independently.",
      codeSnippet: `// Synchronized low-latency socket room
import { WebSocketChannel } from "bridgecourse-sync";

const socket = new WebSocketChannel("wss://api.bridgecourse.dev/v1/sync");
socket.joinRoom("production-monitor-room");

socket.on("state_update", (payload) => {
  updateLocalState(payload.delta);
});`,
      color: "blue",
      accentClass: "border-blue-500/30 bg-blue-500/5 hover:border-blue-500/60 shadow-blue-500/5",
      textClass: "text-blue-400"
    },
    {
      id: "security",
      title: "Zero-Trust Cybersecurity",
      subtitle: "Offensive Hardening & Infrastructure Sec",
      icon: Shield,
      topics: [
        "OWASP Top 10 Defensive Hardening & AppSec",
        "Zero-Trust Architecture & Cryptographic Signature Verification",
        "JWT / OAuth2 / SSO Custom Implementations",
        "Vulnerability Scans & Penetration Testing Protocols"
      ],
      benefits: "Security is no longer a luxury—it is an engineering prerequisite. Learning JWT authentication, threat modeling, and encryption standards ensures your applications are secure-by-default. Companies value engineers who write secure code, keeping system architectures safe from breaches.",
      codeSnippet: `# Defensive vulnerability sweep simulator
nmap -sS -sV -A -T4 -p 80,443,8080 secure.bridgecourse.dev

[+] Port 443 OPEN: TLSv1.3 Strong Ciphers Enabled
[+] Port 8080 OPEN: Zero-Trust Gateway Active (MFA Required)
[+] Scan Complete: 0 vulnerabilities found.`,
      color: "red",
      accentClass: "border-red-500/30 bg-red-500/5 hover:border-red-500/60 shadow-red-500/5",
      textClass: "text-red-400"
    },
    {
      id: "python",
      title: "Python & Systems Programming",
      subtitle: "High-Performance Concurrency & Microservices",
      icon: Code,
      topics: [
        "Asyncio Concurrency & Multiprocessing Systems",
        "High-Performance API Architectures (FastAPI / gRPC)",
        "Algorithms, Advanced Data Structures & Memory Layouts",
        "Automated System Scripting & DevOps Pipelines"
      ],
      benefits: "Python is the backbone of modern machine learning, systems scripting, and data engineering. Mastering asyncio and systems-level Python allows you to write highly efficient code, processing millions of tasks concurrently.",
      codeSnippet: `import asyncio

async def worker(task_id: int):
    # Simulating database writing
    await asyncio.sleep(0.01)
    return f"Task {task_id} successfully synchronized"

async def main():
    results = await asyncio.gather(*(worker(i) for i in range(1000)))
    print(f"Processed {len(results)} system-level operations.")`,
      color: "amber",
      accentClass: "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/60 shadow-amber-500/5",
      textClass: "text-amber-400"
    }
  ]

  return (
    <section id="curriculum" className="relative py-24 px-6 sm:px-10 lg:px-16 border-t border-white/10 z-10 bg-black/60 backdrop-blur-md">
      {/* Background glow visual elements */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="mb-16 text-left">
          <p className="text-xs text-primary font-mono tracking-widest uppercase mb-2">
            [ active curriculum pillars ]
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-podium font-bold text-white uppercase tracking-wider">
            Syllabus <span className="text-primary glow-text">Modules</span>
          </h2>
          <p className="text-white/60 mt-3 max-w-xl text-sm font-light leading-relaxed">
            We don't teach simple syntax templates. We teach production-level systems design 
            and implementation across the core technologies of modern engineering. Click a module below to inspect.
          </p>
        </div>

        {/* Dynamic Card Deck (Framer Motion Grid) */}
        <motion.div 
          layout
          className={`grid gap-6 ${
            expandedId ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {courses.map((course) => {
            const Icon = course.icon
            const isExpanded = expandedId === course.id

            // When a card is expanded, show only it in full-width, or stack the others in a compact sidebar
            // Let's implement an elegant filter: if expandedId is set and this isn't the expanded card, hide it
            if (expandedId && !isExpanded) return null

            return (
              <motion.div
                layoutId={`course-card-${course.id}`}
                key={course.id}
                onClick={() => {
                  if (!isExpanded) setExpandedId(course.id)
                }}
                className={`border rounded-lg p-6 sm:p-8 cursor-pointer flex flex-col justify-between transition-shadow relative overflow-hidden ${
                  isExpanded 
                    ? "bg-secondary/90 border-primary/50 shadow-2xl min-h-[500px]" 
                    : `bg-secondary/20 border-white/10 ${course.accentClass} h-[280px]`
                }`}
              >
                {/* Background glow lines for tech feel */}
                {isExpanded && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
                )}

                {/* Top Content Row */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded bg-white/5 border border-white/10 ${course.textClass}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {isExpanded && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedId(null)
                        }}
                        className="text-xs font-mono border border-white/20 hover:border-white/50 px-3 py-1 rounded text-white/70 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>[ Collapse ]</span>
                      </button>
                    )}
                  </div>

                  <div className="mt-2">
                    <h3 className="font-podium text-xl sm:text-2xl text-white uppercase tracking-wider">
                      {course.title}
                    </h3>
                    <p className="text-xs text-white/50 tracking-widest uppercase font-mono mt-1">
                      {course.subtitle}
                    </p>
                  </div>
                </div>

                {/* Middle Expansion Content (Visible only when expanded) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ delay: 0.15 }}
                      className="my-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
                    >
                      {/* Syllabus List */}
                      <div>
                        <h4 className="text-xs font-mono uppercase text-primary tracking-widest mb-3">
                          Syllabus Competencies:
                        </h4>
                        <ul className="space-y-2">
                          {course.topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-light text-white/80">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <h4 className="text-xs font-mono uppercase text-primary tracking-widest mt-6 mb-3">
                          Benefits & Outcomes:
                        </h4>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                          {course.benefits}
                        </p>
                      </div>

                      {/* Code console */}
                      <div className="flex flex-col rounded bg-black/60 border border-white/10 overflow-hidden font-mono text-[11px]">
                        <div className="bg-background/90 px-4 py-2 flex items-center justify-between border-b border-white/5">
                          <div className="flex items-center gap-1.5">
                            <Terminal className="h-3 w-3 text-primary" />
                            <span className="text-white/40 text-[9px]">console.sh</span>
                          </div>
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                          </div>
                        </div>
                        <pre className="p-4 overflow-x-auto text-white/80 text-left whitespace-pre select-text">
                          <code>{course.codeSnippet}</code>
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Action Hint */}
                {!isExpanded && (
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs font-mono text-white/60">
                    <span>[ CLICK TO CHOOSE ]</span>
                    <span>-&gt;</span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Dynamic Reset Button when expanded */}
        <AnimatePresence>
          {expandedId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 flex justify-center"
            >
              <button
                onClick={() => setExpandedId(null)}
                className="font-mono text-xs border border-primary/30 hover:border-primary text-primary px-6 py-3 uppercase tracking-wider rounded bg-primary/5 cursor-pointer hover:bg-primary/10 transition-all"
              >
                [ Show All Syllabus Modules ]
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

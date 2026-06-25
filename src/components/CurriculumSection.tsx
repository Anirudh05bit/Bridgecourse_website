import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Smartphone, Shield, Code, Terminal } from "lucide-react"

interface Course {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  topics: string[]
  benefits: string
  codeSnippet: string
  tag: string
}

const courses: Course[] = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    subtitle: "Agentic Frameworks & Model Orchestration",
    icon: Brain,
    tag: "AI",
    topics: [
      "LLM Orchestration (LangChain / LlamaIndex)",
      "Semantic Search & Vector Databases (ChromaDB / Pinecone)",
      "Autonomous Agentic Workflows & Tool Calling",
      "Prompt Engineering & Local Model Deployments (Ollama)"
    ],
    benefits:
      "AI engineering is transitioning from simple APIs to autonomous agents. By mastering vector stores, semantic search, and autonomous pipelines, you stop being just a consumer of AI models and start building custom intelligence engines. This makes you eligible for high-demand AI developer roles.",
    codeSnippet: `import { OpenAI, VectorDB } from "bridgecourse-ai";

const agent = new AutonomousAgent({
  model: "llama-3.1-70b",
  tools: [webSearch, databaseQuery],
});

await agent.execute(
  "Analyze server logs & patch vulnerability"
);`
  },
  {
    id: "web-app",
    title: "Web & Mobile App Dev",
    subtitle: "From Markup to Shipped Product",
    icon: Smartphone,
    tag: "WEB",
    topics: [
      "HTML & CSS — Structuring and Styling the Modern Web",
      "JavaScript — Logic, Interactivity & the DOM",
      "Forms — Building & Validating Forms with HTML, CSS & JS",
      "App Dev — Turning Web Fundamentals into Real Applications"
    ],
    benefits:
      "Every great product starts with the fundamentals done right. You will build fluency in markup, styling, and logic, then put it to work building real, validated forms before graduating to full application builds. By the end, you won't just understand the web — you'll be shipping on it.",
    codeSnippet: `// A validated form, built from first principles
<!DOCTYPE html>
<html>
<head>
  <title>Faculty Assignment Test</title>
</head>
<body>
  <h2>Timetable Form Test</h2>
  <form id="timetableForm">
    <div>
      <label>Name</label>
      <input type="number" id="name" value="1" required>
    </div>
    <button type="submit">Submit</button>
  </form>
  <script>
    document
      .getElementById("timetableForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
      });
  </script>
</body>
</html>`
  },
  {
    id: "security",
    title: "Cybersecurity",
    subtitle: "Offensive Hardening & Infrastructure Sec",
    icon: Shield,
    tag: "SEC",
    topics: [
      "Web security and networking — OSI model & core fundamentals",
      "Cryptography — Secure communication, encryption and hashing",
      "Reverse Engineering — Binary exploitation & vulnerability discovery",
      "Forensics — Incident response lifecycle and file metadata"
    ],
    benefits:
      "Everything we do now is online, which means the digital world is basically the new frontline. Every second, millions of cyberattacks happen invisibly. In this module, you learn to think exactly like a hacker so you can stop them — building a digital superpower to protect people's privacy and defend the real world.",
    codeSnippet: `from Crypto.Cipher import AES

KEY = b"MyNewSecretKey!!"
FLAG = b"CryptoDemoBlock!"
cipher = AES.new(KEY, AES.MODE_ECB)

# Encryption
encrypted = cipher.encrypt(FLAG)
print("Ciphertext (hex):", encrypted.hex())

# Decryption
cipher_dec = AES.new(KEY, AES.MODE_ECB)
decrypted = cipher_dec.decrypt(encrypted)
print("Decrypted text:", decrypted.decode())`
  },
  {
    id: "python",
    title: "Python & Systems",
    subtitle: "High-Performance Concurrency & Microservices",
    icon: Code,
    tag: "PY",
    topics: [
      "Asyncio Concurrency & Multiprocessing Systems",
      "High-Performance API Architectures (FastAPI / gRPC)",
      "Algorithms, Advanced Data Structures & Memory Layouts",
      "Automated System Scripting & DevOps Pipelines"
    ],
    benefits:
      "Python is the backbone of modern machine learning, systems scripting, and data engineering. Mastering asyncio and systems-level Python allows you to write highly efficient code, processing millions of tasks concurrently — making you a force in backend, ML, and infrastructure roles.",
    codeSnippet: `import asyncio

async def worker(task_id: int):
    # Simulating database writing
    await asyncio.sleep(0.01)
    return f"Task {task_id} synchronized"

async def main():
    results = await asyncio.gather(
        *(worker(i) for i in range(1000))
    )
    print(f"Processed {len(results)} operations.")

asyncio.run(main())`
  }
]

export default function CurriculumSection() {
  const [activeId, setActiveId] = useState<string>("ai")
  const active = courses.find((c) => c.id === activeId)!
  const Icon = active.icon

  return (
    <section
      id="curriculum"
      className="relative scroll-mt-28 py-20 px-6 sm:px-10 lg:px-16 z-10 border-t border-white/10"
      style={{
        background:
          "linear-gradient(160deg, #1a0000 0%, #2d0000 40%, #1a0000 100%)"
      }}
    >
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "10%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%)",
            borderRadius: "50%"
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "5%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(185,28,28,0.15) 0%, transparent 70%)",
            borderRadius: "50%"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-12">
          <p
            className="text-xs font-mono tracking-widest uppercase mb-2"
            style={{ color: "#f87171" }}
          >
            [ active curriculum pillars ]
          </p>
          <h2 className="text-3xl sm:text-5xl font-podium font-bold text-white uppercase tracking-wider">
            Syllabus{" "}
            <span style={{ color: "#ef4444" }}>Modules</span>
          </h2>
          <p className="text-white/50 mt-3 max-w-xl text-sm font-light leading-relaxed">
            We don't teach syntax templates. We teach production-level systems
            design. Click a module to inspect.
          </p>
        </div>

        {/* Layout: tab strip + content panel */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tab Strip */}
          <div className="flex flex-row lg:flex-col gap-2 lg:w-56 flex-shrink-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {courses.map((course) => {
              const TabIcon = course.icon
              const isActive = activeId === course.id
              return (
                <button
                  key={course.id}
                  onClick={() => setActiveId(course.id)}
                  className="flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 cursor-pointer border"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(239,68,68,0.25) 0%, rgba(185,28,28,0.15) 100%)"
                      : "rgba(255,255,255,0.03)",
                    borderColor: isActive
                      ? "rgba(239,68,68,0.6)"
                      : "rgba(255,255,255,0.08)",
                    boxShadow: isActive
                      ? "0 0 20px rgba(239,68,68,0.15)"
                      : "none"
                  }}
                >
                  <div
                    className="p-2 rounded flex-shrink-0"
                    style={{
                      background: isActive
                        ? "rgba(239,68,68,0.2)"
                        : "rgba(255,255,255,0.05)",
                      color: isActive ? "#f87171" : "rgba(255,255,255,0.4)"
                    }}
                  >
                    <TabIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-xs font-mono tracking-widest uppercase"
                      style={{
                        color: isActive
                          ? "#f87171"
                          : "rgba(255,255,255,0.3)"
                      }}
                    >
                      {course.tag}
                    </div>
                    <div
                      className="text-sm font-bold truncate"
                      style={{
                        color: isActive
                          ? "#ffffff"
                          : "rgba(255,255,255,0.55)"
                      }}
                    >
                      {course.title}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Content Panel */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="rounded-xl overflow-hidden border"
                style={{
                  borderColor: "rgba(239,68,68,0.25)",
                  background:
                    "linear-gradient(145deg, rgba(30,0,0,0.85) 0%, rgba(20,0,0,0.95) 100%)"
                }}
              >
                {/* Panel header */}
                <div
                  className="px-6 py-4 border-b flex items-center gap-3"
                  style={{
                    borderColor: "rgba(239,68,68,0.2)",
                    background: "rgba(239,68,68,0.07)"
                  }}
                >
                  <div
                    className="p-2 rounded"
                    style={{
                      background: "rgba(239,68,68,0.15)",
                      color: "#f87171"
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-podium text-white text-lg sm:text-xl uppercase tracking-wider">
                      {active.title}
                    </h3>
                    <p
                      className="text-xs font-mono tracking-widest uppercase"
                      style={{ color: "rgba(248,113,113,0.6)" }}
                    >
                      {active.subtitle}
                    </p>
                  </div>
                </div>

                {/* Two-column body */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-white/5">
                  {/* Left: syllabus + outcomes */}
                  <div className="p-6 flex flex-col gap-6">
                    <div>
                      <h4
                        className="text-xs font-mono uppercase tracking-widest mb-3"
                        style={{ color: "#f87171" }}
                      >
                        Syllabus Competencies:
                      </h4>
                      <ul className="space-y-2.5">
                        {active.topics.map((topic, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-white/75"
                          >
                            <span
                              style={{
                                color: "#ef4444",
                                marginTop: "2px",
                                flexShrink: 0
                              }}
                            >
                              ▸
                            </span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4
                        className="text-xs font-mono uppercase tracking-widest mb-3"
                        style={{ color: "#f87171" }}
                      >
                        Benefits & Outcomes:
                      </h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {active.benefits}
                      </p>
                    </div>
                  </div>

                  {/* Right: code console */}
                  <div
                    className="flex flex-col"
                    style={{ background: "rgba(0,0,0,0.5)" }}
                  >
                    {/* Console top bar */}
                    <div
                      className="flex items-center justify-between px-4 py-2.5 border-b"
                      style={{
                        borderColor: "rgba(239,68,68,0.15)",
                        background: "rgba(0,0,0,0.4)"
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Terminal
                          className="w-3.5 h-3.5"
                          style={{ color: "#f87171" }}
                        />
                        <span
                          className="text-xs font-mono"
                          style={{ color: "rgba(255,255,255,0.35)" }}
                        >
                          console.sh
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: "rgba(239,68,68,0.5)" }}
                        />
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: "rgba(239,68,68,0.25)" }}
                        />
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: "rgba(239,68,68,0.15)" }}
                        />
                      </div>
                    </div>

                    {/* Code */}
                    <pre
                      className="flex-1 p-5 overflow-x-auto text-xs leading-relaxed font-mono select-text"
                      style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      <code>{active.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
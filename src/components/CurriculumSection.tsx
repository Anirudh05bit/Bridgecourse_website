import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Brain, Smartphone, Shield, Code, Terminal, ChevronRight, Gamepad2 } from "lucide-react"

interface Course {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  topics: string[]
  benefits: string
  codeSnippet: string
  tag: string
  lang: string
}

const courses: Course[] = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    subtitle: "Agentic Frameworks & Model Orchestration",
    icon: Brain,
    tag: "AI",
    lang: "typescript",
    topics: [
      "Exploratory data analysis and data preprocessing ",
      "Introduction to AI",
      "Introduction to Machine Learning",
      "Interactive Machine Learning capstone project",
    ],
    benefits:
      "You will gain hands-on skills in exploratory data analysis and preprocessing to successfully clean and handle real-world datasets. Finally, you will apply core machine learning concepts by building an interactive capstone project to jumpstart your technical portfolio. And get a proper intro to AI",
    codeSnippet: `from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
from sklearn.preprocessing import StandardScaler


def train_logistic_regression(X_train, X_test, y_train, y_test):
    """Scales data, trains a Logistic Regression model, and prints a report."""
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Train model
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train_scaled, y_train)

    # Evaluate
    predictions = model.predict(X_test_scaled)
    print("Evaluation Results:\n", classification_report(y_test, predictions))

    return model, scaler`,
  },
  {
    id: "web-app",
    title: "Web & Mobile App Dev",
    subtitle: "From Markup to Shipped Product",
    icon: Smartphone,
    tag: "WEB",
    lang: "html",
    topics: [
      "HTML & CSS — Structuring and Styling the Modern Web",
      "JavaScript — Logic, Interactivity & the DOM",
      "Forms — Building & Validating Forms with HTML, CSS & JS",
      "App Dev — Turning Web Fundamentals into Real Applications",
    ],
    benefits:
      "Every great product starts with the fundamentals done right. You will build fluency in markup, styling, and logic, then put it to work building real, validated forms before graduating to full application builds. By the end, you won't just understand the web — you'll be shipping on it.",
    codeSnippet: `<!DOCTYPE html>
<html>
<head>
  <title>Faculty Assignment Test</title>
</head>
<body>
  <h2>Timetable Form Test</h2>
  <form id="timetableForm">
    <label>Name</label>
    <input type="text" id="name" required>
    <button type="submit">Submit</button>
  </form>
  <script>
    document.getElementById("timetableForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
      });
  </script>
</body>
</html>`,
  },
  {
    id: "security",
    title: "Cybersecurity",
    subtitle: "Offensive Hardening & Infrastructure Sec",
    icon: Shield,
    tag: "SEC",
    lang: "python",
    topics: [
      "Web security and networking — OSI model & core fundamentals",
      "Cryptography — Secure communication, encryption and hashing",
      "Reverse Engineering — Binary exploitation & vulnerability discovery",
      "Forensics — Incident response lifecycle and file metadata",
    ],
    benefits:
      "Everything we do now is online, which means the digital world is basically the new frontline. Every second, millions of cyberattacks happen invisibly. In this module, you learn to think exactly like a hacker so you can stop them — building a digital superpower to protect people's privacy and defend the real world.",
    codeSnippet: `from Crypto.Cipher import AES

KEY = b"MyNewSecretKey!!"
FLAG = b"CryptoDemoBlock!"
cipher = AES.new(KEY, AES.MODE_ECB)

encrypted = cipher.encrypt(FLAG)
print("Ciphertext (hex):", encrypted.hex())

cipher_dec = AES.new(KEY, AES.MODE_ECB)
decrypted = cipher_dec.decrypt(encrypted)
print("Decrypted text:", decrypted.decode())`,
  },
  {
    id: "gamedev",
    title: "Game Development",
    subtitle: "Project-First Unity Engineering",
    icon: Gamepad2,
    tag: "GAME",
    lang: "csharp",
    topics: [
      "Unity Engine & C# Scripting — GameObjects, components, and writing real game logic",
      "Physics & Movement — Rigidbody, colliders, input systems and player feel",
      "Game Systems & UI — Score, health, menus, and the logic that holds a game together",
      "Build & Deploy — WebGL export, itch.io publishing and portfolio presentation",
    ],
    benefits:
      "Games are no longer just entertainment — they're the fastest growing creative and tech industry on the planet. Every mechanic you build teaches you real programming logic. Every system you design teaches you architecture. By the end of this track, you won't just play games — you'll understand exactly how they're made, and you'll have shipped ones yourself.",
    codeSnippet: `using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float speed = 5f;
    private Rigidbody2D rb;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    void Update()
    {
        float x = Input.GetAxis("Horizontal");
        float y = Input.GetAxis("Vertical");
        rb.velocity = new Vector2(x, y) * speed;
    }
}`,
  },
  {
    id: "python",
    title: "Python & Systems",
    subtitle: "High-Performance Concurrency & Microservices",
    icon: Code,
    tag: "PY",
    lang: "python",
    topics: [
      "Asyncio Concurrency & Multiprocessing Systems",
      "High-Performance API Architectures (FastAPI / gRPC)",
      "Algorithms, Advanced Data Structures & Memory Layouts",
      "Automated System Scripting & DevOps Pipelines",
    ],
    benefits:
      "Python is the backbone of modern machine learning, systems scripting, and data engineering. Mastering asyncio and systems-level Python allows you to write highly efficient code, processing millions of tasks concurrently — making you a force in backend, ML, and infrastructure roles.",
    codeSnippet: `import asyncio

async def worker(task_id: int):
    await asyncio.sleep(0.01)
    return f"Task {task_id} synchronized"

async def main():
    results = await asyncio.gather(
        *(worker(i) for i in range(1000))
    )
    print(f"Processed {len(results)} operations.")

asyncio.run(main())`,
  },

]

/* ── Typewriter hook ── */
function useTypewriter(text: string, speed = 8) {
  const [out, setOut] = useState("")
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) { setOut(text); return }
    setOut("")
    let i = 0
    const id = window.setInterval(() => {
      i += 2
      setOut(text.slice(0, i))
      if (i >= text.length) window.clearInterval(id)
    }, speed)
    return () => window.clearInterval(id)
  }, [text, speed, reduce])

  return out
}

/* ── Syntax highlighter ── */
function highlight(src: string, lang: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  let s = escape(src)
  s = s.replace(
    /(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;|"[^"]*"|'[^']*'|`[^`]*`)/g,
    '<span style="color:#fca5a5">$1</span>'
  )
  s = s.replace(/(#.*|\/\/.*)/g, '<span style="color:#7f1d1d;font-style:italic">$1</span>')
  let kws: RegExp
  if (lang === "python") {
    kws = /\b(import|from|def|async|await|return|class|for|in|if|else|elif|while|with|as|try|except|print|self|None|True|False|lambda)\b/g
  } else if (lang === "html") {
    kws = /\b(DOCTYPE|html|head|body|title|form|input|label|button|script|h2)\b/g
  } else if (lang === "csharp") {
    kws = /\b(using|public|class|void|float|private|new|Input|GetAxis|GetComponent|Rigidbody2D|Vector2)\b/g
  } else {
    kws = /\b(import|from|const|let|var|async|await|return|class|new|function|if|else|export|default|true|false|null|undefined)\b/g
  }
  s = s.replace(kws, '<span style="color:#f87171;font-weight:bold">$1</span>')
  s = s.replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#fb923c">$1</span>')
  s = s.replace(/([A-Za-z_][A-Za-z0-9_]*)(?=\()/g, '<span style="color:#fde68a">$1</span>')
  return s
}


/* ── Corner brackets ── */
function Brackets() {
  const cls = "absolute w-5 h-5 pointer-events-none"
  const s = "rgba(239,68,68,0.65)"
  return (
    <>
      <span className={`${cls} top-2 left-2`} style={{ borderTop: `1px solid ${s}`, borderLeft: `1px solid ${s}` }} />
      <span className={`${cls} top-2 right-2`} style={{ borderTop: `1px solid ${s}`, borderRight: `1px solid ${s}` }} />
      <span className={`${cls} bottom-2 left-2`} style={{ borderBottom: `1px solid ${s}`, borderLeft: `1px solid ${s}` }} />
      <span className={`${cls} bottom-2 right-2`} style={{ borderBottom: `1px solid ${s}`, borderRight: `1px solid ${s}` }} />
    </>
  )
}

/* ── Main ── */
export default function CurriculumSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = courses[activeIdx]
  const Icon = active.icon

  const typed = useTypewriter(active.codeSnippet, 6)
  const highlighted = useMemo(() => highlight(typed, active.lang), [typed, active.lang])
  const totalLines = active.codeSnippet.split("\n").length
  const typedLines = typed.split("\n").length


  return (
    <section
      id="curriculum"
      className="relative scroll-mt-20 z-10 py-8 sm:py-10 border-t border-white/10 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at top, #2d0000 0%, #140000 55%, #0a0000 100%)" }}
    >
      {/* Grid floor */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239,68,68,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.35) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)",
        }}
      />

      {/* Blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", top: "-120px", left: "8%", width: "560px", height: "560px", background: "radial-gradient(circle, rgba(220,38,38,0.22) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(20px)" }} />
        <div style={{ position: "absolute", bottom: "-160px", right: "4%", width: "480px", height: "480px", background: "radial-gradient(circle, rgba(185,28,28,0.18) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(24px)" }} />
      </div>

      {/* CRT lines */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 3px)" }} />

      {/* Progress dots */}
      <div className="absolute top-3 right-4 sm:right-10 lg:right-16 z-20 flex items-center gap-1.5 sm:gap-2">
        {courses.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className="transition-all duration-300 rounded-full cursor-pointer"
            style={{
              width: i === activeIdx ? "24px" : "6px",
              height: "6px",
              background: i === activeIdx ? "#ef4444" : "rgba(255,255,255,0.2)",
              boxShadow: i === activeIdx ? "0 0 10px rgba(239,68,68,0.6)" : "none",
            }}
          />
        ))}
        <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/35">
          {String(activeIdx + 1).padStart(2, "0")} / {String(courses.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase mb-2" style={{ color: "#f87171" }}>

          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-[0.06em] leading-[0.95]">
            Syllabus <span style={{ color: "#ef4444" }}>Modules</span>
          </h2>
          <p className="text-white/45 mt-3 max-w-xl text-sm font-light leading-relaxed">
            We don't teach syntax templates. We teach production-level systems design.{" "}
            <span style={{ color: "#fca5a5" }}>Click a module</span> to inspect it.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-12 gap-5">

          {/* Rail tabs */}
          <div className="col-span-12 lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
            {courses.map((course, i) => {
              const TabIcon = course.icon
              const isActive = i === activeIdx
              return (
                <motion.button
                  key={course.id}
                  onClick={() => setActiveIdx(i)}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  className="flex-shrink-0 lg:w-full relative flex items-center gap-3 px-4 py-3 rounded-xl text-left border overflow-hidden cursor-pointer transition-all duration-300"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(239,68,68,0.22) 0%, rgba(127,29,29,0.18) 100%)"
                      : "rgba(255,255,255,0.025)",
                    borderColor: isActive ? "rgba(239,68,68,0.55)" : "rgba(255,255,255,0.07)",
                    boxShadow: isActive
                      ? "0 0 24px rgba(239,68,68,0.18), inset 0 0 0 1px rgba(239,68,68,0.25)"
                      : "none",
                  }}
                >
                  {/* Sweep shine */}
                  {isActive && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-y-0 -left-1/2 w-1/2 pointer-events-none"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(248,113,113,0.18), transparent)" }}
                      initial={{ x: 0 }}
                      animate={{ x: "300%" }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                  {/* Active left bar */}
                  {isActive && (
                    <span
                      className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                      style={{ background: "linear-gradient(180deg, #ef4444, #991b1b)" }}
                    />
                  )}
                  <div
                    className="p-2 rounded flex-shrink-0 transition-colors"
                    style={{
                      background: isActive ? "rgba(239,68,68,0.22)" : "rgba(255,255,255,0.04)",
                      color: isActive ? "#f87171" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    <TabIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: isActive ? "#f87171" : "rgba(255,255,255,0.35)" }}>
                      {String(i + 1).padStart(2, "0")} · {course.tag}
                    </div>
                    <div className="text-sm font-bold truncate" style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.55)" }}>
                      {course.title}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 hidden lg:block flex-shrink-0 transition-transform"
                    style={{ color: isActive ? "#f87171" : "rgba(255,255,255,0.2)", transform: isActive ? "translateX(2px)" : "none" }} />
                </motion.button>
              )
            })}


          </div>

          {/* Content panel */}
          <div className="col-span-12 lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden border backdrop-blur-md"
                style={{
                  borderColor: "rgba(239,68,68,0.28)",
                  background: "linear-gradient(145deg, rgba(30,0,0,0.82) 0%, rgba(15,0,0,0.95) 100%)",
                  boxShadow: "0 20px 60px -20px rgba(239,68,68,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
                  minHeight: "auto",
                }}
              >
                <Brackets />

                {/* Panel header */}
                <div
                  className="px-6 py-4 border-b flex items-center gap-3"
                  style={{ borderColor: "rgba(239,68,68,0.18)", background: "rgba(239,68,68,0.05)" }}
                >
                  <motion.div
                    className="p-2.5 rounded"
                    style={{ background: "rgba(239,68,68,0.15)", color: "#f87171" }}
                    animate={{ boxShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 18px rgba(239,68,68,0.45)", "0 0 0px rgba(239,68,68,0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <div className="min-w-0">
                    <h3 className="text-white text-lg sm:text-xl uppercase tracking-[0.1em] font-bold truncate">{active.title}</h3>
                    <p className="text-[10px] font-mono tracking-[0.3em] uppercase truncate" style={{ color: "rgba(248,113,113,0.65)" }}>
                      {active.subtitle}
                    </p>
                  </div>
                  <div className="ml-auto hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/35">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "#ef4444" }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    live
                  </div>
                </div>

                {/* Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-white/5" style={{ minHeight: "auto" }}>

                  {/* Left */}
                  <div className="p-6 flex flex-col gap-6">
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] mb-4" style={{ color: "#f87171" }}>
                        ▌ Syllabus Competencies
                      </h4>
                      <ul className="space-y-3">
                        {active.topics.map((topic, i) => (
                          <motion.li
                            key={topic}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.07 * i + 0.1, duration: 0.3 }}
                            className="flex items-start gap-3 text-sm text-white/80"
                          >
                            <span
                              className="mt-[7px] flex-shrink-0 w-2 h-2 rotate-45"
                              style={{ background: "#ef4444", boxShadow: "0 0 8px rgba(239,68,68,0.7)" }}
                            />
                            <span className="leading-relaxed">{topic}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] mb-3" style={{ color: "#f87171" }}>
                        ▌ Benefits & Outcomes
                      </h4>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                        className="text-sm text-white/55 leading-relaxed"
                      >
                        {active.benefits}
                      </motion.p>
                    </div>
                  </div>

                  {/* Right: terminal */}
                  <div className="hidden sm:flex flex-col" style={{ background: "rgba(0,0,0,0.55)" }}>
                    {/* Console bar */}
                    <div
                      className="flex items-center justify-between px-4 py-2.5 border-b flex-shrink-0"
                      style={{ borderColor: "rgba(239,68,68,0.15)", background: "rgba(0,0,0,0.5)" }}
                    >
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5" style={{ color: "#f87171" }} />
                        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
                          ~/{active.id}/console.sh
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.6)" }} />
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.3)" }} />
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.15)" }} />
                      </div>
                    </div>

                    {/* Code */}
                    <div className="relative flex-1 overflow-auto">
                      <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none opacity-[0.04]"
                        style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 3px)" }}
                      />
                      <div className="flex text-[12px] leading-[1.65] font-mono p-4">
                        {/* Line numbers */}
                        <div
                          className="pr-3 mr-3 border-r select-none text-right flex-shrink-0"
                          style={{ borderColor: "rgba(239,68,68,0.15)", minWidth: "2rem" }}
                        >
                          {Array.from({ length: totalLines }).map((_, i) => (
                            <div
                              key={i}
                              style={{
                                opacity: i < typedLines ? 1 : 0.2,
                                color: i === typedLines - 1 ? "#f87171" : "rgba(239,68,68,0.35)",
                              }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </div>
                          ))}
                        </div>
                        {/* Code output */}
                        <pre className="flex-1 whitespace-pre-wrap break-words" style={{ color: "rgba(255,255,255,0.88)" }}>
                          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
                          <motion.span
                            aria-hidden
                            className="inline-block w-[7px] h-[14px] align-middle ml-[2px]"
                            style={{ background: "#ef4444", boxShadow: "0 0 8px rgba(239,68,68,0.8)" }}
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
                          />
                        </pre>
                      </div>
                    </div>

                    {/* Footer */}
                    <div
                      className="px-4 py-2 border-t flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase flex-shrink-0"
                      style={{ borderColor: "rgba(239,68,68,0.15)", background: "rgba(0,0,0,0.45)", color: "rgba(255,255,255,0.35)" }}
                    >
                      <span>{active.lang.toUpperCase()}</span>
                      <span style={{ color: "#f87171" }}>
                        ◉ rec · {String(typedLines).padStart(2, "0")}/{String(totalLines).padStart(2, "0")}
                      </span>
                    </div>
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
import React from "react"
import { motion } from "framer-motion"
import { Terminal, ShieldCheck, Zap, Cpu } from "lucide-react"

interface SkillMetric {
  name: string
  percentage: number
  description: string
}

export default function SkillMatrixSection() {
  const skills: SkillMetric[] = [
    {
      name: "Distributed Systems & Scalability",
      percentage: 95,
      description: "Capable of designing resilient systems, caching strategies, and message brokers handling 100k+ requests/sec."
    },
    {
      name: "AI Integration & Agentic Pipelines",
      percentage: 88,
      description: "Capable of deploying local LLMs, orchestrating multi-agent networks, and architecting semantic search infrastructures."
    },
    {
      name: "Zero-Trust AppSec & Hardening",
      percentage: 90,
      description: "Capable of securing REST/GraphQL endpoints, preventing OWASP threats, and enforcing end-to-end payload encryption."
    },
    {
      name: "High-Concurrency Backend Scripting",
      percentage: 92,
      description: "Capable of implementing asynchronous loops, multiprocessing pipelines, and hyper-fast microservices in Python."
    },
    {
      name: "Cross-Platform Application Architecture",
      percentage: 85,
      description: "Capable of shipping native Android/iOS and web applications with shared states and lightning-fast boot times."
    }
  ]

  return (
    <section id="skills" className="relative py-24 px-6 sm:px-10 lg:px-16 border-t border-white/10 z-10 bg-black/80 backdrop-blur-md overflow-hidden">
      {/* Background styling elements */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Technical Profile & Metrics */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <p className="text-xs text-primary font-mono tracking-widest uppercase mb-2">
                [ capability assessment matrix ]
              </p>
              <h2 className="text-3xl sm:text-4xl font-podium font-bold text-white uppercase tracking-wider">
                Graduate <span className="text-primary glow-text">Proficiency</span>
              </h2>
              <p className="text-white/60 text-sm font-light mt-3 max-w-xl leading-relaxed">
                Here is the verified technical grading of a Bridgecourse graduate. 
                Our grads transition from writing simple loops to building, securing, and deploying enterprise-scale tech platforms.
              </p>
            </div>

            {/* Metrics list */}
            <div className="flex flex-col gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-mono text-white/90">
                    <span>{skill.name}</span>
                    <span className="text-primary font-bold">{skill.percentage}%</span>
                  </div>
                  
                  {/* Progress Bar Container */}
                  <div className="h-2 w-full bg-secondary/80 border border-white/10 rounded-full overflow-hidden">
                    {/* Framer Motion scroll trigger progress fill */}
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1.6, ease: "easeOut", delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full bg-primary shadow-[0_0_8px_rgba(119,253,46,0.5)] rounded-full"
                    />
                  </div>
                  <p className="text-[11px] text-white/50 font-light leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Skill Outcome Console */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-secondary/40 border border-white/10 rounded-xl p-6 md:p-8 crt-screen">
              {/* Terminal Title */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
                <Terminal className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-mono font-semibold uppercase text-white tracking-widest">
                  grad_profile.sh
                </h3>
              </div>

              {/* Technical features list */}
              <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <div className="p-2 bg-primary/10 rounded border border-primary/20 text-primary self-start mt-0.5">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
                      Production Ready
                    </h4>
                    <p className="text-xs text-white/60 mt-1 font-light leading-relaxed">
                      Graduates enter teams ready to handle legacy refactors, custom cloud configurations, and threat defense with zero onboarding delay.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 bg-primary/10 rounded border border-primary/20 text-primary self-start mt-0.5">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
                      Architectural Command
                    </h4>
                    <p className="text-xs text-white/60 mt-1 font-light leading-relaxed">
                      Solve scalability limitations, handle socket memory leaks, configure multi-agent networks, and design relational schemas cleanly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 bg-primary/10 rounded border border-primary/20 text-primary self-start mt-0.5">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
                      Job Outcome Level
                    </h4>
                    <p className="text-xs text-white/60 mt-1 font-light leading-relaxed">
                      Direct qualification path for **Senior Web/App Devs**, **AI Solutions Architects**, **DevSecOps Specialists**, and **Backend Engineers**.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs inside container */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => alert("Skills challenge initialized... connecting to secure server.")}
                  className="pointer-events-auto flex-1 bg-primary text-primary-foreground py-3 text-center text-xs font-mono font-semibold uppercase tracking-wider rounded cursor-pointer hover:brightness-110 active:scale-[0.97] transition-all"
                >
                  [ Start Skill Test ]
                </button>
                <button
                  onClick={() => alert("Redirecting to admissions portal for Cohort 4.0...")}
                  className="pointer-events-auto flex-1 bg-transparent border border-white/20 hover:border-primary/50 text-white py-3 text-center text-xs font-mono font-semibold uppercase tracking-wider rounded cursor-pointer hover:bg-white/5 active:scale-[0.97] transition-all"
                >
                  Apply Cohort
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

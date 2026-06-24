import React from "react"
import { ArrowUpRight, Award, Crown } from "lucide-react"

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const stats = [
    { value: "500+", label: "Engineers Transformed" },
    { value: "95%", label: "Placement Rate" },
    { value: "10+", label: "Industry Partners" }
  ]

  return (
    <section className="relative h-screen w-full flex items-center justify-start z-10 pt-20">
      <div className="w-full max-w-4xl text-left flex flex-col">
        {/* Tagline */}
        <div className="animate-fade-up flex items-center gap-2 mb-4 sm:mb-6">
          <Crown className="w-4 h-4 text-white/70" />
          <span className="text-[10px] sm:text-xs font-semibold text-white/70 tracking-[0.3em] uppercase">
            World-Class Engineering Collective
          </span>
        </div>

        {/* Main Title Headers (Podium Font) */}
        <h1 className="animate-fade-up-delay-1 flex flex-col font-podium text-white uppercase leading-[0.9] tracking-tight text-[clamp(2.5rem,8vw,7rem)]">
          <span>BUILD.</span>
          <span>SECURE.</span>
          <span>SCALE.</span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-up-delay-2 text-white/70 text-sm sm:text-base font-light leading-relaxed max-w-md mt-6">
          We build fierce engineering minds that don't just learn syntax —{" "}
          <span className="text-white font-bold">they lead.</span>
        </p>

        {/* Action Row */}
        <div className="animate-fade-up-delay-3 flex flex-wrap items-center gap-4 sm:gap-6 mt-8">
          <button
            onClick={() => scrollToSection("curriculum")}
            className="pointer-events-auto group flex items-center gap-2 bg-white text-black hover:bg-neutral-200 px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-200 rounded-sm cursor-pointer border-none"
          >
            <span>Explore Syllabus</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <div className="hidden sm:flex items-center gap-3">
            <div className="p-1 border border-white/20 rounded-full text-white/60">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-left font-mono">
              <div className="text-[10px] text-white/70 font-semibold tracking-wider">TOP-RATED</div>
              <div className="text-[9px] text-white/55 tracking-widest uppercase">SYSTEMS PROGRAM</div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="animate-fade-up-delay-4 flex flex-wrap gap-8 sm:gap-12 lg:gap-16 mt-8 sm:mt-10 lg:mt-14 border-t border-white/10 pt-6 sm:pt-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                {stat.value}
              </span>
              <span className="text-white/50 text-[9px] sm:text-xs tracking-widest uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Prompt */}
      <button 
        onClick={() => scrollToSection("curriculum")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex flex-col items-center gap-1 opacity-0 animate-fade-in group hover:opacity-100 transition-opacity cursor-pointer border-none bg-transparent"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="text-[9px] text-white/50 font-mono tracking-widest uppercase group-hover:text-primary transition-colors">
          Scroll to explore modules
        </span>
        <div className="h-6 w-3.5 border border-white/20 rounded-full flex justify-center p-1 group-hover:border-primary transition-colors">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
        </div>
      </button>
    </section>
  )
}

import React, { useState } from "react"
import { ArrowUpRight, X } from "lucide-react"
import HeroSection from "./components/HeroSection"
import CurriculumSection from "./components/CurriculumSection"
import SkillMatrixSection from "./components/SkillMatrixSection"

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { name: "Syllabus", href: "#curriculum" },

    { name: "Outcomes", href: "#skills" },
    { name: "Inquire", href: "#skills" }
  ]

  const handleNavLinkClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-black text-foreground font-inter overflow-y-auto overflow-x-hidden">
      {/* 1. Fullscreen FIXED Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
          type="video/mp4"
        />
      </video>

      {/* 2. Visual Overlay for text legibility (fixed to cover fixed video) */}
      <div className="fixed inset-0 bg-black/15 z-[1] pointer-events-none" />

      {/* 3. Header Navbar (Fixed at top) */}
      <nav className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center px-6 sm:px-10 lg:px-16 py-5 lg:py-7 bg-black/10  border-b border-white/[0.03]">
        {/* Left Logo */}
        <a href="#" className="font-podium text-2xl sm:text-3xl font-bold tracking-wider text-white uppercase select-none">
          BRIDGECOURSE 3.0
        </a>

        {/* Center Navigation Links (Visible md+) */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => handleNavLinkClick(link.href)}
              className="text-xs sm:text-sm font-medium tracking-widest text-white/80 hover:text-white uppercase transition-colors bg-transparent border-none cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Right CTA / Inquire Button (Visible md+) */}
        <button
          onClick={() => handleNavLinkClick("#skills")}
          className="hidden md:flex items-center gap-1.5 border border-white/30 hover:border-white/60 px-6 py-3 text-xs tracking-widest uppercase text-white hover:bg-white/10 transition-all font-semibold cursor-pointer"
        >
          <span>Register Now</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        {/* Hamburger Mobile Menu Toggle Button (Visible below md) */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex flex-col items-end space-y-1.5 bg-transparent border-none p-1 cursor-pointer"
        >
          <div className="w-6 h-0.5 bg-white transition-all" />
          <div className="w-6 h-0.5 bg-white transition-all" />
          <div className="w-4 h-0.5 bg-white transition-all" />
        </button>
      </nav>

      {/* 4. Mobile Menu Overlay (Below md) */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col justify-between p-6 sm:p-10 transition-all duration-500 md:invisible md:opacity-0 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        {/* Mobile Header Row */}
        <div className="flex justify-between items-center w-full">
          <span className="font-podium text-2xl tracking-wider text-white uppercase">
            BRIDGECOURSE
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 border border-white/20 rounded-full hover:bg-white/10 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Centered Links (Staggered Entrance Animation) */}
        <div className="flex flex-col gap-6 my-auto text-left">
          {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => handleNavLinkClick(link.href)}
              style={{
                transitionDelay: `${i * 80 + 100}ms`,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0
              }}
              className="text-4xl sm:text-5xl font-podium font-bold text-white uppercase hover:text-primary transition-all text-left bg-transparent border-none cursor-pointer"
            >
              {link.name}
            </button>
          ))}

          {/* Staggered mobile GET IN TOUCH */}
          <button
            onClick={() => handleNavLinkClick("#skills")}
            style={{
              transitionDelay: `${navLinks.length * 80 + 100}ms`,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: menuOpen ? 1 : 0
            }}
            className="mt-6 self-start flex items-center gap-1.5 border border-white/30 hover:border-white/60 px-6 py-3.5 text-xs tracking-widest uppercase text-white hover:bg-white/10 transition-all font-semibold cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5. Main Scrolling Content Sections (Overlapping fixed video) */}
      <div className="relative z-10 w-full flex flex-col px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28">
        <HeroSection />
        <CurriculumSection />
        <SkillMatrixSection />
      </div>
    </div>
  )
}

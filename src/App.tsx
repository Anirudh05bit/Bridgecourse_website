import { useEffect, useState } from "react"
import { ArrowUpRight, X } from "lucide-react"
import HeroSection from "./components/HeroSection"
import CurriculumSection from "./components/CurriculumSection"
import SkillMatrixSection from "./components/SkillMatrixSection"
import InquireSection from "./components/InquireSection"
import RegisterPage from "./pages/RegisterPage"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"

const ADMIN_PATH = "/bc3-control-x92j" // change this to your own secret string

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'register' | 'admin'>(() => {
    if (window.location.pathname === ADMIN_PATH) return 'admin'
    return 'home'
  })

  useEffect(() => {
    const targetPath = currentView === 'admin' ? ADMIN_PATH : '/'
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath)
    }
  }, [currentView])

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === ADMIN_PATH) setCurrentView('admin')
      else setCurrentView('home')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navLinks = [
    { name: "Syllabus", href: "#curriculum" },
    { name: "Outcomes", href: "#skills" },
    { name: "Inquire", href: "#inquire" }
  ]

  const handleNavLinkClick = (href: string) => {
    setMenuOpen(false)
    if (currentView !== 'home') {
      setCurrentView('home')
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-black text-foreground font-inter overflow-y-auto overflow-x-hidden">

      {/* ── VIDEO: fixed on desktop, absolute inside hero wrapper on mobile ── */}
      {/* Desktop (md+): fixed fullscreen as before */}
      <video
        autoPlay muted loop playsInline
        className="hidden md:block fixed inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
          type="video/mp4"
        />
      </video>
      {/* Desktop overlay */}
      <div className="hidden md:block fixed inset-0 bg-black/15 z-[1] pointer-events-none" />

      {/* ── Navbar ── */}
      <nav className="relative z-30 flex justify-between items-center px-4 sm:px-10 lg:px-16 py-4 lg:py-7 bg md:bg-black/10 border-b border-white/[0.03]">
        <button
          onClick={() => { setCurrentView("home"); window.scrollTo({ top: 0, behavior: "smooth" }) }}
          className="font-podium text-xl sm:text-3xl font-bold tracking-wider text-white uppercase select-none bg-transparent border-none cursor-pointer text-left outline-none"
        >
          BRIDGECOURSE 3.0
        </button>

        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link, idx) => (
            <button key={idx} onClick={() => handleNavLinkClick(link.href)}
              className="text-xs sm:text-sm font-medium tracking-widest text-white/80 hover:text-white uppercase transition-colors bg-transparent border-none cursor-pointer">
              {link.name}
            </button>
          ))}
        </div>

        <button onClick={() => setCurrentView('register')}
          className="hidden md:flex items-center gap-1.5 border border-white/30 hover:border-white/60 px-6 py-3 text-xs tracking-widest uppercase text-white hover:bg-white/10 transition-all font-semibold cursor-pointer outline-none">
          <span>Register Now</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <button onClick={() => setMenuOpen(true)}
          className="md:hidden flex flex-col items-end space-y-1.5 bg-transparent border-none p-1 cursor-pointer">
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-4 h-0.5 bg-white" />
        </button>
      </nav>

      {/* ── Mobile Menu ── */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col justify-between p-6 sm:p-10 transition-all duration-500 md:invisible md:opacity-0 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className="flex justify-between items-center w-full">
          <span className="font-podium text-2xl tracking-wider text-white uppercase">BRIDGECOURSE</span>
          <button onClick={() => setMenuOpen(false)} className="p-2 border border-white/20 rounded-full hover:bg-white/10 text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-6 my-auto text-left">
          {navLinks.map((link, i) => (
            <button key={i} onClick={() => handleNavLinkClick(link.href)}
              style={{ transitionDelay: `${i * 80 + 100}ms`, transform: menuOpen ? "translateY(0)" : "translateY(20px)", opacity: menuOpen ? 1 : 0 }}
              className="text-4xl sm:text-5xl font-podium font-bold text-white uppercase hover:text-primary transition-all text-left bg-transparent border-none cursor-pointer">
              {link.name}
            </button>
          ))}
          <button
            onClick={() => { setMenuOpen(false); setCurrentView('register') }}
            style={{ transitionDelay: `${navLinks.length * 80 + 100}ms`, transform: menuOpen ? "translateY(0)" : "translateY(20px)", opacity: menuOpen ? 1 : 0 }}
            className="mt-6 self-start flex items-center gap-1.5 border border-white/30 hover:border-white/60 px-6 py-3.5 text-xs tracking-widest uppercase text-white hover:bg-white/10 transition-all font-semibold cursor-pointer">
            <span>Register Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full flex flex-col px-4 sm:px-8 lg:px-16">
        {currentView === 'admin' ? (
          <ProtectedRoute onDeny={() => setCurrentView('home')}>
            <AdminDashboard onClose={() => setCurrentView('home')} />
          </ProtectedRoute>
        ) : currentView === 'register' ? (
          <RegisterPage onClose={() => setCurrentView('home')} />
        ) : (
          <>
            {/* ── MOBILE HERO: video fixed fullscreen like desktop ── */}
            <div className="relative">
              {/* Mobile video — fixed fullscreen, same as desktop */}
              <video
                autoPlay muted loop playsInline
                className="md:hidden fixed inset-0 w-full h-full object-cover object-[70%_center] z-0"
              >
                <source
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
                  type="video/mp4"
                />
              </video>
              {/* Mobile gradient — fades to black after hero */}
              <div className="md:hidden fixed inset-0 z-[1] pointer-events-none"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.95) 100%)" }} />
              <div className="relative z-[2]">
                <HeroSection />
              </div>
            </div>

            <CurriculumSection />
            <SkillMatrixSection onRegister={() => setCurrentView('register')} />
            <InquireSection />
          </>
        )}
      </div>
    </div>
  )
}
"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { ArrowUpRight, Menu, X, ExternalLink, ChevronRight } from "lucide-react"

const IMPORTANT_LINKS = [
  { label: "Disclaimer",              href: "https://docs.google.com/document/d/19sKrTWmFzpcBQJj-92LWlsD-zisMyw76/edit?usp=sharing&ouid=107049434454860825227&rtpof=true&sd=true" },
  { label: "Escalation Matrix",       href: "https://docs.google.com/document/d/1tyfc6cUXMy5Pq2z8OLFrt1Fs7plY811H/edit?usp=drive_link&ouid=107049434454860825227&rtpof=true&sd=true" },
  { label: "Code of Conduct",         href: "https://docs.google.com/document/d/1VFhEDLWHSG861yEEJrb-bygKYRbwDOpT/edit?usp=drive_link&ouid=107049434454860825227&rtpof=true&sd=true" },
  { label: "Audit Status",            href: "https://docs.google.com/document/d/1tfSGhLIU6HHbxol-xMe0x-SsKnnIjCkq/edit?usp=drive_link&ouid=107049434454860825227&rtpof=true&sd=true" },
  { label: "Disclosures",             href: "https://docs.google.com/document/d/1wGfrzDYvslGfcbUDrv46HH9QcYJUtgOt/edit?usp=drive_link&ouid=107049434454860825227&rtpof=true&sd=true" },
  { label: "Grievance Redressal",     href: "https://docs.google.com/document/d/1STDLAxGogOwOuJw84VZrOp5NQK4wwYZB/edit?usp=drive_link&ouid=107049434454860825227&rtpof=true&sd=true" },
  { label: "Annexure B – Complaints", href: "https://docs.google.com/spreadsheets/d/14Y2yEH0b2TKxCj0JiGmHJajGv-p-TmfP/edit?usp=drive_link&ouid=107049434454860825227&rtpof=true&sd=true" },
  { label: "Investor Charter",        href: "https://docs.google.com/document/d/1oUlvGD9IzJgN0jgXxF2kW6zs35z6dH57/edit?usp=drive_link&ouid=107049434454860825227&rtpof=true&sd=true" },
  { label: "PMLA Policy",             href: "https://docs.google.com/document/d/11W8T9xM-7MK98CgHyF8-3GjSZ7Sd5iaa/edit?usp=drive_link&ouid=107049434454860825227&rtpof=true&sd=true" },
]

const QUICK_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Services",   href: "/#services" },
  { label: "Pricing",    href: "/pricing" },
  { label: "Compliance", href: "/#compliance" },
  { label: "Contact",    href: "/contact" },
]

const NAV_LINKS = [
  { label: "Home",       href: "/",           section: null },
  { label: "Services",   href: "/#services",  section: "services" },
  { label: "Pricing",    href: "/pricing",    section: null },
  { label: "Compliance", href: "/#compliance", section: "compliance" },
  { label: "Contact",    href: "/contact",    section: null },
]

function NavLink({ label, href, section, active }: { label: string; href: string; section: string | null; active: boolean }) {
  const [hovered, setHovered] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const lit = active || hovered

  function handleClick(e: React.MouseEvent) {
    if (!section) return
    if (pathname === "/") {
      e.preventDefault()
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
    }
    // If on another page, let the href navigate naturally — the id scroll will happen on load
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: "none", position: "relative", display: "inline-block", padding: "2px 0" }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          bottom: "1px",
          height: "10px",
          width: lit ? "100%" : "0%",
          background: "#C5D82D",
          borderRadius: "2px",
          transition: "width 260ms cubic-bezier(0.4,0,0.2,1)",
          zIndex: 0,
        }}
      />
      <span
        style={{
          position: "relative",
          zIndex: 1,
          color: lit ? "#1B4332" : "#374151",
          fontWeight: lit ? 700 : 500,
          fontSize: "18px",
          transition: "color 200ms ease",
        }}
      >
        {label}
      </span>
    </Link>
  )
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleMobileSection(section: string | null) {
    setIsMenuOpen(false)
    if (section && pathname === "/") {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
      }, 50)
    }
  }

  return (
    <nav
      className="bg-white border-b border-gray-100 sticky top-0 z-40"
      style={{ boxShadow: "0 1px 12px rgba(27,67,50,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 group">
          <style>{`
            @keyframes logoShimmer {
              0%   { filter: drop-shadow(0 0 0px rgba(197,216,45,0)); }
              50%  { filter: drop-shadow(0 0 8px rgba(197,216,45,0.55)); }
              100% { filter: drop-shadow(0 0 0px rgba(197,216,45,0)); }
            }
            @keyframes logoBreathe {
              0%, 100% { transform: scale(1); }
              50%       { transform: scale(1.035); }
            }
            .logo-img {
              animation: logoBreathe 4s ease-in-out infinite;
              transition: filter 300ms ease;
            }
            .logo-img:hover {
              animation: logoShimmer 1.2s ease-in-out infinite, logoBreathe 4s ease-in-out infinite;
            }
          `}</style>
          <Image
            src="/images/money-ventures-logo-new.png"
            alt="Money Ventures Research"
            width={130}
            height={50}
            className="object-contain logo-img"
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              label={link.label}
              href={link.href}
              section={link.section}
              active={
                link.section
                  ? false
                  : link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href)
              }
            />
          ))}
        </div>

        {/* Right — SEBI logo + E-KYC + CTA + menu */}
        <div className="hidden lg:flex items-center gap-3">

          {/* SEBI badge */}
          <div className="flex items-center gap-2 border border-[#1B4332]/20 rounded-xl px-3 py-1.5 bg-[#F3F8F0]">
            <div className="flex flex-col leading-tight items-center">
              <span
                className="font-black tracking-widest"
                style={{
                  fontSize: "15px",
                  color: "#1B4332",
                  fontFamily: "Georgia, serif",
                  letterSpacing: "0.18em",
                  lineHeight: 1.1,
                }}
              >
                SEBI
              </span>
              <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">Registered</span>
            </div>
            <div className="w-px h-7 bg-[#1B4332]/15" />
            <span className="text-[11px] text-[#1B4332] font-bold tracking-wide">INH000026114</span>
          </div>

          {/* E-KYC button */}
          <a
            href="https://kyc.moneyventureresearch.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 border-2 border-[#1B4332] text-[#1B4332] font-bold text-sm px-4 py-2 rounded-full hover:bg-[#1B4332] hover:text-white transition-all duration-200"
          >
            E-KYC
          </a>

          <Link
            href="/contact"
            className="group relative flex items-center gap-2 font-semibold py-2.5 rounded-full transition-all duration-300 overflow-hidden bg-[#C5D82D] hover:bg-[#1B4332] px-5"
          >
            <span className="text-[#1B4332] group-hover:text-white transition-colors duration-300 text-sm whitespace-nowrap">
              Get In Touch
            </span>
            <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#1B4332]" />
            </span>
          </Link>

          {/* Hamburger + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              aria-label="Open menu"
              aria-expanded={isDropdownOpen}
              className="w-11 h-11 bg-[#1B4332] rounded-full flex items-center justify-center hover:bg-[#163828] transition-colors duration-200"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {isDropdownOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>

            {/* Dropdown panel */}
            <div
              className="absolute right-0 top-[calc(100%+12px)] z-50 transition-all duration-300 origin-top-right"
              style={{
                opacity: isDropdownOpen ? 1 : 0,
                transform: isDropdownOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(-8px)",
                pointerEvents: isDropdownOpen ? "auto" : "none",
                width: "520px",
              }}
            >
              {/* Arrow tip */}
              <div className="absolute right-4 -top-2 w-4 h-4 rotate-45 rounded-sm"
                style={{ background: "linear-gradient(135deg, #1B4332 0%, #2d6a4f 100%)" }} />

              <div
                className="rounded-2xl overflow-hidden shadow-2xl border border-[#2d6a4f]/40"
                style={{ background: "linear-gradient(135deg, #1B4332 0%, #2d6a4f 50%, #1a3a2a 100%)" }}
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-sm">Important Links</p>
                    <p className="text-white/50 text-xs mt-0.5">SEBI Compliance Documents</p>
                  </div>
                  <span className="bg-[#C5D82D] text-[#1B4332] text-xs font-bold px-2.5 py-1 rounded-full">
                    INH000026114
                  </span>
                </div>

                {/* Links grid */}
                <div className="p-5 grid grid-cols-2 gap-1.5">
                  {IMPORTANT_LINKS.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsDropdownOpen(false)}
                      className="group flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl hover:bg-white/10 transition-colors duration-150"
                    >
                      <span className="text-white/80 group-hover:text-white text-sm transition-colors leading-snug">
                        {label}
                      </span>
                      <ExternalLink className="w-3 h-3 text-[#C5D82D] opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity" />
                    </a>
                  ))}
                </div>

                {/* Divider + Quick Nav */}
                <div className="px-5 pb-5">
                  <div className="border-t border-white/10 mb-4" />
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3 px-1">Quick Navigation</p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_LINKS.map(({ label, href }) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-1 bg-white/10 hover:bg-[#C5D82D] text-white hover:text-[#1B4332] text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200"
                      >
                        {label}
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          className="lg:hidden w-10 h-10 bg-[#1B4332] rounded-full flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        style={{
          maxHeight: isMenuOpen ? "400px" : "0px",
          overflow: "hidden",
          transition: "max-height 350ms cubic-bezier(0.4,0,0.2,1)",
        }}
        className="lg:hidden bg-white border-t border-gray-100"
      >
        <div className="flex flex-col px-6 py-5 gap-4">
          {NAV_LINKS.map((link) => {
            const active = link.section
              ? false
              : link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleMobileSection(link.section)}
                className="flex items-center justify-between py-2 border-b border-gray-50"
              >
                <span style={{ color: active ? "#1B4332" : "#6b7280", fontWeight: active ? 700 : 500, fontSize: "15px" }}>
                  {link.label}
                </span>
                {active && (
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C5D82D", display: "inline-block" }} />
                )}
              </Link>
            )
          })}

          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-[#C5D82D] text-[#1B4332] font-bold py-3 rounded-full text-sm"
          >
            Get In Touch
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

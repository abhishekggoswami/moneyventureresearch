"use client"

import { ArrowUpRight, ShieldCheck, TrendingUp, BarChart3 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FeaturesSection } from "./features-section"

export function HeroSection() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          MOBILE HERO  — portrait-first, classy dark layout
          Hidden on lg+ screens
      ═══════════════════════════════════════════════════════ */}
      <section className="block lg:hidden relative bg-[#0d1f14]">
        <style>{`
          @keyframes mFadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes mCycle {
            0%,30%  { opacity:1; transform:translateY(0); }
            35%     { opacity:0; transform:translateY(-14px); }
            38%     { opacity:0; transform:translateY(14px); }
            65%,95% { opacity:1; transform:translateY(0); }
            100%    { opacity:0; transform:translateY(-14px); }
          }
          @keyframes mShimmer {
            0%   { background-position: -200% center; }
            100% { background-position:  200% center; }
          }
          .mw1 { opacity:0; animation: mFadeUp .6s cubic-bezier(.22,1,.36,1) .05s forwards; }
          .mw2 { opacity:0; animation: mFadeUp .6s cubic-bezier(.22,1,.36,1) .18s forwards; }
          .mw3 { opacity:0; animation: mFadeUp .6s cubic-bezier(.22,1,.36,1) .32s forwards; }
          .mw4 { opacity:0; animation: mFadeUp .6s cubic-bezier(.22,1,.36,1) .48s forwards; }
          .mw5 { opacity:0; animation: mFadeUp .6s cubic-bezier(.22,1,.36,1) .65s forwards; }
          .mw6 { opacity:0; animation: mFadeUp .6s cubic-bezier(.22,1,.36,1) .80s forwards; }
          .m-cycle { display:inline-block; animation: mCycle 3s ease-in-out infinite; }
          .m-shimmer {
            background: linear-gradient(90deg, rgba(197,216,45,.12) 0%, rgba(197,216,45,.3) 50%, rgba(197,216,45,.12) 100%);
            background-size: 200% auto;
            animation: mShimmer 2.8s linear infinite;
          }
        `}</style>

        {/* ── Full bleed background photo ── */}
        <div className="relative overflow-hidden" style={{ minHeight: "100svh" }}>

          {/* Background image — new office/professional photo */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-mobile.jpg"
              alt="Professional finance office"
              fill
              className="object-cover object-[center_top]"
              priority
            />
          </div>

          {/* Multi-layer overlay: strong bottom veil for text, subtle top veil for atmosphere */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(10,28,18,0.45) 0%,
                rgba(10,28,18,0.10) 30%,
                rgba(10,28,18,0.08) 50%,
                rgba(10,28,18,0.70) 70%,
                rgba(8,22,14,0.96) 88%,
                rgba(8,22,14,1.00) 100%
              )`
            }}
          />

          {/* Content — split into top badge area + bottom text/CTA area */}
          <div className="relative z-10 flex flex-col justify-between h-full px-5 pt-10 pb-10" style={{ minHeight: "100svh" }}>

            {/* TOP — SEBI badge */}
            <div className="mw1 self-start inline-flex items-center gap-1.5 m-shimmer border border-[#C5D82D]/30 rounded-full px-3 py-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5D82D] animate-pulse flex-shrink-0" />
              <span className="text-[#C5D82D] text-[9px] font-bold tracking-[0.08em] uppercase whitespace-nowrap">SEBI Registered Research Analyst</span>
            </div>

            {/* BOTTOM — headline, sub, CTA, stats */}
            <div>
              {/* Eyebrow */}
              <p className="mw2 text-white/45 text-[10px] font-semibold tracking-[0.2em] uppercase mb-3">Money Ventures Research</p>

              {/* Main headline — large, bold, staggered word animation */}
              <h1 className="font-black text-white leading-[1.02] tracking-tight mb-4" style={{ fontSize: "clamp(38px,11vw,56px)" }}>
                <span className="mw3 block">Trade</span>
                <span className="mw4 block">Smarter,</span>
                <span className="mw5 block" style={{ color: "#C5D82D" }}>
                  <span className="m-cycle">Earn More.</span>
                </span>
              </h1>

              {/* Sub-line */}
              <p className="mw6 text-white/60 text-sm leading-relaxed mb-8 max-w-[80%]">
                SEBI-registered research calls across Intraday, Options &amp; Commodities — delivered daily to serious traders.
              </p>

              {/* CTA button */}
              <div className="mw6 mb-8">
                <Link href="/pricing" className="inline-flex items-center gap-3 bg-[#C5D82D] text-[#0d1f14] font-bold text-sm px-7 py-4 rounded-2xl shadow-2xl active:scale-95 transition-transform">
                  <span>View Pricing Plans</span>
                  <span className="w-6 h-6 rounded-xl bg-[#0d1f14]/20 flex items-center justify-center flex-shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>

              {/* Trust stat row */}
              <div className="mw6 flex items-center gap-0 rounded-2xl overflow-hidden border border-white/10" style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
                {[
                  { icon: <ShieldCheck className="w-4 h-4" />, value: "SEBI", sub: "Regulated" },
                  { icon: <TrendingUp className="w-4 h-4" />, value: "10+", sub: "Yrs Exp." },
                  { icon: <BarChart3 className="w-4 h-4" />, value: "3", sub: "Programs" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-1 py-3.5 border-r border-white/10 last:border-r-0"
                  >
                    <span className="text-[#C5D82D]">{s.icon}</span>
                    <span className="text-white font-bold text-sm leading-none">{s.value}</span>
                    <span className="text-white/40 text-[9px] font-medium text-center">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── What we offer — tags on dark panel below hero ── */}
        <div className="bg-[#080f0a] px-5 pt-6 pb-8 border-t border-white/5">
          <p className="text-white/25 text-[9px] font-bold tracking-[0.2em] uppercase mb-4">What We Offer</p>
          <div className="flex flex-wrap gap-2">
            {["Intraday Research", "Options Strategy", "Commodity Calls", "Live Alerts", "SEBI Compliant", "Verified Track Record"].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 border border-white/10 rounded-full px-3.5 py-2 text-white/55 text-[11px] font-medium"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <span className="w-1 h-1 rounded-full bg-[#C5D82D] flex-shrink-0" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DESKTOP / TABLET HERO  — unchanged, hidden below lg
      ═══════════════════════════════════════════════════════ */}
      <section className="hidden lg:block relative min-h-[850px] overflow-visible">
        <style>{`
          @keyframes fadeUp {
            0%   { opacity: 0; transform: translateY(28px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .hero-word { display: inline-block; opacity: 0; animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
          @keyframes cycleWord {
            0%,28%  { opacity: 1; transform: translateY(0); }
            33%     { opacity: 0; transform: translateY(-20px); }
            36%     { opacity: 0; transform: translateY(20px); }
            64%,95% { opacity: 1; transform: translateY(0); }
            100%    { opacity: 0; transform: translateY(-20px); }
          }
          .cycle-word { display: inline-block; animation: cycleWord 3s ease-in-out infinite; color: #C5D82D; }
          .hero-sub { opacity: 0; animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 1s forwards; }
          .hero-btn { opacity: 0; animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 1.3s forwards; }
        `}</style>

        <div className="absolute inset-0">
          <Image
            src="/images/hero-finance2.jpg"
            alt="Finance professionals reviewing investment documents"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div
          className="absolute left-0 top-0 w-[60%] h-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 120% 100% at -10% 50%,
              rgba(20,60,38,0.97) 0%, rgba(27,67,50,0.92) 22%,
              rgba(30,72,54,0.78) 42%, rgba(35,80,58,0.48) 62%,
              rgba(40,85,62,0.18) 78%, transparent 92%)`,
          }}
        />
        <div
          className="absolute left-[32%] top-0 w-[28%] h-full pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(27,67,50,0.28) 0%, transparent 100%)", filter: "blur(36px)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-48">
          <div className="max-w-xl">
            <div className="hero-word mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5" style={{ animationDelay: "0.1s" }}>
              <span className="w-2 h-2 rounded-full bg-[#C5D82D] animate-pulse" />
              <span className="text-white/90 text-xs font-semibold tracking-wider uppercase">SEBI Registered Research Analyst</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-4">
              <span className="hero-word block" style={{ animationDelay: "0.25s" }}>Trade Smarter,</span>
              <span className="hero-word block" style={{ animationDelay: "0.45s" }}><span className="cycle-word">Earn More.</span></span>
            </h1>
            <p className="hero-sub text-white/75 text-lg leading-relaxed mb-10 max-w-sm">
              SEBI-registered research calls across Intraday, Options &amp; Commodities — delivered daily to serious traders.
            </p>
            <div className="hero-btn flex items-center gap-4">
              <Link href="/pricing" className="group flex items-center gap-3 bg-[#C5D82D] hover:bg-white text-[#1B4332] font-bold text-sm px-7 py-4 rounded-full shadow-lg transition-all duration-250">
                <span>View Pricing Plans</span>
                <span className="w-7 h-7 rounded-full bg-[#1B4332] group-hover:bg-[#C5D82D] flex items-center justify-center transition-colors duration-250 flex-shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:text-[#1B4332] transition-colors duration-250" />
                </span>
              </Link>
              <Link href="/contact" className="hero-word text-white/70 hover:text-white text-sm font-semibold underline underline-offset-4 transition-colors" style={{ animationDelay: "1.5s" }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20">
          <FeaturesSection />
        </div>
      </section>
    </>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

// ─── Scroll-triggered reveal hook ────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}
import {
  Check,
  Zap,
  TrendingUp,
  BarChart3,
  Crown,
  Sparkles,
  ArrowUpRight,
  Shield,
  Star,
} from "lucide-react"


// ─── Shared Types & Data ──────────────────────────────────────────────────────

type Period = "monthly" | "quarterly" | "yearly"
type BundlePeriod = "quarterly" | "halfyearly"

interface PricingTier {
  name: string
  tagline: string
  monthly: number
  quarterly: number
  yearly: number
  features: string[]
  highlighted: boolean
  badge?: string
}

interface ServiceData {
  id: string
  label: string
  shortLabel: string
  icon: React.ReactNode
  tagline: string
  tiers: PricingTier[]
}

const services: ServiceData[] = [
  {
    id: "intraday",
    label: "Intraday Momentum Program",
    shortLabel: "Intraday",
    icon: <Zap className="w-5 h-5" />,
    tagline: "Speed. Structure. Discipline.",
    tiers: [
      {
        name: "Momentum Scout",
        tagline: "Test the waters",
        monthly: 12000,
        quarterly: 30000,
        yearly: 45000,
        features: [
          "Up to 3 trade ideas / week",
          "Entry, SL & Target levels",
          "Telegram delivery",
          "Basic market commentary",
          "Email support",
        ],
        highlighted: false,
      },
      {
        name: "Alpha Operator",
        tagline: "Most popular",
        monthly: 20000,
        quarterly: 50000,
        yearly: 75000,
        features: [
          "Up to 6 trade ideas / week",
          "Entry, SL & Target levels",
          "Priority Telegram + WhatsApp",
          "Daily market brief",
          "Live session monitoring",
          "Dedicated support",
        ],
        highlighted: true,
        badge: "Popular",
      },
      {
        name: "Velocity Prime",
        tagline: "Full access",
        monthly: 28000,
        quarterly: 70000,
        yearly: 105000,
        features: [
          "Unlimited trade ideas",
          "Entry, SL & Target levels",
          "All channels including calls",
          "Pre-market + post-market analysis",
          "1-on-1 monthly review session",
          "Priority 24/7 support",
        ],
        highlighted: false,
      },
    ],
  },
  {
    id: "options",
    label: "Options Strategy Pro",
    shortLabel: "Options",
    icon: <TrendingUp className="w-5 h-5" />,
    tagline: "Index & Stock Options. Structured. Systematic.",
    tiers: [
      {
        name: "Derivatives Cadet",
        tagline: "Systematic entry",
        monthly: 18000,
        quarterly: 36000,
        yearly: 54000,
        features: [
          "5–8 options setups / month",
          "Strike selection guidance",
          "Index options focus",
          "Telegram delivery",
          "Email support",
        ],
        highlighted: false,
      },
      {
        name: "Strangle Commander",
        tagline: "Most popular",
        monthly: 30000,
        quarterly: 60000,
        yearly: 90000,
        features: [
          "12–18 options setups / month",
          "Index + stock options",
          "Greeks-aware trade rationale",
          "Priority Telegram + WhatsApp",
          "Live adjustment alerts",
          "Dedicated support",
        ],
        highlighted: true,
        badge: "Popular",
      },
      {
        name: "Expiry Architect",
        tagline: "Full derivatives access",
        monthly: 42000,
        quarterly: 84000,
        yearly: 126000,
        features: [
          "Unlimited setups across segments",
          "Weekly expiry + monthly strategies",
          "Hedging & positional combos",
          "Direct analyst access via calls",
          "Monthly P&L review session",
          "Priority 24/7 support",
        ],
        highlighted: false,
      },
    ],
  },
  {
    id: "commodity",
    label: "Commodity Momentum Program",
    shortLabel: "Commodity",
    icon: <BarChart3 className="w-5 h-5" />,
    tagline: "Gold. Silver. Crude. Natural Gas. Base Metals.",
    tiers: [
      {
        name: "Bullion Tracker",
        tagline: "Start structured",
        monthly: 20000,
        quarterly: 45000,
        yearly: 72000,
        features: [
          "4–6 MCX trade ideas / month",
          "Entry, SL & Target levels",
          "Gold & Silver focus",
          "Telegram delivery",
          "Email support",
        ],
        highlighted: false,
      },
      {
        name: "Commodity Catalyst",
        tagline: "Most popular",
        monthly: 35000,
        quarterly: 75000,
        yearly: 120000,
        features: [
          "10–14 MCX trade ideas / month",
          "Multi-commodity coverage",
          "Crude Oil & Natural Gas included",
          "Priority Telegram + WhatsApp",
          "Intraday & positional mix",
          "Dedicated support",
        ],
        highlighted: true,
        badge: "Popular",
      },
      {
        name: "MCX Sovereign",
        tagline: "Full commodity suite",
        monthly: 49000,
        quarterly: 105000,
        yearly: 168000,
        features: [
          "Unlimited MCX trade ideas",
          "All segments including Base Metals",
          "Pre-market commodity brief daily",
          "Direct analyst line",
          "Monthly review & portfolio sizing",
          "Priority 24/7 support",
        ],
        highlighted: false,
      },
    ],
  },
]

const BUNDLE_PERIODS: { key: BundlePeriod; label: string; price: number; months: number }[] = [
  { key: "quarterly",  label: "Quarterly",   price: 90000,  months: 3 },
  { key: "halfyearly", label: "Half-Yearly", price: 150000, months: 6 },
]

const BUNDLE_INCLUDED = [
  { name: "Intraday Momentum Program",  desc: "Daily intraday setups with entry, SL & target levels",         icon: <Zap className="w-4 h-4" /> },
  { name: "Options Strategy Pro",        desc: "Index & stock options with Greeks-aware trade rationale",       icon: <TrendingUp className="w-4 h-4" /> },
  { name: "Commodity Momentum Program", desc: "Gold, Silver, Crude & Base Metals — structured & live",         icon: <BarChart3 className="w-4 h-4" /> },
  { name: "Priority Support",            desc: "Dedicated analyst support across all three programs",           icon: <Star className="w-4 h-4" /> },
]

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN")
}

// ─── Period Toggle ───────────────────����──────────────────��─────────────────────

function PeriodToggle({
  period,
  setPeriod,
}: {
  period: Period
  setPeriod: (p: Period) => void
}) {
  const opts: { key: Period; label: string; note?: string }[] = [
    { key: "monthly",   label: "Monthly" },
    { key: "quarterly", label: "Quarterly", note: "Save ~10%" },
    { key: "yearly",    label: "Yearly",    note: "Save ~25%" },
  ]
  return (
    <div className="inline-flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm gap-1">
      {opts.map((o) => (
        <button
          key={o.key}
          onClick={() => setPeriod(o.key)}
          style={{
            background: period === o.key ? "#1B4332" : "transparent",
            color: period === o.key ? "#ffffff" : "#6b7280",
            borderRadius: "999px",
            padding: "7px 18px",
            fontSize: "13px",
            fontWeight: period === o.key ? 700 : 500,
            border: "none",
            cursor: "pointer",
            transition: "all 200ms ease",
            whiteSpace: "nowrap",
          }}
        >
          {o.label}
          {o.note && period === o.key && (
            <span
              style={{
                marginLeft: "6px",
                background: "#C5D82D",
                color: "#1B4332",
                fontSize: "9px",
                fontWeight: 700,
                padding: "2px 6px",
                borderRadius: "99px",
                verticalAlign: "middle",
              }}
            >
              {o.note}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// ─── Circle animation names per card index ────────────────────────────────────
const CIRCLE_ANIMS = [
  "circFloat0 6s ease-in-out infinite",
  "circFloat1 4.5s ease-in-out infinite",
  "circFloat2 7s ease-in-out infinite",
]

// ─── Single Tier Card ─────────────────────────────────────────────────────────

function TierCard({
  tier,
  period,
  cardIndex,
  animDelay,
}: {
  tier: PricingTier
  period: Period
  cardIndex: number
  animDelay: string
}) {
  const price =
    period === "monthly"
      ? tier.monthly
      : period === "quarterly"
      ? tier.quarterly
      : tier.yearly

  const periodLabel =
    period === "monthly" ? "Monthly" : period === "quarterly" ? "Quarterly" : "Yearly"

  const isPopular = tier.highlighted

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 0",
        minWidth: "240px",
        maxWidth: "360px",
        borderRadius: "20px",
        border: isPopular ? "2px solid #1B4332" : "1.5px solid #e5e7eb",
        background: "#ffffff",
        overflow: "hidden",
        boxShadow: isPopular
          ? "0 12px 40px rgba(27,67,50,0.16)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "transform 220ms ease, box-shadow 220ms ease",
        marginTop: isPopular ? "0px" : "12px",
        marginBottom: isPopular ? "0px" : "12px",
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = isPopular
          ? "0 20px 50px rgba(27,67,50,0.22)"
          : "0 10px 30px rgba(0,0,0,0.11)"
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = isPopular
          ? "0 12px 40px rgba(27,67,50,0.16)"
          : "0 2px 12px rgba(0,0,0,0.06)"
      }}
    >
      {/* Popular banner */}
      {isPopular && (
        <div style={{ background: "#1B4332", padding: "11px 24px", textAlign: "center" }}>
          <span style={{ color: "#ffffff", fontSize: "10px", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Popular Package
          </span>
        </div>
      )}

      {/* Card body */}
      <div style={{ padding: "28px 28px 24px", display: "flex", flexDirection: "column", gap: "0", flex: 1, position: "relative", overflow: "hidden" }}>
        {/* Floating lime circle */}
        <div
          style={{
            position: "absolute", top: "-36px", right: "-36px",
            width: "148px", height: "148px", borderRadius: "50%",
            background: "#d6e87a", opacity: 0.48, pointerEvents: "none",
            animation: CIRCLE_ANIMS[cardIndex % CIRCLE_ANIMS.length],
          }}
        />

        {/* Plan name */}
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <span style={{ display: "inline-block", background: "#1B4332", color: "#ffffff", fontSize: "14px", fontWeight: 700, padding: "9px 18px", borderRadius: "8px" }}>
            {tier.name}
          </span>
        </div>

        {/* Tagline */}
        <p style={{ color: "#9ca3af", fontSize: "13px", margin: "0 0 22px", lineHeight: 1.5, position: "relative" }}>
          {tier.tagline}
        </p>

        {/* Features */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "12px", flex: 1, position: "relative" }}>
          {tier.features.map((f) => (
            <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#1B4332", flexShrink: 0, marginTop: "6px" }} />
              <span style={{ color: "#374151", fontSize: "14px", lineHeight: 1.55 }}>{f}</span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div style={{ height: "1px", background: "#f0f0f0", marginBottom: "20px" }} />

        {/* Price */}
        <div style={{ marginBottom: "6px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", marginBottom: "4px" }}>
            <span style={{ color: "#1B4332", fontSize: "42px", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em" }}>
              {fmt(price)}
            </span>
            <span style={{ color: "#9ca3af", fontSize: "14px", fontWeight: 400, paddingBottom: "5px" }}>
              /{periodLabel}
            </span>
          </div>
          <p style={{ color: "#6b7280", fontSize: "13px", fontWeight: 600, margin: "0 0 20px" }}>
            {tier.tagline}
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/contact"
          style={{
            display: "block", width: "100%", padding: "14px", borderRadius: "999px",
            border: isPopular ? "none" : "1.5px solid #d1d5db",
            background: isPopular ? "#C5D82D" : "transparent",
            color: "#1B4332", fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            cursor: "pointer", transition: "all 190ms ease",
            textAlign: "center", textDecoration: "none",
          }}
        >
          Contact to Enroll
        </Link>
      </div>
    </div>
  )
}

// ─── Flat Period Card — one card per billing period ───────────────────────────

function PeriodCard({
  tier,
  period,
  periodLabel,
  saving,
  cardIndex,
  groupIndex,
}: {
  tier: PricingTier
  period: Period
  periodLabel: string
  saving?: string
  cardIndex: number
  groupIndex: number
}) {
  const { ref, visible } = useInView(0.1)
  const price =
    period === "monthly" ? tier.monthly
    : period === "quarterly" ? tier.quarterly
    : tier.yearly
  const isHighlighted = period === "quarterly"
  const delay = groupIndex * 0.05 + cardIndex * 0.1

  return (
    <div
      ref={ref}
      style={{
        flex: "1 1 220px",
        maxWidth: "320px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        border: isHighlighted ? "2px solid #1B4332" : "1.5px solid #e5e7eb",
        background: "#ffffff",
        overflow: "hidden",
        boxShadow: isHighlighted ? "0 12px 40px rgba(27,67,50,0.14)" : "0 2px 12px rgba(0,0,0,0.05)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, box-shadow 200ms ease`,
        marginTop: isHighlighted ? "0" : "10px",
        marginBottom: isHighlighted ? "0" : "10px",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = "translateY(-5px)"
        el.style.boxShadow = isHighlighted ? "0 20px 50px rgba(27,67,50,0.20)" : "0 10px 28px rgba(0,0,0,0.10)"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = "translateY(0)"
        el.style.boxShadow = isHighlighted ? "0 12px 40px rgba(27,67,50,0.14)" : "0 2px 12px rgba(0,0,0,0.05)"
      }}
    >
      {/* Best Value banner */}
      {isHighlighted && (
        <div style={{ background: "#1B4332", padding: "9px 24px", textAlign: "center" }}>
          <span style={{ color: "#ffffff", fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" }}>Best Value</span>
        </div>
      )}

      <div style={{ padding: "24px 24px 20px", display: "flex", flexDirection: "column", flex: 1, position: "relative", overflow: "hidden" }}>
        {/* Lime circle */}
        <div style={{ position: "absolute", top: "-28px", right: "-28px", width: "110px", height: "110px", borderRadius: "50%", background: "#d6e87a", opacity: 0.35, pointerEvents: "none", animation: CIRCLE_ANIMS[cardIndex % CIRCLE_ANIMS.length] }} />

        {/* Period label + saving badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", position: "relative" }}>
          <span style={{ display: "inline-block", background: "#1B4332", color: "#ffffff", fontSize: "12px", fontWeight: 700, padding: "6px 14px", borderRadius: "7px" }}>
            {periodLabel}
          </span>
          {saving && (
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#1B4332", background: "#f0f7e6", border: "1px solid #C5D82D", padding: "3px 10px", borderRadius: "99px" }}>
              {saving}
            </span>
          )}
        </div>

        {/* Price */}
        <div style={{ marginBottom: "18px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "3px" }}>
            <span style={{ color: "#1B4332", fontSize: "40px", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em" }}>{fmt(price)}</span>
            <span style={{ color: "#9ca3af", fontSize: "13px", paddingBottom: "4px" }}>/{periodLabel}</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#f0f0f0", marginBottom: "16px" }} />

        {/* Features */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
          {tier.features.map((f) => (
            <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
              <span style={{ display: "inline-block", width: "5px", height: "5px", borderRadius: "50%", background: "#1B4332", flexShrink: 0, marginTop: "6px" }} />
              <span style={{ color: "#374151", fontSize: "13px", lineHeight: 1.5 }}>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/contact"
          style={{
            display: "block", width: "100%", padding: "12px", borderRadius: "999px",
            border: isHighlighted ? "none" : "1.5px solid #d1d5db",
            background: isHighlighted ? "#C5D82D" : "transparent",
            color: "#1B4332", fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            cursor: "pointer", transition: "all 190ms ease",
            textAlign: "center", textDecoration: "none",
          }}
        >
          Contact to Enroll
        </Link>
      </div>
    </div>
  )
}

// ─── Service Group Block — heading + 3 period cards ───────────────────────────

const PERIOD_CONFIG: { key: Period; label: string; saving?: string }[] = [
  { key: "monthly",   label: "Monthly" },
  { key: "quarterly", label: "Quarterly", saving: "Save ~10%" },
  { key: "yearly",    label: "Yearly",    saving: "Save ~25%" },
]

function PricingPageServiceBlock({
  service,
  index,
}: {
  service: ServiceData
  index: number
}) {
  const { ref, visible } = useInView(0.1)
  // Use the popular (highlighted) tier as the featured tier for pricing
  const featuredTier = service.tiers.find((t) => t.highlighted) ?? service.tiers[1]

  return (
    <div
      ref={ref}
      style={{
        marginBottom: "64px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      {/* Service heading */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#1B4332", display: "flex", alignItems: "center", justifyContent: "center", color: "#C5D82D", flexShrink: 0 }}>
          {service.icon}
        </div>
        <div>
          <h3 style={{ color: "#1B4332", fontSize: "20px", fontWeight: 700, margin: "0 0 2px", fontFamily: "serif" }}>{service.label}</h3>
          <p style={{ color: "#9ca3af", fontSize: "13px", margin: 0 }}>{service.tagline}</p>
        </div>
      </div>

      {/* 3 cards: Monthly, Quarterly, Yearly */}
      <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", alignItems: "flex-start" }}>
        {PERIOD_CONFIG.map((pc, ci) => (
          <PeriodCard
            key={pc.key}
            tier={featuredTier}
            period={pc.key}
            periodLabel={pc.label}
            saving={pc.saving}
            cardIndex={ci}
            groupIndex={index}
          />
        ))}
      </div>
    </div>
  )
}



// ─── Bundle Pricing Block ─────────────────────────────────────────────────────

function BundlePricingBlock() {
  const { ref, visible } = useInView(0.1)
  const bp       = "quarterly" as BundlePeriod
  const opt      = BUNDLE_PERIODS.find((o) => o.key === bp)!
  const total    = opt.price
  const perMonth = Math.round(total / opt.months)

  return (
    <div
      ref={ref}
      style={{
        marginTop: "16px",
        borderRadius: "28px",
        border: "2px solid #1B4332",
        background: "#ffffff",
        overflow: "hidden",
        boxShadow: "0 16px 48px rgba(27,67,50,0.10)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {/* Dark green top banner */}
      <div
        style={{
          background: "#1B4332",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#C5D82D", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Crown style={{ width: "20px", height: "20px", color: "#1B4332" }} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Sparkles style={{ width: "11px", height: "11px", color: "#C5D82D" }} />
              <span style={{ color: "#C5D82D", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Best Value</span>
            </div>
            <h3 style={{ color: "#ffffff", fontSize: "clamp(18px,4vw,22px)", fontWeight: 800, fontFamily: "serif", margin: 0 }}>All-in-One Bundle</h3>
          </div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", margin: 0, maxWidth: "340px" }}>
          Every program under one subscription — no juggling multiple plans.
        </p>
      </div>

      {/* Body — stacks on mobile, side-by-side on md+ */}
      <div style={{ padding: "clamp(24px,5vw,40px) clamp(16px,4vw,48px)", display: "flex", gap: "clamp(24px,5vw,48px)", flexWrap: "wrap" }}>

        {/* Left — price + CTA */}
        <div style={{ flex: "1 1 220px", minWidth: 0, display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Price */}
          <div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", flexWrap: "wrap" }}>
              <span style={{ color: "#1B4332", fontSize: "clamp(38px,8vw,52px)", fontWeight: 800, lineHeight: 1, fontFamily: "serif" }}>
                ₹{perMonth.toLocaleString("en-IN")}
              </span>
              <span style={{ color: "#9ca3af", fontSize: "15px", marginBottom: "6px" }}>/mo</span>
            </div>
            <p style={{ color: "#6b7280", fontSize: "12px", marginTop: "4px" }}>
              &#8377;{total.toLocaleString("en-IN")} billed {opt.label.toLowerCase()}
            </p>
          </div>

          <Link
            href="/contact"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              background: "#C5D82D", color: "#1B4332",
              fontWeight: 700, fontSize: "14px",
              padding: "14px 28px", borderRadius: "14px",
              border: "none", cursor: "pointer", transition: "opacity 200ms ease",
              textDecoration: "none",
            }}
          >
            Contact to Enroll
            <ArrowUpRight style={{ width: "16px", height: "16px" }} />
          </Link>

          <p style={{ color: "#9ca3af", fontSize: "11px", lineHeight: 1.5, margin: 0 }}>
            SEBI compliant. No hidden charges. Reach us before subscribing.
          </p>
        </div>

        {/* Right — included programs */}
        <div style={{ flex: "2 1 280px", minWidth: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ color: "#9ca3af", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
            {"What's included"}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
            {BUNDLE_INCLUDED.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "12px",
                  background: "#F7F9F5",
                  borderRadius: "16px", padding: "14px",
                  border: "1px solid #e9f0eb",
                }}
              >
                <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "#1B4332", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#C5D82D" }}>
                  {item.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ color: "#1B4332", fontSize: "13px", fontWeight: 700, margin: "0 0 3px" }}>{item.name}</p>
                  <p style={{ color: "#6b7280", fontSize: "11px", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust signals */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "4px", padding: "12px 14px", borderRadius: "14px", background: "#F7F9F5", border: "1px solid #e9f0eb" }}>
            {["SEBI Registered RA", "NISM Certified Analyst", "No Profit Sharing", "Transparent Pricing"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Shield style={{ width: "11px", height: "11px", color: "#1B4332", flexShrink: 0 }} />
                <span style={{ color: "#4b5563", fontSize: "11px", fontWeight: 500 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

const PRICING_LINE1  = "Simple, Transparent"
const PRICING_LIME   = "Pricing"

function PricingHero() {
  const [heroVisible, setHeroVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const line1Chars = PRICING_LINE1.split("")
  const limeChars  = PRICING_LIME.split("")

  return (
    <section
      style={{
        minHeight: "65vh",
        background: "linear-gradient(160deg, #122b20 0%, #1B4332 50%, #1a3d2d 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px 100px",
      }}
    >
      <style>{`
        @keyframes floatA { 0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(30px,-40px) scale(1.08);} }
        @keyframes floatB { 0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-20px,30px) scale(0.94);} }
        @keyframes floatC { 0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(15px,20px) scale(1.05);} }
        @keyframes floatD { 0%,100%{transform:translate(0,0);}33%{transform:translate(-18px,-22px);}66%{transform:translate(22px,10px);} }
        @keyframes cardCircleFloat { 0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-6px,8px) scale(1.06);} }
        @keyframes circFloat0 { 0%,100%{transform:translate(0,0) scale(1);}40%{transform:translate(-8px,10px) scale(1.07);}70%{transform:translate(5px,-6px) scale(0.96);} }
        @keyframes circFloat1 { 0%,100%{transform:translate(0,0) scale(1) rotate(0deg);}50%{transform:translate(6px,-10px) scale(1.12) rotate(15deg);} }
        @keyframes circFloat2 { 0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(10px,8px) scale(0.93);}66%{transform:translate(-8px,-5px) scale(1.05);} }
        @keyframes revealUp { from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);} }
        @keyframes waveMove {
          0%   { d: path("M0,32 C180,80 360,-16 540,32 C720,80 900,-16 1080,32 L1080,64 L0,64 Z"); }
          50%  { d: path("M0,48 C180,0  360,80 540,48 C720,0  900,80 1080,48 L1080,64 L0,64 Z"); }
          100% { d: path("M0,32 C180,80 360,-16 540,32 C720,80 900,-16 1080,32 L1080,64 L0,64 Z"); }
        }
      `}</style>

      {/* Floating lime orbs */}
      <div style={{ position:"absolute", top:"8%",  left:"6%",  width:"260px", height:"260px", borderRadius:"50%", background:"radial-gradient(circle, rgba(197,216,45,0.13) 0%, transparent 70%)", animation:"floatA 9s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"20%", right:"4%", width:"180px", height:"180px", borderRadius:"50%", background:"radial-gradient(circle, rgba(197,216,45,0.09) 0%, transparent 70%)", animation:"floatB 12s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"18%", left:"15%", width:"140px", height:"140px", borderRadius:"50%", background:"radial-gradient(circle, rgba(197,216,45,0.10) 0%, transparent 70%)", animation:"floatC 7s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"10%", right:"12%", width:"200px", height:"200px", borderRadius:"50%", background:"radial-gradient(circle, rgba(197,216,45,0.07) 0%, transparent 70%)", animation:"floatD 14s ease-in-out infinite", pointerEvents:"none" }} />

      {/* Film-grain / noise texture via SVG feTurbulence rendered into a canvas data-URI */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
            <feComponentTransfer in="blended">
              <feFuncA type="linear" slope="0.18" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          filter: "url(#grain-filter)",
          background: "#1B4332",
          opacity: 0.55,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", textAlign: "center", maxWidth: "720px", zIndex: 1 }}>

        {/* Badge — fade+slide up */}
        <div
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.55s ease 0.05s, transform 0.55s ease 0.05s",
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(197,216,45,0.12)", border: "1px solid rgba(197,216,45,0.3)",
            borderRadius: "999px", padding: "6px 18px", marginBottom: "28px",
          }}
        >
          <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#C5D82D", display:"inline-block" }} />
          <span style={{ color:"#C5D82D", fontSize:"12px", fontWeight:600, letterSpacing:"0.08em" }}>
            SEBI Registered Research Analyst
          </span>
        </div>

        {/* Heading — char-by-char stagger identical to contact page */}
        <h1 style={{ color:"#ffffff", fontSize:"clamp(32px,5vw,58px)", fontWeight:800, fontFamily:"serif", lineHeight:1.15, margin:"0 0 8px" }}>
          {/* Line 1 — white chars */}
          <span style={{ display:"block" }}>
            {line1Chars.map((ch, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  whiteSpace: ch === " " ? "pre" : undefined,
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(22px)",
                  transition: `opacity 0.5s ease ${0.18 + i * 0.03}s, transform 0.5s ease ${0.18 + i * 0.03}s`,
                }}
              >
                {ch}
              </span>
            ))}
          </span>
          {/* Line 2 — lime chars + growing underline */}
          <span style={{ display:"block", position:"relative", width:"fit-content", margin:"0 auto" }}>
            {limeChars.map((ch, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  color: "#C5D82D",
                  whiteSpace: ch === " " ? "pre" : undefined,
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(22px)",
                  transition: `opacity 0.5s ease ${0.45 + i * 0.04}s, transform 0.5s ease ${0.45 + i * 0.04}s`,
                }}
              >
                {ch}
              </span>
            ))}
            {/* Growing underline */}
            <span
              style={{
                display: "block",
                height: "4px",
                borderRadius: "2px",
                background: "#C5D82D",
                width: heroVisible ? "100%" : "0%",
                transition: "width 0.7s cubic-bezier(0.22,1,0.36,1) 1.1s",
                marginTop: "4px",
              }}
            />
          </span>
        </h1>

        {/* Subtitle — fade+slide up */}
        <p
          style={{
            color: "rgba(255,255,255,0.60)",
            fontSize: "clamp(15px, 2vw, 18px)",
            lineHeight: 1.7,
            maxWidth: "560px",
            margin: "24px auto 36px",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s",
          }}
        >
          No hidden charges. No profit-sharing. Choose the program that aligns
          with your trading style and subscribe with confidence.
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex", gap: "0", justifyContent: "center", flexWrap: "wrap",
            background: "rgba(255,255,255,0.05)", borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden",
            maxWidth: "560px", margin: "0 auto",
          }}
        >
          {[
            { label: "Research Programs",  value: "3" },
            { label: "Billing Cycles",     value: "Monthly / Quarterly / Yearly" },
            { label: "SEBI Reg. No.",      value: "INH000026114" },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                flex: "1 1 140px",
                padding: "20px 16px",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                textAlign: "center",
              }}
            >
              <p style={{ color: "#C5D82D", fontSize: "20px", fontWeight: 800, margin: "0 0 4px" }}>{s.value}</p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", margin: 0, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Animated wave bottom border — single page-bg layer, no gaps */}
      <style>{`
        @keyframes waveRoll { 0%{transform:translateX(0);} 100%{transform:translateX(-50%);} }
      `}</style>
      <div
        style={{
          position: "absolute",
          bottom: -1,
          left: 0,
          right: 0,
          overflow: "hidden",
          lineHeight: 0,
          pointerEvents: "none",
          height: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "200%",
            height: "80px",
            animation: "waveRoll 7s linear infinite",
          }}
        >
          {[0, 1].map((i) => (
            <svg
              key={i}
              viewBox="0 0 1440 80"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              style={{ width: "50%", height: "80px", flexShrink: 0, display: "block" }}
            >
              {/* fill the entire bottom so there is zero gap below the wave crest */}
              <path
                d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1350,10 1440,40 L1440,80 L0,80 Z"
                fill="#F7F9F5"
              />
            </svg>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

function ToggleReveal({ period, setPeriod }: { period: Period; setPeriod: (p: Period) => void }) {
  const { ref, visible } = useInView(0.2)
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "64px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <PeriodToggle period={period} setPeriod={setPeriod} />
    </div>
  )
}

function BundleHeading() {
  const { ref, visible } = useInView(0.2)
  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        paddingTop: "60px",
        marginBottom: "32px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <h2 style={{ color: "#1B4332", fontSize: "28px", fontWeight: 800, fontFamily: "serif", margin: "0 0 8px" }}>
        All-in-One Bundle
      </h2>
      <p style={{ color: "#9ca3af", fontSize: "15px", margin: 0 }}>
        Get all three programs at a bundled price — Monthly, Quarterly, or Half-Yearly.
      </p>
    </div>
  )
}

export function PricingContent() {
  return (
    <>
      <PricingHero />

      <section style={{ background: "#F7F9F5", padding: "80px 0 100px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

          {/* Section intro */}
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2 style={{ color: "#1B4332", fontSize: "28px", fontWeight: 800, fontFamily: "serif", margin: "0 0 8px" }}>
              Choose Your Program
            </h2>
            <p style={{ color: "#6b7280", fontSize: "15px", margin: 0 }}>
              Three research programs — each available on Monthly, Quarterly, and Yearly plans. No hidden charges.
            </p>
          </div>

          {/* 3 service groups — each with Monthly, Quarterly, Yearly cards */}
          {services.map((service, i) => (
            <PricingPageServiceBlock key={service.id} service={service} index={i} />
          ))}

          {/* Bundle heading */}
          <BundleHeading />
          <BundlePricingBlock />

          {/* Legal note */}
          <p
            style={{
              textAlign: "center",
              color: "#9ca3af",
              fontSize: "12px",
              lineHeight: 1.6,
              marginTop: "40px",
              maxWidth: "680px",
              margin: "40px auto 0",
            }}
          >
            Investment in securities market are subject to market risks. Read all related documents carefully before investing.
            Registration granted by SEBI and certification from NISM in no way guarantee performance of the Research Analyst
            or provide any assurance of returns to investors. SEBI Research Analyst Registration No.: INH000026114

          </p>
        </div>
      </section>
    </>
  )
}

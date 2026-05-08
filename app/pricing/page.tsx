import { TopBar } from "@/components/finora/top-bar"
import { Navbar } from "@/components/finora/navbar"
import { PricingContent } from "@/components/finora/pricing-content"
import { Footer } from "@/components/finora/footer"

export const metadata = {
  title: "Pricing — Money Ventures Research",
  description:
    "Transparent, SEBI-compliant research subscription plans for Intraday, Options, Commodity, and our All-in-One Bundle.",
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <TopBar />
      <Navbar />
      <PricingContent />
      <Footer />
    </main>
  )
}

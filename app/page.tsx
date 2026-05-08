import { Navbar } from "@/components/finora/navbar"
import { HeroSection } from "@/components/finora/hero-section"
import { AboutSection } from "@/components/finora/about-section"
import { ServicesV2 } from "@/components/finora/services-v2"
import { MeetRohitSection } from "@/components/finora/meet-rohit-section"
import { FAQSection } from "@/components/finora/faq-section"
import { AppointmentSection } from "@/components/finora/appointment-section"
import { ComplaintBoard } from "@/components/finora/complaint-board"
import { Footer } from "@/components/finora/footer"
import { ScrollToTop } from "@/components/finora/scroll-to-top"
import { RevealSection } from "@/components/finora/reveal-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Main Navigation */}
      <Navbar />

      {/* Hero — no reveal, animates itself on load */}
      <HeroSection />

      {/* Spacer for overlapping desktop cards */}
      <div className="h-0 lg:h-48 bg-white" />

      {/* About Section */}
      <RevealSection direction="up" delay={0} threshold={0.08}>
        <AboutSection />
      </RevealSection>

      {/* Services Section */}
      <RevealSection direction="up" delay={0} threshold={0.06}>
        <div id="services">
          <ServicesV2 />
        </div>
      </RevealSection>

      {/* Meet Rohit */}
      <RevealSection direction="up" delay={0} threshold={0.06}>
        <MeetRohitSection />
      </RevealSection>

      {/* FAQ Section */}
      <RevealSection direction="up" delay={0} threshold={0.06}>
        <FAQSection />
      </RevealSection>

      {/* Appointment Section */}
      <RevealSection direction="up" delay={0} threshold={0.06}>
        <AppointmentSection />
      </RevealSection>

      {/* SEBI Complaint Board */}
      <RevealSection direction="up" delay={0} threshold={0.06}>
        <div id="compliance">
          <ComplaintBoard />
        </div>
      </RevealSection>

      {/* Footer */}
      <RevealSection direction="up" delay={0} threshold={0.04}>
        <Footer />
      </RevealSection>

      {/* Scroll to top button */}
      <ScrollToTop />
    </main>
  )
}

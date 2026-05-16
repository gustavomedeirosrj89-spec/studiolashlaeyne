import { Navbar } from "@/components/studio/Navbar"
import { Hero } from "@/components/studio/Hero"
import { Portfolio } from "@/components/studio/Portfolio"
import { ReviewShowcase } from "@/components/studio/ReviewShowcase"
import { DigitalCatalog } from "@/components/studio/DigitalCatalog"
import { PaymentInfo } from "@/components/studio/PaymentInfo"
import { Footer } from "@/components/studio/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Portfolio />
      <ReviewShowcase />
      <DigitalCatalog />
      <PaymentInfo />
      <Footer />
    </main>
  )
}

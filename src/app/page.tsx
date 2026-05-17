
import { Navbar } from "@/components/studio/Navbar"
import { Hero } from "@/components/studio/Hero"
import { StudioGallery } from "@/components/studio/StudioGallery"
import { CatalogCTA } from "@/components/studio/CatalogCTA"
import { ReviewShowcase } from "@/components/studio/ReviewShowcase"
import { DigitalCatalog } from "@/components/studio/DigitalCatalog"
import { PaymentInfo } from "@/components/studio/PaymentInfo"
import { Footer } from "@/components/studio/Footer"

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-primary/20">
      <Navbar />
      <Hero />
      <StudioGallery />
      <CatalogCTA />
      <ReviewShowcase />
      <DigitalCatalog />
      <PaymentInfo />
      <Footer />
    </main>
  )
}

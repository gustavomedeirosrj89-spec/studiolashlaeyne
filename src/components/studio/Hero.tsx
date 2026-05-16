import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-lash")

  return (
    <section className="pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8 graceful-reveal" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-4">
            <h4 className="text-accent uppercase tracking-[0.3em] font-medium text-sm">Luxury Eyelash Extensions</h4>
            <h1 className="text-6xl md:text-8xl font-headline font-light leading-[0.9] text-foreground">
              Elevate Your <br />
              <span className="italic font-serif text-primary">Natural Gaze.</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-lg font-light leading-relaxed">
            Experience the artistry of bespoke lash architecture. Specialized in high-performance volume and delicate textures tailored to your unique profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full px-10 h-14 bg-primary text-white hover:bg-primary/90 flex gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp Consulting
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 h-14 border-primary text-primary hover:bg-primary/10 flex gap-2">
              Explore Portfolio
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-5 relative graceful-reveal" style={{ animationDelay: '0.3s' }}>
          <div className="blob-frame aspect-[4/5] relative bg-muted z-10">
            {heroImage && (
              <Image 
                src={heroImage.imageUrl} 
                alt={heroImage.description}
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl z-0" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl z-0" />
        </div>
      </div>
    </section>
  )
}

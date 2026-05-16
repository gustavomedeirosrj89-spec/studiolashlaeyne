import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-lash")

  return (
    <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 md:space-y-8 graceful-reveal" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-accent uppercase tracking-[0.3em] font-medium text-xs md:text-sm">Extensões de Cílios de Luxo</h4>
            <h1 className="text-5xl md:text-8xl font-headline font-light leading-[1] md:leading-[0.9] text-foreground">
              Eleve seu <br />
              <span className="italic font-serif text-primary">Olhar Natural.</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg font-light leading-relaxed">
            Experimente a arte da arquitetura de cílios sob medida. Especializada em volume de alta performance e texturas delicadas adaptadas ao seu perfil único.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full px-10 h-14 bg-primary text-white hover:bg-primary/90 flex gap-2 w-full sm:w-auto">
              <MessageCircle className="w-5 h-5" />
              Consultoria WhatsApp
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 h-14 border-primary text-primary hover:bg-primary/10 flex gap-2 w-full sm:w-auto">
              Ver Portfólio
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-5 relative graceful-reveal mt-8 lg:mt-0" style={{ animationDelay: '0.3s' }}>
          <div className="blob-frame aspect-[4/5] relative bg-muted z-10 mx-auto max-w-[400px] lg:max-w-none">
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

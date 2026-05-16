import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-lash")

  return (
    <section className="pt-28 md:pt-40 pb-16 md:pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8 graceful-reveal" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-4">
            <h4 className="text-accent uppercase tracking-[0.3em] font-medium text-xs md:text-sm">Especialista em Extensão de Cílios</h4>
            <h1 className="text-5xl md:text-8xl font-headline font-light leading-[1] text-foreground">
              A Arte de <br />
              <span className="italic font-serif text-primary">Realçar Olhares.</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg font-light leading-relaxed">
            Experimente o luxo de um olhar renovado com nossas técnicas exclusivas de extensão. Design sob medida para sua beleza natural.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full px-10 h-14 bg-primary text-white hover:bg-primary/90 flex gap-2 w-full sm:w-auto text-base">
              <MessageCircle className="w-5 h-5" />
              Agendar no WhatsApp
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 h-14 border-primary text-primary hover:bg-primary/10 flex gap-2 w-full sm:w-auto text-base">
              Nossos Estilos
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-5 relative graceful-reveal mt-12 lg:mt-0" style={{ animationDelay: '0.3s' }}>
          <div className="blob-frame aspect-[4/5] relative bg-muted z-10 mx-auto w-full max-w-[450px]">
            {heroImage && (
              <Image 
                src={heroImage.imageUrl} 
                alt={heroImage.description}
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/15 rounded-full blur-[80px] -z-10" />
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/15 rounded-full blur-[80px] -z-10" />
        </div>
      </div>
    </section>
  )
}

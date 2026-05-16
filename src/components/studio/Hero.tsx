
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function Hero() {
  const specialistImg = PlaceHolderImages.find(img => img.id === "specialist-photo")

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Texto Principal */}
          <div className="lg:col-span-7 space-y-10 graceful-reveal text-center lg:text-left mx-auto lg:mx-0">
            <div className="space-y-6">
              <h4 className="text-accent uppercase tracking-[0.4em] font-bold text-[10px] md:text-xs">
                Especialista em Extensão de Cílios
              </h4>
              <h1 className="text-5xl md:text-8xl font-headline font-light leading-[1.1] text-foreground">
                A Arte de <br />
                <span className="italic font-serif text-primary">Realçar Olhares.</span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-light leading-relaxed mx-auto lg:mx-0">
              Experimente o luxo de um olhar renovado com nossas técnicas exclusivas. Design sob medida para sua beleza única e natural.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Button size="lg" className="rounded-full px-10 h-16 bg-primary text-white hover:bg-primary/90 flex gap-3 w-full sm:w-auto text-base shadow-lg shadow-primary/20 transition-all">
                <MessageCircle className="w-5 h-5" />
                Agendar no WhatsApp
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 h-16 border-primary text-primary hover:bg-primary/10 flex gap-3 w-full sm:w-auto text-base transition-all">
                Nossos Estilos
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quadro da Especialista (Enquadramento) */}
          <div className="lg:col-span-5 relative graceful-reveal" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-full aspect-[4/5] max-w-[450px] mx-auto">
              {/* Moldura Decorativa (Fundo) */}
              <div className="absolute inset-0 border border-primary/20 rounded-[3rem] translate-x-4 translate-y-4 -z-10" />
              
              {/* Imagem com Blob Frame */}
              <div className="w-full h-full blob-frame bg-secondary/30 relative shadow-2xl">
                {specialistImg && (
                  <Image 
                    src={specialistImg.imageUrl} 
                    alt="Modelo Laeyne Studio"
                    fill
                    className="object-cover"
                    data-ai-hint={specialistImg.imageHint}
                    unoptimized={specialistImg.imageUrl.includes('ibb.co')}
                  />
                )}
              </div>

              {/* Elementos Flutuantes (Selo de Qualidade) */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Atendimento</p>
                    <p className="text-sm font-semibold text-foreground">Exclusivo & VIP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorações de Fundo */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px] -z-10" />
    </section>
  )
}

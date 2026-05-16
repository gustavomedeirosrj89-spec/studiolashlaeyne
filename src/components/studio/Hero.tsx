
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="max-w-3xl space-y-10 graceful-reveal text-center md:text-left mx-auto md:mx-0">
          <div className="space-y-6">
            <h4 className="text-accent uppercase tracking-[0.4em] font-bold text-[10px] md:text-xs">
              Especialista em Extensão de Cílios
            </h4>
            <h1 className="text-5xl md:text-8xl font-headline font-light leading-[1.1] text-foreground">
              A Arte de <br />
              <span className="italic font-serif text-primary">Realçar Olhares.</span>
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-light leading-relaxed mx-auto md:mx-0">
            Experimente o luxo de um olhar renovado com nossas técnicas exclusivas. Design sob medida para sua beleza única e natural.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <Button size="lg" className="rounded-full px-10 h-16 bg-primary text-white hover:bg-primary/90 flex gap-3 w-full sm:w-auto text-base shadow-lg shadow-primary/20">
              <MessageCircle className="w-5 h-5" />
              Agendar no WhatsApp
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 h-16 border-primary text-primary hover:bg-primary/10 flex gap-3 w-full sm:w-auto text-base">
              Nossos Estilos
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px] -z-10" />
    </section>
  )
}

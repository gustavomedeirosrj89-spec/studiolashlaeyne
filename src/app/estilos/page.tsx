
import Link from "next/link"
import { Navbar } from "@/components/studio/Navbar"
import { Footer } from "@/components/studio/Footer"
import { StyleCatalog } from "@/components/studio/StyleCatalog"
import { Gallery } from "@/components/studio/Gallery"
import { DigitalCatalog } from "@/components/studio/DigitalCatalog"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

const WHATSAPP_MESSAGE = "Oi, tudo bem? gostaria de marcar um agendamento. qual dia e horario você tem disponivel?"
const WHATSAPP_URL = `https://wa.me/5588996363178?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export default function EstilosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero da Página de Estilos */}
      <section className="pt-40 pb-20 px-6 text-center bg-accent/5">
        <div className="max-w-4xl mx-auto space-y-6 graceful-reveal">
          <h4 className="text-accent uppercase tracking-[0.5em] font-bold text-xs">Catálogo de Procedimentos</h4>
          <h1 className="text-5xl md:text-8xl font-headline leading-tight">
            Escolha Seu <br />
            <span className="text-primary italic">Estilo Único.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Nossos designs são arquitetados para realçar a sua beleza natural, respeitando a saúde dos seus fios e elevando sua autoestima.
          </p>
        </div>
      </section>

      <StyleCatalog />
      
      {/* Tabela de Manutenção e Preços Adicionais */}
      <DigitalCatalog />
      
      <Gallery />

      {/* CTA Final - Refatorado para o visual da imagem */}
      <section className="py-24 px-6 bg-foreground text-background text-center overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-12 graceful-reveal">
          <h2 className="text-4xl md:text-6xl font-headline leading-tight font-light">
            Transforme seu olhar com <br />
            um estilo <span className="text-primary italic font-serif">feito para você.</span>
          </h2>
          
          <div className="flex justify-center">
            <Button asChild size="lg" className="rounded-full px-10 h-16 md:h-20 bg-primary hover:bg-primary/90 text-white text-lg md:text-xl font-bold uppercase tracking-[0.15em] shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group">
              <Link href={WHATSAPP_URL} target="_blank" className="flex items-center gap-4">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
                Agendar pelo WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

import { ShieldCheck, UserCheck, Sparkles, Gem } from "lucide-react"

export function StudioGallery() {
  return (
    <section className="py-20 md:py-32 px-6 bg-secondary/10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-12">
          {/* Header Centralizado */}
          <div className="space-y-6 graceful-reveal">
            <h4 className="text-accent uppercase tracking-[0.3em] font-medium text-xs">Excelência Técnica</h4>
            <h2 className="text-4xl md:text-6xl font-headline leading-tight">
              Compromisso com a <br />
              <span className="text-primary italic">Sua Segurança</span>
            </h2>
            <p className="text-muted-foreground font-light text-lg md:text-xl leading-relaxed mx-auto max-w-2xl">
              Cada detalhe da nossa técnica foi planejado para oferecer o máximo de conforto e relaxamento enquanto você cuida da sua beleza. Utilizamos as metodologias mais modernas e materiais de padrão internacional.
            </p>
          </div>

          {/* Grid de Informações */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 graceful-reveal" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-4 p-8 rounded-[2.5rem] bg-background shadow-sm border border-primary/5 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <UserCheck className="w-8 h-8" />
              </div>
              <h4 className="font-headline text-3xl text-foreground">Atendimento</h4>
              <p className="text-muted-foreground leading-relaxed">
                Personalizado e focado na arquitetura única do seu olhar, respeitando rigorosamente a saúde e o ciclo de crescimento dos seus fios naturais.
              </p>
            </div>

            <div className="space-y-4 p-8 rounded-[2.5rem] bg-background shadow-sm border border-primary/5 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2">
                <Gem className="w-8 h-8" />
              </div>
              <h4 className="font-headline text-3xl text-foreground">Materiais</h4>
              <p className="text-muted-foreground leading-relaxed">
                Trabalhamos exclusivamente com adesivos e fios importados, totalmente hipoalergênicos e testados, garantindo uma aplicação segura e duradoura.
              </p>
            </div>
          </div>

          {/* Badges de Certificação */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 pt-8 graceful-reveal" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-primary/70">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <span>Saúde Ocular em Primeiro Lugar</span>
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-primary/70">
              <Sparkles className="w-6 h-6 text-primary" />
              <span>Técnicas de Isolamento Perfeito</span>
            </div>
          </div>

          {/* Destaque de Satisfação */}
          <div className="pt-12 graceful-reveal" style={{ animationDelay: '0.6s' }}>
            <div className="inline-block bg-primary/5 px-10 py-6 rounded-full border border-primary/10">
              <p className="text-primary font-headline text-2xl">Satisfação & Segurança 100%</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1">
                Protocolos rigorosos de higiene e esterilização
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

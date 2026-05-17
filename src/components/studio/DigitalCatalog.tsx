import { 
  Clock, 
  Info,
  CheckCircle2,
  Sparkles,
  Gem,
  Wind,
  ShieldCheck,
  Zap,
  Star
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function DigitalCatalog() {
  const maintenances = [
    { 
      label: "Manutenção 15 Dias", 
      price: "R$ 100", 
      styles: "Mega Volume, Volume Russo",
      desc: "Recomendado para quem exige cílios impecáveis, densos e com preenchimento total a todo momento." 
    },
    { 
      label: "Manutenção 21 Dias", 
      price: "R$ 130", 
      styles: "Volume Brasileiro, Fox Eyes, Híbrido",
      desc: "O intervalo ideal para a maioria das técnicas, mantendo a arquitetura e o design original do olhar." 
    },
    { 
      label: "Manutenção 28 Dias", 
      price: "R$ 160", 
      styles: "Clássico Fio a Fio",
      desc: "Para fios com ciclo de crescimento lento ou para quem busca apenas um realce sutil e natural." 
    }
  ]

  const premiumFeatures = [
    { label: "Atendimento Personalizado", icon: <CheckCircle2 className="w-5 h-5 text-primary" /> },
    { label: "Produtos Importados", icon: <Gem className="w-5 h-5 text-primary" /> },
    { label: "Ambiente Climatizado", icon: <Wind className="w-5 h-5 text-primary" /> },
    { label: "Técnicas Atualizadas", icon: <Zap className="w-5 h-5 text-primary" /> },
    { label: "Alta Retenção", icon: <ShieldCheck className="w-5 h-5 text-primary" /> },
    { label: "Acabamento Natural", icon: <Star className="w-5 h-5 text-primary" /> }
  ]

  return (
    <section id="catalog" className="py-24 md:py-32 px-6 bg-accent/5">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h4 className="text-accent uppercase tracking-[0.4em] font-bold text-xs">Transparência & Cuidado</h4>
          <h2 className="text-4xl md:text-6xl font-headline">Investimento e <span className="text-primary italic">Manutenções</span></h2>
          <p className="text-muted-foreground font-light text-lg leading-relaxed">
            Nossos valores refletem a qualidade dos materiais importados e a precisão técnica aplicada em cada aplicação.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Coluna de Manutenções */}
          <div className="space-y-8 bg-background p-8 md:p-12 rounded-[3rem] shadow-xl border border-primary/5 graceful-reveal">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-3xl">Ciclos de Manutenção</h3>
            </div>
            
            <div className="space-y-6">
              {maintenances.map((item, i) => (
                <div key={i} className="group p-6 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-semibold text-lg">{item.label}</p>
                    <span className="font-headline text-2xl text-primary">{item.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                      Indicado para: {item.styles}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-secondary/30 flex gap-4 items-start">
              <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                * Manutenções após 30 dias serão cobradas como uma nova aplicação completa devido ao ciclo natural de renovação dos fios.
              </p>
            </div>
          </div>

          {/* Coluna de Experiência Premium */}
          <div className="space-y-8">
            <div className="bg-foreground text-background p-8 md:p-12 rounded-[3rem] shadow-xl graceful-reveal" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-3xl">Experiência Premium</h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {premiumFeatures.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-lg font-light tracking-wide text-primary-foreground/90 group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                    {i < premiumFeatures.length - 1 && <Separator className="bg-muted/10 hidden" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Banner de Qualidade */}
            <div className="bg-primary/10 p-8 rounded-[2.5rem] border border-primary/20 flex items-center gap-6 graceful-reveal" style={{ animationDelay: '0.4s' }}>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary shadow-lg shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Segurança Garantida</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  Ambiente estéril e materiais descartáveis para cada atendimento, priorizando sempre a sua saúde ocular.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { 
  Clock, 
  Trash2, 
  Zap, 
  Info,
  CheckCircle2
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function DigitalCatalog() {
  const maintenances = [
    { label: "Manutenção 15 Dias", price: "R$ 100", desc: "Recomendado para quem exige cílios impecáveis e densos a todo momento." },
    { label: "Manutenção 21 Dias", price: "R$ 130", desc: "O intervalo ideal para a maioria das técnicas, mantendo o design original." },
    { label: "Manutenção 28 Dias", price: "R$ 160", desc: "Para fios com ciclo de crescimento lento ou para retoques finais de emergência." }
  ]

  const extras = [
    { label: "Remoção Profissional", price: "R$ 50", detail: "Protocolo seguro que preserva a saúde do fio natural." },
    { label: "Reparo Rápido", price: "R$ 30", detail: "Correção pontual de falhas em até 48h após o procedimento." },
    { label: "Lash Botox & Tint", price: "R$ 120", detail: "Tratamento de queratina e cor para fios naturais." }
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
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-lg">{item.label}</p>
                    <span className="font-headline text-2xl text-primary">{item.price}</span>
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

          {/* Coluna de Extras e Spa */}
          <div className="space-y-8">
            <div className="bg-foreground text-background p-8 md:p-12 rounded-[3rem] shadow-xl graceful-reveal" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-3xl">Serviços Adicionais</h3>
              </div>

              <div className="space-y-8">
                {extras.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-lg text-primary-foreground">{item.label}</p>
                      <span className="font-headline text-2xl text-primary">{item.price}</span>
                    </div>
                    <p className="text-sm text-muted/60 font-light">{item.detail}</p>
                    {i < extras.length - 1 && <Separator className="bg-muted/10 mt-4" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Banner de Qualidade */}
            <div className="bg-primary/10 p-8 rounded-[2.5rem] border border-primary/20 flex items-center gap-6 graceful-reveal" style={{ animationDelay: '0.4s' }}>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary shadow-lg shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Garantia de Qualidade</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  Utilizamos apenas adesivos hipoalergênicos de padrão médico e fios de seda premium para maior retenção e conforto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

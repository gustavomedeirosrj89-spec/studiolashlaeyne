import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { ShieldCheck, UserCheck, Sparkles, Gem } from "lucide-react"

export function StudioGallery() {
  const techImg = PlaceHolderImages.find(img => img.id === "technique-detail")
  const lashImg = PlaceHolderImages.find(img => img.id === "hero-lash")

  return (
    <section className="py-20 md:py-32 px-6 bg-secondary/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-headline leading-tight">
                Compromisso com a <br />
                <span className="text-primary italic">Excelência</span>
              </h2>
              <p className="text-muted-foreground font-light text-lg md:text-xl leading-relaxed max-w-xl">
                Cada detalhe foi planejado para oferecer o máximo de conforto e relaxamento enquanto você cuida da sua beleza. Utilizamos as técnicas mais modernas e materiais premium do mercado.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h4 className="font-headline text-2xl text-foreground">Atendimento</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Personalizado e focado na arquitetura do seu olhar, respeitando a saúde dos seus fios naturais.
                </p>
              </div>

              <div className="space-y-4 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/5">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Gem className="w-6 h-6" />
                </div>
                <h4 className="font-headline text-2xl text-foreground">Materiais</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Trabalhamos apenas com produtos importados e hipoalergênicos para garantir sua total segurança.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary/70">
                <ShieldCheck className="w-4 h-4" />
                Saúde Ocular em Primeiro Lugar
              </div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary/70">
                <Sparkles className="w-4 h-4" />
                Técnicas de Isolamento Perfeito
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-background">
              {techImg && (
                <Image 
                  src={techImg.imageUrl} 
                  alt="Detalhe da técnica profissional de extensão de cílios"
                  fill
                  className="object-cover"
                  data-ai-hint="eyelash detail"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Elemento flutuante de destaque */}
            <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 md:p-8 rounded-3xl shadow-xl max-w-[240px] hidden sm:block animate-bounce-slow">
              <p className="text-primary font-headline text-4xl mb-2">100%</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground leading-tight">
                Satisfação e Segurança nos Procedimentos
              </p>
            </div>

            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

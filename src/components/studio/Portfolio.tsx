
"use client"

import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, MessageCircle, Sparkles, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const services = [
  {
    title: "Volume Russo",
    price: "R$ 250",
    description: "Glamour extremo e densidade máxima. Para quem busca um olhar dramático e poderoso.",
    fullDescription: "A técnica de Volume Russo consiste na aplicação de pequenos 'fans' feitos à mão, com 3 a 7 fios extremamente finos e leves sobre cada cílio natural. O resultado é um olhar com densidade incrível, preenchimento total de falhas e uma textura aveludada incomparável. É o estilo preferido para eventos especiais e para quem não abre mão de um olhar impactante.",
    imageId: "russian-volume",
    tags: ["Densidade", "Glamour"],
    benefits: ["Preenchimento máximo", "Textura aveludada", "Ideal para eventos de luxo"]
  },
  {
    title: "Volume Brasileiro",
    price: "R$ 180",
    description: "Ideal para o dia a dia. Oferece volume moderado com um acabamento leve e fios em formato de Y.",
    fullDescription: "A técnica de Volume Brasileiro utiliza fios em formato de Y, que proporcionam o dobro de volume do fio a fio clássico, mas com a leveza necessária para não sobrecarregar os cílios naturais. É a escolha perfeita para quem deseja um olhar marcante porém com aspecto natural e sofisticado para todas as ocasiões.",
    imageId: "brazilian-volume",
    tags: ["Mais Pedido", "Volume"],
    benefits: ["Fios leves e macios", "Efeito 2D sofisticado", "Ideal para olhos sensíveis"]
  },
  {
    title: "Fox Eyes",
    price: "R$ 220",
    description: "Alongamento estratégico. Cria um efeito de lifting imediato e olhar sensual.",
    fullDescription: "Inspirado no visual das supermodelos, o estilo Fox Eyes utiliza um mapeamento estratégico para alongar o canto externo dos olhos. O resultado é um efeito de lifting imediato, criando um olhar mais aberto, sexy e extremamente elegante. Utilizamos curvaturas específicas para garantir a durabilidade desse design arquitetônico.",
    imageId: "fox-eyes",
    tags: ["Tendência", "Lifting"],
    benefits: ["Efeito lifting imediato", "Design arquitetônico", "Curvatura personalizada"]
  },
  {
    title: "Clássico Fio a Fio",
    price: "R$ 150",
    description: "Elegância discreta. Realça os cílios naturais de forma quase imperceptível.",
    fullDescription: "O Clássico Fio a Fio é a base da elegância. Aplicamos uma extensão individual sobre cada cílio natural saudável, respeitando a curvatura e espessura ideais. É perfeito para quem nunca usou extensões ou prefere o efeito 'rímel perfeito' todos os dias, sem a necessidade de maquiagem.",
    imageId: "classic-lashes",
    tags: ["Natural", "Leveza"],
    benefits: ["Visual 100% natural", "Conforto absoluto", "Preserva a saúde dos fios"]
  }
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24">
          <div className="space-y-4 max-w-2xl">
            <h4 className="text-accent uppercase tracking-[0.4em] font-medium text-[10px] md:text-xs">Arquitetura do Olhar</h4>
            <h2 className="text-5xl md:text-7xl font-headline leading-[0.9] text-foreground">
              Nossos <br />
              <span className="text-primary italic">Estilos</span>
            </h2>
            <p className="text-muted-foreground font-light text-lg md:text-xl max-w-lg leading-relaxed pt-2">
              Selecione a arquitetura ideal para o formato dos seus olhos e seu estilo de vida.
            </p>
          </div>
          <div className="pt-4 md:pt-0 w-full md:w-auto">
            <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/10 tracking-[0.2em] uppercase text-[10px] h-14 px-10 w-full md:w-auto transition-all">
              Ver Tabela Completa
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, idx) => {
            const img = PlaceHolderImages.find(i => i.id === service.imageId)
            return (
              <Dialog key={idx}>
                <DialogTrigger asChild>
                  <div 
                    className="group flex flex-col h-full bg-card rounded-[2.5rem] overflow-hidden border border-primary/5 hover:border-primary/20 transition-all duration-700 hover:shadow-2xl graceful-reveal cursor-pointer" 
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {img && (
                        <Image 
                          src={img.imageUrl} 
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                          data-ai-hint={img.imageHint}
                          unoptimized={img.imageUrl.includes('ibb.co')}
                        />
                      )}
                      <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                        {service.tags.map(tag => (
                          <Badge key={tag} className="bg-white/95 backdrop-blur-sm text-foreground hover:bg-white border-none shadow-sm px-4 py-1.5 text-[9px] uppercase tracking-[0.15em] font-bold">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <span className="bg-white text-foreground px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl flex items-center gap-2">
                          Ver Detalhes <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-6 md:p-8 space-y-4 flex flex-col">
                      <div className="flex justify-between items-baseline gap-2">
                        <h3 className="text-2xl font-headline font-semibold text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                        <span className="text-primary font-bold font-headline text-xl shrink-0">{service.price}</span>
                      </div>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed font-light line-clamp-2">
                        {service.description}
                      </p>
                      
                      <div className="pt-4 mt-auto flex items-center justify-between border-t border-primary/10">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-accent">Saiba Mais</span>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-background rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative aspect-[4/5] md:aspect-auto h-[300px] md:h-full">
                      {img && (
                        <Image 
                          src={img.imageUrl} 
                          alt={service.title}
                          fill
                          className="object-cover"
                          unoptimized={img.imageUrl.includes('ibb.co')}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-6 left-6">
                         <Badge className="bg-primary text-white border-none px-4 py-2 text-lg font-headline">
                           {service.price}
                         </Badge>
                      </div>
                    </div>

                    <div className="p-8 md:p-12 space-y-8 flex flex-col justify-center">
                      <DialogHeader className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                          <Sparkles className="w-5 h-5" />
                          <span className="text-xs uppercase tracking-[0.3em] font-bold">Protocolo Exclusivo</span>
                        </div>
                        <DialogTitle className="text-4xl md:text-5xl font-headline text-foreground leading-tight">
                          {service.title}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed text-lg font-light">
                          {service.fullDescription}
                        </p>
                        
                        <div className="space-y-3 pt-4">
                          {service.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                              <span className="font-light">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-8 flex flex-col gap-4">
                        <Button size="lg" className="h-16 rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-3 text-base shadow-lg shadow-primary/20">
                          <MessageCircle className="w-5 h-5" />
                          Agendar via WhatsApp
                        </Button>
                        <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                          Duração média: 2h • Manutenção recomendada: 21 dias
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>
      </div>
    </section>
  )
}

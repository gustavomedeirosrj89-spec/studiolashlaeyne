
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

const services = [
  {
    title: "Volume Brasileiro",
    price: "R$ 180",
    description: "Ideal para o dia a dia. Oferece volume moderado com um acabamento leve e fios super macios.",
    imageId: "brazilian-volume",
    tags: ["Mais Pedido", "Volume"]
  },
  {
    title: "Fox Eyes",
    price: "R$ 220",
    description: "O queridinho do momento. Alonga o olhar para um efeito 'olho de raposa' sofisticado e sensual.",
    imageId: "fox-eyes",
    tags: ["Tendência", "Lifting"]
  },
  {
    title: "Clássico Fio a Fio",
    price: "R$ 150",
    description: "Para quem busca discrição. Realça os cílios naturais de forma elegante e quase imperceptível.",
    imageId: "classic-lashes",
    tags: ["Natural", "Leveza"]
  }
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header Organizado */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24">
          <div className="space-y-4 max-w-2xl">
            <h4 className="text-accent uppercase tracking-[0.4em] font-medium text-[10px] md:text-xs">Catálogo Exclusivo</h4>
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

        {/* Grid de Estilos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, idx) => {
            const img = PlaceHolderImages.find(i => i.id === service.imageId)
            return (
              <div 
                key={idx} 
                className="group flex flex-col h-full bg-card rounded-[2.5rem] overflow-hidden border border-primary/5 hover:border-primary/20 transition-all duration-700 hover:shadow-2xl graceful-reveal" 
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
                    />
                  )}
                  {/* Tags com design limpo */}
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    {service.tags.map(tag => (
                      <Badge key={tag} className="bg-white/95 backdrop-blur-sm text-foreground hover:bg-white border-none shadow-sm px-4 py-1.5 text-[9px] uppercase tracking-[0.15em] font-bold">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                
                <div className="flex-1 p-8 md:p-10 space-y-6 flex flex-col">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-3xl font-headline font-semibold text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                    <span className="text-primary font-bold font-headline text-2xl">{service.price}</span>
                  </div>
                  
                  <p className="text-muted-foreground text-base leading-relaxed font-light">
                    {service.description}
                  </p>
                  
                  <div className="pt-6 mt-auto flex items-center justify-between border-t border-primary/10">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />)}
                    </div>
                    <Button variant="ghost" className="p-0 h-auto text-[11px] uppercase tracking-[0.2em] font-bold text-accent hover:text-primary transition-all flex items-center gap-2">
                      Saber Mais <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

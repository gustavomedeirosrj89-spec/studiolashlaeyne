
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
        <div className="flex flex-col md:row justify-between items-start md:items-end gap-6 mb-12 md:mb-20">
          <div className="space-y-4 max-w-2xl">
            <h4 className="text-accent uppercase tracking-[0.3em] font-medium text-xs">Catálogo Exclusivo</h4>
            <h2 className="text-4xl md:text-6xl font-headline leading-tight">Nossos <span className="text-primary italic">Estilos</span></h2>
            <p className="text-muted-foreground font-light text-lg md:text-xl">
              Selecione a arquitetura ideal para o formato dos seus olhos e seu estilo de vida.
            </p>
          </div>
          <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/10 tracking-[0.1em] uppercase text-xs h-12 px-8">
            Ver Tabela Completa
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, idx) => {
            const img = PlaceHolderImages.find(i => i.id === service.imageId)
            return (
              <div 
                key={idx} 
                className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-primary/5 hover:border-primary/20 transition-all duration-500 hover:shadow-xl graceful-reveal" 
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  {img && (
                    <Image 
                      src={img.imageUrl} 
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      data-ai-hint={img.imageHint}
                    />
                  )}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {service.tags.map(tag => (
                      <Badge key={tag} className="bg-white/90 backdrop-blur-sm text-foreground hover:bg-white border-none shadow-sm px-3 py-1 text-[9px] uppercase tracking-widest font-bold">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="flex-1 p-6 md:p-8 space-y-4 flex flex-col">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-headline font-semibold text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                    <span className="text-primary font-bold font-headline text-xl">{service.price}</span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">
                    {service.description}
                  </p>
                  
                  <div className="pt-4 mt-auto flex items-center justify-between border-t border-primary/5">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                    </div>
                    <Button variant="ghost" className="p-0 h-auto text-[10px] uppercase tracking-[0.2em] font-bold text-accent group-hover:gap-3 transition-all">
                      Saber Mais <ArrowRight className="w-4 h-4 ml-2" />
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


import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
    imageId: "hero-lash",
    tags: ["Natural", "Leveza"]
  }
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-headline">Nossos Estilos</h2>
            <p className="text-muted-foreground italic font-light text-lg">Selecione a arquitetura ideal para o formato dos seus olhos e seu estilo de vida.</p>
          </div>
          <Button variant="link" className="text-primary p-0 h-auto font-medium tracking-[0.2em] uppercase text-xs">Ver Tabela Completa</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, idx) => {
            const img = PlaceHolderImages.find(i => i.id === service.imageId)
            return (
              <div key={idx} className="group space-y-6 graceful-reveal" style={{ animationDelay: `${idx * 0.2}s` }}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lg">
                  {img && (
                    <Image 
                      src={img.imageUrl} 
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint={img.imageHint}
                    />
                  )}
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    {service.tags.map(tag => (
                      <Badge key={tag} className="bg-background/90 backdrop-blur-md text-foreground hover:bg-background border-none shadow-sm px-4 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 px-2">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="text-2xl font-headline font-semibold">{service.title}</h3>
                    <span className="text-lg font-headline text-accent">{service.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "Volume Brasileiro",
    price: "A partir de R$ 180",
    description: "O visual clássico. Cílios leves que proporcionam um efeito multidimensional e delicado.",
    imageId: "brazilian-volume",
    tags: ["Assinatura", "Volume"]
  },
  {
    title: "Fox Eyes",
    price: "A partir de R$ 220",
    description: "Arquitetado para alongar e levantar o olhar. Mapeamento especializado para um efeito amendoado.",
    imageId: "fox-eyes",
    tags: ["Lifting", "Drama"]
  },
  {
    title: "Clássico Fio a Fio",
    price: "A partir de R$ 150",
    description: "Aplicação 1:1 para uma aparência natural e elegante. Perfeito para o luxo do dia a dia.",
    imageId: "hero-lash",
    tags: ["Natural", "Essencial"]
  }
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-6xl font-headline">Nosso Portfólio</h2>
            <p className="text-muted-foreground italic font-light text-lg">Explore nossas arquiteturas especializadas e técnicas de volume pensadas para a mulher moderna.</p>
          </div>
          <Button variant="link" className="text-primary p-0 h-auto font-medium tracking-[0.2em] uppercase text-xs">Ver todos os serviços</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {services.map((service, idx) => {
            const img = PlaceHolderImages.find(i => i.id === service.imageId)
            return (
              <div key={idx} className="group space-y-6 graceful-reveal" style={{ animationDelay: `${idx * 0.2}s` }}>
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lg">
                  {img && (
                    <Image 
                      src={img.imageUrl} 
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint={img.imageHint}
                    />
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {service.tags.map(tag => (
                      <Badge key={tag} className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background border-none shadow-sm">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="text-2xl font-headline font-semibold">{service.title}</h3>
                    <span className="text-sm font-medium text-accent whitespace-nowrap">{service.price}</span>
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

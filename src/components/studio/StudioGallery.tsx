
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function StudioGallery() {
  const studioImg = PlaceHolderImages.find(img => img.id === "studio-vibe")
  const techImg = PlaceHolderImages.find(img => img.id === "technique-detail")

  return (
    <section className="py-20 px-6 bg-secondary/20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-headline">O Ambiente Perfeito para Sua <span className="text-primary italic">Transformação</span></h2>
              <p className="text-muted-foreground font-light text-lg leading-relaxed">
                Cada detalhe do nosso estúdio foi projetado para oferecer o máximo de conforto e relaxamento enquanto você cuida da sua beleza. Utilizamos as técnicas mais modernas e materiais premium do mercado.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-headline text-2xl text-primary">Atendimento</h4>
                <p className="text-sm text-muted-foreground">Personalizado e focado na arquitetura do seu olhar.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-headline text-2xl text-primary">Materiais</h4>
                <p className="text-sm text-muted-foreground">Importados e hipoalergênicos para sua segurança.</p>
              </div>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-xl">
                  {studioImg && (
                    <Image 
                      src={studioImg.imageUrl} 
                      alt={studioImg.description}
                      fill
                      className="object-cover"
                      data-ai-hint={studioImg.imageHint}
                    />
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-xl">
                  {techImg && (
                    <Image 
                      src={techImg.imageUrl} 
                      alt={techImg.description}
                      fill
                      className="object-cover"
                      data-ai-hint={techImg.imageHint}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Elementos Decorativos */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

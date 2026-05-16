
"use client"

import { useState } from "react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  ArrowRight, 
  Star, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Calendar, 
  Clock 
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const services = [
  {
    id: "russian",
    title: "Volume Russo",
    price: "R$ 250",
    description: "Glamour extremo e densidade máxima.",
    fullDescription: "A técnica de Volume Russo consiste na aplicação de pequenos 'fans' feitos à mão sobre cada cílio natural. O resultado é um olhar com densidade incrível e textura aveludada incomparável.",
    imageId: "russian-volume",
    tags: ["Luxo", "Densidade"],
    benefits: ["Preenchimento máximo", "Efeito 5D a 7D", "Ideal para eventos de gala"]
  },
  {
    id: "brazilian",
    title: "Volume Brasileiro",
    price: "R$ 180",
    description: "Volume moderado com fios em formato de Y.",
    fullDescription: "Utiliza fios tecnológicos em Y que proporcionam volume e leveza simultaneamente. É o equilíbrio perfeito entre o clássico e o dramático.",
    imageId: "brazilian-volume",
    tags: ["Mais Pedido", "Natural"],
    benefits: ["Leveza absoluta", "Visual moderno", "Ótima retenção"]
  },
  {
    id: "fox",
    title: "Fox Eyes",
    price: "R$ 220",
    description: "Efeito lifting e olhar sensual alongado.",
    fullDescription: "Mapeamento estratégico que alonga o canto externo dos olhos, criando um efeito de lifting imediato inspirado nas supermodelos internacionais.",
    imageId: "fox-eyes",
    tags: ["Tendência", "Lifting"],
    benefits: ["Olhar sensual", "Correção de pálpebra", "Design arquitetônico"]
  },
  {
    id: "classic",
    title: "Clássico Fio a Fio",
    price: "R$ 150",
    description: "Elegância discreta e naturalidade pura.",
    fullDescription: "Aplicação individual de um fio sintético sobre um fio natural. Perfeito para quem deseja o efeito de 'rímel perfeito' todos os dias.",
    imageId: "classic-lashes",
    tags: ["Clean Girl", "Natural"],
    benefits: ["Conforto total", "Realce sutil", "Ideal para o dia a dia"]
  }
]

export function Portfolio() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: ""
  })

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedService || !formData.name || !formData.date || !formData.time) {
      alert("Por favor, preencha todos os campos para o agendamento.")
      return
    }

    const message = `Olá! Gostaria de agendar o procedimento ${selectedService.title.toUpperCase()} ✨
Meu nome é ${formData.name}.
Data desejada: ${formData.date}.
Horário desejado: ${formData.time}.`

    const whatsappUrl = `https://wa.me/5588996363178?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="portfolio" className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24">
          <div className="space-y-4 max-w-2xl">
            <h4 className="text-accent uppercase tracking-[0.4em] font-medium text-[10px] md:text-xs">Procedimentos Exclusivos</h4>
            <h2 className="text-5xl md:text-7xl font-headline leading-[0.9] text-foreground">
              Nosso <br />
              <span className="text-primary italic">Catálogo</span>
            </h2>
            <p className="text-muted-foreground font-light text-lg md:text-xl max-w-lg leading-relaxed pt-2">
              Selecione a técnica ideal para realçar a arquitetura do seu olhar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, idx) => {
            const img = PlaceHolderImages.find(i => i.id === service.imageId)
            return (
              <Dialog key={service.id}>
                <DialogTrigger asChild>
                  <div 
                    onClick={() => setSelectedService(service)}
                    className="group flex flex-col h-full bg-card rounded-[2rem] overflow-hidden border border-primary/5 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl graceful-reveal cursor-pointer" 
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {img && (
                        <Image 
                          src={img.imageUrl} 
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          unoptimized={img.imageUrl.includes('ibb.co')}
                        />
                      )}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                        {service.tags.map(tag => (
                          <Badge key={tag} className="bg-white/90 backdrop-blur-sm text-foreground hover:bg-white border-none shadow-sm px-3 py-1 text-[8px] uppercase tracking-wider font-bold">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <span className="bg-white/90 text-foreground px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">
                          Agendar Agora
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-baseline gap-2">
                        <h3 className="text-xl font-headline font-semibold text-foreground">{service.title}</h3>
                        <span className="text-primary font-bold font-headline text-lg">{service.price}</span>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed font-light line-clamp-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-background rounded-[2rem] shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative aspect-square md:aspect-auto h-[250px] md:h-full">
                      {img && (
                        <Image 
                          src={img.imageUrl} 
                          alt={service.title}
                          fill
                          className="object-cover"
                          unoptimized={img.imageUrl.includes('ibb.co')}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-6 left-6">
                         <Badge className="bg-primary text-white border-none px-4 py-2 text-xl font-headline">
                           {service.price}
                         </Badge>
                      </div>
                    </div>

                    <div className="p-8 md:p-10 space-y-6 flex flex-col justify-center">
                      <DialogHeader className="space-y-2">
                        <div className="flex items-center gap-2 text-primary">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Procedimento Premium</span>
                        </div>
                        <DialogTitle className="text-3xl md:text-4xl font-headline text-foreground leading-tight">
                          {service.title}
                        </DialogTitle>
                        <p className="text-muted-foreground leading-relaxed text-sm font-light">
                          {service.fullDescription}
                        </p>
                      </DialogHeader>

                      <form onSubmit={handleBooking} className="space-y-4 pt-4 border-t border-primary/10">
                        <div className="space-y-2">
                          <Label className="text-[10px] uppercase tracking-widest font-bold">Seu Nome Completo</Label>
                          <Input 
                            required
                            placeholder="Ex: Maria Silva" 
                            className="h-12 bg-secondary/20 border-primary/10 focus:border-primary/30"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold">Data Desejada</Label>
                            <Input 
                              required
                              type="date" 
                              className="h-12 bg-secondary/20 border-primary/10"
                              value={formData.date}
                              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold">Horário</Label>
                            <Input 
                              required
                              type="time" 
                              className="h-12 bg-secondary/20 border-primary/10"
                              value={formData.time}
                              onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                            />
                          </div>
                        </div>

                        <Button type="submit" className="w-full h-14 rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/20 mt-4">
                          <MessageCircle className="w-5 h-5" />
                          Confirmar Agendamento
                        </Button>
                      </form>
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

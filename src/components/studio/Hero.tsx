
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight, Sparkles, Star, Clock, Calendar, CheckCircle2 } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const WHATSAPP_MESSAGE = "Oi, tudo bem? gostaria de marcar um agendamento. qual dia e horario você tem disponivel?"
const WHATSAPP_URL = `https://wa.me/5588996363178?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

const topPickServices = [
  { 
    id: "vol-brasileiro", 
    name: "Volume Brasileiro", 
    price: "R$ 180", 
    tag: "Mais Amado",
    maintenance: "21 dias",
    description: "Moderno e marcante.",
    fullDescription: "Fios em formato de Y que proporcionam volume moderado com extrema leveza. É a escolha perfeita para quem quer sair do clássico sem perder a sofisticação.",
    benefits: ["Leveza absoluta", "Visual preenchido", "Ótima retenção"]
  },
  { 
    id: "vol-russo", 
    name: "Volume Russo", 
    price: "R$ 250", 
    tag: "Premium",
    maintenance: "21 a 25 dias",
    description: "Glamour e densidade.",
    fullDescription: "Fans artesanais criados fio a fio para um olhar com textura aveludada e densidade máxima. O auge do luxo em extensões de cílios.",
    benefits: ["Densidade máxima", "Efeito 5D a 7D", "Textura aveludada"]
  },
  { 
    id: "fox-eyes", 
    name: "Fox Eyes", 
    price: "R$ 220", 
    tag: "Tendência",
    maintenance: "21 dias",
    description: "Efeito lifting sensual.",
    fullDescription: "Mapeamento estratégico que alonga o canto externo para um olhar de supermodelo, criando um efeito lifting imediato e sofisticado.",
    benefits: ["Olhar sensual", "Lifting visual", "Design arquitetônico"]
  }
]

export function Hero() {
  const specialistImg = PlaceHolderImages.find(img => img.id === "specialist-photo")
  const [formData, setFormData] = useState({ name: "", date: "", time: "" })

  const handleBooking = (title: string) => (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Olá! Vi no site o estilo ${title.toUpperCase()} e gostaria de agendar!\nNome: ${formData.name}\nData: ${formData.date}\nHora: ${formData.time}`
    window.open(`https://wa.me/5588996363178?text=${encodeURIComponent(msg)}`, "_blank")
  }

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Texto Principal */}
          <div className="lg:col-span-7 space-y-10 graceful-reveal text-center lg:text-left mx-auto lg:mx-0">
            <div className="space-y-6">
              <h4 className="text-accent uppercase tracking-[0.4em] font-bold text-[10px] md:text-xs">
                Laeyne | Lash Specialist
              </h4>
              <h1 className="text-5xl md:text-8xl font-headline font-light leading-[1.1] text-foreground">
                A Arte de <br />
                <span className="italic font-serif text-primary">Realçar Olhares.</span>
              </h1>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-light leading-relaxed mx-auto lg:mx-0">
                Experimente o luxo de um olhar renovado com nossas técnicas exclusivas. Design sob medida para sua beleza única e natural.
              </p>
              <p className="text-sm md:text-base text-muted-foreground/80 max-w-lg font-light italic border-l-2 border-primary/20 pl-4 mx-auto lg:mx-0">
                Fundado por Laeyne, o estúdio transforma olhares com delicadeza, elegância e atenção aos mínimos detalhes. Especializada em lash design, oferece um atendimento pensado para realçar a beleza natural e elevar a autoestima através de um olhar marcante e sofisticado.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Button asChild size="lg" className="rounded-full px-10 h-16 bg-primary text-white hover:bg-primary/90 flex gap-3 w-full sm:w-auto text-base shadow-lg shadow-primary/20 transition-all">
                <Link href={WHATSAPP_URL} target="_blank">
                  <MessageCircle className="w-5 h-5" />
                  Agendar Agora
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-10 h-16 border-primary text-primary hover:bg-primary/10 flex gap-3 w-full sm:w-auto text-base transition-all">
                <Link href="/estilos">
                  Nossos Estilos
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Cards de Destaque no Hero */}
            <div className="pt-12 space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-accent">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Mais Desejados do Estúdio</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {topPickServices.map((pick, i) => {
                  const img = PlaceHolderImages.find(img => img.id === pick.id)
                  return (
                    <Dialog key={pick.id}>
                      <DialogTrigger asChild>
                        <div 
                          className="group relative bg-white/50 backdrop-blur-sm p-3 rounded-3xl border border-primary/5 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all duration-500 graceful-reveal cursor-pointer" 
                          style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                        >
                          <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-3">
                            {img && (
                              <Image 
                                src={img.imageUrl} 
                                alt={pick.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            )}
                            <Badge className="absolute top-2 left-2 bg-primary/90 text-white border-none text-[8px] uppercase tracking-tighter px-2 py-0.5">
                              {pick.tag}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-left">
                            <div className="flex items-center gap-1 text-primary">
                              <Star className="w-2.5 h-2.5 fill-primary" />
                              <span className="text-[8px] font-bold uppercase tracking-widest">Favorito</span>
                            </div>
                            <h4 className="text-xs font-headline font-bold text-foreground line-clamp-1">{pick.name}</h4>
                            <div className="flex justify-between items-center">
                              <p className="text-[10px] text-primary font-bold">{pick.price}</p>
                              <p className="text-[8px] text-muted-foreground uppercase font-medium">Manut. {pick.maintenance}</p>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>

                      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-none rounded-[3rem] shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <div className="relative aspect-square md:aspect-auto">
                            {img && <Image src={img.imageUrl} alt={pick.name} fill className="object-cover" />}
                            <div className="absolute inset-0 bg-black/20" />
                          </div>
                          <div className="p-10 space-y-8 overflow-y-auto max-h-[90vh]">
                            <div className="space-y-4 text-left">
                              <div className="flex items-center gap-2 text-primary">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-[10px] uppercase tracking-widest font-bold">Arquitetura do Olhar</span>
                              </div>
                              <DialogTitle className="text-4xl font-headline leading-tight">{pick.name}</DialogTitle>
                              <p className="text-muted-foreground font-light leading-relaxed">{pick.fullDescription}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-secondary/30 rounded-2xl text-left">
                                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Manutenção Ideal</p>
                                <div className="flex items-center gap-2 text-primary">
                                  <Clock className="w-4 h-4" />
                                  <span className="font-semibold">{pick.maintenance}</span>
                                </div>
                              </div>
                              <div className="p-4 bg-primary/10 rounded-2xl text-left">
                                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Investimento</p>
                                <p className="text-2xl font-headline text-primary">{pick.price}</p>
                              </div>
                            </div>

                            <form onSubmit={handleBooking(pick.name)} className="space-y-4 text-left">
                              <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold">Seu Nome</Label>
                                <Input 
                                  required 
                                  placeholder="Ex: Maria Silva" 
                                  className="h-12 bg-secondary/20 border-primary/10" 
                                  value={formData.name}
                                  onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <Input 
                                  type="date" 
                                  required 
                                  className="h-12 bg-secondary/20" 
                                  value={formData.date}
                                  onChange={(e) => setFormData(p => ({...p, date: e.target.value}))}
                                />
                                <Input 
                                  type="time" 
                                  required 
                                  className="h-12 bg-secondary/20" 
                                  value={formData.time}
                                  onChange={(e) => setFormData(p => ({...p, time: e.target.value}))}
                                />
                              </div>
                              <Button className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-white uppercase font-bold tracking-widest flex gap-3 shadow-xl shadow-primary/20">
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
          </div>

          {/* Quadro da Especialista */}
          <div className="lg:col-span-5 relative graceful-reveal" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-full aspect-[4/5] max-w-[450px] mx-auto">
              <div className="absolute inset-0 border border-primary/20 rounded-[3rem] translate-x-4 translate-y-4 -z-10" />
              
              <div className="w-full h-full blob-frame bg-secondary/30 relative shadow-2xl">
                {specialistImg && (
                  <Image 
                    src={specialistImg.imageUrl} 
                    alt="Laeyne Specialist"
                    fill
                    className="object-cover"
                    data-ai-hint="beauty specialist"
                    unoptimized={specialistImg.imageUrl.includes('ibb.co')}
                  />
                )}
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Atendimento</p>
                    <p className="text-sm font-semibold text-foreground">Exclusivo & VIP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px] -z-10" />
    </section>
  )
}

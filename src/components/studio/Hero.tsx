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
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-background">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Texto Principal */}
          <div className="lg:col-span-7 space-y-12 text-center lg:text-left mx-auto lg:mx-0">
            <div className="space-y-6 graceful-reveal">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="h-[1px] w-8 bg-primary/40" />
                <h4 className="text-accent uppercase tracking-[0.6em] font-black text-[9px] md:text-[10px]">
                  Laeyne | Lash Specialist
                </h4>
              </div>
              <h1 className="text-5xl md:text-8xl font-headline font-light leading-[1.05] text-foreground">
                A Arte de <br />
                <span className="italic font-serif text-primary relative inline-block">
                  Realçar Olhares.
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 20" fill="none">
                    <path d="M5 15C100 5 300 5 395 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/20" />
                  </svg>
                </span>
              </h1>
            </div>
            
            <div className="space-y-8 graceful-reveal" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-light leading-relaxed mx-auto lg:mx-0">
                Onde a precisão técnica encontra o luxo minimalista. Design exclusivo para elevar sua beleza natural.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Button asChild size="lg" className="rounded-full px-12 h-16 bg-primary text-white hover:bg-primary/90 flex gap-3 text-lg font-bold uppercase tracking-widest shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 group">
                  <Link href={WHATSAPP_URL} target="_blank">
                    <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    Agendar Agora
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="rounded-full px-12 h-16 text-primary hover:bg-primary/5 flex gap-3 text-lg font-bold uppercase tracking-widest transition-all">
                  <Link href="/estilos">
                    Explorar Coleção
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Coleção Destaque */}
            <div className="pt-16 space-y-8 graceful-reveal" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-primary/60">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Curadoria Especializada</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {topPickServices.map((pick, i) => {
                  const img = PlaceHolderImages.find(img => img.id === pick.id)
                  return (
                    <Dialog key={pick.id}>
                      <DialogTrigger asChild>
                        <div 
                          className="group bg-white/40 backdrop-blur-md p-4 rounded-[2rem] border border-white/20 hover:border-primary/20 hover:bg-white/80 hover:shadow-2xl transition-all duration-700 cursor-pointer"
                        >
                          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-4">
                            {img && (
                              <Image 
                                src={img.imageUrl} 
                                alt={pick.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                          <div className="space-y-2 text-left">
                            <h4 className="text-sm font-headline font-bold text-foreground">{pick.name}</h4>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-primary">{pick.price}</span>
                              <span className="text-[9px] uppercase tracking-tighter text-muted-foreground">Manut. {pick.maintenance}</span>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>

                      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-none rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <div className="relative aspect-square md:aspect-auto">
                            {img && <Image src={img.imageUrl} alt={pick.name} fill className="object-cover" />}
                            <div className="absolute inset-0 bg-black/10" />
                          </div>
                          <div className="p-12 space-y-10 overflow-y-auto max-h-[90vh]">
                            <div className="space-y-4">
                              <Badge className="bg-primary/10 text-primary border-none text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">Destaque do Estúdio</Badge>
                              <DialogTitle className="text-5xl font-headline leading-tight">{pick.name}</DialogTitle>
                              <p className="text-muted-foreground font-light text-lg leading-relaxed">{pick.fullDescription}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <div className="p-6 bg-secondary/30 rounded-3xl border border-white/20">
                                <p className="text-[10px] uppercase font-black text-muted-foreground mb-2">Manutenção</p>
                                <div className="flex items-center gap-2 text-primary">
                                  <Clock className="w-4 h-4" />
                                  <span className="font-bold">{pick.maintenance}</span>
                                </div>
                              </div>
                              <div className="p-6 bg-primary/10 rounded-3xl border border-primary/5">
                                <p className="text-[10px] uppercase font-black text-muted-foreground mb-2">Investimento</p>
                                <p className="text-3xl font-headline text-primary font-bold">{pick.price}</p>
                              </div>
                            </div>

                            <form onSubmit={handleBooking(pick.name)} className="space-y-6 text-left">
                              <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-2">Identificação</Label>
                                <Input 
                                  required 
                                  placeholder="Seu nome completo" 
                                  className="h-14 bg-secondary/10 border-primary/5 rounded-2xl focus:ring-primary/20" 
                                  value={formData.name}
                                  onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <Input 
                                  type="date" 
                                  required 
                                  className="h-14 bg-secondary/10 border-primary/5 rounded-2xl" 
                                  value={formData.date}
                                  onChange={(e) => setFormData(p => ({...p, date: e.target.value}))}
                                />
                                <Input 
                                  type="time" 
                                  required 
                                  className="h-14 bg-secondary/10 border-primary/5 rounded-2xl" 
                                  value={formData.time}
                                  onChange={(e) => setFormData(p => ({...p, time: e.target.value}))}
                                />
                              </div>
                              <Button className="w-full h-16 rounded-full bg-primary hover:bg-primary/90 text-white uppercase font-black tracking-widest flex gap-3 shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02]">
                                <MessageCircle className="w-6 h-6" />
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

          {/* Imagem da Especialista */}
          <div className="lg:col-span-5 relative graceful-reveal" style={{ animationDelay: '0.6s' }}>
            <div className="relative w-full aspect-[4/5] max-w-[480px] mx-auto">
              <div className="absolute inset-0 bg-primary/10 rounded-[4rem] translate-x-6 translate-y-6 -z-10" />
              
              <div className="w-full h-full blob-frame bg-secondary/30 relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group">
                {specialistImg && (
                  <Image 
                    src={specialistImg.imageUrl} 
                    alt="Laeyne Specialist"
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-105"
                    data-ai-hint="beauty specialist"
                    unoptimized={specialistImg.imageUrl.includes('ibb.co')}
                  />
                )}
                {/* Overlay de Textura */}
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
              </div>

              {/* Tag Flutuante */}
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[2rem] shadow-2xl border border-primary/5 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <Star className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] font-black text-primary mb-1">Especialista</p>
                    <p className="text-lg font-headline font-bold text-foreground">Laeyne Studio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

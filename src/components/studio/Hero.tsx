
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight, Star, Clock } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const WHATSAPP_URL = "https://wa.me/5588996363178?text=Oi%2C%20tudo%20bem%3F%20gostaria%20de%20marcar%20um%20agendamento.%20qual%20dia%20e%20horario%20voc%C3%AA%20tem%20disponivel%3F"

const topPickServices = [
  { 
    id: "vol-brasileiro", 
    name: "Volume Brasileiro", 
    price: "R$ 180", 
    tag: "Mais Amado",
    maintenance: "21 dias",
    description: "Moderno e marcante.",
    fullDescription: "Fios em formato de Y que proporcionam volume moderado com extrema leveza. É a escolha perfeita para quem quer sair do clássico sem perder a sofisticação.",
  },
  { 
    id: "vol-russo", 
    name: "Volume Russo", 
    price: "R$ 250", 
    tag: "Premium",
    maintenance: "21 a 25 dias",
    description: "Glamour e densidade.",
    fullDescription: "Fans artesanais criados fio a fio para um olhar com textura aveludada e densidade máxima. O auge do luxo em extensões de cílios.",
  },
  { 
    id: "fox-eyes", 
    name: "Fox Eyes", 
    price: "R$ 220", 
    tag: "Tendência",
    maintenance: "21 dias",
    description: "Efeito lifting sensual.",
    fullDescription: "Mapeamento estratégico que alonga o canto externo para um olhar de supermodelo, criando um efeito lifting imediato e sofisticado.",
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
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-12 text-center lg:text-left">
            <div className="space-y-6 graceful-reveal">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="h-[1px] w-8 bg-primary/40" />
                <h4 className="text-accent uppercase tracking-[0.6em] font-black text-[10px]">
                  Laeyne | Lash Specialist
                </h4>
              </div>
              <h1 className="text-5xl md:text-8xl font-headline font-light leading-[1.05] text-foreground">
                A Arte de <br />
                <span className="italic font-serif text-primary">Realçar Olhares.</span>
              </h1>
            </div>
            
            <div className="space-y-8 graceful-reveal" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-light leading-relaxed mx-auto lg:mx-0">
                Onde a precisão técnica encontra o luxo minimalista. Design exclusivo para elevar sua beleza natural.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Button asChild size="lg" className="rounded-full px-12 h-16 bg-primary text-white hover:bg-primary/90 flex gap-3 text-lg font-bold uppercase tracking-widest shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 group">
                  <Link href={WHATSAPP_URL} target="_blank">
                    <MessageCircle className="w-6 h-6" />
                    Agendar Agora
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="rounded-full px-12 h-16 text-primary hover:bg-primary/5 flex gap-3 text-lg font-bold uppercase tracking-widest transition-all">
                  <Link href="/estilos">
                    Ver Catálogo
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="pt-16 space-y-8 graceful-reveal" style={{ animationDelay: '0.4s' }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {topPickServices.map((pick) => {
                  const img = PlaceHolderImages.find(img => img.id === pick.id)
                  return (
                    <Dialog key={pick.id}>
                      <DialogTrigger asChild>
                        <div className="group bg-white/40 backdrop-blur-md p-4 rounded-[2rem] border border-white/20 hover:border-primary/20 hover:bg-white/80 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl">
                          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-4">
                            {img && <Image src={img.imageUrl} alt={pick.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />}
                          </div>
                          <div className="space-y-1 text-left">
                            <h4 className="text-xs font-bold uppercase tracking-wider">{pick.name}</h4>
                            <p className="text-primary font-bold text-sm">{pick.price}</p>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-none rounded-[3rem] shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <div className="relative aspect-square md:aspect-auto">
                            {img && <Image src={img.imageUrl} alt={pick.name} fill className="object-cover" />}
                          </div>
                          <div className="p-10 space-y-8 overflow-y-auto max-h-[85vh]">
                            <DialogHeader className="space-y-4 text-left">
                              <div className="flex flex-col gap-4">
                                <Badge className="bg-primary/10 text-primary border-none text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full w-fit">Exclusivo</Badge>
                                <DialogTitle className="text-4xl font-headline">{pick.name}</DialogTitle>
                              </div>
                              <p className="text-muted-foreground font-light leading-relaxed">{pick.fullDescription}</p>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-6 bg-secondary/30 rounded-3xl">
                                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Manutenção</p>
                                <div className="flex items-center gap-2 text-primary">
                                  <Clock className="w-4 h-4" />
                                  <span className="font-bold text-sm">{pick.maintenance}</span>
                                </div>
                              </div>
                              <div className="p-6 bg-primary/10 rounded-3xl">
                                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Valor</p>
                                <p className="text-2xl font-headline text-primary font-bold">{pick.price}</p>
                              </div>
                            </div>
                            <form onSubmit={handleBooking(pick.name)} className="space-y-4">
                              <Input required placeholder="Seu nome" className="h-14 bg-secondary/10 border-none rounded-2xl" value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))} />
                              <div className="grid grid-cols-2 gap-4">
                                <Input type="date" required className="h-14 bg-secondary/10 border-none rounded-2xl" value={formData.date} onChange={(e) => setFormData(p => ({...p, date: e.target.value}))} />
                                <Input type="time" required className="h-14 bg-secondary/10 border-none rounded-2xl" value={formData.time} onChange={(e) => setFormData(p => ({...p, time: e.target.value}))} />
                              </div>
                              <Button className="w-full h-16 rounded-full bg-primary hover:bg-primary/90 text-white uppercase font-black tracking-widest flex gap-3 shadow-lg">
                                <MessageCircle className="w-6 h-6" />
                                Agendar no WhatsApp
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

          <div className="lg:col-span-5 relative graceful-reveal" style={{ animationDelay: '0.6s' }}>
            <div className="relative w-full aspect-[4/5] max-w-[450px] mx-auto">
              <div className="absolute inset-0 bg-primary/10 rounded-[4rem] translate-x-6 translate-y-6 -z-10" />
              <div className="w-full h-full blob-frame bg-secondary/30 relative shadow-2xl overflow-hidden group">
                {specialistImg && (
                  <Image 
                    src={specialistImg.imageUrl} 
                    alt="Laeyne Specialist"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    unoptimized={specialistImg.imageUrl.includes('ibb.co')}
                  />
                )}
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[2rem] shadow-xl border border-primary/5 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white">
                    <Star className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest font-black text-primary">Especialista</p>
                    <p className="text-lg font-headline font-bold">Laeyne Studio</p>
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


"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight, Star, Clock, Sparkles } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const WHATSAPP_URL = "https://wa.me/5588996363178?text=Oi%2C%20tudo%20bem%3F%20gostaria%20de%20marcar%20um%20agendamento.%20qual%20dia%20e%20horario%20voc%C3%AA%20tem%20disponivel%3F"

const ALL_TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", 
  "17:00", "17:30", "18:00"
]

const topPickServices = [
  { 
    id: "vol-brasileiro", 
    name: "Volume Brasileiro", 
    price: "R$ 180", 
    category: "Mais Amado",
    maintenance: "21 dias",
    description: "Moderno e marcante.",
    fullDescription: "Fios em formato de Y que proporcionam volume moderado com extrema leveza. É a escolha perfeita para quem quer sair do clássico sem perder a sofisticação.",
  },
  { 
    id: "vol-egipcio", 
    name: "Volume Egípcio", 
    price: "R$ 190", 
    category: "Tecnológico",
    maintenance: "21 dias",
    description: "Preenchimento e durabilidade.",
    fullDescription: "A técnica que utiliza fios em W para criar um efeito de volume denso e marcante com excelente retenção e leveza absoluta.",
  },
  { 
    id: "fox-eyes", 
    name: "Fox Eyes", 
    price: "R$ 220", 
    category: "Tendência",
    maintenance: "21 dias",
    description: "Efeito lifting sensual.",
    fullDescription: "Mapeamento estratégico que alonga o canto externo para um olhar de supermodelo, criando um efeito lifting imediato e sofisticado.",
  }
]

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({ name: "", date: "", time: "" })
  const specialistImg = PlaceHolderImages.find(img => img.id === "specialist-photo")

  useEffect(() => {
    setMounted(true)
  }, [])

  const availableTimeSlots = useMemo(() => {
    if (!formData.date) return ALL_TIME_SLOTS
    const selectedDate = new Date(formData.date + 'T00:00:00')
    const dayOfWeek = selectedDate.getDay() 

    if (dayOfWeek === 6) { // Sábado
      return ALL_TIME_SLOTS.filter(time => {
        const hour = parseInt(time.split(":")[0])
        return hour < 14
      })
    }
    return ALL_TIME_SLOTS
  }, [formData.date])

  const handleBooking = (title: string) => (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Olá! Vi no site o estilo ${title.toUpperCase()} e gostaria de agendar!\nNome: ${formData.name}\nData: ${formData.date}\nHora: ${formData.time}`
    window.open(`https://wa.me/5588996363178?text=${encodeURIComponent(msg)}`, "_blank")
  }

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-background">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center space-y-16">
        <div className="relative w-full aspect-square max-w-[350px] md:max-w-[450px] graceful-reveal">
          <div className="absolute inset-0 bg-primary/10 rounded-[4rem] translate-x-4 translate-y-4 -z-10" />
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
          <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-3xl shadow-xl border border-primary/5">
            <div className="flex items-center gap-3">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">Master Lash</p>
            </div>
          </div>
        </div>

        <div className="space-y-12 w-full">
          <div className="space-y-6 graceful-reveal">
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-primary/40" />
              <h4 className="text-accent uppercase tracking-[0.6em] font-black text-[10px]">
                Laeyne | Lash Specialist
              </h4>
              <div className="h-[1px] w-8 bg-primary/40" />
            </div>
            <h1 className="text-5xl md:text-8xl font-headline font-light leading-tight text-foreground">
              A Arte de <br />
              <span className="italic font-serif text-primary">Realçar Olhares.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Onde a precisão técnica encontra o luxo minimalista. Design exclusivo para elevar sua beleza natural.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center graceful-reveal" style={{ animationDelay: '0.2s' }}>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 graceful-reveal" style={{ animationDelay: '0.4s' }}>
            {topPickServices.map((pick) => {
              const img = PlaceHolderImages.find(img => img.id === pick.id)
              const titleWords = pick.name.split(' ')
              
              return (
                <Dialog key={pick.id}>
                  <DialogTrigger asChild>
                    <div className="group relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-all duration-700 hover:scale-[1.02]">
                      {img && (
                        <Image 
                          src={img.imageUrl} 
                          alt={pick.name} 
                          fill 
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          unoptimized={img.imageUrl.includes('ibb.co')}
                        />
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      
                      <div className="absolute top-6 left-6">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full">
                          <span className="text-white text-[8px] font-black uppercase tracking-[0.3em]">
                            {pick.category}
                          </span>
                        </div>
                      </div>

                      <div className="absolute bottom-0 w-full p-6 space-y-4 text-left">
                        <div className="space-y-2">
                          <h4 className="text-2xl font-headline text-white leading-tight">
                            {titleWords.map((word, i) => (
                              <span key={i} className="block">{word}</span>
                            ))}
                          </h4>
                          <p className="text-white/60 text-[10px] font-light italic tracking-wide">
                            {pick.description}
                          </p>
                        </div>

                        <div className="w-full h-[1px] bg-white/20" />

                        <div className="flex justify-between items-end">
                          <div className="flex flex-col">
                            <span className="text-white font-headline text-2xl">{pick.price}</span>
                            <span className="text-white/40 text-[7px] font-black uppercase tracking-[0.2em]">MANUT. {pick.maintenance.toUpperCase()}</span>
                          </div>
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[1000px] p-0 overflow-y-auto bg-background border-none rounded-[2.5rem] shadow-2xl max-h-[90vh]">
                    <DialogHeader className="sr-only">
                      <DialogTitle>{pick.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      <div className="lg:col-span-5 relative aspect-square lg:aspect-auto h-[250px] lg:h-auto">
                        {img && <Image src={img.imageUrl} alt={pick.name} fill className="object-cover" />}
                      </div>
                      <div className="lg:col-span-7 p-6 md:p-10 space-y-8">
                        <div className="space-y-4 text-left">
                          <div className="flex flex-col gap-4">
                            <Badge className="bg-primary/10 text-primary border-none text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full w-fit">Destaque</Badge>
                            <h2 className="text-4xl font-headline leading-tight">{pick.name}</h2>
                          </div>
                          <p className="text-muted-foreground font-light leading-relaxed">{pick.fullDescription}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-6 bg-secondary/30 rounded-[2rem] flex flex-col items-center justify-center text-center">
                            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Manutenção</p>
                            <div className="flex items-center gap-2 text-primary">
                              <Clock className="w-4 h-4" />
                              <span className="font-bold text-sm">{pick.maintenance}</span>
                            </div>
                          </div>
                          <div className="p-6 bg-primary/10 rounded-[2rem] flex flex-col items-center justify-center text-center">
                            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Valor</p>
                            <p className="text-2xl font-headline text-primary font-bold">{pick.price}</p>
                          </div>
                        </div>
                        <form onSubmit={handleBooking(pick.name)} className="space-y-4 pt-6 border-t border-primary/10">
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-2">Agendar Horário</Label>
                            <Input required placeholder="Seu nome" className="h-14 bg-secondary/10 border-none rounded-2xl" value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))} />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input type="date" required className="h-14 bg-secondary/10 border-none rounded-2xl" value={formData.date} onChange={(e) => setFormData(p => ({...p, date: e.target.value}))} />
                            <Select onValueChange={(val) => setFormData(p => ({...p, time: val}))} required>
                              <SelectTrigger className="h-14 bg-secondary/10 border-none rounded-2xl focus:ring-0">
                                <SelectValue placeholder="Horário" />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-none shadow-xl">
                                {availableTimeSlots.map(time => (
                                  <SelectItem key={time} value={time} className="rounded-xl">
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full h-16 rounded-full bg-primary hover:bg-primary/90 text-white uppercase font-black tracking-widest flex gap-3 shadow-lg">
                            <MessageCircle className="w-6 h-6" />
                            AGENDAR VIA WHATSAPP
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
    </section>
  )
}

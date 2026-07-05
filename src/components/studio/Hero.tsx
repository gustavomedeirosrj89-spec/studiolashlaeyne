
"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight, Star, Clock, Sparkles, Calendar as CalendarIcon } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, parseISO, addMinutes, isBefore, startOfDay, getDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore"
import { useFirestore } from "@/firebase"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"
import { cn } from "@/lib/utils"

const WHATSAPP_URL = "https://wa.me/5588996363178?text=Oi%2C%20tudo%20bem%3F%20gostaria%20de%20marcar%20un%20agendamento.%20qual%20dia%20e%20horario%20voc%C3%AA%20tem%20disponivel%3F"

const SERVICE_TYPES = [
  { id: "cilios_completo", label: "Cílios completo (aplicação)", duration: 180 },
  { id: "manutencao", label: "Manutenção", duration: 90 },
]

const topPickServices = [
  { 
    id: "vol-brasileiro", 
    name: "Volume Brasileiro", 
    price: "R$ 90", 
    category: "Mais Amado",
    maintenance: "R$ 60",
    description: "Moderno e marcante.",
    fullDescription: "Fios em formato de Y que proporcionam volume moderado com extrema leveza. É a escolha perfeita para quem quer sair do clássico sem perder a sofisticação.",
  },
  { 
    id: "vol-egipcio", 
    name: "Volume Egípcio", 
    price: "R$ 90", 
    category: "Tecnológico",
    maintenance: "R$ 65",
    description: "Preenchimento e durabilidade.",
    fullDescription: "A técnica que utiliza fios em W para criar um efeito de volume denso e marcante com excelente retenção e leveza absoluta.",
  },
  { 
    id: "fox-eyes", 
    name: "Fox Eyes", 
    price: "R$ 110", 
    category: "Tendência",
    maintenance: "R$ 65",
    description: "Efeito lifting sensual.",
    fullDescription: "Mapeamento estratégico que alonga o canto externo para um olhar de supermodelo, criando um efeito lifting imediato e sofisticado.",
  }
]

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({ name: "", serviceType: "", date: "", time: "" })
  const [existingBookings, setExistingBookings] = useState<any[]>([])
  const firestore = useFirestore()
  const specialistImg = PlaceHolderImages.find(img => img.id === "specialist-photo")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function fetchBookings() {
      if (!firestore || !formData.date) return
      const q = query(collection(firestore, "appointments"), where("date", "==", formData.date))
      const querySnapshot = await getDocs(q)
      const bookings = querySnapshot.docs.map(doc => doc.data())
      setExistingBookings(bookings)
    }
    fetchBookings()
  }, [firestore, formData.date])

  const availableTimeSlots = useMemo(() => {
    if (!formData.date || !formData.serviceType) return []

    const selectedService = SERVICE_TYPES.find(s => s.id === formData.serviceType)
    if (!selectedService) return []

    const selectedDate = parseISO(formData.date)
    const dayOfWeek = getDay(selectedDate) 
    
    if (dayOfWeek === 0) return []

    const isSaturday = dayOfWeek === 6
    const closingTime = new Date(selectedDate)
    closingTime.setHours(isSaturday ? 14 : 17, isSaturday ? 0 : 30, 0, 0)

    let lastAvailableStartTime = new Date(selectedDate)
    if (formData.serviceType === 'cilios_completo') {
      // Regra especial: Último horário fixo às 17:00 (Seg-Sex) ou 13:30 (Sábado)
      lastAvailableStartTime.setHours(isSaturday ? 13 : 17, isSaturday ? 30 : 0, 0, 0)
    } else {
      // Regra normal: Início + Duração <= Fechamento
      lastAvailableStartTime = new Date(closingTime.getTime() - (selectedService.duration * 60000))
    }

    const slots: string[] = []
    let currentSlot = new Date(selectedDate)
    currentSlot.setHours(isSaturday ? 8 : 9, 0, 0, 0)

    while (currentSlot <= lastAvailableStartTime) {
      const slotEndTime = addMinutes(currentSlot, selectedService.duration)
      
      const isConflicting = existingBookings.some(booking => {
        const [bH, bM] = booking.time.split(':').map(Number)
        const bStart = new Date(selectedDate)
        bStart.setHours(bH, bM, 0, 0)
        const bDuration = booking.duration || 90
        const bEnd = addMinutes(bStart, bDuration)
        
        const newStart = currentSlot
        const newEnd = slotEndTime

        return (newStart < bEnd && bStart < newEnd)
      })

      if (!isConflicting) {
        slots.push(format(currentSlot, "HH:mm"))
      }

      currentSlot = addMinutes(currentSlot, 30)
    }

    return slots
  }, [formData.date, formData.serviceType, existingBookings])

  const handleBooking = (title: string) => (e: React.FormEvent) => {
    e.preventDefault()
    
    const selectedService = SERVICE_TYPES.find(s => s.id === formData.serviceType)

    if (firestore) {
      const data = {
        clientName: formData.name,
        serviceName: title,
        tipoServico: formData.serviceType,
        duration: selectedService?.duration || 0,
        date: formData.date,
        time: formData.time,
        status: "pendente",
        createdAt: serverTimestamp(),
      }
      
      addDoc(collection(firestore, "appointments"), data).catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: "appointments",
          operation: "create",
          requestResourceData: data,
        })
        errorEmitter.emit("permission-error", permissionError)
      });
    }

    const dataFormatada = formData.date ? format(parseISO(formData.date), "dd/MM/yyyy") : ""
    const serviceLabel = selectedService?.label || ""
    const msg = `Olá! Vi no site o estilo ${title.toUpperCase()} (${serviceLabel}) e gostaria de agendar!\nNome: ${formData.name}\nData: ${dataFormatada}\nHora: ${formData.time}`
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

          <div className="grid grid-cols-1 gap-12 graceful-reveal" style={{ animationDelay: '0.4s' }}>
            {topPickServices.map((pick) => {
              const img = PlaceHolderImages.find(img => img.id === pick.id)
              const titleWords = pick.name.split(' ')
              
              return (
                <Dialog key={pick.id}>
                  <DialogTrigger asChild>
                    <div className="group relative aspect-[4/5] w-full max-w-[480px] mx-auto rounded-[3.5rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-700 hover:scale-[1.01]">
                      {img && (
                        <Image 
                          src={img.imageUrl} 
                          alt={pick.name} 
                          fill 
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          unoptimized={img.imageUrl.includes('ibb.co')}
                        />
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                      
                      <div className="absolute top-10 left-10">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full">
                          <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap">
                            {pick.category}
                          </span>
                        </div>
                      </div>

                      <div className="absolute bottom-0 w-full p-10 md:p-14 space-y-8 text-left">
                        <div className="space-y-4">
                          <h4 className="text-4xl md:text-6xl font-headline text-white leading-[0.85] tracking-tight">
                            {titleWords.map((word, i) => (
                              <span key={i} className="block">{word}</span>
                            ))}
                          </h4>
                          <p className="text-white/60 text-sm md:text-base font-light italic tracking-wide">
                            {pick.description}
                          </p>
                        </div>

                        <div className="w-full h-[1px] bg-white/20" />

                        <div className="flex justify-between items-end">
                          <div className="flex flex-col space-y-1">
                            <span className="text-white font-headline text-3xl md:text-5xl block leading-none">{pick.price}</span>
                            <span className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] block pt-1">MANUT. {pick.maintenance.toUpperCase()}</span>
                          </div>
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
                            <ArrowRight className="w-7 h-7 md:w-9 md:h-9" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[1000px] p-0 overflow-y-auto bg-background border-none rounded-[3.5rem] shadow-2xl max-h-[90vh] z-[150]">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      <div className="lg:col-span-5 relative h-[350px] lg:h-auto">
                        {img && <Image src={img.imageUrl} alt={pick.name} fill className="object-cover" unoptimized={img.imageUrl.includes('ibb.co')} />}
                      </div>
                      <div className="lg:col-span-7 p-10 md:p-14 space-y-10">
                        <DialogHeader className="space-y-4 text-left">
                          <div className="flex items-center gap-2 text-primary">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black">Procedimento VIP</span>
                          </div>
                          <DialogTitle className="text-4xl md:text-5xl font-headline leading-tight font-bold text-foreground">{pick.name}</DialogTitle>
                          <p className="text-muted-foreground font-light text-base leading-relaxed max-w-lg">{pick.fullDescription}</p>
                        </DialogHeader>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-8 bg-secondary/30 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-2">
                            <p className="text-[9px] uppercase font-black tracking-[0.3em] text-muted-foreground">Manutenção</p>
                            <div className="flex items-center gap-3 text-primary">
                              <Clock className="w-5 h-5" />
                              <span className="text-xl font-bold">{pick.maintenance}</span>
                            </div>
                          </div>
                          <div className="p-8 bg-primary/10 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-2 border border-primary/10">
                            <p className="text-[9px] uppercase font-black tracking-[0.3em] text-muted-foreground">Investimento</p>
                            <p className="text-3xl font-headline text-primary font-bold">{pick.price}</p>
                          </div>
                        </div>
                        <form onSubmit={handleBooking(pick.name)} className="space-y-6 text-left border-t border-primary/10 pt-10 pb-8">
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground ml-4">Nome Completo</Label>
                            <Input required placeholder="Seu nome" className="h-14 bg-secondary/10 border-none rounded-2xl px-6" value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))} />
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground ml-4">Tipo de Serviço *</Label>
                            <Select onValueChange={(val) => setFormData(p => ({...p, serviceType: val, date: "", time: ""}))} required>
                              <SelectTrigger className="h-14 bg-secondary/10 border-none rounded-2xl px-6 focus:ring-0">
                                <SelectValue placeholder="Selecione o serviço" />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-none shadow-xl z-[200]">
                                {SERVICE_TYPES.map(st => (
                                  <SelectItem key={st.id} value={st.id} className="rounded-xl">
                                    {st.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground ml-4">Data</Label>
                              <Popover modal={true}>
                                <PopoverTrigger asChild>
                                  <Button
                                    type="button"
                                    disabled={!formData.serviceType}
                                    variant={"outline"}
                                    className={cn(
                                      "h-14 w-full justify-start text-left font-normal bg-secondary/10 border-none rounded-2xl px-6",
                                      !formData.date && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.date ? format(parseISO(formData.date), "dd 'de' MMMM", { locale: ptBR }) : <span>Escolha a data</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent 
                                  className="w-[340px] p-0 rounded-3xl border-none shadow-2xl z-[300] bg-white overflow-hidden" 
                                  align="center"
                                  side="top"
                                  sideOffset={10}
                                >
                                  <Calendar
                                    mode="single"
                                    selected={formData.date ? parseISO(formData.date) : undefined}
                                    onSelect={(date) => {
                                      setFormData(p => ({ ...p, date: date ? format(date, "yyyy-MM-dd") : "" }));
                                    }}
                                    disabled={(date) => date < startOfDay(new Date()) || getDay(date) === 0}
                                    initialFocus
                                    locale={ptBR}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground ml-4">Horário</Label>
                              <Select onValueChange={(val) => setFormData(p => ({...p, time: val}))} required disabled={!formData.date}>
                                <SelectTrigger className="h-14 bg-secondary/10 border-none rounded-2xl px-6 focus:ring-0">
                                  <SelectValue placeholder="Selecione o horário" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-xl z-[200]">
                                  {availableTimeSlots.map(time => (
                                    <SelectItem key={time} value={time} className="rounded-xl">
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button className="w-full h-20 rounded-full bg-primary hover:bg-primary/90 text-white uppercase font-black tracking-[0.25em] flex gap-4 shadow-2xl transition-all hover:scale-[1.02]">
                            <MessageCircle className="w-7 h-7" />
                            CONFIRMAR NO WHATSAPP
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

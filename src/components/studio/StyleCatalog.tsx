"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, MessageCircle, Clock, ArrowRight, Calendar as CalendarIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, parseISO, addMinutes, isBefore, startOfDay, getDay } from "date-fns"
import { ptBR } from "date-fns/locale"
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

const SERVICE_TYPES = [
  { id: "cilios_completo", label: "Cílios completo (aplicação)", duration: 180 },
  { id: "manutencao", label: "Manutenção", duration: 90 },
]

const styles = [
  {
    id: "express",
    title: "Volume Express",
    category: "Praticidade",
    price: "R$ 75",
    duration: "45min",
    maintenance: "R$ 45",
    description: "Versão express mais rápida e leve.",
    fullDescription: "A cliente pode escolher qualquer estilo disponível do catálogo, porém aplicado na versão express com procedimento mais rápido e leve. Ideal para quem tem pouco tempo.",
    imageId: "lash-express",
    benefits: ["Rapidez", "Leveza", "Qualquer estilo"],
    tags: ["Naturais", "Mais Procurados"]
  },
  {
    id: "fio",
    title: "Efeito Rímel",
    category: "Natural",
    price: "R$ 90",
    duration: "1h 30min",
    maintenance: "R$ 50",
    description: "Naturalidade pura.",
    fullDescription: "Aplicação individual para um efeito de 'rímel perfeito' e elegância discreta. Ideal para o uso cotidiano.",
    imageId: "fio-a-fio",
    benefits: ["Naturalidade", "Conforto", "Dia a dia"],
    tags: ["Naturais"]
  },
  {
    id: "sirena",
    title: "Efeito Sirena",
    category: "Delicadeza",
    price: "R$ 80",
    duration: "1h 40min",
    maintenance: "R$ 50",
    description: "Um efeito natural, delicado e menos preenchido, trazendo leveza e elegância ao olhar.",
    fullDescription: "Um efeito natural, delicado e menos preenchido, trazendo leveza e elegância ao olhar. Ideal para quem busca um realce sofisticado sem excessos.",
    imageId: "sirena-effect",
    benefits: ["Leveza", "Naturalidade", "Elegância"],
    tags: ["Naturais", "Premium"]
  },
  {
    id: "brazilian",
    title: "Volume Brasileiro",
    category: "Mais Procurado",
    price: "R$ 90",
    duration: "2h",
    maintenance: "R$ 60",
    description: "Moderno e marcante.",
    fullDescription: "Fios em formato de Y que proporcionam volume moderado com extrema leveza. Queridinho do estúdio.",
    imageId: "vol-brasileiro",
    benefits: ["Efeito moderno", "Leveza", "Visual preenchido"],
    tags: ["Mais Procurados"]
  },
  {
    id: "egyptian",
    title: "Volume Egípcio",
    category: "Tendência",
    price: "R$ 90",
    duration: "2h",
    maintenance: "R$ 65",
    description: "Volume tecnológico em W.",
    fullDescription: "Fios em formato de W que garantem um volume mais denso que o brasileiro, com excelente retenção e um visual moderno e preenchido.",
    imageId: "vol-egipcio",
    benefits: ["Alta retenção", "Visual tecnológico", "Preenchimento ideal"],
    tags: ["Volumosos", "Premium"]
  },
  {
    id: "brazilian-marrom",
    title: "Volume Marrom",
    category: "Tendência",
    price: "R$ 90",
    duration: "2h",
    maintenance: "R$ 65",
    description: "Elegância sutil e natural.",
    fullDescription: "A técnica queridinha agora em tons de marrom chocolate. Perfeito para loiras ou para quem busca um olhar suave e sofisticado.",
    imageId: "vol-brasileiro-marrom",
    benefits: ["Efeito ultra natural", "Suavidade no olhar", "Ideal para peles claras"],
    tags: ["Naturais", "Premium"]
  },
  {
    id: "fox",
    title: "Fox Eyes",
    category: "Premium",
    price: "R$ 110",
    duration: "2h 15min",
    maintenance: "R$ 65",
    description: "Efeito lifting sensual.",
    fullDescription: "Mapeamento que alonga o canto externo para um olhar de supermodelo, criando um efeito lifting imediato.",
    imageId: "fox-eyes",
    benefits: ["Lifting visual", "Sensualidade", "Design moderno"],
    tags: ["Premium", "Mais Procurados"]
  }
]

const categories = ["Todos", "Naturais", "Volumosos", "Mais Procurados", "Premium"]

export function StyleCatalog() {
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [formData, setFormData] = useState({ name: "", serviceType: "", date: "", time: "" })
  const [mounted, setMounted] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [existingBookings, setExistingBookings] = useState<any[]>([])
  const firestore = useFirestore()

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
    const startHour = isSaturday ? 8 : 9
    const endHour = isSaturday ? 14 : 17
    const endMinute = isSaturday ? 0 : 30

    const slots: string[] = []
    const closingTime = new Date(selectedDate)
    closingTime.setHours(endHour, endMinute, 0)

    let currentSlot = new Date(selectedDate)
    currentSlot.setHours(startHour, 0, 0)

    while (true) {
      const slotEndTime = addMinutes(currentSlot, selectedService.duration)
      if (isBefore(closingTime, slotEndTime)) break

      const timeString = format(currentSlot, "HH:mm")
      const isConflicting = existingBookings.some(booking => {
        const bStart = parseISO(`${booking.date}T${booking.time}`)
        const bDuration = booking.duration || 90
        const bEnd = addMinutes(bStart, bDuration)
        return (currentSlot < bEnd && bStart < slotEndTime)
      })

      if (!isConflicting) slots.push(timeString)
      currentSlot = addMinutes(currentSlot, selectedService.duration)
    }
    return slots
  }, [formData.date, formData.serviceType, existingBookings])

  const filteredStyles = styles.filter(style => 
    activeFilter === "Todos" || style.tags.includes(activeFilter)
  )

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
      })
    }

    const dataFormatada = formData.date ? format(parseISO(formData.date), "dd/MM/yyyy") : ""
    const serviceLabel = selectedService?.label || ""
    const msg = `Olá! Gostaria de agendar: ${title.toUpperCase()} (${serviceLabel})\nNome: ${formData.name}\nData: ${dataFormatada}\nHora: ${formData.time}`
    window.open(`https://wa.me/5588996363178?text=${encodeURIComponent(msg)}`, "_blank")
  }

  if (!mounted) return null

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto space-y-16">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 graceful-reveal">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 border ${
              activeFilter === cat 
                ? "bg-primary text-white border-primary shadow-lg" 
                : "bg-white/40 text-muted-foreground border-transparent hover:border-primary/20 hover:bg-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-12 md:gap-20 items-center">
        {filteredStyles.map((style, idx) => {
          const img = PlaceHolderImages.find(i => i.id === style.imageId)
          const titleWords = style.title.split(' ')
          
          return (
            <Dialog key={style.id}>
              <DialogTrigger asChild>
                <div 
                  className="group relative aspect-[4/5] w-full max-w-[480px] rounded-[3.5rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-700 hover:scale-[1.01] graceful-reveal"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {img && (
                    <Image 
                      src={img.imageUrl} 
                      alt={style.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      unoptimized={img.imageUrl.includes('ibb.co')}
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  
                  <div className="absolute top-10 left-10">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full">
                      <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap">
                        {style.category}
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 w-full p-10 md:p-14 space-y-8 text-left">
                    <div className="space-y-4">
                      <h3 className="text-5xl md:text-7xl font-headline text-white leading-[0.85] tracking-tight">
                        {titleWords.map((word, i) => (
                          <span key={i} className="block">{word}</span>
                        ))}
                      </h3>
                      <p className="text-white/60 text-sm md:text-base font-light italic tracking-wide">
                        {style.description}
                      </p>
                    </div>

                    <div className="w-full h-[1px] bg-white/20" />

                    <div className="flex justify-between items-end">
                      <div className="flex flex-col space-y-1">
                        <span className="text-white font-headline text-4xl md:text-6xl block leading-none">
                          {style.price}
                        </span>
                        <span className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] block pt-1">
                          MANUTENÇÃO {style.maintenance.toUpperCase()}
                        </span>
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
                    {img && (
                      <Image 
                        src={img.imageUrl} 
                        alt={style.title} 
                        fill 
                        className="object-cover" 
                        unoptimized={img.imageUrl.includes('ibb.co')}
                      />
                    )}
                  </div>

                  <div className="lg:col-span-7 p-10 md:p-14 space-y-10">
                    <DialogHeader className="space-y-4 text-left">
                      <div className="flex items-center gap-2 text-primary">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black">Procedimento VIP</span>
                      </div>
                      <DialogTitle className="text-4xl md:text-5xl font-headline leading-tight font-bold text-foreground">
                        {style.title}
                      </DialogTitle>
                      <p className="text-muted-foreground font-light text-base leading-relaxed max-w-lg">
                        {style.fullDescription}
                      </p>
                    </DialogHeader>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-8 bg-secondary/30 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-2">
                        <p className="text-[9px] uppercase font-black tracking-[0.3em] text-muted-foreground">Manutenção</p>
                        <div className="flex items-center gap-3 text-primary">
                          <Clock className="w-5 h-5" />
                          <span className="text-xl font-bold">{style.maintenance}</span>
                        </div>
                      </div>
                      <div className="p-8 bg-primary/10 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-2 border border-primary/10">
                        <p className="text-[9px] uppercase font-black tracking-[0.3em] text-muted-foreground">Investimento</p>
                        <p className="text-3xl font-headline text-primary font-bold">{style.price}</p>
                      </div>
                    </div>

                    <form onSubmit={handleBooking(style.title)} className="space-y-6 text-left border-t border-primary/10 pt-10 pb-8">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground ml-4">Seu Nome</Label>
                        <Input required placeholder="Nome completo" className="h-14 bg-secondary/10 border-none rounded-2xl px-6" value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))} />
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
                          <Popover open={calendarOpen} onOpenChange={setCalendarOpen} modal={true}>
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
                                  setCalendarOpen(false);
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
                        AGENDAR NO WHATSAPP
                      </Button>
                    </form>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )
        })}
      </div>
    </section>
  )
}

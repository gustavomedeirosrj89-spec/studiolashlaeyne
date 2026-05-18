
"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, MessageCircle, Clock, ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ALL_TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", 
  "17:00", "17:30", "18:00"
]

const styles = [
  {
    id: "fio",
    title: "Efeito Rimel",
    category: "Natural",
    price: "R$ 150",
    duration: "1h 30min",
    maintenance: "15 a 30 dias",
    description: "Naturalidade pura.",
    fullDescription: "Aplicação individual para um efeito de 'rímel perfeito' e elegância discreta. Ideal para o uso cotidiano.",
    imageId: "fio-a-fio",
    benefits: ["Naturalidade", "Conforto", "Dia a dia"],
    tags: ["Naturais"]
  },
  {
    id: "brazilian",
    title: "Volume Brasileiro",
    category: "Mais Procurado",
    price: "R$ 180",
    duration: "2h",
    maintenance: "21 dias",
    description: "Moderno e marcante.",
    fullDescription: "Fios em formato de Y que proporcionam volume moderado com extrema leveza. Queridinho do estúdio.",
    imageId: "vol-brasileiro",
    benefits: ["Efeito moderno", "Leveza", "Visual preenchido"],
    tags: ["Mais Procurados"]
  },
  {
    id: "brazilian-marrom",
    title: "Volume Brasileiro Marrom",
    category: "Tendência",
    price: "R$ 200",
    duration: "2h",
    maintenance: "21 dias",
    description: "Elegância sutil e natural.",
    fullDescription: "A técnica queridinha agora em tons de marrom chocolate. Perfeito para loiras ou para quem busca um olhar suave e sofisticado.",
    imageId: "vol-brasileiro-marrom",
    benefits: ["Efeito ultra natural", "Suavidade no olhar", "Ideal para peles claras"],
    tags: ["Naturais", "Premium"]
  },
  {
    id: "egyptian",
    title: "Volume Egípcio",
    category: "Tendência",
    price: "R$ 190",
    duration: "2h",
    maintenance: "21 dias",
    description: "Volume tecnológico em W.",
    fullDescription: "Fios em formato de W que garantem um volume mais denso que o brasileiro, com excelente retenção e um visual moderno e preenchido.",
    imageId: "vol-egipcio",
    benefits: ["Alta retenção", "Visual tecnológico", "Preenchimento ideal"],
    tags: ["Volumosos", "Premium"]
  },
  {
    id: "express",
    title: "Lash Express",
    category: "Praticidade",
    price: "R$ 120",
    duration: "1h",
    maintenance: "15 a 21 dias",
    description: "Preenchimento estratégico.",
    fullDescription: "A cliente escolhe o modelo desejado, mas a aplicação é realizada de forma estratégica para garantir rapidez sem perder a harmonia.",
    imageId: "lash-express",
    benefits: ["Rapidez", "Visual leve", "Preenchimento estratégico"],
    tags: ["Naturais"]
  },
  {
    id: "mega",
    title: "Mega Volume",
    category: "Premium",
    price: "R$ 300",
    duration: "3h",
    maintenance: "21 a 25 dias",
    description: "Intenso e sofisticado.",
    fullDescription: "Para quem busca o máximo de destaque. Olhar poderoso e arquitetura imponente com preenchimento total.",
    imageId: "mega-vol",
    benefits: ["Olhar intenso", "Volume extremo", "Editorial"],
    tags: ["Volumosos", "Premium"]
  },
  {
    id: "fox",
    title: "Fox Eyes",
    category: "Tendência",
    price: "R$ 220",
    duration: "2h 15min",
    maintenance: "21 dias",
    description: "Efeito lifting sensual.",
    fullDescription: "Mapeamento que alonga o canto externo para um olhar de supermodelo, criando um efeito lifting imediato.",
    imageId: "fox-eyes",
    benefits: ["Lifting visual", "Sensualidade", "Design moderno"],
    tags: ["Premium", "Mais Procurados"]
  },
  {
    id: "hybrid",
    title: "Estilo Híbrido",
    category: "Equilibrado",
    price: "R$ 170",
    duration: "1h 45min",
    maintenance: "15 a 21 dias",
    description: "Equilíbrio perfeito.",
    fullDescription: "A mistura ideal entre o clássico e o volume para um visual texturizado e moderno.",
    imageId: "hibrido",
    benefits: ["Textura", "Versatilidade", "Equilíbrio"],
    tags: ["Equilibrado"]
  }
]

const categories = ["Todos", "Naturais", "Volumosos", "Mais Procurados", "Premium", "Equilibrado"]

export function StyleCatalog() {
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [formData, setFormData] = useState({ name: "", date: "", time: "" })
  const [mounted, setMounted] = useState(false)

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

  const filteredStyles = styles.filter(style => 
    activeFilter === "Todos" || style.tags.includes(activeFilter)
  )

  const handleBooking = (title: string) => (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Olá! Gostaria de agendar: ${title.toUpperCase()}\nNome: ${formData.name}\nData: ${formData.date}\nHora: ${formData.time}`
    window.open(`https://wa.me/5588996363178?text=${encodeURIComponent(msg)}`, "_blank")
  }

  if (!mounted) return null

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto space-y-16">
      {/* Filtros Centralizados */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 graceful-reveal">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.25em] transition-all duration-300 border ${
              activeFilter === cat 
                ? "bg-primary text-white border-primary shadow-lg" 
                : "bg-white/40 text-muted-foreground border-transparent hover:border-primary/20 hover:bg-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Cards Unificado */}
      <div className="flex flex-col gap-12 md:gap-16 items-center">
        {filteredStyles.map((style, idx) => {
          const img = PlaceHolderImages.find(i => i.id === style.imageId)
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
                  
                  {/* Overlay Gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* Badge de Categoria */}
                  <div className="absolute top-8 left-10">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full">
                      <span className="text-white text-[9px] font-black uppercase tracking-[0.3em]">
                        {style.category}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="absolute bottom-0 w-full p-10 md:p-12 space-y-8">
                    <div className="space-y-3">
                      <h3 className="text-4xl md:text-5xl font-headline text-white leading-tight">
                        {style.title}
                      </h3>
                      <p className="text-white/60 text-sm font-light italic tracking-wide max-w-xs">
                        {style.description}
                      </p>
                    </div>

                    {/* Alinhamento Preço + Botão igual à referência */}
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <div className="flex flex-col space-y-1">
                        <span className="text-white font-headline text-4xl font-medium tracking-tight">
                          {style.price}
                        </span>
                        <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em]">
                          MANUT. {style.maintenance}
                        </span>
                      </div>
                      
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <ArrowRight className="w-7 h-7" />
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-[1000px] p-0 overflow-y-auto bg-background border-none rounded-[3.5rem] shadow-2xl max-h-[90vh]">
                <DialogTitle className="sr-only">{style.title}</DialogTitle>
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
                    <div className="space-y-4 text-left">
                      <div className="flex items-center gap-2 text-primary">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black">Procedimento VIP</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-headline leading-tight font-bold text-foreground">
                        {style.title}
                      </h2>
                      <p className="text-muted-foreground font-light text-base leading-relaxed max-w-lg">
                        {style.fullDescription}
                      </p>
                    </div>

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

                    <form onSubmit={handleBooking(style.title)} className="space-y-6 text-left border-t border-primary/10 pt-10">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground ml-4">Solicitar Agendamento</Label>
                        <Input 
                          required 
                          placeholder="Seu nome completo" 
                          className="h-14 bg-secondary/10 border-none rounded-2xl px-6" 
                          value={formData.name}
                          onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input 
                          type="date" 
                          required 
                          className="h-14 bg-secondary/10 border-none rounded-2xl px-6" 
                          value={formData.date}
                          onChange={(e) => setFormData(p => ({...p, date: e.target.value}))}
                        />
                        <Select onValueChange={(val) => setFormData(p => ({...p, time: val}))} required>
                          <SelectTrigger className="h-14 bg-secondary/10 border-none rounded-2xl px-6 focus:ring-0">
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

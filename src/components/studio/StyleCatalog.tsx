
"use client"

import { useState } from "react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, MessageCircle, Clock, CheckCircle2, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const styles = [
  {
    id: "fio",
    title: "Clássico Fio a Fio",
    category: "Natural",
    price: "R$ 150",
    duration: "1h 30min",
    maintenance: "15 a 21 dias",
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
    id: "russian",
    title: "Volume Russo",
    category: "Premium",
    price: "R$ 250",
    duration: "2h 30min",
    maintenance: "21 a 25 dias",
    description: "Glamour e densidade.",
    fullDescription: "Fans artesanais para um olhar com textura aveludada e densidade máxima. Perfeito para ocasiões especiais.",
    imageId: "vol-russo",
    benefits: ["Densidade máxima", "Textura aveludada", "Glamour"],
    tags: ["Volumosos", "Premium"]
  },
  {
    id: "mega",
    title: "Mega Volume",
    category: "Premium",
    price: "R$ 300",
    duration: "3h",
    maintenance: "21 a 25 dias",
    description: "Intenso e sofisticado.",
    fullDescription: "Para quem busca o máximo de destaque. Olhar poderoso e arquitetura imponente.",
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
    fullDescription: "Mapeamento que alonga o canto externo para um olhar de supermodelo.",
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
    fullDescription: "A mistura ideal entre o clássico e o volume para um visual texturizado.",
    imageId: "hibrido",
    benefits: ["Textura", "Versatilidade", "Equilíbrio"],
    tags: ["Naturais"]
  }
]

const categories = ["Todos", "Naturais", "Volumosos", "Mais Procurados", "Premium"]

export function StyleCatalog() {
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [formData, setFormData] = useState({ name: "", date: "", time: "" })

  const filteredStyles = styles.filter(style => 
    activeFilter === "Todos" || style.tags.includes(activeFilter)
  )

  const handleBooking = (title: string) => (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Olá! Gostaria de agendar: ${title.toUpperCase()}\nNome: ${formData.name}\nData: ${formData.date}\nHora: ${formData.time}`
    window.open(`https://wa.me/5588996363178?text=${encodeURIComponent(msg)}`, "_blank")
  }

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto space-y-16">
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeFilter === cat 
                ? "bg-primary text-white shadow-lg" 
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStyles.map((style, idx) => {
          const img = PlaceHolderImages.find(i => i.id === style.imageId)
          return (
            <Dialog key={style.id}>
              <DialogTrigger asChild>
                <div 
                  className="group relative h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-2 graceful-reveal"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {img && <Image src={img.imageUrl} alt={style.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 w-full p-8 space-y-4">
                    <Badge className="bg-primary/90 text-white border-none px-3 py-1 text-[8px] uppercase tracking-wider font-bold">
                      {style.category}
                    </Badge>
                    <div className="space-y-1 text-left">
                      <h3 className="text-3xl font-headline text-white">{style.title}</h3>
                      <p className="text-white/70 text-sm font-light italic">{style.description}</p>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <div className="flex flex-col text-left">
                        <span className="text-white font-headline text-2xl">{style.price}</span>
                        <span className="text-white/50 text-[8px] uppercase font-bold">Manut. {style.maintenance}</span>
                      </div>
                      <Button variant="ghost" className="text-white hover:bg-white/20 rounded-full px-6 text-xs uppercase tracking-widest">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-none rounded-[3rem] shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-square md:aspect-auto">
                    {img && <Image src={img.imageUrl} alt={style.title} fill className="object-cover" />}
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className="p-10 space-y-8 overflow-y-auto max-h-[90vh]">
                    <div className="space-y-4 text-left">
                      <div className="flex items-center gap-2 text-primary">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">Arquitetura do Olhar</span>
                      </div>
                      <DialogTitle className="text-4xl font-headline leading-tight">{style.title}</DialogTitle>
                      <p className="text-muted-foreground font-light leading-relaxed">{style.fullDescription}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary/30 rounded-2xl text-left">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Manutenção Ideal</p>
                        <div className="flex items-center gap-2 text-primary">
                          <Clock className="w-4 h-4" />
                          <span className="font-semibold">{style.maintenance}</span>
                        </div>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-2xl text-left">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Investimento</p>
                        <p className="text-2xl font-headline text-primary">{style.price}</p>
                      </div>
                    </div>

                    <form onSubmit={handleBooking(style.title)} className="space-y-4 text-left">
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
    </section>
  )
}

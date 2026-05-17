
"use client"

import { useState } from "react"
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

const styles = [
  {
    id: "fio",
    title: "Efeito Rimel",
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
    id: "brazilian-marrom",
    title: "Volume Brasileiro Marrom",
    category: "Tendência",
    price: "R$ 200",
    duration: "2h",
    maintenance: "21 dias",
    description: "Elegância sutil e natural.",
    fullDescription: "A técnica queridinha agora em tons de marrom chocolate. Perfeito para loiras ou para quem busca um olhar extremamente suave e sofisticado, sem o contraste pesado do preto.",
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
    maintenance: "Não se aplica",
    description: "Preenchimento estratégico.",
    fullDescription: "A cliente escolhe o modelo desejado (Brasileiro, Efeito Rimel, etc), mas a aplicação não é total. Realizamos um preenchimento estratégico para um visual harmônico com rapidez.",
    imageId: "lash-express",
    benefits: ["Rapidez", "Visual leve", "Preenchimento estratégico"],
    tags: ["Naturais"]
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
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-20">
      <div className="flex flex-wrap justify-center gap-4 graceful-reveal">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-500 border ${
              activeFilter === cat 
                ? "bg-primary text-white border-primary shadow-2xl shadow-primary/20 scale-105" 
                : "bg-white/40 text-muted-foreground border-transparent hover:border-primary/20 hover:bg-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStyles.map((style, idx) => {
          const img = PlaceHolderImages.find(i => i.id === style.imageId)
          return (
            <Dialog key={style.id}>
              <DialogTrigger asChild>
                <div 
                  className="group relative h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-lg transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl graceful-reveal"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {img && (
                    <Image 
                      src={img.imageUrl} 
                      alt={style.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      unoptimized={img.imageUrl.includes('ibb.co')}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent transition-opacity duration-700 group-hover:opacity-80" />
                  
                  <div className="absolute bottom-0 w-full p-8 space-y-4">
                    <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 px-3 py-1 text-[8px] uppercase tracking-[0.2em] font-black">
                      {style.category}
                    </Badge>
                    <div className="space-y-1 text-left">
                      <h3 className="text-3xl font-headline text-white font-bold leading-tight">{style.title}</h3>
                      <p className="text-white/60 text-sm font-light italic leading-relaxed">{style.description}</p>
                    </div>
                    
                    <div className="flex justify-between items-end pt-4 border-t border-white/10">
                      <div className="flex flex-col text-left">
                        <span className="text-white font-headline text-2xl font-bold tracking-tight">{style.price}</span>
                        <span className="text-white/40 text-[8px] uppercase font-black tracking-widest mt-1">Manut. {style.maintenance}</span>
                      </div>
                      <div className="bg-primary p-3 rounded-full text-white shadow-xl shadow-primary/20 group-hover:scale-110 transition-all duration-500">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-[1000px] p-0 overflow-hidden bg-background border-none rounded-[3.5rem] shadow-2xl animate-in zoom-in-95 duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
                  {/* Lado Esquerdo - Imagem Full */}
                  <div className="lg:col-span-5 relative h-[300px] lg:h-auto">
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

                  {/* Lado Direito - Conteúdo Editorial */}
                  <div className="lg:col-span-7 p-8 lg:p-14 bg-background flex flex-col justify-center space-y-10">
                    <div className="space-y-4 text-left">
                      <div className="flex items-center gap-2 text-primary">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black">Técnica Exclusiva</span>
                      </div>
                      <DialogTitle className="text-5xl lg:text-7xl font-headline leading-none font-bold text-foreground">
                        {style.title}
                      </DialogTitle>
                      <p className="text-muted-foreground font-light text-lg lg:text-xl leading-relaxed max-w-lg">
                        {style.fullDescription}
                      </p>
                    </div>

                    {/* Blocos de Informação (Cards de referência) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-8 bg-secondary/30 rounded-[2.5rem] border border-primary/5 flex flex-col items-center justify-center text-center space-y-2">
                        <p className="text-[9px] uppercase font-black tracking-[0.2em] text-muted-foreground">Ciclo de Manutenção</p>
                        <div className="flex items-center gap-3 text-primary">
                          <Clock className="w-4 h-4" />
                          <span className="text-xl font-bold tracking-tight">{style.maintenance}</span>
                        </div>
                      </div>
                      <div className="p-8 bg-primary/5 rounded-[2.5rem] border border-primary/10 flex flex-col items-center justify-center text-center space-y-2">
                        <p className="text-[9px] uppercase font-black tracking-[0.2em] text-muted-foreground">Valor do Procedimento</p>
                        <p className="text-4xl font-headline text-primary font-bold tracking-tight">{style.price}</p>
                      </div>
                    </div>

                    {/* Formulário de Dados */}
                    <form onSubmit={handleBooking(style.title)} className="space-y-6 text-left">
                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground ml-4">Dados da Cliente</Label>
                        <Input 
                          required 
                          placeholder="Seu nome completo" 
                          className="h-16 bg-secondary/10 border-none rounded-2xl focus:ring-primary/20 text-lg px-8 placeholder:text-muted-foreground/40" 
                          value={formData.name}
                          onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input 
                          type="date" 
                          required 
                          className="h-16 bg-secondary/10 border-none rounded-2xl px-8 focus:ring-primary/20" 
                          value={formData.date}
                          onChange={(e) => setFormData(p => ({...p, date: e.target.value}))}
                        />
                        <Input 
                          type="time" 
                          required 
                          className="h-16 bg-secondary/10 border-none rounded-2xl px-8 focus:ring-primary/20" 
                          value={formData.time}
                          onChange={(e) => setFormData(p => ({...p, time: e.target.value}))}
                        />
                      </div>
                      <Button className="w-full h-20 rounded-full bg-primary hover:bg-primary/90 text-white uppercase font-black tracking-[0.25em] flex gap-4 shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] text-sm md:text-base">
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
    </section>
  )
}

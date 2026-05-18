
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function CatalogCTA() {
  return (
    <section className="py-24 px-6 bg-[#1a1a1a] text-white overflow-hidden relative border-y border-white/5">
      {/* Elementos Decorativos de Fundo Sutil */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -ml-48 -mb-48" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-12 relative z-10">
        {/* Top Label Enquadrado */}
        <div className="flex items-center justify-center gap-4 text-primary/80 graceful-reveal">
          <div className="h-[1px] w-6 bg-primary/30" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold">
              ESTÉTICA DE LUXO
            </span>
          </div>
          <div className="h-[1px] w-6 bg-primary/30" />
        </div>

        {/* Headline Editorial */}
        <div className="space-y-6 graceful-reveal" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-5xl md:text-8xl font-headline leading-tight font-light">
            Descubra a <br />
            <span className="text-primary italic font-serif">Coleção Completa</span>
          </h2>
          <p className="text-white/50 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed italic">
            "A arte de realçar o olhar através de técnicas exclusivas e design arquitetônico."
          </p>
        </div>

        {/* Botão de Bloco de Luxo Retangular (Enquadrado) */}
        <div className="w-full max-w-md graceful-reveal px-4" style={{ animationDelay: '0.2s' }}>
          <Button 
            asChild 
            className="w-full h-auto min-h-[4rem] md:min-h-[5rem] rounded-none bg-primary hover:bg-primary/90 text-white transition-all duration-500 hover:scale-[1.01] active:scale-95 border-none p-6 shadow-2xl shadow-primary/10"
          >
            <Link href="/estilos" className="flex items-center justify-center">
              <span className="text-xs md:text-lg font-black uppercase tracking-[0.4em] leading-none text-center block w-full">
                CATÁLOGO COMPLETO
              </span>
            </Link>
          </Button>
        </div>

        {/* Footer da Seção Estilizado */}
        <div className="flex items-center gap-8 pt-8 graceful-reveal" style={{ animationDelay: '0.3s' }}>
          <div className="h-[1px] w-12 md:w-24 bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-primary/60 font-black">
            LAEYNE STUDIO VIP
          </span>
          <div className="h-[1px] w-12 md:w-24 bg-white/10" />
        </div>
      </div>
    </section>
  )
}

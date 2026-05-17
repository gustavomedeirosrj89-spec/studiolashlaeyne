
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

export function CatalogCTA() {
  return (
    <section className="py-16 px-6 bg-foreground text-background overflow-hidden relative">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-10 relative z-10">
        <div className="space-y-4 graceful-reveal">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold">Arquitetura de Luxo para seu Olhar</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-headline leading-tight">
            Descubra a <span className="text-primary italic">Coleção Completa</span>
          </h2>
          <p className="text-muted/60 font-light text-lg md:text-xl max-w-2xl mx-auto">
            Explore todas as nossas técnicas exclusivas e encontre o design perfeito para sua personalidade.
          </p>
        </div>

        <div className="graceful-reveal" style={{ animationDelay: '0.2s' }}>
          <Button 
            asChild 
            size="lg" 
            className="group relative h-20 md:h-24 px-12 md:px-20 rounded-full bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/40 transition-all duration-500 hover:scale-105 active:scale-95"
          >
            <Link href="/estilos" className="flex items-center gap-4">
              <span className="text-lg md:text-2xl font-bold uppercase tracking-[0.15em] whitespace-nowrap">
                VEJA NOSSO CATALOGO COMPLETO AQUI
              </span>
              <div className="bg-white/20 p-2 rounded-full group-hover:translate-x-2 transition-transform duration-300">
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
              </div>
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-8 pt-6 graceful-reveal" style={{ animationDelay: '0.4s' }}>
          <div className="h-[1px] w-12 md:w-24 bg-primary/30" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Experiência VIP</span>
          <div className="h-[1px] w-12 md:w-24 bg-primary/30" />
        </div>
      </div>
    </section>
  )
}

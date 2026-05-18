
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function CatalogCTA() {
  return (
    <section className="py-24 px-6 bg-[#1a1a1a] text-white overflow-hidden relative">
      {/* Elementos Decorativos de Fundo Sutil */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -ml-48 -mb-48" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-12 relative z-10">
        {/* Top Label */}
        <div className="flex items-center justify-center gap-3 text-primary/80 graceful-reveal">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold">
            Arquitetura de Luxo para seu Olhar
          </span>
        </div>

        {/* Headline Editorial */}
        <div className="space-y-6 graceful-reveal" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-5xl md:text-8xl font-headline leading-tight">
            Descubra a <br />
            <span className="text-primary italic font-serif">Coleção Completa</span>
          </h2>
          <p className="text-white/60 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore todas as nossas técnicas exclusivas e encontre o design perfeito para sua personalidade.
          </p>
        </div>

        {/* Botão de Bloco de Luxo com texto enquadrado */}
        <div className="w-full max-w-2xl graceful-reveal" style={{ animationDelay: '0.2s' }}>
          <Button 
            asChild 
            className="w-full h-auto min-h-[5rem] md:min-h-[6rem] rounded-none bg-primary hover:bg-primary/90 text-white transition-all duration-500 hover:scale-[1.02] active:scale-95 border-none p-4"
          >
            <Link href="/estilos" className="flex items-center justify-center text-center">
              <span className="text-sm md:text-lg lg:text-xl font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] leading-tight max-w-[90%]">
                VEJA NOSSO CATALOGO COMPLETO AQUI
              </span>
            </Link>
          </Button>
        </div>

        {/* Footer da Seção */}
        <div className="flex items-center gap-8 pt-12 graceful-reveal" style={{ animationDelay: '0.3s' }}>
          <div className="h-[1px] w-12 md:w-24 bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-primary/60 font-black">
            Experiência VIP
          </span>
          <div className="h-[1px] w-12 md:w-24 bg-white/10" />
        </div>
      </div>
    </section>
  )
}

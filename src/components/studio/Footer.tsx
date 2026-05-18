
'use client';

import Link from "next/link"
import { Instagram, MapPin, Clock, Mail, Sparkles, MessageCircle } from "lucide-react"

const WHATSAPP_MESSAGE = "Oi, tudo bem? gostaria de marcar um agendamento. qual dia e horario você tem disponivel?"
const WHATSAPP_URL = `https://wa.me/5588996363178?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

// Ícone do TikTok customizado
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-24 px-6 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
        
        {/* Logo Centralizada com Sparkles */}
        <div className="space-y-6 flex flex-col items-center graceful-reveal">
          <Link href="/" className="flex items-center gap-3 group">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary animate-pulse" />
            <span className="font-headline text-3xl md:text-4xl font-medium tracking-[0.15em] uppercase text-background">
              LAEYNE STUDIO
            </span>
          </Link>
          <p className="text-muted max-w-lg font-light leading-relaxed text-sm md:text-base italic">
            "Onde a arquitetura encontra a elegância. Proporcionamos as extensões de cílios mais avançadas em um ambiente sereno e luxuoso."
          </p>
        </div>

        {/* Informações de Contato Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 w-full max-w-4xl graceful-reveal" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col items-center space-y-4 group">
            <div className="p-4 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary">Localização</p>
            <p className="text-muted font-light text-sm md:text-base">Rua Major Felinto, 168 - Varzea</p>
          </div>
          <div className="flex flex-col items-center space-y-4 group">
            <div className="p-4 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary">Atendimento</p>
            <p className="text-muted font-light text-sm md:text-base">Seg - Sex: 09h às 19h | Sáb: 09h às 14h</p>
          </div>
        </div>

        {/* Redes Sociais Enquadradas */}
        <div className="flex gap-8 graceful-reveal" style={{ animationDelay: '0.2s' }}>
          <Link href="https://instagram.com" target="_blank" className="hover:text-primary transition-all hover:scale-110 p-3 bg-white/5 rounded-full" title="Instagram">
            <Instagram className="w-6 h-6" />
          </Link>
          <Link href={WHATSAPP_URL} target="_blank" className="hover:text-primary transition-all hover:scale-110 p-3 bg-white/5 rounded-full" title="WhatsApp">
            <MessageCircle className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-primary transition-all hover:scale-110 p-3 bg-white/5 rounded-full" title="TikTok">
            <TikTokIcon className="w-6 h-6" />
          </Link>
        </div>

        {/* Linha de Separação Fina */}
        <div className="w-full h-[1px] bg-white/10 max-w-5xl" />

        {/* Copyright Enquadrado */}
        <div className="space-y-4 text-[10px] md:text-xs text-muted/40 uppercase tracking-[0.4em] font-bold graceful-reveal" style={{ animationDelay: '0.3s' }}>
          <p>© 2026 LAEYNE STUDIO LASH. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-white/5" />
            <p className="text-primary/30">ARQUITETURA DE BELEZA</p>
            <div className="h-[1px] w-8 bg-white/5" />
          </div>
        </div>
      </div>
    </footer>
  )
}

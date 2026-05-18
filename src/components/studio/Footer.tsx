
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
    <footer className="bg-foreground text-background py-20 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-12">
        
        {/* Logo Centralizada com Sparkles */}
        <div className="space-y-6 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary animate-pulse" />
            <span className="font-headline text-3xl md:text-4xl font-medium tracking-[0.15em] uppercase text-background">
              LAEYNE STUDIO
            </span>
          </Link>
          <p className="text-muted max-w-lg font-light leading-relaxed text-sm md:text-base">
            Onde a arquitetura encontra a elegância. Proporcionamos as extensões de cílios mais avançadas em um ambiente sereno e luxuoso.
          </p>
        </div>

        {/* Informações de Contato Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full pt-4">
          <div className="flex flex-col items-center space-y-3">
            <MapPin className="w-5 h-5 text-primary" />
            <p className="text-xs uppercase tracking-widest font-bold">Localização</p>
            <p className="text-muted font-light text-sm">Rua Major Felinto, 168 - Varzea</p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <Clock className="w-5 h-5 text-primary" />
            <p className="text-xs uppercase tracking-widest font-bold">Atendimento</p>
            <p className="text-muted font-light text-sm">Seg - Sex: 09h às 19h | Sáb: 09h às 14h</p>
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="flex gap-6">
          <Link href="https://instagram.com" target="_blank" className="hover:text-primary transition-all hover:scale-110" title="Instagram">
            <Instagram className="w-6 h-6" />
          </Link>
          <Link href={WHATSAPP_URL} target="_blank" className="hover:text-primary transition-all hover:scale-110" title="WhatsApp">
            <MessageCircle className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-primary transition-all hover:scale-110" title="TikTok">
            <TikTokIcon className="w-6 h-6" />
          </Link>
        </div>

        {/* Linha de Separação Fina */}
        <div className="w-full h-[1px] bg-white/10" />

        {/* Copyright */}
        <div className="space-y-2 text-[10px] md:text-xs text-muted/40 uppercase tracking-[0.3em] font-bold">
          <p>© 2026 LAEYNE STUDIO LASH. TODOS OS DIREITOS RESERVADOS.</p>
          <p className="text-primary/30">DESIGN POR STUDIO LUXURY</p>
        </div>
      </div>
    </footer>
  )
}

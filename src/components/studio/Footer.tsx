import Link from "next/link"
import { Instagram, MapPin, Clock, Mail, Sparkles, MessageCircle } from "lucide-react"

// Ícone do TikTok customizado já que não existe no lucide-react padrão
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
    <footer className="bg-foreground text-background py-16 md:py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        <div className="col-span-1 md:col-span-2 space-y-8 flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="font-headline text-3xl font-semibold tracking-tighter uppercase">LAEYNE STUDIO</span>
          </Link>
          <p className="text-muted max-w-sm font-light leading-relaxed">
            Onde a arquitetura encontra a elegância. Proporcionamos as extensões de cílios mais avançadas em um ambiente sereno e luxuoso.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link href="#" className="p-3 rounded-full border border-muted/20 hover:bg-primary transition-colors" title="Instagram">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-3 rounded-full border border-muted/20 hover:bg-primary transition-colors" title="WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-3 rounded-full border border-muted/20 hover:bg-primary transition-colors" title="TikTok">
              <TikTokIcon className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-3 rounded-full border border-muted/20 hover:bg-primary transition-colors" title="Email">
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline text-xl text-primary uppercase tracking-widest">Localização</h4>
          <ul className="space-y-4 text-muted font-light flex flex-col items-center md:items-start">
            <li className="flex gap-2">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>Rua Major Felinto, 168<br />Varzea</span>
            </li>
            <li className="flex gap-2">
              <Clock className="w-5 h-5 text-primary shrink-0" />
              <span>Seg - Sex: 09:00 - 19:00<br />Sáb: 09:00 - 14:00</span>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline text-xl text-primary uppercase tracking-widest">Links Rápidos</h4>
          <ul className="space-y-4 text-muted font-light flex flex-col items-center md:items-start">
            <li><Link href="#portfolio" className="hover:text-primary transition-colors">Portfólio de Serviços</Link></li>
            <li><Link href="#reviews" className="hover:text-primary transition-colors">Depoimentos</Link></li>
            <li><Link href="#catalog" className="hover:text-primary transition-colors">Catálogo de Preços</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Políticas de Agendamento</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 md:mt-20 pt-8 border-t border-muted/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-muted/50 uppercase tracking-[0.2em] text-center">
        <p>© 2026 LAEYNE STUDIO LASH. TODOS OS DIREITOS RESERVADOS.</p>
        <p>DESIGN POR STUDIO LUXURY</p>
      </div>
    </footer>
  )
}

import Link from "next/link"
import { Instagram, MapPin, Clock, Mail, Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="font-headline text-3xl font-semibold tracking-tighter">LAEYNE STUDIO</span>
          </Link>
          <p className="text-muted max-w-sm font-light leading-relaxed">
            Where architecture meets elegance. We provide the most advanced eyelash extensions in a serene, luxury environment.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="p-3 rounded-full border border-muted/20 hover:bg-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-3 rounded-full border border-muted/20 hover:bg-primary transition-colors">
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline text-xl text-primary">Location</h4>
          <ul className="space-y-4 text-muted font-light">
            <li className="flex gap-2">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>Rua das Flores, 1234<br />Belo Horizonte, MG</span>
            </li>
            <li className="flex gap-2">
              <Clock className="w-5 h-5 text-primary shrink-0" />
              <span>Mon - Fri: 9am - 7pm<br />Sat: 9am - 2pm</span>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-headline text-xl text-primary">Quick Links</h4>
          <ul className="space-y-4 text-muted font-light">
            <li><Link href="#portfolio" className="hover:text-primary transition-colors">Service Portfolio</Link></li>
            <li><Link href="#matcher" className="hover:text-primary transition-colors">Look Matcher Tool</Link></li>
            <li><Link href="#catalog" className="hover:text-primary transition-colors">Price Catalog</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Booking Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-muted/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted/50 uppercase tracking-[0.2em]">
        <p>© 2024 LAEYNE STUDIO LASH. ALL RIGHTS RESERVED.</p>
        <p>DESIGNED BY STUDIO LUXURY</p>
      </div>
    </footer>
  )
}

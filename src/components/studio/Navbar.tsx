
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, Menu, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"

const navItems = [
  { name: "Início", href: "/" },
  { name: "Estilos", href: "/estilos" },
  { name: "Depoimentos", href: "/#reviews" },
  { name: "Preços", href: "/#catalog" },
]

const WHATSAPP_URL = "https://wa.me/5588996363178?text=Oi%2C%20tudo%20bem%3F%20gostaria%20de%20marcar%20um%20agendamento.%20qual%20dia%20e%20horario%20voc%C3%AA%20tem%20disponivel%3F"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 px-4 pt-6 transition-all duration-500 pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-center">
        <div 
          className={`
            flex items-center justify-between w-full px-6 h-16 rounded-full 
            pointer-events-auto transition-all duration-500 border
            ${scrolled 
              ? "bg-background/80 backdrop-blur-xl border-primary/10 shadow-2xl scale-95" 
              : "bg-white/40 backdrop-blur-md border-white/20 shadow-lg"
            }
          `}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="font-headline text-lg md:text-xl font-bold tracking-[0.1em] text-foreground uppercase">
              LAEYNE STUDIO
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-[10px] h-9 px-6 shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95">
              <Link href={WHATSAPP_URL} target="_blank">Agendar</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-none p-0 flex flex-col w-full sm:max-w-md">
                <div className="p-10 flex flex-col h-full">
                  <SheetHeader className="text-left mb-16">
                    <SheetTitle className="font-headline text-3xl font-bold tracking-tight text-foreground uppercase">LAEYNE STUDIO</SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex flex-col gap-8 flex-1">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link 
                          href={item.href}
                          className="text-4xl font-headline font-light hover:text-primary transition-all flex items-center justify-between group"
                        >
                          {item.name}
                          <ArrowRight className="w-8 h-8 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
                        </Link>
                      </SheetClose>
                    ))}
                  </div>

                  <div className="mt-auto space-y-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold text-center">Arquitetura de Luxo para seu Olhar</p>
                    <Button asChild className="rounded-full w-full bg-primary h-16 text-lg font-bold uppercase tracking-widest text-white shadow-xl shadow-primary/20">
                      <Link href={WHATSAPP_URL} target="_blank">
                        WhatsApp
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

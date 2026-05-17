
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"

const navItems = [
  { name: "Início", href: "/" },
  { name: "Nossos Estilos", href: "/estilos" },
  { name: "Depoimentos", href: "/#reviews" },
  { name: "Preços", href: "/#catalog" },
]

const WHATSAPP_MESSAGE = "Oi, tudo bem? gostaria de marcar um agendamento. qual dia e horario você tem disponivel?"
const WHATSAPP_URL = `https://wa.me/5588996363178?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-700 px-4 md:px-6 pt-6 pointer-events-none`}
    >
      <div 
        className={`max-w-5  xl mx-auto flex items-center justify-center transition-all duration-700`}
      >
        <div 
          className={`
            flex items-center justify-between w-full max-w-4xl px-6 md:px-10 h-16 
            rounded-full pointer-events-auto transition-all duration-700
            ${scrolled 
              ? "bg-background/90 backdrop-blur-xl border border-primary/10 shadow-2xl scale-95" 
              : "bg-background/60 backdrop-blur-md border border-white/20 shadow-lg"
            }
          `}
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <Sparkles className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform duration-500" />
            <span className="font-headline text-lg md:text-xl font-bold tracking-[0.15em] text-foreground uppercase">
              LAEYNE STUDIO
            </span>
          </Link>

          {/* Desktop Nav - Hidden on small screens to match the clean pill look */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`text-[10px] font-bold transition-all duration-300 uppercase tracking-[0.25em] relative group ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-[0.1em] text-[10px] h-10 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              <Link href={WHATSAPP_URL} target="_blank">Agendar</Link>
            </Button>
          </div>

          {/* Mobile/Compact Menu Trigger */}
          <div className="flex items-center">
            {mounted && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-full w-10 h-10">
                    <Menu className="w-5 h-5 text-foreground" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-background border-none w-full sm:max-w-md p-0 flex flex-col">
                  <div className="p-10 flex flex-col h-full">
                    <SheetHeader className="text-left mb-16">
                      <SheetTitle className="font-headline text-2xl font-bold tracking-tight text-foreground uppercase">LAEYNE STUDIO</SheetTitle>
                    </SheetHeader>
                    
                    <div className="flex flex-col gap-10 flex-1">
                      {navItems.map((item) => (
                        <SheetClose asChild key={item.name}>
                          <Link 
                            href={item.href}
                            className="text-3xl font-headline font-light hover:text-primary transition-all flex items-center justify-between group"
                          >
                            {item.name}
                            <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    <div className="mt-auto space-y-6">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold text-center">Arquitetura de Luxo para seu Olhar</p>
                      <Button asChild className="rounded-full w-full bg-primary h-16 text-lg font-bold uppercase tracking-widest text-white shadow-xl shadow-primary/20">
                        <Link href={WHATSAPP_URL} target="_blank">
                          Falar no WhatsApp
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

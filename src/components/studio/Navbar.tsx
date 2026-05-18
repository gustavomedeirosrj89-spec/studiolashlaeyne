
"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, Menu } from "lucide-react"
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
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setScrolled(currentScrollY > 20)
      lastScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", controlNavbar)
    return () => window.removeEventListener("scroll", controlNavbar)
  }, [])

  if (!mounted) return null

  return (
    <nav 
      className={`
        fixed top-0 w-full z-50 px-4 pt-6 transition-all duration-500
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
    >
      <div className="max-w-4xl mx-auto">
        <div 
          className={`
            flex items-center justify-between w-full px-8 h-16 rounded-full 
            transition-all duration-500 border
            ${scrolled 
              ? "bg-white/80 backdrop-blur-xl border-primary/10 shadow-2xl scale-95" 
              : "bg-white/40 backdrop-blur-md border-white/20 shadow-lg"
            }
          `}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-headline text-lg md:text-xl font-medium tracking-[0.1em] text-foreground uppercase">
              LAEYNE STUDIO
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 mr-4">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 h-10 w-10">
                  <Menu className="w-5 h-5 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#f5f2ed] border-none p-0 flex flex-col w-full sm:max-w-md">
                <div className="p-8 md:p-12 flex flex-col h-full relative overflow-hidden">
                  <span className="absolute -left-12 -top-12 text-[25rem] font-headline text-primary/5 select-none pointer-events-none">L</span>
                  
                  <SheetHeader className="mb-16 text-left space-y-0 relative z-10">
                    <SheetTitle asChild>
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <span className="font-headline text-2xl md:text-3xl font-semibold tracking-tight text-foreground uppercase">
                          LAEYNE STUDIO
                        </span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex flex-col gap-6 flex-1 relative z-10">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link 
                          href={item.href}
                          className="text-4xl md:text-5xl font-headline font-light text-[#2a2a2a] hover:text-primary transition-all flex items-center justify-between group py-2"
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>

                  <div className="mt-auto space-y-8 pb-4 relative z-10">
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#8a8a8a] font-bold text-center">
                      ARQUITETURA DE LUXO PARA SEU OLHAR
                    </p>
                    <Button asChild className="rounded-full w-full bg-primary hover:bg-primary/90 h-16 md:h-20 text-lg md:text-xl font-bold uppercase tracking-[0.2em] text-white shadow-2xl shadow-primary/30 transition-transform active:scale-95">
                      <Link href={WHATSAPP_URL} target="_blank">
                        WHATSAPP
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

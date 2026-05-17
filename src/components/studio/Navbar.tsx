
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const navItems = [
  { name: "Início", href: "/" },
  { name: "Nossos Estilos", href: "/estilos" },
  { name: "Depoimentos", href: "/#reviews" },
  { name: "Preços", href: "/#catalog" },
]

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
          <div className="flex flex-col -space-y-1">
            <span className="font-headline text-xl md:text-2xl font-semibold tracking-tighter">LAEYNE STUDIO</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium">Lash Specialist</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={`text-[10px] font-bold transition-colors uppercase tracking-[0.2em] ${
                pathname === item.href ? "text-primary border-b border-primary/30" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-[0.1em] text-[10px] h-11">
            <Link href="#portfolio">Agendar Agora</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          {mounted && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background">
                <SheetHeader>
                  <SheetTitle className="font-headline text-left text-2xl">LAEYNE STUDIO</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8 mt-16">
                  {navItems.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className="text-xl font-headline hover:text-primary transition-colors border-b border-primary/5 pb-4"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button className="rounded-full w-full bg-primary h-14 text-base font-medium">
                    Falar no WhatsApp
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  )
}

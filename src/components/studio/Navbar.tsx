"use client"

import Link from "next/link"
import { Sparkles, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const navItems = [
  { name: "Portfolio", href: "#portfolio" },
  { name: "Look Matcher", href: "#matcher" },
  { name: "Reviews", href: "#reviews" },
  { name: "Catalog", href: "#catalog" },
]

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
          <span className="font-headline text-2xl font-semibold tracking-tighter">LAEYNE STUDIO</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest"
            >
              {item.name}
            </Link>
          ))}
          <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium uppercase tracking-widest text-xs">
            Book Now
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
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
              <div className="flex flex-col gap-6 mt-12">
                {navItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className="text-lg font-medium hover:text-primary transition-colors uppercase tracking-widest border-b pb-2"
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="rounded-full w-full bg-primary mt-4">
                  WhatsApp Booking
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

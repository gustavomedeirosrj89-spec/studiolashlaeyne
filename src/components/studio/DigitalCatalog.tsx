import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Clock, Trash2, Zap } from "lucide-react"

export function DigitalCatalog() {
  return (
    <section id="catalog" className="py-24 px-6 text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-4xl md:text-5xl font-headline">Service Catalog</h2>
        <p className="text-muted-foreground font-light text-lg">
          Complete transparency on our treatments, maintenance cycles, and specialized care protocols.
        </p>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="rounded-full px-12 h-14 bg-primary text-white hover:bg-primary/90">
              Access Full Catalog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-background border-none max-h-[80vh] overflow-y-auto">
            <DialogHeader className="pb-4">
              <DialogTitle className="text-4xl font-headline text-center">Service Tiers</DialogTitle>
            </DialogHeader>
            <div className="space-y-12 py-6">
              <div className="space-y-6">
                <h3 className="flex items-center gap-2 font-headline text-2xl text-primary">
                  <Clock className="w-5 h-5" /> Maintenance Intervals
                </h3>
                <div className="grid gap-4">
                  {[
                    { label: "15 Days Maintenance", price: "R$ 100", desc: "For those who demand perfection at all times." },
                    { label: "21 Days Maintenance", price: "R$ 130", desc: "Recommended average for most volume styles." },
                    { label: "28 Days Maintenance", price: "R$ 160", desc: "Extended cycle for slow-growing lash sets." }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-secondary/20">
                      <div>
                        <p className="font-semibold">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <span className="font-headline text-xl">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="flex items-center gap-2 font-headline text-2xl text-accent">
                  <Trash2 className="w-5 h-5" /> Removal & Repair
                </h3>
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-4 border rounded-xl">
                    <p className="font-semibold">Professional Removal</p>
                    <span className="font-headline text-xl">R$ 50</span>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-xl">
                    <p className="font-semibold">Rescue Fix (Single Gap)</p>
                    <span className="font-headline text-xl">R$ 30</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="flex items-center gap-2 font-headline text-2xl text-foreground">
                  <Zap className="w-5 h-5" /> Spa Treatments
                </h3>
                <div className="p-6 rounded-2xl bg-primary/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">Lash Botox & Tint</p>
                    <span className="font-headline text-xl">R$ 120</span>
                  </div>
                  <Separator />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Advanced hydration and keratin treatment to strengthen natural lashes between extensions.
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

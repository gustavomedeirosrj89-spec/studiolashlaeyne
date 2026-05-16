import { CreditCard, Wallet, Banknote, ShieldCheck } from "lucide-react"

export function PaymentInfo() {
  const methods = [
    { 
      icon: <Wallet className="w-6 h-6" />, 
      title: "PIX", 
      detail: "Rápido e Seguro", 
      color: "bg-primary/10 text-primary" 
    },
    { 
      icon: <CreditCard className="w-6 h-6" />, 
      title: "Cartão de Crédito", 
      detail: "Até 3x Sem Juros", 
      color: "bg-accent/10 text-accent" 
    },
    { 
      icon: <Banknote className="w-6 h-6" />, 
      title: "Espécie", 
      detail: "Direto no Estúdio", 
      color: "bg-foreground/5 text-foreground" 
    },
  ]

  return (
    <section className="py-20 md:py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex items-center gap-4 border-b border-primary/10 pb-6">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-headline">Pagamento Seguro</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {methods.map((method, idx) => (
            <div key={idx} className="flex items-center gap-6 p-6 md:p-8 rounded-3xl bg-secondary/30 hover:bg-secondary/50 transition-colors graceful-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className={`p-4 rounded-full ${method.color} shrink-0`}>
                {method.icon}
              </div>
              <div>
                <h4 className="font-semibold text-lg">{method.title}</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">{method.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

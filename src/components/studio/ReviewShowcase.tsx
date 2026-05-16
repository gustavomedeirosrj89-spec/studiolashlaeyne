import { Star, Quote } from "lucide-react"

const reviews = [
  {
    name: "Beatriz M.",
    role: "Regular Client",
    content: "The attention to detail at LAEYNE is unparalleled. My Fox Eyes look lasted 4 weeks perfectly.",
    rating: 5
  },
  {
    name: "Clara G.",
    role: "Wedding Guest",
    content: "Found my perfect volume thanks to the AI tool. Professional, clean, and absolutely stunning results.",
    rating: 5
  },
  {
    name: "Juliana S.",
    role: "Model",
    content: "Best Brazilian Volume I've ever had. It's so light I forget I'm wearing extensions!",
    rating: 5
  }
]

export function ReviewShowcase() {
  return (
    <section id="reviews" className="py-24 px-6 overflow-hidden bg-accent/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-5xl font-headline leading-tight">Voices of <br /><span className="text-primary italic">Confidence</span></h2>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
            <span className="text-sm font-medium ml-2">4.9/5 from 200+ clients</span>
          </div>
          <p className="text-muted-foreground font-light italic">Authentic feedback from our community of beauty enthusiasts.</p>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, idx) => (
            <div 
              key={idx} 
              className="bg-background p-8 rounded-3xl shadow-sm border border-primary/5 graceful-reveal relative"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10" />
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-accent text-accent" />)}
                </div>
                <p className="text-lg italic font-light leading-relaxed">&ldquo;{review.content}&rdquo;</p>
                <div>
                  <h4 className="font-semibold text-primary">{review.name}</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

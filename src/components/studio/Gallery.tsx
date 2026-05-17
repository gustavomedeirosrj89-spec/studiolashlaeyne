
"use client"

import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function Gallery() {
  const images = [
    PlaceHolderImages.find(i => i.id === "gallery-1"),
    PlaceHolderImages.find(i => i.id === "vol-russo"),
    PlaceHolderImages.find(i => i.id === "gallery-2"),
    PlaceHolderImages.find(i => i.id === "gallery-3"),
    PlaceHolderImages.find(i => i.id === "fox-eyes"),
    PlaceHolderImages.find(i => i.id === "vol-brasileiro"),
  ].filter(Boolean)

  return (
    <section className="py-24 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-headline italic text-primary">Resultados Reais</h2>
          <p className="text-muted-foreground font-light uppercase tracking-[0.4em] text-xs">Exclusividade em cada detalhe</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="relative rounded-[2rem] overflow-hidden shadow-lg transition-all duration-700 hover:shadow-2xl hover:scale-[1.02] graceful-reveal"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {img && (
                <Image 
                  src={img.imageUrl} 
                  alt={img.description} 
                  width={600} 
                  height={800} 
                  className="w-full object-cover"
                  unoptimized={img.imageUrl.includes('ibb.co')}
                />
              )}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

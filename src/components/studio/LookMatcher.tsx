"use client"

import { useState } from "react"
import { suggestLashStylesForClient, type SuggestLashStylesOutput } from "@/ai/flows/suggest-lash-styles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function LookMatcher() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SuggestLashStylesOutput | null>(null)
  const [eyeShape, setEyeShape] = useState("")
  const [stylePref, setStylePref] = useState("")

  const handleMatch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!eyeShape || !stylePref) return
    
    setLoading(true)
    try {
      const output = await suggestLashStylesForClient({
        eyeShape,
        stylePreferences: stylePref
      })
      setResults(output)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="matcher" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-headline">AI Look Matcher</h2>
          <p className="text-muted-foreground max-w-xl mx-auto italic font-light">
            Unveil your perfect set. Our AI stylist analyzes your features to recommend the ideal volume and architecture.
          </p>
        </div>

        <Card className="border-none shadow-2xl bg-background/50 backdrop-blur-sm overflow-hidden graceful-reveal">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Stylist Analysis
            </CardTitle>
            <CardDescription>Tell us about your eyes and your dream look.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleMatch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="eye-shape" className="uppercase tracking-widest text-xs font-semibold">Describe Eye Shape</Label>
                  <Input 
                    id="eye-shape" 
                    placeholder="e.g. Almond, Hooded, Round..." 
                    className="h-12 border-primary/20 bg-background/50"
                    value={eyeShape}
                    onChange={(e) => setEyeShape(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="style" className="uppercase tracking-widest text-xs font-semibold">Desired Vibe</Label>
                  <Input 
                    id="style" 
                    placeholder="e.g. Natural, Fox Eye, Dramatic..." 
                    className="h-12 border-primary/20 bg-background/50"
                    value={stylePref}
                    onChange={(e) => setStylePref(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 rounded-full text-lg font-medium bg-primary hover:bg-primary/90 transition-all transform hover:scale-[1.01]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Architecture...
                  </>
                ) : "Generate Suggestions"}
              </Button>
            </form>

            {results && (
              <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold uppercase tracking-widest text-xs">Recommended for you:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.map((style, idx) => (
                    <Card key={idx} className="bg-white border-primary/5 hover:border-primary/20 transition-all shadow-sm">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-headline text-2xl text-primary">{style.name}</h3>
                          <Badge variant="outline" className="border-accent text-accent capitalize">{style.volumeLevel}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{style.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

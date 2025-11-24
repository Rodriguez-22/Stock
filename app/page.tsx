"use client"
import Link from "next/link"
import Image from "next/image"
import { Sparkles } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo decorativo con gradientes */}

      <div className="w-full max-w-4xl relative z-10">
        {/* Logo y Título Premium */}
        <div className="text-center mb-12 animate-slide-in-up">
          {/* Removed the pizza logo container */}
          <h1 className="text-6xl font-bold text-gradient mb-3">El Tito Pizzeria</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-lg">
            <Sparkles size={20} className="text-primary" />
            <p>Sistema Premium de Gestión de Stock</p>
            <Sparkles size={20} className="text-primary" />
          </div>
        </div>

        {/* Cards de Navegación Premium */}
        <div className="mb-12 rounded-2xl overflow-hidden border-2 border-primary/30 glass-effect shadow-2xl shadow-primary/20 animate-slide-in-up max-w-md mx-auto">
          <div className="relative w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Image
              src="/pizzeria-restaurant.jpg"
              alt="El Tito Pizzeria"
              width={400}
              height={200}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card Mañana */}
          <Link href="/manana" className="group">
            <div className="relative h-56 glass-effect border-2 border-primary/30 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 transform">
              <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">🌅</div>
                  <h2 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                    Turno Mañana
                  </h2>
                </div>
                <div>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors font-semibold">
                    Cocina & Barra
                  </p>
                  <p className="text-sm text-muted-foreground/60 mt-1">Tostadas, Café, Bebidas & Extras</p>
                </div>
              </div>
              <div className="absolute inset-0 border-t-2 border-primary/0 group-hover:border-primary/50 transition-all duration-300" />
            </div>
          </Link>

          {/* Card Noche */}
          <Link href="/noche" className="group">
            <div className="relative h-56 glass-effect border-2 border-accent/30 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/20 hover:scale-105 transform">
              <div className="absolute inset-0 gradient-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">🌙</div>
                  <h2 className="text-3xl font-bold text-foreground group-hover:text-accent transition-colors">
                    Turno Noche
                  </h2>
                </div>
                <div>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors font-semibold">
                    Cocina & Barra
                  </p>
                  <p className="text-sm text-muted-foreground/60 mt-1">Carnes, Verduras, Pan & Envases</p>
                </div>
              </div>
              <div className="absolute inset-0 border-t-2 border-accent/0 group-hover:border-accent/50 transition-all duration-300" />
            </div>
          </Link>
        </div>

        {/* Footer Premium */}
        <div className="text-center text-muted-foreground/70">
          <p className="text-lg font-semibold">Control total de tu inventario en tiempo real</p>
          <p className="text-sm mt-2">Todos los datos se guardan automáticamente en tu navegador</p>
        </div>
      </div>
    </main>
  )
}

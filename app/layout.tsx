"use client" // asegurarnos que todo el layout se maneje en cliente

import "./globals.css"
import { ReactNode, useEffect, useState } from "react"
import { CartProvider } from "@/components/cart-provider"
import { ThemeProvider as AppThemeProvider } from "@/components/theme-provider"
import { Cart } from "@/components/ui/cart"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Toaster } from "sonner"

export default function RootLayout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Evita hydration mismatch, renderizando los componentes solo después del montaje
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        {mounted && (
          <AppThemeProvider>
            <CartProvider>
              <Toaster position="top-right" richColors />
              
              {/* BOTÓN DE CAMBIO DE TEMA */}
              <div className="fixed top-6 right-6 z-50">
                <ThemeToggle />
              </div>

              {/* CARRITO */}
              <Cart />

              {children}
            </CartProvider>
          </AppThemeProvider>
        )}
      </body>
    </html>
  )
}

"use client"

import { useState, useMemo } from "react"
import { X, ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export function Cart() {
  const { cart, removeFromCart, clearCart, cartCount } = useCart()
  const [open, setOpen] = useState(false)

  // Agrupar productos por id
  const groupedCart = useMemo(() => {
    const map = new Map()
    for (const item of cart) {
      if (map.has(item.id)) {
        const existing = map.get(item.id)
        existing.packages += item.packages
        existing.units += item.units
      } else {
        map.set(item.id, { ...item })
      }
    }
    return Array.from(map.values())
  }, [cart])

  const totalPackages = groupedCart.reduce((acc, item) => acc + item.packages, 0)
  const totalUnits = groupedCart.reduce((acc, item) => acc + item.units, 0)

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg flex items-center justify-center z-50"
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)"
        }}
        aria-label="Abrir carrito"
      >
        <ShoppingCart size={20} />
        {cartCount > 0 && (
          <span
            className="ml-1 text-sm font-bold rounded-full px-2"
            style={{ backgroundColor: "#ef4444", color: "#fff" }}
          >
            {cartCount}
          </span>
        )}
      </button>

      {/* Fondo del slide-over */}
      {open && (
        <div
          className="fixed inset-0 z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-96 p-6 shadow-xl overflow-y-auto transition-transform transform"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--card-foreground)",
              borderRadius: "0.625rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Carrito</h2>
              <button onClick={() => setOpen(false)} aria-label="Cerrar carrito">
                <X size={20} />
              </button>
            </div>

            {/* Contenido */}
            {groupedCart.length === 0 && (
              <p style={{ color: "var(--muted-foreground)" }}>El carrito está vacío</p>
            )}

            {groupedCart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between py-2 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                    Paquetes: {item.packages} | Unidades: {item.units}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ color: "var(--destructive)" }}
                  className="hover:opacity-70"
                  aria-label={`Eliminar ${item.name} del carrito`}
                >
                  X
                </button>
              </div>
            ))}

            {groupedCart.length > 0 && (
              <>
                {/* Resumen total */}
                <div
                  className="mt-4 p-4 rounded-lg"
                  style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}
                >
                  <p className="font-semibold">Total de paquetes: {totalPackages}</p>
                  <p className="font-semibold">Total de unidades: {totalUnits}</p>
                </div>

                {/* Botones de acción */}
                <div className="mt-4 flex flex-col gap-3">
                  <button
                    onClick={() => alert("Checkout no implementado aún")}
                    className="w-full p-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
                  >
                    Checkout
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full p-3 rounded-lg font-semibold hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: "rgba(220, 38, 38, 0.2)", color: "var(--destructive)" }}
                  >
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

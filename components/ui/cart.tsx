"use client"

import { useState, useMemo } from "react"
import { X, ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export function Cart() {
  const { cart, removeFromCart, clearCart, cartCount } = useCart()
  // Mantenemos el estado local para abrir/cerrar.
  const [open, setOpen] = useState(false)

  // Función de cierre para usar en el botón 'X' y en el fondo.
  const closeCart = () => setOpen(false)

  // Agrupar productos por id (mantengo tu lógica, es correcta)
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
      {/* Botón flotante para ABRIR CARRITO */}
      <button
        onClick={() => setOpen(true)}
        // Aseguramos que este botón también esté alto, pero no tanto como el carrito abierto
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg flex items-center justify-center z-[100]" 
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

      {/* Fondo del slide-over (Overlay) */}
      {open && (
        <div
          // ⚠️ CORRECCIÓN CLAVE: Aumentar el z-index para que esté sobre el Header
          // Utilizamos un valor muy alto (ej. 1050)
          className="fixed inset-0 z-[1050] h-screen" 
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={closeCart} // Cerrar al hacer clic en el fondo
        >
          <div
            // ⚠️ CORRECCIÓN CLAVE: Aseguramos que el contenido esté aún más alto que el fondo
            // Usamos h-screen para que ocupe todo el alto y no se corte
            className="fixed right-0 top-0 h-screen w-96 p-6 shadow-xl overflow-y-auto transition-transform transform z-[1060]" 
            style={{
              backgroundColor: "var(--card)",
              color: "var(--card-foreground)",
              borderRadius: "0.625rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del carrito */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Carrito</h2>
              <button 
                onClick={closeCart} // Usamos la función de cierre
                aria-label="Cerrar carrito"
                // ⚠️ Aseguramos que la 'X' sea claramente visible y clicable
                className="p-1 rounded-full hover:bg-muted/50 transition-colors" 
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenido (El resto del contenido no necesita cambios de z-index) */}
            {groupedCart.length === 0 && (
              <p style={{ color: "var(--muted-foreground)" }}>El carrito está vacío</p>
            )}

            {groupedCart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between py-2 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                {/* ... (Detalles del artículo) ... */}
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
                  {/* ... (Botones de Checkout y Vaciar) ... */}
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
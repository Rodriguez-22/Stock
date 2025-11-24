"use client"

import { useState } from "react"
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"

interface ProductCardProps {
  id: string
  name: string
  packages: number
  units: number
  onUpdatePackages: (newValue: number) => void
  onUpdateUnits: (newValue: number) => void
  onDelete: () => void
}

export function ProductCard({
  id,
  name,
  packages,
  units,
  onUpdatePackages,
  onUpdateUnits,
  onDelete,
}: ProductCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      packages,
      units,
    })
    toast.success(`${name} agregado al carrito!`)
    setAdded(true)
    setTimeout(() => setAdded(false), 700)
  }

  return (
    <div className="animate-slide-in-up glass-effect hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 rounded-xl p-5 transition-all duration-300 group hover:scale-105 transform">
      {/* Título */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors line-clamp-2 flex-1">
          {name}
        </h3>

        <button
          onClick={() => setIsDeleting(!isDeleting)}
          className={`ml-2 p-2 rounded-lg transition-all duration-200 ${
            isDeleting
              ? "bg-destructive text-destructive-foreground shadow-lg"
              : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
          }`}
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Confirmación de eliminación */}
      {isDeleting && (
        <div className="mb-3 p-3 bg-destructive/20 border border-destructive/50 rounded-lg flex gap-2 animate-fade-in">
          <button
            onClick={onDelete}
            className="flex-1 px-3 py-2 bg-destructive text-destructive-foreground rounded font-medium hover:bg-destructive/90 transition-all"
          >
            Confirmar
          </button>
          <button
            onClick={() => setIsDeleting(false)}
            className="flex-1 px-3 py-2 bg-muted/50 text-foreground rounded font-medium hover:bg-muted transition-all"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Paquetes */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">Paquetes</p>
        <div className="flex gap-2">
          <button
            onClick={() => onUpdatePackages(Math.max(0, packages - 1))}
            className="flex-1 p-2 bg-gradient-primary hover:shadow-lg hover:shadow-primary/30 text-primary-foreground rounded-lg transition-all duration-200 flex items-center justify-center gap-1 font-semibold"
          >
            <Minus size={16} />
          </button>

          <span className="flex-1 px-3 py-2 glass-effect rounded-lg text-center font-bold text-primary">
            {packages}
          </span>

          <button
            onClick={() => onUpdatePackages(packages + 1)}
            className="flex-1 p-2 bg-gradient-primary hover:shadow-lg hover:shadow-primary/30 text-primary-foreground rounded-lg transition-all duration-200 flex items-center justify-center gap-1 font-semibold"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Unidades */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">Unidades</p>
        <div className="flex gap-2">
          <button
            onClick={() => onUpdateUnits(Math.max(0, units - 1))}
            className="flex-1 p-2 bg-gradient-secondary hover:shadow-lg hover:shadow-accent/30 text-accent-foreground rounded-lg transition-all duration-200 flex items-center justify-center gap-1 font-semibold"
          >
            <Minus size={16} />
          </button>

          <span className="flex-1 px-3 py-2 glass-effect rounded-lg text-center font-bold text-accent">
            {units}
          </span>

          <button
            onClick={() => onUpdateUnits(units + 1)}
            className="flex-1 p-2 bg-gradient-secondary hover:shadow-lg hover:shadow-accent/30 text-accent-foreground rounded-lg transition-all duration-200 flex items-center justify-center gap-1 font-semibold"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Botón agregar al carrito */}
      <button
        onClick={handleAddToCart}
        className={`mt-4 w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 ${
          added ? "scale-105 shadow-lg" : ""
        }`}
      >
        <ShoppingCart size={18} />
        {added ? "Añadido!" : "Agregar al carrito"}
      </button>
    </div>
  )
}

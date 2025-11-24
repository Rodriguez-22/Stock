"use client"

import { ProductCard } from "./product-card"
import { useState } from "react"
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  packages: number
  units: number
}

interface CategorySectionProps {
  category: string
  emoji: string
  products: Product[]
  onUpdateProduct: (id: string, updates: Partial<Product>) => void
  onDeleteProduct: (id: string) => void
  onDeleteCategory?: (categoryName: string) => void
}

export function CategorySection({
  category,
  emoji,
  products,
  onUpdateProduct,
  onDeleteProduct,
  onDeleteCategory,
}: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const categoryProducts = products.filter((p) => p.category === category)

  const handleDeleteCategory = () => {
    if (onDeleteCategory) {
      onDeleteCategory(category)
    }
    setShowDeleteConfirm(false)
  }

  return (
    <div className="glass-effect border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 animate-fade-in">

      {/* Header (ANTES era button → AHORA es div clickeable) */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-5 flex items-center justify-between gradient-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{emoji}</span>
          <div className="text-left">
            <h2 className="font-bold text-xl text-primary-foreground">{category}</h2>
            <p className="text-sm text-primary-foreground/70">{categoryProducts.length} producto(s)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onDeleteCategory && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDeleteConfirm(true)
              }}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-all duration-200 hover:scale-110"
              title="Eliminar categoría"
            >
              <Trash2 size={18} className="text-red-400 hover:text-red-300" />
            </button>
          )}

          {isExpanded ? (
            <ChevronUp size={26} className="text-primary-foreground group-hover:translate-y-1 transition-transform" />
          ) : (
            <ChevronDown size={26} className="text-primary-foreground group-hover:-translate-y-1 transition-transform" />
          )}
        </div>
      </div>

      {/* Productos */}
      {isExpanded && (
        <div className="p-6 border-t border-primary/20">
          {categoryProducts.length === 0 ? (
            <p className="text-center text-muted-foreground py-12 text-lg">No hay productos en esta categoría</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  packages={product.packages}
                  units={product.units}
                  onUpdatePackages={(value) => onUpdateProduct(product.id, { packages: value })}
                  onUpdateUnits={(value) => onUpdateProduct(product.id, { units: value })}
                  onDelete={() => onDeleteProduct(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal de confirmación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
            <h3 className="text-xl font-bold mb-4">Eliminar Categoría</h3>
            <p className="text-muted-foreground mb-6">
              ¿Estás seguro de que deseas eliminar la categoría "{category}"? También se eliminarán todos sus productos.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 font-semibold transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteCategory}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

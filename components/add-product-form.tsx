"use client"

import type React from "react"

import { useState } from "react"
import { Plus, X } from "lucide-react"

interface AddProductFormProps {
  categories: string[]
  onAdd: (name: string, category: string, packages: number, units: number) => void
}

export function AddProductForm({ categories, onAdd }: AddProductFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: categories[0] || "",
    packages: 0,
    units: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim()) {
      onAdd(formData.name, formData.category, formData.packages, formData.units)
      setFormData({
        name: "",
        category: categories[0] || "",
        packages: 0,
        units: 0,
      })
      setIsOpen(false)
    }
  }

  return (
    <div className="animate-slide-in-up">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-5 gradient-primary hover:shadow-xl hover:shadow-primary/30 text-primary-foreground rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 transform"
        >
          <Plus size={24} />
          Agregar Nuevo Producto
        </button>
      ) : (
        <div className="glass-effect border-2 border-primary rounded-xl p-7 shadow-xl animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gradient">Nuevo Producto</h3>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
              <X size={24} className="text-primary" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wider">
                Nombre del Producto
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Café Italiano Premium"
                className="w-full px-4 py-3 border-2 border-primary/30 bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder-muted-foreground"
                autoFocus
              />
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wider">Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border-2 border-primary/30 bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Paquetes */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wider">
                Paquetes (inicial)
              </label>
              <input
                type="number"
                value={formData.packages}
                onChange={(e) =>
                  setFormData({ ...formData, packages: Math.max(0, Number.parseInt(e.target.value) || 0) })
                }
                min="0"
                className="w-full px-4 py-3 border-2 border-primary/30 bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            {/* Unidades */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wider">
                Unidades (inicial)
              </label>
              <input
                type="number"
                value={formData.units}
                onChange={(e) => setFormData({ ...formData, units: Math.max(0, Number.parseInt(e.target.value) || 0) })}
                min="0"
                className="w-full px-4 py-3 border-2 border-primary/30 bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-3">
              <button
                type="submit"
                className="flex-1 gradient-primary hover:shadow-lg hover:shadow-primary/30 text-primary-foreground font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Agregar Producto
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 glass-effect hover:border-muted border-2 border-muted/50 text-foreground font-bold py-3 rounded-lg transition-all duration-200"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CategorySection } from "@/components/category-section"
import { AddProductForm } from "@/components/add-product-form"
import { AddCategoryForm } from "@/components/add-category-form"
import {
  getStoredProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getStoredCategories,
  addCategory,
  deleteCategory,
} from "@/lib/storage"
import { ArrowLeft, ChefHat, Wine } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  packages: number
  units: number
}

interface Category {
  name: string
  emoji: string
}

const DEFAULT_CATEGORIES_COCINA = [
  { name: "Carne", emoji: "🥩" },
  { name: "Verdura", emoji: "🥬" },
  { name: "Pan", emoji: "🥖" },
  { name: "Envases", emoji: "📦" },
]

const DEFAULT_CATEGORIES_BARRA = [
  { name: "Cafés", emoji: "☕" },
  { name: "Bebidas", emoji: "🥤" },
  { name: "Alcohol", emoji: "🍷" },
  { name: "Extras", emoji: "✨" },
]

export default function NochePage() {
  const [productosCocina, setProductosCocina] = useState<Product[]>([])
  const [productosBarra, setProductosBarra] = useState<Product[]>([])
  const [categoriesCocina, setCategoriesCocina] = useState<Category[]>([])
  const [categoriesBarra, setCategoriesBarra] = useState<Category[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState<"cocina" | "barra">("cocina")

  useEffect(() => {
    const cocina = getStoredProducts("noche_cocina")
    const barra = getStoredProducts("noche_barra")
    const catsCocina = getStoredCategories("noche_cocina") || DEFAULT_CATEGORIES_COCINA
    const catsBarra = getStoredCategories("noche_barra") || DEFAULT_CATEGORIES_BARRA

    setProductosCocina(cocina)
    setProductosBarra(barra)
    setCategoriesCocina(catsCocina)
    setCategoriesBarra(catsBarra)
    setIsLoaded(true)
  }, [])

  const handleAddCategoryCocina = (name: string, emoji: string) => {
    const category = { name, emoji }
    addCategory("noche_cocina", category)
    setCategoriesCocina([...categoriesCocina, category])
  }

  const handleDeleteCategoryCocina = (categoryName: string) => {
    deleteCategory("noche_cocina", categoryName)
    setCategoriesCocina(categoriesCocina.filter((c) => c.name !== categoryName))
    setProductosCocina(productosCocina.filter((p) => p.category !== categoryName))
  }

  const handleAddCategoryBarra = (name: string, emoji: string) => {
    const category = { name, emoji }
    addCategory("noche_barra", category)
    setCategoriesBarra([...categoriesBarra, category])
  }

  const handleDeleteCategoryBarra = (categoryName: string) => {
    deleteCategory("noche_barra", categoryName)
    setCategoriesBarra(categoriesBarra.filter((c) => c.name !== categoryName))
    setProductosBarra(productosBarra.filter((p) => p.category !== categoryName))
  }

  const handleAddProductCocina = (name: string, category: string, packages: number, units: number) => {
    const newProduct = addProduct("noche_cocina", { name, category, packages, units })
    setProductosCocina([...productosCocina, newProduct])
  }

  const handleUpdateProductCocina = (id: string, updates: Partial<Product>) => {
    updateProduct("noche_cocina", id, updates)
    setProductosCocina(productosCocina.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const handleDeleteProductCocina = (id: string) => {
    deleteProduct("noche_cocina", id)
    setProductosCocina(productosCocina.filter((p) => p.id !== id))
  }

  const handleAddProductBarra = (name: string, category: string, packages: number, units: number) => {
    const newProduct = addProduct("noche_barra", { name, category, packages, units })
    setProductosBarra([...productosBarra, newProduct])
  }

  const handleUpdateProductBarra = (id: string, updates: Partial<Product>) => {
    updateProduct("noche_barra", id, updates)
    setProductosBarra(productosBarra.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const handleDeleteProductBarra = (id: string) => {
    deleteProduct("noche_barra", id)
    setProductosBarra(productosBarra.filter((p) => p.id !== id))
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="w-12 h-12 rounded-full gradient-primary"></div>
          </div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Header Premium */}
      <div className="sticky top-0 z-50 glass-effect border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between mb-4">
          <Link
            href="/"
            className="p-2 hover:bg-primary/10 rounded-lg transition-all duration-200 inline-flex hover:scale-110"
          >
            <ArrowLeft size={24} className="text-primary" />
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gradient mb-1">🌙 Turno Noche</h1>
            <p className="text-sm text-muted-foreground">Gestión Premium de Stock</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Tabs Premium */}
        <div className="flex gap-2 px-4 pb-4 border-t border-primary/20">
          <button
            onClick={() => setActiveTab("cocina")}
            className={`px-6 py-3 font-bold rounded-lg transition-all duration-300 flex items-center gap-2 text-lg ${
              activeTab === "cocina"
                ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                : "glass-effect border border-primary/20 text-muted-foreground hover:text-foreground hover:border-primary/50"
            }`}
          >
            <ChefHat size={20} />
            Cocina
          </button>
          <button
            onClick={() => setActiveTab("barra")}
            className={`px-6 py-3 font-bold rounded-lg transition-all duration-300 flex items-center gap-2 text-lg ${
              activeTab === "barra"
                ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                : "glass-effect border border-primary/20 text-muted-foreground hover:text-foreground hover:border-primary/50"
            }`}
          >
            <Wine size={20} />
            Barra
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6 animate-fade-in">
          {/* Cocina */}
          {activeTab === "cocina" && (
            <>
              {categoriesCocina.map((cat) => (
                <CategorySection
                  key={cat.name}
                  category={cat.name}
                  emoji={cat.emoji}
                  products={productosCocina}
                  onUpdateProduct={handleUpdateProductCocina}
                  onDeleteProduct={handleDeleteProductCocina}
                  onDeleteCategory={handleDeleteCategoryCocina}
                />
              ))}
              <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-accent/10 rounded-xl p-6 border border-accent/20">
                <h3 className="text-lg font-semibold mb-4 text-accent">Gestionar Categorías</h3>
                <AddCategoryForm onAdd={handleAddCategoryCocina} />
              </div>
              <AddProductForm categories={categoriesCocina.map((c) => c.name)} onAdd={handleAddProductCocina} />
            </>
          )}

          {/* Barra */}
          {activeTab === "barra" && (
            <>
              {categoriesBarra.map((cat) => (
                <CategorySection
                  key={cat.name}
                  category={cat.name}
                  emoji={cat.emoji}
                  products={productosBarra}
                  onUpdateProduct={handleUpdateProductBarra}
                  onDeleteProduct={handleDeleteProductBarra}
                  onDeleteCategory={handleDeleteCategoryBarra}
                />
              ))}
              <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-accent/10 rounded-xl p-6 border border-accent/20">
                <h3 className="text-lg font-semibold mb-4 text-accent">Gestionar Categorías</h3>
                <AddCategoryForm onAdd={handleAddCategoryBarra} />
              </div>
              <AddProductForm categories={categoriesBarra.map((c) => c.name)} onAdd={handleAddProductBarra} />
            </>
          )}
        </div>
      </div>
    </main>
  )
}

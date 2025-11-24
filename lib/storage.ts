interface Category {
  name: string
  emoji: string
}

interface Product {
  id: string
  name: string
  category: string
  packages: number
  units: number
}

const STORAGE_KEYS = {
  MANANA_COCINA_CATS: "tito_categories_manana_cocina",
  MANANA_BARRA_CATS: "tito_categories_manana_barra",
  NOCHE_COCINA_CATS: "tito_categories_noche_cocina",
  NOCHE_BARRA_CATS: "tito_categories_noche_barra",
  MANANA_COCINA: "tito_stock_manana_cocina",
  MANANA_BARRA: "tito_stock_manana_barra",
  NOCHE_COCINA: "tito_stock_noche_cocina",
  NOCHE_BARRA: "tito_stock_noche_barra",
}

const DEFAULT_CATEGORIES = {
  manana_cocina: [
    { name: "Tostadas", emoji: "🍞" },
    { name: "Extras", emoji: "🧈" },
  ],
  manana_barra: [
    { name: "Cafés", emoji: "☕" },
    { name: "Bebidas", emoji: "🥤" },
    { name: "Extras", emoji: "✨" },
  ],
  noche_cocina: [
    { name: "Carne", emoji: "🥩" },
    { name: "Verdura", emoji: "🥬" },
    { name: "Pan", emoji: "🥖" },
    { name: "Envases", emoji: "📦" },
  ],
  noche_barra: [
    { name: "Cafés", emoji: "☕" },
    { name: "Bebidas", emoji: "🥤" },
    { name: "Alcohol", emoji: "🍷" },
    { name: "Extras", emoji: "✨" },
  ],
}

export const getStoredProducts = (
  shift: "manana_cocina" | "manana_barra" | "noche_cocina" | "noche_barra",
): Product[] => {
  if (typeof window === "undefined") return []
  const key = STORAGE_KEYS[shift.toUpperCase() as keyof typeof STORAGE_KEYS]
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

export const saveProducts = (
  shift: "manana_cocina" | "manana_barra" | "noche_cocina" | "noche_barra",
  products: Product[],
) => {
  if (typeof window === "undefined") return
  const key = STORAGE_KEYS[shift.toUpperCase() as keyof typeof STORAGE_KEYS]
  localStorage.setItem(key, JSON.stringify(products))
}

export const addProduct = (
  shift: "manana_cocina" | "manana_barra" | "noche_cocina" | "noche_barra",
  product: Omit<Product, "id">,
) => {
  const products = getStoredProducts(shift)
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
  }
  products.push(newProduct)
  saveProducts(shift, products)
  return newProduct
}

export const updateProduct = (
  shift: "manana_cocina" | "manana_barra" | "noche_cocina" | "noche_barra",
  id: string,
  updates: Partial<Product>,
) => {
  const products = getStoredProducts(shift)
  const index = products.findIndex((p) => p.id === id)
  if (index !== -1) {
    products[index] = { ...products[index], ...updates }
    saveProducts(shift, products)
    return products[index]
  }
  return null
}

export const deleteProduct = (shift: "manana_cocina" | "manana_barra" | "noche_cocina" | "noche_barra", id: string) => {
  const products = getStoredProducts(shift)
  const filtered = products.filter((p) => p.id !== id)
  saveProducts(shift, filtered)
}

export const getStoredCategories = (
  shift: "manana_cocina" | "manana_barra" | "noche_cocina" | "noche_barra",
): Category[] => {
  if (typeof window === "undefined") return []
  const key = STORAGE_KEYS[`${shift.toUpperCase()}_CATS` as keyof typeof STORAGE_KEYS]
  const stored = localStorage.getItem(key)

  if (!stored) {
    const defaults = DEFAULT_CATEGORIES[shift as keyof typeof DEFAULT_CATEGORIES]
    if (defaults) {
      localStorage.setItem(key, JSON.stringify(defaults))
      return defaults
    }
  }

  return stored ? JSON.parse(stored) : []
}

export const saveCategories = (
  shift: "manana_cocina" | "manana_barra" | "noche_cocina" | "noche_barra",
  categories: Category[],
) => {
  if (typeof window === "undefined") return
  const key = STORAGE_KEYS[`${shift.toUpperCase()}_CATS` as keyof typeof STORAGE_KEYS]
  localStorage.setItem(key, JSON.stringify(categories))
}

export const addCategory = (
  shift: "manana_cocina" | "manana_barra" | "noche_cocina" | "noche_barra",
  category: Category,
) => {
  const categories = getStoredCategories(shift)
  if (!categories.find((c) => c.name.toLowerCase() === category.name.toLowerCase())) {
    categories.push(category)
    saveCategories(shift, categories)
  }
  return category
}

export const deleteCategory = (
  shift: "manana_cocina" | "manana_barra" | "noche_cocina" | "noche_barra",
  categoryName: string,
) => {
  const categories = getStoredCategories(shift)
  const filtered = categories.filter((c) => c.name !== categoryName)
  saveCategories(shift, filtered)
}

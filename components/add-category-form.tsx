"use client"

import type React from "react"

import { useState } from "react"
import { Plus, X } from "lucide-react"

const EMOJI_OPTIONS = ["🍞", "🧈", "☕", "🥤", "🍷", "✨", "🥩", "🥬", "🥖", "📦", "🍝", "🧀", "🥚", "🌶️", "🧂", "🥄"]

interface AddCategoryFormProps {
  onAdd: (name: string, emoji: string) => void
}

export function AddCategoryForm({ onAdd }: AddCategoryFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJI_OPTIONS[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (categoryName.trim()) {
      onAdd(categoryName.trim(), selectedEmoji)
      setCategoryName("")
      setSelectedEmoji(EMOJI_OPTIONS[0])
      setIsOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-4 rounded-xl border-2 border-dashed border-accent/40 hover:border-accent/70 bg-accent/5 hover:bg-accent/10 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-accent group hover:scale-105"
      >
        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        Agregar Nueva Categoría
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gradient">Nueva Categoría</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Nombre de la Categoría</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Ej: Postres"
                  className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Selecciona un Emoji</label>
                <div className="grid grid-cols-4 gap-2">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`p-3 rounded-lg text-2xl transition-all duration-200 ${
                        selectedEmoji === emoji
                          ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg gradient-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

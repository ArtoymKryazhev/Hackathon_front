import { create } from 'zustand'

export const useActionMenuStore = create((set) => ({
  isOpen: false,

  open: () => set({ isOpen: true }),

  close: () => set({ isOpen: false }),
}))

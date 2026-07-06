import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      // auth
      token: null,
      user: null,

      // active context
      activeMsme: null,
      creditPackage: null,

      // copilot chat history, keyed by msmeId
      chatHistory: {},

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setActiveMsme: (msme) => set({ activeMsme: msme }),
      setCreditPackage: (pkg) => set({ creditPackage: pkg }),

      appendChatMessage: (msmeId, message) =>
        set((state) => ({
          chatHistory: {
            ...state.chatHistory,
            [msmeId]: [...(state.chatHistory[msmeId] || []), message],
          },
        })),

      clear: () =>
        set({
          token: null,
          user: null,
          activeMsme: null,
          creditPackage: null,
          chatHistory: {},
        }),
    }),
    {
      name: 'arthaiq-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
)

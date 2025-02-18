import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      chatHistory: {},
      chatCount: 0,
      isPremium: false,
      characterStats: {},
      initCharacterStats: (characters) => {
        const stats = {};
        Object.keys(characters).forEach(id => {
          stats[id] = {
            likes: 0,
            favorites: 0,
            isLiked: false,
            isFavorited: false,
            createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
          };
        });
        set({ characterStats: stats });
      },
      toggleLike: (characterId) => {
        set(state => {
          const stats = state.characterStats[characterId];
          if (!stats) return state;

          return {
            characterStats: {
              ...state.characterStats,
              [characterId]: {
                ...stats,
                likes: stats.likes + (stats.isLiked ? -1 : 1),
                isLiked: !stats.isLiked
              }
            }
          };
        });
      },
      toggleFavorite: (characterId) => {
        set(state => {
          const stats = state.characterStats[characterId];
          if (!stats) return state;

          return {
            characterStats: {
              ...state.characterStats,
              [characterId]: {
                ...stats,
                favorites: stats.favorites + (stats.isFavorited ? -1 : 1),
                isFavorited: !stats.isFavorited
              }
            }
          };
        });
      },
      getCharacterStats: (characterId) => {
        return get().characterStats[characterId];
      },
      increaseChatCount: () => set(state => ({ chatCount: state.chatCount + 1 })),
      setPremium: (status) => set({ isPremium: status }),
      resetChatCount: () => set({ chatCount: 0 }),
      canChat: () => {
        const { chatCount, isPremium } = get()
        return isPremium || chatCount < 10
      },
      remainingFreeChats: () => {
        const { chatCount } = get()
        return Math.max(0, 10 - chatCount)
      },
      setUser: (telegramUser) => set({ 
        user: telegramUser,
        isPremium: false 
      }),
      logout: () => set({ 
        user: null,
        isPremium: false,
        chatCount: 0,
        chatHistory: {}
      }),
      addChatMessage: (characterId, message) => {
        const timestamp = new Date().toISOString();
        set((state) => ({
          chatHistory: {
            ...state.chatHistory,
            [characterId]: {
              messages: [
                ...(state.chatHistory[characterId]?.messages || []),
                { ...message, timestamp }
              ]
            }
          }
        }));
      },
      clearChatHistory: (characterId) => {
        set((state) => {
          const newHistory = { ...state.chatHistory };
          delete newHistory[characterId];
          return { chatHistory: newHistory };
        });
      },
      clearAllChatHistory: () => {
        set({ chatHistory: {} });
      },
      getChatHistory: (characterId) => {
        return get().chatHistory[characterId]?.messages || [];
      }
    }),
    {
      name: 'user-storage',
      version: 1,
    }
  )
)

export default useUserStore 
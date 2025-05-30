import { create } from 'zustand';

interface Chat {
  _id: string;
  description: string;
}

interface ChatStore {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  setChats: (chats) => set({ chats }),
  addChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),
}));

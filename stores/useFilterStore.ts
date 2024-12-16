import { create } from 'zustand';

// Define the type for your store's state and actions
interface FilterStore {
  date: 'older' | 'newer' | 'default';
  status: 'All' | 'To-do' | 'in-progress' | 'completed';
  setDate: (value: 'older' | 'newer' | 'default') => void;
  setStatus: (value: 'All' | 'To-do' | 'in-progress' | 'completed') => void;
}

// Create the Zustand store with type safety
export const useFilterStore = create<FilterStore>((set) => ({
  date: 'default',
  status: 'All',
  setDate: (value) => set(() => ({ date: value })),
  setStatus: (value) => set(() => ({ status: value })), // Fix the key to "status" instead of "date"
}));

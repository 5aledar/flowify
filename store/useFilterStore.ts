import { create } from 'zustand';

// Define the type for your store's state and actions
interface FilterStore {
    date: 'older' | 'newer';
    status: 'All' | 'To-do' | 'in-progress' | 'completed';
    setDate: (value: 'older' | 'newer') => void;
    setStatus: (value: 'All' | 'To-do' | 'in-progress' | 'completed') => void;
}

// Create the Zustand store with type safety
export const useFilterStore = create<FilterStore>((set) => ({
    date: 'older',
    status: 'All',
    setDate: (value) => set(() => ({ date: value })),
    setStatus: (value) => set(() => ({ status: value })), // Fix the key to "status" instead of "date"
}));

import { create } from 'zustand';
import type { TableState } from '../types/table.types';

export const useTableStore = create<TableState>((set) => ({
  columns: [
    {
      key: 'firstName',
      title: 'First Name',
      type: 'text',
      validation: {
        required: true,
        pattern: /^[A-Za-z\s-]+$/,
      },
    },
    {
      key: 'email',
      title: 'Email',
      type: 'text',
      validation: {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      },
    },
    {
      key: 'birthDate',
      title: 'Birth Date',
      type: 'date',
      validation: {
        required: true,
      },
    },
  ],
  isLoading: false,
  error: null,
  setColumns: (columns) => set({ columns }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
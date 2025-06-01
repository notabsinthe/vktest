import type { TableQueryParams, TableRecord } from "../types/table.types";


const BASE_URL = 'http://localhost:3001';
const RECORDS_PER_PAGE = 10;

export const tableApi = {
  fetchRecords: async (page: number): Promise<{ data: TableRecord[], total: number }> => {
    const params: TableQueryParams = {
      _page: page,
      _limit: RECORDS_PER_PAGE,
    };

    const queryString = new URLSearchParams(params as unknown as Record<string, string>).toString();
    const response = await fetch(`${BASE_URL}/records?${queryString}`);

    if (!response.ok) throw new Error('Failed to fetch records');

    const total = Number(response.headers.get('X-Total-Count') || 0);
    const data = await response.json();

    return { data, total };
  },

  addRecord: async (record: Omit<TableRecord, 'id'>): Promise<TableRecord> => {
    const response = await fetch(`${BASE_URL}/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });

    if (!response.ok) throw new Error('Failed to add record');
    return response.json();
  },

  deleteRecord: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/records/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete record');
  },

  updateRecord: async (id: number, record: Partial<Omit<TableRecord, 'id'>>): Promise<TableRecord> => {
    const response = await fetch(`${BASE_URL}/records/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });

    if (!response.ok) throw new Error('Failed to update record');
    return response.json();
  }
};
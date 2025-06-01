export interface TableRecord {
  id: number;
  lastName: string;
  birthDate?: Date;
  age?: number;
  [key: string]: string | number | Date | undefined;
}

export interface TableColumn {
  key: string;
  title: string;
  type: 'text' | 'number' | 'date';
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
  };
}

export interface TableState {
  columns: TableColumn[];
  isLoading: boolean;
  error: Error | null;
  setColumns: (columns: TableColumn[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
}

export interface TableQueryParams {
  _page: number;
  _limit: number;
}

export interface TableRowProps {
  record: TableRecord;
  columns: TableColumn[];
  onDelete: (id: number) => void;
}

export interface TableHeaderProps {
  columns: TableColumn[];
}
import type { UseFormReturnType } from "@mantine/form";
import type { TableColumn, TableRecord } from "../../table/types/table.types";

export type FormValues = Omit<TableRecord, 'id'>;

export interface FormProps {
  onSubmit: (values: FormValues) => void;
}

export interface FormFieldProps {
  column: TableColumn;
  form: UseFormReturnType<FormValues>;
}


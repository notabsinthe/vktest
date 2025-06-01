import { useEffect } from 'react';
import { MantineProvider, Stack, Container } from '@mantine/core';
import { useTableStore } from './features/table/store/table.store';
import type { TableColumn, TableState } from './features/table/types/table.types';
import { Form } from './features/form/components/Form';

const initialColumns: TableColumn[] = [
  {
    key: 'name',
    title: 'Name',
    type: 'text',
    validation: { required: true }
  },
  {
    key: 'email',
    title: 'Email',
    type: 'text',
    validation: { 
      required: true,
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    }
  },
  {
    key: 'phone',
    title: 'Phone',
    type: 'text',
    validation: { required: true }
  },
  {
    key: 'age',
    title: 'Age',
    type: 'number',
    validation: { 
      required: true,
      min: 18,
      max: 100
    }
  }
];

export const App = () => {
  const setColumns = useTableStore((state: TableState) => state.setColumns);

  useEffect(() => {
    setColumns(initialColumns);
  }, [setColumns]);

  return (
    <MantineProvider
      theme={{
        primaryColor: 'blue',
      }}
    >
      <Container size="lg" py="xl">
        <Stack gap="xl">
          <Form />
        </Stack>
      </Container>
    </MantineProvider>
  );
};
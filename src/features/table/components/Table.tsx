import { useEffect, useState } from 'react';
import { Table, ScrollArea, Text, Button, Group, Stack, Card } from '@mantine/core';
import dayjs from 'dayjs';

interface Record {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
}

export const RecordsTable = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/records');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Ошибка при загрузке записей:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/records/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении записи');
      }

      fetchRecords();
    } catch (error) {
      console.error('Ошибка при удалении записи:', error);
    }
  };

  if (loading) {
    return <Text>Загрузка...</Text>;
  }

  if (isMobile) {
    return (
      <Stack gap="md">
        {records.map((record) => (
          <Card key={record.id} shadow="sm" padding="md" radius="md" withBorder>
            <Stack gap="xs">
              <Group justify="space-between" wrap="nowrap">
                <Text fw={500}>{record.firstName} {record.lastName}</Text>
                <Button 
                  variant="subtle" 
                  color="red" 
                  size="compact-sm"
                  onClick={() => handleDelete(record.id)}
                >
                  Удалить
                </Button>
              </Group>
              
              <Text size="sm" c="dimmed">
                Email: {record.email}
              </Text>
              <Text size="sm" c="dimmed">
                Телефон: {record.phone}
              </Text>
              <Text size="sm" c="dimmed">
                Дата рождения: {record.birthDate ? dayjs(record.birthDate).format('DD.MM.YYYY') : '-'}
              </Text>
            </Stack>
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <ScrollArea>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Имя</Table.Th>
            <Table.Th>Фамилия</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Телефон</Table.Th>
            <Table.Th>Дата рождения</Table.Th>
            <Table.Th>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {records.map((record) => (
            <Table.Tr key={record.id}>
              <Table.Td>{record.firstName}</Table.Td>
              <Table.Td>{record.lastName}</Table.Td>
              <Table.Td>{record.email}</Table.Td>
              <Table.Td>{record.phone}</Table.Td>
              <Table.Td>
                {record.birthDate ? dayjs(record.birthDate).format('DD.MM.YYYY') : '-'}
              </Table.Td>
              <Table.Td>
                <Group justify="center">
                  <Button 
                    variant="outline" 
                    color="red" 
                    size="xs"
                    onClick={() => handleDelete(record.id)}
                  >
                    Удалить
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}; 
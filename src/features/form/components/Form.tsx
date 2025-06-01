import { useForm } from '@mantine/form';
import {
  TextInput,
  Stack,
  Button,
  Container,
  Paper,
  Title,
  Box,
} from '@mantine/core';
import type { MantineSize } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { RecordsTable } from '../../table/components/Table';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: Date | null;
}

export const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0);
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

  const form = useForm<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: null,
    },

    validate: {
      firstName: (value) => (value.length < 2 ? 'Имя должно содержать минимум 2 символа' : null),
      lastName: (value) => (value.length < 2 ? 'Фамилия должна содержать минимум 2 символа' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неверный формат email'),
      phone: (value) => (/^\+?[1-9][0-9]{7,14}$/.test(value) ? null : 'Неверный формат телефона'),
      birthDate: (value) => (!value ? 'Выберите дату рождения' : null),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      
      const formattedValues = {
        ...values,
        birthDate: values.birthDate ? dayjs(values.birthDate).format('YYYY-MM-DD') : null,
      };
      
      const response = await fetch('http://localhost:3001/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedValues),
      });

      if (!response.ok) {
        throw new Error('Ошибка при сохранении данных');
      }

      const data = await response.json();
      console.log('Данные успешно сохранены:', data);
      
      form.reset();
      setKey(prev => prev + 1);
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p="md">
      <Container size={isMobile ? "100%" : "xs"} mt={isMobile ? "sm" : "xl"}>
        <Paper radius="md" p={isMobile ? "sm" : "xl"} withBorder>
          <Title order={2} ta="center" mt="md" mb="md" size={isMobile ? "h3" : "h2"}>
            Форма регистрации
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={isMobile ? "xs" : "md"}>
              <TextInput
                label="Имя"
                placeholder="Введите имя"
                required
                size="sm"
                {...form.getInputProps('firstName')}
              />

              <TextInput
                label="Фамилия"
                placeholder="Введите фамилию"
                required
                size="sm"
                {...form.getInputProps('lastName')}
              />

              <TextInput
                label="Email"
                placeholder="your@email.com"
                required
                size="sm"
                {...form.getInputProps('email')}
              />

              <TextInput
                label="Телефон"
                placeholder="+7XXXXXXXXXX"
                required
                size="sm"
                {...form.getInputProps('phone')}
              />

              <DatePickerInput
                label="Дата рождения"
                placeholder="Выберите дату"
                required
                clearable
                locale="ru"
                firstDayOfWeek={1}
                weekendDays={[0, 6]}
                valueFormat="DD.MM.YYYY"
                maxDate={new Date()}
                {...form.getInputProps('birthDate')}
                size="sm"
                dropdownType="modal"
                modalProps={{ 
                  size: 'auto',
                  fullScreen: isMobile,
                }}
                styles={(theme) => ({
                  label: {
                    fontSize: '14px',
                    fontWeight: 500,
                  },
                  input: {
                    height: '36px',
                  }
                })}
              />

              <Button 
                type="submit" 
                fullWidth 
                mt="md"
                loading={isLoading}
                size="sm"
              >
                {isLoading ? 'Сохранение...' : 'Отправить'}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
      
      <Container size="100%" mt="xl" p={isMobile ? 0 : "md"}>
        <RecordsTable key={key} />
      </Container>
    </Box>
  );
};

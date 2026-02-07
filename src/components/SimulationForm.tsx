import { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Title,
    NumberInput,
    Button,
    Stack,
    Alert,
    Table,
    Text,
    Group,
    Loader,
} from '@mantine/core';
import { useSimulation } from '../hooks/useSimulation';
import type { CreditSimulationRequest } from '../types';
import '@mantine/core/styles.css';

const STORAGE_KEY = 'credit-simulation-form-data';

const DEFAULT_FORM_DATA: CreditSimulationRequest = {
    amount: 10000,
    annual_rate: 12.5,
    months: 24,
};

// Helper para cargar datos del localStorage
const loadFormData = (): CreditSimulationRequest => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error loading form data from localStorage:', error);
    }
    return DEFAULT_FORM_DATA;
};

export function SimulationForm() {
    const { data, loading, error, simulate, reset } = useSimulation();
    const [formData, setFormData] = useState<CreditSimulationRequest>(loadFormData);

    // Persistir datos del formulario en localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }, [formData]);

    // Limpiar resultados cuando cambien los valores del formulario
    useEffect(() => {
        if (data) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.amount, formData.annual_rate, formData.months]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await simulate(formData);
    };

    const handleReset = () => {
        reset();
        setFormData(DEFAULT_FORM_DATA);
    };

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
        }).format(value);
    };

    return (
        <Container size="lg" py="xl">
            <Stack gap="xl">
                <Paper shadow="sm" p="xl" radius="md" withBorder>
                    <Title order={2} mb="lg">
                        Simulador de Crédito
                    </Title>

                    <form onSubmit={handleSubmit}>
                        <Stack gap="md">
                            <NumberInput
                                label="Monto del crédito"
                                placeholder="Ingresa el monto"
                                value={formData.amount}
                                onChange={(value) =>
                                    setFormData({ ...formData, amount: Number(value) || 0 })
                                }
                                min={1000}
                                max={1000000}
                                step={1000}
                                thousandSeparator=","
                                prefix="$"
                                required
                            />

                            <NumberInput
                                label="Tasa anual (%)"
                                placeholder="Ingresa la tasa"
                                value={formData.annual_rate}
                                onChange={(value) =>
                                    setFormData({ ...formData, annual_rate: Number(value) || 0 })
                                }
                                min={0.1}
                                max={100}
                                step={0.1}
                                decimalScale={2}
                                suffix="%"
                                required
                            />

                            <NumberInput
                                label="Plazo (meses)"
                                placeholder="Ingresa el plazo"
                                value={formData.months}
                                onChange={(value) =>
                                    setFormData({ ...formData, months: Number(value) || 0 })
                                }
                                min={1}
                                max={360}
                                step={1}
                                required
                            />

                            <Group justify="flex-end" mt="md">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleReset}
                                    disabled={loading}
                                >
                                    Limpiar
                                </Button>
                                <Button type="submit" loading={loading}>
                                    Simular
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Paper>

                {error && (
                    <Alert color="red" title="Error">
                        {error}
                    </Alert>
                )}

                {loading && (
                    <Paper shadow="sm" p="xl" radius="md" withBorder>
                        <Group justify="center">
                            <Loader size="lg" />
                            <Text>Calculando simulación...</Text>
                        </Group>
                    </Paper>
                )}

                {data && !loading && (
                    <Paper shadow="sm" p="xl" radius="md" withBorder>
                        <Title order={3} mb="lg">
                            Tabla de Amortización
                        </Title>

                        <Table striped highlightOnHover withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Mes</Table.Th>
                                    <Table.Th>Pago</Table.Th>
                                    <Table.Th>Capital</Table.Th>
                                    <Table.Th>Interés</Table.Th>
                                    <Table.Th>Saldo Restante</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {data.schedule.map((item) => (
                                    <Table.Tr key={item.month}>
                                        <Table.Td>{item.month}</Table.Td>
                                        <Table.Td>{formatCurrency(item.payment)}</Table.Td>
                                        <Table.Td>{formatCurrency(item.principal)}</Table.Td>
                                        <Table.Td>{formatCurrency(item.interest)}</Table.Td>
                                        <Table.Td>{formatCurrency(item.remaining_balance)}</Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Paper>
                )}
            </Stack>
        </Container>
    );
}

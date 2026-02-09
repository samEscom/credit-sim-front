import type {
    CreditSimulationRequest,
    CreditSimulationResponse,
    CreditSimulationByIdResponse,
} from '../types';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export class CreditApiError extends Error {
    status?: number;
    statusText?: string;

    constructor(
        message: string,
        status?: number,
        statusText?: string
    ) {
        super(message);
        this.name = 'CreditApiError';
        this.status = status;
        this.statusText = statusText;
    }
}


export async function simulateCredit(
    request: CreditSimulationRequest
): Promise<CreditSimulationResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/credit/simulate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new CreditApiError(
                `Failed to simulate credit: ${response.statusText}`,
                response.status,
                response.statusText
            );
        }

        const data: CreditSimulationResponse = await response.json();
        return data;
    } catch (error) {
        if (error instanceof CreditApiError) {
            throw error;
        }

        throw new CreditApiError(
            `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}

export async function getSimulationById(
    simulationId: string
): Promise<CreditSimulationByIdResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/credit/simulate/${simulationId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new CreditApiError(
                `Failed to get simulation by id: ${response.statusText}`,
                response.status,
                response.statusText
            );
        }

        const data: CreditSimulationByIdResponse = await response.json();
        return data;
    } catch (error) {
        if (error instanceof CreditApiError) {
            throw error;
        }

        throw new CreditApiError(
            `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}

export const creditClient = {
    simulateCredit,
    getSimulationById,
};

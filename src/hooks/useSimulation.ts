import { useState } from 'react';
import type {
    CreditSimulationRequest,
    CreditSimulationResponse,
} from '../types';
import { creditClient } from '../api';

interface UseSimulationState {
    data: CreditSimulationResponse | null;
    loading: boolean;
    error: string | null;
}

interface UseSimulationReturn extends UseSimulationState {
    simulate: (request: CreditSimulationRequest) => Promise<void>;
    reset: () => void;
}

export function useSimulation(): UseSimulationReturn {
    const [state, setState] = useState<UseSimulationState>({
        data: null,
        loading: false,
        error: null,
    });

    const simulate = async (request: CreditSimulationRequest): Promise<void> => {
        setState({
            data: null,
            loading: true,
            error: null,
        });

        try {
            const response = await creditClient.simulateCredit(request);
            setState({
                data: response,
                loading: false,
                error: null,
            });
        } catch (err) {
            setState({
                data: null,
                loading: false,
                error: err instanceof Error ? err.message : 'An unknown error occurred',
            });
        }
    };

    const reset = (): void => {
        setState({
            data: null,
            loading: false,
            error: null,
        });
    };

    return {
        ...state,
        simulate,
        reset,
    };
}

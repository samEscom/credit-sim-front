// Request payload for credit simulation
export interface CreditSimulationRequest {
    amount: number;
    annual_rate: number;
    months: number;
}

// Payment schedule item for a specific month
export interface PaymentScheduleItem {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remaining_balance: number;
}

// Response from credit simulation API
export interface CreditSimulationResponse {
    simulation_id: string;
    schedule: PaymentScheduleItem[];
}

export interface CreditSimulationByIdResponse {
    id: string;
    amount: number;
    annual_rate: number;
    months: number;
    risk_score: string;
    created_at: string;
    updated_at: string;
}

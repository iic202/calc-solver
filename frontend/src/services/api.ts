import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// API Response Types
export interface DerivativeRequest {
  expression: string;
  variable: string;
  order: number;
}

export interface DerivativeResponse {
  original_expression: string;
  derivative_expression: string;
  derivative_latex: string;
  expression_latex: string;
  variable: string;
  order: number;
}

export interface IntegralRequest {
  expression: string;
  variable: string;
  definite?: boolean;
  lower_bound?: string;
  upper_bound?: string;
}

export interface IntegralResponse {
  original_expression: string;
  integral_expression: string;
  integral_latex: string;
  expression_latex: string;
  variable: string;
  definite: boolean;
  value?: string;
}

// API Client
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Functions
export const calculusAPI = {
  async calculateDerivative(request: DerivativeRequest): Promise<DerivativeResponse> {
    const response = await apiClient.post<DerivativeResponse>('/calculus/derivative', request);
    return response.data;
  },

  async calculateIntegral(request: IntegralRequest): Promise<IntegralResponse> {
    const response = await apiClient.post<IntegralResponse>('/calculus/integral', request);
    return response.data;
  },
};

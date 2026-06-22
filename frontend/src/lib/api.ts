const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api';

interface ApiError extends Error {
  status?: number;
  backendDown?: boolean;
  apiCreditsOver?: boolean;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = new Error('An error occurred');

      if (response.status === 503) {
        error.status = 503;
        error.backendDown = true;
        error.message = 'Backend is currently not running. Please try again later.';
        throw error;
      }

      if (response.status === 402 || response.status === 429) {
        error.status = response.status;
        error.apiCreditsOver = true;
        error.message = 'API credits exhausted. Please try again later.';
        throw error;
      }

      const data = await response.json().catch(() => ({}));
      error.message = data.error || error.message;
      throw error;
    }

    return response.json();
  }

  private rethrowWithBackendFlag(error: unknown): never {
    const apiError = error as ApiError;

    if (apiError?.backendDown || apiError?.apiCreditsOver) {
      throw apiError;
    }

    const message = (apiError?.message || '').toLowerCase();
    const isNetworkFailure =
      message.includes('failed to fetch') ||
      message.includes('networkerror') ||
      message.includes('network request failed') ||
      message.includes('load failed');

    if (isNetworkFailure) {
      const backendError: ApiError = new Error('Backend is currently not running. Please try again later.');
      backendError.status = 503;
      backendError.backendDown = true;
      throw backendError;
    }

    throw apiError;
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      this.rethrowWithBackendFlag(error);
    }
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      this.rethrowWithBackendFlag(error);
    }
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      this.rethrowWithBackendFlag(error);
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      this.rethrowWithBackendFlag(error);
    }
  }

  async checkHealth(): Promise<{ status: string; backendDown?: boolean }> {
    try {
      const response = await fetch(`${this.baseUrl.replace('/api', '')}/api/health`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      
      if (!response.ok) {
        return { status: 'down', backendDown: true };
      }
      
      const data = await response.json();
      return { status: data.status, backendDown: false };
    } catch {
      return { status: 'down', backendDown: true };
    }
  }
}

export const api = new ApiClient(API_URL);
export default api;

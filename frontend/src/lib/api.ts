const API_BASE_URL = 'http://localhost:5002/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      createdAt: string;
    };
    token: string;
  };
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      createdAt: string;
    };
  };
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('bluecarbon_token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse['data']>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }) as Promise<AuthResponse>;
  }

  async register(email: string, password: string, name: string, role: string): Promise<AuthResponse> {
    return this.request<AuthResponse['data']>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role }),
    }) as Promise<AuthResponse>;
  }

  async getMe(): Promise<UserResponse> {
    return this.request<UserResponse['data']>('/auth/me') as Promise<UserResponse>;
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // User management endpoints
  async getAllUsers() {
    return this.request('/users');
  }

  async getUserById(userId: string) {
    return this.request(`/users/${userId}`);
  }

  async updateUserRole(userId: string, role: string) {
    return this.request(`/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  async toggleUserStatus(userId: string) {
    return this.request(`/users/${userId}/toggle-status`, {
      method: 'PUT',
    });
  }

  // Field Data endpoints
  async createFieldData(data: any) {
    return this.request('/field-data', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async saveFieldDataDraft(data: any) {
    return this.request('/field-data/draft', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyFieldData() {
    return this.request('/field-data/my-data');
  }

  async getFieldDataById(id: string) {
    return this.request(`/field-data/${id}`);
  }

  async updateFieldData(id: string, data: any) {
    return this.request(`/field-data/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteFieldData(id: string) {
    return this.request(`/field-data/${id}`, {
      method: 'DELETE',
    });
  }

  async getAllFieldData() {
    return this.request('/field-data');
  }

  async verifyFieldData(id: string, status: string, notes?: string) {
    return this.request(`/field-data/${id}/verify`, {
      method: 'PUT',
      body: JSON.stringify({ status, verificationNotes: notes }),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

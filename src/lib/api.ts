// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const TOKEN_KEY = "loomic_auth_token";

// Types
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthData {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

// Token Management
const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
};

const removeToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
};

// API Helper Function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = getToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || data.error || "An error occurred",
      };
    }

    return {
      success: true,
      data: data.data || data,
    };
  } catch (error) {
    console.error("API request error:", error);
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}

// API Methods
const login = async (credentials: LoginCredentials): Promise<ApiResponse<AuthData>> => {
  return apiRequest<AuthData>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

const signup = async (credentials: SignupCredentials): Promise<ApiResponse<AuthData>> => {
  return apiRequest<AuthData>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

const logout = async (): Promise<ApiResponse> => {
  return apiRequest("/auth/logout", {
    method: "POST",
  });
};

const getCurrentUser = async (): Promise<
  ApiResponse<{ id: string; name: string; email: string; avatar?: string }>
> => {
  return apiRequest("/auth/me", {
    method: "GET",
  });
};

export const api = {
  login,
  signup,
  logout,
  getCurrentUser,
  getToken,
  setToken,
  removeToken,
};


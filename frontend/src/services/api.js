
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const TOKEN_KEY = 'auth_token';

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    if (response.status === 401) {
      clearAuthToken();
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
}

export const AuthAPI = {
  login: async (username, password) => {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (data?.access_token) {
      setAuthToken(data.access_token);
    }

    return data;
  },
  me: () => apiCall('/auth/me'),
  logout: () => clearAuthToken(),
};

export const ProductAPI = {
  getAll: () => apiCall('/products'),
  getById: (id) => apiCall(`/products/${id}`),
  create: (productData) =>
    apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),
  update: (id, productData) =>
    apiCall(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    }),
  delete: (id) =>
    apiCall(`/products/${id}`, {
      method: 'DELETE',
    }),
};

export const SalesAPI = {
  getAll: () => apiCall('/sales'),
  getByProductId: (productId) => apiCall(`/sales?product_id=${productId}`),
  create: (saleData) =>
    apiCall('/sales', {
      method: 'POST',
      body: JSON.stringify(saleData),
    }),
  getByDateRange: (startDate, endDate) =>
    apiCall(`/sales?start_date=${startDate}&end_date=${endDate}`),
};

export const BatchAPI = {
  getAll: () => apiCall('/batches'),
  create: (batchData) =>
    apiCall('/batches', {
      method: 'POST',
      body: JSON.stringify(batchData),
    }),
};

export const CostingAPI = {
  calculate: (costingData) =>
    apiCall('/costing/calculate', {
      method: 'POST',
      body: JSON.stringify(costingData),
    }),
  save: (costingData) =>
    apiCall('/costing/save', {
      method: 'POST',
      body: JSON.stringify(costingData),
    }),
  getHistory: (productId) => apiCall(`/costing/history/${productId}`),
};


export const DashboardAPI = {
  getSummary: () => apiCall('/dashboard/summary'),
  getMetrics: (year, month) => apiCall(`/dashboard/metrics?year=${year}&month=${month}`),
  getRecentTransactions: (limit = 5) => apiCall(`/dashboard/recent-transactions?limit=${limit}`),
};

export default {
  AuthAPI,
  ProductAPI,
  SalesAPI,
  BatchAPI,
  CostingAPI,
  DashboardAPI,
};

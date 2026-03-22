const API_BASE = 'http://localhost:5000/api';

class API {
    static async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        const config = {
            headers: { 'Content-Type': 'application/json' },
            ...options
        };
        if (token) config.headers.Authorization = `Bearer ${token}`;

        try {
            const response = await fetch(`${API_BASE}${endpoint}`, config);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'API request failed');
            }
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static async getProducts() {
        return this.request('/products');
    }

    static async createProduct(productData, token) {
        const formData = new FormData();
        Object.keys(productData).forEach(key => {
            formData.append(key, productData[key]);
        });

        const response = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        return response.json();
    }

    static async login(credentials) {
        return this.request('/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    static async register(credentials) {
        return this.request('/register', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    static async placeOrder(orderData) {
        return this.request('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    }
}

// Export for module usage, or attach to window for simple script tags
window.api = API;

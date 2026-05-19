import axios from 'axios'

const API_URL = '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Products
export const fetchProducts = () => api.get('/products')
export const fetchProduct = (id) => api.get(`/products/${id}`)
export const createProduct = (data) => api.post('/products', data)
export const updateProduct = (id, data) => api.put(`/products/${id}`, data)
export const deleteProduct = (id) => api.delete(`/products/${id}`)

// Orders
export const createOrder = (data) => api.post('/orders', data)
export const fetchOrders = () => api.get('/orders')
export const fetchOrder = (id) => api.get(`/orders/${id}`)
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}`, { status })

// Auth
export const login = (email, password) => api.post('/auth/login', { email, password })
export const register = (email, password, name) => api.post('/auth/register', { email, password, name })

// BKash
export const initiateBkashPayment = (data) => api.post('/bkash/payment', data)
export const executeBkashPayment = (data) => api.post('/bkash/execute', data)

// Users
export const fetchUsers = () => api.get('/users')
export const fetchUserLogins = () => api.get('/users/logins')

export default api

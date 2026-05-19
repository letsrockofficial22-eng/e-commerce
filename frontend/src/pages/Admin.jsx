import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import {
  fetchOrders,
  fetchProducts,
  fetchUsers,
  fetchUserLogins,
  updateOrderStatus,
  updateProduct,
  deleteProduct
} from '../api'
import OrdersTab from '../components/admin/OrdersTab'
import ProductsTab from '../components/admin/ProductsTab'
import UsersTab from '../components/admin/UsersTab'

export default function Admin() {
  const navigate = useNavigate()
  const user = useStore(state => state.user)
  const admin = useStore(state => state.admin)
  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [logins, setLogins] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !admin) {
      navigate('/login')
      return
    }
    loadData()
  }, [user, admin, navigate])

  const loadData = async () => {
    setLoading(true)
    try {
      const [ordersRes, productsRes, usersRes, loginsRes] = await Promise.all([
        fetchOrders(),
        fetchProducts(),
        fetchUsers(),
        fetchUserLogins()
      ])
      setOrders(ordersRes.data)
      setProducts(productsRes.data)
      setUsers(usersRes.data)
      setLogins(loginsRes.data)
    } catch (error) {
      console.error('Error loading admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 style={{ padding: '1rem', borderBottom: '1px solid #444' }}>Admin Panel</h2>
        <button
          onClick={() => setActiveTab('orders')}
          className={activeTab === 'orders' ? 'active' : ''}
        >
          📦 Orders
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={activeTab === 'products' ? 'active' : ''}
        >
          💾 Products
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={activeTab === 'users' ? 'active' : ''}
        >
          👥 Users
        </button>
        <button
          onClick={() => setActiveTab('logins')}
          className={activeTab === 'logins' ? 'active' : ''}
        >
          🔐 Logins
        </button>
        <button
          onClick={() => navigate('/')}
          style={{ marginTop: '2rem' }}
        >
          ← Back to Store
        </button>
      </aside>

      <main className="admin-main">
        {activeTab === 'orders' && <OrdersTab orders={orders} onUpdate={loadData} />}
        {activeTab === 'products' && <ProductsTab products={products} onUpdate={loadData} />}
        {activeTab === 'users' && <UsersTab users={users} logins={logins} />}
      </main>
    </div>
  )
}

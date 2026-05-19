import { useState } from 'react'
import { updateOrderStatus } from '../../api'

export default function OrdersTab({ orders, onUpdate }) {
  const [updatingId, setUpdatingId] = useState(null)

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingId(orderId)
    try {
      await updateOrderStatus(orderId, newStatus)
      onUpdate()
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Error updating order status')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div>
      <h2>Orders Management</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Items</th>
            <th>Total (৳)</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.customerPhone}</td>
              <td>{order.items?.length || 0} items</td>
              <td>{order.totalAmount?.toLocaleString('en-BD') || '0'}</td>
              <td>
                <span className={`status-badge status-${order.status}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.paymentMethod}</td>
              <td>
                <select
                  onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                  disabled={updatingId === order.id}
                  defaultValue={order.status}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && (
        <p style={{ textAlign: 'center', padding: '2rem' }}>No orders found.</p>
      )}
    </div>
  )
}

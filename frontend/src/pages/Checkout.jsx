import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrder, initiateBkashPayment } from '../api'
import { useStore } from '../store'

export default function Checkout() {
  const navigate = useNavigate()
  const cart = useStore(state => state.cart)
  const clearCart = useStore(state => state.clearCart)
  const user = useStore(state => state.user)

  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('bkash')
  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    customerEmail: user?.email || '',
    customerPhone: '',
    shippingAddress: '',
    city: '',
    postalCode: '',
    bkashNumber: ''
  })

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (cart.length === 0) {
    return (
      <div className="alert alert-error">
        <h2>Cart is empty</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Continue Shopping
        </button>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate form
      if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.shippingAddress) {
        alert('Please fill all required fields')
        setLoading(false)
        return
      }

      if (paymentMethod === 'bkash' && !formData.bkashNumber) {
        alert('Please enter your BKash number')
        setLoading(false)
        return
      }

      // Create order
      const orderData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: formData.shippingAddress,
        city: formData.city,
        postalCode: formData.postalCode,
        items: cart,
        totalAmount: total,
        paymentMethod,
        status: 'pending'
      }

      const orderResponse = await createOrder(orderData)
      const orderId = orderResponse.data.id

      // Initiate BKash payment if selected
      if (paymentMethod === 'bkash') {
        const paymentData = {
          orderId,
          amount: total,
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          bkashNumber: formData.bkashNumber
        }

        await initiateBkashPayment(paymentData)
        
        alert('Payment initiated! Please complete the BKash transaction.')
        
        // Demo: In production, you would redirect to BKash payment page
        // For now, we'll show a demo payment confirmation
        setTimeout(() => {
          alert('Demo: Payment confirmed! Order placed successfully.')
          clearCart()
          navigate(`/`)
        }, 2000)
      } else {
        alert('Order placed successfully! Total: ৳' + total.toLocaleString('en-BD'))
        clearCart()
        navigate('/')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Error during checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', margin: '2rem 0' }}>
      <form onSubmit={handleCheckout} className="checkout-form">
        <h2>Checkout</h2>

        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleInputChange}
            placeholder="01XXXXXXXXX"
            required
          />
        </div>

        <div className="form-group">
          <label>Shipping Address *</label>
          <input
            type="text"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleInputChange}
            placeholder="Street address"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="e.g., Dhaka"
            />
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Payment Method</h3>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="radio"
              value="bkash"
              checked={paymentMethod === 'bkash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            {' '}BKash
          </label>
        </div>

        {paymentMethod === 'bkash' && (
          <div className="form-group">
            <label>BKash Number *</label>
            <input
              type="tel"
              name="bkashNumber"
              value={formData.bkashNumber}
              onChange={handleInputChange}
              placeholder="01XXXXXXXXX"
              required={paymentMethod === 'bkash'}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: '100%', padding: '1rem', marginTop: '1.5rem' }}
        >
          {loading ? 'Processing...' : 'Complete Order'}
        </button>
      </form>

      <div className="cart-summary" style={{ height: 'fit-content' }}>
        <h2>Order Summary</h2>
        <div style={{ marginBottom: '1rem' }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{item.name} x {item.quantity}</span>
              <span>৳ {(item.price * item.quantity).toLocaleString('en-BD')}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '2px solid #ddd', paddingTop: '1rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
            <span>Total:</span>
            <span>৳ {total.toLocaleString('en-BD')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

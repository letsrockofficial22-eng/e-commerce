import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'

export default function Cart() {
  const navigate = useNavigate()
  const cart = useStore(state => state.cart)
  const removeFromCart = useStore(state => state.removeFromCart)
  const updateCartQuantity = useStore(state => state.updateCartQuantity)

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div style={{ flex: 1 }}>
              <h3>{item.name}</h3>
              <p style={{ color: '#666' }}>৳ {item.price.toLocaleString('en-BD')}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value))}
                style={{ width: '70px', padding: '0.5rem' }}
              />
              <div style={{ minWidth: '120px', textAlign: 'right' }}>
                ৳ {(item.price * item.quantity).toLocaleString('en-BD')}
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="btn btn-danger"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          Total: ৳ {total.toLocaleString('en-BD')}
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="btn btn-primary"
          style={{ width: '100%', padding: '1rem' }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

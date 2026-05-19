import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store'

export default function Header() {
  const navigate = useNavigate()
  const cart = useStore(state => state.cart)
  const user = useStore(state => state.user)
  const admin = useStore(state => state.admin)
  const setUser = useStore(state => state.setUser)

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <header>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h1>💻 Computer Store</h1>
          </Link>

          <nav>
            <Link to="/">Products</Link>
            {user ? (
              <>
                <span>Hello, {user.name}</span>
                {admin && <Link to="/admin">Admin Panel</Link>}
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <Link to="/cart" className="cart-icon">
              🛒
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

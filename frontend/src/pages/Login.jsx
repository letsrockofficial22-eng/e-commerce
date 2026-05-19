import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../api'
import { useStore } from '../store'

export default function Login() {
  const navigate = useNavigate()
  const setUser = useStore(state => state.setUser)
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: 'admin@example.com',
    password: 'password123',
    name: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let response
      if (isLogin) {
        response = await login(formData.email, formData.password)
      } else {
        response = await register(formData.email, formData.password, formData.name)
      }

      localStorage.setItem('token', response.data.token)
      setUser(response.data.user)
      navigate('/')
    } catch (error) {
      alert('Authentication failed: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="checkout-form" style={{ margin: '4rem auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>{isLogin ? 'Login' : 'Register'}</h1>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required={!isLogin}
            />
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
          {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
        </button>
      </form>

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          onClick={() => {
            setIsLogin(!isLogin)
            setFormData({ email: '', password: '', name: '' })
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#667eea',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>

      <div className="alert alert-info" style={{ marginTop: '2rem' }}>
        <strong>Demo Credentials (Admin):</strong>
        <p>Email: admin@example.com</p>
        <p>Password: password123</p>
      </div>
    </div>
  )
}

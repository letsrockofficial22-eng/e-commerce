import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProduct } from '../api'
import { useStore } from '../store'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const addToCart = useStore(state => state.addToCart)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      const response = await fetchProduct(id)
      setProduct(response.data)
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    alert('Added to cart!')
  }

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>
  }

  if (!product) {
    return <div className="alert alert-error">Product not found</div>
  }

  return (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
      <button onClick={() => navigate('/')} className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
        ← Back to Products
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <div style={{
            background: 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '5rem',
            borderRadius: '8px'
          }}>
            {product.emoji || '📦'}
          </div>
        </div>

        <div>
          <h1>{product.name}</h1>
          <p style={{ color: '#666', marginBottom: '1rem' }}>{product.category}</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#555' }}>
            {product.description}
          </p>

          <div style={{
            background: '#f9f9f9',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            <h3>Specifications</h3>
            <p><strong>Model:</strong> {product.model}</p>
            <p><strong>Warranty:</strong> {product.warranty}</p>
            <p><strong>Stock:</strong> {product.stock} units available</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#667eea', fontSize: '2rem' }}>
              ৳ {product.price.toLocaleString('en-BD')}
            </h2>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Quantity:
            </label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              style={{ padding: '0.5rem', width: '100px' }}
            />
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

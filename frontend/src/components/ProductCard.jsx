import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const addToCart = useStore(state => state.addToCart)

  const handleQuickAdd = () => {
    addToCart(product)
    alert('Added to cart!')
  }

  return (
    <div className="product-card">
      <div className="product-image">{product.emoji || '📦'}</div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-category">{product.category}</div>
        <div className="product-description">{product.description}</div>
        <div className="product-specs">
          <strong>Model:</strong> {product.model}<br/>
          <strong>Warranty:</strong> {product.warranty}
        </div>
        <div className="product-footer">
          <div className="product-price">৳ {product.price.toLocaleString('en-BD')}</div>
          <div style={{ fontSize: '0.85rem' }}>
            {product.stock > 0 ? (
              <span style={{ color: '#28a745' }}>In Stock</span>
            ) : (
              <span style={{ color: '#dc3545' }}>Out of Stock</span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="btn btn-secondary"
            style={{ flex: 1 }}
          >
            View
          </button>
          <button
            onClick={handleQuickAdd}
            className="btn btn-primary"
            style={{ flex: 1 }}
            disabled={product.stock === 0}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

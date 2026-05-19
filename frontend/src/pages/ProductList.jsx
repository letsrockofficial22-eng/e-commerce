import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProducts } from '../api'
import { useStore } from '../store'
import ProductCard from '../components/ProductCard'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const response = await fetchProducts()
      setProducts(response.data)
      setFiltered(response.data)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let result = products

    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (category !== 'all') {
      result = result.filter(p => p.category === category)
    }

    setFiltered(result)
  }, [searchTerm, category, products])

  const categories = [...new Set(products.map(p => p.category))]

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>
  }

  return (
    <div>
      <div className="hero">
        <h2>Computer Components Store</h2>
        <p>High-quality components at affordable prices in BDT</p>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No products found.</p>
        </div>
      )}
    </div>
  )
}

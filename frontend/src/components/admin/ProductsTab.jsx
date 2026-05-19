import { useState } from 'react'
import { updateProduct, deleteProduct } from '../../api'

export default function ProductsTab({ products, onUpdate }) {
  const [editingId, setEditingId] = useState(null)
  const [editFormData, setEditFormData] = useState({})

  const handleEditStart = (product) => {
    setEditingId(product.id)
    setEditFormData({ ...product })
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseInt(value) : value
    }))
  }

  const handleEditSave = async (productId) => {
    try {
      await updateProduct(productId, editFormData)
      onUpdate()
      setEditingId(null)
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Error updating product')
    }
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId)
        onUpdate()
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Error deleting product')
      }
    }
  }

  return (
    <div>
      <h2>Products Management</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price (৳)</th>
            <th>Stock</th>
            <th>Model</th>
            <th>Warranty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>
                {editingId === product.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editingId === product.id ? (
                  <input
                    type="text"
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditChange}
                  />
                ) : (
                  product.category
                )}
              </td>
              <td>
                {editingId === product.id ? (
                  <input
                    type="number"
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditChange}
                  />
                ) : (
                  product.price?.toLocaleString('en-BD')
                )}
              </td>
              <td>
                {editingId === product.id ? (
                  <input
                    type="number"
                    name="stock"
                    value={editFormData.stock}
                    onChange={handleEditChange}
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td>{product.model}</td>
              <td>{product.warranty}</td>
              <td>
                {editingId === product.id ? (
                  <>
                    <button
                      className="btn btn-primary btn-small"
                      onClick={() => handleEditSave(product.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-small"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-secondary btn-small"
                      onClick={() => handleEditStart(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && (
        <p style={{ textAlign: 'center', padding: '2rem' }}>No products found.</p>
      )}
    </div>
  )
}

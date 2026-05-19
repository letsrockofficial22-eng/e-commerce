import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'No token' })

  jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' })
    req.user = user
    next()
  })
}

// ==================== AUTH ROUTES ====================

// Register
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const { data, error } = await supabase
      .from('users')
      .insert([{
        email,
        password: hashedPassword,
        name,
        role: 'customer'
      }])
      .select()

    if (error) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const token = jwt.sign(
      { id: data[0].id, email, role: data[0].role },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    )

    // Log the login
    await supabase
      .from('user_logins')
      .insert([{
        userId: data[0].id,
        email,
        loginTime: new Date().toISOString(),
        userAgent: req.headers['user-agent']
      }])

    res.json({
      token,
      user: { id: data[0].id, email, name, role: data[0].role }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !data) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const validPassword = await bcrypt.compare(password, data.password)
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: data.id, email, role: data.role },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    )

    // Log the login
    await supabase
      .from('user_logins')
      .insert([{
        userId: data.id,
        email,
        loginTime: new Date().toISOString(),
        userAgent: req.headers['user-agent']
      }])

    res.json({
      token,
      user: { id: data.id, email, name: data.name, role: data.role }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ==================== PRODUCT ROUTES ====================

// Get all products
app.get('/products', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single product
app.get('/products/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create product
app.post('/products', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const { name, description, price, stock, category, model, warranty, emoji } = req.body

    const { data, error } = await supabase
      .from('products')
      .insert([{
        name,
        description,
        price,
        stock,
        category,
        model,
        warranty,
        emoji,
        createdAt: new Date().toISOString()
      }])
      .select()

    if (error) throw error
    res.json(data[0])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update product
app.put('/products/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const { data, error } = await supabase
      .from('products')
      .update(req.body)
      .eq('id', req.params.id)
      .select()

    if (error) throw error
    res.json(data[0])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete product
app.delete('/products/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id)

    if (error) throw error
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ==================== ORDER ROUTES ====================

// Get all orders
app.get('/orders', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single order
app.get('/orders/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create order
app.post('/orders', async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, shippingAddress, city, postalCode, items, totalAmount, paymentMethod } = req.body

    const { data, error } = await supabase
      .from('orders')
      .insert([{
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        city,
        postalCode,
        items,
        totalAmount,
        paymentMethod,
        status: 'pending',
        createdAt: new Date().toISOString()
      }])
      .select()

    if (error) throw error
    res.json(data[0])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update order status
app.put('/orders/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const { data, error } = await supabase
      .from('orders')
      .update({ status: req.body.status })
      .eq('id', req.params.id)
      .select()

    if (error) throw error
    res.json(data[0])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ==================== USER ROUTES ====================

// Get all users
app.get('/users', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, role, createdAt')
      .order('id', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get user logins
app.get('/users/logins', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const { data, error } = await supabase
      .from('user_logins')
      .select('*')
      .order('loginTime', { ascending: false })
      .limit(50)

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ==================== BKASH ROUTES ====================

// Initiate BKash payment
app.post('/bkash/payment', async (req, res) => {
  try {
    const { orderId, amount, customerName, customerPhone, bkashNumber } = req.body

    // Store payment info
    const { data, error } = await supabase
      .from('payments')
      .insert([{
        orderId,
        amount,
        customerName,
        customerPhone,
        bkashNumber,
        status: 'initiated',
        createdAt: new Date().toISOString()
      }])
      .select()

    if (error) throw error

    // In production, you would integrate with actual BKash API
    // For demo, we'll just return success
    res.json({
      message: 'Payment initiated',
      paymentId: data[0].id
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Execute BKash payment
app.post('/bkash/execute', async (req, res) => {
  try {
    const { paymentId, transactionId } = req.body

    const { data, error } = await supabase
      .from('payments')
      .update({
        status: 'completed',
        transactionId,
        completedAt: new Date().toISOString()
      })
      .eq('id', paymentId)
      .select()

    if (error) throw error

    res.json({ message: 'Payment completed', payment: data[0] })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'API is running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 API URL: http://localhost:${PORT}`)
})

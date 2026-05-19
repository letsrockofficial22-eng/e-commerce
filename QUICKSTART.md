# Computer Store - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Setup Supabase Database

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Go to **SQL Editor** → **New Query**
4. Copy all SQL from `backend/database.sql` and execute it
5. Go to **Settings** → **API** and copy:
   - Project URL → `SUPABASE_URL`
   - Anon Key → `SUPABASE_KEY`

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env

# Edit .env with your Supabase credentials
# SUPABASE_URL=https://xxxxx.supabase.co
# SUPABASE_KEY=xxxxx
# JWT_SECRET=your_random_secret_key
```

Start server:
```bash
npm run dev
# Server running on http://localhost:5000
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
# App running on http://localhost:5173
```

### 4. Login & Test

1. Open http://localhost:5173
2. Click "Login"
3. Use credentials:
   - Email: `admin@example.com`
   - Password: `password123`
4. Go to "Admin Panel" to manage orders, products, and users

## 📚 Default Demo Products

Your database includes 16 computer components ready to sell:

| Category | Product | Price |
|----------|---------|-------|
| CPU | Intel Core i9-13900KS | ৳85,000 |
| CPU | AMD Ryzen 7 7700X | ৳45,000 |
| GPU | NVIDIA RTX 4090 | ৳180,000 |
| GPU | RTX 4070 Ti | ৳95,000 |
| RAM | DDR5 64GB | ৳45,000 |
| Storage | WD Black NVMe 2TB | ৳25,000 |
| PSU | Corsair HX1200 | ৳22,000 |
| Case | Corsair 5000T | ৳16,000 |

## 💳 BKash Payment (Demo)

At checkout:
1. Enter customer details
2. Select BKash payment
3. Enter any 11-digit mobile number (01XXXXXXXXX)
4. Complete order
5. Demo shows payment confirmation

For real BKash integration, update credentials in backend/.env

## 📊 Admin Features

### Orders Tab
- View all customer orders
- Update order status
- Track payment method
- Customer contact details

### Products Tab
- Add, edit, delete products
- Update prices and stock
- Manage product categories

### Users Tab
- View all registered users
- See user roles
- Login history with timestamps

## 🔧 Customization

### Add Your Logo/Branding
Edit `frontend/src/components/Header.jsx`:
```jsx
<h1>💻 Your Store Name</h1>
```

### Change Currency
The app uses BDT (৳). To change:
1. Edit price formatting in components
2. Update currency symbol: `৳` → `$`, `€`, etc.

### Add More Products
Admin Panel → Products Tab → Or use API:
```bash
curl -X POST http://localhost:5000/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "price": 50000,
    "stock": 10,
    "category": "GPU",
    "description": "Description",
    "emoji": "🎮"
  }'
```

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Change port in backend/.env
PORT=5001

# Or kill existing process (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Supabase connection error?**
- Verify `.env` has correct credentials
- Check Supabase project is active
- Ensure SQL migrations ran successfully

**Can't login?**
- Clear browser cache: `Ctrl+Shift+Delete`
- Check admin user exists in users table

**Cart not persisting?**
- This is normal (demo uses memory storage)
- For persistence, add localStorage to store.js

## 📈 Next Steps

1. **Production Deployment:**
   - Frontend: Deploy to Vercel/Netlify
   - Backend: Deploy to Railway/Render
   - Update API URLs

2. **Real BKash Integration:**
   - Register for BKash API
   - Add sandbox credentials to .env
   - Update payment logic in server.js

3. **Database Backups:**
   - Enable automated backups in Supabase
   - Regular exports of data

4. **Email Notifications:**
   - Setup Supabase Email
   - Send order confirmations
   - Add password reset functionality

## 📞 Support

- Check README.md for detailed docs
- Review code comments
- Check browser console for errors
- Check backend logs for API issues

---

**Happy selling! 🎉**

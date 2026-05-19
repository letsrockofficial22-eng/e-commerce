# Computer Store - Full Stack E-Commerce Website

A complete full-stack e-commerce platform for selling computer components with React frontend, Node.js backend, Supabase database, and BKash payment integration.

## Features

✅ **Frontend**
- Product listing with search and filtering
- Product detail pages
- Shopping cart functionality
- Checkout with BKash payment integration
- User authentication (login/register)
- Responsive design

✅ **Admin Dashboard**
- Order management (view and update status)
- Product management (add, edit, delete, manage stock)
- User management and login tracking
- Real-time inventory updates

✅ **Backend**
- RESTful API for all operations
- JWT authentication
- BKash payment integration (demo-ready)
- Order tracking
- User session logging

✅ **Database (Supabase)**
- Users table with authentication
- Products catalog with stock management
- Orders with payment tracking
- Payment records
- User login history

## Tech Stack

### Frontend
- React 18
- Vite
- Zustand (state management)
- Axios (API calls)
- React Router (navigation)

### Backend
- Node.js
- Express
- Supabase (PostgreSQL)
- JWT (authentication)
- Bcrypt (password hashing)

### Database
- Supabase (PostgreSQL)
- Real-time capabilities

### Payment
- BKash API (demo integration)

## Project Structure

```
computer-store/
├── frontend/                 # React app
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── admin/           # Admin dashboard components
│   │   ├── App.jsx
│   │   ├── api.js           # API client
│   │   ├── store.js         # Zustand store
│   │   └── index.css        # Styles
│   └── package.json
│
├── backend/                  # Express server
│   ├── server.js            # Main server file
│   ├── database.sql         # Schema and seed data
│   ├── .env.example         # Environment variables
│   └── package.json
│
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier available)

### Step 1: Set Up Supabase

1. Create account at https://supabase.com
2. Create a new project
3. Go to SQL Editor and run the SQL commands from `backend/database.sql`
4. Get your Supabase URL and Anon Key from Settings > API

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your Supabase credentials
# SUPABASE_URL=your_url
# SUPABASE_KEY=your_key
# JWT_SECRET=your_secret

# Start server
npm run dev
# Server runs on http://localhost:5000
```

### Step 3: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# App runs on http://localhost:5173
```

## Demo Credentials

**Admin Account:**
- Email: `admin@example.com`
- Password: `password123`

**Customer Account:**
- Email: `customer@example.com`
- Password: `password123`

## Demo Computer Components

The database includes 16 demo products:

**Processors:**
- Intel Core i9-13900KS - ৳85,000
- AMD Ryzen 7 7700X - ৳45,000

**Graphics Cards:**
- NVIDIA RTX 4090 - ৳180,000
- RTX 4070 Ti - ৳95,000

**RAM:**
- DDR5 64GB Kit - ৳45,000
- DDR4 32GB Kit - ৳15,000

**Storage:**
- WD Black NVMe 2TB - ৳25,000
- Samsung 870 QVO 1TB - ৳8,000

**Motherboards:**
- ASUS ROG Strix Z790 - ৳38,000
- MSI MPG B650E - ৳32,000

**Power Supplies:**
- Corsair HX1200 - ৳22,000
- Seasonic Focus 850 - ৳16,000

**Cooling:**
- NZXT Kraken Z73 - ৳18,000
- Noctua NH-D15 - ৳12,000

**Cases:**
- Corsair 5000T RGB - ৳16,000
- Lian Li Lancool 303 - ৳8,000

All prices are in **BDT (Bangladeshi Taka)**.

## API Endpoints

### Authentication
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /products` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

### Orders
- `GET /orders` - Get all orders (admin)
- `GET /orders/:id` - Get single order
- `POST /orders` - Create order
- `PUT /orders/:id` - Update order status (admin)

### Users
- `GET /users` - Get all users (admin)
- `GET /users/logins` - Get login history (admin)

### BKash (Demo)
- `POST /bkash/payment` - Initiate payment
- `POST /bkash/execute` - Execute payment

## Using with Supabase

### Setting up Row Level Security (Optional)

For production, enable RLS on tables:

```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read products
CREATE POLICY "Allow public read" ON products
  FOR SELECT USING (true);

-- Allow only admins to modify products
CREATE POLICY "Allow admin modify" ON products
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

### Environment Variables

Copy `.env.example` to `.env` and fill in:

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your_anon_key
JWT_SECRET=your_random_secret
PORT=5000
```

## BKash Integration

The app includes BKash payment integration. Currently set up as demo:

1. User enters BKash number at checkout
2. System initiates payment record in database
3. Demo shows confirmation (production: redirect to BKash)
4. Payment status tracked in Supabase

**To integrate real BKash API:**
1. Register at https://bkash.com
2. Get API credentials
3. Update `BKASH_*` environment variables
4. Uncomment real API calls in `backend/server.js`

## Admin Panel Features

**Orders Tab:**
- View all orders
- Update order status
- Track payment method
- Customer details

**Products Tab:**
- View all products
- Edit product details (name, price, stock)
- Delete products
- Quick stock updates

**Users Tab:**
- View registered users
- User roles (admin/customer)
- Login history by user
- Login timestamps and devices

## Development Tips

### Adding New Products

Use admin panel or make API call:

```bash
curl -X POST http://localhost:5000/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Name",
    "price": 50000,
    "stock": 10,
    "category": "GPU",
    "model": "Model123",
    "warranty": "2 Years",
    "description": "Product description",
    "emoji": "🎮"
  }'
```

### Creating Admin Users

Modify `database.sql` or use API:

```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newadmin@example.com",
    "password": "securepassword",
    "name": "Admin Name"
  }'
```

Then update role in Supabase dashboard.

## Troubleshooting

**CORS errors:**
- Ensure backend CORS is configured correctly
- Check frontend API URL points to correct backend

**Supabase connection issues:**
- Verify credentials in .env
- Check Supabase project is active
- Ensure tables are created from database.sql

**Auth not working:**
- Clear localStorage: `localStorage.clear()`
- Check JWT_SECRET matches between server and client
- Verify token format in requests

**BKash payment not working (demo):**
- This is normal for demo - production requires BKash sandbox setup
- To test, enter any 11-digit number for BKash

## 🚀 Production Deployment & Access

The project is now configured with a **unified architecture** where the backend serves the frontend. This simplifies deployment to a single service.

### 1. Local Production Preview

To test the production build on your computer:

```bash
# 1. Install all dependencies
npm run install-all

# 2. Build the frontend
npm run build:frontend

# 3. Start the unified production server
# Ensure your .env file in the backend folder is configured
npm start
```

Once started, the website will be accessible at: **http://localhost:5000**

### 2. Deploying to Vercel (Recommended)

This project is optimized for a **full-stack deployment on Vercel**.

1.  **Push your code to GitHub.**
2.  **Import the project into Vercel.**
3.  **Configure Environment Variables** in Vercel Project Settings:
    *   `SUPABASE_URL`: Your Supabase Project URL
    *   `SUPABASE_KEY`: Your Supabase Anon Key
    *   `JWT_SECRET`: A secure random string
4.  **Deploy!** Vercel will automatically detect the `vercel.json` and deploy the frontend as static files and the backend as Serverless Functions.

### 3. Deploying to Other Platforms (Render, Railway, etc.)

When you deploy to a platform like Render or Railway:

1.  **Connect your repository.**
2.  **Set the Build Command**: `npm run install-all && npm run build:frontend`
3.  **Set the Start Command**: `npm start`
4.  **Add Environment Variables**:
    *   `SUPABASE_URL`: Your Supabase Project URL
    *   `SUPABASE_KEY`: Your Supabase Anon Key
    *   `JWT_SECRET`: A secure random string for authentication
    *   `PORT`: `5000` (or the default provided by the host)

Your website will then be available at the URL provided by your hosting platform (e.g., `https://your-store.onrender.com`).

### Environment Variables (Production)
Update all `.env` variables with production Supabase project keys.

## Security Considerations

- Use HTTPS in production
- Never commit `.env` files
- Implement rate limiting
- Add input validation
- Use HTTPS for BKash integration
- Keep dependencies updated
- Enable Supabase RLS policies

## Support & Documentation

- [Supabase Docs](https://supabase.com/docs)
- [Express.js Docs](https://expressjs.com)
- [React Docs](https://react.dev)
- [BKash Docs](https://bkash.com)

## License

MIT

## Contributing

Feel free to fork and submit pull requests.

---

**Happy selling! 💻🛒**

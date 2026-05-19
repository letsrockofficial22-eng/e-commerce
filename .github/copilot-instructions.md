<!-- Use this file to provide workspace-specific custom instructions to Copilot. -->

# Computer Store - Full Stack E-Commerce Development

## Project Overview
Full-stack e-commerce website for selling computer components with React frontend, Node.js Express backend, Supabase database, and BKash payment integration.

## Key Features
- Product catalog with search/filter
- Shopping cart and checkout
- BKash payment integration
- Admin dashboard for orders, products, users, and login tracking
- User authentication and authorization
- Inventory management
- Order tracking

## Technology Stack
- **Frontend:** React 18, Vite, Zustand, React Router, Axios
- **Backend:** Node.js, Express, Supabase (PostgreSQL)
- **Auth:** JWT + Bcrypt
- **Payment:** BKash API
- **Styling:** CSS3 with responsive design

## Project Structure
```
d:/new project/
├── frontend/               (React app)
│   ├── src/
│   │   ├── components/    (Header, ProductCard, admin tabs)
│   │   ├── pages/         (ProductList, Cart, Checkout, Admin, Login)
│   │   ├── App.jsx
│   │   ├── api.js         (API client)
│   │   ├── store.js       (Zustand store)
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/               (Express API)
│   ├── server.js          (Main server file)
│   ├── database.sql       (Schema + seed data)
│   ├── .env.example
│   └── package.json
│
└── README.md

## Development Checklist
- [x] Project structure created
- [x] Frontend components built
- [x] Backend API implemented
- [x] Database schema created
- [x] BKash integration setup (demo)
- [x] Admin dashboard components
- [x] Authentication system
- [ ] Environment setup (.env files)
- [ ] Dependencies installation
- [ ] Testing

## Environment Setup Required

### Backend (.env)
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key
JWT_SECRET=your_secret_key
PORT=5000
```

### Frontend
API proxy configured in vite.config.js to http://localhost:5000

## Database Setup (Supabase)
1. Create Supabase account
2. Run SQL from backend/database.sql
3. Copy credentials to backend/.env

## Demo Credentials
- Admin: admin@example.com / password123
- Customer: customer@example.com / password123

## Next Steps
1. Install dependencies: `npm install` in both frontend and backend
2. Set up Supabase project and create .env
3. Run database migrations on Supabase
4. Start backend: `npm run dev` (port 5000)
5. Start frontend: `npm run dev` (port 5173)
6. Access at http://localhost:5173

## Key Files to Review
- `backend/database.sql` - Database schema and demo data
- `frontend/src/api.js` - API client configuration
- `backend/server.js` - All API routes
- `frontend/src/pages/Admin.jsx` - Admin dashboard structure

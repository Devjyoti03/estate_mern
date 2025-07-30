# 🏡 Estate MERN - Full Stack Real Estate Application

A comprehensive full-stack real estate web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js), featuring modern technologies like Prisma ORM and Cloudinary for seamless property management and media handling.

## ✨ Features

### 🔐 Authentication & User Management
- **Secure User Registration & Login** - JWT-based authentication system
- **User Profiles** - Complete user profile management with photo uploads
- **Role-based Access Control** - Different permissions for buyers, sellers, and agents

### 🏠 Property Management
- **Property Listings** - Create, read, update, and delete property listings
- **Advanced Search & Filtering** - Search by location, price range, property type, amenities
- **Property Details** - Comprehensive property information with multiple images
- **Favorites System** - Save and manage favorite properties
- **Property Comparison** - Compare multiple properties side by side

### 📱 User Experience
- **Responsive Design** - Fully responsive across all devices and screen sizes
- **Interactive Maps** - Property location visualization
- **Image Gallery** - High-quality image management with Cloudinary
- **Real-time Updates** - Live property status updates
- **Contact Forms** - Direct communication between buyers and sellers

### 🎯 Advanced Features
- **Dashboard Analytics** - User dashboard with statistics and insights
- **Property Recommendations** - AI-powered property suggestions
- **Review & Rating System** - User reviews and property ratings
- **Booking System** - Schedule property viewings
- **Payment Integration** - Secure payment processing for bookings

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI library for building interactive user interfaces
- **React Router** - Client-side routing for single-page application
- **Axios** - HTTP client for API requests
- **Context API/Redux** - State management
- **CSS3/Styled Components** - Modern styling and responsive design

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast and minimalist web framework
- **Prisma ORM** - Type-safe database access and migrations
- **JWT** - JSON Web Tokens for secure authentication
- **Bcrypt** - Password hashing and security

### Database
- **MongoDB** - NoSQL database for flexible data storage
- **Prisma Client** - Auto-generated type-safe database client

### Cloud Services
- **Cloudinary** - Cloud-based image and video management
  - Image optimization and transformation
  - Automatic format conversion
  - CDN delivery for fast loading

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Nodemon** - Development server auto-restart
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Devjyoti03/estate_mern.git
   cd estate_mern
   ```

2. **Install dependencies**
   
   For the backend:
   ```bash
   cd backend
   npm install
   ```
   
   For the frontend:
   ```bash
   cd client
   npm install
   ```

3. **Environment Configuration**
   
   Create `.env` file in the backend directory:
   ```env
   # Database
   DATABASE_URL="mongodb://localhost:27017/estate_mern"
   
   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Frontend URL (for CORS)
   CLIENT_URL=http://localhost:3000
   ```

4. **Database Setup**
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   npx prisma db seed  # Optional: seed with sample data
   ```

5. **Start the Development Servers**
   
   Backend server:
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend development server:
   ```bash
   cd client
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs (if implemented)

## 📁 Project Structure

```
estate_mern/
├── backend/
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/             # Database models (if using Mongoose)
│   ├── prisma/             # Prisma schema and migrations
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── config/             # Configuration files
│   └── server.js           # Express server setup
├── client/
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React Context providers
│   │   ├── services/       # API service functions
│   │   ├── utils/          # Utility functions
│   │   ├── styles/         # CSS/styling files
│   │   └── App.js          # Main App component
├── docs/                   # Documentation files
└── README.md
```

## 🔧 Configuration

### Cloudinary Setup
1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add these credentials to your `.env` file
4. Configure upload presets for different image types (profile, property images)

### Prisma Configuration
```javascript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  username  String   @unique
  password  String
  avatar    String?
  // ... other fields
}

model Property {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  price       Float
  images      String[]
  // ... other fields
}
```

## 📖 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Properties
- `GET /api/properties` - Get all properties with filtering
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create new property (authenticated)
- `PUT /api/properties/:id` - Update property (authenticated)
- `DELETE /api/properties/:id` - Delete property (authenticated)

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/favorites/:propertyId` - Add/remove from favorites

## 🎨 Key Components

### Frontend Components
- **PropertyCard** - Individual property display card
- **SearchFilters** - Advanced search and filtering interface
- **ImageGallery** - Property image carousel with Cloudinary optimization
- **PropertyForm** - Create/edit property listings
- **UserDashboard** - User management interface
- **AuthForms** - Login and registration forms

### Backend Services
- **authService** - Authentication and authorization logic
- **propertyService** - Property CRUD operations
- **imageService** - Cloudinary image upload and management
- **emailService** - Email notifications and communications

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt for secure password storage
- **Input Validation** - Comprehensive request validation
- **Rate Limiting** - API rate limiting to prevent abuse
- **CORS Configuration** - Proper cross-origin resource sharing
- **Environment Variables** - Secure configuration management

⭐ If you found this project helpful, please give it a star on GitHub!

## 🔗 Demo Video Link

[https://drive.google.com/file/d/1oTfqd76osivPveDBx-lwZ3j0twzvl4vc/view?usp=drive_link]

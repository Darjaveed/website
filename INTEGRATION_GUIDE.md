# LMS Platform - Backend Integration Guide

This document explains how the frontend and backend are integrated, the authentication flow, and how to run the complete system.

## Project Structure

```
upstairsx/
├── server/              # Backend (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/      # Database & Cloudinary config
│   │   ├── models/      # MongoDB schemas (User, Course)
│   │   ├── controllers/ # Business logic
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Auth middleware
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── src/                 # Frontend (React + Vite)
    ├── components/
    ├── pages/
    ├── services/        # API service files
    │   ├── authService.js
    │   ├── courseService.js
    │   └── uploadService.js
    ├── context/
    │   └── AuthContext.jsx
    └── data/
        └── courses.js   # Fallback static data
```

## How Frontend Talks to Backend

### 1. API Service Layer

Frontend uses service files in `src/services/` to communicate with the backend:

- **authService.js**: Handles authentication API calls
  - `login(email, password)` → `POST /api/auth/login`
  - `getCurrentUser()` → `GET /api/auth/me`
  - `logout()` → `POST /api/auth/logout`

- **courseService.js**: Handles course API calls
  - `fetchCourses(category)` → `GET /api/courses?category=program`
  - `fetchCourseBySlug(slug)` → `GET /api/courses/:slug`

- **uploadService.js**: Placeholder for future Cloudinary uploads

### 2. API URL Configuration

The API URL is configured via environment variable:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

Set `VITE_API_URL` in `.env` file in the frontend root.

### 3. Credentials & Cookies

All API calls use `credentials: 'include'` to send cookies automatically:

```javascript
fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  credentials: 'include', // Important for cookies
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

## Authentication Flow

### 1. Login Process

```
User fills login form
    ↓
Frontend calls authService.login(email, password)
    ↓
POST /api/auth/login
    ↓
Backend validates credentials
    ↓
Backend generates JWT token
    ↓
Backend sets HttpOnly cookie with token
    ↓
Backend returns user data
    ↓
AuthContext updates user state
    ↓
Navbar updates to show user name & logout button
```

### 2. JWT Token Storage

- **Backend**: Stores JWT in HttpOnly cookie (secure, not accessible via JavaScript)
- **Token expires**: 30 days
- **Cookie settings**: HttpOnly, Secure (production), SameSite: strict

### 3. Protected Routes

Backend middleware (`authMiddleware.js`) verifies JWT:

```javascript
// Backend checks cookie or Authorization header
const token = req.cookies.token || req.headers.authorization.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id);
```

### 4. Frontend Auth State

`AuthContext` manages authentication state:

- `user`: Current user object (null if not logged in)
- `isAuthenticated`: Boolean flag
- `userRole`: User's role (student, admin, super_admin)
- `login()`: Login function
- `logout()`: Logout function

## MongoDB Storage

### User Schema

```javascript
{
  name: String,
  email: String (unique),
  passwordHash: String (bcrypt hashed),
  role: 'student' | 'admin' | 'super_admin',
  createdAt: Date,
  updatedAt: Date
}
```

### Course Schema

```javascript
{
  title: String,
  slug: String (unique),
  category: 'program' | 'short-term',
  description: String,
  shortDescription: String,
  thumbnailImage: String (Cloudinary URL),
  previewVideoUrl: String (Cloudinary URL),
  price: Number,
  status: 'published' | 'draft',
  createdAt: Date,
  updatedAt: Date
}
```

## Cloudinary Integration

### Purpose
- Store course thumbnails
- Store preview videos
- Only URLs are saved in MongoDB

### Configuration
Cloudinary credentials are set in `server/.env`:
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Usage (Future)
The `uploadService.js` is ready for when upload endpoints are added to the backend.

## Data Flow: Static to Database

### Current Implementation

1. **Fallback Pattern**: Frontend tries API first, falls back to static data
2. **Static Data Location**: `src/data/courses.js`
3. **API Data Format**: Matches static data structure (with `_id` field)

### Migration Path

1. Seed database with course data from `courses.js`
2. Frontend automatically uses API data when available
3. Static data remains as fallback for development/offline mode

## Running the Project Locally

### 1. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Add your MongoDB URI, JWT_SECRET, and Cloudinary credentials

# Start MongoDB (if not running)
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: Start MongoDB service

# Run server
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to project root (where src/ is)
cd ..

# Install dependencies (if not already installed)
npm install

# Create .env file (optional, defaults to localhost:5000)
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Run frontend
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 3. Database Seeding

To populate the database with courses:

1. Use MongoDB Compass or mongo shell
2. Connect to `mongodb://localhost:27017/lms_platform`
3. Insert course documents into `courses` collection
4. Use the structure from `src/data/courses.js` as reference

Or create a seed script in `server/src/scripts/seedCourses.js`

## Security Notes

1. **JWT Secret**: Use a strong, random string in production
2. **Password Hashing**: Passwords are hashed with bcrypt (cost factor 12)
3. **HttpOnly Cookies**: Prevents XSS attacks
4. **CORS**: Configured to only allow requests from frontend URL
5. **No Secrets in Frontend**: All secrets stay on backend

## File-by-File Explanation

### Backend Files

- **server/src/server.js**: Entry point, starts Express server
- **server/src/app.js**: Express app configuration, middleware, routes
- **server/src/config/db.js**: MongoDB connection
- **server/src/config/cloudinary.js**: Cloudinary setup (for future uploads)
- **server/src/models/User.js**: User schema with password hashing
- **server/src/models/Course.js**: Course schema
- **server/src/controllers/authController.js**: Login, logout, getCurrentUser logic
- **server/src/controllers/courseController.js**: Course fetching logic
- **server/src/routes/authRoutes.js**: Auth endpoints
- **server/src/routes/courseRoutes.js**: Course endpoints
- **server/src/middleware/authMiddleware.js**: JWT verification middleware

### Frontend Files

- **src/services/authService.js**: API calls for authentication
- **src/services/courseService.js**: API calls for courses
- **src/context/AuthContext.jsx**: Global auth state management
- **src/pages/Login.jsx**: Login form connected to backend
- **src/pages/Home.jsx**: Uses API with fallback to static data
- **src/pages/Programs.jsx**: Uses API with fallback to static data
- **src/pages/CourseDetails.jsx**: Uses API with fallback to static data
- **src/components/Navbar.jsx**: Shows user name/logout when authenticated

## Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify `.env` file exists and has correct values
- Check port 5000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check CORS settings in `server/src/app.js`
- Verify `VITE_API_URL` in frontend `.env` (if set)

### Authentication not working
- Check browser cookies are enabled
- Verify JWT_SECRET is set in backend `.env`
- Check browser console for errors
- Verify credentials: 'include' in API calls

### Courses not loading
- Check MongoDB has course documents
- Verify API endpoint returns data
- Check browser network tab for API responses
- Frontend will fallback to static data if API fails

## Next Steps

1. **Seed Database**: Create script to populate courses from static data
2. **User Registration**: Add signup endpoint and page
3. **File Uploads**: Implement Cloudinary upload endpoints
4. **Admin Panel**: Create admin interface (separate project)
5. **LMS Features**: Add enrollment, progress tracking (separate project)


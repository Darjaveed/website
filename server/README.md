# LMS Backend API

Backend API for the LMS Platform built with Node.js, Express, MongoDB, and JWT authentication.

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/lms_platform

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows - Start MongoDB service from Services
```

### 4. Run the Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user

### Courses

- `GET /api/courses` - Get all courses (optional query: `?category=program`)
- `GET /api/courses/:slug` - Get course by slug

## Database Seeding

To populate the database with initial course data, you can create a seed script or manually insert data using MongoDB Compass or mongo shell.

Example course document:
```json
{
  "title": "Full Stack Web Development",
  "slug": "full-stack-web-development",
  "category": "program",
  "description": "A comprehensive program...",
  "shortDescription": "Master frontend and backend...",
  "thumbnailImage": "https://images.unsplash.com/...",
  "previewVideoUrl": null,
  "price": 0,
  "status": "published"
}
```

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── cloudinary.js      # Cloudinary configuration
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Course.js          # Course schema
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── courseController.js # Course logic
│   ├── routes/
│   │   ├── authRoutes.js      # Auth routes
│   │   └── courseRoutes.js    # Course routes
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── app.js                 # Express app setup
│   └── server.js              # Server entry point
└── package.json
```


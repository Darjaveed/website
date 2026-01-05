import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import Course from './models/Course.js';

// Load .env located in the server root (one level up from src)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const courses = [
  {
    title: "Full Stack Web Development",
    slug: "full-stack-web-development",
    category: "program",
    description: "A complete program covering frontend and backend web development.",
    shortDescription: "Become a full-stack web developer with real projects.",
    price: 49999,
    status: "published",
  },
  {
    title: "React Crash Course",
    slug: "react-crash-course",
    category: "short-term",
    description: "Learn React fundamentals quickly.",
    shortDescription: "Master React basics fast.",
    price: 5999,
    status: "published",
  },
];

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined. Check your .env file and working directory.');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    await Course.deleteMany();
    await Course.insertMany(courses);

    console.log("Courses inserted successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();

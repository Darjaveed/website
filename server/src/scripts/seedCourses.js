/**
 * Database Seeding Script
 * Populates the database with initial course data
 * 
 * Usage: node src/scripts/seedCourses.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';

dotenv.config({ path: '../.env' });

const courses = [
  {
    title: "Full Stack Web Development",
    slug: "full-stack-web-development",
    category: "program",
    shortDescription: "Master frontend and backend development with modern technologies",
    thumbnailImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    previewVideoUrl: null,
    description: "A comprehensive program covering HTML, CSS, JavaScript, React, Node.js, and database management. Build real-world projects and become a full-stack developer.",
    price: 0,
    status: "published"
  },
  {
    title: "Data Science & Analytics",
    slug: "data-science-analytics",
    category: "program",
    shortDescription: "Learn data analysis, machine learning, and visualization techniques",
    thumbnailImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    previewVideoUrl: null,
    description: "Deep dive into data science with Python, pandas, numpy, matplotlib, and machine learning algorithms. Perfect for aspiring data scientists and analysts.",
    price: 0,
    status: "published"
  },
  {
    title: "Digital Marketing Mastery",
    slug: "digital-marketing-mastery",
    category: "program",
    shortDescription: "Comprehensive digital marketing strategies and tools",
    thumbnailImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    previewVideoUrl: null,
    description: "Master SEO, social media marketing, content creation, email marketing, and analytics. Build a successful career in digital marketing.",
    price: 0,
    status: "published"
  },
  {
    title: "Python Basics for Beginners",
    slug: "python-basics-beginners",
    category: "short-term",
    shortDescription: "Learn Python programming from scratch in 4 weeks",
    thumbnailImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
    previewVideoUrl: null,
    description: "Perfect introduction to Python programming. Learn syntax, data structures, functions, and basic algorithms. No prior experience needed.",
    price: 0,
    status: "published"
  },
  {
    title: "UI/UX Design Fundamentals",
    slug: "ui-ux-design-fundamentals",
    category: "short-term",
    shortDescription: "Essential design principles and tools for creating user-friendly interfaces",
    thumbnailImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    previewVideoUrl: null,
    description: "Learn design thinking, wireframing, prototyping, and user testing. Master tools like Figma and Adobe XD to create beautiful interfaces.",
    price: 0,
    status: "published"
  },
  {
    title: "Introduction to Cloud Computing",
    slug: "introduction-cloud-computing",
    category: "short-term",
    shortDescription: "Understand cloud services, AWS basics, and deployment strategies",
    thumbnailImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    previewVideoUrl: null,
    description: "Get started with cloud computing concepts, AWS services, and learn how to deploy applications to the cloud. Essential for modern developers.",
    price: 0,
    status: "published"
  }
];

const seedCourses = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing courses (optional - comment out if you want to keep existing)
    // await Course.deleteMany({});
    // console.log('🗑️  Cleared existing courses');

    // Insert courses
    const insertedCourses = await Course.insertMany(courses);
    console.log(`✅ Inserted ${insertedCourses.length} courses`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
    process.exit(1);
  }
};

seedCourses();


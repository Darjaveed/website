import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import Course from '../models/Course.js';
import Module from '../models/Module.js';
import Lesson from '../models/Lesson.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

const seed = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not set');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');

  const courses = await Course.find({}).lean();
  if (!courses || courses.length === 0) {
    console.log('No courses to seed modules for');
    await mongoose.disconnect();
    process.exit(0);
  }

  for (const course of courses) {
    console.log('Seeding for course:', course.title);
    // create 2 modules
    for (let mi = 1; mi <= 2; mi++) {
      const mod = await Module.create({ title: `${course.title} - Module ${mi}`, courseId: course._id, order: mi });
      // create 3 lessons per module
      for (let li = 1; li <= 3; li++) {
        await Lesson.create({ title: `Lesson ${li}`, moduleId: mod._id, type: 'video', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', order: li });
      }
    }
  }

  console.log('Seeding completed');
  await mongoose.disconnect();
  process.exit(0);
};

seed();

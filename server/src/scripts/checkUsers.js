import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import User from '../models/User.js';

// Load env from server root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

const run = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const users = await User.find({}).select('name email role createdAt').lean();

    if (!users || users.length === 0) {
      console.log('No users found in the database');
    } else {
      console.log(`Found ${users.length} user(s):`);
      users.forEach((u) => {
        console.log(JSON.stringify(u, null, 2));
      });
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error checking users:', err);
    process.exit(1);
  }
};

run();

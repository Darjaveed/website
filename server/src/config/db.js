/**
 * Database Configuration
 * Connects to MongoDB using Mongoose
 */

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('❌ MONGODB_URI is not set in environment variables');
      process.exit(1);
    }

    const opts = {
      // Recommended options
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Wait up to 10s for server selection before timing out
      serverSelectionTimeoutMS: 10000,
    };

    // Attempt connection with retries
    const maxAttempts = 5;
    let attempt = 0;
    let lastErr = null;
    while (attempt < maxAttempts) {
      try {
        attempt += 1;
        const conn = await mongoose.connect(uri, opts);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return;
      } catch (err) {
        lastErr = err;
        console.error(`MongoDB connect attempt ${attempt} failed: ${err.message}`);
        if (attempt < maxAttempts) {
          console.log(`Retrying in 3s... (${attempt}/${maxAttempts})`);
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 3000));
        }
      }
    }

    console.error('❌ MongoDB connection failed after multiple attempts.');
    console.error('Common causes:');
    console.error('- Incorrect MONGODB_URI (use the provided connection string from Atlas)');
    console.error('- Network restrictions or firewall blocking outbound port 27017');
    console.error('- Atlas IP whitelist blocking this client IP (add 0.0.0.0/0 temporarily for testing)');
    console.error('- Using a non-SRV connection string without proper host/ports');
    console.error('Last error:', lastErr && lastErr.message);
    process.exit(1);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;


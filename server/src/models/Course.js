/**
 * Course Model
 * MongoDB schema for course data
 */

import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a course title'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['program', 'short-term'],
      required: [true, 'Please provide a category'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Please provide a short description'],
      maxlength: 200,
    },
    thumbnailImage: {
      type: String, // Cloudinary URL
      default: null,
    },
    previewVideoUrl: {
      type: String, // Cloudinary URL or external URL
      default: null,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'published',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;


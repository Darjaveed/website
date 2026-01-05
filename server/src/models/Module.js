import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Module = mongoose.model('Module', moduleSchema);
export default Module;

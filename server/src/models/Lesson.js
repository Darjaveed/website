import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  type: { type: String, enum: ['video', 'assignment'], default: 'video' },
  videoUrl: { type: String, default: null },
  assignmentDescription: { type: String, default: null },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;

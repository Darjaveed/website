import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  content: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Notes = mongoose.model('Notes', notesSchema);
export default Notes;
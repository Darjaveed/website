import { useState, useEffect } from 'react';

export default function AssignmentForm({ initial = {}, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial.title || '');
  const [description, setDescription] = useState(initial.description || '');
  const [dueDate, setDueDate] = useState(initial.dueDate ? initial.dueDate.split('T')[0] : '');

  useEffect(() => {
    setTitle(initial.title || '');
    setDescription(initial.description || '');
    setDueDate(initial.dueDate ? initial.dueDate.split('T')[0] : '');
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate: dueDate ? new Date(dueDate) : null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-2 py-1 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border px-2 py-1 rounded" rows={4} required />
      </div>
      <div>
        <label className="block text-sm font-medium">Due Date (optional)</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full border px-2 py-1 rounded" />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Create Assignment</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 px-3 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}
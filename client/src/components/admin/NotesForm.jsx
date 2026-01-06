import { useState, useEffect } from 'react';

export default function NotesForm({ initial = {}, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial.title || '');
  const [content, setContent] = useState(initial.content || '');

  useEffect(() => {
    setTitle(initial.title || '');
    setContent(initial.content || '');
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-2 py-1 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full border px-2 py-1 rounded" rows={6} required />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Create Notes</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 px-3 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}
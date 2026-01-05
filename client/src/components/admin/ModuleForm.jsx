import { useState, useEffect } from 'react';

export default function ModuleForm({ initial = {}, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial.title || '');
  const [courseId, setCourseId] = useState(initial.courseId || '');

  useEffect(() => {
    setTitle(initial.title || '');
    setCourseId(initial.courseId || '');
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, courseId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Course ID</label>
        <input value={courseId} onChange={(e) => setCourseId(e.target.value)} placeholder="Paste Course _id here" className="w-full border px-2 py-1 rounded" />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Create Module</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 px-3 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}

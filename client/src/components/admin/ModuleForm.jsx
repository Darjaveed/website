import { useState, useEffect } from 'react';
import adminApi from '../../services/adminApi';

export default function ModuleForm({ initial = {}, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial.title || '');
  const [courseId, setCourseId] = useState(initial.courseId || '');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(initial.title || '');
    setCourseId(initial.courseId || '');
  }, [initial]);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const data = await adminApi.getAdminCourses();
        setCourses(data || []);
      } catch (err) {
        console.error('Failed to load courses:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseId) return;
    onSubmit({ title, courseId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-2 py-1 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Course</label>
        <select value={courseId} onChange={(e) => setCourseId(e.target.value)} className="w-full border px-2 py-1 rounded" required>
          <option value="">Select a course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>{c.title}</option>
          ))}
        </select>
      </div>
      <div className="flex space-x-2">
        <button type="submit" disabled={!courseId || loading} className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50">Create Module</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 px-3 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}

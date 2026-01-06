import { useEffect, useState } from 'react';
import CourseForm from '../../components/admin/CourseForm';
import adminApi from '../../services/adminApi';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('[frontend] Loading courses...');
      const data = await adminApi.getAdminCourses();
      console.log('[frontend] Courses loaded:', data?.length || 0);
      setCourses(data || []);
    } catch (err) {
      console.error('[frontend] Failed to load courses:', err);
      setError(err.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (payload) => {
    try {
      console.log('[frontend] Creating course:', payload.title);
      await adminApi.createAdminCourse(payload);
      setShowForm(false);
      setMessage('Course created successfully');
      setError(null);
      load();
    } catch (err) {
      console.error('[frontend] Failed to create course:', err);
      setError(err.message || 'Failed to create course');
    }
  };

  const handleUpdate = async (payload) => {
    try {
      console.log('[frontend] Updating course:', editing._id);
      await adminApi.updateAdminCourse(editing._id, payload);
      setEditing(null);
      setMessage('Course updated successfully');
      setError(null);
      load();
    } catch (err) {
      console.error('[frontend] Failed to update course:', err);
      setError(err.message || 'Failed to update course');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete course?')) return;
    try {
      console.log('[frontend] Deleting course:', id);
      await adminApi.deleteAdminCourse(id);
      setMessage('Course deleted successfully');
      setError(null);
      load();
    } catch (err) {
      console.error('[frontend] Failed to delete course:', err);
      setError(err.message || 'Failed to delete course');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Courses</h2>
        <div>
          <button onClick={() => { setShowForm(true); setEditing(null); }} className="bg-green-600 text-white px-3 py-1 rounded" disabled={loading}>New Course</button>
        </div>
      </div>

      {message && <div className="mb-4 text-sm text-green-600">{message}</div>}
      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

      {showForm && (
        <div className="mb-4 border p-4 rounded bg-gray-50">
          <CourseForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {editing && (
        <div className="mb-4 border p-4 rounded bg-gray-50">
          <CourseForm initial={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading courses...</div>
      ) : error ? (
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">{error}</div>
          <button onClick={load} className="bg-blue-600 text-white px-4 py-2 rounded">Retry</button>
        </div>
      ) : (
        <div className="space-y-3">
          {courses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No courses found. Create your first course!</div>
          ) : (
            courses.map((c) => (
              <div key={c._id} className="border p-3 rounded flex justify-between items-center">
                <div>
                  <div className="font-semibold">{c.title} <span className="text-xs text-gray-400">({_id => c._id})</span></div>
                  <div className="text-sm text-gray-500">{c.shortDescription}</div>
                  <div className="text-xs text-gray-500 mt-1">ID: {c._id}</div>
                </div>
                <div className="space-x-2">
                  <button onClick={() => { setEditing(c); setShowForm(false); }} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                  <button onClick={() => handleDelete(c._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                  <a href={`/admin/modules/${c._id}`} className="px-3 py-1 bg-blue-600 text-white rounded">Manage Modules</a>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

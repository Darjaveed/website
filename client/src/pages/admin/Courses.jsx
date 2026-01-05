import { useEffect, useState } from 'react';
import CourseForm from '../../components/admin/CourseForm';
import adminApi from '../../services/adminApi';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState(null);

  const load = async () => {
    try {
      const data = await adminApi.getAdminCourses();
      setCourses(data || []);
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (payload) => {
    try {
      await adminApi.createAdminCourse(payload);
      setShowForm(false);
      setMessage('Course created');
      load();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleUpdate = async (payload) => {
    try {
      await adminApi.updateAdminCourse(editing._id, payload);
      setEditing(null);
      setMessage('Course updated');
      load();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete course?')) return;
    try {
      await adminApi.deleteAdminCourse(id);
      setMessage('Course deleted');
      load();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Courses</h2>
        <div>
          <button onClick={() => { setShowForm(true); setEditing(null); }} className="bg-green-600 text-white px-3 py-1 rounded">New Course</button>
        </div>
      </div>

      {message && <div className="mb-4 text-sm text-red-600">{message}</div>}

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

      <div className="space-y-3">
        {courses.map((c) => (
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
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LessonForm from '../../components/admin/LessonForm';
import adminApi from '../../services/adminApi';

export default function Lessons() {
  const { moduleId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.getLessons(moduleId);
      setLessons(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (moduleId) load();
  }, [moduleId]);

  const handleCreate = async (payload) => {
    setError(null);
    try {
      await adminApi.createLesson({ ...payload, moduleId });
      setShowForm(false);
      setMessage('Lesson created');
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lessons for Module {moduleId}</h2>
        <button onClick={() => setShowForm(true)} className="bg-green-600 text-white px-3 py-1 rounded">New Lesson</button>
      </div>

      {message && <div className="mb-4 text-sm text-green-600">{message}</div>}
      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

      {showForm && (
        <div className="mb-4 border p-4 rounded bg-gray-50">
          <LessonForm initial={{ moduleId }} onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {loading ? (
        <div>Loading lessons...</div>
      ) : (
        <div className="space-y-3">
          {lessons.map((l) => (
            <div key={l._id} className="border p-3 rounded">
              <div className="font-semibold">{l.title} <span className="text-xs text-gray-500">({l.type})</span></div>
              {l.type === 'video' && <div className="text-sm text-gray-600">Video: {l.videoUrl}</div>}
              {l.type === 'assignment' && <div className="text-sm text-gray-600">Assignment: {l.assignmentDescription}</div>}
              <div className="text-xs text-gray-500 mt-1">ID: {l._id}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

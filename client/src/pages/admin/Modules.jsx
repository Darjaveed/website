import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModuleForm from '../../components/admin/ModuleForm';
import adminApi from '../../services/adminApi';

export default function Modules() {
  const { courseId } = useParams();
  const [modules, setModules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.getModules(courseId);
      setModules(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) load();
  }, [courseId]);

  const handleCreate = async (payload) => {
    setError(null);
    try {
      await adminApi.createModule({ ...payload, courseId });
      setShowForm(false);
      setMessage('Module created');
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Modules for Course {courseId}</h2>
        <button onClick={() => setShowForm(true)} className="bg-green-600 text-white px-3 py-1 rounded">New Module</button>
      </div>

      {message && <div className="mb-4 text-sm text-green-600">{message}</div>}
      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

      {showForm && (
        <div className="mb-4 border p-4 rounded bg-gray-50">
          <ModuleForm initial={{ courseId }} onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {loading ? (
        <div>Loading modules...</div>
      ) : (
        <div className="space-y-3">
          {modules.map((m) => (
            <div key={m._id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{m.title}</div>
                <div className="text-xs text-gray-500">ID: {m._id}</div>
              </div>
              <div>
                <a href={`/admin/lessons/${courseId}`} className="px-3 py-1 bg-blue-600 text-white rounded">Manage Lessons</a>
                <a href={`/admin/assignments/${courseId}`} className="ml-2 px-3 py-1 bg-purple-600 text-white rounded">Manage Assignments</a>
                <a href={`/admin/notes/${courseId}`} className="ml-2 px-3 py-1 bg-green-600 text-white rounded">Manage Notes</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

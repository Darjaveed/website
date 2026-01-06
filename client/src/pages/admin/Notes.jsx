import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotesForm from '../../components/admin/NotesForm';
import adminApi from '../../services/adminApi';

export default function Notes() {
  const { courseId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const loadModules = async () => {
    try {
      const data = await adminApi.getModules(courseId);
      setModules(data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadNotes = async (moduleId) => {
    if (!moduleId) {
      setNotes([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.getNotes(moduleId);
      setNotes(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) loadModules();
  }, [courseId]);

  useEffect(() => {
    if (selectedModuleId) loadNotes(selectedModuleId);
  }, [selectedModuleId]);

  const handleCreate = async (payload) => {
    setError(null);
    try {
      await adminApi.createNotes({ ...payload, moduleId: selectedModuleId });
      setShowForm(false);
      setMessage('Notes created');
      loadNotes(selectedModuleId);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Notes for Course {courseId}</h2>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Module</label>
        <select value={selectedModuleId} onChange={(e) => setSelectedModuleId(e.target.value)} className="w-full border px-2 py-1 rounded">
          <option value="">Select a module</option>
          {modules.map((m) => (
            <option key={m._id} value={m._id}>{m.title}</option>
          ))}
        </select>
      </div>

      {selectedModuleId && (
        <div className="mb-4">
          <button onClick={() => setShowForm(true)} className="bg-green-600 text-white px-3 py-1 rounded">New Notes</button>
        </div>
      )}

      {message && <div className="mb-4 text-sm text-green-600">{message}</div>}
      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

      {showForm && selectedModuleId && (
        <div className="mb-4 border p-4 rounded bg-gray-50">
          <NotesForm initial={{ moduleId: selectedModuleId }} onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {loading ? (
        <div>Loading notes...</div>
      ) : selectedModuleId ? (
        <div className="space-y-3">
          {notes.map((n) => (
            <div key={n._id} className="border p-3 rounded">
              <div className="font-semibold">{n.title}</div>
              <div className="text-sm text-gray-600">{n.content}</div>
              <div className="text-xs text-gray-500 mt-1">ID: {n._id}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>Select a module to view notes</div>
      )}
    </div>
  );
}
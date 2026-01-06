import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AssignmentForm from '../../components/admin/AssignmentForm';
import adminApi from '../../services/adminApi';

export default function Assignments() {
  const { courseId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [assignments, setAssignments] = useState([]);
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

  const loadAssignments = async (moduleId) => {
    if (!moduleId) {
      setAssignments([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.getAssignments(moduleId);
      setAssignments(data || []);
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
    if (selectedModuleId) loadAssignments(selectedModuleId);
  }, [selectedModuleId]);

  const handleCreate = async (payload) => {
    setError(null);
    try {
      await adminApi.createAssignment({ ...payload, moduleId: selectedModuleId });
      setShowForm(false);
      setMessage('Assignment created');
      loadAssignments(selectedModuleId);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Assignments for Course {courseId}</h2>
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
          <button onClick={() => setShowForm(true)} className="bg-green-600 text-white px-3 py-1 rounded">New Assignment</button>
        </div>
      )}

      {message && <div className="mb-4 text-sm text-green-600">{message}</div>}
      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

      {showForm && selectedModuleId && (
        <div className="mb-4 border p-4 rounded bg-gray-50">
          <AssignmentForm initial={{ moduleId: selectedModuleId }} onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {loading ? (
        <div>Loading assignments...</div>
      ) : selectedModuleId ? (
        <div className="space-y-3">
          {assignments.map((a) => (
            <div key={a._id} className="border p-3 rounded">
              <div className="font-semibold">{a.title}</div>
              <div className="text-sm text-gray-600">{a.description}</div>
              {a.dueDate && <div className="text-sm text-gray-500">Due: {new Date(a.dueDate).toLocaleDateString()}</div>}
              <div className="text-xs text-gray-500 mt-1">ID: {a._id}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>Select a module to view assignments</div>
      )}
    </div>
  );
}
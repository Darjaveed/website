import { useState, useEffect } from 'react';

export default function LessonForm({ initial = {}, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial.title || '');
  const [moduleId, setModuleId] = useState(initial.moduleId || '');
  const [type, setType] = useState(initial.type || 'video');
  const [videoUrl, setVideoUrl] = useState(initial.videoUrl || '');
  const [assignmentDescription, setAssignmentDescription] = useState(initial.assignmentDescription || '');

  useEffect(() => {
    setTitle(initial.title || '');
    setModuleId(initial.moduleId || '');
    setType(initial.type || 'video');
    setVideoUrl(initial.videoUrl || '');
    setAssignmentDescription(initial.assignmentDescription || '');
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, moduleId, type, videoUrl: type === 'video' ? videoUrl : null, assignmentDescription: type === 'assignment' ? assignmentDescription : null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Module ID</label>
        <input value={moduleId} onChange={(e) => setModuleId(e.target.value)} placeholder="Paste Module _id here" className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border px-2 py-1 rounded">
          <option value="video">Video</option>
          <option value="assignment">Assignment</option>
        </select>
      </div>
      {type === 'video' ? (
        <div>
          <label className="block text-sm font-medium">Video URL</label>
          <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="w-full border px-2 py-1 rounded" />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium">Assignment Description</label>
          <textarea value={assignmentDescription} onChange={(e) => setAssignmentDescription(e.target.value)} className="w-full border px-2 py-1 rounded" rows={3} />
        </div>
      )}
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Create Lesson</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 px-3 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}

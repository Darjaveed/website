import { useState, useEffect } from 'react';

export default function CourseForm({ initial = {}, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial.title || '');
  const [slug, setSlug] = useState(initial.slug || '');
  const [category, setCategory] = useState(initial.category || 'program');
  const [shortDescription, setShortDescription] = useState(initial.shortDescription || '');
  const [description, setDescription] = useState(initial.description || '');

  useEffect(() => {
    setTitle(initial.title || '');
    setSlug(initial.slug || '');
    setCategory(initial.category || 'program');
    setShortDescription(initial.shortDescription || '');
    setDescription(initial.description || '');
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, slug, category, shortDescription, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Slug</label>
        <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border px-2 py-1 rounded">
          <option value="program">Program</option>
          <option value="short-term">Short-Term</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Short Description</label>
        <input value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border px-2 py-1 rounded" rows={4} />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 px-3 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}

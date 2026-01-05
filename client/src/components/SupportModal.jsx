import { useState } from 'react';

const SupportModal = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', country: '', interestedProgram: '' });
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Minimal validation
    if (!form.name || !form.email) {
      alert('Please provide at least name and email');
      return;
    }

    try {
      setSubmitting(true);
      // TODO: Integrate with backend /contact or support endpoint if available
      console.log('Support request submitted', form);
      alert('Support request submitted. We will contact you soon.');
      setForm({ name: '', phone: '', email: '', country: '', interestedProgram: '' });
      onClose && onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={() => onClose && onClose()} />

      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 p-6 z-70">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Get Support</h3>
          <button onClick={() => onClose && onClose()} className="text-gray-500 hover:text-gray-800">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full border rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 block w-full border rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 block w-full border rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input name="country" value={form.country} onChange={handleChange} className="mt-1 block w-full border rounded-md px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Interested Program</label>
            <input name="interestedProgram" value={form.interestedProgram} onChange={handleChange} className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="Program name or topic" />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button type="button" onClick={() => onClose && onClose()} className="px-4 py-2 rounded-md border">Cancel</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">{submitting ? 'Sending...' : 'Submit'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportModal;

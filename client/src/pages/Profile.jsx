import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile, updateProfile } from '../services/userService';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { isAuthenticated, loading: authLoading, refreshUser, user: authUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    // Initialize from AuthContext if available so UI isn't empty
    if (authUser) {
      setProfile({
        name: authUser.name,
        email: authUser.email,
        role: authUser.role,
        createdAt: authUser.createdAt || null,
      });
      setNameInput(authUser.name || '');
    }

    if (!authLoading) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, authUser]);

  const load = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data);
      setNameInput(data?.name || '');
    } catch (err) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updated = await updateProfile({ name: nameInput });
      setProfile(updated);
      // refresh AuthContext so UI (navbar) shows updated name
      try { await refreshUser(); } catch (_) {}
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!authLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">My Profile</h1>

          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                {editing ? (
                  <input
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-gray-800">{profile?.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-800">{profile?.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-gray-800">{profile?.role}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Account Created</label>
                <p className="mt-1 text-gray-800">{new Date(profile?.createdAt).toLocaleString()}</p>
              </div>

              <div className="pt-4 border-t flex items-center gap-3">
                {editing ? (
                  <>
                    <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
                    <button onClick={() => { setEditing(false); setNameInput(profile?.name || ''); }} className="px-4 py-2 rounded-md border">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md">Edit Name</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

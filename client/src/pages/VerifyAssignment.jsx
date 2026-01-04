/**
 * Verify Assignment Page
 * Placeholder page for assignment verification
 */

import { useState } from 'react';

const VerifyAssignment = () => {
  const [assignmentId, setAssignmentId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI only - no backend logic
    alert('Assignment verification functionality will be implemented in a future phase.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Verify Assignment & Test</h1>
            <p className="text-gray-600">
              Enter your assignment or test ID to verify its authenticity
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="assignmentId" className="block text-sm font-medium text-gray-700 mb-2">
                Assignment/Test ID
              </label>
              <input
                type="text"
                id="assignmentId"
                value={assignmentId}
                onChange={(e) => setAssignmentId(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter your assignment or test ID"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Verify
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This verification system will be available in a future update.
              Contact support if you need immediate verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAssignment;


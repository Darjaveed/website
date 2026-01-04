/**
 * Jobs Page
 * Placeholder page for job listings (Coming Soon)
 */

const Jobs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="mb-6">
            <svg className="w-24 h-24 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Jobs</h1>
          <p className="text-2xl text-gray-600 mb-8">Coming Soon</p>
          <p className="text-gray-500">
            We're working on bringing you exciting job opportunities. Check back soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Jobs;


import { Outlet, Link } from 'react-router-dom';
const LMSLayout = () => {
  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-4 gap-6">
        <aside className="col-span-1 bg-white text-gray-900 rounded p-4">
          <h2 className="font-bold mb-4">My Courses</h2>
          <nav className="space-y-2">
            <Link to="/lms" className="block text-blue-600">Dashboard</Link>
            <Link to="/lms/courses" className="block text-blue-600">My Courses</Link>
          </nav>
        </aside>

        <main className="col-span-3 bg-white text-gray-900 rounded p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LMSLayout;

import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex min-h-[70vh]">
      <aside className="w-64 bg-gray-100 p-4">
        <h3 className="text-lg font-semibold mb-4">Admin Panel</h3>
        <nav className="space-y-2">
          <Link to="/admin" className="block px-3 py-2 rounded hover:bg-gray-200">Dashboard</Link>
          <Link to="/admin/courses" className="block px-3 py-2 rounded hover:bg-gray-200">Courses</Link>
          <Link to="/admin/courses" className="block px-3 py-2 rounded hover:bg-gray-200">Modules</Link>
          <Link to="/admin/courses" className="block px-3 py-2 rounded hover:bg-gray-200">Lessons</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
}

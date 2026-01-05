import { useEffect, useState } from 'react';
import { getMyCourses } from '../../services/lmsApi';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getMyCourses();
        setCourses(data);
      } catch (err) {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-2 gap-4">
          {courses.map(c => (
            <div key={c._id} className="p-4 border rounded">
              <h3 className="font-semibold">{c.title}</h3>
              <p className="text-sm text-gray-600">{c.shortDescription}</p>
              <Link to={`/lms/course/${c._id}`} className="text-blue-600">Open</Link>
            </div>
          ))}
          {courses.length === 0 && <p>No enrolled courses.</p>}
        </div>
      )}
    </div>
  );
};

export default MyCourses;

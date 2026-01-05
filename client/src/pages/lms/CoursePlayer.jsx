import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseModules, getModuleLessons, postProgress, getCourseProgress } from '../../services/lmsApi';

const CoursePlayer = () => {
  const { slug } = useParams();
  // Note: backend endpoints use courseId (_id). We accept slug param that may be _id.
  const courseId = slug;
  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (!courseId) return;
    (async () => {
      try {
        const mods = await getCourseModules(courseId);
        setModules(mods);
      } catch (err) {
        setModules([]);
      }
    })();
  }, [courseId]);

  const openModule = async (m) => {
    setActiveModule(m._id);
    try {
      const ls = await getModuleLessons(m._id);
      setLessons(ls);
    } catch (err) {
      setLessons([]);
    }
  };

  const playLesson = (lesson) => {
    setActiveLesson(lesson);
  };

  const markCompleted = async (lesson) => {
    try {
      await postProgress({ lessonId: lesson._id, completed: true });
      // refresh progress
      const p = await getCourseProgress(courseId);
      setProgress(p?.progresses || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <aside className="col-span-1">
        <h3 className="font-bold mb-2">Modules</h3>
        <ul>
          {modules.map(m => (
            <li key={m._id} className={`p-2 border mb-2 ${activeModule === m._id ? 'bg-blue-50' : ''}`}>
              <button onClick={() => openModule(m)} className="w-full text-left">{m.title}</button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="col-span-3">
        <h2 className="text-xl font-bold mb-4">{activeLesson ? activeLesson.title : 'Select a lesson'}</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white p-4">
            {activeLesson ? (
              <div>
                {activeLesson.type === 'video' && (
                  <video src={activeLesson.videoUrl} controls className="w-full h-64" />
                )}
                <div className="mt-4">
                  <button onClick={() => markCompleted(activeLesson)} className="bg-blue-600 text-white px-4 py-2 rounded">Mark as Completed</button>
                </div>
              </div>
            ) : (
              <p>Select a lesson to play</p>
            )}
          </div>

          <aside className="col-span-1 bg-white p-4">
            <h4 className="font-semibold mb-2">Lessons</h4>
            <ul>
              {lessons.map(l => (
                <li key={l._id} className={`p-2 border mb-2 ${activeLesson?._id === l._id ? 'bg-blue-50' : ''}`}>
                  <button onClick={() => playLesson(l)} className="w-full text-left">{l.title}</button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default CoursePlayer;

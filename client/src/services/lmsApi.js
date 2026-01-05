import { apiGet, apiPut } from './api';

export const getMyCourses = async () => {
  const data = await apiGet('/lms/my-courses');
  return data?.data || [];
};

export const getCourseModules = async (courseId) => {
  const data = await apiGet(`/lms/course/${courseId}/modules`);
  return data?.data || [];
};

export const getModuleLessons = async (moduleId) => {
  const data = await apiGet(`/lms/module/${moduleId}/lessons`);
  return data?.data || [];
};

export const postProgress = async (payload) => {
  const data = await fetch(`${import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/lms/progress`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(r => r.json());
  if (!data || !data.success) throw new Error(data?.message || 'Failed');
  return data.data;
};

export const postEnroll = async (courseId) => {
  const url = `${import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/lms/enroll`;
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || 'Enroll failed');
  return data.data;
};

export const getCourseProgress = async (courseId) => {
  const data = await apiGet(`/lms/progress/${courseId}`);
  return data?.data || null;
};

export default { getMyCourses, getCourseModules, getModuleLessons, postProgress, getCourseProgress };

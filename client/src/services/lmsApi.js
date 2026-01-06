import { apiGet, apiPut, apiPost } from './api';

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

export const getModuleAssignments = async (moduleId) => {
  const data = await apiGet(`/lms/module/${moduleId}/assignments`);
  return data?.data || [];
};

export const getModuleNotes = async (moduleId) => {
  const data = await apiGet(`/lms/module/${moduleId}/notes`);
  return data?.data || [];
};

export const postProgress = async (payload) => {
  return await apiPost('/lms/progress', payload);
  return data.data;
};

export const postEnroll = async (courseId) => {
  return await apiPost('/lms/enroll', { courseId });
};

export const getCourseProgress = async (courseId) => {
  const data = await apiGet(`/lms/progress/${courseId}`);
  return data?.data || null;
};

export default { getMyCourses, getCourseModules, getModuleLessons, getModuleAssignments, getModuleNotes, postProgress, getCourseProgress };

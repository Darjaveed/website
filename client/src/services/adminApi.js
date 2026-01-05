import { apiGet, apiPost, apiPut, apiDelete } from './api';

const BASE = '/admin';

export const getAdminCourses = () => apiGet(`${BASE}/courses`);
export const createAdminCourse = (payload) => apiPost(`${BASE}/courses`, payload);
export const updateAdminCourse = (id, payload) => apiPut(`${BASE}/courses/${id}`, payload);
export const deleteAdminCourse = (id) => apiDelete(`${BASE}/courses/${id}`);

export const createModule = (payload) => apiPost(`${BASE}/modules`, payload);
export const createLesson = (payload) => apiPost(`${BASE}/lessons`, payload);
export const getModules = (courseId) => apiGet(`${BASE}/modules/${courseId}`);
export const getLessons = (moduleId) => apiGet(`${BASE}/lessons/${moduleId}`);

export default {
  getAdminCourses,
  createAdminCourse,
  updateAdminCourse,
  deleteAdminCourse,
  createModule,
  createLesson,
  getModules,
  getLessons,
};

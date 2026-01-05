import { apiGet, apiPut } from './api';

export const getProfile = async () => {
  const data = await apiGet('/users/me');
  return data?.data || null;
};

export const updateProfile = async (payload) => {
  const data = await apiPut('/users/me', payload);
  return data?.data || null;
};

export default { getProfile, updateProfile };

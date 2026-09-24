import axiosInstance from "@/utils/axiosInstance";

export const createUserService = async (payload) => {
  return axiosInstance.post(`/user`, payload)
}

export const getUserService = async (page, search) => {
  return await axiosInstance.get(`/user`, {
    params: { page, search }
  });
};

export const editUserService = (id, data) => {
  return axiosInstance.put(`/user/${id}`, data);
};

export const deleteUserService = (id) => {
  return axiosInstance.delete(`/user/${id}`);
};

export const changePasswordService = async (payload) => {
  return await axiosInstance.post('/user/change-password', payload);
};
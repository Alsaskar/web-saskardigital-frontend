import axiosInstance from "@/utils/axiosInstance";

export const createTestimoniService = async (payload) => {
  return axiosInstance.post(`/testimoni`, payload)
}

export const getTestimoniAllService = async (limit) => {
  return await axiosInstance.get(`/testimoni/list-all`, {
    params: { limit }
  });
};

export const getTestimoniService = async (page, search) => {
  return await axiosInstance.get(`/testimoni`, {
    params: { page, search }
  });
};

export const editTestimoniService = (id, data) => {
  return axiosInstance.put(`/testimoni/${id}`, data);
};

export const deleteTestimoniService = (id) => {
  return axiosInstance.delete(`/testimoni/${id}`);
};

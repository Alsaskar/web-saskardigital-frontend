import axiosInstance from "@/utils/axiosInstance";

export const createLeadsService = async (payload) => {
  return axiosInstance.post(`/leads`, payload)
}

export const getLeadsService = async (page, search, status, category) => {
  return await axiosInstance.get(`/leads`, {
    params: { page, search, status, category }
  });
};

export const getDetailLeadsService = async (id) => {
  return await axiosInstance.get(`/leads/detail/${id}`);
};

export const updateStatusLeadsService = (id, data) => {
  return axiosInstance.put(`/leads/update-status/${id}`, data);
};

export const editLeadsService = (id, data) => {
  return axiosInstance.put(`/leads/${id}`, data);
};

export const deleteLeadsService = (id) => {
  return axiosInstance.delete(`/leads/${id}`);
};

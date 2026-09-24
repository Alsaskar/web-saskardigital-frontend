import axiosInstance from "@/utils/axiosInstance";

export const createClientService = async (payload) => {
  return axiosInstance.post(`/client`, payload)
}

export const getClientAllService = async (limit) => {
  return await axiosInstance.get(`/client/list-all`, {
    params: { limit }
  });
};

export const getClientService = async (page, search) => {
  return await axiosInstance.get(`/client`, {
    params: { page, search }
  });
};

export const editClientService = (id, data) => {
  return axiosInstance.put(`/client/${id}`, data);
};

export const deleteClientService = (id) => {
  return axiosInstance.delete(`/client/${id}`);
};

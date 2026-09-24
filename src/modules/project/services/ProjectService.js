import axiosInstance from "@/utils/axiosInstance";

export const createProjectService = async (payload) => {
  return axiosInstance.post(`/project`, payload)
}

export const getProjectService = async (page, search) => {
  return await axiosInstance.get(`/project`, {
    params: { page, search }
  });
};

export const listAllProjectService = async () => {
  return await axiosInstance.get(`/project/list-all`);
};

export const editProjectService = (id, data) => {
  return axiosInstance.put(`/project/${id}`, data);
};

export const updateStatusProjectService = (id, data) => {
  return axiosInstance.put(`/project/update-status/${id}`, data);
};

export const deleteProjectService = (id) => {
  return axiosInstance.delete(`/project/${id}`);
};

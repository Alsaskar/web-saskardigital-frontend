import axiosInstance from "@/utils/axiosInstance";

export const createProjectRequestService = async (payload) => {
  return axiosInstance.post(`/project-request`, payload)
}

export const getProjectRequestService = async (page, search) => {
  return await axiosInstance.get(`/project-request`, {
    params: { page, search }
  });
};

export const editProjectRequestService = (id, data) => {
  return axiosInstance.put(`/project-request/${id}`, data);
};

export const deleteProjectRequestService = (id) => {
  return axiosInstance.delete(`/project-request/${id}`);
};

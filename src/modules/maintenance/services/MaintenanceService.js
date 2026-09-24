import axiosInstance from "@/utils/axiosInstance";

export const createMaintenanceService = async (payload) => {
  return axiosInstance.post(`/maintenance`, payload)
}

export const getMaintenanceService = async (page, search) => {
  return await axiosInstance.get(`/maintenance`, {
    params: { page, search }
  });
};

export const editMaintenanceService = (id, data) => {
  return axiosInstance.put(`/maintenance/${id}`, data);
};

export const deleteMaintenanceService = (id) => {
  return axiosInstance.delete(`/maintenance/${id}`);
};

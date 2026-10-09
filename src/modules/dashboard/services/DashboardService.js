import axiosInstance from "@/utils/axiosInstance";

export const getDashboardService = async () => {
  return axiosInstance.get(`/dashboard`);
};

export const getDashboardClientService = async (clientId) => {
  return axiosInstance.get(`/dashboard/client`, {
    params: { clientId }
  });
};
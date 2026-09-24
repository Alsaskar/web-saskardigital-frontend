import axiosInstance from "@/utils/axiosInstance";

export const getDashboardService = async () => {
  return axiosInstance.get(`/dashboard`);
};
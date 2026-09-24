import axiosInstance from "@/utils/axiosInstance";

export const createPortfolioService = async (payload) => {
  return axiosInstance.post(`/portfolio`, payload)
}

export const getPortfolioAllService = async (limit) => {
  return await axiosInstance.get(`/portfolio/list-all`, {
    params: { limit }
  });
};

export const getPortfolioService = async (page, search) => {
  return await axiosInstance.get(`/portfolio`, {
    params: { page, search }
  });
};

export const editPortfolioService = (id, data) => {
  return axiosInstance.put(`/portfolio/${id}`, data);
};

export const deletePortfolioService = (id) => {
  return axiosInstance.delete(`/portfolio/${id}`);
};

import axiosInstance from "@/utils/axiosInstance";

export const createTicketService = async (payload) => {
  return axiosInstance.post(`/ticket`, payload)
}

export const viewTicketService = async (ticket_number) => {
  return await axiosInstance.get(`/ticket/view/${ticket_number}`);
};

export const getTicketService = async (page, search, clientId) => {
  return await axiosInstance.get(`/ticket`, {
    params: { page, search, clientId }
  });
};

export const editTicketService = (id, data) => {
  return axiosInstance.put(`/ticket/${id}`, data);
};

export const updateStatusTicketService = (id, data) => {
  return axiosInstance.put(`/ticket/update-status/${id}`, data);
};

export const deleteTicketService = (id) => {
  return axiosInstance.delete(`/ticket/${id}`);
};

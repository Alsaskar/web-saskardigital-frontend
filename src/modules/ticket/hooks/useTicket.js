import { useState } from "react"
import {
  createTicketService,
  deleteTicketService,
  editTicketService,
  getTicketService,
  updateStatusTicketService,
  viewTicketService
} from "../services/TicketService"

export const useTicket = () => {
    const [loading, setLoading] = useState(false)

    const addTicket = async (data) => {
        setLoading(true)

        try {
            const res = await createTicketService(data)

            return {
                success: true,
                data: res.data,
                message: res.data?.message
            }
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Terjadi kesalahan"
            }
        } finally {
            setLoading(false)
        }
    }

    const viewTicket = async (ticket_number) => {
        try {
            const res = await viewTicketService(ticket_number);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const fetchTicket = async (page, search, clientId) => {
        try {
            const res = await getTicketService(page, search, clientId);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const editTicket = async (id, data) => {
        setLoading(true);

        try {
            const res = await editTicketService(id, data);

            return {
                success: true,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengupdate ticket"
            };
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, data) => {
        setLoading(true);

        try {
            const res = await updateStatusTicketService(id, data);

            return {
                success: true,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengupdate ticket"
            };
        } finally {
            setLoading(false);
        }
    };

    const removeTicket = async (id) => {
        setLoading(true);

        try {
            const res = await deleteTicketService(id);

            return {
                success: res.data.success,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal menghapus"
            };
        } finally {
            setLoading(false);
        }
    }

    return {
        addTicket,
        viewTicket,
        fetchTicket,
        editTicket,
        updateStatus,
        removeTicket,
        loading
    }
}

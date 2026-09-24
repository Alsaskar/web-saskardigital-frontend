import { useState } from "react"
import {
  createClientService,
  deleteClientService,
  editClientService,
  getClientAllService,
  getClientService
} from "../services/ClientService"

export const useClient = () => {
    const [loading, setLoading] = useState(false)

    const addClient = async (data) => {
        setLoading(true)

        try {
            const res = await createClientService(data)

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

    const fetchClientAll = async (limit) => {
        try {
            const res = await getClientAllService(limit);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const fetchClient = async (page, search) => {
        try {
            const res = await getClientService(page, search);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const editClient = async (id, data) => {
        setLoading(true);

        try {
            const res = await editClientService(id, data);

            return {
                success: true,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengupdate client"
            };
        } finally {
            setLoading(false);
        }
    };

    const removeClient = async (id) => {
        setLoading(true);

        try {
            const res = await deleteClientService(id);

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
        addClient,
        fetchClientAll,
        fetchClient,
        editClient,
        removeClient,
        loading
    }
}

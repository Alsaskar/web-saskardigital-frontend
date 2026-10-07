import { useState } from "react"
import {
    createLeadsService,
    deleteLeadsService,
    editLeadsService,
    getDetailLeadsService,
    getLeadsService,
    importLeadsService,
    updateStatusLeadsService
} from "../services/LeadsService"

export const useLeads = () => {
    const [loading, setLoading] = useState(false)

    const addLeads = async (data) => {
        setLoading(true)

        try {
            const res = await createLeadsService(data)

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

    const fetchLeads = async (page, search, status, category) => {
        try {
            const res = await getLeadsService(page, search, status, category);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const fetchDetailLeads = async (id) => {
        try {
            const res = await getDetailLeadsService(id);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const updateStatusLeads = async (id, data) => {
        setLoading(true);

        try {
            const res = await updateStatusLeadsService(id, data);

            return {
                success: true,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengupdate status leads"
            };
        } finally {
            setLoading(false);
        }
    };

    const editLeads = async (id, data) => {
        setLoading(true);

        try {
            const res = await editLeadsService(id, data);

            return {
                success: true,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengupdate leads"
            };
        } finally {
            setLoading(false);
        }
    };

    const removeLeads = async (id) => {
        setLoading(true);

        try {
            const res = await deleteLeadsService(id);

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

    const importLeads = async (formData) => {
        setLoading(true);

        try {
            const res = await importLeadsService(formData);

            return {
                success: res.data.success,
                message: res.data.message,
            };
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        addLeads,
        fetchLeads,
        fetchDetailLeads,
        updateStatusLeads,
        editLeads,
        removeLeads,
        importLeads,
        loading
    }
}

import { useState } from "react"
import {
  createTestimoniService,
  deleteTestimoniService,
  editTestimoniService,
  getTestimoniAllService,
  getTestimoniService
} from "../services/TestimoniService"

export const useTestimoni = () => {
    const [loading, setLoading] = useState(false)

    const addTestimoni = async (data) => {
        setLoading(true)

        try {
            const res = await createTestimoniService(data)

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

    const fetchTestimoniAll = async (limit) => {
        try {
            const res = await getTestimoniAllService(limit);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const fetchTestimoni = async (page, search) => {
        try {
            const res = await getTestimoniService(page, search);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const editTestimoni = async (id, data) => {
        setLoading(true);

        try {
            const res = await editTestimoniService(id, data);

            return {
                success: true,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengupdate testimoni"
            };
        } finally {
            setLoading(false);
        }
    };

    const removeTestimoni = async (id) => {
        setLoading(true);

        try {
            const res = await deleteTestimoniService(id);

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
        addTestimoni,
        fetchTestimoni,
        fetchTestimoniAll,
        editTestimoni,
        removeTestimoni,
        loading
    }
}

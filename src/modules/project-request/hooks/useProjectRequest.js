import { useState } from "react"
import {
  createProjectRequestService,
  deleteProjectRequestService,
  editProjectRequestService,
  getProjectRequestService
} from "../services/ProjectRequestService"

export const useProjectRequest = () => {
    const [loading, setLoading] = useState(false)

    const addProjectRequest = async (data) => {
        setLoading(true)

        try {
            const res = await createProjectRequestService(data)

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

    const fetchProjectRequest = async (page, search) => {
        try {
            const res = await getProjectRequestService(page, search);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const editProjectRequest = async (id, data) => {
        setLoading(true);

        try {
            const res = await editProjectRequestService(id, data);

            return {
                success: true,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengupdate project request"
            };
        } finally {
            setLoading(false);
        }
    };

    const removeProjectRequest = async (id) => {
        setLoading(true);

        try {
            const res = await deleteProjectRequestService(id);

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
        addProjectRequest,
        fetchProjectRequest,
        editProjectRequest,
        removeProjectRequest,
        loading
    }
}

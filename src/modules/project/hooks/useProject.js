import { useState } from "react"
import {
  createProjectService,
  deleteProjectService,
  editProjectService,
  getProjectService,
  listAllProjectService,
  updateStatusProjectService
} from "../services/ProjectService"

export const useProject = () => {
    const [loading, setLoading] = useState(false)

    const addProject = async (data) => {
        setLoading(true)

        try {
            const res = await createProjectService(data)

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

    const fetchProject = async (page, search, clientId) => {
        try {
            const res = await getProjectService(page, search, clientId);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const listAllProject = async (page, search) => {
        try {
            const res = await listAllProjectService(page, search);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const editProject = async (id, data) => {
        setLoading(true);

        try {
            const res = await editProjectService(id, data);

            return {
                success: true,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengupdate project"
            };
        } finally {
            setLoading(false);
        }
    };

    const updateStatusProject = async (id, data) => {
        setLoading(true);

        try {
            const res = await updateStatusProjectService(id, data);

            return {
                success: true,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengupdate data"
            };
        } finally {
            setLoading(false);
        }
    };

    const removeProject = async (id) => {
        setLoading(true);

        try {
            const res = await deleteProjectService(id);

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
        addProject,
        fetchProject,
        listAllProject,
        editProject,
        updateStatusProject,
        removeProject,
        loading
    }
}

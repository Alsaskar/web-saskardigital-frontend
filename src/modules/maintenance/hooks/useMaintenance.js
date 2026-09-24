import { useState } from "react"
import {
  createMaintenanceService,
  deleteMaintenanceService,
  editMaintenanceService,
  getMaintenanceService
} from "../services/MaintenanceService"

export const useMaintenance = () => {
    const [loading, setLoading] = useState(false)

    const addMaintenance = async (data) => {
        setLoading(true)

        try {
            const res = await createMaintenanceService(data)

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

    const fetchMaintenance = async (page, search) => {
        try {
            const res = await getMaintenanceService(page, search);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const editMaintenance = async (id, data) => {
        setLoading(true);

        try {
            const res = await editMaintenanceService(id, data);

            return {
                success: true,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengupdate maintenance"
            };
        } finally {
            setLoading(false);
        }
    };

    const removeMaintenance = async (id) => {
        setLoading(true);

        try {
            const res = await deleteMaintenanceService(id);

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
        addMaintenance,
        fetchMaintenance,
        editMaintenance,
        removeMaintenance,
        loading
    }
}

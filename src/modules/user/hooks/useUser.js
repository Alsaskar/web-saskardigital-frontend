import { useState } from "react"
import {
    changePasswordService,
  createUserService,
  deleteUserService,
  editUserService,
  getUserService
} from "../services/UserService"

export const useUser = () => {
    const [loading, setLoading] = useState(false)

    const addUser = async (data) => {
        setLoading(true)

        try {
            const res = await createUserService(data)

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

    const fetchUser = async (page, search) => {
        try {
            const res = await getUserService(page, search);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const editUser = async (id, data) => {
        setLoading(true);

        try {
            const res = await editUserService(id, data);

            return {
                success: true,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengupdate user"
            };
        } finally {
            setLoading(false);
        }
    };

    const removeUser = async (id) => {
        setLoading(true);

        try {
            const res = await deleteUserService(id);

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

    const changePassword = async (payload) => {
        try {
            setLoading(true);
            const res = await changePasswordService(payload);

            return res;
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        addUser,
        fetchUser,
        editUser,
        removeUser,
        changePassword,
        loading
    }
}

import { useState } from "react"
import {
  createPortfolioService,
  deletePortfolioService,
  editPortfolioService,
  getPortfolioAllService,
  getPortfolioByCategoryService,
  getPortfolioService
} from "../services/PortfolioService"

export const usePortfolio = () => {
    const [loading, setLoading] = useState(false)

    const addPortfolio = async (data) => {
        setLoading(true)

        try {
            const res = await createPortfolioService(data)

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

    const fetchPortfolioAll = async (limit) => {
        try {
            const res = await getPortfolioAllService(limit);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    // By Category Service Portfolio
    const fetchPortfolioByCategory = async (categoryService) => {
        try {
            const res = await getPortfolioByCategoryService(categoryService);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const fetchPortfolio = async (page, search) => {
        try {
            const res = await getPortfolioService(page, search);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const editPortfolio = async (id, data) => {
        setLoading(true);

        try {
            const res = await editPortfolioService(id, data);

            return {
                success: true,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengupdate portfolio"
            };
        } finally {
            setLoading(false);
        }
    };

    const removePortfolio = async (id) => {
        setLoading(true);

        try {
            const res = await deletePortfolioService(id);

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
        addPortfolio,
        fetchPortfolio,
        fetchPortfolioAll,
        fetchPortfolioByCategory,
        editPortfolio,
        removePortfolio,
        loading
    }
}

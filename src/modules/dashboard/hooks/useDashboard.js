import { useState } from "react"
import {
  getDashboardService
} from "../services/DashboardService"

export const useDashboard = () => {
    const [loading, setLoading] = useState(false)

    const fetchDashboard = async () => {
        try {
            setLoading(true)
            const res = await getDashboardService();

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }finally{
            setLoading(false)
        }
    }

    return {
        fetchDashboard,
        loading
    }
}

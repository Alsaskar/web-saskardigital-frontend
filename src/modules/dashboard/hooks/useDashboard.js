import { useState } from "react"
import {
    getDashboardClientService,
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

    const fetchDashboardClient = async (clientId) => {
        try {
            setLoading(true)
            const res = await getDashboardClientService(clientId);

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
        fetchDashboardClient,
        loading
    }
}

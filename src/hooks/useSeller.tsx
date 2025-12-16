import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { sellerService } from "../services";

// Single seller hook that exposes dashboard and sales data + reloaders
export function useSeller() {
    const { token } = useAuth();

    const [stats, setStats] = useState<SellerDashboardStats>({
        todayTransactions: 0,
        todayRevenue: 0,
        totalTransactions: 0,
        totalRevenue: 0,
    });
    const [orders, setOrders] = useState<SellerOrder[]>([]);
    const [sales, setSales] = useState<SellerSale[]>([]);

    const [isLoadingDashboard, setIsLoadingDashboard] = useState<boolean>(true);
    const [isLoadingSales, setIsLoadingSales] = useState<boolean>(true);

    const loadDashboard = useCallback(async () => {
        if (!token) return;
        try {
            setIsLoadingDashboard(true);
            const data = await sellerService.getDashboard(token);
            setStats(data.stats || stats);
            setOrders(data.recentOrders || []);
        } catch (err) {
            console.error("Failed to load seller dashboard:", err);
        } finally {
            setIsLoadingDashboard(false);
        }
    }, [token, stats]);

    const loadSales = useCallback(async () => {
        if (!token) return;
        try {
            setIsLoadingSales(true);
            const data = await sellerService.getSales(token);
            setSales(data.orders || []);
        } catch (err) {
            console.error("Failed to load seller sales history:", err);
        } finally {
            setIsLoadingSales(false);
        }
    }, [token]);

    useEffect(() => {
        if (!token) return;
        void loadDashboard();
        void loadSales();
    }, [token, loadDashboard, loadSales]);

    return {
        stats,
        orders,
        sales,
        isLoadingDashboard,
        isLoadingSales,
        reloadDashboard: loadDashboard,
        reloadSales: loadSales,
    };
}



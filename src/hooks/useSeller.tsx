import { useContext, useEffect, useState } from "react";

import { sellerService } from "@/services";
import { getToken } from "@/utils/auth";
import { GlobalContext } from "@/contexts/context";

export function useSeller() {
    const { state, update } = useContext(GlobalContext)
    const sellerProfile = state.sellerProfile

    const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true);
    const [isLoadingDashboard, setIsLoadingDashboard] = useState<boolean>(true);
    const [isLoadingSales, setIsLoadingSales] = useState<boolean>(true);

    const loadProfile = async () => {
        const token = getToken();
        if (!token) return;
        try {
            setIsLoadingProfile(true);
            const data = await sellerService.getProfile();
            update({ sellerProfile: data.seller || null });
        } catch (err) {
            console.error("Failed to load seller profile:", err);
        } finally {
            setIsLoadingProfile(false);
        }
    };

    const updateProfile = async (data: Record<string, unknown>) => {
        const token = getToken();
        if (!token) return;
        try {
            const result = await sellerService.updateProfile(data);
            update({ sellerProfile: result.seller || null });
            return { success: true, seller: result.seller };
        } catch (err) {
            console.error("Failed to update seller profile:", err);
            throw err;
        }
    };

    const loadDashboard = async () => {
        const token = getToken();
        if (!token) return;
        try {
            setIsLoadingDashboard(true);
            const data = await sellerService.getDashboard();
            // setStats(data.stats || stats);
            // setOrders(data.recentOrders || []);
        } catch (err) {
            console.error("Failed to load seller dashboard:", err);
        } finally {
            setIsLoadingDashboard(false);
        }
    };

    const loadSales = async () => {
        const token = getToken();
        if (!token) return;
        try {
            setIsLoadingSales(true);
            const data = await sellerService.getSales();
            // setSales(data.orders || []);
        } catch (err) {
            console.error("Failed to load seller sales history:", err);
        } finally {
            setIsLoadingSales(false);
        }
    };

    useEffect(() => {
        const token = getToken();
        if (!token) return;
        void loadProfile();
        void loadDashboard();
        void loadSales();
    }, [loadProfile, loadDashboard, loadSales]);

    return {
        profile: sellerProfile,
        isLoadingProfile,
        isLoadingDashboard,
        isLoadingSales,
        reloadProfile: loadProfile,
        updateProfile,
        reloadDashboard: loadDashboard,
        reloadSales: loadSales,
    };
}



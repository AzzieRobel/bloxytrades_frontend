import { useCallback, useContext, useEffect, useState } from "react";

import { listingService } from "@/services";
import { GlobalContext } from "@/contexts/context";
import { getToken } from "@/utils/auth";

export function useListing() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useListing must be used within a GlobalContextProvider');
    }
    const { state, update } = context;
    const [listings, setListings] = useState<SellerListing[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadListings = useCallback(async () => {
        const token = getToken();
        if (!token) return;
        try {
            setIsLoading(true);
            const data = await listingService.getMyListings(token);
            setListings(data.listings || []);
        } catch (err) {
            console.error("Failed to load seller listings:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = getToken();
        if (!token) return;
        void loadListings();
    }, [loadListings]);

    const createListing = useCallback(
        async (payload: { title: string; description: string; price: number }) => {
            const token = getToken();
            if (!token) return;
            await listingService.createListing(token, payload);
            await loadListings();
        },
        [loadListings]
    );

    // You can add more functions here in the future and return them.
    return {
        listings,
        isLoading,
        reload: loadListings,
        createListing,
        // Add other functions here if needed
    };
}

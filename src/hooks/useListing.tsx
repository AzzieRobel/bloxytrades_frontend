import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { listingService } from "../services";

// useListing custom hook with internal functions
export function useListing() {
    const { token } = useAuth();
    const [listings, setListings] = useState<SellerListing[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadListings = useCallback(async () => {
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
    }, [token]);

    useEffect(() => {
        if (!token) return;
        void loadListings();
    }, [token, loadListings]);

    const createListing = useCallback(
        async (payload: { title: string; description: string; price: number }) => {
            if (!token) return;
            await listingService.createListing(token, payload);
            await loadListings();
        },
        [token, loadListings]
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

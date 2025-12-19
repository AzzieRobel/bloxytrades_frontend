import { useContext } from "react";

import { GlobalContext } from "@/contexts/context";
import { listingService } from "@/services";

export function useListing() {
    const { state, update } = useContext(GlobalContext);

    const getAllListing = async () => {
        try {
            const listing = await listingService.getAllListing();
            update({ listing });
            return listing;
        } catch (error: any) {
            throw error;
        }
    }

    const addListing = async (data: any) => {
        try {
            const result = await listingService.addListing(data);
            return { success: true, listing: result };
        } catch (error: any) {
            throw error;
        }
    }

    const updateListing = async (data: any) => {
        try {
            const result = await listingService.updateListing(data);
            return { success: true, listing: result };
        } catch (error: any) {
            throw error;
        }
    }

    const removeListing = async (id: string) => {
        try {
            const result = await listingService.removeListing(id);
            return { success: true };
        } catch (error: any) {
            throw error;
        }
    }

    return {
        listing: state.listing,
        getAllListing,
        addListing,
        updateListing,
        removeListing,
    };
}

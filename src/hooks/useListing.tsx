import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "@/contexts/context";
import { listingService } from "@/services";
import { getToken } from "@/utils/auth";

export function useListing() {
    const { state, update } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getAllListing = async () => {
        try {
            const data = await listingService.getAllListing();
            update({ listings: data.listings || [] });
            return data;
        } catch (error: any) {
            throw error;
        }
    }

    const createListing = async (data: any) => {
        try {
            const result = await listingService.addListing(data);
            return { success: true, listing: result.listing };
        } catch (error: any) {
            throw error;
        }
    }

    const updateListing = async (data: any) => {
        try {
            const result = await listingService.updateListing(data);
            return { success: true, listing: result.listing };
        } catch (error: any) {
            throw error;
        }
    }

    const removeListing = async (id: string) => {
        try {
            await listingService.removeListing(id);
            return { success: true };
        } catch (error: any) {
            throw error;
        }
    }

    return {
        listing: state.listing,
        listings: state.listings || [],
        isLoading,
        getAllListing,
        createListing,
        updateListing,
        removeListing,
    };
}

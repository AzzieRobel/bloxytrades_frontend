import { useContext, useState } from "react";

import { GlobalContext } from "@/contexts/context";
import { listingService } from "@/services";

export function useListing() {
    const { state, update } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cursor, setCursor] = useState<{ createdAt: string; id: string } | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [sort, setSort] = useState<"newest">("newest");

    const getAllListing = async (options?: { sort?: "newest"; reset?: boolean }) => {
        const nextSort = options?.sort || sort;
        const reset = options?.reset ?? true;

        try {
            setIsLoading(true);

            const data = await listingService.getAllListing({
                sort: nextSort,
                limit: 24,
                cursorCreatedAt: reset ? undefined : cursor?.createdAt,
                cursorId: reset ? undefined : cursor?.id,
            });

            if (reset) {
                update({ listings: data.listings || [] });
            } else {
                const existing = state.listings || [];
                update({ listings: [...existing, ...(data.listings || [])] });
            }

            setSort(nextSort);
            setCursor(data.nextCursor || null);
            setHasMore(!!data.hasMore);

            return data;
        } catch (error: any) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const loadInitialListings = async (newSort: "newest" = "newest") => {
        setCursor(null);
        setHasMore(true);
        await getAllListing({ sort: newSort, reset: true });
    };

    const loadMoreListings = async () => {
        if (isLoading || !hasMore || !cursor) return;
        await getAllListing({ sort, reset: false });
    };

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
        sort,
        hasMore,
        loadInitialListings,
        loadMoreListings,
        createListing,
        updateListing,
        removeListing,
    };
}

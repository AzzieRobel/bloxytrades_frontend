import { useContext, useState } from "react";

import { GlobalContext } from "@/contexts/context";
import { listingService } from "@/services";

type ListingFilters = {
  priceMin?: number;
  priceMax?: number;
  paymentCrypto?: boolean;
  paymentPaypal?: boolean;
  paymentCard?: boolean;
};

export function useListing() {
    const { state, update } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cursor, setCursor] = useState<{ createdAt: string; id: string } | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
  const [sort, setSort] = useState<"newest" | "price-high" | "price-low">("newest");
  const [filters, setFilters] = useState<ListingFilters | null>(null);

  const getAllListing = async (options?: {
    sort?: "newest" | "price-high" | "price-low";
    reset?: boolean;
    filters?: ListingFilters;
  }) => {
        const nextSort = options?.sort || sort;
        const reset = options?.reset ?? true;
    const nextFilters = options?.filters ?? filters ?? {};

        try {
            setIsLoading(true);

            const data = await listingService.getAllListing({
                sort: nextSort,
                limit: 24,
                cursorCreatedAt: reset ? undefined : cursor?.createdAt,
                cursorId: reset ? undefined : cursor?.id,
        ...nextFilters,
            });

            if (reset) {
                update({ listings: data.listings || [] });
            } else {
                const existing = state.listings || [];
                update({ listings: [...existing, ...(data.listings || [])] });
            }

            setSort(nextSort);
      setFilters(nextFilters);
            setCursor(data.nextCursor || null);
            setHasMore(!!data.hasMore);

            return data;
        } catch (error: any) {
            throw error;
        } finally {
            setIsLoading(false);
        }
  };

  const loadInitialListings = async (
    newSort: "newest" | "price-high" | "price-low" = "newest",
    newFilters?: ListingFilters
  ) => {
        setCursor(null);
        setHasMore(true);
    await getAllListing({ sort: newSort, reset: true, filters: newFilters });
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
  };

    const updateListing = async (data: any) => {
        try {
            const result = await listingService.updateListing(data);
            return { success: true, listing: result.listing };
        } catch (error: any) {
            throw error;
        }
  };

    const removeListing = async (id: string) => {
        try {
            await listingService.removeListing(id);
            return { success: true };
        } catch (error: any) {
            throw error;
        }
  };

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


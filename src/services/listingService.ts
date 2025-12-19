import { api } from "./api";
import { authService } from ".";

interface ListingCursor {
  createdAt: string;
  id: string;
}

interface GetAllListingParams {
  sort?: "newest";
  limit?: number;
  cursorCreatedAt?: string;
  cursorId?: string;
}

interface GetAllListingResponse {
  listings: Listing[];
  nextCursor?: ListingCursor | null;
  hasMore?: boolean;
}

export class ListingService {
  async getAllListing(params: GetAllListingParams = {}) {
    const { sort = "newest", limit = 24, cursorCreatedAt, cursorId } = params;

    const res = await api.get("/listings", {
      params: {
        sort,
        limit,
        cursorCreatedAt,
        cursorId,
      },
    });

    return res.data as GetAllListingResponse;
  }

  async addListing(data: any) {
    const headers = await authService.headers();
    const res = await api.post("/listings", data, headers);
    return res.data as { listing: Listing };
  }

  async updateListing(data: any) {
    const headers = await authService.headers();
    const res = await api.put(`/listings/${data.id}`, data, headers);
    return res.data as { listing: Listing };
  }

  async removeListing(id: string) {
    const headers = await authService.headers();
    const res = await api.delete(`/listings/${id}`, headers);
    return res.data;
  }

  async getListingsBySeller(sellerId: string) {
    // Public endpoint, no auth required
    const res = await api.get(`/listings/seller/${sellerId}`);
    return res.data as { listings: Listing[] };
  }
}



import { api } from "./api";
import { authService } from ".";

export class ListingService {
  async getAllListing() {
    const res = await api.get("/listings");
    return res.data as { listings: Listing[] };
  }

  async addListing(data: any) {
    const headers = await authService.headers()
    const res = await api.post("/listings", data, headers);
    return res.data as { listing: Listing };
  }

  async updateListing(data: any) {
    const headers = await authService.headers()
    const res = await api.put(`/listings/${data.id}`, data, headers)
    return res.data as { listing: Listing };
  }

  async removeListing(id: string) {
    const headers = await authService.headers()
    const res = await api.delete(`/listings/${id}`, headers)
    return res.data;
  }

  async getListingsBySeller(sellerId: string) {
    // Public endpoint, no auth required
    const res = await api.get(`/listings/seller/${sellerId}`);
    return res.data as { listings: Listing[] };
  }
}



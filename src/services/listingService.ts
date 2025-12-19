import { api } from "./api";
import { authService } from ".";

export class ListingService {
  async getAllListing() {
    const headers = await authService.headers()
    const res = await api.get("/listings", headers);
    return res.data;
  }

  async addListing(data: any) {
    const headers = await authService.headers()
    const res = await api.post("/listings", data, headers);
    return res.data;
  }

  async updateListing(data: any) {
    const headers = await authService.headers()
    const res = await api.put(`/listings/${data.id}`, data, headers)
    return res.data;
  }

  async removeListing(id: string) {
    const headers = await authService.headers()
    const res = await api.delete(`/listings/${id}`, headers)
    return res.data;
  }
}



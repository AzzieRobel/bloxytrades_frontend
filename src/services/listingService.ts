import { api } from "./api";

const withAuth = (token: string | null) =>
  token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

export class ListingService {
  async getMyListings(token: string) {
    const res = await api.get("/listings/mine", withAuth(token));
    return res.data as {
      listings: Array<{
        id: string;
        title: string;
        description: string;
        price: number;
        status: "active" | "inactive" | "sold";
        createdAt: string;
      }>;
    };
  }

  async createListing(
    token: string,
    payload: { title: string; description: string; price: number }
  ) {
    const res = await api.post("/listings", payload, withAuth(token));
    return res.data;
  }
}



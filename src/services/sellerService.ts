import { api } from "./api";
import { authService } from ".";

export class SellerService {
  async getProfile() {
    const headers = await authService.headers()
    const res = await api.get("/sellers/me", headers);
    return res.data as { seller: SellerProfile }
  }

  async updateProfile(data: Record<string, unknown>) {
    const headers = await authService.headers()
    const res = await api.put("/sellers/me", data, headers);
    return res.data as { seller: SellerProfile }
  }

  async getDashboard() {
    const headers = await authService.headers()
    const res = await api.get("/sellers/me/dashboard", headers);
    return res.data as {
      stats: {
        todayTransactions: number;
        todayRevenue: number;
        totalTransactions: number;
        totalRevenue: number;
      };
      recentOrders: Array<{
        id: string;
        listingId: string;
        price: number;
        fee: number;
        status: string;
        createdAt: string;
      }>;
    };
  }

  async getSales() {
    const headers = await authService.headers()
    const res = await api.get("/sellers/me/sales", headers);
    return res.data as {
      orders: Array<{
        id: string;
        buyerId: string;
        listingId: string;
        price: number;
        fee: number;
        status: string;
        createdAt: string;
      }>;
    };
  }

  async getSellerById(sellerId: string) {
    // Public endpoint, no auth required
    const res = await api.get(`/sellers/${sellerId}`);
    return res.data as { seller: SellerProfile };
  }
}



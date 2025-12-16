import { api } from "./api";

const withAuth = (token: string | null) =>
  token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

export class SellerService {
  async getDashboard(token: string) {
    const res = await api.get("/sellers/me/dashboard", withAuth(token));
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

  async getSales(token: string) {
    const res = await api.get("/sellers/me/sales", withAuth(token));
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
}



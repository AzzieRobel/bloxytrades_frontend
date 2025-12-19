type TabType = "dashboard" | "list-items" | "sales-history" | "subscriptions" | "chargeback" | "onboarding";
type SalesFilterType = "completed" | "pending" | "flagged";

interface Order {
    trackingId: string;
    item: string;
    price: string;
    fee: string;
    date: string;
}

interface Sale {
    trackingId: string;
    buyerId: string;
    item: string;
    price: string;
    fee: string;
    ip: string;
    date: string;
}

interface Dispute {
    trackingId: string;
    buyerName: string;
    buyerEmail: string;
    buyerIp: string;
    buyerAccount: string;
    itemInfo: string;
    price: string;
    paymentMethod: string;
    disputedOn: string;
}

interface MarketSidebarProps {
    activeTab: TabType;
    setActiveTab: (value: TabType) => void
}

interface SellerDashboardStats {
    todayTransactions: number;
    todayRevenue: number;
    totalTransactions: number;
    totalRevenue: number;
}

interface SellerOrder {
    id: string;
    listingId: string;
    price: number;
    fee: number;
    status: string;
    createdAt: string;
}

interface SellerSale {
    id: string;
    buyerId: string;
    listingId: string;
    price: number;
    fee: number;
    status: string;
    createdAt: string;
}

interface SellerListing {
    id: string;
    title: string;
    description: string;
    price: number;
    status: "active" | "inactive" | "sold";
    createdAt: string;
}
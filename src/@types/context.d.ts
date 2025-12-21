interface GlobalContextType {
    state: InitialState
    update: (data: any) => void
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
}

interface InitialState {
    user: UserState | null;
    listings: Listing[];
    sellerProfile: SellerProfile | null
}

interface UserState {
    id: string;
    username: string;
    email: string;
    robloxUserId?: string;
    robloxUsername?: string;
    robloxVerifiedAt?: string | Date;
    isBanned: boolean;
    isVerifiedSeller?: boolean;
    banReason?: string;
    referralCode: string;
    createdAt: string | Date;
    lastLoginAt?: string | Date;
}

interface Listing {
    id: string;
    sellerId: string;
    itemName: string;
    description: string;
    quantity: number;
    price: Record<string, any>; // Object type for price
    imageUrl?: string; // Cloudinary image URL
    acceptedPayments: Record<string, any>; // Object type for accepted payments
    estimatedDeliveryTime: number;
    isActive: boolean;
    createdAt?: string | Date;
}

interface SellerProfile {
    userId: string;
    isEnabled: boolean;
    isPremium: boolean;
    rating: number;
    completedOrder: number;
    failedOrders: number;
    disputedCounts: number;
    payoutMethod?: {
        stripeConnected?: boolean;
        paypalEmail?: string;
        cryptoWallets?: {
            btc?: string;
            eth?: string;
            usdt?: string;
        };
    };
    suspendedUntil: boolean;
    suspensionReason?: string;
}

interface Order {
    id: string;
    buyerId: string;
    sellerId: string;
    listingId: string;
    price: number;
    fee: number;
    status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
    createdAt: string | Date;
}

interface Buyer {
    userId: string;
    profile?: {
        displayName?: string;
        avatar?: string;
        contact?: string;
    };
    createdAt?: string | Date;
}

interface Dispute {
    orderId: string;
    openedBy: string;
    reason: 'no_delivery' | 'wrong_item' | 'late_delivery' | 'suspected_scam';
    messages: Array<{
        senderId: string;
        message: string;
    }>;
    status: 'open' | 'resolved' | 'rejected';
    resolution?: {
        decision?: 'refund_buyer' | 'release_seller';
        adminId?: string;
        resolvedAt?: string | Date;
    };
    createdAt?: string | Date;
}

interface Transaction {
    id: string;
    userId: string;
    assetId: string;
    amount: number;
    status: string;
    transactionType: string;
    createdAt?: string | Date;
}
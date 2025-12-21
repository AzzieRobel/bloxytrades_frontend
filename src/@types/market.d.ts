interface FilterOption {
    priceMin: string;
    priceMax: string;
    paymentMethod: string; // "crypto" | "paypal" | "card" | ""
    sortOption: string;
}

interface SidebarProps {
    filterOption: FilterOption;
    setFilterOption: (value: FilterOption) => void;
    onClear: () => void;
}

interface Item {
    id: number;
    name: string;
    image: string;
    rap: string;
    price: string;
    badges?: any;
    priceNumeric?: number;
    listingData?: any;
}

interface PurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: Item | null;
}

interface ImageUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentImageUrl?: string;
    onImageChange: (url: string) => void;
}

interface ImageUploadProps {
    imageUrl?: string;
    onImageChange: (url: string) => void;
}

interface MyListing extends Listing {
    id: string;
    itemName: string;
    quantity: number;
    price: Record<string, any>;
    imageUrl?: string;
    acceptedPayments: Record<string, any>;
    estimatedDeliveryTime: number;
    isActive: boolean;
    createdAt?: string | Date;
}
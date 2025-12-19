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
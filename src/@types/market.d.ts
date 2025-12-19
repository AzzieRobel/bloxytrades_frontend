interface FilterOption {
    priceMin: string;
    priceMax: string;
    paymentMethod: {
        robux: false,
        paypal: false,
        card: false
    };
    sortOption: string;
}

interface SidebarProps {
    filterOption: FilterOption;
    setFilterOption: (value: FilterOption) => void;
    onApply: () => void;
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
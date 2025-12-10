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
}

interface Item {
    id: number;
    name: string;
    image: string;
    rap: string;
    price: string;
    badge?: any;
}
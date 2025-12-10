import { BankCard } from '../icons/market.icons'

export const itemMockUpConfig: Item[] = Array(18).fill(null).map((_, i) => ({
    id: i + 1,
    name: "Super Super Happy Face",
    image: "https://adurite.com/_next/image?url=https%3A%2F%2Fimages.adurite.com%2Fimages%3FassetId%3D77443491%26width%3D420%26height%3D420%26format%3DPng&w=128&q=75",
    rap: "180K",
    price: "$939",
    badge: {
        crypto: () => (<></>),
        paypal: () => (<></>),
        bank: BankCard
    }
}));
import React, { useState, useEffect } from 'react'
import { Search, ToggleLeft, ToggleRight, Star } from 'lucide-react';

import { config } from '../../config'
import { PurchaseModal } from '../../components/PurchaseModal';
import { useListing } from '../../hooks/useListing';
import { BankCard, Bitcoin, Paypal } from '../../icons/market.icons';

const categories = [
    { name: "LIMITEDS", image: config.limited },
    { name: "Grow A Garden", image: config.grow_a_garden },
    { name: "99 Nights In The Forest", image: config.nights_in_the_forest },
    { name: "Blox Fruits", image: config.blox_fruits },
    { name: "MM2", image: config.mm2 },
    { name: "Steal A Brainrot", image: config.steal_a_brainrot },
    { name: "Adopt Me", image: config.adopt_me }
];

export const MainContent = () => {
    const [minimizedView, setMinimizedView] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
    const { listings, isLoading, hasMore, loadInitialListings, loadMoreListings } = useListing();

    // Fetch listings on mount (newest first)
    useEffect(() => {
        void loadInitialListings("newest");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Transform listings to items format for display
    const items = listings.map((listing: any, index: number) => {
        const priceValue = listing.price?.USD || listing.price?.usd || 0;
        const priceString = typeof priceValue === 'number' ? `$${priceValue.toFixed(0)}` : '$0';

        // Build badges array based on accepted payments
        const badges: React.ReactNode[] = [];
        if (listing.acceptedPayments?.crypto) {
            badges.push(<Bitcoin key="crypto" />);
        }
        if (listing.acceptedPayments?.paypal) {
            badges.push(<Paypal key="paypal" />);
        }
        if (listing.acceptedPayments?.stripe) {
            badges.push(<BankCard key="bank" />);
        }

        return {
            id: listing.id || index + 1,
            name: listing.itemName || 'Unnamed Item',
            image: "https://adurite.com/_next/image?url=https%3A%2F%2Fimages.adurite.com%2Fimages%3FassetId%3D77443491%26width%3D420%26height%3D420%26format%3DPng&w=128&q=75",
            rap: "180K", // Default RAP value (can be added to listing model later)
            price: priceString,
            badges,
            listingData: listing, // Store full listing data for purchase modal
        };
    });

    // Filter items based on search query
    const filteredItems = items.filter((item: Item) => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="flex-1">
            {/* Review Stars Section */}
            <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-white text-sm">Our customers say</span>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className="w-4 h-4 fill-red-500 text-red-500"
                            />
                        ))}
                    </div>
                    <span className="text-white text-sm">4.2 out of 5 based on 531 reviews</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <span className="text-green-500 font-semibold text-sm">Trustpilot</span>
                    <Star className="w-4 h-4 fill-green-500 text-green-500" />
                </div>
            </div>

            {/* Category Tabs */}
            <div className="mb-6 overflow-x-auto">
                <div className="flex gap-3 min-w-max pb-2">
                    {categories.map((cat, i) => (
                        <button
                            key={i}
                            className={`w-full h-[90px] px-4 py-3 border border-primary/50 font-medium flex items-center justify-center relative overflow-hidden rounded-md bg-cover bg-center bg-no-repeat`}
                            style={{ backgroundImage: `url(${cat.image})` }}
                        >
                            <div className="absolute inset-0 bg-[#1a1625]/50 backdrop-blur-xs"></div>
                            <p className="z-10">{cat.name}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent Tabs */}


            {/* Search and View Toggle */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search something here..."
                        className="w-full pl-12 pr-4 py-3.5 bg-[#1a1625] border border-white/10 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                    />
                </div>
                <button
                    onClick={() => setMinimizedView(!minimizedView)}
                    className="px-6 py-3.5 bg-[#1a1625] border border-white/10 rounded-md hover:border-primary/50 transition-all flex items-center gap-2"
                >
                    <span className="text-white font-medium text-sm">Minimized View</span>
                    {minimizedView ? (
                        <ToggleRight className="w-6 h-6 text-primary" />
                    ) : (
                        <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                </button>
            </div>

            {/* Items Grid */}
            <div className={`grid gap-4 ${minimizedView ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"}`}>
                {isLoading && filteredItems.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 py-12">
                        Loading listings...
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 py-12">
                        {searchQuery ? 'No listings match your search.' : 'No listings found.'}
                    </div>
                ) : (
                    <>
                        {filteredItems.map((item: Item) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    setSelectedItem(item);
                                    setIsPurchaseModalOpen(true);
                                }}
                                className="bg-[#0f0d16] border border-white/10 rounded-sm overflow-hidden hover:border-primary/30 transition-all group cursor-pointer"
                            >
                                <div className={`relative ${minimizedView ? "aspect-square" : "aspect-square"}`}>
                                    {item.badges && item.badges.length > 0 && (
                                        <span className='absolute top-2 right-2 px-2 py-1 flex gap-1 z-10'>
                                            {item.badges.map((badge: React.ReactNode, idx: number) => (
                                                <span key={idx} className="flex items-center">
                                                    {badge}
                                                </span>
                                            ))}
                                        </span>
                                    )}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className={`w-full object-contain ${minimizedView ? "p-4" : "p-8"}`}
                                    />
                                </div>
                                {!minimizedView && (
                                    <div className="p-3 bg-primary/10 border-t border-t-white/10">
                                        <h3 className="font-semibold text-white mb-2.5 truncate">{item.name}</h3>
                                        <div className="flex items-center justify-around text-md">
                                            <div className='leading-[100%]'>
                                                <div className="text-primary text-xs">RAP</div>
                                                <div className="text-base">{item.rap}</div>
                                            </div>
                                            <div className='leading-[100%]'>
                                                <div className="text-primary text-xs">Price</div>
                                                <div className="text-base">{item.price}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {minimizedView && (
                                    <div className="p-2 bg-primary/10 border-t border-t-white/10">
                                        <h3 className="font-semibold text-white text-xs mb-1 truncate">{item.name}</h3>
                                        <div className="flex items-center justify-between text-xs">
                                            <div>
                                                <span className="text-primary">RAP: </span>
                                                <span className="text-white">{item.rap}</span>
                                            </div>
                                            <div>
                                                <span className="text-primary">Price: </span>
                                                <span className="text-white">{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {hasMore && (
                            <div className="col-span-full flex justify-center py-6">
                                <button
                                    onClick={() => void loadMoreListings()}
                                    disabled={isLoading}
                                    className="px-6 py-2.5 rounded-sm bg-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading ? "Loading..." : "Load more"}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Purchase Modal */}
            <PurchaseModal
                isOpen={isPurchaseModalOpen}
                onClose={() => {
                    setIsPurchaseModalOpen(false);
                    setSelectedItem(null);
                }}
                item={selectedItem}
            />
        </main>
    )
}
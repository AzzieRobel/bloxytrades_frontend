import React, { useContext, useState, useEffect } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { GlobalContext } from '@/contexts/context';
import { userService } from '@/services';
import { formatPriceCompact } from '@/utils';
import { BankCard, Bitcoin, Paypal } from '@/icons/market.icons';

export default function SellerProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { state } = useContext(GlobalContext);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const allListings = state.listings || [];

  const sellerListings = allListings.filter((listing: any) =>
    listing.sellerId === id && listing.isActive !== false
  );

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const userData = await userService.getUserById(id);
        if (userData && userData.user) {
          setUser(userData.user);
        }
      } catch (err: any) {
        if (err?.response?.status !== 404) {
          console.error('Failed to load user:', err);
        }
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUser();
  }, [id]);

  const items = sellerListings.map((listing: any, index: number) => {
    const priceValueRaw = listing.price?.USD ?? listing.price?.usd ?? 0;
    const priceNum = typeof priceValueRaw === "number" ? priceValueRaw : parseFloat(priceValueRaw) || 0;
    const priceString = formatPriceCompact(priceNum);
    const rapString = formatPriceCompact(listing.rap);

    const badges: React.ReactNode[] = [];
    if (listing.acceptedPayments?.crypto) badges.push(<Bitcoin key="crypto" />);
    if (listing.acceptedPayments?.paypal) badges.push(<Paypal key="paypal" />);
    if (listing.acceptedPayments?.stripe) badges.push(<BankCard key="bank" />);

    return {
      id: listing.id || index + 1,
      name: listing.itemName,
      image: listing.imageUrl,
      rap: rapString,
      price: priceString,
      badges,
      listingData: listing,
    };
  });

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#5650EF]/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-[#5650EF]/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-12 py-8">
        {/* Seller Profile Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-black/40 border-2 border-[#5650EF] flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#5650EF]/20 to-black flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {(user?.username || id || 'S').charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Username and Badges */}
            <div className="flex items-center gap-2">
              <h1 className="text-white text-3xl font-bold">
                {user?.username || id || 'Unknown Seller'}
              </h1>
              {user?.isVerifiedSeller && (
                <CheckCircle2 className="w-5 h-5 text-[#5650EF]" fill="#5650EF" />
              )}
              <Circle className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {/* Section Heading */}
          <div>
            <h2 className="text-white text-2xl font-bold">LIMITEDS</h2>
          </div>

          {/* Listings Grid */}
          {items.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No listings available.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-[#0f0d16] border border-white/10 rounded-sm overflow-hidden hover:border-primary/30 transition-all group cursor-pointer"
                >
                  <div className="relative aspect-square">
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
                      className="w-full h-full object-contain p-8"
                    />
                  </div>
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


import { useState, useEffect } from "react";
import { Search, Loader2, RefreshCw, X } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";

interface RobloxAsset {
    assetId: string;
    name: string;
    assetType: string;
    createdUtc: string;
    thumbnailUrl?: string;
}

interface RobloxAssetSelectorProps {
    onSelectAsset: (asset: RobloxAsset) => void;
    onClose?: () => void;
    isOpen: boolean;
}

export function RobloxAssetSelector({ onSelectAsset, onClose, isOpen }: RobloxAssetSelectorProps) {
    const { getMyRobloxAssets } = useUser();
    const [assets, setAssets] = useState<RobloxAsset[]>([]);
    const [filteredAssets, setFilteredAssets] = useState<RobloxAsset[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [nextCursor, setNextCursor] = useState<string | undefined>();
    const [hasMore, setHasMore] = useState(false);

    const loadAssets = async (cursor?: string, append = false) => {
        try {
            setIsLoading(true);
            const result = await getMyRobloxAssets({
                limit: 50,
                cursor,
                assetTypeId: 1, // Image assets (Limiteds)
            });

            if (append) {
                setAssets(prev => [...prev, ...result.assets]);
            } else {
                setAssets(result.assets);
            }

            setNextCursor(result.nextCursor);
            setHasMore(!!result.nextCursor);
        } catch (error: any) {
            console.error("Failed to load Roblox assets:", error);
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to load Roblox assets";
            
            // Show more helpful error messages
            if (errorMessage.includes('private') || errorMessage.includes('Private')) {
                toast.error("Your Roblox inventory is private. Please make it public in your Roblox privacy settings.");
            } else if (errorMessage.includes('not found') || errorMessage.includes('Not found')) {
                toast.error("Roblox account not found or inventory is empty.");
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && assets.length === 0) {
            void loadAssets();
        }
    }, [isOpen]);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredAssets(assets);
        } else {
            const query = searchQuery.toLowerCase();
            setFilteredAssets(
                assets.filter(
                    asset =>
                        asset.name.toLowerCase().includes(query) ||
                        asset.assetId.includes(query)
                )
            );
        }
    }, [searchQuery, assets]);

    const handleSelect = (asset: RobloxAsset) => {
        onSelectAsset(asset);
        if (onClose) onClose();
    };

    const handleLoadMore = () => {
        if (nextCursor && !isLoading) {
            void loadAssets(nextCursor, true);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0f0d16] border border-white/10 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-white text-2xl font-bold">Select Roblox Asset</h2>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>

                {/* Search Bar */}
                <div className="p-4 border-b border-white/10">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search assets by name or ID..."
                            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#5650EF]"
                        />
                    </div>
                </div>

                {/* Assets Grid */}
                <div className="flex-1 overflow-y-auto p-4">
                    {isLoading && assets.length === 0 ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 text-[#5650EF] animate-spin" />
                            <span className="ml-3 text-gray-400">Loading assets...</span>
                        </div>
                    ) : filteredAssets.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-400 mb-2">
                                {searchQuery ? "No assets found matching your search." : "No assets found."}
                            </p>
                            {!searchQuery && (
                                <div className="text-gray-500 text-sm space-y-1">
                                    <p>Possible reasons:</p>
                                    <ul className="list-disc list-inside space-y-1 text-left max-w-md mx-auto">
                                        <li>Your Roblox inventory is set to private</li>
                                        <li>You don't have any Limited items (Image assets)</li>
                                        <li>Your inventory needs to be public to view assets</li>
                                    </ul>
                                    <p className="mt-3 text-xs">
                                        To make your inventory public: Roblox → Settings → Privacy → Inventory Visibility → Everyone
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {filteredAssets.map((asset) => (
                                <button
                                    key={asset.assetId}
                                    onClick={() => handleSelect(asset)}
                                    className="bg-black/40 border border-white/10 rounded-sm p-3 hover:border-[#5650EF] transition-all text-left group"
                                >
                                    <div className="aspect-square bg-black/60 rounded-sm mb-2 flex items-center justify-center overflow-hidden">
                                        {asset.thumbnailUrl ? (
                                            <img
                                                src={asset.thumbnailUrl}
                                                alt={asset.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://thumbnails.roblox.com/v1/assets?assetIds=${asset.assetId}&size=150x150&format=Png`;
                                                }}
                                            />
                                        ) : (
                                            <div className="text-gray-500 text-xs">No Image</div>
                                        )}
                                    </div>
                                    <h3 className="text-white text-sm font-semibold truncate group-hover:text-[#5650EF] transition-colors">
                                        {asset.name}
                                    </h3>
                                    <p className="text-gray-400 text-xs mt-1">ID: {asset.assetId}</p>
                                    <p className="text-gray-500 text-xs mt-1">{asset.assetType}</p>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Load More Button */}
                    {hasMore && !isLoading && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleLoadMore}
                                disabled={isLoading}
                                className="flex items-center gap-2 px-6 py-2 bg-[#5650EF] hover:bg-[#5650EF]/80 text-white rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="w-4 h-4" />
                                        Load More
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 text-center">
                    <p className="text-gray-500 text-xs">
                        Showing {filteredAssets.length} of {assets.length} assets
                    </p>
                </div>
            </div>
        </div>
    );
}


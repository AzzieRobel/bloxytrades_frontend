import React, { FormEvent, useState, useEffect } from "react";
import { useListing } from "../../hooks/useListing";
import { listingService } from "@/services";
import toast from "react-hot-toast";
import { ChevronDown, ChevronUp, Edit, Trash2, Power, PowerOff, Image as ImageIcon, Gamepad2 } from "lucide-react";
import { ImageUploadModal } from "@/components/ImageUploadModal";
import { EditListingModal } from "@/components/EditListingModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { RobloxAssetSelector } from "@/components/RobloxAssetSelector";

export const ListItemTab = () => {
    const { createListing, updateListing, removeListing } = useListing();
    const [myListings, setMyListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const [editingListing, setEditingListing] = useState<Listing | null>(null);
    const [deletingListing, setDeletingListing] = useState<Listing | null>(null);
    const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false);
    const [isEditImageUploadModalOpen, setIsEditImageUploadModalOpen] = useState(false);
    const [isRobloxAssetSelectorOpen, setIsRobloxAssetSelectorOpen] = useState(false);

    const [form, setForm] = useState({
        title: "",
        price: "",
        rap: "",
        quantity: "",
        estimatedDeliveryTime: "24",
        imageUrl: "",
        paymentMethods: {
            crypto: false,
            paypal: false,
            card: false,
        },
    });

    const [editForm, setEditForm] = useState({
        title: "",
        price: "",
        rap: "",
        quantity: "1",
        estimatedDeliveryTime: "24",
        imageUrl: "",
        paymentMethods: {
            crypto: false,
            paypal: false,
            card: false,
        },
    });

    // Load seller's listings
    const loadMyListings = async () => {
        try {
            setIsLoading(true);
            const data = await listingService.getMyListings();
            setMyListings(data.listings || []);
        } catch (err) {
            console.error("Failed to load listings:", err);
            toast.error("Failed to load listings");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void loadMyListings();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const priceNumber = Number(form.price);
        const rapNumber = form.rap ? Number(form.rap) : undefined;
        const quantityNumber = Number(form.quantity);
        const deliveryTime = Number(form.estimatedDeliveryTime);

        if (!form.title.trim() || !priceNumber || priceNumber <= 0) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (!form.paymentMethods.crypto && !form.paymentMethods.paypal && !form.paymentMethods.card) {
            toast.error("Please select at least one payment method");
            return;
        }

        try {
            setIsLoading(true);
            await createListing({
                itemName: form.title,
                quantity: quantityNumber || 1,
                price: { USD: priceNumber },
                rap: rapNumber,
                imageUrl: form.imageUrl || undefined,
                acceptedPayments: {
                    crypto: form.paymentMethods.crypto,
                    paypal: form.paymentMethods.paypal,
                    card: form.paymentMethods.card,
                    stripe: form.paymentMethods.card, // Also set stripe if card is selected
                },
                estimatedDeliveryTime: deliveryTime || 24,
                isActive: true,
            });
            setForm({
                title: "",
                price: "",
                rap: "",
                quantity: "1",
                estimatedDeliveryTime: "24",
                imageUrl: "",
                paymentMethods: {
                    crypto: false,
                    paypal: false,
                    card: false,
                },
            });
            toast.success("Listing created successfully!");
            await loadMyListings();
        } catch (err: any) {
            console.error("Failed to create listing:", err);
            toast.error(err?.response?.data?.message || "Failed to create listing");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (listing: Listing) => {
        const priceValue = listing.price?.USD || listing.price?.usd || 0;
        setEditForm({
            title: listing.itemName,
            price: priceValue.toString(),
            rap: listing.rap?.toString() || "",
            quantity: listing.quantity.toString(),
            estimatedDeliveryTime: listing.estimatedDeliveryTime.toString(),
            imageUrl: listing.imageUrl || "",
            paymentMethods: {
                crypto: listing.acceptedPayments?.crypto || false,
                paypal: listing.acceptedPayments?.paypal || false,
                card: listing.acceptedPayments?.card || listing.acceptedPayments?.stripe || false,
            },
        });
        setEditingListing(listing);
        setExpandedRow(null);
    };

    const handleUpdate = async () => {
        if (!editingListing) return;

        const priceNumber = Number(editForm.price);
        const rapNumber = editForm.rap ? Number(editForm.rap) : undefined;
        const quantityNumber = Number(editForm.quantity);
        const deliveryTime = Number(editForm.estimatedDeliveryTime);

        if (!editForm.title.trim() || !priceNumber || priceNumber <= 0) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (!editForm.paymentMethods.crypto && !editForm.paymentMethods.paypal && !editForm.paymentMethods.card) {
            toast.error("Please select at least one payment method");
            return;
        }

        try {
            setIsLoading(true);
            await updateListing({
                id: editingListing.id,
                itemName: editForm.title,
                quantity: quantityNumber || 1,
                price: { USD: priceNumber },
                rap: rapNumber,
                imageUrl: editForm.imageUrl || undefined,
                acceptedPayments: {
                    crypto: editForm.paymentMethods.crypto,
                    paypal: editForm.paymentMethods.paypal,
                    card: editForm.paymentMethods.card,
                    stripe: editForm.paymentMethods.card,
                },
                estimatedDeliveryTime: deliveryTime || 24,
            });
            toast.success("Listing updated successfully!");
            setEditingListing(null);
            await loadMyListings();
        } catch (err: any) {
            console.error("Failed to update listing:", err);
            toast.error(err?.response?.data?.message || "Failed to update listing");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingListing) return;

        try {
            setIsLoading(true);
            await removeListing(deletingListing.id);
            toast.success("Listing deleted successfully!");
            setDeletingListing(null);
            await loadMyListings();
        } catch (err: any) {
            console.error("Failed to delete listing:", err);
            toast.error(err?.response?.data?.message || "Failed to delete listing");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleActive = async (listing: Listing) => {
        try {
            setIsLoading(true);
            await updateListing({
                id: listing.id,
                isActive: !listing.isActive,
            });
            toast.success(`Listing ${!listing.isActive ? 'activated' : 'deactivated'} successfully!`);
            await loadMyListings();
            setExpandedRow(null);
        } catch (err: any) {
            console.error("Failed to toggle listing status:", err);
            toast.error(err?.response?.data?.message || "Failed to update listing status");
        } finally {
            setIsLoading(false);
        }
    };

    const getPaymentMethodsDisplay = (acceptedPayments: Record<string, any>) => {
        const methods: string[] = [];
        if (acceptedPayments?.crypto) methods.push("Crypto");
        if (acceptedPayments?.paypal) methods.push("PayPal");
        if (acceptedPayments?.card || acceptedPayments?.stripe) methods.push("Card");
        return methods.length > 0 ? methods.join(", ") : "None";
    };

    return (
        <div className="space-y-8">
            {/* Create Listing Form */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-8 text-left">
                <h2 className="text-white text-xl font-bold mb-4">Create New Listing</h2>
                <form onSubmit={handleSubmit} className="space-y-4 text-center">
                    <div className="flex justify-around gap-4">
                        <div>
                            <div className="mb-2">
                                <label className="block text-sm text-left text-gray-300 mb-1">Title : </label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                                    placeholder="Enter item title"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <div>
                                    <label className="block text-sm text-left text-gray-300 mb-1">Price (USD) : </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-left text-gray-300 mb-1">RAP : </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.rap}
                                        onChange={(e) => setForm({ ...form, rap: e.target.value })}
                                        className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-left text-gray-300 mb-1">Quantity : </label>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="5"
                                        value={form.quantity}
                                        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                                        className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm text-left text-gray-300 mb-1">Estimated Delivery Time (hours) : </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={form.estimatedDeliveryTime}
                                        onChange={(e) => setForm({ ...form, estimatedDeliveryTime: e.target.value })}
                                        className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm text-left text-gray-300 mb-1">Accepted Payment Methods : </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex">
                                            <input
                                                type="checkbox"
                                                checked={form.paymentMethods.crypto}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        paymentMethods: { ...form.paymentMethods, crypto: e.target.checked },
                                                    })
                                                }
                                                className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-primary checked:border-primary cursor-pointer transition-all duration-200 hover:border-primary/50 focus:ring-2 focus:ring-primary/50 focus:outline-none appearance-none"
                                            />
                                            {form.paymentMethods.crypto && (
                                                <svg className="absolute top-0 left-0 w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-gray-300 text-sm text-left group-hover:text-white transition-colors">Crypto</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex">
                                            <input
                                                type="checkbox"
                                                checked={form.paymentMethods.paypal}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        paymentMethods: { ...form.paymentMethods, paypal: e.target.checked },
                                                    })
                                                }
                                                className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-primary checked:border-primary cursor-pointer transition-all duration-200 hover:border-primary/50 focus:ring-2 focus:ring-primary/50 focus:outline-none appearance-none"
                                            />
                                            {form.paymentMethods.paypal && (
                                                <svg className="absolute top-0 left-0 w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-gray-300 text-sm text-left group-hover:text-white transition-colors">PayPal</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex">
                                            <input
                                                type="checkbox"
                                                checked={form.paymentMethods.card}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        paymentMethods: { ...form.paymentMethods, card: e.target.checked },
                                                    })
                                                }
                                                className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-primary checked:border-primary cursor-pointer transition-all duration-200 hover:border-primary/50 focus:ring-2 focus:ring-primary/50 focus:outline-none appearance-none"
                                            />
                                            {form.paymentMethods.card && (
                                                <svg className="absolute top-0 left-0 w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-gray-300 text-sm text-left group-hover:text-white transition-colors">Card</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm text-left text-gray-300 mb-1">Listing Image : </label>
                                <div className="flex items-center gap-3 flex-wrap">
                                    {form.imageUrl ? (
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={form.imageUrl}
                                                alt="Listing preview"
                                                className="w-16 h-16 object-cover rounded border border-white/10"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsImageUploadModalOpen(true)}
                                                    className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-sm text-sm transition-colors"
                                                >
                                                    Change Image
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsRobloxAssetSelectorOpen(true)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-sm text-sm transition-colors"
                                                >
                                                    <Gamepad2 className="w-4 h-4" />
                                                    From Roblox
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsImageUploadModalOpen(true)}
                                                className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-sm text-sm transition-colors"
                                            >
                                                <ImageIcon className="w-4 h-4" />
                                                Upload Image
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsRobloxAssetSelectorOpen(true)}
                                                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-sm text-sm transition-colors"
                                            >
                                                <Gamepad2 className="w-4 h-4" />
                                                Select from Roblox
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2.5 rounded-sm bg-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? "Creating..." : "Create Listing"}
                    </button>
                </form>
            </div>

            {/* Existing Listings */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 text-left">
                    <h3 className="text-white text-lg font-semibold">Your Listings</h3>
                    <p className="text-gray-500 text-sm">Manage items you are currently selling.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="px-6 py-4 text-white font-semibold text-sm">ID</th>
                                <th className="px-6 py-4 text-white font-semibold text-sm">Title</th>
                                <th className="px-6 py-4 text-white font-semibold text-sm">Price</th>
                                <th className="px-6 py-4 text-white font-semibold text-sm">Quantity</th>
                                <th className="px-6 py-4 text-white font-semibold text-sm">Status</th>
                                <th className="px-6 py-4 text-white font-semibold text-sm">Delivery Time</th>
                                <th className="px-6 py-4 text-white font-semibold text-sm">Payment Methods</th>
                                <th className="px-6 py-4 text-white font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && myListings.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-16 text-center text-gray-600">
                                        Loading listings...
                                    </td>
                                </tr>
                            ) : myListings.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-16 text-center text-gray-600">
                                        No listings yet.
                                    </td>
                                </tr>
                            ) : (
                                myListings.map((listing) => {
                                    const priceValue = listing.price?.USD || listing.price?.usd || 0;
                                    const isExpanded = expandedRow === listing.id;
                                    return (
                                        <React.Fragment key={listing.id}>
                                            <tr
                                                className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                                                onClick={() => setExpandedRow(isExpanded ? null : listing.id)}
                                            >
                                                <td className="px-6 py-4 text-gray-400 text-sm font-mono">
                                                    {listing.id.substring(0, 8)}...
                                                </td>
                                                <td className="px-6 py-4 text-gray-200">{listing.itemName}</td>
                                                <td className="px-6 py-4 text-gray-200">
                                                    ${typeof priceValue === 'number' ? priceValue.toFixed(2) : '0.00'}
                                                </td>
                                                <td className="px-6 py-4 text-gray-200">{listing.quantity}</td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs font-semibold ${listing.isActive
                                                            ? 'bg-green-500/20 text-green-400'
                                                            : 'bg-gray-500/20 text-gray-400'
                                                            }`}
                                                    >
                                                        {listing.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-200">
                                                    {listing.estimatedDeliveryTime}h
                                                </td>
                                                <td className="px-6 py-4 text-gray-200 text-sm">
                                                    {getPaymentMethodsDisplay(listing.acceptedPayments)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {isExpanded ? (
                                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                                    ) : (
                                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                                    )}
                                                </td>
                                            </tr>
                                            {isExpanded && (
                                                <tr>
                                                    <td colSpan={8} className="px-6 py-4 bg-white/5">
                                                        <div className="flex gap-3">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleEdit(listing);
                                                                }}
                                                                className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-sm transition-colors"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleToggleActive(listing);
                                                                }}
                                                                className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-sm transition-colors"
                                                            >
                                                                {listing.isActive ? (
                                                                    <>
                                                                        <PowerOff className="w-4 h-4" />
                                                                        Deactivate
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Power className="w-4 h-4" />
                                                                        Activate
                                                                    </>
                                                                )}
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setDeletingListing(listing);
                                                                }}
                                                                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-sm transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            <EditListingModal
                isOpen={!!editingListing}
                onClose={() => setEditingListing(null)}
                formData={editForm}
                onFormChange={setEditForm}
                onUpdate={handleUpdate}
                isLoading={isLoading}
                isImageUploadModalOpen={isEditImageUploadModalOpen}
                onImageUploadModalOpen={() => setIsEditImageUploadModalOpen(true)}
                onImageUploadModalClose={() => setIsEditImageUploadModalOpen(false)}
                onImageChange={(url) => {
                    setEditForm({ ...editForm, imageUrl: url });
                    setIsEditImageUploadModalOpen(false);
                }}
            />

            {/* Image Upload Modal for Create Form */}
            <ImageUploadModal
                isOpen={isImageUploadModalOpen}
                onClose={() => setIsImageUploadModalOpen(false)}
                currentImageUrl={form.imageUrl}
                onImageChange={(url) => {
                    setForm({ ...form, imageUrl: url });
                    setIsImageUploadModalOpen(false);
                }}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={!!deletingListing}
                onClose={() => setDeletingListing(null)}
                onConfirm={handleDelete}
                itemName={deletingListing?.itemName || ""}
                isLoading={isLoading}
            />

            {/* Roblox Asset Selector */}
            <RobloxAssetSelector
                isOpen={isRobloxAssetSelectorOpen}
                onClose={() => setIsRobloxAssetSelectorOpen(false)}
                onSelectAsset={(asset) => {
                    // Auto-fill form with asset data
                    setForm(prev => ({
                        ...prev,
                        title: asset.name,
                        imageUrl: asset.thumbnailUrl || `https://thumbnails.roblox.com/v1/assets?assetIds=${asset.assetId}&size=420x420&format=Png`,
                    }));
                    toast.success(`Selected ${asset.name} from your Roblox inventory`);
                }}
            />
        </div>
    );
};

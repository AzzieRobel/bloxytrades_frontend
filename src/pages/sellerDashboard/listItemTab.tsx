import React, { FormEvent, useState, useEffect } from "react";
import { useListing } from "../../hooks/useListing";
import { listingService } from "@/services";
import toast from "react-hot-toast";
import { ChevronDown, ChevronUp, Edit, Trash2, Power, PowerOff } from "lucide-react";

interface MyListing extends Listing {
    id: string;
    itemName: string;
    description: string;
    quantity: number;
    price: Record<string, any>;
    acceptedPayments: Record<string, any>;
    estimatedDeliveryTime: number;
    isActive: boolean;
    createdAt?: string | Date;
}

export const ListItemTab = () => {
    const { createListing, updateListing, removeListing } = useListing();
    const [myListings, setMyListings] = useState<MyListing[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const [editingListing, setEditingListing] = useState<MyListing | null>(null);
    const [deletingListing, setDeletingListing] = useState<MyListing | null>(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        quantity: "1",
        estimatedDeliveryTime: "24",
        paymentMethods: {
            crypto: false,
            paypal: false,
            card: false,
        },
    });

    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        price: "",
        quantity: "1",
        estimatedDeliveryTime: "24",
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
        const quantityNumber = Number(form.quantity);
        const deliveryTime = Number(form.estimatedDeliveryTime);

        if (!form.title.trim() || !form.description.trim() || !priceNumber || priceNumber <= 0) {
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
                description: form.description,
                quantity: quantityNumber || 1,
                price: { USD: priceNumber },
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
                description: "",
                price: "",
                quantity: "1",
                estimatedDeliveryTime: "24",
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

    const handleEdit = (listing: MyListing) => {
        const priceValue = listing.price?.USD || listing.price?.usd || 0;
        setEditForm({
            title: listing.itemName,
            description: listing.description,
            price: priceValue.toString(),
            quantity: listing.quantity.toString(),
            estimatedDeliveryTime: listing.estimatedDeliveryTime.toString(),
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
        const quantityNumber = Number(editForm.quantity);
        const deliveryTime = Number(editForm.estimatedDeliveryTime);

        if (!editForm.title.trim() || !editForm.description.trim() || !priceNumber || priceNumber <= 0) {
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
                description: editForm.description,
                quantity: quantityNumber || 1,
                price: { USD: priceNumber },
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

    const handleToggleActive = async (listing: MyListing) => {
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
                            <div>
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
                            <div>
                                <label className="block text-sm text-left text-gray-300 mb-1">Description : </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60 min-h-[80px]"
                                    placeholder="Describe your item"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
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
                                    <label className="block text-sm text-left text-gray-300 mb-1">Quantity : </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={form.quantity}
                                        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                                        className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
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
                            <div>
                                <label className="block text-sm text-left text-gray-300 mb-2">Accepted Payment Methods : </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.paymentMethods.crypto}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    paymentMethods: { ...form.paymentMethods, crypto: e.target.checked },
                                                })
                                            }
                                            className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-primary checked:border-primary cursor-pointer"
                                        />
                                        <span className="text-gray-300 text-sm text-left">Crypto</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.paymentMethods.paypal}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    paymentMethods: { ...form.paymentMethods, paypal: e.target.checked },
                                                })
                                            }
                                            className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-primary checked:border-primary cursor-pointer"
                                        />
                                        <span className="text-gray-300 text-sm text-left">PayPal</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.paymentMethods.card}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    paymentMethods: { ...form.paymentMethods, card: e.target.checked },
                                                })
                                            }
                                            className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-primary checked:border-primary cursor-pointer"
                                        />
                                        <span className="text-gray-300 text-sm text-left">Card</span>
                                    </label>
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
            {editingListing && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#1a1625] border border-white/10 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-white text-xl font-bold mb-6">Edit Listing</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-2">
                                    <label className="block text-sm text-gray-300 mb-1 text-left">Title : </label>
                                    <input
                                        type="text"
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                        className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm text-gray-300 mb-1 text-left">Description : </label>
                                    <textarea
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                        className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60 min-h-[80px]"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-2">
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-1 text-left">Price (USD) : </label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={editForm.price}
                                            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                            className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-1 text-left">Quantity : </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={editForm.quantity}
                                            onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
                                            className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-2">
                                    <label className="block text-sm text-gray-300 mb-1 text-left">Estimated Delivery Time (hours) : </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={editForm.estimatedDeliveryTime}
                                        onChange={(e) => setEditForm({ ...editForm, estimatedDeliveryTime: e.target.value })}
                                        className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 text-left mb-1">Accepted Payment Methods : </label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={editForm.paymentMethods.crypto}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        paymentMethods: { ...editForm.paymentMethods, crypto: e.target.checked },
                                                    })
                                                }
                                                className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-primary checked:border-primary cursor-pointer"
                                            />
                                            <span className="text-gray-300 text-sm">Crypto</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={editForm.paymentMethods.paypal}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        paymentMethods: { ...editForm.paymentMethods, paypal: e.target.checked },
                                                    })
                                                }
                                                className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-primary checked:border-primary cursor-pointer"
                                            />
                                            <span className="text-gray-300 text-sm">PayPal</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={editForm.paymentMethods.card}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        paymentMethods: { ...editForm.paymentMethods, card: e.target.checked },
                                                    })
                                                }
                                                className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-primary checked:border-primary cursor-pointer"
                                            />
                                            <span className="text-gray-300 text-sm">Card</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={handleUpdate}
                                    disabled={isLoading}
                                    className="flex-1 px-6 py-2.5 rounded-sm bg-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading ? "Updating..." : "Update Listing"}
                                </button>
                                <button
                                    onClick={() => setEditingListing(null)}
                                    disabled={isLoading}
                                    className="px-6 py-2.5 rounded-sm bg-gray-600 text-white font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deletingListing && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#1a1625] border border-white/10 rounded-lg p-8 max-w-md w-full mx-4">
                        <h2 className="text-white text-xl font-bold mb-4">Confirm Delete</h2>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to delete the listing "{deletingListing.itemName}"? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="flex-1 px-6 py-2.5 rounded-sm bg-red-500 text-white font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? "Deleting..." : "Delete"}
                            </button>
                            <button
                                onClick={() => setDeletingListing(null)}
                                disabled={isLoading}
                                className="flex-1 px-6 py-2.5 rounded-sm bg-gray-600 text-white font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

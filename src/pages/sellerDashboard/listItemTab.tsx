import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

interface SellerListing {
    id: string;
    title: string;
    description: string;
    price: number;
    status: "active" | "inactive" | "sold";
    createdAt: string;
}

export const ListItemTab = () => {
    const { token } = useAuth();

    const [listings, setListings] = useState<SellerListing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchListings = async () => {
        if (!token) return;
        try {
            setIsLoading(true);
            const res = await fetch(`${API_BASE}/listings/mine`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (res.ok) {
                setListings(data.listings || []);
            }
        } catch (err) {
            console.error("Failed to load seller listings:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!token) return;
        const priceNumber = Number(form.price);
        if (!form.title.trim() || !form.description.trim() || !priceNumber || priceNumber <= 0) {
            return;
        }

        try {
            setIsSubmitting(true);
            const res = await fetch(`${API_BASE}/listings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: form.title,
                    description: form.description,
                    price: priceNumber,
                }),
            });
            if (res.ok) {
                setForm({ title: "", description: "", price: "" });
                await fetchListings();
            } else {
                const data = await res.json().catch(() => ({}));
                console.error("Failed to create listing:", data);
            }
        } catch (err) {
            console.error("Failed to create listing:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Create Listing Form */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-8 text-left">
                <h2 className="text-white text-xl font-bold mb-4">Create New Listing</h2>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Title</label>
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
                        <label className="block text-sm text-gray-300 mb-1">Description</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60 min-h-[80px]"
                            placeholder="Describe your item"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Price (USD)</label>
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
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 rounded-sm bg-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? "Creating..." : "Create Listing"}
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
                                <th className="px-6 py-4 text-left text-white font-semibold text-sm">Title</th>
                                <th className="px-6 py-4 text-left text-white font-semibold text-sm">Price</th>
                                <th className="px-6 py-4 text-left text-white font-semibold text-sm">Status</th>
                                <th className="px-6 py-4 text-left text-white font-semibold text-sm">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listings.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-16 text-center text-gray-600">
                                        {isLoading ? "Loading listings..." : "No listings yet."}
                                    </td>
                                </tr>
                            ) : (
                                listings.map((listing) => (
                                    <tr key={listing.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 text-gray-200">{listing.title}</td>
                                        <td className="px-6 py-4 text-gray-200">${listing.price.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-gray-400 capitalize">{listing.status}</td>
                                        <td className="px-6 py-4 text-gray-400">
                                            {new Date(listing.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
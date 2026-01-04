import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, X } from "lucide-react";

import { useUser } from "@/hooks/useUser";

export const EmailChangeSection = () => {
    const { user, changeEmail } = useUser();

    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [editedEmail, setEditedEmail] = useState(user?.email || '');

    const handleSaveEmail = async () => {
        try {
            if (!editedEmail.trim() || !editedEmail.includes('@')) {
                toast.error('Please enter a valid email');
                return;
            }
            await changeEmail(editedEmail)
            toast.success('Email updated successfully!');
            setIsEditingEmail(false);
        } catch (error: any) {
            console.error("Failed to change email:", error);
            toast.error("Failed to change email. Please try again.");
        }
    };

    return (
        <div className="mb-6 text-left">
            {isEditingEmail ? (
                <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-400 w-24 flex-shrink-0">Email</label>
                    <input
                        type="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        className="flex-1 px-3 py-2 bg-[#0f0f0f] border border-white/10 rounded text-white focus:outline-none focus:border-primary"
                        autoFocus
                    />
                    <button
                        onClick={handleSaveEmail}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded text-sm font-medium"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => {
                            setIsEditingEmail(false);
                            setEditedEmail(user.email);
                        }}
                        className="p-2 text-gray-400 hover:text-white"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-400 w-24 flex-shrink-0">Email</label>
                    <span className="flex-1 text-white">{user.email}</span>
                    <button
                        onClick={() => setIsEditingEmail(true)}
                        className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
                    >
                        <Mail className="w-3 h-3" />
                        Change EMAIL
                    </button>
                </div>
            )}
        </div>
    )
}
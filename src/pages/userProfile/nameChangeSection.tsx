import { useState } from "react";
import toast from 'react-hot-toast';
import { Edit, X } from 'lucide-react';

import { useUser } from '@/hooks/useUser';

export const NameChangeSection = () => {
    const { user, changeUsername } = useUser()

    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState(user?.username || '');

    const handleSaveName = async () => {
        try {
            if (!editedName.trim()) {
                toast.error('Name cannot be empty');
                return;
            }
            await changeUsername(editedName)

            toast.success('Name updated successfully!');
            setIsEditingName(false);
        } catch (error: any) {
            console.error("Failed to change username:", error);
            toast.error("Failed to change username. Please try again.");
        }
    };

    return (
        <div className="mb-6 text-left">
            {isEditingName ? (
                <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-400 w-24 flex-shrink-0">Name</label>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="flex-1 px-3 py-2 bg-[#0f0f0f] border border-white/10 rounded text-white focus:outline-none focus:border-primary"
                        autoFocus
                    />
                    <button
                        onClick={handleSaveName}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded text-sm font-medium"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => {
                            setIsEditingName(false);
                            setEditedName(user.username);
                        }}
                        className="p-2 text-gray-400 hover:text-white"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-400 w-24 flex-shrink-0">Name</label>
                    <span className="flex-1 text-white">{user.username}</span>
                    <button
                        onClick={() => setIsEditingName(true)}
                        className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
                    >
                        <Edit className="w-3 h-3" />
                        EDIT
                    </button>
                </div>
            )}
        </div>
    )
}
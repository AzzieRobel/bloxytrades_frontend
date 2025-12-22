import { useState } from "react";
import toast from "react-hot-toast";
import { Lock, X } from "lucide-react";

import { useUser } from "@/hooks/useUser";

export const PasswordChangeSection = () => {
    const { changePassword } = useUser();

    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChangePassword = async () => {
        try {
            if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
                toast.error('Please fill all password fields');
                return;
            }
            if (passwordData.newPassword.length < 6) {
                toast.error('Password must be at least 6 characters');
                return;
            }
            if (passwordData.newPassword !== passwordData.confirmPassword) {
                toast.error('New passwords do not match');
                return;
            }

            await changePassword({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword })
            toast.success("Password changed successfully!");
            setIsChangingPassword(false);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            console.error("Failed to change password:", error);
            toast.error("Failed to change password. Please try again.");
        }
    };

    return (
        <div className='text-left'>
            {isChangingPassword ? (
                <div className="space-y-3">
                    <div className="flex items-center gap-4">
                        <label className="text-sm text-gray-400 w-24 flex-shrink-0">Password</label>
                        <div className="flex-1 space-y-2">
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                className="w-full px-3 py-2 bg-[#0f0f0f] border border-white/10 rounded text-white focus:outline-none focus:border-primary"
                                autoFocus
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                className="w-full px-3 py-2 bg-[#0f0f0f] border border-white/10 rounded text-white focus:outline-none focus:border-primary"
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                className="w-full px-3 py-2 bg-[#0f0f0f] border border-white/10 rounded text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="flex items-start gap-2">
                            <button
                                onClick={handleChangePassword}
                                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded text-sm font-medium"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setIsChangingPassword(false);
                                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                }}
                                className="p-2 text-gray-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-400 w-24 flex-shrink-0">Password</label>
                    <span className="flex-1 text-white">************</span>
                    <button
                        onClick={() => setIsChangingPassword(true)}
                        className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
                    >
                        <Lock className="w-3 h-3" />
                        Change Password?
                    </button>
                </div>
            )}
        </div>
    )
}
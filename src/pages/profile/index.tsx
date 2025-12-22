import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Edit, Mail, Lock, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { changeUsername, changeEmail, changePassword } = useUser()

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editedName, setEditedName] = useState(user?.username || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  if (!user) {
    navigate('/');
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
    <div className="bg-dark-900 relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(239, 69, 69, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-[9rem] pb-[9.5rem]">
        {/* Main Card */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg shadow-2xl overflow-hidden">
          {/* Overview Section */}
          <div className="p-6 ">
            <h2 className="text-2xl text-left font-semibold p-4 pb-0 mb-6">Your Details</h2>
            <h2 className="text-xl text-left font-semibold border-t border-white/20 pt-4 mb-6">Overview</h2>

            {/* Name */}
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

            {/* Email */}
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

            {/* Password */}
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
          </div>

          {/* Preferences Section */}
          <div className="p-6 text-left pb-0">
            <h2 className="text-xl font-semibold text-white border-t border-white/20 pt-6 mb-6">Preferences</h2>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-400 w-24 flex-shrink-0">Language</label>
                <span className="flex-1 text-white">English</span>
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-400 w-24 flex-shrink-0">Currency</label>
                <span className="flex-1 text-white">USD</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6">
            <p className="text-gray-400 text-sm text-left border-t border-white/20 pt-6">
              User since {formatDate(user.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


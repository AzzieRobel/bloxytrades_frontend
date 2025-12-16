import { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleProfile = () => {
    navigate('/profile');
    setIsOpen(false);
  };

  const handleSellerDashboard = () => {
    navigate('/seller-dashboard');
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative w-full lg:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full lg:w-auto flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-white">{user.username}</span>
        <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform ml-auto lg:ml-0", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 lg:right-0 left-0 lg:left-auto mt-2 w-full lg:w-48 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-sm font-medium text-white">{user.username}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          <div className="py-1">
            <button
              onClick={handleProfile}
              className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={handleSellerDashboard}
              className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Seller Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
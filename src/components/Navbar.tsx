import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

import { cn } from '../lib/utils';
import { Discord } from '../icons/footer.icons';
import { useModal } from '../contexts/ModalContext';
import { useAuth } from '../contexts/AuthContext';
import { UserDropdown } from './UserDropdown';

export function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = React.useState(false);
  const { openLoginModal, openRegisterModal } = useModal();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'Market', path: '/market' },
    { name: 'Support ', path: '/support' },
    { name: 'Affiliate', path: '/affiliate' },
    { name: 'Claims', path: '/claims' },
  ];

  const secondaryLinks = [
    { name: 'About', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQs', path: '/faqs' },
  ];

  const handleLogin = () => {
    openLoginModal();
    setIsOpen(false); // Close mobile menu if open
  };

  const handleRegister = () => {
    openRegisterModal();
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <nav className="bg-dark-900/95 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-white/5">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link key={"logo"} to={"/"}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform rotate-3">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">
                Bloxy<span className="text-primary">Trades</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - only show primary nav when authenticated */}
          <div className="hidden lg:flex items-center space-x-12">
            {isAuthenticated &&
              navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-300 hover:text-primary hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button> */}
            <button
              onClick={() => navigate('https://discord.gg/bloxytrades')}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-primary/25 flex items-center gap-2"
            >
              <Discord />
              Join Discord
              <ArrowRight />
            </button>
            <div className="h-6 w-px bg-white/10"></div>
            {isAuthenticated && user ? (
              <UserDropdown />
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="bg-dark-700 hover:bg-dark-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-black/20 flex items-center gap-2"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-primary/25 flex items-center gap-2"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn("lg:hidden bg-dark-800 border-b border-white/5", isOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {[...(isAuthenticated ? navLinks : []), ...secondaryLinks].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated && user ? (
            <div className="mt-4">
              <UserDropdown />
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full mt-4 bg-primary text-white px-4 py-3 rounded-lg font-bold text-center"
            >
              Login / Register
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

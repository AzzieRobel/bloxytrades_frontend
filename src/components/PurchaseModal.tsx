import React, { useState } from 'react';
import { X, Check, Search, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function PurchaseModal({ isOpen, onClose, item }: PurchaseModalProps) {
  const [currentStep, setCurrentStep] = useState(2);
  const [username, setUsername] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [accountRequirements, setAccountRequirements] = useState({
    hasPremium: false,
    ownsSmallProducts: false,
    publicTradesInventory: false,
  });

  if (!isOpen || !item) return null;

  const handleSearch = async () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }
    setIsSearching(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSearching(false);
    toast.success('Account found! Checking requirements...');
    // Mock requirements check
    setAccountRequirements({
      hasPremium: false,
      ownsSmallProducts: false,
      publicTradesInventory: false,
    });
  };

  const steps = [
    { number: 1, label: 'Select Item' },
    { number: 2, label: 'Verify Account' },
    { number: 3, label: 'Payment' },
    { number: 4, label: 'Complete' },
  ];

  const requirements = [
    {
      key: 'hasPremium',
      label: 'Account Has Premium',
      checked: accountRequirements.hasPremium,
    },
    {
      key: 'ownsSmallProducts',
      label: 'Owns Small (Under 1.5k) products',
      checked: accountRequirements.ownsSmallProducts,
    },
    {
      key: 'publicTradesInventory',
      label: 'Public Trades & Inventory',
      checked: accountRequirements.publicTradesInventory,
    },
  ];

  // Extract numeric price for total calculation
  const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
  const total = priceValue.toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#1a1a1a] border border-white/10 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress Indicator */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${currentStep >= step.number
                        ? 'bg-primary text-white'
                        : 'bg-white/10 text-gray-400'
                      }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 ${currentStep >= step.number ? 'text-white' : 'text-gray-500'
                      }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded ${currentStep > step.number ? 'bg-primary' : 'bg-white/10'
                      }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Item Details */}
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-[#0f0f0f] rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-400">
                    RAP: <span className="text-white">{item.rap}</span>
                  </p>
                  <p className="text-gray-400 flex items-center gap-1">
                    Seller: <span className="text-white">dylan23</span>
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  </p>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="flex flex-col items-end justify-start">
              <p className="text-gray-400 text-sm mb-1">Total</p>
              <p className="text-primary text-3xl font-bold">${total}</p>
            </div>
          </div>

          {/* Username Input */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-3">
              What is your in-game Username?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Search your account..."
                className="flex-1 px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-6 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>

          {/* Account Requirements */}
          <div className="mb-6">
            <h4 className="text-white font-medium mb-3">Account Requirements</h4>
            <p className="text-gray-400 text-sm mb-4">
              Please ensure your account follows our requirements to receive your limited item.
            </p>
            <div className="space-y-3">
              {requirements.map((req) => (
                <div
                  key={req.key}
                  className="flex items-center gap-3 p-3 bg-[#0f0f0f] rounded-lg border border-white/5"
                >
                  {req.checked ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-dashed border-gray-500 rounded-full flex-shrink-0" />
                  )}
                  <span className={req.checked ? 'text-white' : 'text-gray-400'}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 bg-[#0f0f0f] rounded-lg border border-white/5">
            <p className="text-gray-400 text-xs leading-relaxed">
              BloxyTrades's services are not the same, similar or equivalent to Roblox Corporation's products and services and we are not sponsored by, affiliated with, approved by and/or authorized by ROBLOX Corporation whatsoever. This limited item purchase is facilitated via a player to player trade to you, and is not directly from the platform or officially from the site/corporation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



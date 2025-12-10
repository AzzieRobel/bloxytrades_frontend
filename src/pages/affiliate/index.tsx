import React, { useState } from 'react';
import { Copy, Check, Share2, DollarSign, Users, TrendingUp, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AffiliatePage() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'BLXY2025'; // This would come from user data in a real app

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success('Referral code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { icon: Users, label: 'Total Referrals', value: '0', color: 'text-blue-400' },
    { icon: DollarSign, label: 'Total Earnings', value: '$0.00', color: 'text-green-400' },
    { icon: TrendingUp, label: 'Active Referrals', value: '0', color: 'text-primary' },
    { icon: Gift, label: 'Pending Rewards', value: '$0.00', color: 'text-yellow-400' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Affiliate <span className="text-primary">Program</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Earn rewards by referring friends to BloxyTrades. Share your unique referral code and get paid for every successful referral!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Referral Code Section */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Your Referral Code</h2>
          <p className="text-gray-400 mb-6">
            Share this code with your friends. When they sign up and make their first purchase, you'll earn a commission!
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-[#0f0f0f] border border-white/10 rounded-lg px-6 py-4 flex items-center justify-between">
              <code className="text-2xl font-mono font-bold text-primary">{referralCode}</code>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Share Your Code',
                description: 'Share your unique referral code with friends, family, or on social media.',
              },
              {
                step: '2',
                title: 'They Sign Up',
                description: 'Your referrals use your code when creating their account on BloxyTrades.',
              },
              {
                step: '3',
                title: 'You Earn Rewards',
                description: 'Earn a percentage of every purchase your referrals make on the platform.',
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -top-4 left-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commission Structure */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Commission Structure</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-white/5">
              <div>
                <p className="text-white font-medium">First Purchase</p>
                <p className="text-gray-400 text-sm">When your referral makes their first purchase</p>
              </div>
              <span className="text-primary font-bold text-xl">10%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-white/5">
              <div>
                <p className="text-white font-medium">Recurring Purchases</p>
                <p className="text-gray-400 text-sm">For all subsequent purchases by your referrals</p>
              </div>
              <span className="text-primary font-bold text-xl">5%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-white/5">
              <div>
                <p className="text-white font-medium">Minimum Payout</p>
                <p className="text-gray-400 text-sm">Minimum amount required to withdraw earnings</p>
              </div>
              <span className="text-primary font-bold text-xl">$10.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


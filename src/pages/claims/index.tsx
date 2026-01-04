import React, { useState } from 'react';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Search } from 'lucide-react';

export default function ClaimsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock claims data
  const [claims] = useState<Claim[]>([
    {
      id: '1',
      title: 'Item Not Received',
      description: 'I purchased a limited item but did not receive it in my inventory.',
      status: 'pending',
      date: '2025-01-15',
      orderId: 'ORD-12345',
    },
    {
      id: '2',
      title: 'Wrong Item Delivered',
      description: 'Received a different item than what was ordered.',
      status: 'approved',
      date: '2025-01-10',
      orderId: 'ORD-12340',
    },
    {
      id: '3',
      title: 'Payment Issue',
      description: 'Payment was processed but order was not completed.',
      status: 'resolved',
      date: '2025-01-05',
      orderId: 'ORD-12335',
    },
  ]);

  const getStatusIcon = (status: ClaimStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStatusColor = (status: ClaimStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20';
      case 'approved':
        return 'bg-green-400/10 text-green-400 border-green-400/20';
      case 'rejected':
        return 'bg-red-400/10 text-red-400 border-red-400/20';
      case 'resolved':
        return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
    }
  };

  const filteredClaims = claims.filter(
    (claim) =>
      claim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.orderId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Claims <span className="text-primary">Center</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Manage and track your claims for orders, refunds, and disputes.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search claims by title, description, or order ID..."
              className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* New Claim Button */}
        <div className="mb-8">
          <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Submit New Claim
          </button>
        </div>

        {/* Claims List */}
        <div className="space-y-4">
          {filteredClaims.length === 0 ? (
            <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-12 text-center">
              <AlertCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No claims found</p>
              <p className="text-gray-500 text-sm mt-2">
                {searchQuery ? 'Try adjusting your search query' : 'Submit your first claim to get started'}
              </p>
            </div>
          ) : (
            filteredClaims.map((claim) => (
              <div
                key={claim.id}
                className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{claim.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(
                          claim.status
                        )}`}
                      >
                        {getStatusIcon(claim.status)}
                        {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">{claim.description}</p>
                    {claim.orderId && (
                      <p className="text-sm text-gray-500">
                        Order ID: <span className="text-primary">{claim.orderId}</span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm text-gray-500">
                    Submitted on {new Date(claim.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


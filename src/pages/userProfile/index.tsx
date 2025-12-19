import { useParams } from 'react-router-dom';
import { CheckCircle2, Circle } from 'lucide-react';

export default function UserProfilePage() {
  const { username } = useParams<{ username: string }>();

  // Mock user data - will be replaced with API call
  const userData = {
    username: username || 'dylan23',
    avatar: null, // Will be fetched from API
    isVerified: true,
    memberSince: '2024-01-15',
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#5650EF]/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-[#5650EF]/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-12 py-8">
        {/* User Profile Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-black/40 border-2 border-[#5650EF] flex items-center justify-center overflow-hidden">
              {userData.avatar ? (
                <img 
                  src={userData.avatar} 
                  alt={userData.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#5650EF]/20 to-black flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {userData.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Username and Badges */}
            <div className="flex items-center gap-2">
              <h1 className="text-white text-3xl font-bold">{userData.username}</h1>
              {userData.isVerified && (
                <CheckCircle2 className="w-5 h-5 text-[#5650EF]" fill="#5650EF" />
              )}
              <Circle className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Content Area - This is where items/listings would go */}
        <div className="space-y-6">
          {/* Section Heading */}
          <div>
            <h2 className="text-white text-2xl font-bold">LIMITEDS</h2>
          </div>

          {/* Items Grid Placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {/* Items will be rendered here */}
          </div>
        </div>
      </div>
    </div>
  );
}


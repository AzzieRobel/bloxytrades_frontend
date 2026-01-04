import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { NameChangeSection } from './nameChangeSection';
import { EmailChangeSection } from './emailChangeSection';
import { PasswordChangeSection } from './passwordChangeSection';
import { PreferenceSection } from './preferenceSection';
import { Footer } from './footer';

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate('/');
    return null;
  }

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
            <NameChangeSection />

            {/* Email */}
            <EmailChangeSection />

            {/* Password */}
            <PasswordChangeSection />

          </div>

          {/* Preferences Section */}
          <PreferenceSection />

          {/* Footer */}
          <Footer />

        </div>
      </div>
    </div>
  );
}


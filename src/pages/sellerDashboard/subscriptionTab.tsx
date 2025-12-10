import { Check } from 'lucide-react';

export const SubscriptionTab = () => {
    return (
        <div>
            <h2 className="text-white text-left text-md font-bold mb-2">Subscriptions</h2>

            {/* Premium Membership Section */}
            <div className="mb-12 text-left">
                <div className='p-6 border border-white/10 rounded-sm mb-3 bg-gradient-to-tl from-[#5650EF]/40 to-white/0'>
                    <h3 className="text-white text-2xl mb-1">ADURITE PREMIUM MEMBERSHIP</h3>
                    <p className="text-gray-400 text-sm">
                        Upgrade your Adurite account to receive a variety of perks and<br />
                        bonuses to enhance your selling experience
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    {/* Standard Plan */}
                    <div className="bg-gradient-to-tr to-[#5650EF]/30 from-white/20 backdrop-blur-sm border border-white/10 rounded-xl p-10">
                        <div className="mb-6">
                            <h4 className="text-white text-xl font-bold">Standard</h4>
                            <p className="text-gray-300 text-sm">Basic Membership</p>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-baseline gap-2">
                                <span className="text-white text-6xl font-bold">$0</span>
                                <span className="text-gray-400 text-xl">/ Month</span>
                            </div>
                        </div>

                        <div className="min-h-[7rem] space-y-4 mb-12">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-gray-300 text-sm">Limiteds 10% Fee</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-gray-300 text-sm">In Game Items 7% Fee</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-gray-300 text-sm">24/7 Access to Support</span>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-md py-4 px-6 text-center">
                            <span className="text-gray-400 text-sm font-medium">You currently have this plan</span>
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-gradient-to-br from-[#5650EF]/20 to-[#5650EF]/5 backdrop-blur-sm border border-[#5650EF]/30 rounded-xl p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#5650EF]/10 rounded-full blur-[100px]" />

                        <div className="relative z-10">
                            <div className="mb-6">
                                <h4 className="text-white text-xl font-bold">Premium</h4>
                                <p className="text-gray-300 text-sm">Perfect for high-volume sellers</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-white text-6xl font-bold">$10.20</span>
                                    <span className="text-gray-300 text-xl">/ Month</span>
                                </div>
                            </div>

                            <div className="min-h-[7rem] space-y-4 mb-12">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#5650EF] flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-200 text-sm">Limiteds 7% Fee, 5% Fee for PayPal and Stripe</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#5650EF] flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-200 text-sm">In Game Items 7% Fee</span>
                                </div>
                            </div>

                            <button className="w-full bg-white hover:bg-gray-100 text-[#5650EF] font-bold text-base py-4 rounded-md transition-all shadow-lg">
                                Purchase Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
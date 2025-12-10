import { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

import { GeneralQuestion, Payment, Return } from '../../icons/home.icons'
import { config } from "../../config";

const faqs = config.dashboardConfig.faqs;
const categoryLabels: Record<Category, string> = config.dashboardConfig.categoryLabels;

export const FAQSection = () => {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<Category>('general');

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const categories: { id: Category; icon: any; label: string }[] = [
        {
            id: 'general', icon: GeneralQuestion, label: 'General Questions'
        },
        {
            id: 'payment', icon: Payment, label: 'Payment & Privacy'
        },
        {
            id: 'returns', icon: Return, label: 'Return & Orders'
        }
    ];

    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 id="faqs" className="text-4xl lg:text-5xl font-bold mb-4">
                        Frequently Asked <span className="text-primary">Questions</span>
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar - Category Buttons */}
                    <div className="lg:w-44 flex-shrink-0 pt-14">
                        <div className="space-y-4">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`w-full rounded-xl p-6 flex flex-col items-center gap-3 transition-all duration-200 cursor-pointer ${activeCategory === category.id
                                        ? 'border border-primary bg-primary/30'
                                        : 'bg-dark-800/50 border border-white/10 hover:border-primary/50'
                                        }`}
                                >
                                    <div className={`flex-shrink-0 w-[48px] h-[48px] flex items-center justify-center rounded-xl
                                        ${activeCategory === category.id
                                            ? 'bg-primary'
                                            : 'bg-primary/50 text-white/10'
                                        }`}>
                                        <category.icon />
                                    </div>
                                    <span className="font-semibold text-sm text-center">
                                        {category.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Content Area - FAQs */}
                    <div className="flex-1">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-white text-left">
                                {categoryLabels[activeCategory]} FAQs
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div
                                    key={i}
                                    className="border border-white/10 rounded-xl bg-dark-800/30 overflow-hidden hover:border-primary/30 transition-colors"
                                >
                                    <button
                                        onClick={() => toggleFAQ(i)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                    >
                                        <span className="font-semibold text-white pr-8">{faq.question}</span>
                                        {openFAQ === i ? (
                                            <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        )}
                                    </button>
                                    {openFAQ === i && (
                                        <div className="px-6 pb-5 pt-2 text-gray-400 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-12">
                            <p className="text-gray-500 mb-2">
                                More Questions? <a href="/contact" className="text-primary cursor-pointer hover:underline">Contact Us</a>
                            </p>
                            <p className="text-gray-400 text-sm mt-4">
                                <strong>We are not affiliated with Roblox Corporation or any of its trademarks.</strong>
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                                Our services are not the same as, similar or equivalent to Roblox Corporation's products and services, and we are not sponsored, affiliated, approved, or authorized by Roblox Corporation in any way.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
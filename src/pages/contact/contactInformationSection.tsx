import { Mail, MessageSquare, Clock } from 'lucide-react';

const contactInfo = [
    {
        icon: Mail,
        label: 'Email',
        value: 'support@bloxytrades.com',
        link: 'mailto:support@bloxytrades.com',
    },
    {
        icon: MessageSquare,
        label: 'Discord',
        value: 'Join our Discord server',
        link: 'https://discord.gg/bloxytrades',
    },
    {
        icon: Clock,
        label: 'Response Time',
        value: 'Within 24 hours',
        link: null,
    },
];

export const ContactInformationSection = () => {
    return (
        <div className="space-y-6">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
                <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-[#0f0f0f] rounded-lg border border-white/5 hover:border-primary/20 transition-all"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <info.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-400 text-sm mb-1">{info.label}</p>
                                {info.link ? (
                                    <a
                                        href={info.link}
                                        target={info.link.startsWith('http') ? '_blank' : undefined}
                                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="text-white hover:text-primary transition-colors"
                                    >
                                        {info.value}
                                    </a>
                                ) : (
                                    <p className="text-white">{info.value}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-white mb-3">Need Quick Help?</h3>
                <p className="text-gray-400 mb-4">
                    Check out our FAQ section for answers to common questions.
                </p>
                <a
                    href="/faqs"
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2"
                >
                    Visit FAQ Section →
                </a>
            </div>
        </div>
    )
}
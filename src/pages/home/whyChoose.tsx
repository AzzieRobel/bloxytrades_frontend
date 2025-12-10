import { Cart, Zap, MessageSquare } from '../../icons/home.icons'

export const WhyChooseSection = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-transparent to-dark-800/30">
            <div className="px-2">
                <div className="text-center pb-16">
                    <div className='flex items-end gap-6'>
                        <div className="w-[646px] h-[2px] rounded-tr-[30px] rounded-br-[42px] bg-gradient-to-r from-[#313131]/0 to-[#FFFFFF]" />
                        <h2 className="text-4xl lg:text-5xl font-bold">
                            Why Choose <span className="text-primary">BloxyTrades</span>
                        </h2>
                        <div className="w-[646px] h-[2px] rounded-tr-[30px] rounded-br-[42px] bg-gradient-to-l from-[#313131]/0 to-[#FFFFFF]" />
                    </div>
                    <p className="text-gray-400 max-w-3xl mx-auto pt-10 leading-[108%]">
                        Enjoy fast, secure, and easy trading for all your favorite Roblox items. Whether you're buying or selling, our platform ensures a seamless experience with unbeatable prices and top-notch service. Our dedicated team is always here to help!
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto flex items-start">
                    {[
                        {
                            icon: Cart,
                            color: "bg-[#0E25144A] border-green-500/30",
                            iconBg: "bg-[#00B67A]",
                            iconColor: "white",
                            title: "Thousands of Trades Completed",
                            desc: ["Don't just take our word for it - our reputation speaks for itself!",
                                "Thousands of trades have been successfully completed by satisfied sellers and buyers from all over the world.",
                                "Join a community of trusted users who exchange their favorite items with confidence."
                            ]
                        },
                        {
                            icon: Zap,
                            color: "bg-[#250E0E] border-red-500/30",
                            iconBg: "bg-[#EF4545]",
                            iconColor: "white",
                            title: "Instant Trading",
                            desc: ["We pride ourselves on fast transactions. With our automated system, you can buy or sell your items instantly, anytime.",
                                "96% of transactions are completed within minutes.",
                                "Quick, secure, and reliable."
                            ]
                        },
                        {
                            icon: MessageSquare,
                            color: "bg-[#141425] border-blue-500/30",
                            iconBg: "bg-[#2C93EC]",
                            iconColor: "white",
                            title: "24/7 Support Direct",
                            desc: ["Need help or have a question? Our friendly team is available 24/7 to assist you with anything, anytime, anywhere.",
                                "We are real people, here to ensure your trading experience is smooth and hassle-free.",
                                "Get support quickly and easily - whether you're buying, selling, or just browsing."]
                        }
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className={`p-8 rounded-[24px] bg-gradient-to-br ${feature.color} border`}
                        >
                            <div className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center mb-6`}>
                                <feature.icon />
                            </div>
                            <h3 className="text-left font-bold mb-4">{feature.title}</h3>
                            {feature.desc.map((desc, i) => (
                                i + 1 === feature.desc.length ? (
                                    <p key={i} className="text-left text-white/90 text-gray-400 leading-relaxed pb-2">{desc}</p>
                                ) : (
                                    <p key={i} className="text-left text-gray-400 leading-relaxed pb-4">{desc}</p>
                                )
                            ))}
                        </div>
                    ))
                    }
                </div >
            </div >
        </section >
    )
}
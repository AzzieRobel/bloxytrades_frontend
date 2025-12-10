
export const HowWorksSection = () => {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        How <span className="text-primary">BloxyTrades</span> Works
                    </h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-base">
                        Enjoy sightseeing - fast delivery, unbeatable prices, and a safe, secure shopping experience for all your favorite Roblox items. Our dedicated support team is always here to help.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {[
                        {
                            step: "1",
                            title: ["Browse", "and", "Purchase"],
                            items: [
                                "Browse through our marketplace and select the Roblox items you wish to buy or sell.",
                                "Initiate the trade when you find the item you want."
                            ]
                        },
                        {
                            step: "2",
                            title: ["Secure", "Payment", "Process"],
                            items: [
                                "Once the trade is initiated, a ticket opens on Discord where you and the seller can communicate.",
                                "Initiate the trade The payment is held securely in escrow by us, ensuring protection for both parties during the transaction.when you find the item you want."
                            ]
                        },
                        {
                            step: "3",
                            title: ["Trade", "and", "Confirmation"],
                            items: [
                                "Once you connect on Roblox, the seller will give the item to the buyer.",
                                "After the item is confirmed, we release the payment to the seller and deduct a small transaction fee."
                            ]
                        },
                        {
                            step: "4",
                            title: ["Transaction", "Fees"],
                            items: [
                                "We offer two account types with different fee structures:",
                                "Non Premium Accounts",
                                "10% Commission per transaction.",
                                "Secure transactions, 24/7 support, and fast payments.",
                                "Premium Accounts",
                                "5% Commission per transaction.",
                                "Enjoy lower fees, priority support, and additional perks for serious traders."
                            ]
                        }
                    ].map((step, i) => (
                        <div key={i} className="relative p-10 rounded-2xl bg-[#04080C] border border-gray-800/50 transition-all">
                            <div className="absolute -top-4 left-60 w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-xl font-bold shadow-lg shadow-primary/30">
                                {step.step}
                            </div>
                            <div className="mt-6">
                                <h3 className="text-2xl font-bold mb-6">
                                    {step.title.map((word, idx) => (
                                        <span key={idx}>
                                            {idx === 1 ? (
                                                <span className="text-white"> {word} </span>
                                            ) : (
                                                <span className="text-primary">{word} </span>
                                            )}
                                        </span>
                                    ))}
                                </h3>
                                <ul className="space-y-3 text-left">
                                    {step.items.map((item, idx) => (
                                        <li key={idx} className="text-gray-300 text-base leading-relaxed flex gap-3">
                                            <span className="text-white mt-1 flex-shrink-0">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
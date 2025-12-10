import { Link } from "react-router-dom"

import { ItemList, Goal, Lock, Truck, CirclePlay } from "../../icons/home.icons"

export const HeroSection = () => {
    return (
        <section className="relative pt-32 pb-[80px] overflow-hidden">
            {/* Background gradient effects - Red to Blue diagonal gradient */}
            <div className="absolute inset-0 -z-10">
                {/* Add your background image here, using style or Tailwind */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/assets/bg.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-purple-950/30 to-blue-950/40" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#0B0919]" />
            </div>

            <div className="px-4 sm:px-6 lg:px-0">
                <h1 className="font-bold mb-8 text-[3.5rem] leading-[108%]">
                    Your <span className="text-primary">Items</span>, Ready to <span className="text-primary">Buy</span> or <span className="text-primary">Sell</span>
                    <br />
                    in Just a <span className="text-primary">Few Clicks</span>.
                </h1>
                <p className="text-xl text-gray-300 mb-[73px] leading-[108%]">
                    Sell your Murder Mystery 2 and Tower Defense items with ease!
                    <br />
                    Get the best prices and reach a wide audience on our platform.
                </p>
                <div className="relative mb-[94px]">
                    <Link
                        to="/marketplace"
                        className="inline-flex items-center gap-3 px-8 py-3 bg-primary text-white rounded-2xl font-bold text-base"
                    >
                        <CirclePlay />
                        Start Trading Now!
                    </Link>
                    {/* Decorative arrow */}
                    {/* <img src="/assets/decorativeArrow.svg" alt="" className="absolute top-[-33px] right-[710px] select-none" /> */}
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-16 px-[130px]">
                    {[
                        {
                            icon: ItemList,
                            title: "List or Buy Items",
                            desc: "Easily list your items and let buyers come to you."
                        },
                        {
                            icon: Goal,
                            title: "Instant Offers & Listings",
                            desc: "Receive alerts as soon as someone is interested in your items."
                        },
                        {
                            icon: Lock,
                            title: "Secure Payments & Transactions",
                            desc: "Secure transactions with fraud prevention."
                        },
                        {
                            icon: Truck,
                            title: "Fast Delivery",
                            desc: "Automated and immediate delivery of sold items."
                        }
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="px-[40px] py-[24px] rounded-2xl bg-gray-900/80 border border-gray-700/50 w-[360px] h-[160px] backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-4 mb-3 text-left">
                                <div className="min-w-12 min-h-12 rounded-[12px] bg-primary/20 flex items-center justify-center">
                                    <feature.icon />
                                </div>
                                <h3 className="text-lg font-bold text-white text-left">{feature.title}</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed text-left">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
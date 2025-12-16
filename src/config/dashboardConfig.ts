export const dashboardConfig = {
    faqs: {
        general: [
            {
                question: "What is BloxyTrade and how does it work?",
                answer: "BloxyTrade is a player-to-player marketplace for Roblox items and game assets. You create an account, browse listings, pay securely, and we coordinate the trade delivery between you and the seller."
            },
            {
                question: "Is BloxyTrade affiliated with Roblox?",
                answer: "No. BloxyTrade is an independent marketplace and is not sponsored, endorsed, or affiliated with Roblox Corporation or any of its trademarks."
            },
            {
                question: "Do I need an account to buy or sell?",
                answer: "Yes. You need an account so we can track your orders, manage disputes, and keep the marketplace secure for both buyers and sellers."
            },
            {
                question: "How long does it take to receive my item?",
                answer: "Most trades are completed within a few minutes after payment. In rare cases it may take longer if manual verification is required."
            },
            {
                question: "Which games and items do you support?",
                answer: "We primarily support Roblox Limiteds and in‑game items for popular experiences (e.g. Blox Fruits, Adopt Me, MM2), and we are constantly adding more."
            }
        ],
        payment: [
            {
                question: "What payment methods do you accept?",
                answer: "We support major cards via Stripe, PayPal, and select cryptocurrencies where available. Exact options can vary by region."
            },
            {
                question: "Is my payment information secure?",
                answer: "Yes. Payments are processed through PCI‑compliant providers like Stripe and PayPal. BloxyTrade never stores your full card details on our own servers."
            },
            {
                question: "Why do you ask for additional verification or information?",
                answer: "Extra information (such as email or basic profile data) helps us detect fraud, protect your account, and keep the marketplace safe for both buyers and sellers."
            },
            {
                question: "When do I get charged for my order?",
                answer: "You are charged immediately when you confirm the purchase. Funds are then held in escrow until the trade is successfully completed."
            },
            {
                question: "Are there any fees for buying or selling?",
                answer: "Buyers see the full price up front. Sellers pay a small fee on each completed order, which helps cover payment processing, support, and platform costs."
            }
        ],
        returns: [
            {
                question: "What happens if I don’t receive my item?",
                answer: "If the trade is not delivered or something goes wrong, you can open a dispute from your orders page. Our team reviews the case and may issue a refund or cancel the trade."
            },
            {
                question: "Can I get a refund after a successful trade?",
                answer: "Digital item trades are generally final once completed. However, if there is clear evidence of fraud or a problem with the transaction, you can open a dispute for manual review."
            },
            {
                question: "How do I open a dispute or chargeback?",
                answer: "Go to the Claims/Chargeback Center in your dashboard, select the relevant order, and submit a ticket explaining the issue. Our support team will investigate and respond as quickly as possible."
            },
            {
                question: "What if the buyer or seller tries to scam me?",
                answer: "All trades should stay on BloxyTrade. If you suspect a scam, do not complete the trade and open a dispute immediately. We use escrow, logging, and manual review to protect honest users."
            },
            {
                question: "How long does it take to resolve a dispute?",
                answer: "Most disputes are reviewed within 24–72 hours depending on complexity and the evidence provided by both parties."
            }
        ]
    } as Record<Category, { question: string; answer: string }[]>,
    categoryLabels: {
        general: 'General Questions',
        payment: 'Payment & Privacy',
        returns: 'Return & Orders'
    }
}
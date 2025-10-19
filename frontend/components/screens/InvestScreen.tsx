"use client";

import React from 'react';
import {
    PieChart,
    ShoppingCart,
    Rocket,
    Hourglass,
    Gamepad2,
    MessageCircle,
    HelpCircle,
} from "lucide-react";

// --- DUMMY DATA for the graph ---
const marketGraphData = [40, 55, 45, 60, 50, 70, 65, 75, 60, 80, 70, 85];

export default function InvestScreen() {
    return (
        <div
            className="h-full w-full overflow-y-auto"
            style={{ backgroundImage: "url('/panda_bg.jpg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="p-6 space-y-6">
                <h1 className="text-4xl font-bold text-black text-center">Learn, Invest, Grow</h1>

                {/* Market Graph */}
                <div className="backdrop-blur-md bg-white/45 rounded-3xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gray-200/80 p-2 rounded-full">
                            <HelpCircle className="w-6 h-6 text-gray-700" />
                        </div>
                        <h3 className="text-lg font-bold text-black">Market Overview</h3>
                    </div>
                    <div className="h-32 flex items-end justify-around gap-1">
                        {marketGraphData.map((height, index) => (
                            <div
                                key={index}
                                className="flex-1 bg-gradient-to-t from-purple-400 to-pink-400 rounded-t-lg transition-all duration-300"
                                style={{ height: `${height}%` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Stock Market 101 Section */}
                <div className="backdrop-blur-md bg-white/45 rounded-3xl p-6 shadow-lg space-y-4">
                    <h3 className="text-lg font-bold text-black">Stock Market 101 🚀</h3>

                    {/* What's a Stock */}
                    <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                        <PieChart className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-black">What's a Stock?</h4>
                            <p className="text-sm text-gray-800">
                                Think of a cool company like a giant pizza. Buying one stock is like owning one tiny slice. If the pizza place gets more popular, your slice becomes more valuable!
                            </p>
                        </div>
                    </div>

                    {/* When Should I Buy */}
                    <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                        <ShoppingCart className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-black">When Should I Buy?</h4>
                            <p className="text-sm text-gray-800">
                                Look for a sale! When a good company's stock price dips, it can be a great time to buy. It's like getting your favorite sneakers at a discount.
                            </p>
                        </div>
                    </div>

                    {/* When Should I Sell */}
                    <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                        <Rocket className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-black">When Should I Sell?</h4>
                            <p className="text-sm text-gray-800">
                                When your slice is worth a lot more than you paid! Selling is how you lock in your profits. But don't get too greedy—it's smart to have a goal in mind.
                            </p>
                        </div>
                    </div>

                    {/* Think Long-Term */}
                    <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                        <Hourglass className="w-8 h-8 text-pink-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-black">The Golden Rule: Think Long-Term</h4>
                            <p className="text-sm text-gray-800">
                                Timing the market is super hard. The real secret? Find great companies you believe in and hold on. Time is your best friend in investing!
                            </p>
                        </div>
                    </div>

                    {/* Try the Investment Arcade */}
                    <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                        <Gamepad2 className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-black">Try the Investment Arcade</h4>
                            <p className="text-sm text-gray-800">
                                Test your skills in a fun, risk-free way! Practice trading and see how different choices affect your results.
                            </p>
                        </div>
                    </div>

                    {/* Ask Panda Pal for Help */}
                    <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                        <MessageCircle className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-black">Ask Panda Pal for Help</h4>
                            <p className="text-sm text-gray-800">
                                Confused about a concept? Panda Pal is always ready to chat and explain investing ideas in simple, friendly ways.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import React from 'react';
import {
    PieChart,
    ShoppingCart,
    Rocket,
    Hourglass,
    HelpCircle, // 1. Imported the question mark icon
} from "lucide-react";

// The props from the old file are no longer needed for this new static design,
// but you can add them back if you integrate a chat feature on this screen later.

// --- DUMMY DATA for the graph ---
const marketGraphData = [40, 55, 45, 60, 50, 70, 65, 75, 60, 80, 70, 85];

export default function InvestScreen() {
    return (
        <div
            className="min-h-screen bg-cover bg-center p-6 space-y-6 animate-in fade-in duration-300 flex flex-col"
            // Ensure you have a 'panda_bg.jpg.png' file in your public folder
            style={{ backgroundImage: "url('/panda_bg.jpg.png')" }}
        >
            <h1 className="text-4xl font-bold text-black">Learn, Invest, Grow</h1>

            {/* Market Graph */}
            <div className="backdrop-blur-md bg-white/45 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                    {/* 2. Replaced the img tag with the HelpCircle icon */}
                    <div className="bg-gray-200/80 rounded-full p-2">
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

            {/* --- NEW: Stock Market 101 Section --- */}
            <div className="backdrop-blur-md bg-white/45 rounded-3xl p-6 shadow-lg space-y-4">
                <h3 className="text-lg font-bold text-black">Stock Market 101 🚀</h3>
                
                {/* What is a Stock? */}
                <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                    <PieChart className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-black">What's a Stock?</h4>
                        <p className="text-sm text-gray-800">
                            Think of a cool company like a giant pizza. Buying one stock is like owning one tiny slice. If the pizza place gets more popular, your slice becomes more valuable!
                        </p>
                    </div>
                </div>

                {/* When to Buy? */}
                <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                    <ShoppingCart className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-black">When Should I Buy?</h4>
                        <p className="text-sm text-gray-800">
                            Look for a sale! When a good company's stock price drops (goes "on dip"), it can be a great time to buy. It's like getting your favorite sneakers at a discount.
                        </p>
                    </div>
                </div>

                {/* When to Sell? */}
                <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                    <Rocket className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-black">When Should I Sell?</h4>
                        <p className="text-sm text-gray-800">
                            When your slice is worth a lot more than you paid! Selling is how you lock in your profits. But don't get too greedy—it's smart to have a goal in mind.
                        </p>
                    </div>
                </div>

                 {/* The Golden Rule */}
                 <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                    <Hourglass className="w-8 h-8 text-pink-600 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-black">The Golden Rule: Think Long-Term</h4>
                        <p className="text-sm text-gray-800">
                            Timing the market is super hard. The real secret? Find great companies you believe in and hold on. Time is your best friend in investing! 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


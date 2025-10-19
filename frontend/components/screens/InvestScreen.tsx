"use client";

import React, { useState } from 'react';
import { Send, ArrowUpRight } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface InvestScreenProps {
    messages: Message[];
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: (message: string) => void;
}

// --- DUMMY DATA ---
const investmentResources = [
    "Beginner's Guide to Investing", 
    "Understanding Stock Markets", 
    "Portfolio Diversification Tips"
];

const marketGraphData = [40, 55, 45, 60, 50, 70, 65, 75, 60, 80, 70, 85];

export default function InvestScreen({ 
    messages, 
    inputValue, 
    setInputValue, 
    handleSendMessage 
}: InvestScreenProps) {
    const localHandleSendMessage = () => {
        if (inputValue.trim()) {
            handleSendMessage(inputValue);
            setInputValue("");
        }
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center p-6 space-y-6 animate-in fade-in duration-300 flex flex-col"
            style={{ backgroundImage: "url('/panda_bg.jpg.png')" }}
        >
            <h1 className="text-4xl font-bold text-black">Learn, Invest, Grow</h1>

            {/* Market Graph */}
            <div className="backdrop-blur-md bg-white/45 rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-black mb-4">Market Overview</h3>
                <div className="h-32 flex items-end justify-around gap-1">
                    {marketGraphData.map((height, index) => (
                        <div
                            key={index}
                            className="flex-1 bg-gradient-to-t from-purple-400 to-pink-400 rounded-t transition-all duration-300"
                            style={{ height: `${height}%` }}
                        />
                    ))}
                </div>
            </div>

            {/* Investment Resources */}
            <div className="backdrop-blur-md bg-white/45 rounded-3xl p-4 shadow-lg">
                <h3 className="text-lg font-bold text-black mb-3">Helpful Resources</h3>
                <div className="space-y-2">
                    {investmentResources.map((resource, index) => (
                        <div
                            key={index}
                            className="p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-all cursor-pointer flex items-center justify-between"
                        >
                            <span className="text-black font-medium">{resource}</span>
                            <ArrowUpRight className="w-4 h-4 text-purple-600" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

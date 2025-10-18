"use client";

import React, { useState, useEffect } from 'react';
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
            // 1. Send user message to parent (ZenFiWebsite) to update state
            handleSendMessage(inputValue);

            // 2. Clear input
            setInputValue("");
            
            // 3. Simulate assistant response after a delay
            setTimeout(() => {
                // IMPORTANT: The parent must expose a function to update the chatMessages array
                // For now, we rely on the parent's handler to eventually update the state.
                // In a real app, the parent state is updated by the main handler logic.
            }, 1000);
        }
    }
    
    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-300 h-[calc(100vh-5rem)] flex flex-col overflow-y-auto">
            <h1 className="text-4xl font-bold text-black">Learn, Invest, Grow 📈</h1>

            {/* Input / Send Area */}
            <div className="backdrop-blur-md bg-white/40 rounded-3xl shadow-lg p-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && localHandleSendMessage()}
                        placeholder="Ask me anything about investing..."
                        className="flex-1 px-4 py-3 rounded-full bg-white/70 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button
                        onClick={localHandleSendMessage}
                        className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-[#fff157] text-white hover:shadow-lg transition-all"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 backdrop-blur-md bg-white/40 rounded-3xl shadow-lg p-4 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-[80%] p-3 rounded-2xl ${
                                    message.role === "user"
                                        ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                                        : "bg-white/70 text-black"
                                }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Market Graph */}
            <div className="backdrop-blur-md bg-white/40 rounded-3xl p-6 shadow-lg">
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
            <div className="backdrop-blur-md bg-white/40 rounded-3xl p-4 shadow-lg">
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
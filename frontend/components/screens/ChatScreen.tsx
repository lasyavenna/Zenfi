"use client";

import React from 'react';
import { Send } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface ChatScreenProps {
    messages: Message[];
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: (message: string) => void;
}

export default function ChatScreen({ 
    messages, 
    inputValue, 
    setInputValue, 
    handleSendMessage 
}: ChatScreenProps) {
    
    const localHandleSendMessage = () => {
        if (inputValue.trim()) {
            // Pass the message up to the parent handler
            handleSendMessage(inputValue);
            
            setInputValue("");
        }
    }

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-300 h-[calc(100vh-5rem)] flex flex-col">
            <h1 className="text-4xl font-bold text-black">Ask Panda Pal 🐼</h1>

            <div className="flex-1 backdrop-blur-md bg-white/40 rounded-3xl shadow-lg p-4 flex flex-col overflow-hidden">
                {/* Chat History Container */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-[80%] p-3 rounded-2xl ${
                                    message.role === "user"
                                        ? "bg-gradient-to-r from-purple-400 to-[#fff157] text-white"
                                        : "bg-white/70 text-black"
                                }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input and Send Button */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && localHandleSendMessage()}
                        placeholder="Ask me about budgeting or financial advice..."
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
        </div>
    );
}
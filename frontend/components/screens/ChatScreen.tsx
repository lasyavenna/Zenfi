"use client";

import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send } from 'lucide-react';

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface ChatScreenProps {
    messages: Message[];
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: (message: string) => void;
    isLoading: boolean;
}

export default function ChatScreen({
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    isLoading
}: ChatScreenProps) {
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const localHandleSendMessage = () => {
        if (inputValue.trim()) {
            handleSendMessage(inputValue);
            setInputValue("");
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 pt-0 flex-shrink-0 text-center">
                <div>
                    <h1 className="text-2xl font-bold text-black">Ask Panda Pal</h1>
                    <p className="text-sm text-gray-600">Your personal finance guru</p>
                </div>
            </div>

            {/* Main Chat Container */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg flex-1 flex flex-col overflow-hidden">
                {/* Chat Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto p-4 pr-2">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-end gap-3 ${
                                message.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            {message.role === 'assistant' && (
                                <img
                                    src="/trans_panda.jpg"
                                    alt="Panda Icon"
                                    className="rounded-full w-12 h-12 object-cover"
                                />
                            )}
                            <div
                                className={`max-w-xs md:max-w-md p-4 rounded-2xl ${
                                    message.role === 'user'
                                        ? 'bg-purple-500 text-white rounded-br-none'
                                        : 'bg-white/80 text-black rounded-bl-none'
                                }`}
                            >
                                <div className="prose prose-sm">
                                    <ReactMarkdown>
                                        {message.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isLoading && (
                        <div className="flex items-end gap-3 justify-start">
                            <img
                                src="/trans_panda.jpg"
                                alt="Panda Icon"
                                className="rounded-full w-12 h-12 object-cover"
                            />
                            <div className="p-4 bg-white/80 backdrop-blur-md rounded-2xl rounded-bl-none">
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-0"></span>
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Bar */}
                <div className="p-4 pt-2 flex items-center gap-2 flex-shrink-0">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && localHandleSendMessage()}
                        placeholder="Ask about budgeting..."
                        className="flex-1 p-4 bg-white/80 backdrop-blur-md rounded-full border-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button
                        onClick={localHandleSendMessage}
                        className="p-4 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all"
                    >
                        <Send className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}

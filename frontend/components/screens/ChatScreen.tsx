"use client";

import React from "react";
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
  handleSendMessage,
}: ChatScreenProps) {
  const localHandleSendMessage = () => {
    if (inputValue.trim()) {
      handleSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-6 font-sans text-black">
      <h1 className="text-4xl font-bold text-center text-black drop-shadow-md">
        Ask Panda Pal 🐼
      </h1>

      <div className="flex-1 bg-white/45 rounded-3xl shadow-2xl p-6 flex flex-col overflow-hidden border border-white/40">
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-purple-500 to-[#fff157] text-white"
                    : "bg-white text-black border border-white/50"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && localHandleSendMessage()}
            placeholder="Ask me about budgeting or financial advice..."
            className="flex-1 px-4 py-3 rounded-full bg-white/90 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
          />
          <button
            onClick={localHandleSendMessage}
            className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-[#fff157] text-white hover:shadow-lg transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

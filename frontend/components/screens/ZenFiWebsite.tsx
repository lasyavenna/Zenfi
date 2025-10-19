"use client";

import { useState } from "react";
import {
    Home,
    Wallet,
    TrendingUp,
    MessageCircle,
    Beaker,
    User, // <-- Use this icon for Avatar
    PersonStanding,
    BoxIcon,
    Settings,
} from "lucide-react"

// --- FIX: Corrected import paths ---
import HomeGoalsScreen from './HomeGoalsScreen';
import WalletScreen from './WalletScreen';
import InvestScreen from './InvestScreen';
import ChatScreen from "./ChatScreen";
import SettingsPage from "./SettingsPage";
import InvestSandbox from "./InvestSandbox";
import Avatar from "./Avatar";
import InvestmentArcade from "./InvestSandbox";
import SettingsScreen from "./SettingsPage";


interface Message {
    role: "user" | "assistant";
    content: string;
}

const fetchAIResponse = async (messages: Message[], context: 'chat' | 'invest') => {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages, context }),
        });

        if (!response.ok) {
            throw new Error('AI service returned an error.');
        }

        const data = await response.json();
        return data.content || "Sorry, I couldn't process that request.";
    } catch (error) {
        console.error("AI Fetch Error:", error);
        return "I'm currently unable to connect to the AI service. Please try again later.";
    }
}

export default function ZenFiWebsite() {
    const [activeScreen, setActiveScreen] = useState("home");
    const [isChatLoading, setIsChatLoading] = useState(false);

    const [chatMessages, setChatMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I'm your personal finance assistant. How can I help you today?" },
    ]);
    const [inputValue, setInputValue] = useState("");

    const [investMessages, setInvestMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hello! I'm here to help you learn, invest, and grow. Ask me anything about stocks and investments!",
        },
    ]);
    const [investInputValue, setInvestInputValue] = useState("");

    const handleSendMessage = async (message: string) => {
        if (message.trim()) {
            const newUserMessage: Message = { role: "user", content: message };
            const updatedHistory = [...chatMessages, newUserMessage];
            setChatMessages(updatedHistory);
            setIsChatLoading(true);

            const assistantResponseText = await fetchAIResponse(updatedHistory, 'chat');
            
            setIsChatLoading(false);
            setChatMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: assistantResponseText,
                },
            ]);
        }
    }

    const handleSendInvestMessage = async (message: string) => {
        if (message.trim()) {
            const newUserMessage: Message = { role: "user", content: message };
            const updatedHistory = [...investMessages, newUserMessage];
            setInvestMessages(updatedHistory);
            
            const assistantResponseText = await fetchAIResponse(updatedHistory, 'invest');
            
            setInvestMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: assistantResponseText,
                },
            ]);
        }
    }

    const renderScreen = () => {
        // We no longer need the wrapper divs here, as padding is handled by the main layout
        switch (activeScreen) {
            case "home":
                return <HomeGoalsScreen />;
            case "wallet":
                return <WalletScreen />;
            case "invest":
                return <InvestScreen />;
            case "chat":
                return (
                    <ChatScreen
                        messages={chatMessages}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        handleSendMessage={handleSendMessage}
                        isLoading={isChatLoading}
                    />
                );
            case "sandbox":
                return <InvestmentArcade />;
            case "avatar":
                return <Avatar />;
            default:
                return <HomeGoalsScreen />;
        }
    };

    return (
        <div
            className="h-screen font-sans flex flex-col bg-cover bg-center"
            style={{ backgroundImage: "url('/panda_bg.jpg.png')" }}
        >
            {/* --- FIX: Added pb-20 (padding-bottom) to the main scrollable container --- */}
            {/* This ensures content doesn't get hidden behind the nav bar */}
            <div className="flex-1 overflow-y-auto p-5 pb-24">
                {renderScreen()}
            </div>
            <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/60 border-t border-white/40 shadow-lg">
                <div className="flex justify-around items-center p-4 max-w-md mx-auto">
                {[
                    { id: "home", icon: Home, label: "Goals" },
                    { id: "wallet", icon: Wallet, label: "Wallet" },
                    { id: "invest", icon: TrendingUp, label: "Invest" },
                    { id: "chat", icon: MessageCircle, label: "Chat" },
                    { id: "sandbox", icon: BoxIcon, label: "Sandbox" },
                    { id: "avatar", icon: PersonStanding, label: "Avatar" },
                    
                ].map((item) => (
                    <button
                    key={item.id}
                    onClick={() => setActiveScreen(item.id)}
                    className={`flex flex-col items-center gap-1 transition-all ${
                        activeScreen === item.id ? "text-purple-600 scale-110" : "text-black/60 hover:text-black"
                    }`}
                    >
                    <item.icon className="w-6 h-6" />
                    <span className="text-xs font-medium">{item.label}</span>
                    </button>
                ))}
                </div>
            </div>

            {/* Settings Overlay */}
            <SettingsPage />
        </div>
    );
}


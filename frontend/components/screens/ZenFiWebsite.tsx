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
} from "lucide-react"

import HomeGoalsScreen from './HomeGoalsScreen';
import WalletScreen from './WalletScreen';
import InvestScreen from './InvestScreen';
import ChatScreen from "./ChatScreen";
import SettingsPage from "./SettingsPage";
import InvestSandbox from "./InvestSandbox";
import Avatar from "./Avatar";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ZenFiWebsite() {
    const [activeScreen, setActiveScreen] = useState("home");

    // Example state for total savings (you could derive this from goals)
    const [totalSavings, setTotalSavings] = useState(12500);

    // Chat and Invest states (unchanged)
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

    // Screen rendering logic
    const renderScreen = () => {
        switch (activeScreen) {
            case "home":
                return <HomeGoalsScreen />;
            case "wallet":
                return <WalletScreen />;
            case "invest":
                return (
                    <InvestScreen
                        messages={investMessages}
                        inputValue={investInputValue}
                        setInputValue={setInvestInputValue}
                        handleSendMessage={async (msg) => {
                            const newUserMessage: Message = { role: "user", content: msg };
                            setInvestMessages(prev => [...prev, newUserMessage]);
                        }}
                    />
                );
            case "chat":
                return (
                    <ChatScreen
                        messages={chatMessages}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        handleSendMessage={async (msg) => {
                            const newUserMessage: Message = { role: "user", content: msg };
                            setChatMessages(prev => [...prev, newUserMessage]);
                        }}
                    />
                );
            case "sandbox":
                return <InvestSandbox />;
            case "avatar":
                return <Avatar totalSavings={totalSavings} onClose={() => setActiveScreen("home")} />;
            default:
                return <HomeGoalsScreen />;
        }
    };

    return (
        <div
            className="min-h-screen pb-20 font-sans bg-cover bg-center"
            style={{ backgroundImage: "url('/panda_bg.jpg')" }}
        >
            {/* Active screen */}
            {renderScreen()}

            {/* Bottom Navigation */}
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

"use client"

import { useState } from "react"
import {
    Home,
    Wallet,
    TrendingUp,
    MessageCircle,
} from "lucide-react"

import HomeGoalsScreen from './HomeGoalsScreen';
import WalletScreen from './WalletScreen';
import InvestScreen from './InvestScreen';
import ChatScreen from "./ChatScreen";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ZenFiWebsite() {
    const [activeScreen, setActiveScreen] = useState("home");

    // state for chat screen
    const [chatMessages, setChatMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I'm your personal finance assistant. How can I help you today?" },
    ])
    const [inputValue, setInputValue] = useState("")

    // state for invest screen
    const [investMessages, setInvestMessages] = useState<Message[]>([
        {
        role: "assistant",
        content: "Hello! I'm here to help you learn, invest, and grow. Ask me anything about stocks and investments!",
        },
    ])
    const [investInputValue, setInvestInputValue] = useState("")

    const handleSendMessage = (message: string) => {
        if (message.trim()) {
            setChatMessages(prev => [...prev, { role: "user", content: message }]);
            
            setTimeout(() => {
                setChatMessages(prev => [
                    ...prev,
                    {
                        role: "assistant",
                        content:
                            "Great Question! The market is showing positive trends. Consider diversifying your portfolio with a mix of growth and value stocks.",
                    },
                ]);
            }, 1000);
        }
    }

    const handleSendInvestMessage = (message: string) => {
        if (message.trim()) {
            setInvestMessages(prev => [...prev, { role: "user", content: message }]);

            setTimeout(() => {
                setInvestMessages(prev => [
                    ...prev,
                    {
                        role: "assistant",
                        content:
                            "Great question! The market is showing positive trends. Consider diversifying your portfolio with a mix of growth and value stocks.",
                    },
                ]);
            }, 1000);
        }
    }

    // screen rendering logic
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
                        handleSendMessage={handleSendInvestMessage}
                    />
                );
            
            case "chat":
                return (
                    <ChatScreen
                        messages={chatMessages}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        handleSendMessage={handleSendMessage}
                    />
                );
                
            default:
                return <HomeGoalsScreen />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#c2a1ff] via-pink-100 to-[#ffee8c] pb-20 font-sans">
            {/* Renders the current active screen */}
            {renderScreen()}

            {/* Bottom Navigation (Fixed and shared across all screens) */}
            <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/60 border-t border-white/40 showdow-lg">
                <div className="flex justify-around items-center p-4 max-w-md mx-auto">
                {[
                    { id: "home", icon: Home, label: "Goals" },
                    { id: "wallet", icon: Wallet, label: "Wallet" },
                    { id: "invest", icon: TrendingUp, label: "Invest" },
                    { id: "chat", icon: MessageCircle, label: "Chat" },
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
        </div>
    )

}
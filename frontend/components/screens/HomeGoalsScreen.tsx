'use client';

import React, { useState } from 'react';
import { Plus } from "lucide-react";
import CreateGoalModal from './CreateGoalModal'; // Import the new modal component

interface Goal {
    name: string;
    current: number;
    target: number;
    icon: string;
}

// Initial static data
const initialGoalsData: Goal[] = [
    { name: "Vacation Fund", current: 3200, target: 5000, icon: "✈️"},
    { name: "Emergency Savings", current: 8500, target: 10000, icon: "🛡️"},
    { name: "New Car", current: 12000, target: 25000, icon: "🚗"},
    { name: "Home Renovation", current: 4500, target: 15000, icon: "🏠"},
];

// utility components
const CircularProgress: React.FC<{ percentage: number; size?: number }> = ({ percentage, size = 120 }) => {
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="10"
                    fill="none"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#fff157" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

// Main screen component
export default function HomeGoalsScreen() {
    const [goals, setGoals] = useState<Goal[]>(initialGoalsData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateGoal = (newGoal: Goal) => {
        setGoals(prevGoals => [...prevGoals, newGoal]);
        setIsModalOpen(false); // Close modal after creating
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center p-6 space-y-6 animate-in fade-in duration-300"
            style={{ backgroundImage: "url('/panda_bg.jpg')" }}
        >
            {/* Header */}
            <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-28 h-28">
                    <img
                        src="/trans_panda.jpg"
                        alt="Panda"
                        className="w-full h-full object-contain"
                    />
                </div>
                <h1 className="text-6xl font-extrabold text-black">ZenFi</h1>
            </div>

            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-black">Welcome back! 👋</h2>
                <p className="text-lg text-black/70">Let's check your financial goals</p>
            </div>

            <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-12 w-full backdrop-blur-md bg-white/25 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 text-black font-semibold"
            >
                <Plus className="w-5 h-5" />
                Create a New Goal
            </button>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map((goal, index) => {
                    const percentage = Math.round((goal.current / goal.target) * 100)
                    return (
                        <div
                            key={index}
                            className="backdrop-blur-md bg-white/45 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="text-3xl mb-2">{goal.icon}</div>
                                    <h3 className="text-xl font-bold text-black">{goal.name}</h3>
                                    <p className="text-sm text-black/60 mt-1">
                                        ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                                    </p>
                                </div>
                                <CircularProgress percentage={percentage} size={100} />
                            </div>
                            <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-400 to-[#fff157] rounded-full transition-all duration-1000"
                                    // --- FIX: Corrected JSX style syntax ---
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal for creating a new goal */}
            <CreateGoalModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateGoal}
            />
        </div>
    );
}

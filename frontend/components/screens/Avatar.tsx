'use client';

import React from 'react';

interface AvatarPageProps {
    totalSavings: number; // Can be used to unlock avatars/items
    onClose: () => void;
}

// Example avatars (unlocked based on savings)
const avatars = [
    { name: "Basic Panda", minSavings: 0, image: "/avatars/panda_basic.png" },
    { name: "Cool Panda", minSavings: 5000, image: "/avatars/panda_cool.png" },
    { name: "Golden Panda", minSavings: 15000, image: "/avatars/panda_golden.png" },
];

export default function AvatarPage({ totalSavings, onClose }: AvatarPageProps) {
    // Determine which avatars are unlocked
    const unlockedAvatars = avatars.filter(a => totalSavings >= a.minSavings);

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-6">
            <div className="w-full max-w-3xl bg-white/80 rounded-3xl shadow-2xl p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-black">Your Avatars 🐼</h1>
                    <button
                        onClick={onClose}
                        className="text-black font-bold text-xl px-3 py-1 rounded-lg bg-white/50 hover:bg-white/70 transition-all"
                    >
                        Close
                    </button>
                </div>

                {/* Avatar Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {avatars.map((avatar, index) => {
                        const unlocked = totalSavings >= avatar.minSavings;
                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border ${
                                    unlocked ? "border-green-500" : "border-gray-300 opacity-50"
                                }`}
                            >
                                <img
                                    src={avatar.image}
                                    alt={avatar.name}
                                    className="w-24 h-24 object-contain"
                                />
                                <p className="text-center font-semibold text-black">{avatar.name}</p>
                                {!unlocked && <p className="text-sm text-black/50">Unlocks at ${avatar.minSavings}</p>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

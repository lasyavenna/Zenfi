"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface AvatarProps {
  totalSavings: number; // total money user has
  onClose?: () => void;
}

interface AvatarItem {
  id: number;
  name: string;
  image: string;
  requiredSavings: number; // money required to unlock
}

const avatars: AvatarItem[] = [
  { id: 1, name: "Basic Panda", image: "/avatars/trans_panda.jpg", requiredSavings: 0 },
  { id: 2, name: "Panda Explorer", image: "/avatars/panda2.png", requiredSavings: 1000 },
  { id: 3, name: "Panda Adventurer", image: "/avatars/panda3.png", requiredSavings: 5000 },
  { id: 4, name: "Panda Master", image: "/avatars/panda4.png", requiredSavings: 10000 },
];

export default function Avatar({ totalSavings, onClose }: AvatarProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  // Filter avatars that are unlocked based on totalSavings
  const unlockedAvatars = avatars.filter((a) => totalSavings >= a.requiredSavings);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 space-y-6 bg-cover bg-center" style={{ backgroundImage: "url('/panda_bg.jpg')" }}>
      {/* Header */}
      <div className="flex items-center w-full gap-4 mb-6">
        <button
          onClick={onClose}
          className="p-2 bg-white/50 rounded-full hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-3xl font-bold text-black">Avatar Collection 🐼</h1>
      </div>

      {/* Display total savings */}
      <div className="w-full backdrop-blur-md bg-white/50 rounded-xl p-4 shadow-lg flex justify-between items-center">
        <span className="text-xl font-semibold text-black">Total Savings:</span>
        <span className="text-xl font-bold text-green-600">${totalSavings.toLocaleString()}</span>
      </div>

      {/* Avatar Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {avatars.map((avatar) => {
          const isUnlocked = totalSavings >= avatar.requiredSavings;
          const isSelected = selectedAvatar === avatar.id;
          return (
            <div
              key={avatar.id}
              className={`cursor-pointer p-2 rounded-xl border-4 transition-all ${
                isUnlocked ? (isSelected ? "border-purple-600" : "border-white/30") : "border-black/20 opacity-40"
              }`}
              onClick={() => isUnlocked && setSelectedAvatar(avatar.id)}
            >
              <img src={avatar.image} alt={avatar.name} className="w-full h-auto rounded-lg" />
              <p className={`text-center mt-2 font-medium text-sm ${isUnlocked ? "text-black" : "text-black/50"}`}>
                {avatar.name}
              </p>
              {!isUnlocked && (
                <p className="text-center text-xs text-red-500">
                  Unlocks at ${avatar.requiredSavings.toLocaleString()}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

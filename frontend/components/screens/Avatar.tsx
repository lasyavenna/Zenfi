"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface AvatarProps {
  totalSavings: number;
  onClose?: () => void;
}

interface AvatarItem {
  id: number;
  name: string;
  image: string;
  requiredSavings: number;
}

const avatars: AvatarItem[] = [
  { id: 1, name: "Basic Panda", image: "/trans_panda.jpg", requiredSavings: 0 },
  { id: 2, name: "Cool Panda", image: "/cool_panda.jpg", requiredSavings: 1000 },
  { id: 3, name: "Golden Panda", image: "/golden_panda.jpg", requiredSavings: 5000 },
];

export default function Avatar({ totalSavings, onClose }: AvatarProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1); // start with Basic Panda
  const activeAvatar = avatars.find((a) => a.id === selectedAvatar);

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 space-y-6 bg-cover bg-center text-black"
      style={{ backgroundImage: "url('/panda_bg.jpg')" }}
    >
      {/* Header */}
      <div className="flex items-center w-full gap-4 mb-4">
        <button
          onClick={onClose}
          className="p-2 bg-white/50 rounded-full hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-3xl font-bold text-black">Avatar Collection 🐼</h1>
      </div>

      {/* Active Avatar Display */}
      <div className="flex flex-col items-center space-y-2">
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/60 via-pink-400/60 to-yellow-300/60 blur-2xl rounded-full" />
          <img
            src={activeAvatar?.image}
            alt={activeAvatar?.name}
            className="w-36 h-36 rounded-full object-contain border-4 border-white shadow-xl"
          />
        </div>
        <h2 className="text-2xl font-semibold">{activeAvatar?.name}</h2>
        <p className="text-sm text-gray-700">
          {totalSavings >= (activeAvatar?.requiredSavings ?? 0)
            ? "Active Panda 🐼"
            : `Unlocks at $${activeAvatar?.requiredSavings.toLocaleString()}`}
        </p>
      </div>

      {/* Display total savings */}
      <div className="w-full backdrop-blur-md bg-white/50 rounded-xl p-4 shadow-lg flex justify-between items-center mt-4">
        <span className="text-xl font-semibold">Total Savings:</span>
        <span className="text-xl font-bold text-green-600">
          ${totalSavings.toLocaleString()}
        </span>
      </div>

      {/* Avatar Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl mt-4">
        {avatars.map((avatar) => {
          const isUnlocked = totalSavings >= avatar.requiredSavings;
          const isSelected = selectedAvatar === avatar.id;

          return (
            <div
              key={avatar.id}
              className={`cursor-pointer p-2 rounded-xl border-4 transition-all backdrop-blur-md ${
                isUnlocked
                  ? isSelected
                    ? "border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                    : "border-white/40 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                  : "border-black/20 opacity-40 grayscale"
              }`}
              onClick={() => isUnlocked && setSelectedAvatar(avatar.id)}
            >
              <img
                src={avatar.image}
                alt={avatar.name}
                className="w-full h-auto rounded-lg object-contain"
              />
              <p
                className={`text-center mt-2 font-medium text-sm ${
                  isUnlocked ? "text-black" : "text-black/50"
                }`}
              >
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

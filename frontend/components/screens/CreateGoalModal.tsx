'use client';

import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';

interface GoalInput {
    name: string;
    current: number;
    target: number;
    icon: string;
}

interface CreateGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (goal: GoalInput) => void;
}

const iconOptions = ["🏠", "🚗", "✈️", "🛡️", "🎓", "💍"];

export default function CreateGoalModal({ isOpen, onClose, onCreate }: CreateGoalModalProps) {
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');
    const [current, setCurrent] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(iconOptions[0]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!name || !target || !current || parseFloat(target) <= 0 || parseFloat(current) < 0) {
            alert("Please fill in all fields with valid numbers for amounts.");
            return;
        }

        const newGoal: GoalInput = {
            name: name.trim(),
            target: parseFloat(target),
            current: parseFloat(current),
            icon: selectedIcon,
        };

        onCreate(newGoal);

        // Reset form fields
        setName('');
        setTarget('');
        setCurrent('');
        setSelectedIcon(iconOptions[0]);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl transform transition-all scale-100 animate-in fade-in">
                
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">New Financial Goal</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Goal Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., European Vacation"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                        />
                    </div>
                    
                    {/* Target Amount */}
                    <div>
                        <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">Target Amount ($)</label>
                        <input
                            id="target"
                            type="number"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            placeholder="e.g., 5000"
                            min="1"
                            step="any"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                        />
                    </div>

                    {/* Current Amount */}
                    <div>
                        <label htmlFor="current" className="block text-sm font-medium text-gray-700 mb-1">Current Savings ($)</label>
                        <input
                            id="current"
                            type="number"
                            value={current}
                            onChange={(e) => setCurrent(e.target.value)}
                            placeholder="e.g., 500"
                            min="0"
                            step="any"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                        />
                    </div>

                    {/* Icon Selection */}
                    <div>
                        <span className="block text-sm font-medium text-gray-700 mb-2">Select Icon</span>
                        <div className="flex gap-3">
                            {iconOptions.map(icon => (
                                <button
                                    key={icon}
                                    type="button"
                                    onClick={() => setSelectedIcon(icon)}
                                    className={`p-3 text-2xl rounded-full transition-all ${
                                        selectedIcon === icon ? 'bg-purple-100 ring-2 ring-purple-500 scale-110' : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-6 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Save Goal
                    </button>
                </form>
            </div>
        </div>
    );
}
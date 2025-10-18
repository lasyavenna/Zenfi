import React from 'react';
import { CreditCard, DollarSign, ShoppingBag, Coffee, Car, Utensils, ArrowDownRight, Plus } from "lucide-react";

const paymentMethods = [
    { type: "Visa", last4: "4242", expiry: "12/25", color: "from-purple-400 to-pink-400" },
    { type: "PayPal", email: "user@email.com", color: "from-blue-400 to-cyan-400"},
];

const transactions = [
    { name: "Grocery Store", amount: -85.32, date: "Today", icon: ShoppingBag, color: "text-green-600" },
    { name: "Coffee Shop", amount: -12.5, date: "Today", icon: Coffee, color: "text-amber-600" },
    { name: "Salary Deposit", amount: 3500.0, date: "Yesterday", icon: ArrowDownRight, color: "text-emerald-600" },
    { name: "Gas Station", amount: -45.0, date: "Yesterday", icon: Car, color: "text-blue-600" },
    { name: "Restaurant", amount: -67.8, date: "2 days ago", icon: Utensils, color: "text-orange-600" },
];

export default function WalletScreen() {
    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-300">
            <h1 className="text-4xl font-bold text-black">Wallet 💳</h1>

            {/* Payment Methods Section */}
            <div className="space-y-3">
                <h2 className="text-xl font-bold text-black">Payment Methods</h2>
                {paymentMethods.map((method, index) => (
                    <div
                        key={index}
                        className={`backdrop-blur-md bg-gradient-to-br ${method.color} rounded-2xl p-6 shadow-lg text-white`}
                    >
                        {method.type === "Visa" ? (
                            <>
                                <div className="flex justify-between items-start mb-8">
                                    <CreditCard className="w-10 h-10" />
                                    <span className="text-sm font-semibold">VISA</span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-2xl tracking-wider">•••• •••• •••• {method.last4}</p>
                                    <div className="flex justify-between text-sm">
                                        <span>Expires {method.expiry}</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between items-start mb-4">
                                    <DollarSign className="w-10 h-10" />
                                    <span className="text-sm font-semibold">PayPal</span>
                                </div>
                                <p className="text-lg">{method.email}</p>
                            </>
                        )}
                    </div>
                ))}
                <button className="w-full backdrop-blur-md bg-white/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 text-black font-semibold">
                    <Plus className="w-6 h-6" />
                    Add New Card
                </button>
            </div>

            {/* Spending Analytics Section */}
            <div className="space-y-3">
                <h2 className="text-xl font-bold text-black">Spending Analytics</h2>
                <div className="backdrop-blur-md bg-white/40 rounded-3xl p-6 shadow-lg">
                    <div className="h-48 flex items-end justify-around gap-2">
                        {[65, 45, 80, 55, 70, 60, 85].map((height, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-gradient-to-t from-purple-400 to-[#fff157] rounded-t-lg transition-all duration-500 hover:opacity-80"
                                    style={{ height: `${height}%` }}
                                />
                                <span className="text-xs text-black/60">
                                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Transactions Section */}
            <div className="space-y-3">
                <h2 className="text-xl font-bold text-black">Recent Transactions</h2>
                <div className="backdrop-blur-md bg-white/40 rounded-3xl p-4 shadow-lg space-y-2">
                    {transactions.map((transaction, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 hover:bg-white/50 rounded-xl transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full bg-white/70 ${transaction.color}`}>
                                    <transaction.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-black">{transaction.name}</p>
                                    <p className="text-sm text-black/60">{transaction.date}</p>
                                </div>
                            </div>
                            <span className={`font-bold ${transaction.amount > 0 ? "text-green-600" : "text-black"}`}>
                                {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
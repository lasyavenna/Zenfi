"use client";
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  ShoppingBag, Coffee, DollarSign, Fuel, CreditCard, Plus,
} from 'lucide-react';

interface Card {
  number: string;
  expiry: string;
  type: 'Visa' | 'Mastercard' | 'Other';
}

interface Transaction {
  icon: any;
  name: string;
  time: string;
  amount: number;
  color: string;
  bg: string;
}

const spendingData = [
  { day: 'Mon', amount: 65 },
  { day: 'Tue', amount: 85.32 },
  { day: 'Wed', amount: 12.50 },
  { day: 'Thu', amount: 45.00 },
  { day: 'Fri', amount: 130.10 },
  { day: 'Sat', amount: 75.00 },
  { day: 'Sun', amount: 20.00 },
];

const initialTransactions: Transaction[] = [
  { icon: ShoppingBag, name: 'Grocery Store', time: 'Today', amount: -85.32, color: 'text-blue-500', bg: 'bg-blue-100' },
  { icon: Coffee, name: 'Coffee Shop', time: 'Today', amount: -12.50, color: 'text-orange-500', bg: 'bg-orange-100' },
  { icon: DollarSign, name: 'Salary Deposit', time: 'Yesterday', amount: 3500.00, color: 'text-green-500', bg: 'bg-green-100' },
  { icon: Fuel, name: 'Gas Station', time: 'Yesterday', amount: -45.00, color: 'text-red-500', bg: 'bg-red-100' },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-900">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default function WalletScreen() {
  const [cards, setCards] = useState<Card[]>([
    { number: '•••• •••• •••• 4242', expiry: '12/25', type: 'Visa' },
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isAddingTx, setIsAddingTx] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [txName, setTxName] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txTime, setTxTime] = useState('Today');
  const [txIcon, setTxIcon] = useState<any>(ShoppingBag);

  const iconOptions = [
    { icon: ShoppingBag, name: 'ShoppingBag', color: 'text-blue-500', bg: 'bg-blue-100' },
    { icon: Coffee, name: 'Coffee', color: 'text-orange-500', bg: 'bg-orange-100' },
    { icon: DollarSign, name: 'DollarSign', color: 'text-green-500', bg: 'bg-green-100' },
    { icon: Fuel, name: 'Fuel', color: 'text-red-500', bg: 'bg-red-100' },
  ];

  const handleAddCard = async () => {
    if (cardNumber.length !== 16 || !/^\d{16}$/.test(cardNumber)) {
      alert('Please enter a valid 16-digit card number.');
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
      alert('Please enter expiry date in MM/YY format.');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert('Success! Card has been verified and added.');

    const newCard: Card = {
      number: `•••• •••• •••• ${cardNumber.slice(-4)}`,
      expiry: cardExpiry,
      type: 'Visa',
    };
    setCards([...cards, newCard]);
    setCardNumber('');
    setCardExpiry('');
    setIsAddingCard(false);
  };

  const handleAddTransaction = () => {
    const amount = parseFloat(txAmount);
    if (!txName || isNaN(amount)) {
      alert('Please fill out all fields correctly.');
      return;
    }
    const selected = iconOptions.find((opt) => opt.icon === txIcon) || iconOptions[0];
    const newTx: Transaction = {
      icon: txIcon,
      name: txName,
      time: txTime,
      amount,
      color: selected.color,
      bg: selected.bg,
    };
    setTransactions([newTx, ...transactions]);
    setTxName('');
    setTxAmount('');
    setTxTime('Today');
    setTxIcon(ShoppingBag);
    setIsAddingTx(false);
  };

  return (
    <div className="p-5 pb-20">
      <h1 className="text-3xl font-bold mb-5 text-gray-800">Wallet 💳</h1>

      {/* PAYMENT METHODS */}
      <div className="bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Methods</h2>
        <div className="space-y-3">
          {cards.map((card, index) => (
            <div key={index} className="bg-gradient-to-r from-purple-400 to-pink-500 text-white p-5 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <CreditCard className="w-7 h-7" />
                <span className="font-semibold text-sm">VISA</span>
              </div>
              <p className="text-xl font-mono tracking-widest mb-1">{card.number}</p>
              <span className="text-xs font-light">Expires {card.expiry}</span>
            </div>
          ))}
          <div className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white p-5 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <DollarSign className="w-7 h-7" />
              <span className="font-semibold text-sm">PayPal</span>
            </div>
            <p className="text-lg font-medium">user@email.com</p>
          </div>
          <button
            onClick={() => setIsAddingCard(true)}
            className="w-full flex items-center justify-center gap-2 bg-gray-100/70 text-gray-700 font-medium py-3 px-5 rounded-xl shadow-sm hover:bg-gray-200 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add New Card
          </button>
        </div>
      </div>

      {/* SPENDING CHART */}
      <div className="bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Spending Analytics</h2>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spendingData}>
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }} />
              <Bar dataKey="amount" radius={[8, 8, 8, 8]} className="fill-purple-400" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div className="bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
          <button
            onClick={() => setIsAddingTx(true)}
            className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800"
          >
            <Plus className="w-5 h-5" />
            Add Transaction
          </button>
        </div>

        <div className="space-y-4">
          {transactions.map((tx, index) => {
            const isDeposit = tx.amount > 0;
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${tx.bg}`}>
                    <tx.icon className={`w-5 h-5 ${tx.color}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tx.name}</p>
                    <p className="text-sm text-gray-500">{tx.time}</p>
                  </div>
                </div>
                <p className={`font-semibold ${isDeposit ? 'text-green-600' : 'text-gray-900'}`}>
                  {isDeposit ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ADD TRANSACTION MODAL (Glass style) */}
      {isAddingTx && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white/60 backdrop-blur-md border border-white/40 shadow-2xl rounded-2xl p-6 w-full max-w-sm transform scale-100 transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Transaction</h2>
            <input
              type="text"
              className="w-full p-3 border border-gray-300/50 bg-white/50 rounded-md mb-3 focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="Transaction Name"
              value={txName}
              onChange={(e) => setTxName(e.target.value)}
            />
            <input
              type="number"
              className="w-full p-3 border border-gray-300/50 bg-white/50 rounded-md mb-3 focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="Amount (use negative for expense)"
              value={txAmount}
              onChange={(e) => setTxAmount(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-3 border border-gray-300/50 bg-white/50 rounded-md mb-3 focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="Time (e.g., Today)"
              value={txTime}
              onChange={(e) => setTxTime(e.target.value)}
            />

            <div className="flex gap-2 mb-5 flex-wrap">
              {iconOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setTxIcon(opt.icon)}
                  className={`p-3 rounded-xl border ${txIcon === opt.icon ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent'} transition-all ${opt.bg}`}
                >
                  <opt.icon className={`w-6 h-6 ${opt.color}`} />
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsAddingTx(false)}
                className="flex-1 bg-gray-200/70 text-gray-700 p-3 rounded-md font-semibold hover:bg-gray-300/80 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTransaction}
                className="flex-1 bg-blue-600/90 text-white p-3 rounded-md font-semibold hover:bg-blue-700/90 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD CARD MODAL (same theme) */}
      {isAddingCard && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white/60 backdrop-blur-md border border-white/40 shadow-2xl rounded-2xl p-6 w-full max-w-sm transform scale-100 transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add a New Card</h2>
            <input
              type="text"
              inputMode="numeric"
              className="w-full p-3 border border-gray-300/50 bg-white/50 rounded-md mb-3 focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="Card Number (16 digits)"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              maxLength={16}
              disabled={isLoading}
            />
            <input
              type="text"
              className="w-full p-3 border border-gray-300/50 bg-white/50 rounded-md mb-4 focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="MM/YY"
              value={cardExpiry}
              onChange={(e) => {
                let v = e.target.value.replace(/\D/g, '');
                if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
                setCardExpiry(v);
              }}
              maxLength={5}
              disabled={isLoading}
            />
            <div className="flex gap-4">
              <button
                onClick={() => setIsAddingCard(false)}
                className="flex-1 bg-gray-200/70 text-gray-700 p-3 rounded-md font-semibold hover:bg-gray-300/80 transition"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCard}
                className={`flex-1 bg-blue-600/90 text-white p-3 rounded-md font-semibold hover:bg-blue-700/90 transition ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Add Card'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

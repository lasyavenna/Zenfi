"use client";
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  ShoppingBag,
  Coffee,
  DollarSign,
  Fuel,
  CreditCard,
  Plus,
} from 'lucide-react';

interface Card {
  number: string;
  expiry: string;
  type: 'Visa' | 'Mastercard' | 'Other';
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

const transactionsData = [
  {
    icon: ShoppingBag, name: 'Grocery Store', time: 'Today', amount: -85.32,
    color: 'text-blue-500', bg: 'bg-blue-100',
  },
  {
    icon: Coffee, name: 'Coffee Shop', time: 'Today', amount: -12.50,
    color: 'text-orange-500', bg: 'bg-orange-100',
  },
  {
    icon: DollarSign, name: 'Salary Deposit', time: 'Yesterday', amount: 3500.00,
    color: 'text-green-500', bg: 'bg-green-100',
  },
  {
    icon: Fuel, name: 'Gas Station', time: 'Yesterday', amount: -45.00,
    color: 'text-red-500', bg: 'bg-red-100',
  },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: any[], label?: string }) => {
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
    { number: '•••• •••• •••• 1234', expiry: '12/26', type: 'Visa' },
  ]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    try {
      const response = await fetch('http://127.0.0.1:5001/api/validate-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardNumber: cardNumber,
          cardExpiry: cardExpiry,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Card validation failed.');
      }

      alert('Success! Card validated via Visa API.');

      const newCard: Card = {
        number: `•••• •••• •••• ${cardNumber.slice(-4)}`,
        expiry: cardExpiry,
        type: 'Visa',
      };
      setCards([...cards, newCard]);

      setCardNumber('');
      setCardExpiry('');
      setIsAddingCard(false);

    } catch (error) {
      console.error("Validation Error:", error);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred during validation.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5 text-gray-800">
        Wallet 💳
      </h1>

      <div className="bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Payment Methods
        </h2>
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white p-5 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <CreditCard className="w-7 h-7" />
              <span className="font-semibold text-sm">VISA</span>
            </div>
            <p className="text-xl font-mono tracking-widest mb-1">
              •••• •••• •••• 4242
            </p>
            <span className="text-xs font-light">Expires 12/25</span>
          </div>
          
          <div className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white p-5 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <DollarSign className="w-7 h-7" />
              <span className="font-semibold text-sm">PayPal</span>
            </div>
            <p className="text-lg font-medium">
              user@email.com
            </p>
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

      <div className="bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Spending Analytics
        </h2>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={spendingData}
              margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis
                hide={true}
                domain={[0, 'dataMax + 20']}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }}
              />
              <Bar
                dataKey="amount"
                fill="#8884d8"
                radius={[8, 8, 8, 8]}
                className="fill-purple-400"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Transactions
        </h2>
        <div className="space-y-4">
          {transactionsData.map((tx, index) => {
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
                <p
                  className={`font-semibold ${
                    isDeposit ? 'text-green-600' : 'text-gray-900'
                  }`}
                >
                  {isDeposit ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      {isAddingCard && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Add a New Card</h2>
            <input
              type="text"
              inputMode="numeric"
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              placeholder="Card Number (16 digits)"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              maxLength={16}
              disabled={isLoading}
            />
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="MM/YY"
              value={cardExpiry}
              onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length > 2) {
                      value = value.slice(0, 2) + '/' + value.slice(2);
                  }
                  setCardExpiry(value);
              }}
              maxLength={5}
              disabled={isLoading}
            />
            <div className="flex gap-4">
              <button
                onClick={() => setIsAddingCard(false)}
                className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-md font-semibold hover:bg-gray-300"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCard}
                className={`flex-1 bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Validating...' : 'Add Card'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

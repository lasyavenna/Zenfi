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
  X,
  Utensils,
  Film,
  Gift,
} from 'lucide-react';

// --- DEFINE THE SHAPE OF A TRANSACTION ---
interface Transaction {
    icon: React.ElementType;
    name: string;
    time: string;
    amount: number;
    color: string;
    bg: string;
}

const initialSpendingData = [
  { day: 'Mon', amount: 65 },
  { day: 'Tue', amount: 85.32 },
  { day: 'Wed', amount: 12.50 },
  { day: 'Thu', amount: 45.00 },
  { day: 'Fri', amount: 130.10 },
  { day: 'Sat', amount: 75.00 },
  { day: 'Sun', amount: 20.00 },
];

const initialTransactionsData: Transaction[] = [
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

interface AddTransactionModalProps {
    onClose: () => void;
    onAdd: (name: string, amount: number, type: 'expense' | 'deposit', icon: React.ElementType) => void;
}

export default function WalletScreen() {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  
  // --- EXPLICITLY TYPE THE STATE ---
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactionsData);
  const [spending, setSpending] = useState(initialSpendingData);

  const handleAddTransaction = (name: string, amount: number, type: 'expense' | 'deposit', icon: React.ElementType) => {
    const newAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);
    
    const newIcon = icon; 
    const newColor = newAmount > 0 ? 'text-green-500' : 'text-purple-500';
    const newBg = newAmount > 0 ? 'bg-green-100' : 'bg-purple-100';

    const newTransaction: Transaction = {
      icon: newIcon,
      name: name,
      time: 'Today',
      amount: newAmount,
      color: newColor,
      bg: newBg,
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    if (type === 'expense') {
        setSpending(prev => {
            const today = new Date().toLocaleString('en-us', {  weekday: 'short' });
            return prev.map(day => 
                day.day === today ? { ...day, amount: day.amount + amount } : day
            );
        });
    }

    setIsAddingTransaction(false);
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
              data={spending}
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

        <button
            onClick={() => setIsAddingTransaction(true)}
            className="w-full flex items-center justify-center gap-2 bg-gray-100/70 text-gray-700 font-medium py-3 px-5 rounded-xl shadow-sm hover:bg-gray-200 transition-all mb-4"
          >
            <Plus className="w-5 h-5" />
            Add Transaction
        </button>

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
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          {/* ... Add Card Modal Code ... */}
        </div>
      )}

      {isAddingTransaction && 
        <AddTransactionModal 
            onClose={() => setIsAddingTransaction(false)} 
            onAdd={handleAddTransaction} 
        />
      }
    </div>
  );
}


// --- SEPARATE COMPONENT FOR THE TRANSACTION MODAL ---
const AddTransactionModal = ({ onClose, onAdd }: AddTransactionModalProps) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'expense' | 'deposit'>('expense');
    
    const iconOptions = [ShoppingBag, Coffee, Fuel, Utensils, Film, Gift, DollarSign];
    const [selectedIcon, setSelectedIcon] = useState<React.ElementType>(ShoppingBag);

    const handleSubmit = () => {
        const numAmount = parseFloat(amount);
        if (name && !isNaN(numAmount) && numAmount > 0) {
            onAdd(name, numAmount, type, selectedIcon);
        } else {
            alert('Please enter a valid name and positive amount.');
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-full max-w-sm relative animate-in fade-in zoom-in-95 duration-300">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                    <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-black mb-6">Add a Transaction</h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 p-1 bg-gray-200 rounded-lg">
                        <button
                            onClick={() => { setType('expense'); setSelectedIcon(ShoppingBag); }}
                            className={`p-2 rounded-md font-semibold transition-all ${type === 'expense' ? 'bg-white shadow' : 'text-gray-600'}`}
                        >
                            Expense
                        </button>
                        <button
                            onClick={() => { setType('deposit'); setSelectedIcon(DollarSign); }}
                            className={`p-2 rounded-md font-semibold transition-all ${type === 'deposit' ? 'bg-white shadow' : 'text-gray-600'}`}
                        >
                            Deposit
                        </button>
                    </div>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Transaction Name (e.g., Boba Tea)"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount ($)"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />

                    <div>
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {(type === 'expense' ? iconOptions.filter(icon => icon !== DollarSign) : [DollarSign]).map((Icon, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedIcon(Icon)}
                                    className={`p-3 rounded-lg transition-all ${
                                        selectedIcon === Icon ? 'bg-purple-200 ring-2 ring-purple-500' : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                >
                                    <Icon className="w-5 h-5 text-gray-700" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-purple-500 text-white p-3 rounded-lg font-semibold hover:bg-purple-600"
                    >
                        Add Transaction
                    </button>
                </div>
            </div>
        </div>
    );
};


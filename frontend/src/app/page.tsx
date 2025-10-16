"use client"
import './globals.css'
import React, { useState } from "react"
import {
  Home,
  Wallet,
  TrendingUp,
  MessageCircle,
  Send,
  CreditCard,
  DollarSign,
  ShoppingBag,
  Coffee,
  Car,
  Utensils,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react"

export default function ZenFiApp() {
  const [activeScreen, setActiveScreen] = useState("home")
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hi! I'm your personal finance assistant. How can I help you today?" },
  ])
  const [investMessages, setInvestMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm here to help you learn, invest, and grow. Ask me anything about stocks and investments!",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [investInputValue, setInvestInputValue] = useState("")

  const goals = [
    { name: "Vacation Fund", current: 3200, target: 5000, icon: "✈️" },
    { name: "Emergency Savings", current: 8500, target: 10000, icon: "🛡️" },
    { name: "New Car", current: 12000, target: 25000, icon: "🚗" },
    { name: "Home Renovation", current: 4500, target: 15000, icon: "🏠" },
  ]

  const paymentMethods = [
    { type: "Visa", last4: "4242", expiry: "12/25", color: "from-purple-400 to-pink-400" },
    { type: "PayPal", email: "user@email.com", color: "from-blue-400 to-cyan-400" },
  ]

  const transactions = [
    { name: "Grocery Store", amount: -85.32, date: "Today", icon: ShoppingBag, color: "text-green-600" },
    { name: "Coffee Shop", amount: -12.5, date: "Today", icon: Coffee, color: "text-amber-600" },
    { name: "Salary Deposit", amount: 3500.0, date: "Yesterday", icon: ArrowDownRight, color: "text-emerald-600" },
    { name: "Gas Station", amount: -45.0, date: "Yesterday", icon: Car, color: "text-blue-600" },
    { name: "Restaurant", amount: -67.8, date: "2 days ago", icon: Utensils, color: "text-orange-600" },
  ]

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setChatMessages([...chatMessages, { role: "user", content: inputValue }])
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I understand your question. Based on your spending patterns, I recommend setting aside 20% of your income for savings.",
          },
        ])
      }, 1000)
      setInputValue("")
    }
  }

  const handleSendInvestMessage = () => {
    if (investInputValue.trim()) {
      setInvestMessages([...investMessages, { role: "user", content: investInputValue }])
      setTimeout(() => {
        setInvestMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Great question! The market is showing positive trends. Consider diversifying your portfolio with a mix of growth and value stocks.",
          },
        ])
      }, 1000)
      setInvestInputValue("")
    }
  }

  const CircularProgress = ({ percentage, size = 120 }: { percentage: number; size?: number }) => {
    const radius = (size - 20) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference

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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-black">{percentage}%</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c2a1ff] via-pink-100 to-[#ffee8c] pb-20 font-sans">
      {/* Home Screen - Goals */}
      {activeScreen === "home" && (
        <div className="p-6 space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-5xl">🐼</div>
            <h1 className="text-5xl font-bold text-black">ZenFi</h1>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-black">Welcome back! 👋</h2>
            <p className="text-lg text-black/70">Let's check your financial goals</p>
          </div>

          <button className="w-full backdrop-blur-md bg-white/40 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 text-black font-semibold">
            <Plus className="w-5 h-5" />
            Create a New Goal
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((goal, index) => {
              const percentage = Math.round((goal.current / goal.target) * 100)
              return (
                <div
                  key={index}
                  className="backdrop-blur-md bg-white/40 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
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
                  <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-[#fff157] rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Wallet Screen */}
      {activeScreen === "wallet" && (
        <div className="p-6 space-y-6 animate-in fade-in duration-300">
          <h1 className="text-4xl font-bold text-black">Wallet 💳</h1>

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
      )}

      {activeScreen === "invesy" && (
        <div className="p-6 space-y-6 animate-in fade-in duration-300 h-[calc(100vh-5rem)] flex flex-col overflow-y-auto">
          <h1 className="text-4xl font-bold text-black">Learn, Invest, Grow 📈</h1>

          <div className="backdrop-blur-md bg-white/40 rounded-3xl shadow-lg p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={investInputValue}
                onChange={(e) => setInvestInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendInvestMessage()}
                placeholder="Ask me anything about investing..."
                className="flex-1 px-4 py-3 rounded-full bg-white/70 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={handleSendInvestMessage}
                className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-[#fff157] text-white hover:shadow-lg transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 backdrop-blur-md bg-white/40 rounded-3xl shadow-lg p-4">
            <div className="max-h-64 overflow-y-auto space-y-3">
              {investMessages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                        : "bg-white/70 text-black"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Graph */}
          <div className="backdrop-blur-md bg-white/40 rounded-3xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-black mb-4">Market Overview</h3>
            <div className="h-32 flex items-end justify-around gap-1">
              {[40, 55, 45, 60, 50, 70, 65, 75, 60, 80, 70, 85].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 bg-gradient-to-t from-purple-400 to-pink-400 rounded-t transition-all duration-300"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          {/* Investment Resources */}
          <div className="backdrop-blur-md bg-white/40 rounded-3xl p-4 shadow-lg">
            <h3 className="text-lg font-bold text-black mb-3">Helpful Resources</h3>
            <div className="space-y-2">
              {["Beginner's Guide to Investing", "Understanding Stock Markets", "Portfolio Diversification Tips"].map(
                (resource, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span className="text-black font-medium">{resource}</span>
                    <ArrowUpRight className="w-4 h-4 text-purple-600" />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {activeScreen === "chat" && (
        <div className="p-6 space-y-6 animate-in fade-in duration-300 h-[calc(100vh-5rem)] flex flex-col">
          <h1 className="text-4xl font-bold text-black">Ask Panda Pal 🐼</h1>

          <div className="flex-1 backdrop-blur-md bg-white/40 rounded-3xl shadow-lg p-4 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-400 to-[#fff157] text-white"
                        : "bg-white/70 text-black"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me about budgeting or financial advice..."
                className="flex-1 px-4 py-3 rounded-full bg-white/70 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={handleSendMessage}
                className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-[#fff157] text-white hover:shadow-lg transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/60 border-t border-white/40 shadow-lg">
        <div className="flex justify-around items-center p-4 max-w-md mx-auto">
          {[
            { id: "home", icon: Home, label: "Goals" },
            { id: "wallet", icon: Wallet, label: "Wallet" },
            { id: "invesy", icon: TrendingUp, label: "Invest" },
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

"use client"

import { useState } from "react"
import {
  Home,
  Wallet,
  MessageCircle,
  CreditCard,
  DollarSign,
  ShoppingBag,
  Coffee,
  Zap,
  Send,
  TrendingUp,
  ExternalLink,
} from "lucide-react"

export default function VscoFinanceApp() {
  const [activeScreen, setActiveScreen] = useState<"home" | "wallet" | "chat" | "invest">("home")
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Hi! I'm your finance assistant. How can I help you today?" },
  ])
  const [chatInput, setChatInput] = useState("")

  const [stockChatMessages, setStockChatMessages] = useState([
    { role: "assistant", text: "Hi! I'm your stock helper. Ask me anything about investing in stocks!" },
  ])
  const [stockChatInput, setStockChatInput] = useState("")

  const goals = [
    { name: "Vacation Fund", current: 1250, target: 2000, color: "from-orange-300 to-pink-400" },
    { name: "Emergency Savings", current: 3500, target: 5000, color: "from-rose-400 to-pink-500" },
    { name: "New Laptop", current: 450, target: 1500, color: "from-pink-300 to-rose-400" },
  ]

  const paymentMethods = [
    { type: "Bank Card", last4: "4242", icon: CreditCard, color: "from-orange-300 to-pink-400" },
    { type: "PayPal", email: "you@email.com", icon: Wallet, color: "from-rose-400 to-pink-500" },
  ]

  const transactions = [
    { name: "Grocery Store", amount: -45.32, icon: ShoppingBag, date: "Today" },
    { name: "Coffee Shop", amount: -5.8, icon: Coffee, date: "Today" },
    { name: "Salary Deposit", amount: 2500.0, icon: DollarSign, date: "Yesterday" },
    { name: "Utilities", amount: -120.0, icon: Zap, date: "2 days ago" },
  ]

  const investingResources = [
    {
      title: "Getting Started with Stocks",
      description: "Learn the basics of stock market investing and how to begin your journey.",
      url: "https://www.investopedia.com/articles/basics/06/invest1000.asp",
    },
    {
      title: "Understanding Stock Market Basics",
      description: "A comprehensive guide to understanding how the stock market works.",
      url: "https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work",
    },
    {
      title: "Beginner's Guide to ETFs",
      description: "Learn about Exchange-Traded Funds and how they can diversify your portfolio.",
      url: "https://www.investopedia.com/terms/e/etf.asp",
    },
    {
      title: "Risk Management Strategies",
      description: "Essential strategies to manage risk when investing in stocks.",
      url: "https://www.investopedia.com/articles/stocks/08/risk-management.asp",
    },
  ]

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    setChatMessages([
      ...chatMessages,
      { role: "user", text: chatInput },
      { role: "assistant", text: "Thanks for your message! This is a demo response." },
    ])
    setChatInput("")
  }

  const handleSendStockMessage = () => {
    if (!stockChatInput.trim()) return

    setStockChatMessages([
      ...stockChatMessages,
      { role: "user", text: stockChatInput },
      {
        role: "assistant",
        text: "Great question! For personalized stock advice, I recommend consulting with a financial advisor. However, I can help you understand general concepts about investing!",
      },
    ])
    setStockChatInput("")
  }

  const CircularProgress = ({ percentage, color }: { percentage: number; color: string }) => {
    const circumference = 2 * Math.PI * 45
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className="relative w-28 h-28">
        <svg className="transform -rotate-90 w-28 h-28">
          <circle cx="56" cy="56" r="45" stroke="currentColor" strokeWidth="8" fill="none" className="text-white/20" />
          <circle
            cx="56"
            cy="56"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="text-orange-300" stopColor="currentColor" />
              <stop offset="100%" className="text-pink-500" stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{percentage}%</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-pink-400 to-rose-500 font-sans">
      <div className="max-w-md mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="pt-12 pb-6 px-6">
          <h1 className="text-3xl font-bold text-white text-balance">
            {activeScreen === "home" && "Your Goals"}
            {activeScreen === "wallet" && "Your Wallet"}
            {activeScreen === "chat" && "Finance Assistant"}
            {activeScreen === "invest" && "Start Investing"}
          </h1>
          {activeScreen === "home" && (
            <p className="text-white/90 mt-2 text-pretty">Keep track of your savings journey ✨</p>
          )}
          {activeScreen === "invest" && (
            <p className="text-white/90 mt-2 text-pretty">Learn about stocks and grow your wealth 📈</p>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pb-24 px-6">
          {/* Home Screen - Goals */}
          {activeScreen === "home" && (
            <div className="space-y-6">
              {goals.map((goal, index) => {
                const percentage = Math.round((goal.current / goal.target) * 100)
                return (
                  <div
                    key={index}
                    className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{goal.name}</h3>
                        <p className="text-gray-600 text-sm mb-1">
                          ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${goal.color} transition-all duration-1000`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="ml-6">
                        <CircularProgress percentage={percentage} color={goal.color} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Wallet Screen */}
          {activeScreen === "wallet" && (
            <div className="space-y-6">
              {/* Payment Methods */}
              <div>
                <h2 className="text-white font-semibold mb-4 text-lg">Payment Methods</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className={`bg-gradient-to-r ${method.color} rounded-3xl p-6 shadow-lg`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                            <method.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">{method.type}</p>
                            <p className="text-white/80 text-sm">
                              {method.last4 ? `•••• ${method.last4}` : method.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <h2 className="text-white font-semibold mb-4 text-lg">Recent Transactions</h2>
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 shadow-lg">
                  {transactions.map((transaction, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between py-4 ${
                        index !== transactions.length - 1 ? "border-b border-gray-100" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-orange-300 to-pink-400 p-3 rounded-2xl">
                          <transaction.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{transaction.name}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <p className={`font-bold ${transaction.amount > 0 ? "text-green-600" : "text-gray-800"}`}>
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat Screen */}
          {activeScreen === "chat" && (
            <div className="flex flex-col h-full">
              {/* Messages */}
              <div className="flex-1 space-y-4 mb-4">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-3xl px-5 py-3 shadow-md ${
                        message.role === "user"
                          ? "bg-white text-gray-800"
                          : "bg-white/95 backdrop-blur-sm text-gray-800"
                      }`}
                    >
                      <p className="text-pretty">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 shadow-lg flex items-center gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-orange-300 to-pink-500 p-3 rounded-2xl shadow-md hover:scale-105 transition-transform"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          )}

          {activeScreen === "invest" && (
            <div className="space-y-6">
              {/* Learning Resources */}
              <div>
                <h2 className="text-white font-semibold mb-4 text-lg">Learning Resources</h2>
                <div className="space-y-3">
                  {investingResources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white/95 backdrop-blur-sm rounded-3xl p-5 shadow-lg hover:scale-[1.02] transition-transform"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-2">{resource.title}</h3>
                          <p className="text-sm text-gray-600 text-pretty">{resource.description}</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Stock Helper Chatbot */}
              <div>
                <h2 className="text-white font-semibold mb-4 text-lg">Stock Helper</h2>
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-5 shadow-lg">
                  {/* Chat Messages */}
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {stockChatMessages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-orange-300 to-pink-500 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p className="text-sm text-pretty">{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                    <input
                      type="text"
                      value={stockChatInput}
                      onChange={(e) => setStockChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendStockMessage()}
                      placeholder="Ask about stocks..."
                      className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 outline-none text-gray-800 placeholder-gray-400 text-sm"
                    />
                    <button
                      onClick={handleSendStockMessage}
                      className="bg-gradient-to-r from-orange-300 to-pink-500 p-2 rounded-xl shadow-md hover:scale-105 transition-transform"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg">
          <div className="max-w-md mx-auto flex items-center justify-around py-4 px-6">
            <button
              onClick={() => setActiveScreen("home")}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeScreen === "home" ? "scale-110" : "opacity-60"
              }`}
            >
              <div
                className={`p-3 rounded-2xl ${
                  activeScreen === "home" ? "bg-gradient-to-r from-orange-300 to-pink-500" : "bg-gray-100"
                }`}
              >
                <Home className={`w-6 h-6 ${activeScreen === "home" ? "text-white" : "text-gray-600"}`} />
              </div>
              <span className={`text-xs font-medium ${activeScreen === "home" ? "text-pink-500" : "text-gray-600"}`}>
                Goals
              </span>
            </button>

            <button
              onClick={() => setActiveScreen("wallet")}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeScreen === "wallet" ? "scale-110" : "opacity-60"
              }`}
            >
              <div
                className={`p-3 rounded-2xl ${
                  activeScreen === "wallet" ? "bg-gradient-to-r from-orange-300 to-pink-500" : "bg-gray-100"
                }`}
              >
                <Wallet className={`w-6 h-6 ${activeScreen === "wallet" ? "text-white" : "text-gray-600"}`} />
              </div>
              <span className={`text-xs font-medium ${activeScreen === "wallet" ? "text-pink-500" : "text-gray-600"}`}>
                Wallet
              </span>
            </button>

            <button
              onClick={() => setActiveScreen("invest")}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeScreen === "invest" ? "scale-110" : "opacity-60"
              }`}
            >
              <div
                className={`p-3 rounded-2xl ${
                  activeScreen === "invest" ? "bg-gradient-to-r from-orange-300 to-pink-500" : "bg-gray-100"
                }`}
              >
                <TrendingUp className={`w-6 h-6 ${activeScreen === "invest" ? "text-white" : "text-gray-600"}`} />
              </div>
              <span className={`text-xs font-medium ${activeScreen === "invest" ? "text-pink-500" : "text-gray-600"}`}>
                Invest
              </span>
            </button>

            <button
              onClick={() => setActiveScreen("chat")}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeScreen === "chat" ? "scale-110" : "opacity-60"
              }`}
            >
              <div
                className={`p-3 rounded-2xl ${
                  activeScreen === "chat" ? "bg-gradient-to-r from-orange-300 to-pink-500" : "bg-gray-100"
                }`}
              >
                <MessageCircle className={`w-6 h-6 ${activeScreen === "chat" ? "text-white" : "text-gray-600"}`} />
              </div>
              <span className={`text-xs font-medium ${activeScreen === "chat" ? "text-pink-500" : "text-gray-600"}`}>
                Chat
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
              }

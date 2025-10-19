"use client";
import React, { useState } from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

// --- (Interfaces are unchanged) ---
interface Holding {
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
}
interface Portfolio {
  cash: number;
  holdings: {
    [symbol: string]: Holding;
  };
}
interface StockInfo {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  chartData: { name: string; price: number }[];
  open: number;
  high: number;
  low: number;
  mktCap: string;
  peRatio: number;
  divYield: string;
}
// --- (Mock Database is unchanged) ---
const mockStockDatabase: { [key: string]: StockInfo } = {
  MSFT: {
    symbol: 'MSFT', price: 252.29, change: 59.13, changePercent: 30.61,
    chartData: [ { name: 'May', price: 195.8 }, { name: 'Jun', price: 202.1 }, { name: 'Jul', price: 200.4 }, { name: 'Aug', price: 228.7 }, { name: 'Sep', price: 235.1 }, { name: 'Oct', price: 252.29 } ],
    open: 248.02, high: 253.38, low: 247.27, mktCap: '3.74T', peRatio: 38.35, divYield: '0.41%',
  },
  AAPL: {
    symbol: 'AAPL', price: 175.20, change: 10.0, changePercent: 6.05,
    chartData: [ { name: 'May', price: 165.2 }, { name: 'Jun', price: 168.0 }, { name: 'Jul', price: 170.1 }, { name: 'Aug', price: 172.5 }, { name: 'Sep', price: 173.0 }, { name: 'Oct', price: 175.2 } ],
    open: 173.10, high: 176.40, low: 172.50, mktCap: '2.85T', peRatio: 29.5, divYield: '0.55%',
  },
  GOOG: {
    symbol: 'GOOG', price: 139.74, change: 15.40, changePercent: 12.38,
    chartData: [ { name: 'May', price: 124.1 }, { name: 'Jun', price: 122.5 }, { name: 'Jul', price: 128.9 }, { name: 'Aug', price: 135.2 }, { name: 'Sep', price: 132.1 }, { name: 'Oct', price: 139.74 } ],
    open: 138.00, high: 140.10, low: 137.50, mktCap: '1.75T', peRatio: 25.1, divYield: '0.00%',
  },
  TSLA: {
    symbol: 'TSLA', price: 180.50, change: -19.9, changePercent: -9.93,
    chartData: [ { name: 'May', price: 190.4 }, { name: 'Jun', price: 188.1 }, { name: 'Jul', price: 185.0 }, { name: 'Aug', price: 182.5 }, { name: 'Sep', price: 181.0 }, { name: 'Oct', price: 180.5 } ],
    open: 181.00, high: 183.20, low: 179.50, mktCap: '0.58T', peRatio: 40.2, divYield: '0.00%',
  },
};

export default function InvestmentArcade() {
  const [quantity, setQuantity] = useState('');
  const [searchSymbol, setSearchSymbol] = useState('');
  const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);

  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: 50000.0,
    holdings: {
      AAPL: { quantity: 10, purchasePrice: 150.0, currentPrice: 175.20 },
    },
  });

  const getPortfolioTotals = () => {
    let totalStockValue = 0;
    for (const symbol in portfolio.holdings) {
      const holding = portfolio.holdings[symbol];
      totalStockValue += holding.currentPrice * holding.quantity;
    }
    const totalValue = portfolio.cash + totalStockValue;
    return { totalStockValue, totalValue };
  };

  const { totalStockValue, totalValue } = getPortfolioTotals();

  const handleSearch = () => {
    if (!searchSymbol) return;
    const data = mockStockDatabase[searchSymbol];
    if (data) {
      setStockInfo(data);
    } else {
      alert(`Symbol "${searchSymbol}" not found. Try AAPL, MSFT, GOOG, or TSLA.`);
      setStockInfo(null);
    }
    setQuantity('');
  };

  const handleTrade = (type: 'buy' | 'sell') => {
    const numQuantity = parseInt(quantity, 10);
    if (!stockInfo || isNaN(numQuantity) || numQuantity <= 0) {
      alert('Please enter a valid symbol and quantity.');
      return;
    }

    const tradeValue = stockInfo.price * numQuantity;

    if (type === 'buy') {
      if (portfolio.cash < tradeValue) {
        alert('Not enough cash for this purchase.');
        return;
      }

      setPortfolio(prevPortfolio => {
        const newHoldings = { ...prevPortfolio.holdings };
        const existingHolding = newHoldings[stockInfo.symbol];

        if (existingHolding) {
          // Averaging purchase price (simplified)
          const totalCost = (existingHolding.purchasePrice * existingHolding.quantity) + tradeValue;
          const totalQuantity = existingHolding.quantity + numQuantity;
          existingHolding.quantity = totalQuantity;
          existingHolding.purchasePrice = totalCost / totalQuantity;
        } else {
          newHoldings[stockInfo.symbol] = {
            quantity: numQuantity,
            purchasePrice: stockInfo.price,
            currentPrice: stockInfo.price,
          };
        }
        return {
          cash: prevPortfolio.cash - tradeValue,
          holdings: newHoldings,
        };
      });

    } else { // Sell
      const existingHolding = portfolio.holdings[stockInfo.symbol];
      if (!existingHolding || existingHolding.quantity < numQuantity) {
        alert('You do not own enough shares to sell.');
        return;
      }

      setPortfolio(prevPortfolio => {
        const newHoldings = { ...prevPortfolio.holdings };
        newHoldings[stockInfo.symbol].quantity -= numQuantity;
        if (newHoldings[stockInfo.symbol].quantity === 0) {
          delete newHoldings[stockInfo.symbol];
        }
        return {
          cash: prevPortfolio.cash + tradeValue,
          holdings: newHoldings,
        };
      });
    }
    
    alert(`Successfully executed ${type} order for ${numQuantity} shares of ${stockInfo.symbol}!`);
    setQuantity('');
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
        The Investment Arcade 🕹️
      </h1>
      <p className="text-xs text-gray-500 text-center mb-5 px-4">
        This is a simulator. All prices are for educational purposes and do not involve real money.
      </p>

      {/* --- Portfolio Summary --- */}
      <div className="bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-6 mb-6">
        <p className="text-lg text-gray-500 text-center">Total Portfolio Value</p>
        <p className="text-4xl font-bold text-blue-600 text-center mb-4">${totalValue.toFixed(2)}</p>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Virtual Cash:</span>
          <span className="font-medium text-gray-800">${portfolio.cash.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Stock Value:</span>
          <span className="font-medium text-gray-800">${totalStockValue.toFixed(2)}</span>
        </div>
      </div>

      {/* --- Your Holdings --- */}
      <div className="bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Holdings</h2>
        <div className="space-y-4">
          {Object.keys(portfolio.holdings).length === 0 && (
            <p className="text-gray-500 text-center">You don't own any stocks yet. Buy one below!</p>
          )}

          {Object.keys(portfolio.holdings).map((stockSymbol) => {
            const holding = portfolio.holdings[stockSymbol];
            const currentValue = holding.currentPrice * holding.quantity;
            const profitLoss = (holding.currentPrice - holding.purchasePrice) * holding.quantity;
            const isProfit = profitLoss >= 0;
            const stockData = mockStockDatabase[stockSymbol];

            return (
              <div className="p-4 bg-white/70 rounded-lg" key={stockSymbol}>
                <div className="h-24 w-full mb-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stockData?.chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: 'none', borderRadius: '8px' }}
                        itemStyle={{ color: isProfit ? '#16a34a' : '#dc2626' }}
                        labelStyle={{ color: '#333', fontWeight: 'bold' }}
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Line type="monotone" dataKey="price" stroke={isProfit ? '#22c55e' : '#ef4444'} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }}/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-bold text-gray-800">{stockSymbol}</span>
                  <span className="text-lg font-semibold text-gray-800">${currentValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{holding.quantity} Shares</span>
                  <span className={`font-medium ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    {isProfit ? '▲' : '▼'} ${Math.abs(profitLoss).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Stock Lookup & Trade Section --- */}
      <div className="bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stock Lookup & Trade</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-md"
            placeholder="Try AAPL, MSFT, GOOG, or TSLA"
            value={searchSymbol}
            onChange={(e) => setSearchSymbol(e.target.value.toUpperCase())}
          />
          <button onClick={handleSearch} className="bg-gray-800 text-white p-3 rounded-md font-semibold hover:bg-gray-700 transition-colors">
            Search
          </button>
        </div>

        {stockInfo && (
          <div>
            <div className="mb-3">
              <h3 className="text-3xl font-bold text-gray-900">{stockInfo.symbol}</h3>
              <p className="text-2xl font-semibold text-gray-800">${stockInfo.price.toFixed(2)}</p>
              <p className={`text-lg font-medium ${stockInfo.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stockInfo.change >= 0 ? '▲' : '▼'} +${Math.abs(stockInfo.change).toFixed(2)} (+{stockInfo.changePercent.toFixed(2)}%) past 6m
              </p>
            </div>
            <div className="h-40 w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stockInfo.chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ display: 'none' }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                  />
                  <Line type="monotone" dataKey="price" stroke={stockInfo.change >= 0 ? '#22c55e' : '#ef4444'} strokeWidth={3} dot={false} activeDot={{ r: 6 }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Open</span><span className="font-medium text-gray-800">{stockInfo.open}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Mkt Cap</span><span className="font-medium text-gray-800">{stockInfo.mktCap}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">High</span><span className="font-medium text-gray-800">{stockInfo.high}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">P/E Ratio</span><span className="font-medium text-gray-800">{stockInfo.peRatio}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Low</span><span className="font-medium text-gray-800">{stockInfo.low}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Div Yield</span><span className="font-medium text-gray-800">{stockInfo.divYield}</span></div>
            </div>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <div className="flex gap-4">
              <button onClick={() => handleTrade('buy')} className="flex-1 bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition-colors">Buy</button>
              <button onClick={() => handleTrade('sell')} className="flex-1 bg-red-600 text-white p-3 rounded-md font-semibold hover:bg-red-700 transition-colors">Sell</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// --- Define the data structures (good practice for TSX) ---
interface Holding {
  [symbol: string]: number; // e.g., { "AAPL": 10 }
}

interface Portfolio {
  cash: number;
  stock_value: number;
  total_value: number;
  holdings: Holding;
}

// --- This is a FAKE API call for now, so you can test your UI ---
// In the future, this will be a real 'fetch' call to your Python server
const fakeApiRequest = (
  type: 'buy' | 'sell',
  symbol: string,
  quantity: number
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (type === 'buy') {
        resolve({
          success: true,
          message: `Successfully bought ${quantity} shares of ${symbol}.`,
          new_cash: 45000.0, // A fake updated value
        });
      } else {
        resolve({
          success: true,
          message: `Successfully sold ${quantity} shares of ${symbol}.`,
          new_cash: 55000.0, // A fake updated value
        });
      }
    }, 500); // Simulate a 0.5 second network delay
  });
};
// --- End of Simulation ---

const InvestSandbox = () => {
  // --- State for the UI ---
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');

  // This state will hold all the user's portfolio data
  // We start with a default "sandbox" portfolio
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: 50000.0,
    stock_value: 0.0,
    total_value: 50000.0,
    holdings: {
      AAPL: 10,
      TSLA: 5,
    },
  });

  // --- Functions to handle trades ---

  const handleBuy = async () => {
    const numQuantity = parseInt(quantity, 10);
    if (!symbol || isNaN(numQuantity) || numQuantity <= 0) {
      Alert.alert('Error', 'Please enter a valid symbol and quantity.');
      return;
    }

    //
    // THIS IS WHERE YOU WILL CONNECT TO YOUR PYTHON API
    // const response = await fetch('http://your-server-ip/api/buy', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ symbol, quantity: numQuantity, user_id: 'user_123' })
    // });
    // const data = await response.json();
    //
    
    // For now, we use our fake API:
    const data: any = await fakeApiRequest('buy', symbol, numQuantity);

    if (data.success) {
      Alert.alert('Success', data.message);
      // Update the UI (this is a simulation, you'd get real data back)
      setPortfolio((prev) => ({
        ...prev,
        cash: data.new_cash,
        holdings: {
          ...prev.holdings,
          [symbol.toUpperCase()]:
            (prev.holdings[symbol.toUpperCase()] || 0) + numQuantity,
        },
      }));
    } else {
      Alert.alert('Trade Failed', data.message);
    }
  };

  const handleSell = async () => {
    const numQuantity = parseInt(quantity, 10);
    if (!symbol || isNaN(numQuantity) || numQuantity <= 0) {
      Alert.alert('Error', 'Please enter a valid symbol and quantity.');
      return;
    }
    
    // Use the fake API for now
    const data: any = await fakeApiRequest('sell', symbol, numQuantity);

    if (data.success) {
      Alert.alert('Success', data.message);
      // Update the UI
      setPortfolio((prev) => ({
        ...prev,
        cash: data.new_cash,
        holdings: {
          ...prev.holdings,
          [symbol.toUpperCase()]:
            (prev.holdings[symbol.toUpperCase()] || 0) - numQuantity,
        },
      }));
    } else {
      Alert.alert('Trade Failed', data.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Zenfi Stock Sandbox</Text>

        {/* --- Portfolio Summary --- */}
        <View style={styles.summaryBox}>
          <Text style={styles.totalValue}>
            ${portfolio.total_value.toFixed(2)}
          </Text>
          <Text style={styles.label}>Total Portfolio Value</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Virtual Cash:</Text>
            <Text style={styles.value}>${portfolio.cash.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Stock Value:</Text>
            <Text style={styles.value}>${portfolio.stock_value.toFixed(2)}</Text>
          </View>
        </View>

        {/* --- Trade Box --- */}
        <View style={styles.tradeBox}>
          <Text style={styles.subtitle}>Make a Trade</Text>
          <TextInput
            style={styles.input}
            placeholder="Stock Symbol (e.g., AAPL)"
            value={symbol}
            onChangeText={setSymbol}
            autoCapitalize="characters"
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          <View style={styles.buttonRow}>
            <Button title="Buy" onPress={handleBuy} />
            <Button title="Sell" onPress={handleSell} color="#FF3B30" />
          </View>
        </View>

        {/* --- Holdings --- */}
        <View style={styles.holdingsBox}>
          <Text style={styles.subtitle}>Your Holdings</Text>
          {Object.keys(portfolio.holdings).map((stockSymbol) => (
            <View style={styles.holdingRow} key={stockSymbol}>
              <Text style={styles.holdingSymbol}>{stockSymbol}</Text>
              <Text style={styles.holdingQuantity}>
                {portfolio.holdings[stockSymbol]} Shares
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
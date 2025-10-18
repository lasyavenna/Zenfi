import yfinance as yf

class StockSandbox:
    """
    Manages a user's virtual portfolio, including cash and stock holdings.
    This class fetches real-time stock prices to simulate trades.
    """

    def __init__(self, user_id, starting_cash=100000.00):
        """
        Initializes a new portfolio for a user.
        
        Args:
            user_id: The unique ID for the user.
            starting_cash: The amount of virtual money they start with.
        """
        self.user_id = user_id
        self.cash = starting_cash
        self.holdings = {}  # A dictionary to store stocks, e.g., {'AAPL': 10, 'GOOG': 5}
        print(f"Sandbox created for user {user_id} with ${cash:,.2f} virtual cash.")

    def get_live_price(self, symbol):
        """
        Fetches the current market price for a stock symbol.
        
        Args:
            symbol: The stock ticker (e.g., 'AAPL', 'TSLA').
        
        Returns:
            The current price as a float, or None if the symbol is invalid.
        """
        try:
            stock = yf.Ticker(symbol)
            # 'currentPrice' is a reliable field; 'fast_info' is also an option
            price = stock.info.get('currentPrice')
            
            if price:
                return float(price)
            else:
                # Fallback for some assets or if 'currentPrice' is missing
                history = stock.history(period="1d")
                if not history.empty:
                    return float(history['Close'].iloc[-1])
            
            print(f"Error: Could not find price for {symbol}.")
            return None
        except Exception as e:
            print(f"Error fetching data for {symbol}: {e}")
            return None

    def buy(self, symbol, quantity):
        """
        Simulates buying a specified quantity of a stock.
        
        Args:
            symbol: The stock ticker.
            quantity: The number of shares to buy.
            
        Returns:
            A dictionary with the trade status (success/fail) and a message.
        """
        symbol = symbol.upper()
        price = self.get_live_price(symbol)
        
        if price is None:
            return {"success": False, "message": f"Could not find stock symbol: {symbol}"}

        total_cost = price * quantity

        # Check if the user has enough virtual cash
        if self.cash < total_cost:
            return {
                "success": False, 
                "message": f"Not enough cash. You need ${total_cost:,.2f} but only have ${self.cash:,.2f}."
            }
        
        # Process the "buy"
        self.cash -= total_cost
        self.holdings[symbol] = self.holdings.get(symbol, 0) + quantity
        
        return {
            "success": True,
            "message": f"Successfully bought {quantity} shares of {symbol} for ${total_cost:,.2f}.",
            "new_cash": self.cash
        }

    def sell(self, symbol, quantity):
        """
        Simulates selling a specified quantity of a stock.
        
        Args:
            symbol: The stock ticker.
            quantity: The number of shares to sell.
            
        Returns:
            A dictionary with the trade status (success/fail) and a message.
        """
        symbol = symbol.upper()
        
        # Check if the user even owns this stock
        if symbol not in self.holdings or self.holdings[symbol] == 0:
            return {"success": False, "message": f"You do not own any shares of {symbol}."}
        
        # Check if they are trying to sell more than they have
        if quantity > self.holdings[symbol]:
            return {
                "success": False, 
                "message": f"You only own {self.holdings[symbol]} shares of {symbol}. Cannot sell {quantity}."
            }

        price = self.get_live_price(symbol)
        if price is None:
            return {"success": False, "message": f"Error finding price for {symbol}."}

        # Process the "sell"
        total_sale_value = price * quantity
        self.cash += total_sale_value
        self.holdings[symbol] -= quantity
        
        # Clean up the holdings dict if they sold all shares
        if self.holdings[symbol] == 0:
            del self.holdings[symbol]
            
        return {
            "success": True,
            "message": f"Successfully sold {quantity} shares of {symbol} for ${total_sale_value:,.2f}.",
            "new_cash": self.cash
        }

    def get_portfolio_summary(self):
        """
        Calculates the total value of the portfolio (cash + all stock holdings).
        
        Returns:
            A dictionary summarizing the entire portfolio.
        """
        print("Calculating portfolio value...")
        stock_value = 0.0
        
        # We need to get the current price for every stock they own
        for symbol, quantity in self.holdings.items():
            price = self.get_live_price(symbol)
            if price:
                stock_value += price * quantity
        
        total_value = self.cash + stock_value
        
        return {
            "cash": self.cash,
            "stock_value": stock_value,
            "total_value": total_value,
            "holdings": self.holdings
        }

# --- This part shows you how to use the class ---
if __name__ == "__main__":
    # Create a new sandbox portfolio for a user
    portfolio = StockSandbox(user_id="user_123", starting_cash=50000.00)
    
    # --- Simulate Buying ---
    print("\n--- Buying ---")
    buy_result = portfolio.buy("AAPL", 10)  # Buy 10 shares of Apple
    print(buy_result["message"])
    
    buy_result = portfolio.buy("TSLA", 5)   # Buy 5 shares of Tesla
    print(buy_result["message"])
    
    # --- Simulate a Failed Buy ---
    print("\n--- Failing to Buy ---")
    buy_result = portfolio.buy("FAKE-STOCK", 1) # Buy a fake stock
    print(buy_result["message"])

    buy_result = portfolio.buy("GOOG", 5000) # Try to buy too many
    print(buy_result["message"])
    
    # --- Simulate Selling ---
    print("\n--- Selling ---")
    sell_result = portfolio.sell("AAPL", 3) # Sell 3 shares of Apple
    print(sell_result["message"])

    # --- Simulate a Failed Sell ---
    print("\n--- Failing to Sell ---")
    sell_result = portfolio.sell("MSFT", 1) # Try to sell a stock you don't own
    print(sell_result["message"])
    
    # --- Show the Final Portfolio ---
    print("\n--- FINAL PORTFOLIO ---")
    summary = portfolio.get_portfolio_summary()
    
    # Use f-strings for clean, Zenfi-style formatting
    print(f"Portfolio Total Value: ${summary['total_value']:,.2f}")
    print(f"  > Virtual Cash: ${summary['cash']:,.2f}")
    print(f"  > Stock Value:  ${summary['stock_value']:,.2f}")
    print(f"Current Holdings: {summary['holdings']}")
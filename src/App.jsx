import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // this function is called by AuthForm when sign-in is successful
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  if (isLoggedIn) {
    // If logged in, show dashboard
    return <Dashboard onLogout={handleLogout} />
  }

  // Auth page
  return <AuthForm onSuccess={handleLoginSuccess} />;
}

export default App;
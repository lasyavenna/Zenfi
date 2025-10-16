import React, { useState } from 'react';
import AuthForm from './components/AuthForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // this function is called by AuthForm when sign-in is successful
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    // main website
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>Welcome to the Budgeting Dashboard!</h1>
        <p>This is where the user sees the main content.</p>
        <button
          onClick={() => setIsLoggedIn(false)}
          style={{ padding: '10px 20px', marginTop: '30px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
    );
  }

  // Auth page
  return <AuthForm onSuccess={handleLoginSuccess} />;
}

export default App;
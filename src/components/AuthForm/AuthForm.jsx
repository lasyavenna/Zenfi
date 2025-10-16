import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = ({ onSuccess }) => {
    const [isSigningIn, setIsSigningIn] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = async (event) => {
        // prevent default form submission
        event.preventDefault();

        if (username.trim() == '' || password.trim() === '') {
            alert('Please enter both a username and password.');
            return;
        }

        const endpoint = isSigningIn ? 'Login' :'register';
        const url = `http://localhost:3001/api/${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content- Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (isSigningIn) {
                    // Successful login
                    alert(`Login successful! ${data.message}`);
                    if (onSuccess) {
                        onSuccess();
                    }
                } else {
                    // successful registration
                    alert(`Registration successful! ${data.message}`);
                    setIsSigningIn(true); // switch to login view
                }
            } else {
                // server returned an error
                alert(`Authetication failed: ${data.message}`);
            }
        } catch (error) {
            console.error("Network Error: ", error);
            alert("Could not connect to the server.");
        }
    };

    return (
        <div className="container">
            <form className="form-box" onSubmit={handleAuth}>
                <h2 className="title">
                    {isSigningIn ? 'Sign In' : 'Sign Up'}
                </h2>

                {/* Username Input */}
                <input
                    type="text"
                    placeholder="Username"
                    className="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoCapitalize="none"
                    required
                />

                {/* Password Input */}
                <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* submit action button */}
                <button
                    type="submit"
                    className="button"
                >
                    {isSigningIn ? 'Sign In' : 'Create Account'}
                </button>
            </form>

            {/* toggle link */}
            <div className="toggle-button">
                <a
                    href="#"
                    className="toggle-link"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsSigningIn(!isSigningIn);
                    }}
                >
                    {isSigningIn
                        ? "Don't have an account? Sign Up"
                        : 'Already have an account? Sign In'}
                </a>
            </div>
        </div>
    );
};

export default AuthForm;
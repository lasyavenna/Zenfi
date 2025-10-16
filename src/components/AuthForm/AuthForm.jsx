import React, { useState } from 'react';
import './AuthForm.css';
import { supabase } from '../../supabaseClient';

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

        let authFunction;
        let successMessage;

        if (isSigningIn) {
            authFunction = supabase.auth.signInWithPassword({
                email: username,
                password: password,
            });
            successMessage = 'Login successful!';
        } else {
            // Use Supabase signUp for registration
            authFunction = supabase.auth.signUp({
                email: username,
                password: password,
            });
            successMessage = 'Registration successful! You can now sign in.';
        }

        try {
            const { data, error } = await authFunction;

            if (error) {
                alert(`Authentication Error: ${error.message}`);
            } else if (isSigningIn && data.user) {
                alert(successMessage);
                if (onSuccess) {
                    onSuccess();
                }
            } else if (!isSigningIn) {
                alert(successMessage);
                setIsSigningIn(true);
            }
        } catch (error) {
            console.error("Supabase Call Error: ", error);
            alert("A network error occured.");
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
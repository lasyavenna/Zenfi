import React, { useState } from 'react';
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        padding: '20px',
    },
    formBox: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        fontSize:'28px',
        fontWeight: '700',
        marginBottom: '30px',
        textAlign: 'center',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        boxSizing: 'border-box',
        fontSize: '16px',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: '600',
        marginTop: '10px',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    toggleButton: {
        marginTop: '20px',
        textAlign: 'center',
    },
    toggleLink: {
        color: '#007bff',
        textDecoration: 'none',
        cursor: 'pointer',
        fontSize: '14px',
    }
};

const AuthForm = ({ onSuccess }) => {
    const [isSigningIn, setIsSigningIn] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleAuth = (event) => {
        // prevent default form submission
        event.preventDefault();

        if (username.trim() == '' || password.trim() === '') {
            alert('Please enter both a username and password.');
            return;
        }

        if (isSigningIn) {
            alert(`Signing In Attempt for: ${username}. Checking databse...`);
            // if successful
            if (onSuccess) {
                onSuccess();
            }
        } else {
            alert(`User ${username} created! Please sign in now.`);
            //switch to sign in view
            setIsSigningIn(true);
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.formBox} onSubmit={handleAuth}>
                <h2 style={styles.title}>
                    {isSigningIn ? 'Sign In' : 'Sign Up'}
                </h2>

                {/* Username Input */}
                <input
                    type="text"
                    placeholder="Username"
                    style={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoCapitlize="none"
                    required
                />

                {/* Password Input */}
                <input
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* submit action button */}
                <button
                    type="submit"
                    style={{
                        ...styles.button,
                        // Apply hover style if state is true
                        ...(isHovered ? styles.buttonHover : {})
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isSigningIn ? 'Sign In' : 'Create Account'}
                </button>
            </form>

            {/* toggle link */}
            <div style={styles.toggleButton}>
                <a
                    href="#"
                    style={styles.toggleLink}
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
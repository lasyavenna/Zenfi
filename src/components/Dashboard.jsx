import React from 'react';

const styles = {
    dashboardContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#eaf4ff',
        padding: '20px',
        boxSizing: 'border-box',
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '2px solid #007bff',
        marginBottom: '30px',
    },
    title: {
        fontSize: '32px',
        color: '#007bff',
        margin: 0,
    },
    logoutButton: {
        padding: '10px 15px',
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    summaryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px',
    },
    summaryCard: {
        padding: '25px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0,1)',
        textAlign: 'center',
    },
    cardTitle: {
        fontSize: '18px',
        color: '#555',
        marginBotton: '10px',
    },
    cardValue: {
        fontSize: '36px',
        fontWeigt: '700',
        color: '#333',
    }
};

const Dashboard = ({ onLogout }) => {
    // sample data
    const data = {
        income: 4500.00,
        budgeted: 3200.00,
        remaining: 1300
    };

    return (
        <div style={styles.dashboardContainer}>
            <header style={styles.header}>
                <h1 style={styles.title}>Budget Dashboard</h1>
                <button
                    style={styles.logoutButton}
                    onClick={onLogout}
                >
                    Logout
                </button>
            </header>

            <div style={styles.summaryGrid}>
                <div style={styles.summaryCard}>
                    <h3 style={styles.cardTitle}>Total Income</h3>
                    <p style={{...styles.cardValue, color: '#28a745'}}>${data.income.toFixed(2)}</p>
                </div>
                <div style={styles.summaryCard}>
                    <h3 style={styles.cardTitle}>Total Budgeted</h3>
                    <p style={{...styles.cardValue, color: '#ffc107'}}>${data.budgeted.toFixed(2)}</p>
                </div>
                <div style={styles.summaryCard}>
                    <h3 style={styles.cardTitle}>Remaining</h3>
                    <p style={{...styles.cardValue, color: '#007bff'}}>${data.remaining.toFixed(2)}</p>
                </div>
            </div>

            {/* Placeholder for more content */}
            <h2 style={{marginTop: '50px, color: #333'}}>Monthly Transactions</h2>
            <p style={{color: '#555'}}>Your transaction history and charts go here.</p>

        </div>
    );
};

export default Dashboard;
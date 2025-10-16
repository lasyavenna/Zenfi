import React from 'react';

const Dashboard = ({ onLogout }) => {
    // sample data
    const data = {
        income: 4500.00,
        budgeted: 3200.00,
        remaining: 1300.00
    };

    const dynamicStyles = {
        transactionTitle: {
            marginTop: '50px',
            color: '#333'
        },
        incomeColor: {
            color: '#28a745'
        },
        budgetedColor: {
            color: '#ffc107'
        },
        remainingColor: {
            color: '#007bff'
        }
    };

    return (
        <div className="dashboard-container">
            <header className="header">
                <h1 className="title">Budget Dashboard</h1>
                <button
                    className="logout-button"
                    onClick={onLogout}
                >
                    Logout
                </button>
            </header>

            <div className="summary-grid">
                <div className="summary-card">
                    <h3 className="card-title">Total Income</h3>
                    <p style={dynamicStyles.incomeColor} className="card-value">${data.income.toFixed(2)}</p>
                </div>
                <div className="summary-card">
                    <h3 className="card-title">Total Budgeted</h3>
                    <p style={dynamicStyles.budgetedColor} classNme="card-value">${data.budgeted.toFixed(2)}</p>
                </div>
                <div className="sumary-card">
                    <h3 className="card-title">Remaining</h3>
                    <p style={dynamicStyles.remainingColor} className="card-value">${data.remaining.toFixed(2)}</p>
                </div>
            </div>

            {/* Placeholder for more content */}
            <h2 style={dynamicStyles.transactionTitle}>Monthly Transactions</h2>
            <p style={{color: '#555'}}>Your transaction history and charts go here.</p>

        </div>
    );
};

export default Dashboard;
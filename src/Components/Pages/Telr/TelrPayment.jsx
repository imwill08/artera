import React, { useState, useEffect } from 'react';
import './Telr.css';

/**
 * TelrPayment Component
 * This component handles the dynamic fetching of the Telr payment URL
 * and displays it within a secure iFrame.
 */
const TelrPayment = ({ orderDetails }) => {
    const [paymentUrl, setPaymentUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializePayment = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await fetch('/api/telr/create-order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderDetails || {
                        ivp_amount: '100.00',
                        ivp_currency: 'AED',
                        ivp_cart: 'ORDER-123',
                        framed: 2 // Enable iFrame mode
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to create Telr order');
                }

                const data = await response.json();
                
                // Assuming your backend returns { url: "..." }
                if (data.url) {
                    setPaymentUrl(data.url);
                } else {
                    throw new Error('Payment URL not found in response');
                }
            } catch (err) {
                console.error('Telr Initialization Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (orderDetails || true) { // Remove "|| true" when passing actual props
            initializePayment();
        }
    }, [orderDetails]);

    if (loading) {
        return (
            <div className="telr-wrapper">
                <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
                    <div className="spinner"></div>
                    <p>Connecting to secure payment gateway...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="telr-wrapper">
                <div className="container" style={{ textAlign: 'center', padding: '50px', border: '2px solid #f04438' }}>
                    <h3 style={{ color: '#f04438' }}>Payment Error</h3>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="btn btn-warning">Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="telr-wrapper">
            <div className="container" style={{ padding: '0', overflow: 'hidden' }}>
                <iframe
                    id="telr"
                    title="Telr Payment Gateway"
                    src={paymentUrl}
                    sandbox="allow-forms allow-modals allow-popups-to-escape-sandbox allow-popups allow-scripts allow-top-navigation allow-same-origin"
                    style={{ 
                        width: '100%', 
                        minWidth: '600px', 
                        height: '650px', 
                        border: 'none',
                        borderRadius: '20px'
                    }}
                ></iframe>
            </div>
        </div>
    );
};

export default TelrPayment;

import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";

const PaymentStatus = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.body.style.padding = "0";
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.padding = ""; // Reset to default (127px from CSS)
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <section className="payment-section">
            <div className="container">
                <div className="payment-card text-center">
                    <div className="payment-header">
                        <h2>{t('payment.processing', 'Processing Your Payment')}</h2>
                        <p>{t('payment.pleaseWait', 'Please do not refresh the page...')}</p>
                    </div>
                    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem', color: '#8A94F9' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PaymentStatus;
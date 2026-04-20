import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SubscriptionPaymentSuccess = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.body.style.padding = "0";
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.padding = "";
            document.body.style.overflow = "";
        };
    }, []);

    const handleRedirect = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "#";
    };

    return (
        <section className="payment-section">
            <div className="container">
                <div className="payment-card text-center">
                    <div className="mb-4">
                        <i className="ri-checkbox-circle-fill" style={{ fontSize: '80px', color: '#29E8C3' }}></i>
                    </div>
                    <div className="payment-header">
                        <h2>{t('payment.successTitle', 'Payment Successful!')}</h2>
                        <p>{t('payment.successSubtitle', 'Thank you for your payment. Your subscription is now active.')}</p>
                    </div>

                    <div className="bg-light rounded-4 p-4 mb-4 text-start border-0" style={{ background: '#f8f9fa' }}>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-secondary small">{t('payment.transactionId', 'Transaction ID')}:</span>
                            <span className="fw-bold small text-dark">TXN-987654321</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-secondary small">{t('payment.amountPaid', 'Amount Paid')}:</span>
                            <span className="fw-bold small text-dark">$250.00</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span className="text-secondary small">{t('payment.paymentMethod', 'Payment Method')}:</span>
                            <span className="fw-bold small text-dark">Visa ending in 4242</span>
                        </div>
                    </div>

                    <div className="d-grid">
                        <button
                            onClick={handleRedirect}
                            className="themebtn1 w-100"
                            style={{ height: '54px', fontSize: '18px' }}
                        >
                            {t("Continue")}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SubscriptionPaymentSuccess;

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SubscriptionPaymentFailed = () => {
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
                        <i className="ri-error-warning-fill text-danger" style={{ fontSize: '80px' }}></i>
                    </div>
                    <div className="payment-header">
                        <h2>{t('payment.failureTitle', 'Payment Failed!')}</h2>
                        <p>{t('payment.failureSubtitle', 'Unfortunately, your payment could not be processed at this time.')}</p>
                    </div>

                    <div className="bg-danger bg-opacity-10 rounded-4 p-4 mb-4 text-start border border-danger border-opacity-10" style={{ background: 'rgba(220, 53, 69, 0.05)' }}>
                        <div className="d-flex align-items-center text-danger mb-2">
                            <i className="ri-error-warning-line me-2"></i>
                            <span className="fw-bold small">{t('payment.errorReason', 'Error Reason')}:</span>
                        </div>
                        <p className="text-danger small mb-0">
                            {t('payment.errorDescription', 'Your bank declined the transaction. This can happen if the card is expired, has insufficient funds, or has incorrect CVV.')}
                        </p>
                    </div>

                    <div className="d-grid">
                        <button
                            onClick={handleRedirect}
                            className="themebtn1 w-100"
                            style={{ height: '54px', fontSize: '18px', background: '#dc3545' }}
                        >
                            {t("Go Back")}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SubscriptionPaymentFailed;

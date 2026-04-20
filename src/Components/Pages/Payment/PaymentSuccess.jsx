import React from 'react';
import { useTranslation } from 'react-i18next';

const PaymentSuccess = () => {
    const { t } = useTranslation();

    const handleRedirect = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "#";
    };
    return (
        <div className="payment-success-page min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card border-0 shadow-sm p-4 text-center">
                            <div className="mb-4">
                                <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: '80px' }}></i>
                            </div>
                            <h2 className="fw-bold mb-2">Payment Successful!</h2>
                            <p className="text-secondary mb-4">
                                Thank you for your payment. Your transaction has been completed successfully, and a receipt has been emailed to you.
                            </p>

                            <div className="bg-light rounded p-3 mb-4 text-start">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-secondary small">Transaction ID:</span>
                                    <span className="fw-medium small">TXN-987654321</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-secondary small">Amount Paid:</span>
                                    <span className="fw-medium small">$250.00</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className="text-secondary small">Payment Method:</span>
                                    <span className="fw-medium small">Visa ending in 4242</span>
                                </div>
                            </div>

                            <div className="d-grid gap-2">
                                <button
                                    onClick={handleRedirect}
                                    className="successButton btn btn-primary py-2 fw-medium"
                                >
                                    {t("Continue")}
                                </button>
                                {/* <Link to="/orders" className="btn btn-outline-secondary py-2 fw-medium">
                                    View Orders
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess
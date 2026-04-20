import React from 'react';
import { useTranslation } from 'react-i18next';

const PaymentFailed = () => {
    const { t } = useTranslation();

    const handleRedirect = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "#";
    };
    return (
        <>
            <div className="payment-failed-page min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-5">
                            <div className="card border-0 shadow-sm p-4 text-center">
                                <div className="mb-4">
                                    <i className="ri-error-warning-fill text-danger" style={{ fontSize: '80px' }}></i>
                                </div>
                                <h2 className="fw-bold mb-2">Payment Failed!</h2>
                                <p className="text-secondary mb-4">
                                    Unfortunately, your payment could not be processed at this time. Please check your card details and try again.
                                </p>

                                <div className="bg-danger bg-opacity-10 rounded p-3 mb-4 text-start border border-danger border-opacity-25">
                                    <div className="d-flex align-items-center text-danger mb-2">
                                        <i className="ri-error-warning-line me-2"></i>
                                        <span className="fw-medium small">Error Reason:</span>
                                    </div>
                                    <p className="text-danger small mb-0">
                                        Your bank declined the transaction. This can happen if the card is expired, has insufficient funds, or has incorrect CVV.
                                    </p>
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        onClick={handleRedirect}
                                        className="failureButton btn btn-danger py-2 fw-medium"
                                    >
                                        {t("Go Back")}
                                    </button>
                                    {/* <Link to="/support" className="btn btn-outline-secondary py-2 fw-medium">
                                        Contact Support
                                    </Link> */}
                                    {/* <Link to="/" className="btn btn-link text-decoration-none text-secondary small mt-2">
                                        Back to Home
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentFailed
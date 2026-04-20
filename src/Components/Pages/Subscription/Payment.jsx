import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const SubscriptionPayment = () => {
    const { checkoutId } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id"); // Hyperpay appends this on redirect back
    const entityId = searchParams.get("entityId");

    useEffect(() => {
        localStorage.setItem("language", "en");
        localStorage.setItem("languageChange", "en");
    }, [])

    useEffect(() => {
        document.body.style.padding = "0";
        document.body.style.overflowX = "hidden";

        window.wpwlOptions = {
            style: "card", // card / plain
            locale: isArabic ? "ar" : "en",
            brandDetection: true,
            onReady: function () {
                console.log("Payment widget loaded");
            }
        };

        if (checkoutId) {
            const script = document.createElement("script");
            script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
            script.async = true;
            document.body.appendChild(script);

            return () => {
                const scriptTag = document.querySelector(`script[src*="checkoutId=${checkoutId}"]`);
                if (scriptTag) {
                    document.body.removeChild(scriptTag);
                }
                document.body.style.padding = "";
                document.body.style.overflowX = "";
            };
        }
    }, [checkoutId, isArabic]);

    useEffect(() => {
        const verifySubscription = async () => {
            if (id && entityId) {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `https://artera.com.sa/api/payment/checkSubscription?id=${entityId}&resourcePath=/v1/payments/${entityId}`
                    );

                    if (response.data.error === true) {
                        navigate("/subscription-payment-failed");
                    } else {
                        navigate("/subscription-payment-success");
                    }
                } catch (err) {
                    console.error("Error checking subscription status:", err);
                    navigate("/subscription-payment-failed");
                } finally {
                    setLoading(false);
                }
            }
        };

        verifySubscription();
    }, [id, entityId, navigate]);

    if (loading) {
        return (
            <section className="payment-section">
                <div className="container">
                    <div className="payment-card text-center">
                        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem', color: '#8A94F9' }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="payment-section">
            <div className="container">
                <div className="payment-card">
                    <div className="payment-header">
                        <h2>{t('payment.subscriptionTitle', 'Subscription Payment')}</h2>
                        <p>{t('payment.subscriptionSubtitle', 'Secure your subscription with Artera')}</p>
                    </div>
                    <form
                        action={window.location.href}
                        className="paymentWidgets"
                        data-brands="VISA MASTER AMEX"
                    ></form>
                </div>
            </div>
        </section>
    );
};

export default SubscriptionPayment;

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

const ApplePay = () => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const navigate = useNavigate();

    // Changing how we get the checkoutId to using API similar to Checkout.jsx
    const [checkoutId, setCheckoutId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isApplePaySupported, setIsApplePaySupported] = useState(true);

    const [searchParams] = useSearchParams();
    const amount = searchParams.get("amount");
    const slotId = searchParams.get("slotId");
    const type = searchParams.get("type");
    const userId = searchParams.get("userId");
    const paymentMethod = searchParams.get("paymentMethod");
    const serviceType = searchParams.get("serviceType");

    useEffect(() => {
        // Checking for ApplePaySession
        if (window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
            setIsApplePaySupported(true);
            createCheckoutSession();
        } else {
            setIsApplePaySupported(false);
            setLoading(false);
        }

        return () => {
            const existingScript = document.querySelector(`script[src*="paymentWidgets.js"]`);
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
            //new checking 2nd march
            if (window.applePayCleanup) {
                window.applePayCleanup();
            }
        };
    }, []);

    const createCheckoutSession = async () => {
        try {
            setLoading(true);

            // "just need to change the payment mode"
            const payload = {
                amount: amount,
                userId: userId,
                type: type,
                slotId: slotId ? slotId.split(',') : undefined,
                paymentMethod: paymentMethod, // Removed the fallback to APPLEPAY since API rejects it 
                serviceType: serviceType
            };

            const res = await axios.post(`https://artera.com.sa/api/payment/createCheckout`, payload);

            if (res?.data?.error) {
                setError(t('payment.payment_failed', 'Payment initialization failed'));
                setLoading(false);
                return;
            }

            const fetchedCheckoutId = res.data.results.checkout.id;
            setCheckoutId(fetchedCheckoutId);
            setLoading(false);

            loadOppwaScript(fetchedCheckoutId);

        } catch (err) {
            console.error(err, "Apple Pay Checkout Error");
            setError(err?.response?.data?.message || t('payment.payment_failed', 'An error occurred'));
            setLoading(false);
        }
    };

    const loadOppwaScript = (id) => {
        document.body.style.padding = "0";

        window.wpwlOptions = {
            style: "card",
            locale: isArabic ? "ar" : "en",
            maskCvv: true,
            brandDetection: true,
            applePay: {
                displayName: "Artera",
                total: {
                    label: "Artera",
                    amount: amount ? Number(amount).toFixed(2) : "0.00",
                    type: "final",
                },
                // Required by Apple Pay – without this Apple rejects the authorization
                merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
                // Must include mada for SNB mada cards to be accepted
                supportedNetworks: ["mada", "masterCard", "visa", "amex"],
                countryCode: "SA",
                supportedCountries: ["SA"],
                version: 3,
                buttonStyle: "black",
                buttonType: "pay",
            },
            onReady: function () {
                console.log("Apple Pay widget loaded");
            }
        };

        // Inject Custom Styles for Apple Pay button 2nd march
        const style = document.createElement("style");
        style.innerHTML = `
            .wpwl-form {
                max-width: 100% !important;
            }
            .wpwl-apple-pay-button {
                font-size: 16px !important;
                -webkit-appearance: -apple-pay-button !important;
                -apple-pay-button-type: buy;
                border-radius: 4px;
                box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 1px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
                cursor: pointer;
                height: 40px;
                min-height: 40px;
                padding: 12px 24px 10px;
                width: 100% !important;
                max-width: 240px;
                margin-top: 10px;
                margin-left: auto;
                margin-right: auto;
                display: flex !important;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
        //  2nd march-----

        const script = document.createElement("script");
        // Using test server – HyperPay has granted special Apple Pay access in test/UAT mode
        script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${id}`;
        // script.src = `https://oppwa.com/v1/paymentWidgets.js?checkoutId=${id}`;
        script.async = true;
        document.body.appendChild(script);

        // Add cleanup for style  2nd march
        const existingCleanup = window.applePayCleanup;
        window.applePayCleanup = () => {
            if (existingCleanup) existingCleanup();
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
        //  2nd march-----
    };

    return (
        <section className="payment-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', backgroundColor: '#f4f6f9' }}>
            <div className="container">
                <div className="payment-card" style={{ width: '100%', maxWidth: '500px', margin: '0 auto', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', padding: '30px', borderRadius: '16px', backgroundColor: '#fff' }}>
                    <div className="payment-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                            {t('payment.applepay', 'Apple Pay Checkout')}
                        </h2>
                        <p style={{ color: '#6c757d', fontSize: '15px' }}>
                            {t('payment.applepay_subtitle', 'Secure and fast payment via Apple Pay')}
                        </p>
                    </div>

                    {!isApplePaySupported ? (
                        <div style={{ textAlign: 'center', color: '#dc3545', padding: '20px', backgroundColor: '#fdf3f4', borderRadius: '8px', border: '1px solid #fad3d8' }}>
                            <p style={{ margin: 0, fontWeight: '500', fontSize: '14px' }}>
                                {t('payment.applepay_notsupported', 'Apple Pay is not supported on this device or browser. Please ensure you are using Safari on an eligible Apple device with an active card.')}
                            </p>
                        </div>
                    ) : loading ? (
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <p>{t('payment.loading', 'Initializing payment...')}</p>
                        </div>
                    ) : error ? (
                        <div style={{ textAlign: 'center', color: '#dc3545', padding: '20px', backgroundColor: '#fdf3f4', borderRadius: '8px', border: '1px solid #fad3d8' }}>
                            <p style={{ margin: 0, fontWeight: '500', fontSize: '14px' }}>
                                {error}
                            </p>
                            <button
                                onClick={() => navigate(-1)}
                                style={{ marginTop: '15px', padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                {t('common.go_back', 'Go Back')}
                            </button>
                        </div>
                    ) : (
                        <form
                            action="/payment-status"
                            className="paymentWidgets"
                            data-brands="APPLEPAY"
                        ></form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ApplePay;

import React, { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from 'axios';
// import { useTranslation } from "react-i18next";

const Payment = () => {
    const { checkoutId } = useParams();
    const navigate = useNavigate(); // 2nd march
    const [searchParams] = useSearchParams();
    const amount = searchParams.get("amount"); // 2nd march-----
    const userId = searchParams.get("userId"); // 2nd march-----
    const type = searchParams.get("type"); // 2nd march-----
    const serviceType = searchParams.get("serviceType"); // 2nd march-----
    const slotId = searchParams.get("slotId"); // 2nd march-----
    // const { t, i18n } = useTranslation();
    // const isArabic = i18n.language === 'ar';
    useEffect(() => {
        document.body.style.padding = "0";

        //         window.wpwlOptions = {
        //             style: "card", // card / plain
        //             locale: "en", // Forced to 'en' as requested
        //             maskCvv: true,
        //             brandDetection: true,
        //             applePay: {
        //                 displayName: "Artera",
        //                 total: {
        //                     label: "Artera", // 2nd march
        //                     amount: amount ? Number(amount).toFixed(2) : "0.00", // 2nd march-----
        //                     type: "final",
        //                 }, // Required by Apple Pay – without this Apple rejects the authorization
        //                 merchantCapabilities: [
        //                     "supports3DS",
        //                     "supportsCredit",
        //                     "supportsDebit",
        //                 ], // Must include mada for SNB mada cards to be accepted
        //                 supportedNetworks: ["mada", "masterCard", "visa", "amex"],
        //                 countryCode: "SA",
        //                 supportedCountries: ["SA"],
        //                 version: 3,
        //                 buttonStyle: "black",
        //                 buttonType: "pay",
        //             },
        //             onReady: function () {
        //                 console.log("Payment widget loaded"); // Add "OR" divider before Apple Pay button

        //                 const applePayBtn = document.querySelector(".wpwl-apple-pay-button");
        //                 if (applePayBtn) {
        //                     const dividerHtml = `
        //                         <div class="apple-pay-divider">
        //                             <span>OR</span>
        //                         </div>
        //                     `;
        //                     applePayBtn.insertAdjacentHTML("beforebegin", dividerHtml);
        //                 }
        //                 applePayBtn.addEventListener("click", async () => {
        //                     alert(
        //                         "Apple Pay is currently in sandbox mode. Please use a test card or switch to another payment method.",
        //                     );
        //                     try {
        //                         const payload = {
        //                             prevCheckout: checkoutId,
        //                             amount: amount,
        //                             userId: userId,
        //                             serviceType: serviceType,
        //                             slotId: slotId,
        //                             type: type,
        //                             paymentMethod: "APPLEPAY"
        //                         }
        //                         const res = await axios.post(
        //                             `https://artera.com.sa/api/payment/createCheckout`,
        //                             payload,
        //                         );

        //                         if (res?.data?.error) {
        //                             navigate("/payment-failed");
        //                             return;
        //                         }
        //                         alert("Apple Pay checkout created successfully. Please complete the payment in the Apple Pay sheet.");
        //                         // navigate(
        //                         //   `/payment/${res.data.results.checkout.id}?amount=${amount}`,
        //                         // );
        //                     } catch (error) { }
        //                 });
        //             },
        //         }; 

        window.wpwlOptions = {
            style: "card",
            locale: "en",
            maskCvv: true,
            brandDetection: true,
            applePay: {
                displayName: "Artera",
                total: {
                    label: "Artera",
                    amount: amount ? Number(amount).toFixed(2) : "0.00",
                    type: "final",
                },
                merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
                supportedNetworks: ["mada", "masterCard", "visa", "amex"],
                countryCode: "SA",
                supportedCountries: ["SA"],
                version: 3,
                buttonStyle: "black",
                buttonType: "pay",
            },
            onReady: function () {
                console.log("Payment widget loaded");
                const applePayBtn = document.querySelector(".wpwl-apple-pay-button");
                if (applePayBtn) {
                    const dividerHtml = `
                        <div class="apple-pay-divider">
                            <span>OR</span>
                        </div>
                    `;
                    applePayBtn.insertAdjacentHTML("beforebegin", dividerHtml);

                    applePayBtn.addEventListener("click", async () => {
                        console.log("Apple Pay button clicked, updating checkout...");
                        try {
                            const payload = {
                                prevCheckout: checkoutId,
                                amount: amount,
                                userId: userId,
                                serviceType: serviceType,
                                slotId: slotId ? slotId.split(',') : [],
                                type: type,
                                paymentMethod: "APPLEPAY"
                            };

                            const res = await axios.post(
                                "https://artera.com.sa/api/payment/createCheckout",
                                payload
                            );

                            if (res?.data?.error) {
                                navigate("/payment-failed");
                                return;
                            }
                            console.log("Checkout updated for Apple Pay");
                        } catch (error) {
                            console.error("Apple Pay update error:", error);
                        }
                    });
                }
            },
        };
        // Apple Pay 29-52
        // Inject Custom Styles for Apple Pay button
        const style = document.createElement("style");
        style.innerHTML = `
            .wpwl-form {
                max-width: 100% !important;
            }
            .apple-pay-divider {
                display: flex;
                align-items: center;
                text-align: center;
                width: 100%;
                margin: 20px 0;
            }
            .apple-pay-divider::before,
            .apple-pay-divider::after {
                content: '';
                flex: 1;
                border-bottom: 1px solid #E0E0E0;
            }
            .apple-pay-divider span {
                padding: 0 15px;
                color: #888;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .wpwl-apple-pay-button {
                -webkit-appearance: -apple-pay-button !important;
                -apple-pay-button-type: pay;
                border-radius: 4px;
                cursor: pointer;
                height: 48px;
                width: 100% !important;
                max-width: 100%;
                margin: 10px auto;
                display: block !important;
            }
        `;
        document.head.appendChild(style);

        const script = document.createElement("script");
        script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            const existingScript = document.querySelector(
                `script[src*="paymentWidgets.js"]`,
            );
            if (existingScript) {
                document.body.removeChild(existingScript);
            } // Apple Pay 65
            document.head.removeChild(style);
        }; // }, [checkoutId, isArabic]);
    }, [checkoutId]);

    return (
        <section className="payment-section">

            <div className="container">

                <div className="payment-card">

                    <div className="payment-header">

                        {/* <h2>{t('payment.title', 'Complete Your Payment')}</h2> */}
                        <h2>Complete Your Payment</h2>

                        {/* <p>{t('payment.subtitle', 'Secure and fast payment processing')}</p> */}
                        <p>Secure and fast payment processing</p>

                    </div>

                    <form
                        action="/payment-status"
                        className="paymentWidgets"
                        data-brands="MADA VISA MASTER AMEX APPLEPAY"
                    ></form>

                </div>

            </div>

        </section>
    );
};

export default Payment;
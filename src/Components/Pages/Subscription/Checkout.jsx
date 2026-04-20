import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

const SubscriptionCheckout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Get values from URL
    const currency = searchParams.get("currency");
    const planId = searchParams.get("planId");
    const amount = searchParams.get("amount");
    const type = searchParams.get("type");
    const userId = searchParams.get("userId");

    // const checkout = async () => {
    //     try {
    //         setLoading(true);

    //         const res = await axios.post(
    //             "https://artera.com.sa/api/payment/createSubscription",
    //             {
    //                 userId,
    //                 currency,
    //                 planId,
    //                 amount: Number(amount), // convert to number
    //                 type,
    //             }
    //         );

    //         if (res?.data?.error) {
    //             navigate("/subscription-payment-failed");
    //             return;
    //         }
    //         if (res?.results?.entityId) {
    //             const response = await axios.get(`https://artera.com.sa/api/payment/checkSubscription?id=${res?.data?.results?.entityId}&resourcePath=/v1/payments/${res?.data?.results?.entityId}`);
    //             console.log(response);
    //             // if (response.data.error === true) {
    //             //     navigate("/subscription-payment-failed");
    //             // } else {
    //             //     navigate("/subscription-payment-success");
    //             // }
    //         }

    //         // console.log(res.data);
    //         setLoading(false);
    //     } catch (error) {
    //         navigate("/subscription-payment-failed");
    //         setLoading(false);
    //     }
    // };

    const checkout = async () => {

        localStorage.setItem("language", "en");
        try {
            setLoading(true);

            const res = await axios.post(
                "https://artera.com.sa/api/payment/createSubscription",
                {
                    userId,
                    currency,
                    planId,
                    amount: Number(amount),
                    type,
                }
            );

            if (res?.data?.error) {
                navigate("/subscription-payment-failed");
                return;
            }

            const entityId = res?.data?.results?.entityId;
            const checkoutId = res?.data?.results?.payment?.id;

            if (checkoutId) {
                navigate(`/subscription-payment/${checkoutId}?entityId=${entityId}`);
            }

            setLoading(false);
        } catch (error) {
            console.error("Checkout error:", error);
            navigate("/subscription-payment-failed");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currency && planId && amount && type) {
            checkout();
        }
    }, [currency, planId, amount, type, userId]);

    return null;
};

export default SubscriptionCheckout
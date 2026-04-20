import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SubscriptionPaymentStatus = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id"); // Hyperpay appends this on redirect back
  const resourcePath = searchParams.get("resourcePath");

  useEffect(() => {
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.padding = "";
      document.body.style.overflow = "";
    };
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const response = await axios.get(
        `https://artera.com.sa/api/payment/checkSubscription?id=${id}&resourcePath=${resourcePath}`,
      );

      if (response.data.error === true) {
        navigate("/subscription-payment-failed");
      } else {
        navigate("/subscription-payment-success");
      }
    } catch (error) {
      console.log(
        error?.data?.message ||
        error?.message ||
        "An error occurred while checking subscription status.",
      );
      navigate("/subscription-payment-failed");
    }
  };

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  return (
    <section className="payment-section">
      <div className="container">
        <div className="payment-card text-center">
          <div className="payment-header">
            <h2>{t('payment.processingSubscription', 'Processing Your Subscription')}</h2>
            <p>{t('payment.pleaseWait', 'Please do not refresh the page...')}</p>
          </div>
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem', color: '#8A94F9' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPaymentStatus;

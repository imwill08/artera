import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import HomeLayouts from "../Layouts/HomeLayouts";
import AiServices from "../Components/Pages/AiServices/AiServices";
import CameraKit from "../Components/Pages/CameraKit/CameraKit";
import PaymentSuccess from "../Components/Pages/Payment/PaymentSuccess";
import Checkout from "../Components/Pages/Payment/Checkout";
import PaymentFailed from "../Components/Pages/Payment/PaymentFailed";
import Payment from "../Components/Pages/Payment/Payment";
import SubscriptionCheckout from "../Components/Pages/Subscription/Checkout";
import SubscriptionPayment from "../Components/Pages/Subscription/Payment";
import SubscriptionPaymentSuccess from "../Components/Pages/Subscription/PaymentSuccess";
import SubscriptionPaymentFailed from "../Components/Pages/Subscription/PaymentFailed";
import PaymentStatus from "../Components/Pages/Payment/PaymentStatus";
import SubscriptionPaymentStatus from "../Components/Pages/Subscription/SubscriptionPaymentStatus";
import ApplePay from "../Components/Pages/ApplePay/ApplePay";
import ComingSoonLayouts from "../Layouts/ComingSoonLayout";
import ThankYou from "../Components/Pages/Home/ThankYou";
import { changeLanguage } from "../i18n";
import Telr from "../Components/Pages/Telr/Telr";
import PrivacyPolicy from "../Components/Pages/PrivacyPolicy/PrivacyPolicy";
import ContactUs from "../Components/Pages/ContactUs/ContactUs";
import SpPrivacyPolicy from "../Components/Pages/PrivacyPolicy/SpPrivacyPolicy";


const LanguageWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    const isArabic = location.pathname.startsWith("/ar");
    const currentLang = isArabic ? "ar" : "en";
    changeLanguage(currentLang);
  }, [location.pathname]);

  return <Outlet />;
};

const baseRoutes = [
  {
    index: true,
    element: <HomeLayouts />,
  },
  {
    path: "coming-soon",
    element: <ComingSoonLayouts />,
  },
  {
    path: "camera-kit",
    element: <CameraKit />,
  },
  {
    path: "ai-services",
    element: <AiServices />,
  },
  {
    path: "thank-you",
    element: <ThankYou />,
  },
  {
    path: "privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "sp-privacy-policy",
    element: <SpPrivacyPolicy />,
  },
  {
    path: "contact-us",
    element: <ContactUs />,
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
  {
    path: "payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "payment-failed",
    element: <PaymentFailed />,
  },
  {
    path: "payment/:checkoutId",
    element: <Payment />,
  },
  {
    path: "apple-pay",
    element: <ApplePay />,
  },
  {
    path: "payment-status",
    element: <PaymentStatus />,
  },
  {
    path: "subscription-checkout",
    element: <SubscriptionCheckout />,
  },
  {
    path: "subscription-payment/:checkoutId",
    element: <SubscriptionPayment />,
  },
  {
    path: "subscription-payment-success",
    element: <SubscriptionPaymentSuccess />,
  },
  {
    path: "subscription-payment-status",
    element: <SubscriptionPaymentStatus />,
  },
  {
    path: "subscription-payment-failed",
    element: <SubscriptionPaymentFailed />,
  },

  {
    path: "telr",
    element: <Telr />,
  },

  {
    path: "privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "contact-us",
    element: <ContactUs />,
  },
];

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <LanguageWrapper />,
    children: baseRoutes,
  },
  {
    path: "/ar",
    element: <LanguageWrapper />,
    children: baseRoutes,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default Routes;

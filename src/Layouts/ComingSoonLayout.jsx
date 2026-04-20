import React from "react";
// import "../index.css";
// import "../App.css";
import HeaderComingSoon from "../Components/Header/HeaderComingSoon";
import FooterComingSoon from "../Components/Footer/FooterComingSoon";
import ComingSoon from "../Components/Pages/ComingSoon/ComingSoon";
// import { Helmet } from "react-helmet";

const ComingSoonLayouts = () => {
    return (
        <>
            {/* <Helmet>
                <link href="/assets/img/favicon-black.png" rel="icon" />
                <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon" />
                <link
                    href="/assets/vendor/bootstrap/css/bootstrap.min.css"
                    rel="stylesheet"
                />
                <link
                    href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
                    rel="stylesheet"
                />
                <link href="/assets/vendor/remixicon/remixicon.css" rel="stylesheet" />
                <link href="/assets/vendor/owl/owl.carousel.min.css" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
                <link href="/assets/css/style.css" rel="stylesheet" />
                <link href="/assets/css/responsive.css" rel="stylesheet" />
            </Helmet> */}
            <HeaderComingSoon />
            <ComingSoon />
            <FooterComingSoon />
        </>
    );
};

export default ComingSoonLayouts;

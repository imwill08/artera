import React from "react";
import Home from "../Components/Pages/Home/Home";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { Helmet } from "react-helmet";

const HomeLayouts = () => {
  return (
    <>
      <Helmet>
        <link rel="icon" type="image/png" href="/common/img/favicon-black.png" />
        <link href="/common/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/common/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="/common/vendor/aos/aos.css" rel="stylesheet" />
        <link href="/common/vendor/owl/owl.carousel.min.css" rel="stylesheet" />
        <link href="/common/css/main.css" rel="stylesheet" />
      </Helmet>
      <Header />
      <Home />
      <Footer />
    </>
  );
};

export default HomeLayouts;

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const ContactUs = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            <div className="pt-5 mt-5">
                <section className="bxpd bgcolor">
                    <div className="container">
                        <div className="mainheading text-center">
                            <h1>{t("contactUs.title")}</h1>
                            <p className="mt-4 fs-5" style={{ lineHeight: '1.8' }}>{t("contactUs.description")}</p>
                        </div>

                        <div className="row mt-5">
                            <div className="col-lg-4 mb-4 mb-lg-0">
                                <div className="contact-info-card p-4 h-100 bg-white rounded-4 shadow-sm text-center">
                                    <div className="icon-box mb-3 d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(90deg, #29e8c3, #8a94f9)' }}>
                                        <i className="bi bi-envelope text-white fs-3"></i>
                                    </div>
                                    <h3>{t("contactUs.emailTitle")}</h3>
                                    <a href="mailto:info@artelligence.com" className="fs-5 text-dark text-decoration-none">info@artelligence.com</a>
                                </div>
                            </div>

                            <div className="col-lg-4 mb-4 mb-lg-0">
                                <div className="contact-info-card p-4 h-100 bg-white rounded-4 shadow-sm text-center">
                                    <div className="icon-box mb-3 d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(90deg, #8a94f9, #f7cbf7)' }}>
                                        <i className="bi bi-telephone text-white fs-3"></i>
                                    </div>
                                    <h3>{t("contactUs.phoneTitle")}</h3>
                                    <a href="tel:+966507792717" className="fs-5 text-dark text-decoration-none" dir="ltr">+966 50 779 2717</a>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="contact-info-card p-4 h-100 bg-white rounded-4 shadow-sm text-center">
                                    <div className="icon-box mb-3 d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(90deg, #f7cbf7, #29e8c3)' }}>
                                        <i className="bi bi-geo-alt text-white fs-3"></i>
                                    </div>
                                    <h3>{t("home.proudlySaudi")}</h3>
                                    <p className="fs-5 mb-0">Saudi Arabia</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;
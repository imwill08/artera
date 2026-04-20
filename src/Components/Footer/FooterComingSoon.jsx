import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FooterComingSoon = () => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const location = useLocation();

    const getLink = (hash) => {
        return location.pathname === '/' ? hash : `/${hash}`;
    };

    return (
        <footer id="footer" className="footermain">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-md-0 mb-5">
                        <div className="footerabout">
                            <img
                                className="mb-4"
                                src="/common/img/logofooter.webp"
                                alt="Artera Footer Logo"
                            />
                            <div className="d-flex align-items-center mb-4">
                                <a className="socialicon" href="https://www.instagram.com/artera.sa/" target="_blank" rel="noopener noreferrer">
                                    <img src="/common/img/instagram.webp" alt="Instagram" />
                                </a>
                                <a className="socialicon " href="https://www.linkedin.com/company/artera-sa/" target="_blank" rel="noopener noreferrer">
                                    <img src="/common/img/linkedin.webp" alt="LinkedIn" />
                                </a>
                                <a className="socialicon" href="https://www.tiktok.com/@artera.sa?_r=1&_t=ZS-92FD3KNlk6Z" target="_blank" rel="noopener noreferrer">
                                    <img src="/common/img/tiktok.webp" alt="TikTok" />
                                </a>
                            </div>
                            <div className="d-flex">
                                <a className="aboutlinks" href="https://forms.office.com/pages/responsepage.aspx?id=KUryyKRYkESL8nItMS-U7O7NeKyDktdLmgOfVvac0vlUNkFJVE8xSE5TUE1KRDc4MlFaWjlKNUw3Uy4u&route=shorturl" target="_blank" rel="noopener noreferrer">
                                    {t('footer.earlyRegister')}
                                </a>
                                <a className="aboutlinks" href="https://forms.office.com/pages/responsepage.aspx?id=KUryyKRYkESL8nItMS-U7O7NeKyDktdLmgOfVvac0vlUOTVRME82SEI3Q1lYTlEwR0Y0RkpXQ0tYTy4u&route=shorturl" target="_blank" rel="noopener noreferrer">
                                    {" "}
                                    {t('footer.joinHeroProgram')}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-md-0 mb-5 d-flex justify-content-center">
                        <div className="footerbox">
                            <h2>{t('footer.quickLinks')}</h2>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href={isArabic ? "/assets/img/termofusearabic.pdf" : "/assets/img/termofuse.pdf"} target="_blank" rel="noopener noreferrer">{t('footer.termsOfUse')}</a>
                                </li>
                                <li>
                                    <a href={isArabic ? "/assets/img/privacypolicyarabic.pdf" : "/assets/img/privacypolicy.pdf"} target="_blank" rel="noopener noreferrer">{t('footer.privacyPolicy')}</a>
                                </li>
                                <li>
                                    <a href={getLink("#aboutus")}>{t('footer.aboutUs')}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4 d-flex justify-content-center">
                        <div className="footerbox">
                            <h2>{t('footer.contactUs')}</h2>
                            <div className="d-flex align-items-center">
                                <a className="socialicon whstupiconshow" href="#">
                                    <img src="/assets/img/phone_chat.png" alt="Phone" />
                                </a>
                                <a className="linkss" href="https://api.whatsapp.com/send?phone=966507792717" target="_blank" rel="noopener noreferrer" dir="ltr">
                                    +966 50 779 2717
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mt-5">
                        <div className="copyright py-3 text-center">
                            {t('footer.copyright')}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterComingSoon;

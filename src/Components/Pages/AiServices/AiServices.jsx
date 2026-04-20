import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import HeaderComingSoon from '../../Header/HeaderComingSoon';
import FooterComingSoon from '../../Footer/FooterComingSoon';

const AiServices = () => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <HeaderComingSoon />
            <div id="services" className="ourworks py-md-5 py-4">
                <div className="container py-md-3">
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <div className="commanheader text-center">
                                <h2>{t('home.trySignatureServices')} <span>{t('home.signatureAi')}</span> {t('home.services')}</h2>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row align-items-center mb-5">
                                <div className="col-md-4">
                                    <div className="servicesimg">
                                        <img src="/assets/img/color.jpg" alt="Services 1" />
                                    </div>
                                </div>
                                <div className="col-md-8 ps-md-4">
                                    <div className="servicescontent mt-md-0 mt-4">
                                        <h3>{t('home.colorGlow')}</h3>
                                        <p>{t('home.colorGlowDesc')}</p>
                                        <a className="themebtn1 px-4" href="#">{t('home.pay')}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-md-8 pe-md-4 order-md-0 order-1">
                                    <div className="servicescontent mt-md-0 mt-4">
                                        <h3>{t('home.beautyLine')}</h3>
                                        <p>{t('home.beautyLineDesc')}</p>
                                        <a className="themebtn1 px-4" href="#">{t('home.pay')}</a>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="servicesimg">
                                        <img src="/assets/img/beauty.jpg" alt="Services 2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComingSoon />
        </>
    )
}

export default AiServices
import React from 'react'
import { useTranslation } from "react-i18next";
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'

const ThankYou = () => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    return (
        <div className={isArabic ? "rtl" : ""}>
            <Header />
            <div className="thankyoupage">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="thankyoutext text-center">
                                <h1>{t('thankYou.title')}</h1>
                                <h2>{t('thankYou.subtitle')}</h2>
                                <p>{t('thankYou.description')}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default ThankYou

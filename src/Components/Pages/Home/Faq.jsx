import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const Faq = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqList = [
        { q: t("home.faqQ1"), a: t("home.faqA1") },
        { q: t("home.faqQ2"), a: t("home.faqA2") },
        { q: t("home.faqQ3"), a: t("home.faqA3") },
        { q: t("home.faqQ4"), a: t("home.faqA4") },
        { q: t("home.faqQ5"), a: t("home.faqA5") },
        { q: t("home.faqQ6"), a: t("home.faqA6") },
        { q: t("home.faqQ7"), a: t("home.faqA7") },
        { q: t("home.faqQ8"), a: t("home.faqA8") },
    ];

    return (
        <section id="faqsection" className="comm_faq bgcolor1 bxpd">
            <div className="container">
                <div className="mainheading">
                    <h2 dangerouslySetInnerHTML={{ __html: t('home.faqTitle') }} />
                </div>
                <div className="row">
                    {faqList.map((item, index) => (
                        <div className="col-md-6 mb-4" key={index}>
                            <div className={`faq_box ${activeIndex === index ? "active" : ""}`}>

                                <div
                                    className="faq_box_head"
                                    onClick={() => toggleFaq(index)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {item.q}
                                </div>

                                {activeIndex === index && (
                                    <div className="faq_data">
                                        <p>{item.a}</p>
                                    </div>
                                )}

                            </div>
                        </div>
                    ))}
                    {/* <div className="col-md-6">
                        <div className="faq_box">
                            <div className="faq_box_head">
                                {t('home.faqQ1')}
                            </div>
                            <div className="faq_data">
                                <p>{t('home.faqA1')}</p>
                            </div>
                        </div>
                        <div className="faq_box">
                            <div className="faq_box_head">
                                {t('home.faqQ2')}
                            </div>
                            <div className="faq_data">
                                <p>{t('home.faqA2')}</p>
                            </div>
                        </div>
                        <div className="faq_box">
                            <div className="faq_box_head">
                                {t('home.faqQ3')}
                            </div>
                            <div className="faq_data">
                                <p>{t('home.faqA3')}</p>
                            </div>
                        </div>
                        <div className="faq_box">
                            <div className="faq_box_head">
                                {t('home.faqQ4')}
                            </div>
                            <div className="faq_data">
                                <p>{t('home.faqA4')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-4">
                        <div className="faq_box">
                            <div className="faq_box_head">
                                {t('home.faqQ5')}
                            </div>
                            <div className="faq_data">
                                <p>{t('home.faqA5')}</p>
                            </div>
                        </div>
                        <div className="faq_box">
                            <div className="faq_box_head">
                                {t('home.faqQ6')}
                            </div>
                            <div className="faq_data">
                                <p>{t('home.faqA6')}</p>
                            </div>
                        </div>
                        <div className="faq_box">
                            <div className="faq_box_head">
                                {t('home.faqQ7')}
                            </div>
                            <div className="faq_data">
                                <p>{t('home.faqA7')}</p>
                            </div>
                        </div>
                        <div className="faq_box">
                            <div className="faq_box_head">
                                {t('home.faqQ8')}
                            </div>
                            <div className="faq_data">
                                <p>{t('home.faqA8')}</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default Faq
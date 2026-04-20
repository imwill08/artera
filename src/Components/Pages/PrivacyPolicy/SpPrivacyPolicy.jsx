import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const SpPrivacyPolicy = () => {
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
                            <h1>{t("spPrivacyPolicy.title")}</h1>
                            <p className="mt-2"><strong>{t("spPrivacyPolicy.effectiveDate")}</strong></p>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="privacy-content mainheading text-start">

                                    <div className="mb-5">
                                        <h3>{t("spPrivacyPolicy.definitions.title")}</h3>
                                        <p dangerouslySetInnerHTML={{ __html: t("spPrivacyPolicy.definitions.personalData") }} />
                                        <p dangerouslySetInnerHTML={{ __html: t("spPrivacyPolicy.definitions.dataProcessing") }} />
                                        <p dangerouslySetInnerHTML={{ __html: t("spPrivacyPolicy.definitions.authorizedEntities") }} />
                                        <p dangerouslySetInnerHTML={{ __html: t("spPrivacyPolicy.definitions.platform") }} />
                                    </div>

                                    <div className="mb-5">
                                        <h3>{t("spPrivacyPolicy.scope.title")}</h3>
                                        <p>{t("spPrivacyPolicy.scope.content")}</p>
                                    </div>

                                    <div className="mb-5">
                                        <h3>{t("spPrivacyPolicy.dataCollected.title")}</h3>
                                        <p>{t("spPrivacyPolicy.dataCollected.content")}</p>
                                    </div>

                                    <div className="mb-5">
                                        <h3>{t("spPrivacyPolicy.useOfData.title")}</h3>
                                        <p>{t("spPrivacyPolicy.useOfData.content")}</p>
                                    </div>

                                    <div className="mb-5">
                                        <h3>{t("spPrivacyPolicy.dataSharing.title")}</h3>
                                        <p>{t("spPrivacyPolicy.dataSharing.content")}</p>
                                    </div>

                                    <div className="mb-5">
                                        <h3>{t("spPrivacyPolicy.dataProtection.title")}</h3>
                                        <p>{t("spPrivacyPolicy.dataProtection.content")}</p>
                                    </div>

                                    <div className="mb-5">
                                        <h3>{t("spPrivacyPolicy.spRights.title")}</h3>
                                        <p>{t("spPrivacyPolicy.spRights.content")}</p>
                                    </div>

                                    <div className="mb-5">
                                        <h3>{t("spPrivacyPolicy.dataRetention.title")}</h3>
                                        <p>{t("spPrivacyPolicy.dataRetention.content")}</p>
                                    </div>

                                    <div className="mb-5">
                                        <h3>{t("spPrivacyPolicy.amendments.title")}</h3>
                                        <p>{t("spPrivacyPolicy.amendments.content")}</p>
                                    </div>

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

export default SpPrivacyPolicy;
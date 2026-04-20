import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const PrivacyPolicy = () => {
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
                            <h1>{t("privacyPolicy.title")}</h1>
                            <p className="mt-2"><strong>{t("privacyPolicy.effectiveDate")}</strong></p>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="privacy-content mainheading text-start">

                                    <div className="mb-5">
                                        <h3>{t("privacyPolicy.definitions.title")}</h3>
                                        <p dangerouslySetInnerHTML={{ __html: t("privacyPolicy.definitions.personalData") }} />
                                        <p dangerouslySetInnerHTML={{ __html: t("privacyPolicy.definitions.dataProcessing") }} />
                                        <p dangerouslySetInnerHTML={{ __html: t("privacyPolicy.definitions.authorizedEntities") }} />
                                        <p dangerouslySetInnerHTML={{ __html: t("privacyPolicy.definitions.platform") }} />
                                    </div>

                                    <div className="mb-5">
                                        <h3>{t("privacyPolicy.dataCollected.title")}</h3>
                                        <p>{t("privacyPolicy.dataCollected.content")}</p>
                                    </div>

                                    <div className="mb-5">
                                        <h3>{t("privacyPolicy.useOfData.title")}</h3>
                                        <p>{t("privacyPolicy.useOfData.content")}</p>
                                    </div>

                                    <div className="mb-5">
                                        <h3>{t("privacyPolicy.dataSharing.title")}</h3>
                                        <p>{t("privacyPolicy.dataSharing.content")}</p>
                                    </div>

                                    <div className="mb-5">
                                        <h3>{t("privacyPolicy.dataProtection.title")}</h3>
                                        <p>{t("privacyPolicy.dataProtection.content")}</p>
                                    </div>

                                    <div className="mb-5">
                                        <h3>{t("privacyPolicy.clientRights.title")}</h3>
                                        <p>{t("privacyPolicy.clientRights.content")}</p>
                                    </div>

                                    <div className="mb-5">
                                        <h3>{t("privacyPolicy.amendments.title")}</h3>
                                        <p>{t("privacyPolicy.amendments.content")}</p>
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

export default PrivacyPolicy;
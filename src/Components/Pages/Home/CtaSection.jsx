import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const CtaSection = () => {
    const { t } = useTranslation();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const countdownDate = new Date("April 21, 2026 00:00:00").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, []);
    return (
        <div className="ctasection py-md-5 py-4">
            <div className="container py-md-3">
                <div className="row align-items-center">
                    <div className="col-lg-4">
                        <div className="ctaimg">
                            <img className="img-fluid" src="/assets/img/s1.png" alt="CTA" />
                        </div>
                    </div>
                    <div className="col ps-lg-5">
                        <div className="ctacontent">
                            <p>{t('home.becomeArtist')} <br /> {t('home.arteraBusinessApp')}</p>
                            <div className="downloadpartt">
                                {/* countdown timer  */}
                                {/* <div className="timerbox d-flex mb-4 mt-4">
                                    <div className="timerinner me-4">
                                        <div className="d-flex mb-2">
                                            <div className="countnumber me-2" dir="ltr">{timeLeft.days}</div>
                                        </div>
                                        <div className="timerbtm">{t('home.days')}</div>
                                    </div>
                                    <div className="timerinner me-4">
                                        <div className="d-flex mb-2">
                                            <div className="countnumber me-2" dir="ltr">{timeLeft.hours}</div>
                                        </div>
                                        <div className="timerbtm">{t('home.hours')}</div>
                                    </div>
                                    <div className="timerinner me-4">
                                        <div className="d-flex mb-2">
                                            <div className="countnumber me-2" dir="ltr">{timeLeft.minutes}</div>
                                        </div>
                                        <div className="timerbtm">{t('home.minutes')}</div>
                                    </div>
                                    <div className="timerinner">
                                        <div className="d-flex mb-2">
                                            <div className="countnumber me-2" dir="ltr">{timeLeft.seconds}</div>
                                        </div>
                                        <div className="timerbtm">{t('home.seconds')}</div>
                                    </div>
                                </div> */}
                                {/* contdown end */}
                                <span>{t('home.downloadArtera')}</span>
                                <div className=" downloadbtn  gap-3 d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-center">
                                    <a className="" href="#"><img src="/assets/img/appstrore.png" alt="App Store" /></a>
                                    <a href="#"><img src="/assets/img/googleplay.png" alt="Google Play" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CtaSection
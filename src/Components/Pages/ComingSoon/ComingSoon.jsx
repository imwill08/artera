import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ComingSoon = () => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const location = useLocation();

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [workVideoPlaying, setWorkVideoPlaying] = useState(false);

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    useEffect(() => {
        const countdownDate = new Date("March 1, 2026 00:00:00").getTime();

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

    // Reset videos when language changes
    useEffect(() => {
        const meetTaraVideo = document.getElementById('meetTaraVideo');
        const workVideo = document.getElementById('workVideo');

        if (meetTaraVideo) {
            meetTaraVideo.pause();
            meetTaraVideo.currentTime = 0;
            meetTaraVideo.load();
            setVideoPlaying(false);
        }

        if (workVideo) {
            workVideo.pause();
            workVideo.currentTime = 0;
            workVideo.load();
            setWorkVideoPlaying(false);
        }
    }, [i18n.language]);

    return (
        <>
            <div id="meettara" className="commingsoonbanner py-md-5 py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 mb-lg-0 mb-md-4 mb-4">
                            <div className="soonbannertext">
                                <div className="proudbox">
                                    {t('home.proudlySaudi')}
                                    <div className="proudicon">
                                        <img src="/assets/img/saudi.svg" alt />
                                    </div>
                                </div>
                                <span>{t('home.headline')}</span>
                                <h1>{t('home.comingSoon')}</h1>
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
                                <p className="text-justify">
                                    {t('home.description')}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-5 custom-left">
                            <div className="meetbox">
                                <div
                                    className="meetimg"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <video
                                        key={`meetTaraVideo-${i18n.language}`}
                                        id="meetTaraVideo"
                                        poster="/assets/img/tara.jpg"
                                        playsInline
                                        webkit-playsinline="true"
                                        x5-playsinline="true"
                                        controls={false}
                                        preload="metadata"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            maxWidth: '100%',
                                            objectFit: 'cover'
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            console.log('video clicked');
                                            const video = e.target;
                                            if (video.paused) {
                                                const playPromise = video.play();
                                                if (playPromise !== undefined) {
                                                    playPromise
                                                        .then(() => {
                                                            setVideoPlaying(true);
                                                        })
                                                        .catch(err => {
                                                            console.log('Play failed:', err);
                                                            setVideoPlaying(false);
                                                        });
                                                }
                                            } else {
                                                video.pause();
                                                setVideoPlaying(false);
                                            }
                                        }}
                                        onPlay={() => setVideoPlaying(true)}
                                        onPause={() => setVideoPlaying(false)}
                                        onEnded={() => setVideoPlaying(false)}
                                    >
                                        <source src={isArabic ? "https://d3j9ctxoe8bmk2.cloudfront.net/tarasubtarabic.mp4" : "https://d3j9ctxoe8bmk2.cloudfront.net/tara-english.mp4"} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    {!videoPlaying && (
                                        <div
                                            className="plybtn"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                const video = document.getElementById('meetTaraVideo');
                                                if (video && video.paused) {
                                                    const playPromise = video.play();
                                                    if (playPromise !== undefined) {
                                                        playPromise
                                                            .then(() => {
                                                                setVideoPlaying(true);
                                                            })
                                                            .catch(err => {
                                                                console.log('Play failed:', err);
                                                                setVideoPlaying(false);
                                                            });
                                                    }
                                                }
                                            }}
                                        >
                                            <img src="/assets/img/play.svg" alt="Play Button" />
                                        </div>
                                    )}
                                </div>
                                <div className="meetdetails text-center pt-4">
                                    <h2>{t('home.meetTaraTitle')}</h2>
                                    <span>{t('home.meetTaraSubtitle')}</span>
                                    <a href="https://forms.office.com/pages/responsepage.aspx?id=KUryyKRYkESL8nItMS-U7O7NeKyDktdLmgOfVvac0vlUNkFJVE8xSE5TUE1KRDc4MlFaWjlKNUw3Uy4u&route=shorturl" target="_blank" rel="noopener noreferrer">
                                        {t('home.registerNow')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="ourstory" className="ourstory py-md-5 py-4">
                <div className="container py-md-3">
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <div className="commanheader text-center">
                                <h2>
                                    {t('home.ourStoryTitle')}
                                </h2>
                            </div>
                        </div>
                        <div className="col-md-auto">
                            <div className="storylogo mx-auto mb-4 ">
                                <img src="/common/img/storylogo.webp" alt />
                            </div>
                        </div>
                        <div className="col ps-md-4">
                            <div className="storycontent">
                                <p className="text-justify">
                                    {t('home.storyParagraph1')}
                                </p>
                                <p className="text-justify">
                                    {t('home.storyParagraph2')}
                                </p>
                                <p className="text-justify">
                                    {t('home.storyParagraph3')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="heroprogram" className="ourheroprogram py-md-5 py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 mb-md-5 mb-4">
                            <div className="commanheader text-center">
                                <h2>
                                    {t('home.heroProgramTitle')} <span><Link to="/assets/img/Hero-Program-v2-english.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{t('home.heroProgramTitleSpan')}</Link></span> {t('home.heroProgramSubtitle')}
                                </h2>
                                <p>
                                    "{t('home.heroProgramDescription')}"
                                </p>
                                <a className="themebtn1" href="https://forms.office.com/pages/responsepage.aspx?id=KUryyKRYkESL8nItMS-U7O7NeKyDktdLmgOfVvac0vlUOTVRME82SEI3Q1lYTlEwR0Y0RkpXQ0tYTy4u&route=shorturl" target="_blank" rel="noopener noreferrer">
                                    {t('home.joinNow')}
                                </a>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-6">
                                    <a
                                        // href="/assets/img/blank_hero_program.pdf"
                                        // target="_blank"
                                        className="ourherprogrambox"
                                    >
                                        <img src="/assets/img/heroprogmramicon1.png" alt />
                                        <h3>{t('home.unlockPremium')}</h3>
                                    </a>
                                </div>
                                <div className="col-md-6">
                                    <a
                                        // href="/assets/img/blank_hero_program.pdf"
                                        // target="_blank"
                                        className="ourherprogrambox"
                                    >
                                        <img src="/assets/img/heroprogmramicon2.png" alt />
                                        <h3>{t('home.tapIntoMarketing')}</h3>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="showcases" className="ourworks py-md-5 py-4">
                <div className="container py-md-3">
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <div className="commanheader text-center">
                                <h2>
                                    {t('home.showcasesTitle')} <span>{t('home.showcasesTitleSpan')}</span>
                                </h2>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="ourworksmain">
                                <div className="video-wrapper">
                                    <video
                                        key={`workVideo-${i18n.language}`}
                                        id="workVideo"
                                        className="workvideo"
                                        poster="/assets/img/hero-thumbnail.png"
                                        playsInline
                                        controls={false}
                                        preload="metadata"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            const video = e.currentTarget;
                                            if (video && video.paused) {
                                                const playPromise = video.play();
                                                if (playPromise !== undefined) {
                                                    playPromise
                                                        .then(() => {
                                                            setWorkVideoPlaying(true);
                                                        })
                                                        .catch(err => {
                                                            console.log('Play failed:', err);
                                                            setWorkVideoPlaying(false);
                                                        });
                                                }
                                            } else if (video) {
                                                video.pause();
                                                setWorkVideoPlaying(false);
                                            }
                                        }}
                                        onPlay={() => setWorkVideoPlaying(true)}
                                        onPause={() => setWorkVideoPlaying(false)}
                                        onEnded={() => setWorkVideoPlaying(false)}
                                    >
                                        <source src={isArabic ? "https://d3j9ctxoe8bmk2.cloudfront.net/altera-Arabic.mp4" : "https://d3j9ctxoe8bmk2.cloudfront.net/altera-english.mp4"} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    {!workVideoPlaying && (
                                        <div
                                            className="plybtn"
                                            id="playButton"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                const video = document.getElementById('workVideo');
                                                if (video && video.paused) {
                                                    const playPromise = video.play();
                                                    if (playPromise !== undefined) {
                                                        playPromise
                                                            .then(() => {
                                                                setWorkVideoPlaying(true);
                                                            })
                                                            .catch(err => {
                                                                console.log('Play failed:', err);
                                                                setWorkVideoPlaying(false);
                                                            });
                                                    }
                                                }
                                            }}
                                        >
                                            <img src="/assets/img/play.svg" alt="Play Button" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="aboutus" className="aboutus py-md-5 py-4">
                <div className="container py-md-3">
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <div className="commanheader text-center">
                                <h2>
                                    {t('home.aboutUsTitle')} <span>{t('home.aboutUsTitleSpan')}</span>
                                </h2>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="storycontent text-center">
                                <p className="text-justify">
                                    {t('home.aboutUsDescription')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComingSoon;

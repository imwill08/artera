import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';

const ServicesSection = () => {
    const { t, i18n } = useTranslation();
    const sliderRef = useRef(null);
    const isMobile = window.innerWidth <= 767;

    useEffect(() => {
        if (isMobile) {
            sliderRef.current.slickGoTo(0);
        }
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };
    return (
        <section id="servicessection" className="maineventbx  bgcolor1 bxpd">
            <div className="container text-center">
                <div className="mainheading">
                    <h2 dangerouslySetInnerHTML={{ __html: t('home.eventTitle') }} />
                </div>
                <div className="eventrow mobileslider">
                    {isMobile
                        ? (
                            <Slider ref={sliderRef} {...settings}>
                                <div className="eventitem">
                                    <p>{t('home.eventTradeShows')}</p>
                                    <img
                                        src="/common/img/trade-shows-and-exhibitions.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p>{t('home.eventProductLaunches')}</p>
                                    <img
                                        src="/common/img/product-launches.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p>{t('home.eventCorporateConferences')}</p>
                                    <img
                                        src="/common/img/corporate-conferences.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p dangerouslySetInnerHTML={{ __html: t('home.eventSeminars') }} />
                                    <img
                                        src="/common/img/seminars-and-workshops.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p dangerouslySetInnerHTML={{ __html: t('home.eventGalasAwards') }} />
                                    <img
                                        src="/common/img/galas-and-awards.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p dangerouslySetInnerHTML={{ __html: t('home.eventMusicEntertainment') }} />
                                    <img
                                        src="/common/img/music-and-entertainment.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p dangerouslySetInnerHTML={{ __html: t('home.eventNetworking') }} />
                                    <img
                                        src="/common/img/networking-events.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p>{t('home.eventFashionShows')}</p>
                                    <img
                                        src="/common/img/fashion-shows.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p>{t('home.eventExecutiveRetreats')}</p>
                                    <img
                                        src="/common/img/executive-retreats.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p dangerouslySetInnerHTML={{ __html: t('home.eventBoardMeetings') }} />
                                    <img
                                        src="/common/img/board-meetings.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p>{t('home.eventInvestorRelations')}</p>
                                    <img
                                        src="/common/img/investor-relations.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p dangerouslySetInnerHTML={{ __html: t('home.eventRedCarpet') }} />
                                    <img
                                        src="/common/img/red-carpet-and-vip-events.webp"
                                        alt=""
                                    />
                                </div>
                            </Slider>
                        ) : (
                            <>
                                <div className="eventitem">
                                    <p>{t('home.eventTradeShows')}</p>
                                    <img
                                        src="/common/img/trade-shows-and-exhibitions.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p>{t('home.eventProductLaunches')}</p>
                                    <img
                                        src="/common/img/product-launches.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p>{t('home.eventCorporateConferences')}</p>
                                    <img
                                        src="/common/img/corporate-conferences.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p dangerouslySetInnerHTML={{ __html: t('home.eventSeminars') }} />
                                    <img
                                        src="/common/img/seminars-and-workshops.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p dangerouslySetInnerHTML={{ __html: t('home.eventGalasAwards') }} />
                                    <img
                                        src="/common/img/galas-and-awards.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p dangerouslySetInnerHTML={{ __html: t('home.eventMusicEntertainment') }} />
                                    <img
                                        src="/common/img/music-and-entertainment.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p dangerouslySetInnerHTML={{ __html: t('home.eventNetworking') }} />
                                    <img
                                        src="/common/img/networking-events.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p>{t('home.eventFashionShows')}</p>
                                    <img
                                        src="/common/img/fashion-shows.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p>{t('home.eventExecutiveRetreats')}</p>
                                    <img
                                        src="/common/img/executive-retreats.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p dangerouslySetInnerHTML={{ __html: t('home.eventBoardMeetings') }} />
                                    <img
                                        src="/common/img/board-meetings.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p>{t('home.eventInvestorRelations')}</p>
                                    <img
                                        src="/common/img/investor-relations.webp"
                                        alt=""
                                    />
                                </div>
                                <div className="eventitem">
                                    <p dangerouslySetInnerHTML={{ __html: t('home.eventRedCarpet') }} />
                                    <img
                                        src="/common/img/red-carpet-and-vip-events.webp"
                                        alt=""
                                    />
                                </div>
                            </>
                        )}

                    {/* Custom Buttons */}
                    {
                        isMobile && (
                            <div className="owl-nav">
                                <button className="border-0" onClick={() => sliderRef.current.slickPrev()}>
                                    <i class="bi bi-chevron-left text-white fs-6"></i>
                                </button>

                                <button className="border-0"
                                    onClick={() => sliderRef.current.slickNext()}
                                >
                                    <i class="bi bi-chevron-right text-white fs-6"></i>
                                </button>
                            </div>
                        )}
                </div>
                {/* <div className="newheadbtn">
                    {" "}
                    <a className="mainbtnn" href="#homesection" onClick={(e) => scrollToSection(e, 'homesection')}>
                        {t('home.joinWaitlistBtn')}
                    </a>
                </div> */}
            </div>
        </section>
    )
}

export default ServicesSection
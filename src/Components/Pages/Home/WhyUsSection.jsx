import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';

const WhyUsSection = () => {
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
    <section id="whyussection" className="mainchoosebx bgcolor1 bxpd">
      <div className="container text-center">
        <div className="mainheading">
          <h2 dangerouslySetInnerHTML={{ __html: t('home.whyChooseUsTitle') }} />
          <p>{t('home.whyChooseUsDesc')}</p>
        </div>
        <div className="rowchoose mobileslider owl-carousel">
          {isMobile
            ? (
              <Slider ref={sliderRef} {...settings}>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/verified-professionals-only.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.verifiedProfessionals')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/privacy.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.privacyPriority')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/transparent-pricing.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.transparentPricing')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/premium-quality.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.premiumQualityStandards')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/reliably-on-time-always.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.onTimeService')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/verified-professionals-only.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.assuredSatisfaction')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/seamless-booking.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.seamlessBooking')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/premium-quality-support.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.dedicatedSupport')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/exclusive-launch-rewards.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.exclusiveRewards')}</h3>
                </div>
              </Slider>
            )
            : (
              <>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/verified-professionals-only.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.verifiedProfessionals')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/privacy.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.privacyPriority')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/transparent-pricing.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.transparentPricing')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/premium-quality.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.premiumQualityStandards')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/reliably-on-time-always.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.onTimeService')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/verified-professionals-only.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.assuredSatisfaction')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/seamless-booking.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.seamlessBooking')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/premium-quality-support.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.dedicatedSupport')}</h3>
                </div>
                <div className="chooseitem">
                  <div className="iconn">
                    <img
                      src="/common/img/exclusive-launch-rewards.webp"
                      alt=""
                    />
                  </div>
                  <h3>{t('home.exclusiveRewards')}</h3>
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

      </div>
    </section>
  )
}

export default WhyUsSection
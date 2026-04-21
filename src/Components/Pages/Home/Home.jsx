import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import WhyUsSection from "./WhyUsSection";
import ServicesSection from "./ServicesSection";
import Faq from "./Faq";
// import CtaSection from "./CtaSection";

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === 'ar';

  const [workVideoPlaying, setWorkVideoPlaying] = useState(false);
  const [taraVideoPlaying, setTaraVideoPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const [subscriberNumber, setSubscriberNumber] = useState("");
  const [countryData, setCountryData] = useState({ dialCode: "966", countryCode: "sa", format: "+... ... ... ..." });

  const taraVideoRef = useRef(null);
  const workVideoRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dynamic Validation based on country format
    const totalFormatDigits = (countryData.format.match(/\./g) || []).length;
    const dialCodeLength = countryData.dialCode.length;
    const expectedSubscriberLength = totalFormatDigits - dialCodeLength;
    const actualLength = subscriberNumber.replace(/\D/g, '').length;

    if (!subscriberNumber || actualLength !== expectedSubscriberLength) {
      setStatusMessage({
        type: "danger",
        text: t("home.invalidPhoneLength", `Please enter a valid ${expectedSubscriberLength}-digit phone number.`)
      });
      return;
    }

    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    // const message = formData.get("message");

    // Use state-managed phone data
    const countryCode = `+${countryData.dialCode}`;
    const phoneNumber = subscriberNumber;

    // Minimum loader display time (1.5 seconds)
    const minDelay = new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const [res] = await Promise.all([
        axios.post("https://artera.com.sa/api/content/claimReward", {
          name,
          email,
          phoneNumber,
          countryCode,
          // message
        }),
        minDelay,
      ]);

      if (res.status === 200 || res.status === 201 || res.data.status === "success" || res.data.success) {
        navigate("/thank-you");
      } else {
        setStatusMessage({
          type: "danger",
          text: res.data.message || t("home.errorMessage", "Something went wrong. Please try again.")
        });
        setLoading(false);
      }
    } catch (error) {
      await minDelay;
      console.error("Form submission error:", error);
      setStatusMessage({
        type: "danger",
        text: t("home.errorMessage", "Something went wrong. Please try again.")
      });
      setLoading(false);
    }
  };

  const handleTaraPlay = () => {
    if (taraVideoRef.current) {
      if (taraVideoRef.current.paused) {
        taraVideoRef.current.play();
        setTaraVideoPlaying(true);
      } else {
        taraVideoRef.current.pause();
        setTaraVideoPlaying(false);
      }
    }
  };

  const handleWorkPlay = () => {
    if (workVideoRef.current) {
      if (workVideoRef.current.paused) {
        const playPromise = workVideoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setWorkVideoPlaying(true))
            .catch(err => console.log('Play failed:', err));
        }
      } else {
        workVideoRef.current.pause();
        setWorkVideoPlaying(false);
      }
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Video must be 50% visible to play
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          // Try to unmute and play the intersecting video
          video.muted = false;
          const playPromise = video.play();

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Success: playing with sound
                if (video === taraVideoRef.current) {
                  setTaraVideoPlaying(true);
                  if (workVideoRef.current) {
                    workVideoRef.current.pause();
                    workVideoRef.current.muted = true;
                    setWorkVideoPlaying(false);
                  }
                }
                if (video === workVideoRef.current) {
                  setWorkVideoPlaying(true);
                  if (taraVideoRef.current) {
                    taraVideoRef.current.pause();
                    taraVideoRef.current.muted = true;
                    setTaraVideoPlaying(false);
                  }
                }
              })
              .catch((error) => {
                console.log("Autoplay with audio prevented:", error);
                // Fallback to muted autoplay
                video.muted = true;
                video.play()
                  .then(() => {
                    if (video === taraVideoRef.current) setTaraVideoPlaying(true);
                    if (video === workVideoRef.current) setWorkVideoPlaying(true);
                  })
                  .catch(e => console.log("Muted autoplay also failed:", e));
              });
          }
        } else {
          // Pause and mute when not intersecting
          video.pause();
          video.muted = true;
          if (video === taraVideoRef.current) setTaraVideoPlaying(false);
          if (video === workVideoRef.current) setWorkVideoPlaying(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (taraVideoRef.current) observer.observe(taraVideoRef.current);
    if (workVideoRef.current) observer.observe(workVideoRef.current);

    return () => {
      if (taraVideoRef.current) observer.unobserve(taraVideoRef.current);
      if (workVideoRef.current) observer.unobserve(workVideoRef.current);
    };
  }, []);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const header = document.getElementById('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
    }
  };

  return (
    <>
      <div>
        <>
          <div id="homesection" className="bannersection lnd_banner py-md-5 py-4">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-8 mb-lg-0 mb-md-5 mb-5">
                  <div className="bannercnt">
                    <div className="proudbox">
                      {t('home.proudlySaudi')} <div className="proudicon"><img src="/assets/img/saudi.svg" alt /></div>
                    </div>
                    <h1 dangerouslySetInnerHTML={{ __html: t('home.bannerTitle') }} />
                    <p>{t('home.bannerText')}</p>
                    <div className="downloadpartt">
                      <span>{t('home.downloadArtera')}</span>
                      <div className="d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-center">
                        <Link target="_blank" className="me-4" to="https://apps.apple.com/sa/app/artera/id6757599221"><img src="/assets/img/appstrore.png" alt /></Link>
                        <Link target="_blank" to="https://play.google.com/store/apps/details?id=com.artera_user&pcampaignid=web_share"><img src="assets/img/googleplay.png" alt /></Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="bannerimg">
                    <img className="img-fluid" src="/assets/img/bannerimg.png" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <section id="homesection" className="lnd_banner bgcolor">
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <div className="banneervideo">
                    <video
                      ref={taraVideoRef}
                      src={isArabic ? "https://arteraaa.s3.us-east-1.amazonaws.com/tarasubtarabic.mp4" : "https://arteraaa.s3.us-east-1.amazonaws.com/tara-english.mp4"}
                      controls="true"
                      autoPlay={false}
                      playsInline={true}
                      className="w-full h-auto"
                      poster=""
                    />
                    <ul>
                      <li>{t('home.expertProfessionals')}</li>
                      <li>{t('home.tailoredExperiences')}</li>
                      <li>{t('home.premiumService')}</li>
                    </ul>
                  </div>
                  <div className="bannercnt">
                    <h1 dangerouslySetInnerHTML={{ __html: t('home.bannerTitle') }} />
                    <p>{t('home.bannerText')}</p>
                  </div>
                </div>
                <div id="mainform" className="col-md-5">
                  <div className="shareidesform">
                    <div className="shareidesinner bg1">
                      <div className="formheader  ">
                        <span>{t('home.rewardPointsTitle')}</span>
                      </div>
                      {statusMessage.text && (
                        <div
                          className={`alert alert-${statusMessage.type}`}
                          style={{ margin: "15px 0" }}
                        >
                          {statusMessage.text}
                        </div>
                      )}
                      <form
                        className="row common-contact-form"
                        id="pageContactForm"
                        onSubmit={handleSubmit}
                      >
                        <div className="form-group col-md-12 mb-4">
                          <label>{t('home.formYourName')}</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="form-control"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-12 mb-4">
                          <label>{t('home.formEmail')}</label>
                          <div className="position-relative">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="form-control"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-12 mb-4">
                          <label>{t('home.formPhone')}</label>
                          <div className="row g-2 phone-row-ltr">
                            <div className="col-4 col-md-4">
                              <PhoneInput
                                country={'sa'}
                                value={countryData.dialCode}
                                onChange={(value, data) => {
                                  setCountryData({
                                    dialCode: data.dialCode,
                                    countryCode: data.countryCode,
                                    format: data.format
                                  });
                                }}
                                containerClass="phone-country-container w-100"
                                inputClass="form-control w-100"
                                buttonClass="phone-country-button"
                                dropdownClass="phone-input-dropdown"
                              />
                            </div>
                            <div className="col-8 col-md-8">
                              <input
                                type="tel"
                                className="form-control"
                                placeholder={t('home.formPhonePlaceholder')}
                                value={subscriberNumber}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, '');
                                  const totalFormatDigits = (countryData.format.match(/\./g) || []).length;
                                  const dialCodeLength = countryData.dialCode.length;
                                  const expectedSubscriberLength = totalFormatDigits - dialCodeLength;

                                  if (val.length <= expectedSubscriberLength) {
                                    setSubscriberNumber(val);
                                  }
                                }}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <button
                      type="submit"
                      form="pageContactForm"
                      className="submitbtn"
                      id="submitBtn"
                      disabled={loading}
                    >
                      <span className="btn-text" style={{ display: loading ? "none" : "block" }}>
                        {t('home.formSubmitBtn')}
                      </span>
                      <span className="btn-loader" style={{ display: loading ? "block" : "none" }}>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <div>{t('home.sending')}</div>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          <section>
            <div id="ourstory" className="ourstory py-md-5 py-4">
              <div className="container py-md-3">
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <div className="mainheading text-center">
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
                    <div className="mainheading">
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
          </section>
          <section id="rewardsection" className="reward-section bxpd">
            <div className="container">
              <div className="reward-card newheadbtn">
                <div className="limited-badge">
                  {t('home.limitedSpots')}
                </div>
                <div className="mainheading">
                  <h2 dangerouslySetInnerHTML={{ __html: t('home.exclusiveRewardTitle') }} />
                  <p dangerouslySetInnerHTML={{ __html: t('home.exclusiveRewardDesc') }} />
                  {/* <p>{t('home.exclusiveRewardNote')}</p> */}
                </div>
                <div className="points-box">
                  <div className="points">
                    {t('home.pointsValue')}
                  </div>
                </div>
                <p className="note">
                  {t('home.pointsAccountNote')}
                </p>
                {/* <div className="downloadparttt">*/}
                <span>{t('home.downloadArtera')}</span>
                <div className="d-flex pt-3 align-items-center justify-content-lg-center justify-content-md-center justify-content-center">
                  <Link target="_blank" className="me-4" to="https://apps.apple.com/sa/app/artera/id6757599221"><img src="/assets/img/appstrore.png" alt /></Link>
                  <Link target="_blank" to="https://play.google.com/store/apps/details?id=com.artera_user&pcampaignid=web_share"><img src="assets/img/googleplay.png" alt /></Link>
                  {/* </div> */}
                </div>
                {/* <a href="#homesection" className="cta-btn">
                  {t('home.claimPointsBtn')}
                </a> */}
              </div>
            </div>
          </section>
          <section id="meettarassection" className="maintaracta bgcolor bxpd">
            <div className="container text-center">
              <div className="taractabx">
                <div className="mainheading">
                  <div className="iconn">
                    <img
                      src="/common/img/AI-Companion.webp"
                      alt=""
                    />
                  </div>
                  <h2 dangerouslySetInnerHTML={{ __html: t('home.meetTaraNewTitle') }} />
                  <div className="py-4">
                    <video
                      ref={taraVideoRef}
                      src={isArabic ? "https://arteraaa.s3.us-east-1.amazonaws.com/tarasubtarabic.mp4" : "https://arteraaa.s3.us-east-1.amazonaws.com/tara-english.mp4"}
                      controls
                      autoPlay={false}
                      muted
                      playsInline
                      className="w-100 h-auto rounded-4 shadow-lg"
                      style={{ maxWidth: '800px', margin: '0 auto' }}
                      poster=""
                    />
                  </div>
                  <p>{t('home.meetTaraNewDesc')}</p>
                  <div className="newheadbtn">
                    <a className="mainbtnn" href="#mainform">
                      {t('home.discoverLookBtn')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div id="aiservices" className="ourworks py-md-5 py-4">
              <div className="container py-md-3">
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <div className="mainheading text-center">
                      <h2>{t('home.trySignatureServices')} <span>{t('home.signatureAi')}</span> {t('home.services')}</h2>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row align-items-center mb-5">
                      <div className="col-md-4">
                        <div className="servicesimg">
                          <img src="/assets/img/color.webp" alt="Services 1" />
                        </div>
                      </div>
                      <div className="col-md-8 ps-md-4">
                        <div className="mainheading text-start mt-md-0 mt-4">

                          <h3>{t('home.colorGlow')}</h3>
                          <p>{t('home.colorGlowDesc')}</p>
                          <div className="downloadpartt">
                            <div className=" d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-center">
                              <Link target="_blank" className="me-4" to="https://apps.apple.com/sa/app/artera/id6757599221"><img src="/assets/img/appstrore.png" alt /></Link>
                              <Link target="_blank" to="https://play.google.com/store/apps/details?id=com.artera_user&pcampaignid=web_share"><img src="assets/img/googleplay.png" alt /></Link>
                            </div>
                          </div>
                          {/* <a className="themebtn1 px-4" href="#">{t('home.joinWaitlistBtn')}</a> */}
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-md-8 pe-md-4 order-md-0 order-1">
                        <div className="mainheading text-start mt-md-0 mt-4">
                          <h3>{t('home.beautyLine')}</h3>
                          <p>{t('home.beautyLineDesc')}</p>
                          {/* <a className="themebtn1 px-4" href="#">{t('home.claimwelcome')}</a> */}
                          <div className="downloadpartt">
                            <div className=" d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-center">
                              <Link target="_blank" className="me-4" to="https://apps.apple.com/sa/app/artera/id6757599221"><img src="/assets/img/appstrore.png" alt /></Link>
                              <Link target="_blank" to="https://play.google.com/store/apps/details?id=com.artera_user&pcampaignid=web_share"><img src="assets/img/googleplay.png" alt /></Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="servicesimg">
                          <img src="/assets/img/beauty.webp" alt="Services 2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <WhyUsSection />
          {/* <section id="section" className="rewardcta bgcolor bxpd">
            <div className="container text-center">
              <div className="rewardbx">
                <div className="mainheadingwht">
                  <div className="iconn">
                    <img
                      src="/common/img/get-reward.webp"
                      alt=""
                    />
                  </div>
                  <h2>
                    {t('home.rewardCtaTitle')}
                  </h2>
                  <p>
                    {t('home.rewardCtaDesc')}
                  </p>
                  <div className="newheadbtn">
                    <a className="mainbtnn" href="#mainform">
                      {t('home.claimPointsBtn')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          <ServicesSection />
          <section id="showcasesection" className="youtubebx bgcolor bxpd">
            <div className="container text-center">
              <div className="youtubevideobx">
                <div className="mainheading">
                  <h2 dangerouslySetInnerHTML={{ __html: t('home.showcaseTitle') }} />
                </div>
                <div className="youtubevideo">
                  <video
                    ref={workVideoRef}
                    src={isArabic ? "https://arteraaa.s3.us-east-1.amazonaws.com/altera-Arabic.mp4" : "https://arteraaa.s3.us-east-1.amazonaws.com/altera-english.mp4"}
                    controls
                    autoPlay={false}
                    muted
                    playsInline
                    className="w-100 h-auto rounded-4 shadow-lg"
                    poster=""
                  />
                </div>
              </div>
            </div>
          </section>
          {/* <CtaSection /> */}
          <section id="shareandearnssection" className="maintaracta bgcolor1  bxpd">
            <div className="container text-center">
              <div className="taractabx">
                <div className="mainheading">
                  <div className="iconn">
                    <img
                      src="/common/img/share-and-earn.webp"
                      alt=""
                    />
                  </div>
                  <h2 dangerouslySetInnerHTML={{ __html: t('home.shareEarnTitle') }} />
                  <p>{t('home.shareEarnDesc')}</p>
                  {/* <div className="newheadbtn">
                    <a className="mainbtnn" href="#mainform">
                      {t('home.startEarningsBtn')}
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </section>

          <Faq />
          {/* <CtaSection /> */}
        </>

      </div >

    </>
  );
};

export default Home;

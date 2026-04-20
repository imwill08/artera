import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { changeLanguage } from "../../i18n";

const Header = () => {
  const headerRef = useRef(null);
  const { t, i18n } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');
  const location = useLocation();
  const navigate = useNavigate();

  const getLink = (hash) => {
    const isArabic = location.pathname.startsWith('/ar');
    const prefix = isArabic ? '/ar' : '';

    // If we are on the home page (of either language)
    if (location.pathname === '/' || location.pathname === '/ar') {
      return hash;
    }

    return `${prefix}/${hash}`;
  };

  const handleLanguageChange = (lang) => {
    const isCurrentlyArabic = location.pathname.startsWith('/ar');

    if (lang === 'ar' && !isCurrentlyArabic) {
      // Switch to Arabic: Add /ar prefix
      const newPath = `/ar${location.pathname === '/' ? '' : location.pathname}`;
      navigate(newPath);
    } else if (lang === 'en' && isCurrentlyArabic) {
      // Switch to English: Remove /ar prefix
      const newPath = location.pathname.replace(/^\/ar/, '') || '/';
      navigate(newPath);
    }

    setCurrentLang(lang);
    localStorage.setItem("lang", lang);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  useEffect(() => {
    // Handle smooth scrolling with proper header offset
    const handleSmoothScroll = (e) => {
      const href = e.currentTarget.getAttribute("href");

      // Only handle hash links
      if (href && href.startsWith("#")) {
        e.preventDefault();

        // Close menu if open (for mobile)
        setShowMenu(false);

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Get the header element and its current height (accounts for scrolled state)
          const header = headerRef.current || document.getElementById("header");
          const headerHeight = header ? header.offsetHeight : 127;

          // Calculate the position with offset
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          // Smooth scroll to the target
          window.scrollTo({
            top: Math.max(0, offsetPosition), // Ensure we don't scroll to negative position
            behavior: "smooth",
          });
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      // Attach event listeners to all menu links
      const menuLinks = document.querySelectorAll(".headermenus a, .headerlogo");
      menuLinks.forEach((link) => {
        link.addEventListener("click", handleSmoothScroll);
      });
    }, 100);

    // Cleanup event listeners on unmount
    return () => {
      clearTimeout(timeoutId);
      const menuLinks = document.querySelectorAll(".headermenus a, .headerlogo");
      menuLinks.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, [location.pathname]); // Re-attach when path changes

  const isRTL = currentLang === 'ar';

  const logoElement = (
    <div className="col-auto">
      <a className="headerlogo" href={getLink("#homesection")}>
        <img src="/common/img/logo.webp" alt={t('header.logoAlt')} />
      </a>
    </div>
  );

  const menuElement = (
    <div className="col d-lg-block d-md-none d-none">
      <div className="headermenus">
        <a href={getLink("#ourstory")}>{t('header.ourStory')}</a>
        <a href={getLink("#rewardsection")}>{t('header.reward')}</a>
        <a href={getLink("#meettarassection")}>{t('header.meetTara')}</a>
        <a href={getLink("#aiservices")}>{t('header.aiServices')}</a>
        <a href={getLink("#whyussection")}>{t('header.whyUs')}</a>
        <a href={getLink("#servicessection")}>{t('header.services')}</a>
        <a href={getLink("#showcasesection")}>{t('header.showcase')}</a>
        <a href={getLink("#faqsection")}>{t('header.faq')}</a>
      </div>
    </div>
  );

  const languageElement = (
    <div className="col-auto d-flex align-items-center">
      <button
        className="btn languagedropdown px-3"
        type="button"
        onClick={() => handleLanguageChange(currentLang === 'ar' ? 'en' : 'ar')}
      >
        {currentLang === 'ar' ? 'English' : 'العربية'}
      </button>
      <div className="d-lg-none d-md-block d-md-block ms-3">
        <button
          className="menubar btn border-0 p-0 shadow-none bg-transparent"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <img
            src="/common/img/bar-chart-horizontal-line.webp"
            alt=""
          />
        </button>
        <div className={`headermenus ${showMenu ? 'show_menubar' : ''}`}>
          {/* <a href={getLink("#homesection")} onClick={() => setShowMenu(false)}>{t('header.appDownload')}</a> */}
          <a href={getLink("#ourstory")} onClick={() => setShowMenu(false)}>{t('header.ourStory')}</a>
          <a href={getLink("#rewardsection")} onClick={() => setShowMenu(false)}>{t('header.reward')}</a>
          <a href={getLink("#meettarassection")} onClick={() => setShowMenu(false)}>{t('header.meetTara')}</a>
          <a href={getLink("#aiservices")} onClick={() => setShowMenu(false)}>{t('header.aiServices')}</a>
          <a href={getLink("#whyussection")} onClick={() => setShowMenu(false)}>{t('header.whyUs')}</a>
          <a href={getLink("#servicessection")} onClick={() => setShowMenu(false)}>{t('header.services')}</a>
          <a href={getLink("#showcasesection")} onClick={() => setShowMenu(false)}>{t('header.showcase')}</a>
          <a href={getLink("#faqsection")} onClick={() => setShowMenu(false)}>{t('header.faq')}</a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showMenu && <div className="menu-backdrop" onClick={() => setShowMenu(false)}></div>}
      <div className="headermain newheadbtn" id="header" ref={headerRef}>
        <div className="container">
          <div className={`row align-items-center justify-content-between ${isRTL ? 'header-rtl' : ''}`}>
            {isRTL ? (
              <>
                {languageElement}
                {menuElement}
                {logoElement}
              </>
            ) : (
              <>
                {logoElement}
                {menuElement}
                {languageElement}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
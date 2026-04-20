import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../../i18n";

const HeaderComingSoon = () => {
    const { t, i18n } = useTranslation();
    const [showMenu, setShowMenu] = useState(false);
    const [currentLang, setCurrentLang] = useState(i18n.language || 'en');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentLang(i18n.language);
    }, [i18n.language]);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleLanguageChange = (lang) => {
        const isCurrentlyArabic = location.pathname.startsWith('/ar');

        if (lang === 'ar' && !isCurrentlyArabic) {
            const newPath = `/ar${location.pathname === '/' ? '' : location.pathname}`;
            navigate(newPath);
        } else if (lang === 'en' && isCurrentlyArabic) {
            const newPath = location.pathname.replace(/^\/ar/, '') || '/';
            navigate(newPath);
        }

        setCurrentLang(lang);
        localStorage.setItem("lang", lang);
    };

    const isRTL = currentLang === 'ar';

    const getLink = (hash) => {
        const isArabic = location.pathname.startsWith('/ar');
        const prefix = isArabic ? '/ar' : '';

        // If we are on the coming-soon page (of either language)
        if (location.pathname === '/coming-soon' || location.pathname === '/ar/coming-soon') {
            return hash;
        }

        return `${prefix}/coming-soon${hash}`;
    };

    // Header elements
    const logoElement = (
        <div className="col-auto">
            <a className="headerlogo" href={getLink("#meettara")}>
                <img src="assets/img/logo.svg" alt="" />
            </a>
        </div>
    );

    const menuElement = (
        <div className="col d-lg-block d-md-none d-none">
            <div className={`headermenus ${showMenu ? 'show_menubar' : ''}`}>
                <a href={getLink("#ourstory")}>{t('headercomingsoon.ourStory')}</a>
                <a href={getLink("#heroprogram")}>{t('headercomingsoon.heroProgram')}</a>
                <a href={getLink("#showcases")}>{t('headercomingsoon.showcases')}</a>
                <a href={getLink("#aboutus")}>{t('headercomingsoon.contactUs')}</a>
                <Link to={location.pathname.startsWith('/ar') ? "/ar/ai-services" : "/ai-services"}>{t('headercomingsoon.aiServices')}</Link>
            </div>
        </div>
    );

    const languageElement = (
        <div className="col-auto d-flex align-items-center">
            <button
                className="btn languagedropdown"
                type="button"
                onClick={() => handleLanguageChange(currentLang === 'ar' ? 'en' : 'ar')}
            >
                {currentLang === 'ar' ? 'English' : 'العربية'}
            </button>
            <div className="d-lg-none d-md-block d-md-block ms-3">
                <a className="menubar" onClick={toggleMenu}>
                    <img src="/common/img/bar-chart-horizontal-line.webp" alt="Menu" />
                </a>
                <div onClick={toggleMenu} className={`headermenus ${showMenu ? 'show_menubar' : ''}`}>
                    <a href={getLink("#ourstory")} onClick={toggleMenu}>{t('headercomingsoon.ourStory')}</a>
                    <a href={getLink("#heroprogram")} onClick={toggleMenu}>{t('headercomingsoon.heroProgram')}</a>
                    <a href={getLink("#showcases")} onClick={toggleMenu}>{t('headercomingsoon.showcases')}</a>
                    <a href={getLink("#aboutus")} onClick={toggleMenu}>{t('headercomingsoon.contactUs')}</a>
                    <Link to={location.pathname.startsWith('/ar') ? "/ar/ai-services" : "/ai-services"} onClick={toggleMenu}>{t('headercomingsoon.aiServices')}</Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="headermain" id="header">
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
    );
};

export default HeaderComingSoon;

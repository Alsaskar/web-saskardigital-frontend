import { useEffect, useState } from 'react';
import AOS from 'aos';
import PortfolioSection from '../../../modules/homepage/components/PortfolioSection';
import OurClientSection from '../../../modules/homepage/components/OurClientSection';
import ClientFeedbackSection from '../../../modules/homepage/components/ClientFeedbackSection';
import FAQSection from '../../../modules/homepage/components/FAQSection';
import RequestProjectSection from '../../../modules/homepage/components/RequestProjectSection';
import LocationSection from '../../../modules/homepage/components/LocationSection';
import FooterSection from '../../../modules/homepage/components/FooterSection';
import { useTranslation } from "react-i18next";
import { Container, Nav, Navbar as BootstrapNavbar, NavDropdown } from "react-bootstrap";
import "../../../styles/language-switcher.css";

const Layout = () => {
    const [activeCard, setActiveCard] = useState(0);
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);

    const aboutImages = [
        {
            image: '/about-1.jpeg',
            number: '01',
            alt: 'Saskardigital'
        },
        {
            image: '/about-2.jpeg',
            number: '02',
            alt: 'Saskardigital'
        }
    ];

    const nextCard = () => {
        setActiveCard((prev) => (prev + 1) % aboutImages.length);
    };

    const prevCard = () => {
        setActiveCard((prev) => (prev - 1 + aboutImages.length) % aboutImages.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % aboutImages.length);
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [aboutImages.length]);

    useEffect(() => {
        AOS.init({
            duration: 900,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0,
        });

        AOS.refresh();
    }, []);

    // Navbar
    const changeLanguage = async (lng) => {
        await i18n.changeLanguage(lng);
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const currentLanguage = i18n.language?.split("-")[0] || "id";

    return (
        <>
            <main>

                <BootstrapNavbar
                    expand="lg"
                    className={`main-navbar ${scrolled ? "navbar-scrolled" : ""}`}
                >
                    <Container>
                        <BootstrapNavbar.Brand href="/" className="navbar-brand-custom">
                            <div className="brand-mark">
                                <img
                                    src="/saskardigital.ico"
                                    alt="Logo Saskardigital"
                                    style={{ height: 45 }}
                                />
                            </div>

                            <span>SASKARDIGITAL</span>
                        </BootstrapNavbar.Brand>

                        <BootstrapNavbar.Toggle aria-controls="main-navbar-nav">
                            <i className="bi bi-list"></i>
                        </BootstrapNavbar.Toggle>

                        <BootstrapNavbar.Collapse id="main-navbar-nav">
                            <Nav className="navbar-menu">
                                <Nav.Link
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection("about-us");
                                    }}
                                >
                                    {t("navbar.about")}
                                </Nav.Link>

                                <NavDropdown title={t("navbar.services")} id="services-dropdown">
                                    <NavDropdown.Item href="/service/web-company-profile">
                                        {t("navbar.submenu-services.menu-1")}
                                    </NavDropdown.Item>

                                    <NavDropdown.Item href="/service/software-custom">
                                        {t("navbar.submenu-services.menu-2")}
                                    </NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Link href="/portfolio">
                                    {t("navbar.portfolio")}
                                </Nav.Link>

                                <Nav.Link
                                    href="/#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection("location-contact");
                                    }}
                                >
                                    {t("navbar.contact")}
                                </Nav.Link>
                            </Nav>

                            <div className="navbar-right">
                                <div className="language-switcher">
                                    <button
                                        type="button"
                                        className={`language-btn ${currentLanguage === "en" ? "language-active" : ""}`}
                                        onClick={() => changeLanguage("en")}
                                    >
                                        EN
                                    </button>

                                    <button
                                        type="button"
                                        className={`language-btn ${currentLanguage === "id" ? "language-active" : ""}`}
                                        onClick={() => changeLanguage("id")}
                                    >
                                        ID
                                    </button>
                                </div>

                                <div className="social-links">
                                    <a
                                        href="https://www.facebook.com/saskardigital"
                                        aria-label="Facebook"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="bi bi-facebook"></i>
                                    </a>

                                    <a
                                        href="https://www.linkedin.com/company/saskardigital-inovasi-indonesia"
                                        aria-label="LinkedIn"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="bi bi-linkedin"></i>
                                    </a>

                                    <a
                                        href="https://wa.me/6281943206931"
                                        aria-label="WhatsApp"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="bi bi-whatsapp"></i>
                                    </a>

                                    <a
                                        href="https://www.instagram.com/saskardigital"
                                        aria-label="Instagram"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="bi bi-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </BootstrapNavbar.Collapse>
                    </Container>
                </BootstrapNavbar>

                {/* HERO SECTION */}
                <section id="hero">
                    <div className="hero-overlay"></div>

                    <div className="container hero-container">
                        <div className="row align-items-center h-100">

                            <div
                                className="col-lg-6"
                                data-aos="fade-right"
                                data-aos-duration="1000"
                            >
                                <div className="hero-content">
                                    <h1>{t("hero.title")}</h1>

                                    <p data-aos="fade-up" data-aos-delay="200">
                                        {t("hero.description")}
                                    </p>

                                    <div
                                        className="row"
                                        data-aos="fade-up"
                                        data-aos-delay="350"
                                    >
                                        <div className="col-md-6 col-8">
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    scrollToSection("section-consult-project");
                                                }}
                                                className="hero-button hero-button-primary w-100"
                                            >
                                                {t("hero.txt-button-1")}
                                                <i className="bi bi-arrow-right"></i>
                                            </a>
                                        </div>

                                        <div className="col-md-6 col-4">
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    scrollToSection("portfolio");
                                                }}
                                                className="hero-button hero-button-secondary w-100"
                                            >
                                                {t("hero.txt-button-2")}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="col-lg-6 hero-right"
                                data-aos="zoom-in"
                                data-aos-duration="1200"
                                data-aos-delay="200"
                            >
                                <img src="/hero-right.png" alt="" />
                            </div>

                        </div>
                    </div>
                </section>

                {/* ABOUT US SECTION */}
                <section id="about-us">
                    <div className="container">

                        <div
                            className="about-heading"
                            data-aos="fade-down"
                            data-aos-duration="900"
                        >
                            <h5>{t("about.eyebrow")}</h5>
                            <h1>{t("about.title")}</h1>
                        </div>

                        <div className="row about-content-wrapper">

                            <div
                                className="col-md-6"
                                data-aos="fade-right"
                                data-aos-duration="1000"
                            >
                                <div className="about-carousel-wrapper">
                                    <div className="about-card-stack">
                                        {aboutImages.map((item, index) => {
                                            const isActive = index === activeCard;
                                            const isNext = index === (activeCard + 1) % aboutImages.length;

                                            return (
                                                <div
                                                    key={item.number}
                                                    className={`about-card ${isActive ? 'about-card-active' : ''} ${isNext ? 'about-card-next' : ''}`}
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.alt}
                                                    />

                                                    {isActive && (
                                                        <div className="about-slide-overlay">
                                                            <span>{item.number}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div
                                        className="about-carousel-navigation"
                                        data-aos="fade-up"
                                        data-aos-delay="200"
                                    >
                                        <button
                                            type="button"
                                            onClick={prevCard}
                                            aria-label="Previous image"
                                        >
                                            <i className="bi bi-arrow-left"></i>
                                        </button>

                                        <div className="about-carousel-indicator">
                                            <span className="about-carousel-current">
                                                {String(activeCard + 1).padStart(2, '0')}
                                            </span>

                                            <span className="about-carousel-line"></span>

                                            <span className="about-carousel-total">
                                                {String(aboutImages.length).padStart(2, '0')}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={nextCard}
                                            aria-label="Next image"
                                        >
                                            <i className="bi bi-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="col-md-6"
                                data-aos="fade-left"
                                data-aos-duration="1000"
                                data-aos-delay="150"
                            >
                                <div className="about-content">
                                    <p>
                                        <span style={{ color: '#0b609e' }}>
                                            <b>{t("about.brand")}</b>
                                        </span>{" "}
                                        {t("about.description-1")}
                                    </p>

                                    <p>
                                        {t("about.description-2")}
                                    </p>

                                    <div className="about-principles">

                                        <div
                                            className="about-principles-heading"
                                            data-aos="fade-up"
                                            data-aos-delay="250"
                                        >
                                            <span>{t("about.principles.eyebrow")}</span>
                                            <h3>{t("about.principles.title")}</h3>
                                        </div>

                                        <div className="about-principles-list">

                                            <div
                                                className="about-principle-item"
                                                data-aos="fade-up"
                                                data-aos-delay="300"
                                            >
                                                <div className="about-principle-icon">
                                                    <i className="bi bi-bullseye"></i>
                                                </div>

                                                <div className="about-principle-content">
                                                    <h4>
                                                        {t("about.principles.relevant-solutions.title")}
                                                    </h4>
                                                    <p>
                                                        {t("about.principles.relevant-solutions.description")}
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                className="about-principle-item"
                                                data-aos="fade-up"
                                                data-aos-delay="400"
                                            >
                                                <div className="about-principle-icon">
                                                    <i className="bi bi-people"></i>
                                                </div>

                                                <div className="about-principle-content">
                                                    <h4>
                                                        {t("about.principles.collaboration.title")}
                                                    </h4>
                                                    <p>
                                                        {t("about.principles.collaboration.description")}
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                className="about-principle-item"
                                                data-aos="fade-up"
                                                data-aos-delay="500"
                                            >
                                                <div className="about-principle-icon">
                                                    <i className="bi bi-shield-check"></i>
                                                </div>

                                                <div className="about-principle-content">
                                                    <h4>
                                                        {t("about.principles.quality.title")}
                                                    </h4>
                                                    <p>
                                                        {t("about.principles.quality.description")}
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                className="about-principle-item"
                                                data-aos="fade-up"
                                                data-aos-delay="600"
                                            >
                                                <div className="about-principle-icon">
                                                    <i className="bi bi-eye"></i>
                                                </div>

                                                <div className="about-principle-content">
                                                    <h4>
                                                        {t("about.principles.transparency.title")}
                                                    </h4>
                                                    <p>
                                                        {t("about.principles.transparency.description")}
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                className="about-principle-item"
                                                data-aos="fade-up"
                                                data-aos-delay="700"
                                            >
                                                <div className="about-principle-icon">
                                                    <i className="bi bi-headset"></i>
                                                </div>

                                                <div className="about-principle-content">
                                                    <h4>
                                                        {t("about.principles.support.title")}
                                                    </h4>
                                                    <p>
                                                        {t("about.principles.support.description")}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection("services");
                                        }}
                                        className="about-button"
                                        data-aos="fade-up"
                                        data-aos-delay="750"
                                    >
                                        {t("about.txt-button")}
                                        <i className="bi bi-arrow-right"></i>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* SERVICES SECTION */}
                <section id="services">

                    <div
                        className="services-heading"
                        data-aos="zoom-in"
                        data-aos-duration="900"
                    >
                        <h5>{t("services.eyebrow")}</h5>
                        <h1>{t("services.title")}</h1>
                    </div>

                    <div className="services-content mt-5">
                        <div className="container">
                            <div className="row g-4">

                                <div
                                    className="col-lg-6 col-md-6"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    <div className="service-card">
                                        <div className="service-icon">
                                            <i className="bi bi-globe2"></i>
                                        </div>

                                        <div className="service-card-content">
                                            <h3>
                                                {t("services.company-profile.title")}
                                            </h3>
                                            <p>
                                                {t("services.company-profile.description")}
                                            </p>
                                        </div>

                                        <div className="service-link">
                                            <a href="/service/web-company-profile">
                                                <span>
                                                    {t("services.company-profile.txt-button")}
                                                </span>
                                                <i className="bi bi-arrow-up-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col-lg-6 col-md-6"
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >
                                    <div className="service-card">
                                        <div className="service-icon">
                                            <i className="bi bi-window-stack"></i>
                                        </div>

                                        <div className="service-card-content">
                                            <h3>
                                                {t("services.web-application.title")}
                                            </h3>
                                            <p>
                                                {t("services.web-application.description")}
                                            </p>
                                        </div>

                                        <div className="service-link">
                                            <a href="/service/software-custom">
                                                <span>
                                                    {t("services.web-application.txt-button")}
                                                </span>
                                                <i className="bi bi-arrow-up-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col-lg-6 col-md-6"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >
                                    <div className="service-card">
                                        <div className="service-icon">
                                            <i className="bi bi-phone"></i>
                                        </div>

                                        <div className="service-card-content">
                                            <h3>
                                                {t("services.mobile-application.title")}
                                            </h3>
                                            <p>
                                                {t("services.mobile-application.description")}
                                            </p>
                                        </div>

                                        <div className="service-link">
                                            <a href="/service/software-custom">
                                                <span>
                                                    {t("services.mobile-application.txt-button")}
                                                </span>
                                                <i className="bi bi-arrow-up-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col-lg-6 col-md-6"
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                >
                                    <div className="service-card">
                                        <div className="service-icon">
                                            <i className="bi bi-diagram-3"></i>
                                        </div>

                                        <div className="service-card-content">
                                            <h3>
                                                {t("services.business-system.title")}
                                            </h3>
                                            <p>
                                                {t("services.business-system.description")}
                                            </p>
                                        </div>

                                        <div className="service-link">
                                            <a href="/service/software-custom">
                                                <span>
                                                    {t("services.business-system.txt-button")}
                                                </span>
                                                <i className="bi bi-arrow-up-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* HOW WE WORK SECTION */}
                <section id="how-we-work">
                    <div className="container">

                        <div
                            className="how-we-work-heading"
                            data-aos="fade-down"
                            data-aos-duration="900"
                        >
                            <h5>{t("how-we-work.eyebrow")}</h5>
                            <h1>{t("how-we-work.title")}</h1>
                            <p>{t("how-we-work.description")}</p>
                        </div>

                        <div className="how-we-work-content">
                            <div className="how-we-work-line"></div>

                            <div
                                className="how-we-work-item"
                                data-aos="fade-right"
                                data-aos-delay="100"
                            >
                                <div className="how-we-work-number">01</div>
                                <div className="how-we-work-dot"></div>

                                <div className="how-we-work-card">
                                    <span>01</span>
                                    <h3>
                                        {t("how-we-work.steps.understand.title")}
                                    </h3>
                                    <p>
                                        {t("how-we-work.steps.understand.description")}
                                    </p>
                                </div>
                            </div>

                            <div
                                className="how-we-work-item"
                                data-aos="fade-left"
                                data-aos-delay="200"
                            >
                                <div className="how-we-work-number">02</div>
                                <div className="how-we-work-dot"></div>

                                <div className="how-we-work-card">
                                    <span>02</span>
                                    <h3>
                                        {t("how-we-work.steps.plan.title")}
                                    </h3>
                                    <p>
                                        {t("how-we-work.steps.plan.description")}
                                    </p>
                                </div>
                            </div>

                            <div
                                className="how-we-work-item"
                                data-aos="fade-right"
                                data-aos-delay="300"
                            >
                                <div className="how-we-work-number">03</div>
                                <div className="how-we-work-dot"></div>

                                <div className="how-we-work-card">
                                    <span>03</span>
                                    <h3>
                                        {t("how-we-work.steps.build.title")}
                                    </h3>
                                    <p>
                                        {t("how-we-work.steps.build.description")}
                                    </p>
                                </div>
                            </div>

                            <div
                                className="how-we-work-item"
                                data-aos="fade-left"
                                data-aos-delay="400"
                            >
                                <div className="how-we-work-number">04</div>
                                <div className="how-we-work-dot"></div>

                                <div className="how-we-work-card">
                                    <span>04</span>
                                    <h3>
                                        {t("how-we-work.steps.deliver.title")}
                                    </h3>
                                    <p>
                                        {t("how-we-work.steps.deliver.description")}
                                    </p>
                                </div>
                            </div>

                            <div
                                className="how-we-work-item"
                                data-aos="fade-right"
                                data-aos-delay="500"
                            >
                                <div className="how-we-work-number">05</div>
                                <div className="how-we-work-dot"></div>

                                <div className="how-we-work-card">
                                    <span>05</span>
                                    <h3>
                                        {t("how-we-work.steps.support.title")}
                                    </h3>
                                    <p>
                                        {t("how-we-work.steps.support.description")}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* WHY CHOOSE US SECTION */}
                <section id="why-choose-us">
                    <div className="container">

                        <div className="why-choose-us-wrapper">

                            <div
                                className="why-choose-us-intro"
                                data-aos="fade-right"
                                data-aos-duration="1000"
                            >
                                <h5>{t("why-choose-us.eyebrow")}</h5>

                                <h1>
                                    {t("why-choose-us.title")}
                                </h1>

                                <p>
                                    {t("why-choose-us.description")}
                                </p>

                                <div
                                    className="why-choose-us-caption"
                                    data-aos="zoom-in"
                                    data-aos-delay="250"
                                >
                                    <span>
                                        {t("why-choose-us.caption")}
                                    </span>

                                    <i className="bi bi-arrow-down-right"></i>
                                </div>
                            </div>

                            <div className="why-choose-us-list">

                                <div
                                    className="why-choose-us-item"
                                    data-aos="fade-left"
                                    data-aos-delay="100"
                                >
                                    <div className="why-choose-us-number">01</div>

                                    <div className="why-choose-us-item-content">
                                        <h3>
                                            {t("why-choose-us.items.tailored.title")}
                                        </h3>

                                        <p>
                                            {t("why-choose-us.items.tailored.description")}
                                        </p>
                                    </div>

                                    <div className="why-choose-us-arrow">
                                        <i className="bi bi-arrow-up-right"></i>
                                    </div>
                                </div>

                                <div
                                    className="why-choose-us-item"
                                    data-aos="fade-left"
                                    data-aos-delay="200"
                                >
                                    <div className="why-choose-us-number">02</div>

                                    <div className="why-choose-us-item-content">
                                        <h3>
                                            {t("why-choose-us.items.communication.title")}
                                        </h3>

                                        <p>
                                            {t("why-choose-us.items.communication.description")}
                                        </p>
                                    </div>

                                    <div className="why-choose-us-arrow">
                                        <i className="bi bi-arrow-up-right"></i>
                                    </div>
                                </div>

                                <div
                                    className="why-choose-us-item"
                                    data-aos="fade-left"
                                    data-aos-delay="300"
                                >
                                    <div className="why-choose-us-number">03</div>

                                    <div className="why-choose-us-item-content">
                                        <h3>
                                            {t("why-choose-us.items.scalable.title")}
                                        </h3>

                                        <p>
                                            {t("why-choose-us.items.scalable.description")}
                                        </p>
                                    </div>

                                    <div className="why-choose-us-arrow">
                                        <i className="bi bi-arrow-up-right"></i>
                                    </div>
                                </div>

                                <div
                                    className="why-choose-us-item"
                                    data-aos="fade-left"
                                    data-aos-delay="400"
                                >
                                    <div className="why-choose-us-number">04</div>

                                    <div className="why-choose-us-item-content">
                                        <h3>
                                            {t("why-choose-us.items.business-focused.title")}
                                        </h3>

                                        <p>
                                            {t("why-choose-us.items.business-focused.description")}
                                        </p>
                                    </div>

                                    <div className="why-choose-us-arrow">
                                        <i className="bi bi-arrow-up-right"></i>
                                    </div>
                                </div>

                                <div
                                    className="why-choose-us-item"
                                    data-aos="fade-left"
                                    data-aos-delay="500"
                                >
                                    <div className="why-choose-us-number">05</div>

                                    <div className="why-choose-us-item-content">
                                        <h3>
                                            {t("why-choose-us.items.structured.title")}
                                        </h3>

                                        <p>
                                            {t("why-choose-us.items.structured.description")}
                                        </p>
                                    </div>

                                    <div className="why-choose-us-arrow">
                                        <i className="bi bi-arrow-up-right"></i>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* Portfolio Section */}
                <PortfolioSection />

                {/* Our Client Section */}
                <OurClientSection />

                {/* Client Feedback Section */}
                <ClientFeedbackSection />

                {/* FAQ Section */}
                <FAQSection />

                {/* Request Project Section */}
                <div id="section-consult-project">
                    <RequestProjectSection />
                </div>

                {/* Footer Section */}
                <div id="location-contact">
                    <LocationSection />
                </div>

                <FooterSection />

            </main>
        </>
    );
};

export default Layout;
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AOS from "aos";

import NavbarPublic from "../../../../components/NavbarPublic";
import FooterSection from "../../../../modules/homepage/components/FooterSection";
import "./web-company-profile.css";

const Layout = () => {
    const { t } = useTranslation();
    const whatsappNumber = "6281943206931";

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
        AOS.init({
            duration: 850,
            easing: "ease-out-cubic",
            once: true,
            offset: 80,
            delay: 0,
        });

        return () => {
            AOS.refresh();
        };
    }, []);

    return (
        <>
            <NavbarPublic />

            <div id="hero">
                <main className="cp-page">
                    {/* HERO */}
                    <section className="cp-hero">
                        <div className="cp-hero-orb cp-hero-orb-one"></div>
                        <div className="cp-hero-orb cp-hero-orb-two"></div>

                        <div className="container">
                            <div className="cp-hero-grid">
                                <div
                                    className="cp-hero-content"
                                    data-aos="fade-right"
                                    data-aos-duration="1000"
                                >
                                    <span className="cp-eyebrow">
                                        {t("web-company-profile.hero.eyebrow")}
                                    </span>

                                    <h1>
                                        {t("web-company-profile.hero.title")}
                                        <span>
                                            {t("web-company-profile.hero.title-highlight")}
                                        </span>
                                    </h1>

                                    <p>
                                        {t("web-company-profile.hero.description")}
                                    </p>

                                    <div className="cp-hero-actions">
                                        <a
                                            href={`https://wa.me/${whatsappNumber}?text=${t("web-company-profile.hero.whatsapp-message")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cp-btn cp-btn-primary"
                                        >
                                            {t("web-company-profile.hero.btn-consult")}
                                            <i className="bi bi-arrow-up-right"></i>
                                        </a>

                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToSection("portfolio");
                                            }}
                                            className="cp-btn cp-btn-secondary"
                                        >
                                            {t("web-company-profile.hero.btn-portfolio")}
                                            <i className="bi bi-arrow-down"></i>
                                        </a>
                                    </div>

                                    <div
                                        className="cp-hero-note"
                                        data-aos="fade-up"
                                        data-aos-delay="350"
                                    >
                                        <i className="bi bi-check-circle-fill"></i>
                                        <span>
                                            Dibangun sesuai kebutuhan bisnis Anda
                                        </span>
                                    </div>
                                </div>

                                {/* HERO DASHBOARD - TEXT TETAP HARDCODED */}
                                <div
                                    className="cp-hero-visual"
                                    data-aos="fade-left"
                                    data-aos-duration="1100"
                                    data-aos-delay="150"
                                >
                                    <div className="cp-visual-glow"></div>

                                    <div className="cp-main-dashboard">
                                        <div className="cp-dashboard-top">
                                            <div className="cp-dashboard-brand">
                                                <span></span>
                                                <strong>YOUR BUSINESS</strong>
                                            </div>

                                            <div className="cp-dashboard-menu">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>

                                        <div className="cp-dashboard-content">
                                            <div className="cp-dashboard-copy">
                                                <small>
                                                    PROFESSIONAL DIGITAL PRESENCE
                                                </small>

                                                <h3>
                                                    Build Your
                                                    <br />
                                                    Business Online.
                                                </h3>

                                                <p>
                                                    A modern website designed to
                                                    represent your business.
                                                </p>

                                                <div className="cp-dashboard-button">
                                                    Explore Website
                                                    <i className="bi bi-arrow-up-right"></i>
                                                </div>
                                            </div>

                                            <div className="cp-dashboard-image">
                                                <div className="cp-image-shape"></div>

                                                <div className="cp-image-card">
                                                    <i className="bi bi-building"></i>
                                                    <strong>YOUR BRAND</strong>
                                                    <small>EST. 2026</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="cp-dashboard-bottom">
                                            <div>
                                                <strong>01</strong>
                                                <span>About Company</span>
                                            </div>

                                            <div>
                                                <strong>02</strong>
                                                <span>Our Services</span>
                                            </div>

                                            <div>
                                                <strong>03</strong>
                                                <span>Contact Us</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cp-hero-floating cp-hero-floating-one">
                                        <div className="cp-floating-icon">
                                            <i className="bi bi-phone"></i>
                                        </div>

                                        <div>
                                            <strong>Responsive</strong>
                                            <small>Mobile Friendly</small>
                                        </div>
                                    </div>

                                    <div className="cp-hero-floating cp-hero-floating-two">
                                        <div className="cp-floating-icon">
                                            <i className="bi bi-graph-up-arrow"></i>
                                        </div>

                                        <div>
                                            <strong>Professional</strong>
                                            <small>Business Ready</small>
                                        </div>
                                    </div>

                                    <div className="cp-hero-floating cp-hero-floating-three">
                                        <i className="bi bi-stars"></i>
                                        <span>Custom Design</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* TRUST */}
                    <section className="cp-trust">
                        <div className="container">
                            <div className="cp-trust-grid">
                                <div
                                    className="cp-trust-item"
                                    data-aos="fade-up"
                                    data-aos-delay="0"
                                >
                                    <div className="cp-trust-icon">
                                        <i className="bi bi-grid-1x2"></i>
                                    </div>

                                    <div>
                                        <strong>
                                            {t("web-company-profile.trust.modern-design.title")}
                                        </strong>
                                        <span>
                                            {t("web-company-profile.trust.modern-design.description")}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className="cp-trust-item"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    <div className="cp-trust-icon">
                                        <i className="bi bi-phone"></i>
                                    </div>

                                    <div>
                                        <strong>
                                            {t("web-company-profile.trust.responsive.title")}
                                        </strong>
                                        <span>
                                            {t("web-company-profile.trust.responsive.description")}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className="cp-trust-item"
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >
                                    <div className="cp-trust-icon">
                                        <i className="bi bi-code-slash"></i>
                                    </div>

                                    <div>
                                        <strong>
                                            {t("web-company-profile.trust.custom-development.title")}
                                        </strong>
                                        <span>
                                            {t("web-company-profile.trust.custom-development.description")}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className="cp-trust-item"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >
                                    <div className="cp-trust-icon">
                                        <i className="bi bi-bullseye"></i>
                                    </div>

                                    <div>
                                        <strong>
                                            {t("web-company-profile.trust.business-focused.title")}
                                        </strong>
                                        <span>
                                            {t("web-company-profile.trust.business-focused.description")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* PROBLEM */}
                    <section className="cp-problem">
                        <div className="container">
                            <div className="cp-problem-grid">
                                <div
                                    data-aos="fade-right"
                                    data-aos-duration="900"
                                >
                                    <span className="cp-section-label">
                                        {t("web-company-profile.problem.label")}
                                    </span>

                                    <h2>
                                        {t("web-company-profile.problem.title")}
                                        <span>
                                            {t("web-company-profile.problem.title-highlight")}
                                        </span>
                                    </h2>
                                </div>

                                <div
                                    className="cp-problem-content"
                                    data-aos="fade-left"
                                    data-aos-duration="900"
                                    data-aos-delay="150"
                                >
                                    <p>
                                        {t("web-company-profile.problem.description-1")}
                                    </p>

                                    <p>
                                        {t("web-company-profile.problem.description-2")}
                                    </p>

                                    <div
                                        className="cp-problem-highlight"
                                        data-aos="fade-up"
                                        data-aos-delay="300"
                                    >
                                        <i className="bi bi-arrow-right"></i>
                                        <span>
                                            {t("web-company-profile.problem.highlight")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* WHY WEBSITE */}
                    <section className="cp-why">
                        <div className="container">
                            <div
                                className="cp-section-heading"
                                data-aos="fade-up"
                            >
                                <span className="cp-section-label">
                                    {t("web-company-profile.why-website.label")}
                                </span>

                                <h2>
                                    {t("web-company-profile.why-website.title")}
                                    <span>
                                        {t("web-company-profile.why-website.title-highlight")}
                                    </span>
                                </h2>

                                <p>
                                    {t("web-company-profile.why-website.description")}
                                </p>
                            </div>

                            <div className="cp-why-grid">
                                <div
                                    className="cp-why-card"
                                    data-aos="fade-up"
                                    data-aos-delay="0"
                                >
                                    <span>01</span>
                                    <i className="bi bi-shield-check"></i>
                                    <h3>
                                        {t("web-company-profile.why-website.items.credibility.title")}
                                    </h3>
                                    <p>
                                        {t("web-company-profile.why-website.items.credibility.description")}
                                    </p>
                                </div>

                                <div
                                    className="cp-why-card"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    <span>02</span>
                                    <i className="bi bi-layout-text-window"></i>
                                    <h3>
                                        {t("web-company-profile.why-website.items.structured-information.title")}
                                    </h3>
                                    <p>
                                        {t("web-company-profile.why-website.items.structured-information.description")}
                                    </p>
                                </div>

                                <div
                                    className="cp-why-card"
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >
                                    <span>03</span>
                                    <i className="bi bi-search"></i>
                                    <h3>
                                        {t("web-company-profile.why-website.items.discoverable.title")}
                                    </h3>
                                    <p>
                                        {t("web-company-profile.why-website.items.discoverable.description")}
                                    </p>
                                </div>

                                <div
                                    className="cp-why-card"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >
                                    <span>04</span>
                                    <i className="bi bi-arrow-up-right-circle"></i>
                                    <h3>
                                        {t("web-company-profile.why-website.items.new-opportunities.title")}
                                    </h3>
                                    <p>
                                        {t("web-company-profile.why-website.items.new-opportunities.description")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* WHAT YOU GET */}
                    <section className="cp-features">
                        <div className="container">
                            <div className="cp-features-grid">
                                <div
                                    className="cp-features-intro"
                                    data-aos="fade-right"
                                    data-aos-duration="900"
                                >
                                    <span className="cp-section-label">
                                        {t("web-company-profile.features.label")}
                                    </span>

                                    <h2>
                                        {t("web-company-profile.features.title")}
                                        <span>
                                            {t("web-company-profile.features.title-highlight")}
                                        </span>
                                    </h2>

                                    <p>
                                        {t("web-company-profile.features.description")}
                                    </p>

                                    <a
                                        href={`https://wa.me/${whatsappNumber}?text=${t("web-company-profile.hero.whatsapp-message")}`}
                                        className="cp-text-link"
                                    >
                                        {t("web-company-profile.features.button")}
                                        <i className="bi bi-arrow-right"></i>
                                    </a>
                                </div>

                                <div
                                    className="cp-features-list"
                                    data-aos="fade-left"
                                    data-aos-duration="900"
                                    data-aos-delay="150"
                                >
                                    <div className="cp-feature-item">
                                        <div className="cp-feature-number">01</div>
                                        <div>
                                            <h3>
                                                {t("web-company-profile.features.items.custom-design.title")}
                                            </h3>
                                            <p>
                                                {t("web-company-profile.features.items.custom-design.description")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="cp-feature-item">
                                        <div className="cp-feature-number">02</div>
                                        <div>
                                            <h3>
                                                {t("web-company-profile.features.items.responsive.title")}
                                            </h3>
                                            <p>
                                                {t("web-company-profile.features.items.responsive.description")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="cp-feature-item">
                                        <div className="cp-feature-number">03</div>
                                        <div>
                                            <h3>
                                                {t("web-company-profile.features.items.fast-optimized.title")}
                                            </h3>
                                            <p>
                                                {t("web-company-profile.features.items.fast-optimized.description")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="cp-feature-item">
                                        <div className="cp-feature-number">04</div>
                                        <div>
                                            <h3>
                                                {t("web-company-profile.features.items.seo-ready.title")}
                                            </h3>
                                            <p>
                                                {t("web-company-profile.features.items.seo-ready.description")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="cp-feature-item">
                                        <div className="cp-feature-number">05</div>
                                        <div>
                                            <h3>
                                                {t("web-company-profile.features.items.contact-whatsapp.title")}
                                            </h3>
                                            <p>
                                                {t("web-company-profile.features.items.contact-whatsapp.description")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="cp-feature-item">
                                        <div className="cp-feature-number">06</div>
                                        <div>
                                            <h3>
                                                {t("web-company-profile.features.items.developable.title")}
                                            </h3>
                                            <p>
                                                {t("web-company-profile.features.items.developable.description")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* PORTFOLIO */}
                    <section className="cp-portfolio" id="portfolio">
                        <div className="container">
                            <div
                                className="cp-section-heading cp-section-heading-center"
                                data-aos="fade-up"
                            >
                                <span className="cp-section-label">
                                    {t("web-company-profile.portfolio.label")}
                                </span>

                                <h2>
                                    {t("web-company-profile.portfolio.title")}
                                    <span>
                                        {t("web-company-profile.portfolio.title-highlight")}
                                    </span>
                                </h2>

                                <p>
                                    {t("web-company-profile.portfolio.description")}
                                </p>
                            </div>

                            <div className="cp-portfolio-grid">
                                {/* Portfolio cards tetap seperti sebelumnya */}
                                <article
                                    className="cp-portfolio-card"
                                    data-aos="fade-up"
                                    data-aos-delay="0"
                                >
                                    <div className="cp-portfolio-image">
                                        <img
                                            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85"
                                            alt="Website PT Bawika Adhikari Servindo"
                                            loading="lazy"
                                        />

                                        <div className="cp-portfolio-overlay">
                                            <span>
                                                {t("web-company-profile.portfolio.view-project")}
                                            </span>

                                            <a
                                                href="#link-portfolio"
                                                className="cp-portfolio-arrow"
                                                aria-label="View project"
                                            >
                                                <i className="bi bi-arrow-up-right"></i>
                                            </a>
                                        </div>

                                        <div className="cp-portfolio-tag">
                                            COMPANY PROFILE
                                        </div>
                                    </div>

                                    <div className="cp-portfolio-info">
                                        <div className="cp-portfolio-heading">
                                            <span className="cp-portfolio-category">
                                                CATERING & MINING SERVICES
                                            </span>

                                            <h3>
                                                PT Bawika Adhikari Servindo
                                            </h3>

                                            <p>
                                                Website company profile untuk
                                                memperkuat identitas dan digital
                                                presence perusahaan.
                                            </p>
                                        </div>

                                        <div className="cp-portfolio-meta">
                                            <span>
                                                <i className="bi bi-grid"></i>
                                                Company Profile
                                            </span>

                                            <span>
                                                <i className="bi bi-phone"></i>
                                                Responsive
                                            </span>
                                        </div>
                                    </div>
                                </article>

                                <article
                                    className="cp-portfolio-card"
                                    data-aos="fade-up"
                                    data-aos-delay="150"
                                >
                                    <div className="cp-portfolio-image">
                                        <img
                                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=85"
                                            alt="BreathPilates website"
                                            loading="lazy"
                                        />

                                        <div className="cp-portfolio-overlay">
                                            <span>
                                                {t("web-company-profile.portfolio.view-project")}
                                            </span>

                                            <a
                                                href="#link-portfolio"
                                                className="cp-portfolio-arrow"
                                                aria-label="View project"
                                            >
                                                <i className="bi bi-arrow-up-right"></i>
                                            </a>
                                        </div>

                                        <div className="cp-portfolio-tag">
                                            BUSINESS WEBSITE
                                        </div>
                                    </div>

                                    <div className="cp-portfolio-info">
                                        <div className="cp-portfolio-heading">
                                            <span className="cp-portfolio-category">
                                                PILATES & WELLNESS
                                            </span>

                                            <h3>BreathPilates</h3>

                                            <p>
                                                Digital presence untuk bisnis
                                                wellness dengan tampilan yang
                                                clean dan modern.
                                            </p>
                                        </div>

                                        <div className="cp-portfolio-meta">
                                            <span>
                                                <i className="bi bi-globe2"></i>
                                                Business Website
                                            </span>

                                            <span>
                                                <i className="bi bi-phone"></i>
                                                Responsive
                                            </span>
                                        </div>
                                    </div>
                                </article>

                                <article
                                    className="cp-portfolio-card"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >
                                    <div className="cp-portfolio-image">
                                        <img
                                            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
                                            alt="Damay Cerdas digital platform"
                                            loading="lazy"
                                        />

                                        <div className="cp-portfolio-overlay">
                                            <span>
                                                {t("web-company-profile.portfolio.view-project")}
                                            </span>

                                            <a
                                                href="#link-portfolio"
                                                className="cp-portfolio-arrow"
                                                aria-label="View project"
                                            >
                                                <i className="bi bi-arrow-up-right"></i>
                                            </a>
                                        </div>

                                        <div className="cp-portfolio-tag">
                                            DIGITAL PLATFORM
                                        </div>
                                    </div>

                                    <div className="cp-portfolio-info">
                                        <div className="cp-portfolio-heading">
                                            <span className="cp-portfolio-category">
                                                EDUCATION & TRAINING
                                            </span>

                                            <h3>Damay Cerdas</h3>

                                            <p>
                                                Solusi digital untuk mendukung
                                                aktivitas pembelajaran dan
                                                pengelolaan bisnis.
                                            </p>
                                        </div>

                                        <div className="cp-portfolio-meta">
                                            <span>
                                                <i className="bi bi-window-stack"></i>
                                                Digital Platform
                                            </span>

                                            <span>
                                                <i className="bi bi-code-slash"></i>
                                                Custom Development
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </div>

                            <div
                                className="cp-portfolio-footer"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <span>
                                    {t("web-company-profile.portfolio.footer-label")}
                                </span>

                                <a href="/portfolio" className="cp-text-link">
                                    {t("web-company-profile.portfolio.view-all")}
                                    <i className="bi bi-arrow-up-right"></i>
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* PROCESS */}
                    <section className="cp-process">
                        <div className="container">
                            <div
                                className="cp-section-heading"
                                data-aos="fade-up"
                            >
                                <span className="cp-section-label">
                                    {t("web-company-profile.process.label")}
                                </span>

                                <h2>
                                    {t("web-company-profile.process.title")}
                                    <span>
                                        {t("web-company-profile.process.title-highlight")}
                                    </span>
                                </h2>

                                <p>
                                    {t("web-company-profile.process.description")}
                                </p>
                            </div>

                            <div className="cp-process-list">
                                <div
                                    className="cp-process-item"
                                    data-aos="fade-up"
                                    data-aos-delay="0"
                                >
                                    <div className="cp-process-number">01</div>

                                    <div className="cp-process-content">
                                        <h3>
                                            {t("web-company-profile.process.steps.understand.title")}
                                        </h3>
                                        <p>
                                            {t("web-company-profile.process.steps.understand.description")}
                                        </p>
                                    </div>

                                    <i className="bi bi-arrow-up-right"></i>
                                </div>

                                <div
                                    className="cp-process-item"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    <div className="cp-process-number">02</div>

                                    <div className="cp-process-content">
                                        <h3>
                                            {t("web-company-profile.process.steps.plan.title")}
                                        </h3>
                                        <p>
                                            {t("web-company-profile.process.steps.plan.description")}
                                        </p>
                                    </div>

                                    <i className="bi bi-arrow-up-right"></i>
                                </div>

                                <div
                                    className="cp-process-item"
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >
                                    <div className="cp-process-number">03</div>

                                    <div className="cp-process-content">
                                        <h3>
                                            {t("web-company-profile.process.steps.design.title")}
                                        </h3>
                                        <p>
                                            {t("web-company-profile.process.steps.design.description")}
                                        </p>
                                    </div>

                                    <i className="bi bi-arrow-up-right"></i>
                                </div>

                                <div
                                    className="cp-process-item"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >
                                    <div className="cp-process-number">04</div>

                                    <div className="cp-process-content">
                                        <h3>
                                            {t("web-company-profile.process.steps.build.title")}
                                        </h3>
                                        <p>
                                            {t("web-company-profile.process.steps.build.description")}
                                        </p>
                                    </div>

                                    <i className="bi bi-arrow-up-right"></i>
                                </div>

                                <div
                                    className="cp-process-item"
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                >
                                    <div className="cp-process-number">05</div>

                                    <div className="cp-process-content">
                                        <h3>
                                            {t("web-company-profile.process.steps.launch.title")}
                                        </h3>
                                        <p>
                                            {t("web-company-profile.process.steps.launch.description")}
                                        </p>
                                    </div>

                                    <i className="bi bi-arrow-up-right"></i>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* PACKAGE */}
                    <section className="cp-package">
                        <div className="container">
                            <div className="cp-package-grid">
                                <div
                                    data-aos="fade-right"
                                    data-aos-duration="900"
                                >
                                    <span className="cp-section-label cp-label-light">
                                        {t("web-company-profile.package.label")}
                                    </span>

                                    <h2>
                                        {t("web-company-profile.package.title")}
                                        <span>
                                            {t("web-company-profile.package.title-highlight")}
                                        </span>
                                    </h2>

                                    <p>
                                        {t("web-company-profile.package.description")}
                                    </p>
                                </div>

                                <div
                                    className="cp-package-card"
                                    data-aos="fade-left"
                                    data-aos-duration="900"
                                    data-aos-delay="150"
                                >
                                    <span>
                                        {t("web-company-profile.package.card-label")}
                                    </span>

                                    <strong>
                                        {t("web-company-profile.package.card-title")}
                                        <br />
                                        {t("web-company-profile.package.card-title-highlight")}
                                    </strong>

                                    <p>
                                        {t("web-company-profile.package.card-description")}
                                    </p>

                                    <a
                                        href={`https://wa.me/${whatsappNumber}?text=${t("web-company-profile.hero.whatsapp-message")}`}
                                        target="_blank"
                                        className="cp-btn cp-btn-primary"
                                    >
                                        {t("web-company-profile.package.button")}
                                        <i className="bi bi-arrow-up-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="cp-faq">
                        <div className="container">
                            <div className="cp-faq-grid">
                                <div
                                    className="cp-section-heading"
                                    data-aos="fade-right"
                                >
                                    <span className="cp-section-label">
                                        {t("web-company-profile.faq.label")}
                                    </span>

                                    <h2>
                                        {t("web-company-profile.faq.title")}
                                        <span>
                                            {t("web-company-profile.faq.title-highlight")}
                                        </span>
                                    </h2>

                                    <p>
                                        {t("web-company-profile.faq.description")}
                                    </p>
                                </div>

                                <div
                                    className="cp-faq-list"
                                    data-aos="fade-left"
                                    data-aos-delay="150"
                                >
                                    {t("web-company-profile.faq.questions", {
                                        returnObjects: true,
                                    }).map((item, index) => (
                                        <details key={index}>
                                            <summary>
                                                {item.question}
                                                <i className="bi bi-plus"></i>
                                            </summary>

                                            <p>{item.answer}</p>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="cp-cta">
                        <div className="container">
                            <div
                                className="cp-cta-box"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                            >
                                <div className="cp-cta-content">
                                    <span className="cp-label-light">
                                        {t("web-company-profile.cta.label")}
                                    </span>

                                    <h2>
                                        {t("web-company-profile.cta.title")}
                                        <span>
                                            {t("web-company-profile.cta.title-highlight")}
                                        </span>
                                    </h2>

                                    <p>
                                        {t("web-company-profile.cta.description")}
                                    </p>

                                    <a
                                        href={`https://wa.me/${whatsappNumber}?text=${t("web-company-profile.hero.whatsapp-message")}`}
                                        target="_blank"
                                        className="cp-btn cp-btn-white"
                                    >
                                        {t("web-company-profile.cta.button")}
                                        <i className="bi bi-arrow-up-right"></i>
                                    </a>
                                </div>

                                <div className="cp-cta-decoration">
                                    <div className="cp-cta-circle cp-cta-circle-one"></div>
                                    <div className="cp-cta-circle cp-cta-circle-two"></div>

                                    <span>SD</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <FooterSection />
        </>
    );
};

export default Layout;
import { useTranslation } from 'react-i18next';
import '../../../styles/footer-section.css';
import { useEffect, useState } from 'react';

const FooterSection = () => {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);

    const scrollToTop = () => {
        const heroSection = document.getElementById("hero");

        if (heroSection) {
            heroSection.scrollIntoView({
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

    return (
        <>
            {scrolled && (
                <button
                    type="button"
                    className="back-to-top-button"
                    onClick={scrollToTop}
                    aria-label="Back to top"
                >
                    <i className="bi bi-arrow-up"></i>
                </button>
            )}

            <footer id="footer">
                <div className="container">

                    <div className="footer-main">

                        <div className="footer-brand">
                            <div className="footer-logo">
                                <img
                                    src="/saskardigital.ico"
                                    alt="Logo Saskardigital"
                                />

                                <span>SASKARDIGITAL</span>
                            </div>

                            <p>
                                {t('footer.description')}
                            </p>
                        </div>

                        <div className="footer-navigation">
                            <span>
                                {t('footer.navigation')}
                            </span>

                            <div className="footer-links">
                                <a href="/">
                                    Home
                                </a>

                                <a href="/portfolio">
                                    {t('footer.portfolio')}
                                </a>

                                <a href="/project-request">
                                    Project Request
                                </a>
                            </div>
                        </div>

                        <div className="footer-services">
                            <span>
                                {t('footer.services')}
                            </span>

                            <div className="footer-links">
                                <a href="/services/software-custom">
                                    {t('footer.custom-software')}
                                </a>

                                <a href="/services/web-company-profile">
                                    {t('footer.company-profile')}
                                </a>
                            </div>
                        </div>

                        <div className="footer-contact">
                            <span>
                                {t('footer.contact-title')}
                            </span>

                            <div className="footer-contact-list">

                                <a href="mailto:admin@saskardigital.com">
                                    <i className="bi bi-envelope"></i>

                                    <span>
                                        admin@saskardigital.com
                                    </span>
                                </a>

                                <a href="https://wa.me/6281943206931">
                                    <i className="bi bi-whatsapp"></i>

                                    <span>
                                        +62 819-4320-6931
                                    </span>
                                </a>

                                <div className="footer-contact-item">
                                    <i className="bi bi-geo-alt"></i>

                                    <span>
                                        Sukur, Perum Cozy Home Blok I i-11, Minahasa Utara, Sulawesi Utara, Indonesia
                                    </span>
                                </div>

                                <div className="footer-contact-item">
                                    <i className="bi bi-clock"></i>

                                    <span>
                                        {t('footer.office-hours')}
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="footer-social">
                        <span>
                            {t('footer.follow-us')}
                        </span>

                        <div className="footer-social-links">

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

                    <div className="footer-bottom">
                        <span>
                            © 2026 PT Saskardigital Solusi Indonesia
                        </span>
                    </div>

                </div>
            </footer>
        </>
    );
};

export default FooterSection;
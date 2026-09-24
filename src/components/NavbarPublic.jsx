import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Nav, Navbar as BootstrapNavbar, NavDropdown } from "react-bootstrap";
import "../styles/language-switcher.css";

const NavbarPublic = ({ solid = false }) => {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);

    const changeLanguage = async (lng) => {
        await i18n.changeLanguage(lng);
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
                                href="/"
                            >{t("navbar-public.home")}</Nav.Link>

                            <NavDropdown title={t("navbar.services")} id="services-dropdown">
                                <NavDropdown.Item href="/service/web-company-profile">
                                    {t("navbar-public.submenu-services.menu-1")}
                                </NavDropdown.Item>

                                <NavDropdown.Item href="/service/software-custom">
                                    {t("navbar-public.submenu-services.menu-2")}
                                </NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link href="/portfolio">{t("navbar-public.portfolio")}</Nav.Link>
                        </Nav>

                        <div className="navbar-right">
                            <div className="language-switcher">
                                <button
                                    type="button"
                                    className={`language-btn ${currentLanguage === "en" ? "language-active" : ""
                                        }`}
                                    onClick={() => changeLanguage("en")}
                                >
                                    EN
                                </button>

                                <button
                                    type="button"
                                    className={`language-btn ${currentLanguage === "id" ? "language-active" : ""
                                        }`}
                                    onClick={() => changeLanguage("id")}
                                >
                                    ID
                                </button>
                            </div>

                            <div className="social-links">
                                <a href="https://www.facebook.com/saskardigital" aria-label="Facebook" target="_blank">
                                    <i className="bi bi-facebook"></i>
                                </a>

                                <a href="https://www.linkedin.com/company/saskardigital-inovasi-indonesia" aria-label="LinkedIn" target="_blank">
                                    <i className="bi bi-linkedin"></i>
                                </a>

                                <a href="https://wa.me/6281943206931" aria-label="WhatsApp" target="_blank">
                                    <i className="bi bi-whatsapp"></i>
                                </a>

                                <a href="https://www.instagram.com/saskardigital" aria-label="Instagram" target="_blank">
                                    <i className="bi bi-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </BootstrapNavbar.Collapse>
                </Container>
            </BootstrapNavbar>
        </>
    );
};

export default NavbarPublic;
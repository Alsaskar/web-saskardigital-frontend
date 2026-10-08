import { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarPublic from "../../../components/NavbarPublic";
import "./portfolio.css";
import FooterSection from "../../../modules/homepage/components/FooterSection";
import { useTranslation } from "react-i18next";
import { usePortfolio } from "../../../modules/portfolio/hooks/usePortfolio";

const WHATSAPP_NUMBER = "6281943206931";

const whatsappMessage = encodeURIComponent(
    "Halo Saskardigital, saya tertarik untuk mendiskusikan project digital untuk bisnis saya. Saya ingin mengetahui lebih lanjut mengenai solusi yang bisa dibuat."
);

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

const Layout = () => {
    const { t } = useTranslation();
    const { fetchPortfolioAll } = usePortfolio()

    const [portfolios, setPortfolios] = useState([])
    const [activateCategory, setActiveCategory] = useState("All")

    const _fetchData = async () => {
        const res = await fetchPortfolioAll()

        if(res){
            setPortfolios(res.data)
        }
    }

    useEffect(() => {
        _fetchData()
    }, [])
    
    useEffect(() => {
        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80,
        });

        return () => {
            AOS.refreshHard();
        };
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [activateCategory, portfolios]);

    const categories = useMemo(() => {
        const uniqueCategories = [
            ...new Set(
                portfolios
                    .map((item) => item.category_service)
                    .filter(Boolean)
            )
        ];

        return ["All", ...uniqueCategories];
    }, [portfolios]);

    const filteredPortfolio = useMemo(() => {
        if (activateCategory === "All") {
            return portfolios;
        }

        return portfolios.filter(
            (item) => item.category_service === activateCategory
        );
    }, [activateCategory, portfolios]);

    const getYear = (date) => {
        if (!date) {
            return "-";
        }

        return String(date).slice(0, 4);
    };

    const getImageUrl = (thumbnail) => {
        if (!thumbnail) {
            return "/images/placeholder.jpg";
        }

        return `${import.meta.env.VITE_BACKEND_BASE_URL}/assets/images/portfolio/${thumbnail}`;
    };

    const firstProjectYear =
        portfolios.length > 0
            ? getYear(portfolios[portfolios.length - 1]?.start_date)
            : "-";

    const latestProjectYear =
        portfolios.length > 0
            ? getYear(portfolios[0]?.start_date)
            : "-";

    return (
        <>
            <NavbarPublic />

            <div id="hero">
                <main className="portfolio-page">

                    {/* HERO */}
                    <section className="portfolio-hero">
                        <div className="portfolio-hero-grid"></div>
                        <div className="portfolio-hero-glow portfolio-hero-glow-one"></div>
                        <div className="portfolio-hero-glow portfolio-hero-glow-two"></div>

                        <div className="portfolio-container">
                            <div className="portfolio-hero-content">

                                <h1
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    {t("portfolio-public.hero-title")}
                                    <br />
                                    <span>
                                        {t("portfolio-public.hero-title-highlight")}
                                    </span>
                                </h1>

                                <p
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >
                                    {t("portfolio-public.hero-description")}
                                </p>

                                <div
                                    className="portfolio-hero-stats"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >
                                    <div>
                                        <strong>{portfolios.length}+</strong>
                                        <span>
                                            {t("portfolio-public.stats.projects")}
                                        </span>
                                    </div>

                                    <div>
                                        <strong>02</strong>
                                        <span>
                                            {t("portfolio-public.stats.categories")}
                                        </span>
                                    </div>

                                    <div>
                                        <strong>
                                            {firstProjectYear}
                                            {firstProjectYear !== latestProjectYear &&
                                                `–${latestProjectYear}`}
                                        </strong>
                                        <span>
                                            {t("portfolio-public.stats.selected-works")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="portfolio-hero-scroll"
                            data-aos="fade-up"
                            data-aos-delay="500"
                        >
                            <span>
                                {t("portfolio-public.scroll")}
                            </span>
                            <span className="portfolio-scroll-line"></span>
                        </div>
                    </section>

                    {/* PORTFOLIO */}
                    <section className="portfolio-showcase">
                        <div className="portfolio-container">

                            <div className="portfolio-heading">

                                <div
                                    className="portfolio-heading-left"
                                    data-aos="fade-right"
                                >
                                    <span className="portfolio-section-label">
                                        {t("portfolio-public.selected-works")}
                                    </span>

                                    <h2>
                                        {t("portfolio-public.showcase-title")}
                                        <br />
                                        <span>
                                            {t(
                                                "portfolio-public.showcase-title-highlight"
                                            )}
                                        </span>
                                    </h2>
                                </div>

                                <div
                                    className="portfolio-heading-right"
                                    data-aos="fade-left"
                                    data-aos-delay="150"
                                >
                                    <p>
                                        {t("portfolio-public.showcase-description")}
                                    </p>
                                </div>
                            </div>

                            {/* FILTER */}
                            <div
                                className="portfolio-filter-wrapper"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <div className="portfolio-filter">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            type="button"
                                            className={
                                                activateCategory === category
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setActiveCategory(category)
                                            }
                                        >
                                            {category}

                                            {category !== "All" && (
                                                <span>
                                                    {
                                                        portfolios.filter(
                                                            (item) =>
                                                                item.category_service ===
                                                                category
                                                        ).length
                                                    }
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <span className="portfolio-result-count">
                                    {filteredPortfolio.length} PROJECT
                                    {filteredPortfolio.length > 1 ? "S" : ""}
                                </span>
                            </div>

                            {/* GRID */}
                            <div className="portfolio-grid">
                                {filteredPortfolio.map((portfolio, index) => (
                                    <article
                                        className="portfolio-card"
                                        key={portfolio.id}
                                        data-aos="fade-up"
                                        data-aos-delay={(index % 3) * 100}
                                    >
                                        <div className="portfolio-card-visual">

                                            <img
                                                src={getImageUrl(portfolio.thumbnail)}
                                                alt={portfolio.title}
                                            />

                                            <div className="portfolio-card-shade"></div>

                                            <div className="portfolio-card-number">
                                                {String(index + 1).padStart(2, "0")}
                                            </div>

                                            <div className="portfolio-card-category">
                                                {portfolio.category}
                                            </div>

                                            <a
                                                href={`${portfolio.website_url}`}
                                                className="portfolio-view-button"
                                                target="_blank"
                                                style={{
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                <span>
                                                    {t("portfolio-public.view")}
                                                </span>

                                                <span className="portfolio-view-arrow">
                                                    ↗
                                                </span>
                                            </a>
                                        </div>

                                        <div className="portfolio-card-content">
                                            <div className="portfolio-card-top">
                                                <span>
                                                    {portfolio.year}
                                                </span>

                                                <span className="portfolio-card-line"></span>
                                            </div>

                                            <h3>
                                                {portfolio.title}
                                            </h3>

                                            <p>
                                                {portfolio.description}
                                            </p>

                                            <a
                                                href={`${portfolio.website_url}`}
                                                className="portfolio-card-link"
                                                target="_blank"
                                                style={{
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                {t("portfolio-public.explore-project")}
                                                <span>↗</span>
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {filteredPortfolio.length === 0 && (
                                <div
                                    className="portfolio-empty"
                                    data-aos="fade-up"
                                >
                                    <div className="portfolio-empty-icon">
                                        +
                                    </div>

                                    <h3>
                                        {t("portfolio.empty.title")}
                                    </h3>

                                    <p>
                                        {t("portfolio.empty.description")}
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="portfolio-cta">
                        <div className="portfolio-cta-orb"></div>

                        <div className="portfolio-container">
                            <div className="portfolio-cta-inner">

                                <div
                                    className="portfolio-cta-label"
                                    data-aos="fade-down"
                                >
                                    <span></span>
                                    {t("portfolio-public.cta.label")}
                                </div>

                                <h2
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    {t("portfolio-public.cta.title")}
                                    <br />
                                    <span>
                                        {t("portfolio-public.cta.title-highlight")}
                                    </span>
                                </h2>

                                <p
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >
                                    {t("portfolio-public.cta.description")}
                                </p>

                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="portfolio-cta-button"
                                    data-aos="zoom-in"
                                    data-aos-delay="300"
                                >
                                    <span>
                                        {t("portfolio-public.cta.button")}
                                    </span>
                                    <strong>↗</strong>
                                </a>

                                <div
                                    className="portfolio-cta-note"
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                >
                                    {t("portfolio-public.cta.note")}
                                </div>

                            </div>
                        </div>
                    </section>

                    <FooterSection />

                </main>
            </div>
        </>
    );
};

export default Layout;
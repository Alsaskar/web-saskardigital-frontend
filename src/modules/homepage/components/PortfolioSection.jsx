import { useEffect, useState } from "react";
import AOS from "aos";
import { useTranslation } from "react-i18next";
import { usePortfolio } from "../../portfolio/hooks/usePortfolio";

const PortfolioSection = () => {
    const { t } = useTranslation();

    const { fetchPortfolioAll } = usePortfolio();

    const [portfolios, setPortfolios] = useState([]);

    const _fetchData = async () => {
        const res = await fetchPortfolioAll(4);

        if (res) {
            setPortfolios(res.data || []);
        }
    };

    useEffect(() => {
        _fetchData();
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [portfolios]);

    return (
        <section id="portfolio">
            <div className="container">

                <div className="portfolio-heading">

                    <div
                        data-aos="fade-right"
                        data-aos-duration="900"
                    >
                        <h5>{t('portfolio.eyebrow')}</h5>

                        <h1>
                            {t('portfolio.title')}
                        </h1>
                    </div>

                    <p
                        data-aos="fade-left"
                        data-aos-duration="1000"
                        data-aos-delay="150"
                    >
                        {t('portfolio.description')}
                    </p>

                </div>

                <div className="portfolio-grid">

                    {portfolios.map((portfolio, index) => {

                        const projectClass =
                            index === 0
                                ? "portfolio-project portfolio-project-large"
                                : index === 3
                                    ? "portfolio-project portfolio-project-wide"
                                    : "portfolio-project";

                        const animation =
                            index === 0
                                ? "zoom-in"
                                : index === 1
                                    ? "fade-left"
                                    : index === 2
                                        ? "fade-right"
                                        : "fade-up";

                        const duration =
                            index === 0 || index === 3
                                ? "1100"
                                : "1000";

                        const delay =
                            index === 0
                                ? "200"
                                : index === 1
                                    ? "300"
                                    : index === 2
                                        ? "350"
                                        : "450";

                        return (
                            <div
                                className={projectClass}
                                data-aos={animation}
                                data-aos-duration={duration}
                                data-aos-delay={delay}
                                key={portfolio.id}
                            >
                                <div className="portfolio-image">

                                    <img
                                        src={`${import.meta.env.VITE_BACKEND_BASE_URL}/assets/images/portfolio/${portfolio.thumbnail}`}
                                        alt={portfolio.title}
                                    />

                                    <div className="portfolio-overlay">
                                        <span>
                                            {portfolio.category_service}
                                        </span>

                                        <a
                                            href={portfolio.website_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Visit ${portfolio.title}`}
                                            style={{
                                                textDecoration: 'none'
                                            }}
                                        >
                                            <i className="bi bi-arrow-up-right"></i>
                                        </a>
                                    </div>

                                </div>

                                <div className="portfolio-project-info">

                                    <div>
                                        <span>
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <h3>
                                            {portfolio.title}
                                        </h3>
                                    </div>

                                    <p>
                                        {portfolio.project_type}
                                    </p>

                                </div>
                            </div>
                        );
                    })}

                </div>

                <div
                    className="portfolio-footer"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-delay="500"
                >
                    <span>
                        SELECTED PROJECTS
                    </span>

                    <a href="/portfolio">
                        Lihat Semua Project

                        <i className="bi bi-arrow-up-right"></i>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default PortfolioSection;
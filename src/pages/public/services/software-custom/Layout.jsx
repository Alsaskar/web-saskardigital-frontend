import { Accordion, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "./software-custom.css";
import FooterSection from "../../../../modules/homepage/components/FooterSection";
import NavbarPublic from "../../../../components/NavbarPublic";
import { usePortfolio } from "../../../../modules/portfolio/hooks/usePortfolio";

const Layout = () => {
    const { t } = useTranslation();

    const getImageUrl = (thumbnail) => {
        if (!thumbnail) {
            return "/images/placeholder.jpg";
        }

        return `${import.meta.env.VITE_BACKEND_BASE_URL}/assets/images/portfolio/${thumbnail}`;
    };

    // get portfolio
    const { fetchPortfolioByCategory } = usePortfolio()
    const [portfolio, setPortfolio] = useState([])

    const _fetchData = async () => {
        const res = await fetchPortfolioByCategory('software custom')

        if (res) {
            setPortfolio(res.data)
        }
    }

    useEffect(() => {
        _fetchData()
    }, [])

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: "ease-out-cubic"
        });
    }, []);

    const services = [
        {
            icon: "bi-window-stack",
            title: t("software-custom.services.items.web-application.title"),
            description: t("software-custom.services.items.web-application.description")
        },
        {
            icon: "bi-phone",
            title: t("software-custom.services.items.mobile-application.title"),
            description: t("software-custom.services.items.mobile-application.description")
        },
        {
            icon: "bi-diagram-3",
            title: t("software-custom.services.items.business-system.title"),
            description: t("software-custom.services.items.business-system.description")
        },
        {
            icon: "bi-people",
            title: t("software-custom.services.items.crm.title"),
            description: t("software-custom.services.items.crm.description")
        },
        {
            icon: "bi-person-badge",
            title: t("software-custom.services.items.hris.title"),
            description: t("software-custom.services.items.hris.description")
        },
        {
            icon: "bi-code-slash",
            title: t("software-custom.services.items.custom-software.title"),
            description: t("software-custom.services.items.custom-software.description")
        }
    ];

    const problems = [
        {
            icon: "bi-file-earmark-spreadsheet",
            title: t("software-custom.problems.items.manual.title"),
            description: t("software-custom.problems.items.manual.description")
        },
        {
            icon: "bi-database",
            title: t("software-custom.problems.items.scattered-data.title"),
            description: t("software-custom.problems.items.scattered-data.description")
        },
        {
            icon: "bi-eye",
            title: t("software-custom.problems.items.monitoring.title"),
            description: t("software-custom.problems.items.monitoring.description")
        },
        {
            icon: "bi-arrow-repeat",
            title: t("software-custom.problems.items.workflow.title"),
            description: t("software-custom.problems.items.workflow.description")
        }
    ];

    const benefits = [
        {
            number: t("software-custom.benefits.items.structured.number"),
            title: t("software-custom.benefits.items.structured.title"),
            description: t("software-custom.benefits.items.structured.description")
        },
        {
            number: t("software-custom.benefits.items.centralized.number"),
            title: t("software-custom.benefits.items.centralized.title"),
            description: t("software-custom.benefits.items.centralized.description")
        },
        {
            number: t("software-custom.benefits.items.manual.number"),
            title: t("software-custom.benefits.items.manual.title"),
            description: t("software-custom.benefits.items.manual.description")
        },
        {
            number: t("software-custom.benefits.items.growth.number"),
            title: t("software-custom.benefits.items.growth.title"),
            description: t("software-custom.benefits.items.growth.description")
        }
    ];

    const process = [
        {
            number: t("software-custom.process.steps.understand.number"),
            title: t("software-custom.process.steps.understand.title"),
            description: t("software-custom.process.steps.understand.description")
        },
        {
            number: t("software-custom.process.steps.plan.number"),
            title: t("software-custom.process.steps.plan.title"),
            description: t("software-custom.process.steps.plan.description")
        },
        {
            number: t("software-custom.process.steps.build.number"),
            title: t("software-custom.process.steps.build.title"),
            description: t("software-custom.process.steps.build.description")
        },
        {
            number: t("software-custom.process.steps.test.number"),
            title: t("software-custom.process.steps.test.title"),
            description: t("software-custom.process.steps.test.description")
        },
        {
            number: t("software-custom.process.steps.deliver.number"),
            title: t("software-custom.process.steps.deliver.title"),
            description: t("software-custom.process.steps.deliver.description")
        },
        {
            number: t("software-custom.process.steps.support.number"),
            title: t("software-custom.process.steps.support.title"),
            description: t("software-custom.process.steps.support.description")
        }
    ];

    const faqQuestions = t("software-custom.faq.questions", { returnObjects: true });

    const scrollToSection = (id) => {
        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const whatsappNumber = "6281943206931";

    return (
        <>
            <NavbarPublic />

            <div id="hero">
                <main>
                    <section className="sc-hero">
                        <Container>
                            <Row className="align-items-center">
                                <Col lg={7} className="sc-hero-content" data-aos="fade-right">

                                    <h1>
                                        {t("software-custom.hero.title")}
                                        <strong> {t("software-custom.hero.title-highlight")}</strong>
                                    </h1>

                                    <p>
                                        {t("software-custom.hero.description")}
                                    </p>

                                    <div className="sc-hero-actions">
                                        <a
                                            href={`https://wa.me/${whatsappNumber}?text=${t("software-custom.hero.message")}`}
                                            target="_blank"
                                            className="sc-btn-primary"
                                        >
                                            {t("software-custom.hero.btn-consult")}
                                            <i className="bi bi-arrow-up-right"></i>
                                        </a>

                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToSection("services");
                                            }}
                                            className="sc-btn-secondary"
                                        >
                                            {t("software-custom.hero.btn-services")}
                                        </a>
                                    </div>

                                    <div className="sc-hero-note">
                                        <i className="bi bi-check-circle-fill"></i>
                                        {t("software-custom.hero.note")}
                                    </div>
                                </Col>

                                <Col lg={5} data-aos="fade-left">
                                    <div className="sc-hero-visual">
                                        <div className="sc-floating-card sc-floating-card-top">
                                            <i className="bi bi-graph-up-arrow"></i>
                                            <div>
                                                <small>Business Performance</small>
                                                <strong>+32.8%</strong>
                                            </div>
                                        </div>

                                        <div className="sc-dashboard">
                                            <div className="sc-dashboard-header">
                                                <div className="sc-dashboard-brand">
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                                <div className="sc-dashboard-user"></div>
                                            </div>

                                            <div className="sc-dashboard-body">
                                                <div className="sc-dashboard-sidebar">
                                                    <span className="active"></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>

                                                <div className="sc-dashboard-content">
                                                    <div className="sc-dashboard-title">
                                                        <span></span>
                                                        <span></span>
                                                    </div>

                                                    <div className="sc-dashboard-stats">
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>

                                                    <div className="sc-dashboard-chart">
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                    </div>

                                                    <div className="sc-dashboard-table">
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sc-floating-card sc-floating-card-bottom">
                                            <i className="bi bi-check-circle-fill"></i>
                                            <div>
                                                <strong>System Connected</strong>
                                                <small>All business data is organized</small>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <section className="sc-intro">
                        <Container>
                            <div className="sc-intro-content" data-aos="fade-up">
                                <span className="sc-section-label">
                                    {t("software-custom.intro.label")}
                                </span>

                                <h2>
                                    {t("software-custom.intro.title")}
                                    <span> {t("software-custom.intro.title-highlight")}</span>
                                </h2>

                                <p style={{ color: '#102b3e' }}>
                                    {t("software-custom.intro.description")}
                                </p>
                            </div>
                        </Container>
                    </section>

                    <section className="sc-problems">
                        <Container>
                            <div className="sc-section-heading" data-aos="fade-up">
                                <span className="sc-section-label">
                                    {t("software-custom.problems.label")}
                                </span>

                                <h2>
                                    {t("software-custom.problems.title")}
                                    <span> {t("software-custom.problems.title-highlight")}</span>
                                </h2>

                                <p style={{ color: '#102b3e' }}>
                                    {t("software-custom.problems.description")}
                                </p>
                            </div>

                            <Row className="g-4">
                                {problems.map((item, index) => (
                                    <Col md={6} lg={3} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                                        <div className="sc-problem-card">
                                            <div className="sc-icon-box">
                                                <i className={`bi ${item.icon}`}></i>
                                            </div>
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </section>

                    <section className="sc-why-software">
                        <Container>
                            <Row className="align-items-center g-5">
                                <Col lg={5} data-aos="fade-right">
                                    <div className="sc-number-box">
                                        <span>01</span>
                                        <div className="sc-number-line"></div>
                                        <small>{t("software-custom.why-software.number-label")}</small>
                                    </div>

                                    <h2>
                                        {t("software-custom.why-software.title")}
                                        <span> {t("software-custom.why-software.title-highlight")}</span>
                                        {t("software-custom.why-software.title-ending")}
                                    </h2>
                                </Col>

                                <Col lg={7} data-aos="fade-left">
                                    <div className="sc-why-text">
                                        <p>
                                            {t("software-custom.why-software.description-1")}
                                        </p>

                                        <p>
                                            {t("software-custom.why-software.description-2")}
                                        </p>

                                        <div className="sc-highlight">
                                            <i className="bi bi-lightbulb-fill"></i>
                                            <div>
                                                <strong>
                                                    {t("software-custom.why-software.highlight-title")}
                                                </strong>
                                                <span>
                                                    {t("software-custom.why-software.highlight-description")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <section className="sc-services" id="services">
                        <Container>
                            <div className="sc-section-heading" data-aos="fade-up">
                                <span className="sc-section-label" style={{ color: 'white' }}>
                                    {t("software-custom.services.label")}
                                </span>

                                <h2>
                                    {t("software-custom.services.title")}
                                    <span style={{ color: 'white' }}>
                                        {t("software-custom.services.title-highlight")}
                                    </span>
                                </h2>

                                <p style={{ color: 'white' }}>
                                    {t("software-custom.services.description")}
                                </p>
                            </div>

                            <Row className="g-4">
                                {services.map((item, index) => (
                                    <Col md={6} lg={4} key={index} data-aos="fade-up" data-aos-delay={index * 80}>
                                        <Card className="sc-service-card">
                                            <div className="sc-service-icon">
                                                <i className={`bi ${item.icon}`}></i>
                                            </div>

                                            <Card.Body>
                                                <span>0{index + 1}</span>
                                                <h3>{item.title}</h3>
                                                <p>{item.description}</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </section>

                    <section className="sc-custom">
                        <Container>
                            <Row className="align-items-center g-5">
                                <Col lg={6} data-aos="fade-right">
                                    <span className="sc-section-label">
                                        {t("software-custom.custom.label")}
                                    </span>

                                    <h2>
                                        {t("software-custom.custom.title")}
                                        <span> {t("software-custom.custom.title-highlight")}</span>
                                    </h2>

                                    <p>
                                        {t("software-custom.custom.description-1")}
                                    </p>

                                    <p>
                                        {t("software-custom.custom.description-2")}
                                    </p>

                                    <a
                                        href={`https://wa.me/${whatsappNumber}?text=${t("software-custom.hero.message")}`}
                                        target="_blank"
                                        className="sc-outline-button"
                                    >
                                        {t("software-custom.custom.button")}
                                        <i className="bi bi-arrow-up-right"></i>
                                    </a>
                                </Col>

                                <Col lg={6} data-aos="fade-left">
                                    <div className="sc-custom-panel">
                                        <div className="sc-custom-item">
                                            <i className="bi bi-check2"></i>
                                            <div>
                                                <strong>
                                                    {t("software-custom.custom.items.features.title")}
                                                </strong>
                                                <span>
                                                    {t("software-custom.custom.items.features.description")}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="sc-custom-item">
                                            <i className="bi bi-check2"></i>
                                            <div>
                                                <strong>
                                                    {t("software-custom.custom.items.workflow.title")}
                                                </strong>
                                                <span>
                                                    {t("software-custom.custom.items.workflow.description")}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="sc-custom-item">
                                            <i className="bi bi-check2"></i>
                                            <div>
                                                <strong>
                                                    {t("software-custom.custom.items.developable.title")}
                                                </strong>
                                                <span>
                                                    {t("software-custom.custom.items.developable.description")}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="sc-custom-item">
                                            <i className="bi bi-check2"></i>
                                            <div>
                                                <strong>
                                                    {t("software-custom.custom.items.controlled-data.title")}
                                                </strong>
                                                <span>
                                                    {t("software-custom.custom.items.controlled-data.description")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <section className="sc-process">
                        <Container>
                            <div className="sc-section-heading" data-aos="fade-up">
                                <span className="sc-section-label">
                                    {t("software-custom.process.label")}
                                </span>

                                <h2>
                                    {t("software-custom.process.title")}
                                    <span> {t("software-custom.process.title-highlight")}</span>
                                </h2>

                                <p style={{ color: '#102b3e' }}>
                                    {t("software-custom.process.description")}
                                </p>
                            </div>

                            <div className="sc-process-grid">
                                {process.map((item, index) => (
                                    <div className="sc-process-item" key={index} data-aos="fade-up" data-aos-delay={index * 70}>
                                        <div className="sc-process-number">{item.number}</div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </section>

                    <section className="sc-benefits">
                        <Container>
                            <Row className="align-items-center g-5">
                                <Col lg={5} data-aos="fade-right">
                                    <span className="sc-section-label">
                                        {t("software-custom.benefits.label")}
                                    </span>

                                    <h2>
                                        {t("software-custom.benefits.title")}
                                        <span> {t("software-custom.benefits.title-highlight")}</span>
                                    </h2>

                                    <p>
                                        {t("software-custom.benefits.description")}
                                    </p>
                                </Col>

                                <Col lg={7}>
                                    <div className="sc-benefit-list">
                                        {benefits.map((item, index) => (
                                            <div className="sc-benefit-item" key={index} data-aos="fade-up">
                                                <span>{item.number}</span>
                                                <div>
                                                    <h3>{item.title}</h3>
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    {/* List Portfolio */}
                    <section className="sc-portfolio">
                        <Container>
                            <div className="sc-section-heading" data-aos="fade-up">
                                <span className="sc-section-label">
                                    {t("software-custom.portfolio.label")}
                                </span>

                                <h2>
                                    {t("software-custom.portfolio.title")}
                                    <span>
                                        {" "}
                                        {t("software-custom.portfolio.title-highlight")}
                                    </span>
                                </h2>
                            </div>

                            <Row className="g-4">
                                {portfolio.map((item, index) => (
                                    <Col
                                        md={6}
                                        lg={4}
                                        key={item.id}
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                    >
                                        <article className="sc-portfolio-card">
                                            <div className="sc-portfolio-image">
                                                <img
                                                    src={getImageUrl(item.thumbnail)}
                                                    alt={item.title}
                                                    loading="lazy"
                                                />

                                                <div className="sc-portfolio-image-overlay"></div>

                                                <span className="sc-portfolio-number">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>

                                                <a
                                                    href={item.website_url}
                                                    target="_blank"
                                                    title="View Portfolio"
                                                >
                                                    <span className="sc-portfolio-view">
                                                        <i className="bi bi-arrow-up-right"></i>
                                                    </span>
                                                </a>


                                            </div>

                                            <div className="sc-portfolio-content">
                                                <div className="sc-portfolio-category">
                                                    <span></span>
                                                    {item.category}
                                                </div>

                                                <h3>{item.title}</h3>

                                                <p>{item.description}</p>

                                                <div className="sc-portfolio-footer">
                                                    <span>{item.sub_title}</span>

                                                    <a
                                                        href={item.website_url}
                                                        target="_blank"
                                                        title="View Portfolio"
                                                        style={{
                                                            textDecoration: 'none'
                                                        }}
                                                    >
                                                        <i className="bi bi-arrow-right"></i>
                                                    </a>

                                                    
                                                </div>
                                            </div>
                                        </article>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </section>

                    <section className="sc-faq">
                        <Container>
                            <div className="sc-section-heading" data-aos="fade-up">
                                <span className="sc-section-label">
                                    {t("software-custom.faq.label")}
                                </span>

                                <h2>
                                    {t("software-custom.faq.title")}
                                    <span> {t("software-custom.faq.title-highlight")}</span>
                                </h2>
                            </div>

                            <Row className="justify-content-center">
                                <Col lg={9}>
                                    <Accordion className="sc-accordion" data-aos="fade-up">
                                        {faqQuestions.map((item, index) => (
                                            <Accordion.Item eventKey={String(index)} key={index}>
                                                <Accordion.Header>
                                                    {item.question}
                                                </Accordion.Header>

                                                <Accordion.Body>
                                                    {item.answer}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <section className="sc-cta" id="contact">
                        <Container>
                            <div className="sc-cta-box" data-aos="fade-up">
                                <div className="sc-cta-decoration sc-cta-decoration-one"></div>
                                <div className="sc-cta-decoration sc-cta-decoration-two"></div>

                                <span className="sc-section-label">
                                    {t("software-custom.cta.label")}
                                </span>

                                <h2>
                                    {t("software-custom.cta.title")}
                                    <span> {t("software-custom.cta.title-highlight")}</span>
                                </h2>

                                <p>
                                    {t("software-custom.cta.description")}
                                </p>

                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=${t("software-custom.hero.message")}`}
                                    target="_blank"
                                    className="sc-cta-button"
                                >
                                    {t("software-custom.cta.button")}
                                    <i className="bi bi-arrow-up-right"></i>
                                </a>

                                <small>
                                    {t("software-custom.cta.note")}
                                </small>
                            </div>
                        </Container>
                    </section>

                    <FooterSection />
                </main>
            </div>

        </>
    );
};

export default Layout;
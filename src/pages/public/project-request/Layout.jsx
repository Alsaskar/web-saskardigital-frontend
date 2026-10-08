import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import NavbarPublic from "../../../components/NavbarPublic";
import FooterSection from "../../../modules/homepage/components/FooterSection";
import RequestProjectSection from "../../../modules/homepage/components/RequestProjectSection";

import "./project-request.css";
import { useTranslation } from "react-i18next";

const Layout = () => {
    const { t } = useTranslation()

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 80,
        });

        return () => {
            AOS.refreshHard();
        };
    }, []);

    return (
        <>
            <NavbarPublic />

            <main className="project-request-page">

                {/* HERO */}
                <section className="project-request-hero">

                    <div className="project-request-hero-grid"></div>

                    <div className="project-request-hero-glow project-request-hero-glow-one"></div>

                    <div className="project-request-hero-glow project-request-hero-glow-two"></div>

                    <div className="project-request-container">
                        <div className="project-request-hero-content">

                            <h1
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                {t("project-request-page.hero.title")}
                                <br />

                                <span>
                                    {t("project-request-page.hero.title-highlight")}
                                </span>
                            </h1>

                            <p
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                {t("project-request-page.hero.description")}
                            </p>

                        </div>
                    </div>

                    <div
                        className="project-request-hero-scroll"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        <span>{t("project-request-page.hero.scroll")}</span>

                        <span className="project-request-scroll-line"></span>
                    </div>

                </section>


                {/* PROJECT REQUEST */}
                <RequestProjectSection />


                {/* APA YANG TERJADI SELANJUTNYA */}
                <section className="project-request-next">

                    <div className="project-request-container">

                        <div
                            className="project-request-next-heading"
                            data-aos="fade-up"
                        >
                            <span className="project-request-section-label">
                                {t("project-request-page.next.label")}
                            </span>

                            <h2>
                                {t("project-request-page.next.title")}
                                <br />

                                <span>
                                    {t("project-request-page.next.title-highlight")}
                                </span>
                            </h2>
                        </div>


                        <div className="project-request-steps">

                            <div
                                className="project-request-step"
                                data-aos="fade-up"
                            >
                                <span>{t("project-request-page.next.steps.review.number")}</span>

                                <h3>
                                    {t("project-request-page.next.steps.review.title")}
                                </h3>

                                <p>
                                    {t("project-request-page.next.steps.review.description")}
                                </p>
                            </div>


                            <div
                                className="project-request-step"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <span>{t("project-request-page.next.steps.discuss.number")}</span>

                                <h3>
                                    {t("project-request-page.next.steps.discuss.title")}
                                </h3>

                                <p>
                                    {t("project-request-page.next.steps.discuss.description")}
                                </p>
                            </div>


                            <div
                                className="project-request-step"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <span>{t("project-request-page.next.steps.proposal.number")}</span>

                                <h3>
                                    {t("project-request-page.next.steps.proposal.title")}
                                </h3>

                                <p>
                                    {t("project-request-page.next.steps.proposal.description")}
                                </p>
                            </div>

                        </div>

                    </div>

                </section>

            </main>

            <FooterSection />
        </>
    );
};

export default Layout;
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import AOS from "aos";
import '../../../styles/client-feedback.css';
import { useTranslation } from "react-i18next";
import { useTestimoni } from '../../testimoni/hooks/useTestimoni'

const ClientFeedbackSection = () => {
    const { t } = useTranslation();

    const { fetchTestimoniAll } = useTestimoni()

    const [testimoni, setTestimoni] = useState([])

    const _fetchData = async () => {
        const res = await fetchTestimoniAll(4);

        if (res) {
            setTestimoni(res.data);
        }
    };

    useEffect(() => {
        _fetchData()
    }, [])

    useEffect(() => {
        AOS.refresh();
    }, []);

    return (
        <section id="client-feedback">
            <div className="container">

                <div className="client-feedback-heading">

                    <div
                        data-aos="fade-right"
                        data-aos-duration="900"
                    >
                        <h5>{t('client-feedback.eyebrow')}</h5>
                        <h1>{t('client-feedback.title')}</h1>
                    </div>

                    <div
                        className="client-feedback-intro"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                        data-aos-delay="150"
                    >
                        <span className="client-feedback-quote">
                            <i className="bi bi-quote"></i>
                        </span>

                        <p>
                            {t('client-feedback.description')}
                        </p>
                    </div>

                </div>

                <div className="feedback-carousel-wrapper">
                    <Carousel
                        indicators={false}
                        controls={true}
                        interval={5000}
                        className="feedback-carousel"
                    >
                        {[0, 2, 4, 6].map((startIndex) => (
                            <Carousel.Item key={startIndex}>
                                <div className="row g-4">

                                    {testimoni
                                        .slice(startIndex, startIndex + 2)
                                        .map((feedback) => (
                                            <div
                                                className="col-lg-6 col-md-6 col-12"
                                                key={feedback.id}
                                            >
                                                <div className="feedback-card">

                                                    <div className="feedback-card-top">
                                                        <div className="feedback-stars">
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star-fill"></i>
                                                            <i className="bi bi-star-fill"></i>
                                                        </div>

                                                        <span className="feedback-number">
                                                            0{startIndex + 1}
                                                        </span>
                                                    </div>

                                                    <div className="feedback-message">
                                                        <p>
                                                            "{feedback.message}"
                                                        </p>
                                                    </div>

                                                    <div className="feedback-client">
                                                        <div className="feedback-avatar">
                                                            {feedback.nama_pic.charAt(0)}
                                                        </div>

                                                        <div>
                                                            <h4>{feedback.nama_pic}</h4>

                                                            <span>
                                                                {feedback.jabatan} · {feedback.client.nama_company}
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}

                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

                <div
                    className="feedback-bottom"
                    data-aos="fade-up"
                    data-aos-duration="900"
                    data-aos-delay="300"
                >
                    <span>
                        {t('client-feedback.bottom-label')}
                    </span>

                    <div className="feedback-bottom-line"></div>

                    <span>
                        {t('client-feedback.bottom-caption')}
                    </span>
                </div>

            </div>
        </section>
    );
};

export default ClientFeedbackSection;
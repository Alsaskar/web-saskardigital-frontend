import { useEffect } from 'react';
import AOS from 'aos';
import { useTranslation } from 'react-i18next';
import '../../../styles/location-section.css';

const LocationSection = () => {
    const { t } = useTranslation();

    useEffect(() => {
        AOS.refresh();
    }, []);

    return (
        <section id="location">
            <div className="container">

                <div className="location-heading">

                    <div
                        data-aos="fade-right"
                        data-aos-duration="900"
                    >
                        <span>
                            {t('location.eyebrow')}
                        </span>

                        <h2>
                            {t('location.title')}
                        </h2>
                    </div>

                    <p
                        data-aos="fade-left"
                        data-aos-duration="1000"
                        data-aos-delay="150"
                    >
                        {t('location.description')}
                    </p>

                </div>

                <div className="location-content">

                    <div
                        className="location-info"
                        data-aos="fade-right"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                    >

                        <div className="location-info-item">
                            <span>
                                {t('location.office')}
                            </span>

                            <h3>
                                PT Saskardigital Solusi Indonesia
                            </h3>

                            <p>
                                Sukur, Perum Cozy Home Blok I i-11, Minahasa Utara<br />
                                Sulawesi Utara, Indonesia
                            </p>
                        </div>

                        <div className="location-info-item">
                            <span>
                                {t('location.contact')}
                            </span>

                            <a href="mailto:admin@saskardigital.com">
                                admin@saskardigital.com
                            </a>

                            <a href="https://wa.me/6281943206931">
                                +62 819-4320-6931
                            </a>
                        </div>

                        <div className="location-info-item">
                            <span>
                                {t('location.office-hours')}
                            </span>

                            <p>
                                {t('location.days')}<br />
                                {t('location.hours')}
                            </p>
                        </div>

                        <a
                            href="https://maps.app.goo.gl/7JqkmXhjV1qosw6Y6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="location-direction"
                        >
                            <span>
                                {t('location.get-directions')}
                            </span>

                            <i className="bi bi-arrow-up-right"></i>
                        </a>

                    </div>

                    <div
                        className="location-map-wrapper"
                        data-aos="zoom-in"
                        data-aos-duration="1100"
                        data-aos-delay="250"
                    >
                        <div className="location-map">

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.2645232861894!2d124.96276911343602!3d1.4566168831198627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870900079fafbd%3A0xe316cf7702664659!2sMalalantang%20bers!5e0!3m2!1sen!2sid!4v1789355254417!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Saskardigital Office Location"
                            />

                            <div className="location-map-label">
                                <i className="bi bi-geo-alt-fill"></i>

                                <span>
                                    {t('location.office-label')}
                                </span>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default LocationSection;
import { useEffect } from 'react';
import AOS from 'aos';
import { useTranslation } from 'react-i18next';
import FormProjectRequest from '../../../components/FormProjectRequest';
import '../../../styles/request-project.css';

const RequestProjectSection = () => {
    const { t } = useTranslation();

    useEffect(() => {
        AOS.refresh();
    }, []);

    return (
        <section id="request-project">
            <div className="container">

                <div className="request-project-wrapper">

                    <div
                        className="request-project-info"
                        data-aos="fade-right"
                        data-aos-duration="1000"
                    >
                        <span className="request-project-label">
                            {t('request-project.label')}
                        </span>

                        <h1>
                            {t('request-project.title')}
                        </h1>

                        <p>
                            {t('request-project.description')}
                        </p>

                        <div className="request-project-note">
                            <div className="request-project-note-icon">
                                <i className="bi bi-chat-dots"></i>
                            </div>

                            <div>
                                <strong>
                                    {t('request-project.note-title')}
                                </strong>

                                <span>
                                    {t('request-project.note-description')}
                                </span>
                            </div>
                        </div>

                        <div className="request-project-contact">
                            <span>
                                {t('request-project.contact-label')}
                            </span>

                            <a href="mailto:admin@saskardigital.com">
                                admin@saskardigital.com

                                <i className="bi bi-arrow-up-right"></i>
                            </a>
                        </div>
                    </div>

                    <div
                        className="request-project-form-wrapper"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                    >
                        <FormProjectRequest />
                    </div>

                </div>

            </div>
        </section>
    );
};

export default RequestProjectSection;
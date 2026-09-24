import { Carousel } from 'react-bootstrap'
import '../../../styles/our-client.css'
import { useTranslation } from 'react-i18next';
import { useClient } from '../../client/hooks/useClient'
import { useEffect, useState } from 'react';

const OurClientSection = () => {
    const { t } = useTranslation();
    const { fetchClientAll } = useClient()

    const [clients, setClients] = useState([])

    const _fetchData = async () => {
        const res = await fetchClientAll(4);

        if (res) {
            setClients(res.data);
        }
    };

    useEffect(() => {
        _fetchData()
    }, [])

    return (
        <section id="our-clients">
            <div className="container">
                <div className="our-clients-heading">
                    <div>
                        <h5>{t('our-clients.eyebrow')}</h5>
                        <h1>{t('our-clients.title')}</h1>
                    </div>

                    <p>
                        {t('our-clients.description')}
                    </p>
                </div>

                <Carousel
                    indicators={false}
                    controls={true}
                    interval={4000}
                    className="clients-carousel"
                >
                    {[0, 3, 6].map((startIndex) => (
                        <Carousel.Item key={startIndex}>
                            <div className="row g-4">
                                {clients.slice(startIndex, startIndex + 3).map((client) => (
                                    <div
                                        className="col-lg-4 col-md-4 col-12"
                                        key={client.id}
                                    >
                                        <div className="client-card">
                                            <div className="client-logo">
                                                <img
                                                    src={client.logo_company || '/saskardigital.ico'}
                                                    alt={client.logo_company ? client.nama_company : 'Saskardigital'}
                                                    className={!client.logo ? 'client-logo-fallback' : ''}
                                                />
                                            </div>

                                            <div className="client-info">
                                                <h3>{client.nama_company}</h3>
                                                <span>{client.industry}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>

                <div className="clients-bottom">
                    <span>TRUSTED PARTNERS</span>
                    <div className="clients-bottom-line"></div>
                    <span>01 — 09</span>
                </div>
            </div>
        </section>
    )
}

export default OurClientSection
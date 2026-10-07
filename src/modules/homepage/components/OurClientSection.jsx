import { Carousel } from 'react-bootstrap'
import '../../../styles/our-client.css'
import { useTranslation } from 'react-i18next'
import { useClient } from '../../client/hooks/useClient'
import { useEffect, useState } from 'react'

const OurClientSection = () => {
    const { t } = useTranslation()
    const { fetchClientAll } = useClient()

    const [clients, setClients] = useState([])

    const _fetchData = async () => {
        const res = await fetchClientAll(9)

        if (res) {
            setClients(res.data || [])
        }
    }

    useEffect(() => {
        _fetchData()
    }, [])

    /*
        Desktop:
        3 client per slide
    */
    const desktopSlides = []

    for (let i = 0; i < clients.length; i += 3) {
        desktopSlides.push(clients.slice(i, i + 3))
    }

    /*
        Mobile:
        2 client per slide
    */
    const mobileSlides = []

    for (let i = 0; i < clients.length; i += 2) {
        mobileSlides.push(clients.slice(i, i + 2))
    }

    const renderClientCard = (client) => (
        <div
            className="col-lg-4 col-md-4 col-6"
            key={client.id}
        >
            <div className="client-card">
                <div className="client-logo">
                    <img
                        src={client.logo_company || '/saskardigital.ico'}
                        alt={
                            client.logo_company
                                ? client.nama_company
                                : 'Saskardigital'
                        }
                        className={
                            !client.logo_company
                                ? 'client-logo-fallback'
                                : ''
                        }
                    />
                </div>

                <div className="client-info">
                    <h3>{client.nama_company}</h3>
                    <span>{client.industry}</span>
                </div>
            </div>
        </div>
    )

    return (
        <section id="our-clients">
            <div className="container">
                <div className="our-clients-heading">
                    <div
                        data-aos="fade-up"
                    >
                        <h5>
                            {t('our-clients.eyebrow')}
                        </h5>

                        <h1>
                            {t('our-clients.title')}
                        </h1>
                    </div>

                    <p
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        {t('our-clients.description')}
                    </p>
                </div>

                {clients.length > 0 && (
                    <>
                        {/* =========================
                            Desktop
                        ========================= */}

                        <div className="clients-desktop">
                            {clients.length <= 3 ? (
                                <div className="clients-static">
                                    <div className="row g-4">
                                        {clients.map(renderClientCard)}
                                    </div>
                                </div>
                            ) : (
                                <Carousel
                                    indicators={false}
                                    controls={true}
                                    interval={4000}
                                    className="clients-carousel"
                                    data-aos="fade-up"
                                    data-aos-delay="150"
                                >
                                    {desktopSlides.map((slide, index) => (
                                        <Carousel.Item key={index}>
                                            <div className="row g-4">
                                                {slide.map(renderClientCard)}
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            )}
                        </div>

                        {/* =========================
                            Mobile
                        ========================= */}

                        <div className="clients-mobile">
                            {clients.length <= 2 ? (
                                <div className="clients-static">
                                    <div className="row g-4">
                                        {clients.map(renderClientCard)}
                                    </div>
                                </div>
                            ) : (
                                <Carousel
                                    indicators={false}
                                    controls={true}
                                    interval={4000}
                                    className="clients-carousel"
                                    data-aos="fade-up"
                                    data-aos-delay="150"
                                >
                                    {mobileSlides.map((slide, index) => (
                                        <Carousel.Item key={index}>
                                            <div className="row g-4">
                                                {slide.map(renderClientCard)}
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            )}
                        </div>
                    </>
                )}

                <div
                    className="clients-bottom"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <span>TRUSTED PARTNERS</span>

                    <div className="clients-bottom-line"></div>

                    <span>
                        {String(clients.length).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </section>
    )
}

export default OurClientSection
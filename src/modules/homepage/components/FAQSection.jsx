import { useEffect, useState } from 'react'
import AOS from 'aos'
import '../../../styles/faq.css'
import { useTranslation } from 'react-i18next'

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const { t } = useTranslation()

    const faqs = t('faq.questions', { returnObjects: true })

    useEffect(() => {
        AOS.refresh()
    }, [])

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <section id="faq">
            <div className="container">

                <div className="faq-header">

                    <div
                        className="faq-heading"
                        data-aos="fade-right"
                        data-aos-duration="900"
                    >
                        <span className="faq-label">
                            {t('faq.label')}
                        </span>

                        <h1>
                            {t('faq.title')}
                        </h1>
                    </div>

                    <div
                        className="faq-intro"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                        data-aos-delay="150"
                    >
                        <span className="faq-intro-number">
                            {faqs.length}
                        </span>

                        <p>
                            {t('faq.description')}
                        </p>
                    </div>

                </div>

                <div
                    className="faq-content"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="250"
                >
                    <div className="faq-list">

                        {faqs.map((faq, index) => {
                            const isActive = activeIndex === index

                            return (
                                <div
                                    className={`faq-item ${isActive ? 'faq-item-active' : ''}`}
                                    key={faq.question}
                                >
                                    <button
                                        type="button"
                                        className="faq-question"
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <div className="faq-question-left">

                                            <span className="faq-number">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>

                                            <span className="faq-question-text">
                                                {faq.question}
                                            </span>

                                        </div>

                                        <span className="faq-icon">
                                            <i
                                                className={`bi ${isActive ? 'bi-dash' : 'bi-plus'}`}
                                            ></i>
                                        </span>
                                    </button>

                                    <div
                                        className={`faq-answer ${isActive ? 'faq-answer-open' : ''}`}
                                    >
                                        <div className="faq-answer-inner">
                                            <p>
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}

                    </div>
                </div>

            </div>
        </section>
    )
}

export default FAQSection
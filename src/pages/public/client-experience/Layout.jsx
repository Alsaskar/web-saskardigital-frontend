import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AOS from "aos";
import "aos/dist/aos.css";
import NavbarPublic from "../../../components/NavbarPublic";
import FooterSection from "../../../modules/homepage/components/FooterSection";
import "./client-experience.css";
import { useTranslation } from "react-i18next";
import { useTestimoni } from "../../../modules/testimoni/hooks/useTestimoni";
import { useToastContext } from "@/context/ToastContext/useToastContext";

const validationSchema = Yup.object({
    nama_pic: Yup.string()
        .required("Nama wajib diisi"),

    jabatan: Yup.string()
        .required("Jabatan wajib diisi"),

    message: Yup.string()
        .required("Pengalaman wajib diisi")
        .min(10, "Pengalaman minimal 10 karakter"),
});

const Layout = () => {
    const { t } = useTranslation();
    const { addTestimoni, loading } = useTestimoni();
    const { showToastMessage } = useToastContext();

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

    const _handleSubmit = async (
        values,
        { resetForm, setSubmitting }
    ) => {
        try {
            const payload = {
                nama_pic: values.nama_pic,
                jabatan: values.jabatan,
                message: values.message,
            };

            const res = await addTestimoni(payload);

            showToastMessage(res.message, res.success);

            if (res.success) {
                resetForm();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <NavbarPublic />

            <main className="client-experience-page">

                {/* HERO */}
                <section className="client-experience-hero">

                    <div className="client-experience-hero-grid"></div>

                    <div className="client-experience-hero-glow client-experience-hero-glow-one"></div>
                    <div className="client-experience-hero-glow client-experience-hero-glow-two"></div>

                    <div className="client-experience-container">

                        <div className="client-experience-hero-content">

                            <h1
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                {t("client-experience.hero-title")}
                                <br />
                                <span>
                                    {t("client-experience.hero-title-highlight")}
                                </span>
                            </h1>

                            <p
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                {t("client-experience.hero-description")}
                            </p>

                        </div>

                    </div>

                    <div
                        className="client-experience-hero-scroll"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        <span>
                            {t("client-experience.eyebrow")}
                        </span>

                        <span></span>
                    </div>

                </section>


                {/* EXPERIENCE FORM */}
                <section className="client-experience-section">

                    <div className="client-experience-container">

                        <div className="client-experience-heading">

                            <div data-aos="fade-right">

                                <span className="client-experience-section-label">
                                    {t("client-experience.form-label")}
                                </span>

                                <h2>
                                    {t("client-experience.form-title")}
                                    <br />
                                    <span>
                                        {t("client-experience.form-title-highlight")}
                                    </span>
                                </h2>

                            </div>

                            <div
                                className="client-experience-heading-description"
                                data-aos="fade-left"
                                data-aos-delay="150"
                            >
                                <p>
                                    {t("client-experience.form-description")}
                                </p>
                            </div>

                        </div>


                        <div
                            className="client-experience-form-wrapper"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >

                            <div className="client-experience-form-top">

                                <div>
                                    <span>
                                        {t("client-experience.feedback.label")}
                                    </span>

                                    <strong>
                                        {t("client-experience.feedback.number")}
                                    </strong>
                                </div>

                                <p>
                                    {t("client-experience.feedback.description")}
                                </p>

                            </div>


                            <Formik
                                initialValues={{
                                    nama_pic: "",
                                    jabatan: "",
                                    message: "",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={_handleSubmit}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (
                                    <form
                                        className="client-experience-form"
                                        onSubmit={handleSubmit}
                                    >

                                        <div className="client-experience-form-grid">

                                            {/* NAME */}
                                            <div className="client-experience-field">

                                                <label htmlFor="nama_pic">
                                                    {t(
                                                        "client-experience.fields.name.label"
                                                    )}
                                                </label>

                                                <input
                                                    id="nama_pic"
                                                    name="nama_pic"
                                                    type="text"
                                                    value={values.nama_pic}
                                                    onChange={handleChange}
                                                    className={
                                                        touched.nama_pic &&
                                                        errors.nama_pic
                                                            ? "is-error"
                                                            : ""
                                                    }
                                                    placeholder={t(
                                                        "client-experience.fields.name.placeholder"
                                                    )}
                                                />

                                                {touched.nama_pic &&
                                                    errors.nama_pic && (
                                                        <span className="client-experience-field-error">
                                                            {errors.nama_pic}
                                                        </span>
                                                    )}

                                            </div>


                                            {/* POSITION */}
                                            <div className="client-experience-field">

                                                <label htmlFor="jabatan">
                                                    {t(
                                                        "client-experience.fields.position.label"
                                                    )}
                                                </label>

                                                <input
                                                    id="jabatan"
                                                    name="jabatan"
                                                    type="text"
                                                    value={values.jabatan}
                                                    onChange={handleChange}
                                                    className={
                                                        touched.jabatan &&
                                                        errors.jabatan
                                                            ? "is-error"
                                                            : ""
                                                    }
                                                    placeholder={t(
                                                        "client-experience.fields.position.placeholder"
                                                    )}
                                                />

                                                {touched.jabatan &&
                                                    errors.jabatan && (
                                                        <span className="client-experience-field-error">
                                                            {errors.jabatan}
                                                        </span>
                                                    )}

                                            </div>

                                        </div>


                                        {/* MESSAGE */}
                                        <div className="client-experience-field">

                                            <div className="client-experience-message-label">

                                                <label htmlFor="message">
                                                    {t(
                                                        "client-experience.fields.message.label"
                                                    )}
                                                </label>

                                                <span>
                                                    {t(
                                                        "client-experience.fields.message.hint"
                                                    )}
                                                </span>

                                            </div>

                                            <textarea
                                                id="message"
                                                name="message"
                                                rows="7"
                                                value={values.message}
                                                onChange={handleChange}
                                                className={
                                                    touched.message &&
                                                    errors.message
                                                        ? "is-error"
                                                        : ""
                                                }
                                                placeholder={t(
                                                    "client-experience.fields.message.placeholder"
                                                )}
                                            ></textarea>

                                            {touched.message &&
                                                errors.message && (
                                                    <span className="client-experience-field-error">
                                                        {errors.message}
                                                    </span>
                                                )}

                                        </div>


                                        {/* SUBMIT */}
                                        <div className="client-experience-submit-wrapper">

                                            <div className="client-experience-submit-note">

                                                <span></span>

                                                {t(
                                                    "client-experience.privacy-note"
                                                )}

                                            </div>

                                            <button
                                                type="submit"
                                                className="client-experience-submit"
                                                disabled={
                                                    isSubmitting || loading
                                                }
                                            >
                                                {isSubmitting || loading ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>

                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>
                                                            {t(
                                                                "client-experience.button"
                                                            )}
                                                        </span>

                                                        <strong>
                                                            ↗
                                                        </strong>
                                                    </>
                                                )}
                                            </button>

                                        </div>

                                    </form>
                                )}
                            </Formik>

                        </div>

                    </div>

                </section>


                {/* TRUST SECTION */}
                <section className="client-experience-trust">

                    <div className="client-experience-container">

                        <div
                            className="client-experience-trust-inner"
                            data-aos="fade-up"
                        >

                            <div className="client-experience-trust-label">

                                <span></span>

                                {t("client-experience.trust.label")}

                            </div>

                            <h2>
                                {t("client-experience.trust.title")}
                                <br />
                                <span>
                                    {t(
                                        "client-experience.trust.title-highlight"
                                    )}
                                </span>
                            </h2>

                            <p>
                                {t(
                                    "client-experience.trust.description"
                                )}
                            </p>

                        </div>

                    </div>

                </section>


                <FooterSection />

            </main>
        </>
    );
};

export default Layout;
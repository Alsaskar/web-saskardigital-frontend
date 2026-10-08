import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Form, Spinner } from 'react-bootstrap'
// import './login.css'
import { AuthContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { useToastContext } from '@/context/ToastContext/useToastContext'

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Format email tidak valid')
        .required('Email wajib diisi'),

    password: Yup.string()
        .required('Password wajib diisi')
})

const Layout = () => {
    const { login } = useContext(AuthContext)
    const { showToastMessage } = useToastContext()
    const navigate = useNavigate()

    const handleLogin = async (values, { setSubmitting, resetForm }) => {
        try {
            const user = await login(values.email, values.password)

            if (user) {
                navigate(`/${user.role}/dashboard`)
            }
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                'Terjadi kesalahan pada server.'

            showToastMessage(errorMessage, false)

            resetForm({
                values: {
                    email: values.email || '',
                    password: '',
                },
            })

            document.getElementById('email').focus()
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">

                {/* =========================
                    BRANDING
                ========================== */}
                <div className="login-brand">
                    <div className="brand-content">

                        <div className="brand-logo">
                            <span className="brand-logo-icon">
                                <img
                                    src="/saskardigital.ico"
                                    alt="Saskardigital"
                                    style={{
                                        height: 50
                                    }}
                                />
                            </span>

                            <span className="brand-logo-text">
                                <a
                                    href="/"
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none'
                                    }}
                                >
                                    SASKARDIGITAL
                                </a>
                            </span>
                        </div>

                        <div className="brand-copy">

                            <span className="brand-label">
                                CLIENT PORTAL
                            </span>

                            <h1>
                                Semua kebutuhan project,
                                <span>
                                    dalam satu tempat.
                                </span>
                            </h1>

                            <p>
                                Akses informasi project, maintenance,
                                ticket, dan layanan digital Anda dengan
                                mudah melalui Client Portal Saskardigital.
                            </p>

                        </div>

                        <div className="brand-footer">
                            <span>
                                PT Saskardigital Solusi Indonesia
                            </span>

                            <span className="brand-dot"></span>

                            <span>
                                Client Portal
                            </span>
                        </div>

                    </div>

                    <div className="brand-decoration brand-decoration-one"></div>
                    <div className="brand-decoration brand-decoration-two"></div>
                    <div className="brand-grid"></div>
                </div>

                {/* =========================
                    LOGIN FORM
                ========================== */}
                <div className="login-form-wrapper">
                    <div className="login-form">

                        {/* Mobile Logo */}
                        <div className="mobile-logo">
                            <div className="brand-logo">

                                <span className="brand-logo-icon">
                                    <img
                                        src="/saskardigital.ico"
                                        alt="Saskardigital"
                                        style={{
                                            height: 50
                                        }}
                                    />
                                </span>

                                <span className="brand-logo-text">
                                    <a
                                        href="/"
                                        style={{
                                            color: 'black',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        SASKARDIGITAL
                                    </a>
                                </span>

                            </div>
                        </div>

                        {/* Heading */}
                        <div className="login-heading">

                            <span>
                                CLIENT PORTAL
                            </span>

                            <h2>
                                Selamat datang.
                            </h2>

                            <p>
                                Masuk untuk melihat project dan
                                layanan digital Anda.
                            </p>

                        </div>

                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleLogin}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <Form onSubmit={handleSubmit}>

                                    {/* Email */}
                                    <Form.Group className="login-field">

                                        <Form.Label>
                                            Email
                                        </Form.Label>

                                        <div
                                            className={`input-wrapper ${
                                                touched.email && errors.email
                                                    ? 'has-error'
                                                    : ''
                                            }`}
                                        >
                                            <i className="bi bi-envelope input-icon"></i>

                                            <Form.Control
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Masukkan email Anda"
                                                isInvalid={
                                                    touched.email &&
                                                    !!errors.email
                                                }
                                            />
                                        </div>

                                        {touched.email && errors.email && (
                                            <div className="field-error">

                                                <i className="bi bi-exclamation-circle"></i>

                                                <span>
                                                    {errors.email}
                                                </span>

                                            </div>
                                        )}

                                    </Form.Group>

                                    {/* Password */}
                                    <Form.Group className="login-field">

                                        <Form.Label>
                                            Password
                                        </Form.Label>

                                        <div
                                            className={`input-wrapper ${
                                                touched.password && errors.password
                                                    ? 'has-error'
                                                    : ''
                                            }`}
                                        >
                                            <i className="bi bi-lock input-icon"></i>

                                            <Form.Control
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Masukkan password Anda"
                                                isInvalid={
                                                    touched.password &&
                                                    !!errors.password
                                                }
                                            />
                                        </div>

                                        {touched.password && errors.password && (
                                            <div className="field-error">

                                                <i className="bi bi-exclamation-circle"></i>

                                                <span>
                                                    {errors.password}
                                                </span>

                                            </div>
                                        )}

                                    </Form.Group>

                                    {/* Login Button */}
                                    <Button
                                        type="submit"
                                        className="login-button"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Spinner
                                                    animation="border"
                                                    size="sm"
                                                    className="me-2"
                                                />

                                                Memproses...
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                    Masuk ke Portal
                                                </span>{" "}

                                                <i className="bi bi-arrow-right"></i>
                                            </>
                                        )}
                                    </Button>

                                </Form>
                            )}
                        </Formik>

                        {/* Bottom */}
                        <div className="login-bottom">

                            <p>
                                © {new Date().getFullYear()} PT Saskardigital Solusi Indonesia.
                                All rights reserved.
                            </p>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Layout
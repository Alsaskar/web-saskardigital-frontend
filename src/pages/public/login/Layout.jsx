import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Form, Spinner } from 'react-bootstrap'
import './login.css'
import { AuthContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { useToastContext } from '@/context/ToastContext/useToastContext';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Format email tidak valid')
        .required('Email wajib diisi'),

    password: Yup.string()
        .required('Password wajib diisi')
})

const Layout = () => {
    const { login } = useContext(AuthContext);
    const { showToastMessage } = useToastContext();
    const navigate = useNavigate();

    const handleLogin = async (values, { setSubmitting, resetForm }) => {
        try {
            // panggil API login
            const user = await login(values.email, values.password);

            if (user) {
                navigate(`/${user.role}/dashboard`);
            }
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || // Error dari API (400/500)
                err.message || // Error JS standar
                'Terjadi kesalahan pada server.'; // Fallback terakhir

            showToastMessage(errorMessage, false);

            // kosongkan form
            resetForm({
                values: {
                    email: values.email || '',
                    password: '',
                },
            });

            document.getElementById('email').focus();
        } finally {
            setSubmitting(false); // buat tombol balik normal
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-brand">
                    <div className="brand-content">
                        <div className="brand-logo">
                            <span className="brand-logo-icon">
                                <img
                                    src="/saskardigital.ico"
                                    alt=""
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
                                >SASKARDIGITAL</a>
                            </span>
                        </div>

                        <div className="brand-copy">
                            <span className="brand-label">
                                DIGITAL SOLUTIONS
                            </span>

                            <h1>
                                Membangun solusi digital
                                <span>
                                    untuk bisnis yang lebih maju.
                                </span>
                            </h1>

                            <p>
                                Kelola kebutuhan digital bisnis Anda melalui
                                satu dashboard yang terintegrasi, sederhana,
                                dan efisien.
                            </p>
                        </div>

                        <div className="brand-footer">
                            <span>
                                PT Saskardigital Solusi Indonesia
                            </span>

                            <span className="brand-dot"></span>

                            <span>
                                Digital Solutions
                            </span>
                        </div>
                    </div>

                    <div className="brand-decoration brand-decoration-one"></div>
                    <div className="brand-decoration brand-decoration-two"></div>
                    <div className="brand-grid"></div>
                </div>

                <div className="login-form-wrapper">
                    <div className="login-form">
                        <div className="mobile-logo">
                            <div className="brand-logo">
                                <span className="brand-logo-icon">
                                    <img
                                        src="/saskardigital.ico"
                                        alt=""
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
                                    >SASKARDIGITAL</a>
                                </span>
                            </div>
                        </div>

                        <div className="login-heading">
                            <span>
                                WELCOME BACK
                            </span>

                            <h2>
                                Selamat datang kembali.
                            </h2>

                            <p>
                                Silakan masuk untuk mengakses dashboard Anda.
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
                                            className={`input-wrapper ${touched.email && errors.email
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
                                            className={`input-wrapper ${touched.password && errors.password
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
                                                    Masuk ke Dashboard
                                                </span>

                                                <i className="bi bi-arrow-right"></i>
                                            </>
                                        )}
                                    </Button>
                                </Form>
                            )}
                        </Formik>

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
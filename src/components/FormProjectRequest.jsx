import { Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import '../styles/form-request-project.css'
import { useProjectRequest } from '../modules/project-request/hooks/useProjectRequest'
import { useToastContext } from '@/context/ToastContext/useToastContext'

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required'),

    company: Yup.string()
        .required('Company name is required'),

    email: Yup.string()
        .email('Invalid email format')
        .required('Email address is required'),

    phone: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]+$/, 'Phone number must contain digits only')
        .min(9, 'Phone number must be at least 9 digits')
        .max(15, 'Phone number must not exceed 15 digits'),

    projectType: Yup.string()
        .required('Please select a project type'),

    budget: Yup.string()
        .required('Please select your budget'),

    timeline: Yup.string()
        .required('Please select your project timeline'),

    message: Yup.string()
        .required('Please tell us about your project')
        .min(10, 'Message must be at least 10 characters'),
})

const FormProjectRequest = () => {
    const { t } = useTranslation()
    const { addProjectRequest, loading } = useProjectRequest()
    const { showToastMessage } = useToastContext()

    const _handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            const payload = {
                nama_lengkap: values.name,
                nama_company: values.company,
                email: values.email,
                no_wa: values.phone,
                jenis_project: values.projectType,
                estimasi_budget: values.budget,
                target_project: values.timeline,
                kebutuhan: values.message,
                source: 'website'
            }

            const res = await addProjectRequest(payload)

            showToastMessage(res.message, res.success)

            if (res.success) {
                resetForm()
            }
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="request-project-form-wrapper">
            <Formik
                initialValues={{
                    name: '',
                    company: '',
                    email: '',
                    phone: '',
                    projectType: '',
                    budget: '',
                    timeline: '',
                    message: '',
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
                        onSubmit={handleSubmit}
                        className="request-project-form"
                    >
                        <div className="request-project-form-heading">
                            <span>
                                {t('request-project-form.step')}
                            </span>

                            <h3>
                                {t('request-project-form.title')}
                            </h3>
                        </div>

                        <div className="row g-4">

                            {/* Name */}
                            <div className="col-md-6">
                                <div className="request-field">
                                    <label htmlFor="name">
                                        {t('request-project-form.fields.name.label')}
                                    </label>

                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        className={
                                            touched.name && errors.name
                                                ? 'is-error'
                                                : ''
                                        }
                                        placeholder={t(
                                            'request-project-form.fields.name.placeholder'
                                        )}
                                    />

                                    {touched.name && errors.name && (
                                        <span className="request-field-error">
                                            {errors.name}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Company */}
                            <div className="col-md-6">
                                <div className="request-field">
                                    <label htmlFor="company">
                                        {t('request-project-form.fields.company.label')}
                                    </label>

                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={values.company}
                                        onChange={handleChange}
                                        className={
                                            touched.company && errors.company
                                                ? 'is-error'
                                                : ''
                                        }
                                        placeholder={t(
                                            'request-project-form.fields.company.placeholder'
                                        )}
                                    />

                                    {touched.company && errors.company && (
                                        <span className="request-field-error">
                                            {errors.company}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div className="col-md-6">
                                <div className="request-field">
                                    <label htmlFor="email">
                                        {t('request-project-form.fields.email.label')}
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        className={
                                            touched.email && errors.email
                                                ? 'is-error'
                                                : ''
                                        }
                                        placeholder={t(
                                            'request-project-form.fields.email.placeholder'
                                        )}
                                    />

                                    {touched.email && errors.email && (
                                        <span className="request-field-error">
                                            {errors.email}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="col-md-6">
                                <div className="request-field">
                                    <label htmlFor="phone">
                                        {t('request-project-form.fields.phone.label')}
                                    </label>

                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={values.phone}
                                        onChange={(e) => {
                                            const value = e.target.value
                                                .replace(/\D/g, '')
                                                .replace(/^62/, '')
                                                .replace(/^0/, '')

                                            handleChange({
                                                target: {
                                                    name: 'phone',
                                                    value,
                                                },
                                            })
                                        }}
                                        className={
                                            touched.phone && errors.phone
                                                ? 'is-error'
                                                : ''
                                        }
                                        placeholder={t(
                                            'request-project-form.fields.phone.placeholder'
                                        )}
                                    />

                                    {touched.phone && errors.phone && (
                                        <span className="request-field-error">
                                            {errors.phone}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Project Type */}
                            <div className="col-12">
                                <div className="request-field">
                                    <label htmlFor="projectType">
                                        {t('request-project-form.fields.project-type.label')}
                                    </label>

                                    <select
                                        id="projectType"
                                        name="projectType"
                                        value={values.projectType}
                                        onChange={handleChange}
                                        className={
                                            touched.projectType && errors.projectType
                                                ? 'is-error'
                                                : ''
                                        }
                                    >
                                        <option value="">
                                            {t(
                                                'request-project-form.fields.project-type.placeholder'
                                            )}
                                        </option>

                                        <option value="company-profile">
                                            {t(
                                                'request-project-form.fields.project-type.options.company-profile'
                                            )}
                                        </option>

                                        <option value="web-application">
                                            {t(
                                                'request-project-form.fields.project-type.options.web-application'
                                            )}
                                        </option>

                                        <option value="mobile-application">
                                            {t(
                                                'request-project-form.fields.project-type.options.mobile-application'
                                            )}
                                        </option>

                                        <option value="business-system">
                                            {t(
                                                'request-project-form.fields.project-type.options.business-system'
                                            )}
                                        </option>

                                        <option value="custom">
                                            {t(
                                                'request-project-form.fields.project-type.options.custom'
                                            )}
                                        </option>

                                        <option value="maintenance">
                                            {t(
                                                'request-project-form.fields.project-type.options.maintenance'
                                            )}
                                        </option>
                                    </select>

                                    {touched.projectType && errors.projectType && (
                                        <span className="request-field-error">
                                            {errors.projectType}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Budget */}
                            <div className="col-md-6">
                                <div className="request-field">
                                    <label htmlFor="budget">
                                        {t('request-project-form.fields.budget.label')}
                                    </label>

                                    <select
                                        id="budget"
                                        name="budget"
                                        value={values.budget}
                                        onChange={handleChange}
                                        className={
                                            touched.budget && errors.budget
                                                ? 'is-error'
                                                : ''
                                        }
                                    >
                                        <option value="">
                                            {t(
                                                'request-project-form.fields.budget.placeholder'
                                            )}
                                        </option>

                                        <option value="under-5">
                                            {t(
                                                'request-project-form.fields.budget.options.under-5'
                                            )}
                                        </option>

                                        <option value="5-10">
                                            {t(
                                                'request-project-form.fields.budget.options.5-10'
                                            )}
                                        </option>

                                        <option value="10-25">
                                            {t(
                                                'request-project-form.fields.budget.options.10-25'
                                            )}
                                        </option>

                                        <option value="25-50">
                                            {t(
                                                'request-project-form.fields.budget.options.25-50'
                                            )}
                                        </option>

                                        <option value="50-plus">
                                            {t(
                                                'request-project-form.fields.budget.options.50-plus'
                                            )}
                                        </option>

                                        <option value="discuss">
                                            {t(
                                                'request-project-form.fields.budget.options.discuss'
                                            )}
                                        </option>
                                    </select>

                                    {touched.budget && errors.budget && (
                                        <span className="request-field-error">
                                            {errors.budget}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="col-md-6">
                                <div className="request-field">
                                    <label htmlFor="timeline">
                                        {t('request-project-form.fields.timeline.label')}
                                    </label>

                                    <select
                                        id="timeline"
                                        name="timeline"
                                        value={values.timeline}
                                        onChange={handleChange}
                                        className={
                                            touched.timeline && errors.timeline
                                                ? 'is-error'
                                                : ''
                                        }
                                    >
                                        <option value="">
                                            {t(
                                                'request-project-form.fields.timeline.placeholder'
                                            )}
                                        </option>

                                        <option value="asap">
                                            {t(
                                                'request-project-form.fields.timeline.options.asap'
                                            )}
                                        </option>

                                        <option value="1-month">
                                            {t(
                                                'request-project-form.fields.timeline.options.1-month'
                                            )}
                                        </option>

                                        <option value="1-3-months">
                                            {t(
                                                'request-project-form.fields.timeline.options.1-3-months'
                                            )}
                                        </option>

                                        <option value="3-plus-months">
                                            {t(
                                                'request-project-form.fields.timeline.options.3-plus-months'
                                            )}
                                        </option>

                                        <option value="flexible">
                                            {t(
                                                'request-project-form.fields.timeline.options.flexible'
                                            )}
                                        </option>
                                    </select>

                                    {touched.timeline && errors.timeline && (
                                        <span className="request-field-error">
                                            {errors.timeline}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Message */}
                            <div className="col-12">
                                <div className="request-field">
                                    <label htmlFor="message">
                                        {t('request-project-form.fields.message.label')}
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={values.message}
                                        onChange={handleChange}
                                        className={
                                            touched.message && errors.message
                                                ? 'is-error'
                                                : ''
                                        }
                                        placeholder={t(
                                            'request-project-form.fields.message.placeholder'
                                        )}
                                    ></textarea>

                                    {touched.message && errors.message && (
                                        <span className="request-field-error">
                                            {errors.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                        </div>

                        <div className="request-project-form-footer">
                            <span>
                                {t('request-project-form.footer.note')}
                            </span>

                            <button
                                type="submit"
                                disabled={isSubmitting || loading}
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
                                        {t('request-project-form.footer.button')}
                                        <i className="bi bi-arrow-up-right"></i>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default FormProjectRequest
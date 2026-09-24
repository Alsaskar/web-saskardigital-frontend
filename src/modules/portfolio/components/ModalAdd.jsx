import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { usePortfolio } from '../hooks/usePortfolio';
import { useRef } from 'react';

export const validationSchema = Yup.object({
    title: Yup.string().required('Title wajib diisi'),
    sub_title: Yup.string().required('Sub Title wajib diisi'),
    category_service: Yup.string().required('Category Service wajib diisi'),
    project_type: Yup.string().required('Project Type wajib diisi'),
    description: Yup.string(),
    thumbnail: Yup.mixed()
        .required('Thumbnail wajib diisi')
        .test(
            'fileType',
            'Format foto harus JPG, JPEG, PNG, JFIF',
            (value) => {
                if (!value) return true;

                const allowedTypes = [
                    'image/jpeg',
                    'image/jpg',
                    'image/png',
                ];

                return allowedTypes.includes(value.type);
            }
        )
        .test(
            'fileSize',
            'Ukuran foto maksimal 5 MB',
            (value) => {
                if (!value) return true;

                return value.size <= 5 * 1024 * 1024;
            }
        ),
    website_url: Yup.string(),
    start_date: Yup.date().required('Start Date wajib diisi'),
    finish_date: Yup.date().required('Finish Date wajib diisi'),
    status: Yup.string(),
});

const ModalAddPortfolio = ({ show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToastMessage } = useToastContext();
    const { addPortfolio, loading } = usePortfolio()

    const fileInputRef = useRef(null);

    const _handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData()

        formData.append("title", values.title);
        formData.append("sub_title", values.sub_title);
        formData.append("category_service", values.category_service);
        formData.append("project_type", values.project_type);
        formData.append("description", values.description);
        formData.append("thumbnail", values.thumbnail);
        formData.append("website_url", values.website_url);
        formData.append("start_date", values.start_date);
        formData.append("finish_date", values.finish_date);
        formData.append("status", values.status);

        const res = await addPortfolio(formData);

        showToastMessage(res.message, res.success);

        if (res.success) {
            resetForm();

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            onSuccess();
            handleClose();
        }
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tambahkan Portfolio Baru</Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        title: '',
                        sub_title: '',
                        category_service: '',
                        project_type: '',
                        description: '',
                        thumbnail: null,
                        website_url: '',
                        start_date: '',
                        finish_date: '',
                        status: 'draft',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={_handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group>
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                value={values.title}
                                                onChange={handleChange}
                                                isInvalid={touched.title && errors.title}
                                                placeholder="Masukkan Title"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.title}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group>
                                            <Form.Label>Sub Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="sub_title"
                                                value={values.sub_title}
                                                onChange={handleChange}
                                                isInvalid={touched.sub_title && errors.sub_title}
                                                placeholder="Ex: Bussiness System"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.sub_title}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Pilih Kategori</Form.Label>
                                            <Form.Select
                                                name="category_service"
                                                value={values.category_service}
                                                onChange={handleChange}
                                                isInvalid={touched.category_service && errors.category_service}
                                            >
                                                <option value="">------</option>
                                                <option value="web company profile">Web Company Profile</option>
                                                <option value="software custom">Software Custom</option>
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.category_service}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Project Type</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="project_type"
                                                value={values.project_type}
                                                onChange={handleChange}
                                                isInvalid={touched.project_type && errors.project_type}
                                                placeholder="Ex: Web Application/SaaS Platform"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.project_type}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <Form.Group className="mt-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        isInvalid={touched.description && errors.description}
                                        placeholder="Masukkan Description"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Thumbnail</Form.Label>
                                            <Form.Control
                                                ref={fileInputRef}
                                                type="file"
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "thumbnail",
                                                        e.currentTarget.files[0]
                                                    );
                                                }}
                                                isInvalid={touched.thumbnail && errors.thumbnail}
                                            />
                                            <Form.Text muted>Format yang didukung: JPG, JPEG, PNG.</Form.Text>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.thumbnail}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Website Url</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="website_url"
                                                value={values.website_url}
                                                onChange={handleChange}
                                                isInvalid={touched.website_url && errors.website_url}
                                                placeholder="https://"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.website_url}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="start_date"
                                                value={values.start_date}
                                                onChange={handleChange}
                                                isInvalid={touched.start_date && errors.start_date}
                                                placeholder="Masukkan Start Date"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.start_date}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Finish Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="finish_date"
                                                value={values.finish_date}
                                                onChange={handleChange}
                                                isInvalid={touched.finish_date && errors.finish_date}
                                                placeholder="Masukkan Finish Date"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.finish_date}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <Form.Group className="mt-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={values.status}
                                        onChange={handleChange}
                                        isInvalid={touched.status && errors.status}
                                    >
                                        <option value="">------</option>
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </Form.Select>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.status}
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Modal.Body>

                            <Modal.Footer>
                                {loading ?
                                    <Button variant="primary" type="button" disabled>
                                        <Spinner animation="border" size="sm" /> Menyimpan...
                                    </Button>
                                    : <Button variant="primary" type="submit">Simpan</Button>}

                                <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                >
                                    Batal
                                </Button>
                            </Modal.Footer>
                        </form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default ModalAddPortfolio;

import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useTicket } from '../hooks/useTicket';
import { useProject } from '../../project/hooks/useProject';
import { useEffect, useState } from 'react';
import RichTextEditor from '../../../components/RichTextEditor';
import { useClient } from '../../client/hooks/useClient';

export const validationSchema = Yup.object({
    projectId: Yup.string().required('Project wajib dipilih'),
    subject: Yup.string().required('Subject wajib diisi'),
    description: Yup.string().required('Description wajib diisi'),
    priority: Yup.string().required('Priority wajib dipilih'),
    category: Yup.string().required('Category wajib dipilih'),
});

const ModalAddTicket = ({ clientId, isAdmin = false, show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToastMessage } = useToastContext();
    const { addTicket, loading } = useTicket()
    const { listAllProject } = useProject()
    const [projects, setProjects] = useState([])

    const { fetchClientAll } = useClient()
    const [clients, setClients] = useState([])

    const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;
    const [pendingImages, setPendingImages] = useState([]);

    /* Ketika modal ditutup, bersihkan pending images. */
    useEffect(() => {
        if (!show) {
            setPendingImages([]);
        }
    }, [show]);

    const _fetchClient = async () => {
        const res = await fetchClientAll();

        if (res) {
            setClients(res.data);
        }
    }

    useEffect(() => {
        if (!show) return;

        _fetchClient()
    }, [show])

    const _handleSubmit = async (values, { resetForm }) => {
        let description = values.description;
        description = description.replaceAll(
            `src="${BACKEND_URL}/assets/`,
            'src="/assets/'
        );

        pendingImages.forEach((image) => {
            description = description.replaceAll(
                image.previewUrl,
                `__PENDING_IMAGE_${image.id}__`
            );
        });

        const formData = new FormData();

        formData.append("subject", values.subject);
        formData.append("description", description);
        formData.append("priority", values.priority);
        formData.append("category", values.category);
        formData.append("projectId", values.projectId);

        if (isAdmin) {
            formData.append("clientId", values.clientId);
        } else {
            formData.append("clientId", clientId);
        }

        /* Content images */
        pendingImages.forEach((image) => {
            formData.append("content_images", image.file);
            formData.append("content_image_ids", image.id);
        });

        const res = await addTicket(formData);

        showToastMessage(res.message, res.success);

        if (res.success) {
            pendingImages.forEach((image) => {
                URL.revokeObjectURL(
                    image.previewUrl
                );
            });

            resetForm();
            onSuccess();
            handleClose();
        }
    };

    const _fetchProject = async () => {
        const res = await listAllProject();

        if (res) {
            setProjects(res.data);
        }
    }

    useEffect(() => {
        if (!show) return;

        _fetchProject()
    }, [show])

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Buat Ticket</Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        subject: '',
                        description: '',
                        priority: 'medium',
                        category: 'technical support',
                        projectId: '',
                        clientId: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={_handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body>

                                {isAdmin && (
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Pilih Client</Form.Label>
                                        <Form.Select
                                            name="clientId"
                                            value={values.clientId}
                                            onChange={handleChange}
                                        >
                                            <option value="">Pilih Client</option>
                                            {clients.map((item) => (
                                                <option value={item.id} key={item.id}>
                                                    {item.nama_company}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                )}

                                <Form.Group>
                                    <Form.Label>Pilih Projek</Form.Label>
                                    <Form.Select
                                        name="projectId"
                                        value={values.projectId}
                                        onChange={handleChange}
                                        isInvalid={touched.projectId && errors.projectId}
                                    >
                                        <option value="">------</option>
                                        {projects.map((item, index) => {
                                            return (
                                                <option value={item.id} key={index}>{item.nama}</option>
                                            )
                                        })}
                                    </Form.Select>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.projectId}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className='mt-3'>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="subject"
                                        value={values.subject}
                                        onChange={handleChange}
                                        isInvalid={touched.subject && errors.subject}
                                        placeholder="Masukkan Subject"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.subject}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mt-3">
                                    <Form.Label>Description</Form.Label>
                                    <RichTextEditor
                                        value={values.description}
                                        onChange={(description) => {
                                            setFieldValue('description', description);
                                        }}
                                        onPendingImagesChange={setPendingImages}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Priority</Form.Label>
                                            <Form.Select
                                                name="priority"
                                                value={values.priority}
                                                onChange={handleChange}
                                                isInvalid={touched.priority && errors.priority}
                                            >
                                                <option value="">------</option>
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                                <option value="urgent">Urgent</option>
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.priority}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select
                                                name="category"
                                                value={values.category}
                                                onChange={handleChange}
                                                isInvalid={touched.category && errors.category}
                                            >
                                                <option value="">------</option>
                                                <option value="bug">Bug</option>
                                                <option value="feature request">Feature Request</option>
                                                <option value="technical support">Technical Support</option>
                                                <option value="account">Account</option>
                                                <option value="billing">Billing</option>
                                                <option value="other">Other</option>
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.category}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

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

export default ModalAddTicket;

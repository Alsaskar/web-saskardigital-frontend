import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useMaintenance } from '../hooks/useMaintenance';
import { useProject } from '../../project/hooks/useProject';
import { useEffect, useState } from 'react';
import { formatNumber } from '../../../utils/utilHook';

export const validationSchema = Yup.object({
    projectId: Yup.number().required('ProjectId wajib diisi'),
    title: Yup.string().required('Title wajib diisi'),
    description: Yup.string(),
    start_date: Yup.date().required('Start Date wajib diisi'),
    end_date: Yup.date().required('End Date wajib diisi'),
    price: Yup.number().required('Price wajib diisi'),
    billing_cycle: Yup.string().required('Billing Cycle wajib diisi'),
    status: Yup.string(),
});

const ModalAddMaintenance = ({ show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToastMessage } = useToastContext();
    const { addMaintenance, loading } = useMaintenance()
    const { listAllProject } = useProject()

    const [projects, setProjects] = useState([])

    const _handleSubmit = async (values, { resetForm }) => {
        const payload = {
            projectId: values.projectId,
            title: values.title,
            description: values.description,
            start_date: values.start_date,
            end_date: values.end_date,
            price: values.price,
            billing_cycle: values.billing_cycle,
            status: values.status,
        };

        const res = await addMaintenance(payload);

        showToastMessage(res.message, res.success);

        if (res.success) {
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
                    <Modal.Title>Tambahkan Maintenance Baru</Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        projectId: '',
                        title: '',
                        description: '',
                        start_date: '',
                        end_date: '',
                        price: '',
                        billing_cycle: 'monthly',
                        status: 'pending',
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
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group>
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                value={values.title}
                                                onChange={handleChange}
                                                isInvalid={touched.title && errors.title}
                                                placeholder="Ex: Support & Maintenance Website"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.title}
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
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="end_date"
                                                value={values.end_date}
                                                onChange={handleChange}
                                                isInvalid={touched.end_date && errors.end_date}
                                                placeholder="Masukkan End Date"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.end_date}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="price"
                                                value={formatNumber(values.price)}
                                                onChange={(e) => {
                                                    const rawValue = e.target.value.replace(/\D/g, '');

                                                    setFieldValue('price', rawValue);
                                                }}
                                                isInvalid={touched.price && errors.price}
                                                placeholder="Masukkan Price"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.price}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Billing Cycle</Form.Label>
                                            <Form.Select
                                                name="billing_cycle"
                                                value={values.billing_cycle}
                                                onChange={handleChange}
                                                isInvalid={touched.billing_cycle && errors.billing_cycle}
                                            >
                                                <option value="">------</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="quarterly">Quarterly</option>
                                                <option value="yearly">Yearly</option>
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.billing_cycle}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <Form.Group className="mt-3">
                                    <Form.Label>Pilih Status</Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={values.status}
                                        onChange={handleChange}
                                        isInvalid={touched.status && errors.status}
                                    >
                                        <option value="">------</option>
                                        <option value="pending">Pending</option>
                                        <option value="active">Active</option>
                                        <option value="expired">Expired</option>
                                        <option value="cancelled">Cancelled</option>
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

export default ModalAddMaintenance;

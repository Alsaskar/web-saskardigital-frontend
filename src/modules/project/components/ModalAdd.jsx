import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useProject } from '../hooks/useProject';
import { useEffect, useState } from 'react';
import { useClient } from '../../client/hooks/useClient'
import { formatNumber } from '../../../utils/utilHook';

export const validationSchema = Yup.object({
    clientId: Yup.string().required('Client wajib diisi'),
    nama: Yup.string().required('Judul Project wajib diisi'),
    project_type: Yup.string().required('Project Type wajib diisi'),
    category_service: Yup.string().required('Kategori wajib diisi'),
    description: Yup.string(),
    contract_value: Yup.number().required('Contract Value wajib diisi'),
    start_date: Yup.date(),
    deadline: Yup.date(),
    project_manager: Yup.string().required('Project Manager wajib diisi'),
    notes: Yup.string(),
});

const ModalAddProject = ({ show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToastMessage } = useToastContext();
    const { addProject, loading } = useProject()
    const { fetchClientAll } = useClient()

    const [clients, setClients] = useState([])

    const _handleSubmit = async (values, { resetForm }) => {
        const payload = {
            clientId: values.clientId,
            nama: values.nama,
            project_type: values.project_type,
            category_service: values.category_service,
            description: values.description,
            contract_value: values.contract_value,
            start_date: values.start_date,
            deadline: values.deadline,
            project_manager: values.project_manager,
            notes: values.notes,
        };

        const res = await addProject(payload);

        showToastMessage(res.message, res.success);

        if (res.success) {
            resetForm();
            onSuccess();
            handleClose();
        }
    };

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

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tambahkan Project Baru</Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        clientId: '',
                        nama: '',
                        project_type: '',
                        category_service: '',
                        description: '',
                        contract_value: '',
                        start_date: '',
                        deadline: '',
                        project_manager: '',
                        notes: '',
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
                                            <Form.Label>Pilih Client</Form.Label>
                                            <Form.Select
                                                name="clientId"
                                                value={values.clientId}
                                                onChange={handleChange}
                                                isInvalid={touched.clientId && errors.clientId}
                                            >
                                                <option value="">------</option>
                                                {clients.map((item, index) => {
                                                    return (
                                                        <option value={item.id} key={index}>{item.nama_company}</option>
                                                    )
                                                })}
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.clientId}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group>
                                            <Form.Label>Nama</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nama"
                                                value={values.nama}
                                                onChange={handleChange}
                                                isInvalid={touched.nama && errors.nama}
                                                placeholder="Masukkan Judul Project"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.nama}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Tipe Project</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="project_type"
                                                value={values.project_type}
                                                onChange={handleChange}
                                                isInvalid={touched.project_type && errors.project_type}
                                                placeholder="Contoh: HRIS/CRM/etc"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.project_type}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
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

                                <Form.Group className="mt-3">
                                    <Form.Label>Contract Value</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="contract_value"
                                        value={formatNumber(values.contract_value)}
                                        onChange={(e) => {
                                            const rawValue = e.target.value.replace(/\D/g, '');

                                            setFieldValue('contract_value', rawValue);
                                        }}
                                        isInvalid={touched.contract_value && errors.contract_value}
                                        placeholder="Masukkan Contract Value"
                                    />
                                    
                                    <Form.Control.Feedback type="invalid">
                                        {errors.contract_value}
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
                                            <Form.Label>Deadline</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="deadline"
                                                value={values.deadline}
                                                onChange={handleChange}
                                                isInvalid={touched.deadline && errors.deadline}
                                                placeholder="Masukkan Deadline"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.deadline}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <Form.Group className="mt-3">
                                    <Form.Label>Project Manager</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="project_manager"
                                        value={values.project_manager}
                                        onChange={handleChange}
                                        isInvalid={touched.project_manager && errors.project_manager}
                                        placeholder="Masukkan Project Manager"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.project_manager}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mt-3">
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="notes"
                                        value={values.notes}
                                        onChange={handleChange}
                                        isInvalid={touched.notes && errors.notes}
                                        placeholder="Masukkan Notes"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.notes}
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

export default ModalAddProject;

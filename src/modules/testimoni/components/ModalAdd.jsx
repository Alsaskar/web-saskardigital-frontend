import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useTestimoni } from '../hooks/useTestimoni';
import { useClient } from '../../client/hooks/useClient';
import { useEffect, useState } from 'react';

export const validationSchema = Yup.object({
    clientId: Yup.number().required('Client wajib diisi'),
    nama_pic: Yup.string().required('Nama Pic wajib diisi'),
    jabatan: Yup.string().required('Jabatan wajib diisi'),
    message: Yup.string().required('Message wajib diisi'),
    status: Yup.string().required('Status wajib diisi'),
});

const ModalAddTestimoni = ({ show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToastMessage } = useToastContext();
    const { addTestimoni, loading } = useTestimoni()
    const { fetchClientAll } = useClient()

    const [listClient, setListClient] = useState([])

    const _fetchListClient = async () => {
        const res = await fetchClientAll();

        if (res) {
            setListClient(res.data);
        }
    };

    useEffect(() => {
        if (!show) return;

        _fetchListClient()
    }, [show])

    const _handleSubmit = async (values, { resetForm }) => {
        const payload = {
            clientId: values.clientId,
            nama_pic: values.nama_pic,
            jabatan: values.jabatan,
            message: values.message,
            status: values.status,
        };

        const res = await addTestimoni(payload);

        showToastMessage(res.message, res.success);

        if (res.success) {
            resetForm();
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
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tambahkan Testimoni Baru</Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        clientId: '',
                        nama_pic: '',
                        jabatan: '',
                        message: '',
                        status: 'draft',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={_handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body>

                                <Form.Group>
                                    <Form.Label>Pilih Client</Form.Label>
                                    <Form.Select
                                        name="clientId"
                                        value={values.clientId}
                                        onChange={handleChange}
                                        isInvalid={touched.clientId && errors.clientId}
                                    >
                                        <option value="">----------</option>

                                        {listClient.map((data, index) => {
                                            return (
                                                <option value={data.id} key={index}>{data.nama_company}</option>
                                            )
                                        })}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.clientId}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Nama PIC</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nama_pic"
                                                value={values.nama_pic}
                                                onChange={handleChange}
                                                isInvalid={touched.nama_pic && errors.nama_pic}
                                                placeholder="Masukkan Nama PIC"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.nama_pic}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Jabatan</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="jabatan"
                                                value={values.jabatan}
                                                onChange={handleChange}
                                                isInvalid={touched.jabatan && errors.jabatan}
                                                placeholder="Masukkan Jabatan"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.jabatan}
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
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.status}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mt-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="message"
                                        value={values.message}
                                        onChange={handleChange}
                                        isInvalid={touched.message && errors.message}
                                        placeholder="Masukkan Message"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.message}
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

export default ModalAddTestimoni;

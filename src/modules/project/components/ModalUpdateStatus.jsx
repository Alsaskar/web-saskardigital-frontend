import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useProject } from '../hooks/useProject';

export const validationSchema = Yup.object({
    status: Yup.string().required('Status wajib diisi'),
});

const ModalUpdateStatusProject = ({ data, show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToastMessage } = useToastContext();
    const { updateStatusProject, loading } = useProject()

    const _handleSubmit = async (values, { resetForm }) => {
        const payload = {
            status: values.status,
        };

        const res = await updateStatusProject(data.id, payload);

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
                    <Modal.Title>Update Status Project</Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        status: data.status || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={_handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body>

                                <h5>Yakin ingin update status project ini?</h5>
                                <div>Anda akan melakukan update status pada project <b><i>{data.nama}</i></b></div><hr />

                                <Form.Group className="mt-3">
                                    <Form.Label>Pilih Status</Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={values.status}
                                        onChange={handleChange}
                                        isInvalid={touched.status && errors.status}
                                    >
                                        <option value="">------</option>
                                        <option value="planning">Planning</option>
                                        <option value="in progress">In Progress</option>
                                        <option value="on hold">On Hold</option>
                                        <option value="completed">Completed</option>
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

export default ModalUpdateStatusProject;

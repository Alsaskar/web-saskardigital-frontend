import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useLeads } from '../hooks/useLeads';

export const validationSchema = Yup.object({
    status: Yup.string().required('Status wajib diisi'),
    follow_up_at: Yup.string().when('status', {
        is: (status) => status !== 'won' && status !== 'lost',
        then: (schema) => schema.required('Tanggal Follow Up wajib diisi'),
        otherwise: (schema) => schema.notRequired(),
    }),
});

const ModalUpdateStatusLeads = ({ data, show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToastMessage } = useToastContext();
    const { updateStatusLeads, loading } = useLeads()

    const _handleSubmit = async (values, { resetForm }) => {
        const payload = {
            status: values.status,
            follow_up_at: values.status === 'won' || values.status === 'lost'
                ? null
                : values.follow_up_at,
            notes: values.notes,
        };

        const res = await updateStatusLeads(data.id, payload);

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
                    <Modal.Title>Update Status Leads</Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        status: data.status || '',
                        follow_up_at: '',
                        notes: data.notes || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={_handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body>

                                <Form.Group>
                                    <Form.Label>Pilih Status</Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={values.status}
                                        onChange={(e) => {
                                            const status = e.target.value;

                                            handleChange(e);

                                            if (status === 'won' || status === 'lost') {
                                                setFieldValue('follow_up_at', '');
                                            }
                                        }}
                                        isInvalid={touched.status && errors.status}
                                    >
                                        <option value="">------</option>
                                        <option value="qualified">Qualified</option>
                                        <option value="project request">Project Request</option>
                                        <option value="proposal">Proposal</option>
                                        <option value="negotation">Negotation</option>
                                        <option value="won">Won</option>
                                        <option value="lost">Lost</option>
                                    </Form.Select>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.status}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {values.status !== 'won' && values.status !== 'lost' && (
                                    <Form.Group className='mt-3'>
                                        <Form.Label>Tanggal Di Follow Up Lagi</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="follow_up_at"
                                            value={values.follow_up_at}
                                            onChange={handleChange}
                                            isInvalid={touched.follow_up_at && errors.follow_up_at}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.follow_up_at}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                )}

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

export default ModalUpdateStatusLeads;
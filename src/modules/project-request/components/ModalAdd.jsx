import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useProjectRequest } from '../hooks/useProjectRequest';

export const validationSchema = Yup.object({
    nama_company: Yup.string().required('Perusahaan wajib diisi'),
    jenis_project: Yup.string().required('Jenis Project wajib diisi'),
    estimasi_budget: Yup.string().required('Estimasi Budget wajib diisi'),
    target_project: Yup.string().required('Target Project wajib diisi'),
    kebutuhan: Yup.string().required('Kebutuhan wajib diisi'),
});

const ModalAddProjectRequest = ({ leadId, show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToastMessage } = useToastContext();
    const { addProjectRequest, loading } = useProjectRequest()

    const _handleSubmit = async (values, { resetForm }) => {
        const payload = {
            leadId: leadId,
            nama_company: values.nama_company,
            jenis_project: values.jenis_project,
            estimasi_budget: values.estimasi_budget,
            target_project: values.target_project,
            kebutuhan: values.kebutuhan,
        };

        const res = await addProjectRequest(payload);

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
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tambahkan Project Request Baru</Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        nama_company: '',
                        jenis_project: '',
                        estimasi_budget: '',
                        target_project: '',
                        kebutuhan: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={_handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group>
                                            <Form.Label>Perusahaan</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nama_company"
                                                value={values.nama_company}
                                                onChange={handleChange}
                                                isInvalid={touched.nama_company && errors.nama_company}
                                                placeholder="Masukkan Nama Perusahaan"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.nama_company}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group>
                                            <Form.Label>Jenis Project</Form.Label>
                                            <Form.Select
                                                name="jenis_project"
                                                value={values.jenis_project}
                                                onChange={handleChange}
                                                isInvalid={touched.jenis_project && errors.jenis_project}
                                            >
                                                <option value="">------</option>
                                                <option value="Company Profile Website">Company Profile Website</option>
                                                <option value="Web Application">Web Application</option>
                                                <option value="Mobile Application">Mobile Application</option>
                                                <option value="Business System / CRM / HRIS">Business System / CRM / HRIS</option>
                                                <option value="Custom Project">Custom Project</option>
                                                <option value="Maintenance / Existing System Development">Maintenance / Existing System Development</option>
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.jenis_project}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <Form.Group>
                                            <Form.Label>Estimasi Budget</Form.Label>
                                            <Form.Select
                                                name="estimasi_budget"
                                                value={values.estimasi_budget}
                                                onChange={handleChange}
                                                isInvalid={touched.estimasi_budget && errors.estimasi_budget}
                                            >
                                                <option value="">------</option>
                                                <option value="Dibawah Rp 5 juta">Dibawah Rp 5 juta</option>
                                                <option value="Rp 5 - Rp 10 juta">Rp 5 - Rp 10 juta</option>
                                                <option value="Rp 10 - Rp 25 juta">Rp 10 - Rp 25 juta</option>
                                                <option value="Rp 25 - Rp 50 juta">Rp 25 - Rp 50 juta</option>
                                                <option value="Di atas Rp 50 juta">Di atas Rp 50 juta</option>
                                                <option value="Ingin dikonsultasikan">Ingin dikonsultasikan</option>
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.estimasi_budget}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group>
                                            <Form.Label>Target Project</Form.Label>
                                            <Form.Select
                                                name="target_project"
                                                value={values.target_project}
                                                onChange={handleChange}
                                                isInvalid={touched.target_project && errors.target_project}
                                            >
                                                <option value="">------</option>
                                                <option value="Secepatnya">Secepatnya</option>
                                                <option value="1 – 3 bulan">1 – 3 bulan</option>
                                                <option value="Lebih dari 3 bulan">Lebih dari 3 bulan</option>
                                                <option value="Fleksibel">Fleksibel</option>
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.target_project}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <Form.Group className="mt-3">
                                    <Form.Label>Kebutuhan</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="kebutuhan"
                                        value={values.kebutuhan}
                                        onChange={handleChange}
                                        isInvalid={touched.kebutuhan && errors.kebutuhan}
                                        placeholder="Masukkan Kebutuhan"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.kebutuhan}
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

export default ModalAddProjectRequest;

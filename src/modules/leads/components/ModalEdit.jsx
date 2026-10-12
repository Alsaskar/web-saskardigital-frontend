import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useLeads } from '../hooks/useLeads';

export const validationSchema = Yup.object({
    nama_lengkap: Yup.string().required('Nama Lengkap wajib diisi'),
    no_wa: Yup.string().required('No Wa wajib diisi'),
    source: Yup.string().required('Source wajib diisi'),
    notes: Yup.string(),
});

const ModalEditLeads = ({ data, show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToastMessage } = useToastContext();
    const { editLeads, loading } = useLeads()

    const _handleSubmit = async (values, { resetForm }) => {
        const payload = {
            nama_lengkap: values.nama_lengkap,
            email: values.email,
            no_wa: values.no_wa,
            source: values.source,
            sosial_media: values.sosial_media,
            notes: values.notes,
        };

        const res = await editLeads(data.id, payload);

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
                    <Modal.Title>Edit Data Leads</Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        nama_lengkap: data.nama_lengkap || '',
                        email: data.email || '',
                        no_wa: data.no_wa || '',
                        source: data.source || '',
                        sosial_media: data.sosial_media || '',
                        notes: data.notes || '',
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
                                            <Form.Label>Nama Lengkap <font color="red">*</font></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nama_lengkap"
                                                value={values.nama_lengkap}
                                                onChange={handleChange}
                                                isInvalid={touched.nama_lengkap && errors.nama_lengkap}
                                                placeholder="Masukkan Nama Lengkap"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.nama_lengkap}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                isInvalid={touched.email && errors.email}
                                                placeholder="Masukkan Email"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <Form.Group>
                                            <Form.Label>No Wa <font color="red">*</font></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="no_wa"
                                                value={values.no_wa}
                                                onChange={handleChange}
                                                isInvalid={touched.no_wa && errors.no_wa}
                                                placeholder="Masukkan No Wa"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.no_wa}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group>
                                            <Form.Label>Pilih Sumber <font color="red">*</font></Form.Label>

                                            <Form.Select
                                                name="source"
                                                value={values.source}
                                                onChange={handleChange}
                                                isInvalid={touched.source && errors.source}
                                            >
                                                <option value="">Pilih Source</option>

                                                <optgroup label="Paid Advertising">
                                                    <option value="Facebook Ads">Facebook Ads</option>
                                                    <option value="Instagram Ads">Instagram Ads</option>
                                                    <option value="Google Ads">Google Ads</option>
                                                </optgroup>

                                                <optgroup label="Social Media">
                                                    <option value="Instagram Organic">Instagram Organic</option>
                                                    <option value="Facebook Organic">Facebook Organic</option>
                                                    <option value="TikTok Organic">TikTok Organic</option>
                                                    <option value="LinkedIn">LinkedIn</option>
                                                </optgroup>

                                                <optgroup label="Search & Discovery">
                                                    <option value="Google Maps">Google Maps</option>
                                                    <option value="Organic Search">Organic Search</option>
                                                </optgroup>

                                                <optgroup label="Direct & Inbound">
                                                    <option value="WhatsApp">WhatsApp</option>
                                                    <option value="Website">Website</option>
                                                    <option value="Referral">Referral</option>
                                                    <option value="Direct Outreach">Direct Outreach</option>
                                                </optgroup>

                                                <optgroup label="Other">
                                                    <option value="Event / Networking">
                                                        Event / Networking
                                                    </option>
                                                    <option value="Other">Other</option>
                                                </optgroup>
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.source}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <Form.Group className='mt-3'>
                                    <Form.Label>Sosial Media</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="sosial_media"
                                        value={values.sosial_media}
                                        onChange={handleChange}
                                        isInvalid={touched.sosial_media && errors.sosial_media}
                                        placeholder="Contoh: @akun_instagram"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.sosial_media}
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

export default ModalEditLeads;

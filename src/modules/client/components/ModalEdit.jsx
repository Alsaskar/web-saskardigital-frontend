import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useClient } from '../hooks/useClient';
import { useRef } from 'react';

export const validationSchema = Yup.object({
    nama_company: Yup.string().required('Nama Perusahaan wajib diisi'),
    industry: Yup.string().required('Industri wajib diisi'),
    address: Yup.string().required('Alamat wajib diisi'),
    city: Yup.string().required('Kota wajib diisi'),
    province: Yup.string().required('Provinsi wajib diisi'),
    website: Yup.string(),
    email: Yup.string(),
    phone: Yup.string(),
    logo_company: Yup.mixed()
        .nullable()
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
    pic_name: Yup.string(),
    pic_email: Yup.string(),
    pic_whatsapp: Yup.string(),
    status: Yup.string().required('Status wajib diisi'),
});

const ModalEditClient = ({ data, show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToastMessage } = useToastContext();
    const { editClient, loading } = useClient()
    const fileInputRef = useRef(null);

    const _handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData()

        formData.append('nama_company', values.nama_company)
        formData.append('industry', values.industry)
        formData.append('address', values.address)
        formData.append('city', values.city)
        formData.append('province', values.province)
        formData.append('website', values.website)
        formData.append('email', values.email)
        formData.append('phone', values.phone)
        formData.append('pic_name', values.pic_name)
        formData.append('pic_email', values.pic_email)
        formData.append('pic_whatsapp', values.pic_whatsapp)
        formData.append('status', values.status)

        // Hanya kirim image jika user memilih image baru
        if (values.logo_company) {
            formData.append("logo_company", values.logo_company);
        }

        const res = await editClient(data.id, formData);

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
                    <Modal.Title>Edit Data Client</Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        nama_company: data.nama_company || '',
                        industry: data.industry || '',
                        address: data.address || '',
                        city: data.city || '',
                        province: data.province || '',
                        website: data.website || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        logo_company: null,
                        pic_name: data.pic_name || '',
                        pic_email: data.pic_email || '',
                        pic_whatsapp: data.pic_whatsapp || '',
                        status: data.status || 'active',
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
                                            <Form.Label>Nama Perusahaan <font color="red">*</font></Form.Label>
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
                                            <Form.Label>Industri <font color="red">*</font></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="industry"
                                                value={values.industry}
                                                onChange={handleChange}
                                                isInvalid={touched.industry && errors.industry}
                                                placeholder="Masukkan Industri"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.industry}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <Form.Group className="mt-3">
                                    <Form.Label>Alamat <font color="red">*</font></Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="address"
                                        value={values.address}
                                        onChange={handleChange}
                                        isInvalid={touched.address && errors.address}
                                        placeholder="Masukkan Address"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Kota <font color="red">*</font></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="city"
                                                value={values.city}
                                                onChange={handleChange}
                                                isInvalid={touched.city && errors.city}
                                                placeholder="Masukkan Kota"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.city}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Provinsi <font color="red">*</font></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="province"
                                                value={values.province}
                                                onChange={handleChange}
                                                isInvalid={touched.province && errors.province}
                                                placeholder="Masukkan Provinsi"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.province}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div><hr />

                                <h6>Kontak Perusahaan & Logo Perusahaan</h6>

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group>
                                            <Form.Label>Website</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="website"
                                                value={values.website}
                                                onChange={handleChange}
                                                isInvalid={touched.website && errors.website}
                                                placeholder="Masukkan Website"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.website}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
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
                                    <div className="col-md-4">
                                        <Form.Group>
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="phone"
                                                value={values.phone}
                                                onChange={handleChange}
                                                isInvalid={touched.phone && errors.phone}
                                                placeholder="Masukkan Phone"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phone}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <Form.Group className="mt-3">
                                    <Form.Label>Logo</Form.Label>
                                    <Form.Control
                                        ref={fileInputRef}
                                        type="file"
                                        onChange={(e) => {
                                            setFieldValue(
                                                "logo_company",
                                                e.currentTarget.files[0] || null
                                            );
                                        }}
                                        isInvalid={touched.logo_company && errors.logo_company}
                                    />
                                    <Form.Text muted>Format yang didukung: JPG, JPEG, PNG.</Form.Text>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.logo_company}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <hr /><h6>Kontak PIC</h6>

                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group>
                                            <Form.Label>Nama Lengkap</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="pic_name"
                                                value={values.pic_name}
                                                onChange={handleChange}
                                                isInvalid={touched.pic_name && errors.pic_name}
                                                placeholder="Nama Lengkap"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.pic_name}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="pic_email"
                                                value={values.pic_email}
                                                onChange={handleChange}
                                                isInvalid={touched.pic_email && errors.pic_email}
                                                placeholder="Email"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.pic_email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group>
                                            <Form.Label>Nomor WA</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="pic_whatsapp"
                                                value={values.pic_whatsapp}
                                                onChange={handleChange}
                                                isInvalid={touched.pic_whatsapp && errors.pic_whatsapp}
                                                placeholder="Nomor Whatsapp"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.pic_whatsapp}
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
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
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

export default ModalEditClient;

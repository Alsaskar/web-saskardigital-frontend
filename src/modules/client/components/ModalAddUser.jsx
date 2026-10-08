import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useUser } from '../../user/hooks/useUser';

export const validationSchema = Yup.object({
    firstname: Yup.string().required('Firstname wajib diisi'),
    lastname: Yup.string().required('Lastname wajib diisi'),
    email: Yup.string().required('Email wajib diisi'),
    password: Yup.string().required('Password wajib diisi'),
    c_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Konfirmasi password tidak sama dengan password')
        .required('Ulangi Password wajib diisi'),
});

const ModalAddUserClient = ({ data, show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToastMessage } = useToastContext();
    const { addUser, loading } = useUser()

    const _handleSubmit = async (values, { resetForm }) => {
        const payload = {
            clientId: data?.id,
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
            c_password: values.c_password,
            role: 'client',
        };

        const res = await addUser(payload);

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
                    <Modal.Title>Tambahkan User Baru Untuk Client</Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        email: '',
                        password: '',
                        c_password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={_handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body>

                                <div className='alert alert-info'>Anda akan menambahkan user untuk Client <b>{data.nama_company}</b></div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group>
                                            <Form.Label>Firstname</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstname"
                                                value={values.firstname}
                                                onChange={handleChange}
                                                isInvalid={touched.firstname && errors.firstname}
                                                placeholder="Masukkan Firstname"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.firstname}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group>
                                            <Form.Label>Lastname</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastname"
                                                value={values.lastname}
                                                onChange={handleChange}
                                                isInvalid={touched.lastname && errors.lastname}
                                                placeholder="Masukkan Lastname"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.lastname}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <Form.Group className="mt-3">
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

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                isInvalid={touched.password && errors.password}
                                                placeholder="Masukkan Password"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mt-3">
                                            <Form.Label>Ulangi Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="c_password"
                                                value={values.c_password}
                                                onChange={handleChange}
                                                isInvalid={touched.c_password && errors.c_password}
                                                placeholder="Ulangi Password"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.c_password}
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

export default ModalAddUserClient;

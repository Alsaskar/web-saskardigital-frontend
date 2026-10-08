import { useToastContext } from '@/context/ToastContext/useToastContext';
import { Formik } from 'formik';
import { useState } from 'react';
import { Form, InputGroup, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import { useUser } from '../../../../modules/user/hooks/useUser';

const validationSchema = Yup.object().shape({
    oldPass: Yup.string().required('Password lama wajib di isi'),
    newPass: Yup.string().required('Password baru wajib di isi'),
    confirm_new_pass: Yup.string()
        .oneOf([Yup.ref('newPass'), null], 'Konfirmasi password tidak sama dengan password')
        .required('Required'),
});

export default function Layout() {
    const { changePassword } = useUser()
    const { showToastMessage } = useToastContext();
    const [loading, setLoading] = useState(false);
    const [isShowOldPass, setIsShowOldPass] = useState(false);
    const [isShowNewPass, setIsShowNewPass] = useState(false);
    const [isShowConfirmNewPass, setIsShowConfirmNewPass] = useState(false);

    const _handleSubmit = async (values) => {
        const oldPass = values.oldPass;
        const newPass = values.newPass;
        const confirm_new_pass = values.confirm_new_pass;

        try {
            setLoading(true);

            // Panggil API untuk ubah password
            const { data } = await changePassword({
                oldPass,
                newPass,
                confirm_new_pass,
            });

            // jika berhasil ubah password
            if (data.success) {
                showToastMessage(data.message, true);

                values.oldPass = '';
                values.newPass = '';
                values.confirm_new_pass = '';
            }
        } catch (err) {
            console.log(err);
            // bila gagal ubah password
            showToastMessage(err?.response?.data?.message, false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <h3>Change Password</h3>
            <div>Isi form dibawah ini untuk mengganti password Anda</div><hr />

            <div className="content">
                <div className="card">
                    <div className="card-body">
                        <Formik
                            initialValues={{
                                oldPass: '',
                                newPass: '',
                                confirm_new_pass: '',
                            }}
                            onSubmit={_handleSubmit}
                            validationSchema={validationSchema}
                            enableReinitialize={true}
                        >
                            {({ errors, touched, handleSubmit, handleChange, values }) => (
                                <form onSubmit={handleSubmit}>

                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="oldPass">Kata Sandi Lama</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text
                                                onClick={() => setIsShowOldPass(!isShowOldPass)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <i className={`bi ${isShowOldPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                            </InputGroup.Text>
                                            <Form.Control
                                                type={isShowOldPass ? 'text' : 'password'}
                                                placeholder="Kata Sandi Lama"
                                                onChange={handleChange}
                                                id="oldPass"
                                                value={values.oldPass}
                                                isInvalid={touched.oldPass && errors.oldPass ? true : false}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.oldPass}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="newPass">Kata Sandi Baru</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text
                                                onClick={() => setIsShowNewPass(!isShowNewPass)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <i className={`bi ${isShowNewPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                            </InputGroup.Text>
                                            <Form.Control
                                                type={isShowNewPass ? 'text' : 'password'}
                                                placeholder="Kata Sandi Baru"
                                                onChange={handleChange}
                                                id="newPass"
                                                value={values.newPass}
                                                isInvalid={touched.newPass && errors.newPass ? true : false}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.newPass}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="confirm_new_pass">
                                            Konfirmasi Kata Sandi Baru
                                        </Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text
                                                onClick={() => setIsShowConfirmNewPass(!isShowConfirmNewPass)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <i className={`bi ${isShowConfirmNewPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                            </InputGroup.Text>
                                            <Form.Control
                                                type={isShowConfirmNewPass ? 'text' : 'password'}
                                                placeholder="Konfirmasi Kata Sandi Baru"
                                                onChange={handleChange}
                                                id="confirm_new_pass"
                                                value={values.confirm_new_pass}
                                                isInvalid={
                                                    touched.confirm_new_pass && errors.confirm_new_pass
                                                        ? true
                                                        : false
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.confirm_new_pass}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <div className="d-flex justify-content-end mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                            disabled={loading}
                                        >
                                            {loading && (
                                                <Spinner
                                                    animation="border"
                                                    size="sm"
                                                    className="me-2"
                                                />
                                            )}
                                            Simpan
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { Modal, Button, Spinner } from "react-bootstrap";
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useTestimoni } from "../hooks/useTestimoni";

const ModalDeleteTestimoni = ({ data, show, handleClose, onSuccess }) => {
    const { showToastMessage } = useToastContext();
    const { loading, removeTestimoni } = useTestimoni()

    const _handleDelete = async () => {
        const res = await removeTestimoni(data.id)

        showToastMessage(res.message, res.success)

        if (res.success) {
            onSuccess();
            handleClose();
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">

                <Modal.Header closeButton>
                    <Modal.Title>Hapus Testimoni</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h5 align="center">Yakin ingin hapus <u><i>{data?.clientId}</i></u> ?</h5>
                    <div align="center">Testimoni yang akan Anda hapus akan hilang secara permanent dan tidak bisa dikembalikan lagi</div>

                </Modal.Body>
                <Modal.Footer>
                    {loading ?
                        <Button variant="danger" type="button" size="sm" disabled>
                            <Spinner animation="border" size="sm" />
                        </Button>
                        : <Button variant="danger" type="submit" size="sm" onClick={_handleDelete}>Ya</Button>}

                    <Button variant="secondary" size="sm" onClick={handleClose}>Tidak</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default ModalDeleteTestimoni;

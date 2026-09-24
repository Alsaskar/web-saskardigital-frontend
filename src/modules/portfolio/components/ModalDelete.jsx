import { Modal, Button, Spinner } from "react-bootstrap";
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { usePortfolio } from "../hooks/usePortfolio";

const ModalDeletePortfolio = ({ data, show, handleClose, onSuccess }) => {
    const { showToastMessage } = useToastContext();
    const { loading, removePortfolio } = usePortfolio()

    const _handleDelete = async () => {
        const res = await removePortfolio(data.id)

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
                    <Modal.Title>Hapus Portfolio</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h5 align="center">Yakin ingin hapus <u><i>{data?.title}</i></u> ?</h5>

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

export default ModalDeletePortfolio;

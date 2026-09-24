import { Modal, Button, Spinner } from "react-bootstrap";
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useMaintenance } from "../hooks/useMaintenance";

const ModalDeleteMaintenance = ({ data, show, handleClose, onSuccess }) => {
    const { showToastMessage } = useToastContext();
    const { loading, removeMaintenance } = useMaintenance()

    const _handleDelete = async () => {
        const res = await removeMaintenance(data.id)

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
                    <Modal.Title>Hapus Maintenance</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h5 align="center">Yakin ingin hapus <u><i>{data?.projectId}</i></u> ?</h5>

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

export default ModalDeleteMaintenance;

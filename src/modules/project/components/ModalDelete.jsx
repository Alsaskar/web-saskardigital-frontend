import { Modal, Button, Spinner } from "react-bootstrap";
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useProject } from "../hooks/useProject";

const ModalDeleteProject = ({ data, show, handleClose, onSuccess }) => {
    const { showToastMessage } = useToastContext();
    const { loading, removeProject } = useProject()

    const _handleDelete = async () => {
        const res = await removeProject(data.id)

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
                    <Modal.Title>Hapus Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h5 align="center">Yakin ingin hapus <u><i>{data?.nama}</i></u> ?</h5>

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

export default ModalDeleteProject;

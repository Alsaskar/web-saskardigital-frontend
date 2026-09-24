import { Modal, Button, Spinner } from "react-bootstrap";
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useLeads } from "../hooks/useLeads";

const ModalDeleteLeads = ({ data, show, handleClose, onSuccess }) => {
    const { showToastMessage } = useToastContext();
    const { loading, removeLeads } = useLeads()

    const _handleDelete = async () => {
        const res = await removeLeads(data.id)

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
                    <Modal.Title>Hapus Leads</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h5 align="center">Yakin ingin hapus <u><i>{data?.nama_lengkap}</i></u> ?</h5>
                    <div align="center">Leads yang akan Anda hapus akan hilang secara permanent dan tidak bisa dikembalikan lagi</div>

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

export default ModalDeleteLeads;

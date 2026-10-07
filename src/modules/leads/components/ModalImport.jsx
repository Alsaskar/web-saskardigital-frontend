import { Modal, Button, Spinner, Form } from 'react-bootstrap';
import { useRef } from 'react';
import { useToastContext } from '@/context/ToastContext/useToastContext';
import { useLeads } from '../hooks/useLeads';

const ModalImportLeads = ({ show, handleClose, onSuccess }) => {
  const { loading, importLeads } = useLeads();
  const fileInputRef = useRef(null);
  const { showToastMessage } = useToastContext();

  const _handleImport = async () => {
    try {
      const file = fileInputRef.current.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      const res = await importLeads(formData);

      if (res.success) {
        showToastMessage(res.message, res.success, true);

        onSuccess();
        handleClose();
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message, false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Import Leads</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose File</Form.Label>
          <Form.Control type="file" ref={fileInputRef} />
        </Form.Group>

        <hr />

        <div className="card">
          <div className="card-body">
            <i className="bi bi-file-earmark-excel-fill text-secondary me-2"></i>
            <a
              href="/files/template-import-leads.xlsx"
              download="template-import-leads.xlsx"
              className="text-secondary"
            >
              Download Template File
            </a>
          </div>
        </div>
        <div className="form-text text-danger mt-2">
          <i>
            * Download template diatas, ketika sudah di edit, maka{' '}
            <b>Save As to CSV</b>
          </i>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {loading ? (
          <Button variant="success" type="button" size="sm" disabled>
            <Spinner animation="border" size="sm" />
          </Button>
        ) : (
          <Button
            variant="success"
            type="submit"
            size="sm"
            onClick={_handleImport}
          >
            Import
          </Button>
        )}

        <Button variant="secondary" size="sm" onClick={handleClose}>
          Keluar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalImportLeads;
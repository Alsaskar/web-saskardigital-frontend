import { Toast } from 'react-bootstrap';
import './style.scss';

export default function ToastAlert({
  title,
  message,
  onClose = () => {},
  show,
  bg = 'success',
  countdown, // Mengambil prop countdown
}) {
  const getIcon = () => {
    if (bg === 'success') return 'bi-check-circle-fill';
    if (bg === 'danger') return 'bi-exclamation-triangle-fill';
    return 'bi-info-circle-fill';
  };

  return (
    <Toast
      className={`inter-font toast-custom toast-custom-${bg} border-0 shadow`}
      onClose={onClose}
      show={show}
    >
      <Toast.Header
        className={`border-0 pb-0 ${bg === 'success' ? 'text-success' : bg === 'danger' ? 'text-danger' : 'text-muted'}`}
      >
        <i className={`bi ${getIcon()} icon me-2`}></i>
        <strong className="me-auto">{title}</strong>

        {/* Menampilkan teks hitungan mundur */}
        <small className="text-muted ms-3">Closed in {countdown}s</small>
      </Toast.Header>

      <Toast.Body className="pb-3">{message}</Toast.Body>
    </Toast>
  );
}
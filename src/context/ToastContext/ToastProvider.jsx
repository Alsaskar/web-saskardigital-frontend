import { useState, useRef } from 'react';
import { ToastContext } from './ToastContext';
import ToastAlert from '@/components/ToastAlert'; // Sesuaikan dengan path Anda

export default function ToastProvider({ children }) {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // Mengganti 'progress' menjadi 'countdown'
  const [countdown, setCountdown] = useState(5);

  const intervalRef = useRef(null);

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const showToastMessage = (msg, isSuccess = true) => {
    clearTimers();
    setMessage(msg);
    setSuccess(isSuccess);
    setShowToast(true);
    setCountdown(5); // Mulai hitungan mundur

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Jika angka sudah 1, detik berikutnya (0) toast akan ditutup
          clearTimers();
          setShowToast(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Berkurang 1 setiap 1 detik
  };

  const hide = () => {
    clearTimers();
    setShowToast(false);
  };

  return (
    <ToastContext.Provider value={{ showToastMessage, hide }}>
      {children}
      <ToastAlert
        show={showToast}
        title={success ? 'Berhasil' : 'Error'}
        message={message}
        countdown={countdown} // Oper nilai hitungan mundur ke komponen
        bg={success ? 'success' : 'danger'}
        onClose={hide}
      />
    </ToastContext.Provider>
  );
}
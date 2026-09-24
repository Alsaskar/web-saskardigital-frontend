import { Link } from 'react-router-dom';
import './style.css';

export default function Brand() {
  return (
    <div className="brand d-flex align-items-center justify-content-center">
      <Link to="/">
        <img src="/saskardigital.ico" alt="Logo" className="logo img-fluid" style={{borderRadius: '50%'}} />
        <span className="title">Saskardigital</span>
      </Link>
    </div>
  );
}

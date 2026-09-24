import { Navigate, useLocation } from 'react-router-dom';
import SidebarLayout from './SidebarLayout';
import LoadingScreen from './LoadingScreen';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles, withSidebar = true }) => {
  const { user, loading } = useContext(AuthContext);
  const { pathname } = useLocation();

  // Tampilkan loading saat mengecek autentikasi
  if (loading) {
    return <LoadingScreen />;
  }

  // Jika belum login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Jika role tidak sesuai
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Jika halaman tidak membutuhkan sidebar
  if (!withSidebar) {
    return children;
  }

  // Default: halaman admin menggunakan sidebar
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default ProtectedRoute;
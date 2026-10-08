import ProtectedRoute from '@/components/ProtectedRoute';
import { SidebarProvider } from '@/context/SidebarContext/SidebarProvider';
import NotFound from '@/pages/public/not-found';
import { Route, Routes } from 'react-router-dom';
import DashboardClient from '../pages/protected/client/dashboard';
import ChangePasswordClient from '../pages/protected/client/change-password';
import ProfileClient from '../pages/protected/client/profile';

const ClientRoutes = () => {
  return (
    <Routes>
      {/* Preview — TANPA SidebarProvider */}
      {/* <Route
        path="/articles/preview/:id"
        element={
          <ProtectedRoute allowedRoles={['admin']} withSidebar={false}>
            <ArticlePreviewAdmin />
          </ProtectedRoute>
        }
      /> */}

      {/* Semua halaman superadmin — DENGAN SidebarProvider */}
      <Route
        path="*"
        element={
          <SidebarProvider>
            <Routes>
              {/* Ketika mengakses parent path tanpa sub-path, lempar 404 */}
              <Route path="/" element={<NotFound />} />

              {/* Ketika mengakses sub-path yang salah di dalam parent path, lempar 404 */}
              <Route path="*" element={<NotFound />} />

              {/* Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <DashboardClient />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/change-password"
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <ChangePasswordClient />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <ProfileClient />
                  </ProtectedRoute>
                }
              />

            </Routes>
          </SidebarProvider>
        }
      />
    </Routes>
  );
};

export default ClientRoutes;
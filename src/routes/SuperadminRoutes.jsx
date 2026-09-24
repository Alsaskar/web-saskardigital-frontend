import ProtectedRoute from '@/components/ProtectedRoute';
import { SidebarProvider } from '@/context/SidebarContext/SidebarProvider';
import NotFound from '@/pages/public/not-found';
import DashboardSuperadmin from '../pages/protected/superadmin/dashboard';
import { Route, Routes } from 'react-router-dom';
import UsersSuperadmin from '../pages/protected/superadmin/users';
import TestimoniSuperadmin from '../pages/protected/superadmin/testimoni';
import ClientsSuperadmin from '../pages/protected/superadmin/client';
import LeadsSuperadmin from '../pages/protected/superadmin/leads';
import DetailLeadsSuperadmin from '../pages/protected/superadmin/leads/detail';
import ProjectsSuperadmin from '../pages/protected/superadmin/projects';
import PortfolioSuperadmin from '../pages/protected/superadmin/portfolio';
import MaintenanceSuperadmin from '../pages/protected/superadmin/maintenance';
import ChangePasswordSuperadmin from '../pages/protected/superadmin/change-password';

const SuperadminRoutes = () => {
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
                  <ProtectedRoute allowedRoles={['superadmin']}>
                    <DashboardSuperadmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/leads"
                element={
                  <ProtectedRoute allowedRoles={['superadmin']}>
                    <LeadsSuperadmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/leads/detail/:id"
                element={
                  <ProtectedRoute allowedRoles={['superadmin']}>
                    <DetailLeadsSuperadmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/clients"
                element={
                  <ProtectedRoute allowedRoles={['superadmin']}>
                    <ClientsSuperadmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/testimoni"
                element={
                  <ProtectedRoute allowedRoles={['superadmin']}>
                    <TestimoniSuperadmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/users"
                element={
                  <ProtectedRoute allowedRoles={['superadmin']}>
                    <UsersSuperadmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/projects"
                element={
                  <ProtectedRoute allowedRoles={['superadmin']}>
                    <ProjectsSuperadmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/portfolio"
                element={
                  <ProtectedRoute allowedRoles={['superadmin']}>
                    <PortfolioSuperadmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/maintenance"
                element={
                  <ProtectedRoute allowedRoles={['superadmin']}>
                    <MaintenanceSuperadmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/change-password"
                element={
                  <ProtectedRoute allowedRoles={['superadmin']}>
                    <ChangePasswordSuperadmin />
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

export default SuperadminRoutes;
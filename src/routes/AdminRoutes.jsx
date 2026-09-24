import ProtectedRoute from '@/components/ProtectedRoute';
import { SidebarProvider } from '@/context/SidebarContext/SidebarProvider';
import DashboardAdmin from '@/pages/protected/admin/dashboard';
import NotFound from '@/pages/public/not-found';
import { Route, Routes } from 'react-router-dom';
import Clients from '../pages/protected/admin/clients';
import Gallery from '../pages/protected/admin/gallery';
import Testimoni from '../pages/protected/admin/testimoni';
import Teams from '../pages/protected/admin/teams';
import ProjectRequest from '../pages/protected/admin/project-request';
import CategoryGallery from '../pages/protected/admin/gallery/category';
import Articles from '../pages/protected/admin/articles';
import CategoryArticles from '../pages/protected/admin/articles/category';
import CareersAdmin from '../pages/protected/admin/careers';
import CandidatesAdmin from '../pages/protected/admin/careers/candidates';
import CandidateDetailAdmin from '../pages/protected/admin/careers/candidates-detail';
import ChangePasswordAdmin from '../pages/protected/admin/change-password';


import ArticlePreviewAdmin from '../pages/protected/admin/articles-preview';
import Users from '../pages/protected/admin/users';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Preview — TANPA SidebarProvider */}
      <Route
        path="/articles/preview/:id"
        element={
          <ProtectedRoute allowedRoles={['admin']} withSidebar={false}>
            <ArticlePreviewAdmin />
          </ProtectedRoute>
        }
      />

      {/* Semua halaman admin — DENGAN SidebarProvider */}
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
                  <ProtectedRoute allowedRoles={['admin']}>
                    <DashboardAdmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/project-request"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ProjectRequest />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/clients"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Clients />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/gallery"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Gallery />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/category-gallery"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CategoryGallery />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/articles"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Articles />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/category-articles"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CategoryArticles />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/testimoni"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Testimoni />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/teams"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Teams />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/careers"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CareersAdmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/candidates"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CandidatesAdmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/candidate/:id"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CandidateDetailAdmin />
                  </ProtectedRoute>
                }
              />

              {/* Settings */}

              <Route
                path="/change-password"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ChangePasswordAdmin />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/users"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Users />
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

export default AdminRoutes;
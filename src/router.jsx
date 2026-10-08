import { createBrowserRouter } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import NotFound from './pages/public/not-found';
import Homepage from './pages/public/homepage';
import Portfolio from './pages/public/portfolio';
import WebCompanyProfile from './pages/public/services/web-company-profile';
import SoftwareCustom from './pages/public/services/software-custom';
import Login from './pages/public/login';
import SuperadminRoutes from './routes/SuperadminRoutes';
import ClientExperience from './pages/public/client-experience';
import ProjectRequestPublic from './pages/public/project-request';
import PortalClientLogin from './pages/public/portal-client';
import ClientRoutes from './routes/ClientRoutes';

const router = createBrowserRouter([
  // Public Route
  {
    path: '/',
    element: (
      <PublicRoute>
        <Homepage />
      </PublicRoute>
    ),
  },
  {
    path: '/portfolio',
    element: (
      <PublicRoute>
        <Portfolio />
      </PublicRoute>
    ),
  },
  {
    path: '/service/web-company-profile',
    element: (
      <PublicRoute>
        <WebCompanyProfile />
      </PublicRoute>
    ),
  },
  {
    path: '/service/software-custom',
    element: (
      <PublicRoute>
        <SoftwareCustom />
      </PublicRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/client-experience',
    element: (
      <PublicRoute>
        <ClientExperience />
      </PublicRoute>
    ),
  },
  {
    path: '/project-request',
    element: (
      <PublicRoute>
        <ProjectRequestPublic />
      </PublicRoute>
    ),
  },
  {
    path: '/client-portal',
    element: (
      <PublicRoute>
        <PortalClientLogin />
      </PublicRoute>
    ),
  },

  // Protected Route
  { path: '/superadmin/*', element: <SuperadminRoutes /> },
  { path: '/client/*', element: <ClientRoutes /> },

  // Route 404 - Page not found
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;

import {
  Navigate,
  Outlet,
  createBrowserRouter,
} from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import LoginPage from './pages/Auth/LoginPage'
import Dashboard from './pages/Dashboard'
import ProjectList from './pages/AllProjectReviews'
import UsersPage from './pages/UsersPage'
import CreateUserPage from './pages/CreateUserPage'
import ClientsPage from './pages/ClientsPage'
import CreateClientPage from './pages/CreateClientPage'
import SettingsPage from './pages/settings/SettingsPage'
import ConsultingPage from './pages/ConsultingPage'
import LandingPage from './pages/starter/landingPage'
import ServicesPage from './pages/starter/ServicesPage'
import ServiceRequestPage from './pages/starter/ServiceRequestPage'
import AddServicePage from './pages/starter/AddServicePage'
import NotFoundPage from './pages/NotFoundPage'
import Registration from './pages/Registration/Registration'
import PricingDetails from './pages/settings/PricingDetails'
import ServiceListPage from './pages/starter/ServiceListPage'
import ReviewsPage from './pages/ReviewsPage'
import ReviewDetailsPage from './pages/ReviewDetailsPage'

export const router = createBrowserRouter([
  // ✅ ROOT → directly go to welcome (no flash)
  {
    path: '/',
    element: <Navigate replace to="/welcome" />,
  },

  {
    path: '/welcome',
    element: <LandingPage />,
  },

  {
    path: '/all-services',
    element: <ServicesPage />,
  },

  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    path: '/register',
    element: <Registration />,
  },

  // ✅ MAIN APP (protected layout area)
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },

      // REVIEWS
      {
        path: 'reviews',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ReviewsPage />,
          },
          {
            path: 'projects-outcome',
            element: <ProjectList />,
          },
          {
            path: ':id',
            element: <ReviewDetailsPage />,
          },
        ],
      },

      
      // USERS
      {
        path: 'users',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <UsersPage />,
          },
          
          {
            path: 'create',
            element: <CreateUserPage />,
          },
        ],
      },

      // CLIENTS
      {
        path: 'clients',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ClientsPage />,
          },
          {
            path: 'create',
            element: <CreateClientPage />,
          },
        ],
      },

      // SERVICES
      {
        path: 'services',
        element: <Outlet />,
        children: [
          {
            path: 'create',
            element: <AddServicePage />,
          },
          {
            path: 'list',
            element: <ServiceListPage />,
          },
          {
            path: 'request',
            element: <ServiceRequestPage />,
          },
        ],
      },

      // SETTINGS
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'settings/pricing/:pricingId',
        element: <PricingDetails />,
      },

      // CONSULTING
      {
        path: 'consulting',
        element: <ConsultingPage />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
])
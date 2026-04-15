import {
  Navigate,
  Outlet,
  createBrowserRouter,
} from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout'
import LoginPage from '../Auth/LoginPage'
import Dashboard from '../Dashboard'
import ProposalReviewList from '../ProposalReview'
import UsersPage from '../UsersPage'
import CreateUserPage from '../CreateUserPage'
import ClientsPage from '../ClientsPage'
import CreateClientPage from '../CreateClientPage'
import SettingsPage from '../settings/SettingsPage'
import ConsultingPage from '../ConsultingPage'
import LandingPage from '../starter/landingPage'
import ServicesPage from '../starter/ServicesPage'
import ServiceRequestPage from '../starter/ServiceRequestPage'
import AddServicePage from '../starter/AddServicePage'
import NotFoundPage from '../NotFoundPage'
import Registration from '../Registration/Registration'
import PricingDetails from '../settings/PricingDetails'
import ServiceListPage from '../starter/ServiceListPage'
import ReviewsPage from '../ReviewsPage'
import ReviewDetailsPage from '../ReviewDetailsPage'


// Protected Routes
import ProtectedRoute from './protectedRoutes'

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
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },

      // REVIEWS
   
      {
        path: 'reviews',
        element: (
        <ProtectedRoute>
        <Outlet />
        </ProtectedRoute>
        
        ),
        children: [
          {
            index: true,
            element: <ReviewsPage />,
          },
          {
            path: 'pending-proposals',
            element: <ProposalReviewList />,
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
       element: (

        //  Protect routes Admin can see usewrs
    <ProtectedRoute allowedRoles={["Admin"]}>
      <Outlet />
    </ProtectedRoute>
  ),
        
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

   
      // SERVICES
      {
        path: 'services',
        element: (
        <ProtectedRoute>
        <Outlet />
        </ProtectedRoute>
        ),

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
        element: 
        <ProtectedRoute>

        <SettingsPage />
        </ProtectedRoute>
        ,
      },
      {
        path: 'settings/pricing/:pricingId',
        element: 
        <ProtectedRoute>
        <PricingDetails />,
        </ProtectedRoute>
      },

     
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
])

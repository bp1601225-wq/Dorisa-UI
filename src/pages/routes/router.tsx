import {
  Navigate,
  Outlet,
  createBrowserRouter,
} from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout'
import LoginPage from '../Auth/LoginPage'
import Dashboard from '../Dashboard'
import CreateUserPage from '../AddUser'
import SettingsPage from '../settings/SettingsPage'
import LandingPage from '../starter/landingPage'
import ServicesPage from '../starter/ServicesRequest.tsx'
import AddServicePage from '../starter/AddServicePage.tsx'
import NotFoundPage from '../NotFoundPage'
import Registration from '../Registration/Registration'
import PricingDetails from '../settings/PricingDetails'
import ServiceListPage from '../starter/ServiceListPage'
import ServicesRequestPage from '../starter/ServicesRequest.tsx'
import ClientRequestReview from '../RequestMother/ClientsRequestReview.tsx'
// import ReviewsPage from '../ReviewsPage'
// import ReviewDetailsPage from '../ReviewDetailsPage'


// Protected Routes
import ProtectedRoute from './protectedRoutes'
import UsersList from '../UsersList.tsx'
import ClientRequestDetailsId from '../RequestMother/ClientRequestReviewDetails.tsx'
import Projects from '../RequestMother/Projects/Project.tsx'
import Negotiate from '../Negotiation/ProposalNegotiate.tsx'
import Negotiation from '../Negotiation/ProposalNegotiate.tsx'
import ProjectReviews from '../RequestMother/Projects/ProjectReviewDetails.tsx'

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
            element: <ClientRequestReview />,
          },

           {
            path: "request-details/:id",
            element: <ClientRequestDetailsId/>,
          },

          // {
          //   path: ':id',
          //   element: <ClientRequestDetails />,
          // },
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
            element: <UsersList />,
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
            element: <ServicesRequestPage />,
          },
        ],
      },


          // SETTINGS
      {
        path: '/negotiation/:id',
        element: 
        <ProtectedRoute>

        <Negotiation />
        </ProtectedRoute>
        ,
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
        path: 'projects',
        element: 
        <ProtectedRoute>

         <Projects />
        </ProtectedRoute>
        
      },

      {
        path:"/projects/:id",
        element: <ProtectedRoute>
<ProjectReviews />
        </ProtectedRoute>
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

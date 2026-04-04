import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import LoginPage from './pages/Auth/LoginPage'
import Dashboard from './pages/Dashboard'
import CreateProjectPage from './pages/CreateProjectPage'
import TicketsPage from './pages/TicketsPage'
import ProjectList from './pages/AllProjectReviews'
import InvoicesPage from './pages/InvoicesPage'
import CreateInvoicePage from './pages/CreateInvoicePage'
import PaymentsPage from './pages/PaymentsPage'
import RecordPaymentPage from './pages/RecordPaymentPage'
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
  {
    path: '/welcome',
    element: <LandingPage />,
  },{
  path: `/all-services`,
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
  {
    path: '/',
    element: <MainLayout />,


    // MAIN LAYOUT SERVICES

    children: [
      {
        index: true,
        element: <Navigate replace to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },




      // {
      //   path: 'projects',
      //   element: <Outlet />,
      //   children: [
      //     // {
      //     //   index: true,
      //     //   element: <ProjectsPage />,
      //     // },
      //     {
      //       path: 'create',
      //       element: <CreateProjectPage />,
      //     },
      //   ],
      // },



        {
        path: 'reviews',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ReviewsPage />,
          },

         

             {
          path:'projects-outcome',
          element: <ProjectList />

          },

          {
          path: `:id`,
          element: <ReviewDetailsPage />
          }, 

       


          // {
          //   path: 'create',
          //   element: <CreateProjectPage />,
          // }, 


        ],
      },










      {
        path: 'invoices',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <InvoicesPage />,
          },
          {
            path: 'create',
            element: <CreateInvoicePage />,
          },
        ],
      },
      {
        path: 'payments',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <PaymentsPage />,
          },
          {
            path: 'record',
            element: <RecordPaymentPage />,
          },
        ],
      },
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
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'settings/pricing/:pricingId',
        element: <PricingDetails />,
      },
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

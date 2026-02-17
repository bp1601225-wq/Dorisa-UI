import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import ProjectsPage from './pages/ProjectsPage'
import CreateProjectPage from './pages/CreateProjectPage'
import UsersPage from './pages/UsersPage'
import CreateUserPage from './pages/CreateUserPage'
import ClientsPage from './pages/ClientsPage'
import CreateClientPage from './pages/CreateClientPage'
import TicketsPage from './pages/TicketsPage'
import CreateTicketPage from './pages/CreateTicketPage'
import InvoicesPage from './pages/InvoicesPage'
import CreateInvoicePage from './pages/CreateInvoicePage'
import SettingsPage from './pages/SettingsPage'
import ConsultingPage from './pages/ConsultingPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'projects',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ProjectsPage />,
          },
          {
            path: 'create',
            element: <CreateProjectPage />,
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
        path: 'tickets',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <TicketsPage />,
          },
          {
            path: 'create',
            element: <CreateTicketPage />,
          },
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
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'consulting',
        element: <ConsultingPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to="/" />,
  },
])

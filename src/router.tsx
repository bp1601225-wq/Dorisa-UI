import { Navigate, createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import LoginPage from './pages/LoginPage'
import TemplateOnePage from './pages/TemplateOnePage'
import TemplateThreePage from './pages/TemplateThreePage'
import TemplateTwoPage from './pages/TemplateTwoPage'

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
        element: <Navigate replace to="template-one" />,
      },
      {
        path: 'template-one',
        element: <TemplateOnePage />,
      },
      {
        path: 'template-two',
        element: <TemplateTwoPage />,
      },
      {
        path: 'template-three',
        element: <TemplateThreePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to="/" />,
  },
])

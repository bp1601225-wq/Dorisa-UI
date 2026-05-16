import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { router } from './pages/routes/router'
import { AuthProvider } from './context/AuthContext'
import GlobalLoader from './pages/utils/Loader'

function App() {
  return (
    <>
 <GlobalLoader />
 <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors closeButton />
    </AuthProvider>
    
</>
  )
}

export default App

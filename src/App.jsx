import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routing/AppRoutes';
import AuthProvider from './Context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { Offline } from 'react-detect-offline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Alert } from '@heroui/react';

const queryClient = new QueryClient()


function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
      <ToastContainer
        theme='colored'
        position="top-center"
      />
      <Offline>
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
          <Alert color="danger" title="You are currently offline. Please check your internet connection." />
        </div>      </Offline>
    </>

  );
}

export default App;


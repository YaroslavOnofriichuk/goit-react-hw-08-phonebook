import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ResponsiveAppBar } from './AppBar/AppBar';
import { MySkeleton } from './Skeleton/Skeleton';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import { lightTheme, darkTheme } from './Theme/Theme';

const ContactsPage = lazy(() =>
  import('../pages/ContactsPage/ContactsPage').then(module => ({
    default: module.ContactsPage,
  }))
);
const LoginPage = lazy(() =>
  import('../pages/LoginPage/LoginPage').then(module => ({
    default: module.LoginPage,
  }))
);
const RegisterPage = lazy(() =>
  import('../pages/RegisterPage/RegisterPage').then(module => ({
    default: module.RegisterPage,
  }))
);

export function App() {
  const { pathname } = useLocation();

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <ResponsiveAppBar />
        <Suspense fallback={<MySkeleton pathname={pathname} />}>
          <Routes>
            <Route index path="contacts" element={<ContactsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<ContactsPage />} />
          </Routes>
        </Suspense>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ResponsiveAppBar } from './AppBar/AppBar';
import { MySkeleton } from './Skeleton/Skeleton';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import { lightTheme, darkTheme } from './Theme/Theme';
import { useSelector } from 'react-redux';

const ContactsPage = lazy(() =>
  import('../pages/ContactsPage/ContactsPage').then(module => ({
    default: module.ContactsPage,
  }))
);

const ContactPage = lazy(() =>
  import('../pages/ContactPage/ContactPage').then(module => ({
    default: module.ContactPage,
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
  const theme = useSelector(state => state.theme.theme);

  return (
    <>
      <ThemeProvider theme={theme ? lightTheme : darkTheme}>
        <CssBaseline />
        <ResponsiveAppBar />
        <Suspense fallback={<MySkeleton pathname={pathname} />}>
          <Routes>
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="contacts/:contactId" element={<ContactPage />} />
            <Route index path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </Suspense>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

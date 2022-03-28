import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ResponsiveAppBar } from './AppBar/AppBar';
import { MySkeleton } from './Skeleton/Skeleton';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import { lightTheme, darkTheme } from './Theme/Theme';
import { useSelector } from 'react-redux';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { LimitedRoute } from './LimitedRoute/LimitedRoute';

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
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <ThemeProvider theme={theme ? lightTheme : darkTheme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Suspense fallback={<MySkeleton pathname={pathname} />}>
        <Routes>
          <Route
            index
            path="contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="contacts/:contactId"
            element={
              <PrivateRoute>
                <ContactPage />
              </PrivateRoute>
            }
          />

          <Route
            path="login"
            element={
              <LimitedRoute>
                <LoginPage />
              </LimitedRoute>
            }
          />
          <Route
            path="register"
            element={
              <LimitedRoute>
                <RegisterPage />
              </LimitedRoute>
            }
          />
          <Route
            path="*"
            element={isLoggedIn ? <ContactsPage /> : <LoginPage />}
          />
        </Routes>
      </Suspense>
      <Toaster />
    </ThemeProvider>
  );
}

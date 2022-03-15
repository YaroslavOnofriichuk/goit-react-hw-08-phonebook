import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ResponsiveAppBar } from './AppBar/AppBar';

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
  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route index path="contacts" element={<ContactsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<ContactsPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

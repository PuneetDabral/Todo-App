'use client';

import { useSelector } from 'react-redux';
import LoginPage from './login/page';
import Dashboard from './dashboard/page';

export default function App() {
  const userSession = useSelector((state) => state.auth);

  return <>{userSession?.token ? <Dashboard /> : <LoginPage />}</>;
}

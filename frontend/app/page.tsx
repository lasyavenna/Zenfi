'use client';

import { useState } from 'react';
import ZenFiWebsite from "@/components/screens/ZenFiWebsite";
import AuthForm from '@/components/screens/AuthForm';

export default function HomeRoute() {
  // track the user's login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // trigger change 
  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    isLoggedIn ? (
      <ZenFiWebsite />
    ) : (
      <AuthForm onAuthSuccess={handleAuthSuccess} />
    )
  );
}
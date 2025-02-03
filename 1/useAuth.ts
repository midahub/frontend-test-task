import { useEffect, useState } from 'react'

import { useValidateUserQuery } from '@/features/user/api/popUpAuth.api';

const useAuth = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const { isError, isSuccess, isLoading, refetch } = useValidateUserQuery();
  
  useEffect(() => {
    const handleChange = () => {
      const newToken = localStorage.getItem('authToken');
      
      if (!newToken) {
        setToken(null);
        setIsAuthorized(false);
        return;
      }

      if (newToken !== token) {
        setIsAuthorized(true);
        setToken(newToken);   
        refetch()
      }

      if (isError || isLoading) {
        setIsAuthorized(false);
        return;
      }

      if (isSuccess) {
        setIsAuthorized(true);
        return;
      }
    }

    handleChange()

    window.addEventListener('storage', handleChange)
    
    return () => {
      window.removeEventListener('storage', handleChange);
    }
  }, [token, isError, isSuccess, isLoading, refetch])

  return {
    token,
    isAuthorized,
    isLoading
  }
}

export default useAuth

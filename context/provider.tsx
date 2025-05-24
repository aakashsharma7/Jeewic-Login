"use client";

import { useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthContext } from './auth';

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const {isAuthenticated, isLoading, user, setIsAuthenticated, setUser, refreshAuth} = useAuth();
    const contextValue = useMemo(() => ({
        user,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        setUser,
        refreshAuth
    }), [user, isLoading, isAuthenticated, setIsAuthenticated, setUser, refreshAuth]);

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>;
}
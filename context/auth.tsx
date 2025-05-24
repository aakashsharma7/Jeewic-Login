'use client';

import { IUser } from '@/libs/api';
import { createContext } from 'react';

export interface IAuthContext {
    user: IUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    setIsAuthenticated?: (value: boolean) => void;
    setUser?: (user: IUser | undefined) => void;
    refreshAuth?: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
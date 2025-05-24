"use client";

import { useEffect, useState } from 'react';
import { APISDK, type IUser } from '@/libs/api';

export const useAuth = () => {
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // Effect to get token from localStorage (runs once)
    useEffect(() => {
        try {
            const token = localStorage.getItem('access_token');
            console.log('Token from localStorage:', token ? 'Found (length: ' + token.length + ')' : 'Not found');
            
            if (token) {
                setAccessToken(token);
            } else {
                setIsLoading(false);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error accessing localStorage:', error);
            setIsLoading(false);
            setIsAuthenticated(false);
        }
    }, []);
    
    // Effect to fetch user data when token is available
    useEffect(() => {
        if(!accessToken) {
            console.log('No access token available, skipping user fetch');
            setIsLoading(false);
            return;
        }
        
        const fetchUser = async () => {
            try {
                console.log('Attempting to fetch user with token');
                
                // Check if token has quotes and remove them if needed
                const cleanToken = accessToken.startsWith('"') && accessToken.endsWith('"') 
                    ? accessToken.slice(1, -1) 
                    : accessToken;
                
                // Initialize API with token
                const api = APISDK.getInstance(cleanToken);
                console.log('Calling getUser API');
                const userData = await api.getUser();
                
                if (userData) {
                    console.log('User data fetched successfully');
                    setUser(userData);
                    setIsAuthenticated(true);
                } else {
                    console.error('User data is empty or invalid');
                    throw new Error('Invalid user data received');
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
                // Clear token on error
                try {
                    localStorage.removeItem('access_token');
                } catch (e) {
                    console.error('Error removing token from localStorage:', e);
                }
                setAccessToken(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [accessToken]);

    return {
        user: user ?? null,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        setUser,
        refreshAuth: () => {
            console.log('Manual auth refresh requested');
            const token = localStorage.getItem('access_token');
            if (token) {
                setAccessToken(token);
            } else {
                setIsAuthenticated(false);
                setUser(undefined);
            }
        }
    };
};

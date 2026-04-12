import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { Navigate,  useLocation } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    console.log("Public Route run")
    
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Spinner />


    // yaha par replace ka meaning dekhna hai loading spinner banana hai button aur pure page liye
    if (user && location.pathname === '/login') {
        return <Navigate to={'/'} replace />
    }

    return children
}

export default PublicRoute

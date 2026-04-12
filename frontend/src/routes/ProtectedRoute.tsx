import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/ui/Spinner';

const ProtectedRoute = () => {

    // console.log("Protected Route run")

    const { user, loading } = useAuth();

    if (loading) return <Spinner/>

    if (!user) {
        return <Navigate to='/login' replace />
    }

    return <Outlet />
}

export default ProtectedRoute

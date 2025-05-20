import { Navigate } from 'react-router-dom';
import { useAuth } from '../../services/useAuth';

export const LoginRedirect = ({ children }) => {
    const { loading, authenticated } = useAuth();

    if (loading) return <p>Cargando...</p>;

    return authenticated ? <Navigate to='/' /> : children;
};

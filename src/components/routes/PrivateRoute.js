import { Navigate } from 'react-router-dom';
import { useAuth } from '../../services/useAuth';

export const PrivateRoute = ({ children }) => {
    const { loading, authenticated } = useAuth();

    if (loading) return <p>Cargando...</p>;

    return authenticated ? children : <Navigate to="/Login" />;
};

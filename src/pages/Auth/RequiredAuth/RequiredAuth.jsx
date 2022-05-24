import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../Firebase/firebase.init';
function RequiredAuth({ children }) {
    const [user, loading] = useAuthState(auth);
    let location = useLocation();
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}



export default RequiredAuth;
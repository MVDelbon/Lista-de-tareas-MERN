import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";


function ProtectedRoute () {
    const {loaging, isAuthenticated} = useAuth();
    console.log (loading, isAuthenticated)

    if (!isAuthenticated) return <Navigate to= "/login" replace />;

    return <Outlet/>;
}

export default ProtectedRoute

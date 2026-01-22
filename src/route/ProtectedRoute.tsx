// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const role = localStorage.getItem("role");
    if (role != "ADMIN") {
        // Not logged in → redirect to login page
        return <Navigate to="/" replace />;
    }

    // Logged in → allow access
    return children;
};

export default ProtectedRoute;

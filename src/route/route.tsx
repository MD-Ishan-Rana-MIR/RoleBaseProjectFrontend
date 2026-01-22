import { createBrowserRouter } from "react-router-dom";
import Login from "../authentication/LoginPage";
import MainLayout from "../main-layout/MainLayout";
import ProjectManage from "../pages/project/ProjectManage";
import UserManagement from "../pages/user-management/UserManagement";
import ProtectedRoute from "./ProtectedRoute";
import InviteRegistration from "../authentication/InviteRegistration";
import Navbar from "../components/Navbar";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/registraiton/accept-invite",
        element: <InviteRegistration />
    },
    {
        path: "/dashboard",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <ProtectedRoute><div><h1>dashboard home page</h1></div></ProtectedRoute>
            },
            {
                path: "user-management",
                element: <ProtectedRoute><UserManagement /></ProtectedRoute>
            },
            {
                path: "project-management",
                element: <ProtectedRoute><ProjectManage /></ProtectedRoute>
            }
        ]
    }
])
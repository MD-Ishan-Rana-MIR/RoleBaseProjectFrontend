import { createBrowserRouter } from "react-router-dom";
import Login from "../authentication/LoginPage";
import MainLayout from "../main-layout/MainLayout";
import ProjectManage from "../pages/project/ProjectManage";
import UserManagement from "../pages/user-management/UserManagement";
import ProtectedRoute from "./ProtectedRoute";
import InviteRegistration from "../authentication/InviteRegistration";
import AdminProtectRoute from "./AdminProtectRoute";
import ProjectCreate from "../pages/user/project/ProjectCreate";
import WebLayout from "../main-layout/WebLayout";
import AllProject from "../pages/user/project/AllProject";

export const router = createBrowserRouter([
    
    {
        path: "/",
        element: <WebLayout />,
        children : [
            {
                path : "/",
                element : <AllProject/>
            },
        {
        path : "project-create",
        element : <ProtectedRoute><ProjectCreate/></ProtectedRoute>
    },
        ]
    },
    {
        path: "/login",
        element: <Login />,
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
                element: <AdminProtectRoute><div><h1>dashboard home page</h1></div></AdminProtectRoute>
            },
            {
                path: "user-management",
                element: <AdminProtectRoute><UserManagement /></AdminProtectRoute>
            },
            {
                path: "project-management",
                element: <AdminProtectRoute><ProjectManage /></AdminProtectRoute>
            }
        ]
    }
])
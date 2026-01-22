import { createBrowserRouter } from "react-router-dom";
import Login from "../authentication/LoginPage";
import MainLayout from "../main-layout/MainLayout";
import ProjectManage from "../pages/project/ProjectManage";
import UserManagement from "../pages/user-management/UserManagement";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <div><h1>dashboard home page</h1></div>
            },
            {
                path: "user-management",
                element: <UserManagement />
            },
            {
                path: "project-management",
                element: <ProjectManage />
            }
        ]
    }
])
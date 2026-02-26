import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/Layout/MainLayout/MainLayout";
import AuthLayout from "../Components/Layout/Auth/AuthLayout";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profile/Profile";
import NotFound from "../Pages/NotFound/NotFound";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes";
import PostDetails from "../Pages/PostDetails/PostDetails";

export const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <ProtectedRoutes><Home /></ProtectedRoutes>
      },
      {
        path: 'post-details/:id',
        element: <ProtectedRoutes><PostDetails /></ProtectedRoutes>
      },
      {
        path: 'profile/:userId',
        element: <ProtectedRoutes><Profile /></ProtectedRoutes>
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <ProtectedAuthRoutes><Login /></ProtectedAuthRoutes> },
      { path: "register", element: <ProtectedAuthRoutes><Register /></ProtectedAuthRoutes> },
    ],
  },
]);
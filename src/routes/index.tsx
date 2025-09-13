// src/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import PageLayout from "../layout/PageLayout";
import Person from "../pages/Person";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "person/:id", element: <Person /> }
    ],
  },
  {
    path: "/auth",
    children: [
      { path: "login", element: <Login /> }, // => "/auth/login"
    ],
  },
]);

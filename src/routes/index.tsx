// src/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import PageLayout from "../layout/PageLayout";
import Person from "../pages/Person";
import CreatePerson from "../pages/CreatePerson";
import Affiliation from "../pages/Affiliation";
import Expertise from "../pages/Expertise";
import ManagementUser from "../pages/ManagementUser";
import ReporApp from "../pages/ReportApp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "person/:id", element: <Person /> },
      { path: "create-person", element: <CreatePerson />},
      { path: "create-person/:id", element: <CreatePerson />},
      { path: "affiliation", element: <Affiliation />},
      { path: "expertise", element: <Expertise />},
      { path: "menagment-user", element: <ManagementUser />},
      { path: "report", element: <ReporApp />}
    ],
  },
  {
    path: "/auth",
    children: [
      { path: "login", element: <Login /> }, // => "/auth/login"
    ],
  },
]);

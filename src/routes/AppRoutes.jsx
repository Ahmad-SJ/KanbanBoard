import React from "react";

//React Router
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import RootLayout from "./Root/RootLayout";
import Workspaces from "./Workspaces/Workspaces";
import Workspace from "../components/Workspace/Workspace";
import Board from "../components/Board/Board";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Workspaces /> },
        { path: "workspaces", element: <Workspaces /> },
        {
          element: <Outlet />,
          children: [
            {
              path: "workspace/:w_id",
              element: <Outlet />,
              children: [
                { index: true, element: <Workspace /> },
                {
                  path: "board/:b_id",
                  element: <Board />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default AppRoutes;
